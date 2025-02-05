//=============================================================================
// RPG Maker MZ - Version Number
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
 * @plugindesc Displays the games version number
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help version_number.js
 *
 * This plugin displays the games version number in the title screen
 *
 *
 * @param Game Version
 * @desc Current version of the game
 *
 */

window.AuraMZ = window.AuraMZ || {};

(() => {
	const params = PluginManager.parameters("version_number");
	AuraMZ.gameVersion = params["Game Version"];

	const _Scene_Title_createForeground = Scene_Title.prototype.createForeground;
	Scene_Title.prototype.createForeground = function() {
		_Scene_Title_createForeground.call(this);
		this.drawGameVersion();
	};

	Scene_Title.prototype.drawGameVersion = function() {
		const fontSize = 14;
		const padding = 2;
		const y = Graphics.height - fontSize - padding;
		const maxWidth = Graphics.width - padding;
		const bitmap = this._gameTitleSprite.bitmap;
		bitmap.fontFace = $gameSystem.mainFontFace();
		bitmap.outlineColor = "black";
		bitmap.outlineWidth = 2;
		bitmap.fontSize = fontSize;
		bitmap.drawText(AuraMZ.gameVersion, 0, y, maxWidth, fontSize + padding, "right");
	};

})();