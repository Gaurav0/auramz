//=============================================================================
// RPG Maker MZ - Advanced Item Select
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2023/08/18
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Advanced Item Select
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help advanced_item_select.js
 *
 * This plugin allows to customize the item selection dialogue
 *
 * @command addItemFilter
 * @text add Item Filter
 * @desc Adds a filter to the list that removes all items that don't pass the filter condition
 *
 * @arg filter
 * @type string
 * @text filter
 * @desc The filter
 * 
 * @command disableCancel
 * @text Disable Cancel
 * @desc Disables the ability to use the cancel key on the next item select window.
 *
 */

(() => {
	const PLUGIN_NAME = "advanced_item_select";

	// Clears the current filters when the message window is cleared
	const _Game_Message_clear = Game_Message.prototype.clear;
	Game_Message.prototype.clear = function() {
		_Game_Message_clear.call(this);
		this._itemSelectFilters = [];
		this._cancelDisabled = false;
	}

	// Registers a good unlock condition in the game temp data structure
	PluginManager.registerCommand(PLUGIN_NAME, "addItemFilter", args => {
		$gameMessage._itemSelectFilters.push(args.filter);
	});

	// Prevents the use of the cancel key in the selection window
	PluginManager.registerCommand(PLUGIN_NAME, "disableCancel", _ => {
		$gameMessage._cancelDisabled = true;
	});
	
	const _Window_EventItem_includes = Window_EventItem.prototype.includes;
	Window_EventItem.prototype.includes = function(item) {
		if (!_Window_EventItem_includes.call(this, item)) {
			return false;
		}
		
		for (const filter of $gameMessage._itemSelectFilters) {
			if (!eval(filter)) {
				return false;
			}
		}
		
		return true;
	};

	// Inject creation of a help window
	const _Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
	Scene_Message.prototype.createAllWindows = function() {
		this.createHelpWindow(this);
		_Scene_Message_createAllWindows.call(this);
	};

	// Associate help window
	const _Scene_Message_associateWindows = Scene_Message.prototype.associateWindows;
	Scene_Message.prototype.associateWindows = function() {
		_Scene_Message_associateWindows.call(this);
		this._eventItemWindow.setHelpWindow(this._helpWindow);
	};

	// Create the help window
	Scene_Message.prototype.createHelpWindow = function() {
		const rect = this.helpWindowRect();
		this._helpWindow = new Window_Help(rect);
		this._helpWindow.hide();
		this.addWindow(this._helpWindow);
	};

	// Create the help window size
	Scene_Message.prototype.helpWindowRect = function() {
		const wx = 0;
		const wy = this.calcWindowHeight(4, true);
		const ww = Graphics.boxWidth;
		const wh = this.calcWindowHeight(2, true) - $gameSystem.windowPadding();
		return new Rectangle(wx, wy, ww, wh);
	};

	// Place the cancel button below the help window
	const _Window_EventItem = Window_EventItem.prototype.placeCancelButton;
	Window_EventItem.prototype.placeCancelButton = function() {
		if (this._cancelButton) {
			_Window_EventItem.call(this);
			const button = this._cancelButton;
			button.y += this._helpWindow.height;
		}
	};

	// Show the help window
	const _Window_EventItem_start = Window_EventItem.prototype.start;
	Window_EventItem.prototype.start = function() {
		_Window_EventItem_start.call(this);
		this._helpWindow.show();
	};

	// Show the help window
	const _Window_EventItem_close = Window_EventItem.prototype.close;
	Window_EventItem.prototype.close = function() {
		_Window_EventItem_close.call(this);
		this._helpWindow.hide();
	};

	const _Window_EventItem_onCancel = Window_EventItem.prototype.onCancel;
	Window_EventItem.prototype.onCancel = function () {
		if ($gameMessage._cancelDisabled) {
			SoundManager.playBuzzer();
		} else {
			_Window_EventItem_onCancel.call(this);
		}
	};
})();