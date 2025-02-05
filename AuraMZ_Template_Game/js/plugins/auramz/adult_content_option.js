//=============================================================================
// RPG Maker MZ - Adult Content Option
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/12/27
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adult Content Option
 * @author Gaurav Munjal
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help adult_content_option.js
 *
 * Plugin for adding a window option for disabling adult content
 *
 * @command readAdultOption
 * @text Read Adult Option
 * @desc Read Adult Option
 *
 * @param censoredTitle
 * @dir img/titles1/
 * @type file
 * @text Censored Title
 * @desc The title that will be shown if adult content is turned off
 * @default TITLE_BACKGROUND
 * 
 * @param initialTitle
 * @dir img/titles1/
 * @type file
 * @text Initial Title
 * @desc The title that will be shown if adult content is turned on
 * @default TITLE_BACKGROUND_CENSORED
 *
 */

(() => {
	const PLUGIN_ID = "adult_content_option";
	const DEFAULT_ADULT_CONTENT = true;
	
	ConfigManager.adultContent = DEFAULT_ADULT_CONTENT;
	
	const params = PluginManager.parameters(PLUGIN_ID);
	const INITIAL_TITLE = params["initialTitle"];
	const CENSORED_TITLE = params["censoredTitle"];

	PluginManager.registerCommand(PLUGIN_ID, "readAdultOption", () => {
	  $gameSwitches.setValue(9, ConfigManager.adultContent);
	});

	// Inject adultContent configuration
	const ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function() {
		const config = ConfigManager_makeData.call(this);
		config.adultContent = this.adultContent;
		return config;
	};

	// Reads the adult content option out of a configuration
	ConfigManager.readAdultContent = function(config, name) {
		if (name in config) {
			return Boolean(config[name]);
		} else {
			return DEFAULT_ADULT_CONTENT;
		}
	};

	// Injects the logic to update the skip speed from a configuration
	const _ConfigManager_applyData = ConfigManager.applyData;
	ConfigManager.applyData = function(config) {
		_ConfigManager_applyData.call(this, config);
		this.adultContent = this.readAdultContent(config, "adultContent");
	};

	// Insert the adultContent option 
	const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function() {
		_Window_Options_addGeneralOptions.call(this);
		this.addCommand("Adult Content", "adultContent");
	};

	// Increase number of option commands
	const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
	Scene_Options.prototype.maxCommands = function() {
		return _Scene_Options_maxCommands.call(this) + 1;
	};

  // Change title based on adult content option
  const _Scene_Title_create = Scene_Title.prototype.create;
  Scene_Title.prototype.create = function() {
    $dataSystem.title1Name = ConfigManager.adultContent ? INITIAL_TITLE : CENSORED_TITLE;
    _Scene_Title_create.call(this);
};

})();
