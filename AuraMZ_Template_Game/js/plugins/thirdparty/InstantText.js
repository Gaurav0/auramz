//=============================================================================
// InstantText.js                                                          
//=============================================================================

/*:
@plugindesc v1.0.0 Gives option for message text to render instantly.
@author Jatopian

@param Default
@desc Whether instant text is enabled by default in the Options menu. true / false
@Default true

@Help[/USER]
This plugin gives the option for message text to render instantly,
instead of the default behavior (character-by-character).

Player can toggle this behavior in the game's Options menu.
Developer can toggle whether the default setting is ON or OFF.

Terms of Use:
- Free for commercial and non-commercial use.
- Please give credit in a trivially accessible place.
- OK to modify, but if you redistribute the modified version,
  please make clear that you modified it, and how.
- If you add features that could be useful to others,
  please at least consider sharing them with me and the community.
*/

(function() {
	var params = PluginManager.parameters("InstantText");
	var pInstantText = String(params["Default"]);

	//=============================================================================
	// ConfigManager
	//=============================================================================
	getDefaultInstantText = function() {
		if (pInstantText.match(/true/i)) {
			return true;
		} else if (pInstantText.match(/false/i)) {
			return false;
		} else {
			return Utils.isNwjs();
		}
	};

	ConfigManager.instantText = getDefaultInstantText();

	var alias_cm_md = ConfigManager.makeData;
	ConfigManager.makeData = function() {
		var config = alias_cm_md.call(this);
		config.instantText = this.instantText;
		return config;
	};

	var alias_cm_ad = ConfigManager.applyData;
	ConfigManager.applyData = function(config) {
		alias_cm_ad.call(this, config);
		this.instantText = this.readConfigInstantText(config, 'instantText');
	};

	ConfigManager.readConfigInstantText = function(config, name) {
		var value = config[name];
		if (value !== undefined) {
			return value;
		} else {
			return getDefaultInstantText();
		}
	};

	//=============================================================================
	// Window_Options
	//=============================================================================
	var alias_wo_ago = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function() {
		alias_wo_ago.call(this);
		this.addCommand("Instant Text", 'instantText');
	};

	//=============================================================================
	// Window Message
	//=============================================================================
	var alias_wm_udf = Window_Message.prototype.updateShowFast;
	Window_Message.prototype.updateShowFast = function() {
		alias_wm_udf.call(this);
		if (ConfigManager.instantText === true) {
			this._showFast = true
		}
	}

	// Increase number of option commands
	const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
	Scene_Options.prototype.maxCommands = function() {
		return _Scene_Options_maxCommands.call(this) + 1;
	};

})();