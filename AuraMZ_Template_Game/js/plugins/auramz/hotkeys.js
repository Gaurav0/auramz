//=============================================================================
// RPG Maker MZ - Hotkeys
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2022/08/30
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds the ability to configugre hotkeys.
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help hotkeys.js
 *
 * Triggers code upon pressing a hotkey.
 *
 * @param menuHotkeys
 * @type struct<MenuHotkey>[]
 * @text Menu Hotkeys
 * @desc Hotkeys that call a menu
 *
 */

/*~struct~MenuHotkey:
 *
 * @param hotkey
 * @type string
 * @text Hotkey
 * @desc The triggering hotkey/event 
 *
 * @param sceneName
 * @type string
 * @text Scene Name
 * @desc The name of the scene that should be called from pressing the hotkey
 *
 * @param condition
 * @type string
 * @text Condition
 * @default true
 * @desc The condition that must be fulfilled for the hotkey to be enabled
 */

window.AuraMZ = window.AuraMZ || {};

(() => {
	AuraMZ.Hotkeys = AuraMZ.Hotkeys || {};

	const PARAMS = PluginManager.parameters("hotkeys");
	const MENU_HOTKEYS_JSON = JSON.parse(PARAMS["menuHotkeys"]);
	AuraMZ.Hotkeys.MenuHotkeys = [];

	// Parse the configured hotkeys
	for (const MENU_HOTKEY_JSON of MENU_HOTKEYS_JSON) {
		const menuHotkey = JSON.parse(MENU_HOTKEY_JSON);
		AuraMZ.Hotkeys.MenuHotkeys.push(menuHotkey);
	}

	// Check if a hotkey for opening a menu is pressed and
	// if its condition to be enabled is fulfilled.
	// If so, return the menu (scene) that shall be opened.
	Scene_Base.prototype.getCalledHotkeyMenu = function() {
		for (const menuHotkey of AuraMZ.Hotkeys.MenuHotkeys) {
			if (Input.isTriggered(menuHotkey.hotkey) && eval(menuHotkey.condition)) {
				return eval(menuHotkey.sceneName);
			}
		}

		return undefined;
	}

	// Inject custom logic for checking if a menu (scene) should be opened
	const _Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
	Scene_Map.prototype.isMenuCalled = function() {
		if (this._calledMenu) {
			return true;
		}

		this._calledMenu = this.getCalledMenu();
		return this._calledMenu != undefined;
	};

	// Checks if either according to the old logic the main menu should be called
	// or if a menu from the hotkeys should be called
	Scene_Map.prototype.getCalledMenu = function() {
		if (_Scene_Map_isMenuCalled.call(this)) {
			return Scene_Menu;
		}

		return this.getCalledHotkeyMenu();
	};

	// Overwrite the original callMenu method to call a menu (scene)
	// dependent on the key that triggered the menu call
	Scene_Map.prototype.callMenu = function() {
		if (this._calledMenu) {
			SoundManager.playOk();
			SceneManager.push(this._calledMenu);
			Window_MenuCommand.initCommandPosition();
			$gameTemp.clearDestination();
			this._mapNameWindow.hide();
			this._waitCount = 2;
			this._calledMenu = undefined;
		}
	};

	// Inject custom logic to trigger menu (scene) calling from the
	// configured hotkeys. If a hotkey is pressed while its associated
	// menu (scene) is open, the menu (scene) will be closed instead.
	const _Scene_MenuBase_update = Scene_MenuBase.prototype.update;
	Scene_MenuBase.prototype.update = function() {
		_Scene_MenuBase_update.call(this);

		const hotkeyMenu = this.getCalledHotkeyMenu();
		if (hotkeyMenu) {
			if (this instanceof Scene_Menu || this instanceof Scene_Message) {
				// We want the main menu to stay on the stack if we trigger
				// switching menus with a hotkey, so we use push instead of
				// goto for this.
				SoundManager.playOk();
				SceneManager.push(hotkeyMenu);
			} else if (this instanceof hotkeyMenu) {
				SoundManager.playCancel();
				SceneManager.pop();
			} else {
				SoundManager.playOk();
				SceneManager.goto(hotkeyMenu);
			}
		}
	}

	// Inject custom logic to trigger menu (scene) calling from the
	// configured hotkeys in to the Message Box
	const _Scene_Message_update = Scene_Message.prototype.update;
	Scene_Message.prototype.update = function() {
		_Scene_Message_update.call(this);

		if (!(this instanceof Scene_Battle) && $gameMessage.isBusy()) {
			const hotkeyMenu = this.getCalledHotkeyMenu();
			if (hotkeyMenu) {
				SoundManager.playOk();
				SceneManager.push(hotkeyMenu);
			}
		}
	}
})();