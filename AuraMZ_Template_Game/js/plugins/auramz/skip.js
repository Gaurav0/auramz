//=============================================================================
// RPG Maker MZ - Skip
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/08/02
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Skip
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help skip.js
 *
 * Plugin for adding an addtional skip speed when the player holds down any of the configured buttons.
 *
 *
 * @param buttons
 * @desc Buttons that trigger skip
 * @type string[]
 * @text Buttons
 */

(() => {
	const DEFAULT_SKIP_SPEED = 10;
	const MAX_SKIP_SPEED = 100;
	ConfigManager.skipSpeed = DEFAULT_SKIP_SPEED;
	const FAST_FORWARD_SPEED = 3;

	const params = PluginManager.parameters("skip");
	const SKIP_BUTTONS = JSON.parse(params["buttons"]);

	Input.isSkipButtonPressed = function() {
		for (const button of SKIP_BUTTONS) {
			if (Input.isPressed(button)) {
				return true;
			}
		}

		return false;
	}
	
	Input.isSkip = function() {
		return this.isSkipButtonPressed() || (Utils.isMobileDevice() && TouchInput.isLongPressed())
	}

	// Speed up animations
	const _Sprite_Animation_update = Sprite_Animation.prototype.update;
	Sprite_Animation.prototype.update = function() {
		if (Input.isSkip()) {
			for (let i = 0; i < ConfigManager.skipSpeed - 1; ++i) {
				_Sprite_Animation_update.call(this);
			}
		}

		_Sprite_Animation_update.call(this);
	};

	// Trigger closing the current text message when fast-forwarding
	const _Window_Message_isTriggered = Window_Message.prototype.isTriggered;
	Window_Message.prototype.isTriggered = function() {
		return _Window_Message_isTriggered.call() || Input.isSkip();
	};

	// Adjust the battle log display speed when fast forwarding
	Window_BattleLog.prototype.waitSpeed = function() {
		if (Input.isSkip()) {
			return ConfigManager.skipSpeed;
		}

		return this.isFastForward() ? FAST_FORWARD_SPEED : 1;
	}

	// Inject wait speed logic based on button presses
	Window_BattleLog.prototype.updateWaitCount = function() {
		if (this._waitCount > 0) {
			this._waitCount -= this.waitSpeed();
			if (this._waitCount < 0) {
				this._waitCount = 0;
			}
			return true;
		}
		return false;
	};

	// Is the map currently on skip mode?
	Scene_Map.prototype.isSkip = function() {
		return (
			$gameMap.isEventRunning() &&
			!SceneManager.isSceneChanging() &&
			Input.isSkip()
		);
	};

	// Is the battle currently on skip mode?
	Scene_Battle.prototype.isSkip = function() {
		return Input.isSkip();
	};

	// Execute map events ConfigManager.skipSpeed times if skip is active
	const _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		if (this.isSkip()) {
			for (let i = 0; i < ConfigManager.skipSpeed - 1; ++i) {
				_Scene_Map_update.call(this);
			}
		}

		_Scene_Map_update.call(this);
	};

	// Execute battle events ConfigManager.skipSpeed times if skip is active
	const _Scene_Battle_update = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function() {
		if (this.isSkip()) {
			for (let i = 0; i < ConfigManager.skipSpeed - 1; ++i) {
				_Scene_Battle_update.call(this);
			}
		}

		_Scene_Battle_update.call(this);
	};

	// Adjust the acceleration values for effekseer
	const effekseerSkip = Math.ceil(ConfigManager.skipSpeed / 2);
	const EFFEKSEER_FAST_FORWARD = Math.ceil(FAST_FORWARD_SPEED / 2);
	SceneManager.getEffekseerSpeed = function() {
		if (Input.isSkip()) {
			return effekseerSkip;
		}

		if (Input.isLongPressed("ok")) {
			return EFFEKSEER_FAST_FORWARD;
		}

		return 1;
	}

	// Apply fast-forward and skip to effekseer effects
	SceneManager.updateEffekseer = function() {
		if (Graphics.effekseer) {
			Graphics.effekseer.update(this.getEffekseerSpeed());
		}
	};

	// Inject skipSpeed configuration
	const ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function() {
		const config = ConfigManager_makeData.call(this);
		config.skipSpeed = this.skipSpeed;
		return config;
	};

	// Reads the skip speed out of a configuration
	ConfigManager.readSkipSpeed = function(config, name) {
		if (name in config) {
			return Number(config[name]).clamp(1, Infinity);
		} else {
			return DEFAULT_SKIP_MULTIPLY;
		}
	};

	// Injects the logic to update the skip speed from a configuration
	const _ConfigManager_applyData = ConfigManager.applyData;
	ConfigManager.applyData = function(config) {
		_ConfigManager_applyData.call(this, config);
		this.skipSpeed = this.readSkipSpeed(config, "skipSpeed");
	};

	// Insert the skipSpeed option 
	const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function() {
		_Window_Options_addGeneralOptions.call(this);
		this.addCommand("Skip Speed", "skipSpeed");
	};

	// Increase number of option commands
	const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
	Scene_Options.prototype.maxCommands = function() {
		return _Scene_Options_maxCommands.call(this) + 1;
	};

	// Mark speed as a multiplier
	Window_Options.prototype.speedStatusText = function(value) {
		return value + "x";
	};

	Window_Options.prototype.isSkipSpeedSymbol = function(symbol) {
		return symbol == "skipSpeed";
	};

	// Inject logic for showing value of skip speed
	const _Window_Options_statusText = Window_Options.prototype.statusText;
	Window_Options.prototype.statusText = function(index) {
		const symbol = this.commandSymbol(index);
		const value = this.getConfigValue(symbol);
		if (this.isSkipSpeedSymbol(symbol)) {
			return this.speedStatusText(value);
		} else {
			return _Window_Options_statusText.call(this, index);
		}
	};

	// Inject logic for handling cursor right on a speed multiplier
	const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
	Window_Options.prototype.cursorRight = function() {
		const index = this.index();
		const symbol = this.commandSymbol(index);
		if (this.isSkipSpeedSymbol(symbol)) {
			return this.changeSkipSpeed(symbol, 1);
		} else {
			return _Window_Options_cursorRight.call(this);
		}
	};

	// Inject logic for handling cursor left on a speed multiplier
	const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
	Window_Options.prototype.cursorLeft = function() {
		const index = this.index();
		const symbol = this.commandSymbol(index);
		if (this.isSkipSpeedSymbol(symbol)) {
			return this.changeSkipSpeed(symbol, -1);
		} else {
			return _Window_Options_cursorLeft.call(this);
		}
	};

	// Inject logic for handling ok press on a speed multiplier
	const _Window_Options_processOk = Window_Options.prototype.processOk;
	Window_Options.prototype.processOk = function() {
		const index = this.index();
		const symbol = this.commandSymbol(index);
		if (this.isSkipSpeedSymbol(symbol)) {
			this.changeSkipSpeed(symbol, 1);
		} else {
			_Window_Options_processOk.call(this);
		}
	};

	// Change the skip speed according to 1 user action
	Window_Options.prototype.changeSkipSpeed = function(symbol, change) {
		const lastValue = this.getConfigValue(symbol);
		const value = Math.max(1, (lastValue + change) % MAX_SKIP_SPEED);
		this.changeValue(symbol, value);
	};
})();
