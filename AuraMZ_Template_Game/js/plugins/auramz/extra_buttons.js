//=============================================================================
// RPG Maker MZ - Extra Buttons
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
 * @plugindesc Extra Buttons
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help extra_buttons.js
 *
 * Allows registering extra buttons
 *
 * @param Keyboard
 * @type struct<KeyIDToButton>[]
 * @desc Extra keyboard buttons
 *
 * @param Gamepad
 * @type struct<KeyIDToButton>[]
 * @desc Extra keyboard buttons
 *
 */

/*~struct~KeyIDToButton:
 *
 * @param keyID
 * @type number
 * @text KeyID
 * @desc The ID of a key
 *
 * @param button
 * @type string
 * @text Button
 * @desc The assigned name of the button (e.g. "ok" or "cancel")
 */

(() => {

	const PARAMS = PluginManager.parameters("extra_buttons");
	const KEYBOARD_BUTTONS = JSON.parse(PARAMS["Keyboard"]);
	const GAMEPAD_BUTTONS = JSON.parse(PARAMS["Gamepad"]);

	const extendMapper = function(extension, mapper) {
		for (const keyIDToButtonString of extension) {
			const keyIDToButton = JSON.parse(keyIDToButtonString);
			const keyID = keyIDToButton.keyID;
			const button = keyIDToButton.button;
			mapper[keyID] = button;
		}
	}
	
	extendMapper(KEYBOARD_BUTTONS, Input.keyMapper);
	extendMapper(GAMEPAD_BUTTONS, Input.gamepadMapper);
})();