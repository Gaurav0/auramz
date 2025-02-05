//=============================================================================
// RPG Maker MZ - Extra Autosave Conditions
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/12/16
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Extra Autosave Conditions
 * @author Gaurav Munjal
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help extra_autosave_conditions.js
 *
 * This plugin adds additional auto save conditions and makes the existing ones configurable
 * by the user in the options menu. Also provides some utility commands to trigger autosaves.
 *
 * @param customAutosaveTriggerLabel
 * @type text
 * @desc The text displayed in the options menu for the custom autosave trigger condition.
 * @default Day Start
 *
 * @command autosaveNow
 * @text Autosave now
 * @desc Autosave now
 *
 * @command autosave_menu
 * @text Autosave Menu
 * @desc Autosave Menu
 *
 * @command customAutosaveTrigger
 * @text Custom Autosave Trigger
 * @desc Trigger an autosave condition. The player can turn it on/off in the options menu.
 *
 * Dependencies:
 * - Text_Popup.js
 */

(() => {
    const PLUGIN_ID = "extra_autosave_conditions";

	const PARAMS = PluginManager.parameters(PLUGIN_ID);
	const CUSTOM_AUTOSAVE_TRIGGER_LABEL = PARAMS["customAutosaveTriggerLabel"];

	// Registers a command to Autosave now
	PluginManager.registerCommand(PLUGIN_ID, "autosaveNow", () => {
		SceneManager._scene.requestAutosave();
	});

    // Registers a command to show the autosave submenu
	PluginManager.registerCommand(PLUGIN_ID, "autosave_menu", () => {
        SceneManager.push(Scene_Autosave_Menu);
	});

    // Registers a command to indicate the custom trigger condition occurred
	PluginManager.registerCommand(PLUGIN_ID, "customAutosaveTrigger", () => {
        if (shouldAutosaveOnCustomAutosaveTrigger()) {
            SceneManager._scene.requestAutosave();
        }
	});

    // Show a text popup on autosave success
    const _Scene_Base_onAutoSaveSuccess = Scene_Base.prototype.onAutosaveSuccess;
    Scene_Base.prototype.onAutosaveSuccess = function() {
        _Scene_Base_onAutoSaveSuccess.call(this);
        setTimeout(() => {
            SceneManager.callPopup('Autosaved.', 'topLeft', 200);
        }, 1000);
    };

    // add autosave option to General Options
	const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function() {
		_Window_Options_addGeneralOptions.call(this);
		this.addCommand("Autosave", "autosave_menu");
	};

    Window_Options.prototype.isAutosaveSymbol = function(symbol) {
        return symbol === 'autosave_menu';
    };

    Window_Options.prototype.autosaveSymbol = function() {
        return 'autosave_menu';
    };

	// Override showing value for Autosave
	const _Window_Options_statusText = Window_Options.prototype.statusText;
	Window_Options.prototype.statusText = function(index) {
		const symbol = this.commandSymbol(index);
		if (this.isAutosaveSymbol(symbol)) {
			return this.autosaveStatusText(index);
		} else {
			return _Window_Options_statusText.call(this, index);
		}
	};

	ConfigManager.autosaveMenuExit = false;
	ConfigManager.autosaveCustomTrigger = true;
	ConfigManager.autosaveBattleWon = false;
	ConfigManager.autosaveMapChange = true;

    Window_Options.prototype.autosaveStatusText = function(_) {
        const config = ConfigManager;

        const flags = (
            (config.autosaveMenuExit ? 0x8 : 0) |
            (config.autosaveCustomTrigger ? 0x4 : 0) |
            (config.autosaveBattleWon ? 0x2 : 0) |
            (config.autosaveMapChange ? 0x1 : 0)
        );

        // display as enabled (in white) if not off.
        ConfigManager[this.autosaveSymbol()] = flags !== 0;

        switch (flags) {
            case 0x8: return 'Menu Exit';
            case 0x4: return CUSTOM_AUTOSAVE_TRIGGER_LABEL;
            case 0x2: return 'Battle Won';
            case 0x1: return 'Map Change';
            case 0: return 'OFF';
            case 0x5: return 'Default';
            default: return 'Custom';
        }
    };

	// Inject logic for handling ok press on autosave menu
	const _Window_Options_processOk = Window_Options.prototype.processOk;
	Window_Options.prototype.processOk = function() {
		const index = this.index();
		const symbol = this.commandSymbol(index);
		if (this.isAutosaveSymbol(symbol)) {
            SceneManager.snapForBackground();
            SceneManager.push(Scene_Autosave_Menu);
		} else {
			_Window_Options_processOk.call(this);
		}
	};

    const ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = ConfigManager_makeData.call(this);
        config.autosaveCustomTrigger = this.autosaveCustomTrigger;
        config.autosaveMapChange = this.autosaveMapChange;
        config.autosaveBattleWon = this.autosaveBattleWon;
        config.autosaveMenuExit = this.autosaveMenuExit;
        return config;
    };

    const ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        ConfigManager_applyData.call(this, config);
        this.autosaveCustomTrigger = this.readFlag(config, "autosaveCustomTrigger", true);
        this.autosaveMapChange = this.readFlag(config, "autosaveMapChange", true);
        this.autosaveBattleWon = this.readFlag(config, "autosaveBattleWon", false);
        this.autosaveMenuExit = this.readFlag(config, "autosaveMenuExit", false);
    };

    class AutosaveWindow extends Window_Options {
        constructor(rect) {
            super(rect);
        }

        makeCommandList() {
            this.addCommand(CUSTOM_AUTOSAVE_TRIGGER_LABEL, 'autosaveCustomTrigger');
            this.addCommand('Map Change', 'autosaveMapChange');
            this.addCommand('Battle Won', 'autosaveBattleWon');
            this.addCommand('Menu Exit', 'autosaveMenuExit');
        }

        static autosaveWindowRect() {
            const ww = 424;
            const wh = 483;
            const wx = (Graphics.boxWidth - ww) / 2;
            const wy = (Graphics.boxHeight - wh) / 2;
            return new Rectangle(wx, wy, ww, wh);
        }
    }
	
	const _Scene_MenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
    class Scene_Autosave_Menu extends Scene_MenuBase {
        constructor(rect) {
            super(rect);
        }

        create() {
            super.create();
            this.createBackground();
            this.createWindowLayer();
            const rect = AutosaveWindow.autosaveWindowRect();
            this._window = new AutosaveWindow(rect)
            this.addWindow(this._window);
        }

        start() {
            super.start();
            this._window.setHandler('ok', this.processOk.bind(this));
            this._window.setHandler('cancel', this.onCancel.bind(this));
            this._window.activate();
        }

        createBackground() {
            _Scene_MenuBase_createBackground.call(this);
        }

        processOk() {
            const index = this.index();
            const symbol = this.commandSymbol(index);
            this._window.changeValue(symbol, !this.getConfigValue(symbol));
        }

        onCancel() {
            this._window.deactivate();
            this._window.close();
            SceneManager.pop();
        }
    }

    const _Scene_Map_shouldAutosave = Scene_Map.prototype.shouldAutosave;
    Scene_Map.prototype.shouldAutosave = function() {
        return ConfigManager.autosaveMapChange &&
            _Scene_Map_shouldAutosave.call(this);
    };

	Scene_Battle.prototype.shouldAutosave = function() {
		return ConfigManager.autosaveBattleWon &&
			SceneManager.isNextScene(Scene_Map) &&
			BattleManager.result === 0; // win
	}

    const _Scene_Menu_terminate = Scene_Menu.prototype.terminate;
    Scene_Menu.prototype.terminate = function() {
        _Scene_Menu_terminate.call(this);
        if (shouldAutosaveOnMenuExit()) {
            SceneManager._scene.requestAutosave();
        }
    }

    function shouldAutosaveOnCustomAutosaveTrigger() {
        return ConfigManager.autosaveCustomTrigger;
    }

    function shouldAutosaveOnMenuExit() {
        return ConfigManager.autosaveMenuExit;
    }
})();
