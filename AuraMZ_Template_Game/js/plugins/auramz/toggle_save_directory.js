//=============================================================================
// RPG Maker MZ - Toggle Save Directory
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2022/10/15
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Toggle Save Directory
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help toggle_save_directory.js
 *
 * Adds an option to toggle between saving locally or saving in the user's AppData
 *
 * @param externalSaveDirectory
 * @text External Save Directory
 * @type string
 * @desc The path to the external save directory (without save/)
 * @default MyDeveloperName/MyGameName/
 */

(() => {

	const PLUGIN_NAME = "toggle_save_directory";
	const PARAMS = PluginManager.parameters(PLUGIN_NAME);
	const EXTERNAL_SAVE_DIRECTORY = PARAMS["externalSaveDirectory"];

	// Inject saving the external save directory data
	const ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function() {
		const config = ConfigManager_makeData.call(this);
		config.toggleSaveDirectory = this.toggleSaveDirectory;
		config.externalSaveDirectory = this.externalSaveDirectory;
		return config;
	};

	// Injects the logic to update the external save directory data
	const _ConfigManager_applyData = ConfigManager.applyData;
	ConfigManager.applyData = function(config) {
		_ConfigManager_applyData.call(this, config);
		this.toggleSaveDirectory = !ConfigManager.forceDeactivateToggleSaveDirectory && (config["toggleSaveDirectory"] || false)
		this.externalSaveDirectory = config["externalSaveDirectory"]
		ConfigManager.forceDeactivateToggleSaveDirectory = false;
	};

	// Insert the toggleSaveDirectory option
	const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function() {
		_Window_Options_addGeneralOptions.call(this);
		if (Utils.isNwjs() || Utils.isMobileDevice()) {
			this.addCommand("External Save Directory", "toggleSaveDirectory", true);
		}
	};

	// Increase number of option commands
	const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
	Scene_Options.prototype.maxCommands = function() {
		return _Scene_Options_maxCommands.call(this) + 1;
	};

	const Window_Options_processOk = Window_Options.prototype.processOk;
	Window_Options.prototype.processOk = function() {
		const index = this.index();
		const symbol = this.commandSymbol(index);
		if (symbol === "toggleSaveDirectory") {
			const oldFlag = this.getConfigValue(symbol);
			const newFlag = !oldFlag;
			this.changeValue(symbol, newFlag);
			Graphics.startLoading();
			if (Utils.isMobileDevice() && !oldFlag) {
				StorageManager.androidSelectExternalSaveDirectory().then((externalSaveDirectory) => {
					if (externalSaveDirectory != null) {
						ConfigManager.externalSaveDirectory = externalSaveDirectory
						StorageManager.moveAllSaves(oldFlag, newFlag);
					}
				});
			} else {
				StorageManager.moveAllSaves(oldFlag, newFlag);
			}
		} else {
			Window_Options_processOk.call(this);
		}
	};

	// Swap loading of config file and global info
	const _Scene_Boot_loadPlayerData = Scene_Boot.prototype.loadPlayerData;
	Scene_Boot.prototype.loadPlayerData = function() {
		ConfigManager.load().then(
			() => DataManager.loadGlobalInfo()
		);
	};

	// Inject custom logic to load the correct config file.
	// Since the config file has not been loaded we don't if we are using the external saves or not
	// so we have to check for the existence of the config file in the external save directory folder
	const _ConfigManager_load = ConfigManager.load;
	ConfigManager.load = function() {
		ConfigManager.toggleSaveDirectory = true;
		return StorageManager.exists("config")
			.then(
				() => _ConfigManager_load.call(this),
				() => {
					ConfigManager.toggleSaveDirectory = false;
					// In case the config itself has incorrect the toggleSaveDirectory flag
					// set to true, we need to manually turn it off after/during loading
					ConfigManager.forceDeactivateToggleSaveDirectory = true;
					_ConfigManager_load.call(this);
				});
	};

	StorageManager.androidSelectExternalSaveDirectory = function() {
		return AuraMZ.Mobile.call((callbackId) => ExternalStorage.selectExternalStorageDirectory(callbackId));
	}

	// Moves all saves from the old location to the new location
	StorageManager.moveAllSaves = function(oldFlag, newFlag) {
		if (Utils.isMobileDevice()) {
			if (!oldFlag) {
				// Move from localforage to external folder
				const forageKeyPromises = this._forageKeys.map(key => {
					const keyCompontents = key.split('.');
					const itemName = keyCompontents[2];
					return localforage.getItem(key)
						// Overwrite the config but preserve all other files
						.then(item => this.saveToAndroidFile(itemName, item, itemName != "config"))
						.catch(() => 0);
				});
				Promise.all(forageKeyPromises).then(() => {
					ConfigManager.save();
					DataManager.loadGlobalInfo();
					Graphics.endLoading();
				});
			} else {
				// Move from external folder to localforage
				AuraMZ.Mobile.call((callbackId) => ExternalStorage.listFiles(callbackId))
					.then((filesJSON) => {
						const files = JSON.parse(filesJSON);
						const filePromises = files.map(file => {
							const fileName = file.split('.')[0];
							StorageManager.loadFromAndroidFile(fileName)
								.then(data => this.saveToForage(fileName, data))
								.then(() => StorageManager.removeAndroidFile(fileName));
						});
						Promise.all(filePromises).then(() => {
							AuraMZ.Mobile.call((callbackId) => ExternalStorage.removeExternalStorageDirectory(callbackId));
							StorageManager.updateForageKeys();
							ConfigManager.externalSaveDirectory = null;
							ConfigManager.save();
							DataManager.loadGlobalInfo();
							Graphics.endLoading();
						});
					});
			}
		} else {
			setTimeout(() => {
				const oldPath = this.fileDirectoryPathDesktop(oldFlag);
				const newPath = this.fileDirectoryPathDesktop(newFlag);
				
				const fs = require('fs');
				fs.rmdirSync(newPath, { recursive: true });
				this.copyFolderDesktop(oldPath, newPath);
				fs.rmdirSync(oldPath, { recursive: true });

				ConfigManager.save();
				DataManager.loadGlobalInfo();
				Graphics.endLoading();
			});
		}
	}

	// Using fsRename in the StoreManager does not work for moving directories across partitions.
	// Therefore we need to implement a custom move function.
	// It recursefily copies the the folders and files over
	StorageManager.copyFolderDesktop = function(oldPath, newPath) {
		const fs = require('fs');
		const path = require('path');

		this.fsMkdir(newPath);

		const files = fs.readdirSync(oldPath);
		files.forEach((file) => {
			// Extend the paths by the folder/file name
			const oldFilePath = path.join(oldPath, file);
			const newFilePath = path.join(newPath, file);

			// If folder then copy recursively, if file then copy file
			if (fs.lstatSync(oldFilePath).isDirectory()) {
				this.copyFolderDesktop(oldFilePath, newFilePath);
			} else {
				fs.copyFileSync(oldFilePath, newFilePath);
			}
		});
	}

	// Inject logic for recursively making directories
	StorageManager.fsMkdir = function(path) {
		const fs = require("fs");
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true });
		}
	};

	// Inject custom logic to return custom parent path to the save folder
	const _StorageManager_fileDirectoryPath = StorageManager.fileDirectoryPath;
	StorageManager.fileDirectoryPath = function() {
		if (Utils.isMobileDevice()) {
			return ConfigManager.externalSaveDirectory
		} else {
			return this.fileDirectoryPathDesktop(ConfigManager.toggleSaveDirectory);
		}
	};

	// Inject custom logic to return a different save folder depending on whether
	// the toggle for external save sis turned on or off
	StorageManager.fileDirectoryPathDesktop = function(toggleSaveDirectory) {
		if (toggleSaveDirectory) {
			const path = require('path');
			const home = process.env.LOCALAPPDATA || process.env.LOCAL_APPDATA;
			return path.join(home, EXTERNAL_SAVE_DIRECTORY, "save/");
		} else {
			return _StorageManager_fileDirectoryPath.call(this);
		}
	};

	// Inject custom logic for saving android saves
	const _StorageManager_saveZip = StorageManager.saveZip;
	StorageManager.saveZip = function(saveName, zip) {
		if (Utils.isMobileDevice() && ConfigManager.toggleSaveDirectory) {
			StorageManager.saveToAndroidFile(saveName, zip, true);
		} else {
			_StorageManager_saveZip.call(this, saveName, zip);
		}
	};

	// Inject custom logic for loading android saves
	const _StorageManager_loadZip = StorageManager.loadZip;
	StorageManager.loadZip = function(saveName) {
		if (Utils.isMobileDevice() && ConfigManager.toggleSaveDirectory) {
			return StorageManager.loadFromAndroidFile(saveName);
		} else {
			return _StorageManager_loadZip.call(this, saveName);
		}
	};

	// Inject custom logic for checking for save file existence on android
	const _StorageManager_exists = StorageManager.exists;
	StorageManager.exists = function(saveName) {
		if (Utils.isMobileDevice() && ConfigManager.toggleSaveDirectory) {
			return StorageManager.existsAndroidFile(saveName);
		} else {
			return new Promise((resolve) => {
				if (_StorageManager_exists.call(this, saveName)) {
					resolve();
				} else {
					reject();
				}
			});
		}
	};

	// Need to hard overwrite in order to adapt to saveFileExists being asynch
	DataManager.removeInvalidGlobalInfo = function() {
		const globalInfo = this._globalInfo;
		for (const info of globalInfo) {
			const savefileId = globalInfo.indexOf(info);
			this.savefileExists(savefileId).then(null, () => delete globalInfo[savefileId]);
		}
	};

	// Inject custom logic for removing a save file on android
	const _StorageManager_remove = StorageManager.remove;
	StorageManager.remove = function(saveName) {
		if (Utils.isMobileDevice() && ConfigManager.toggleSaveDirectory) {
			return StorageManager.removeAndroidFile(saveName);
		} else {
			return _StorageManager_remove.call(this, saveName);
		}
	};

	// Appends the file extension
	StorageManager.saveNameWithExtension = function(saveName) {
		return saveName + ".rmmzsave"
	};

	// Opens up the necessary resources to write into onto the android filesystem
	StorageManager.saveToAndroidFile = function(saveName, zip, overwrite) {
		const fileName = this.saveNameWithExtension(saveName);
		return AuraMZ.Mobile.call((callbackId) => ExternalStorage.writeFile(callbackId, fileName, zip, overwrite));
	};

	// Opens up the necessary resources to load from the android filesystem
	StorageManager.loadFromAndroidFile = function(saveName) {
		const fileName = this.saveNameWithExtension(saveName);
		return AuraMZ.Mobile.call((callbackId) => ExternalStorage.readFile(callbackId, fileName))
			.then(encodedData => {
				const decodedData = AuraMZ.Mobile.decodeBase64(encodedData);
				return decodedData;
			});
	};

	// Opens up the necessary resources to check if a file exists on the android filesystem
	StorageManager.existsAndroidFile = function(saveName) {
		const fileName = this.saveNameWithExtension(saveName);
		return AuraMZ.Mobile.call((callbackId) => ExternalStorage.existsFile(callbackId, fileName))
			.then((result) => {
				if (JSON.parse(result)) { return true } else { throw false }
			});
	};

	// Opens up the necessary resources to remove a file from the android filesystem
	StorageManager.removeAndroidFile = function(saveName) {
		const fileName = this.saveNameWithExtension(saveName);
		return AuraMZ.Mobile.call((callbackId) => ExternalStorage.removeFile(callbackId, fileName));
	};
})();
