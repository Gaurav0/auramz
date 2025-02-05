//=============================================================================
// RPG Maker MZ - Colored Names
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
 * @plugindesc Colored Names
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help colored_names.js
 *
 * This plugin allows to associate a message box name with a color.
 *
 * @param Name Color
 * @type struct<NameColorAssociation>[]
 * @desc Association for a name with a color
 *
 */

/*~struct~NameColorAssociation:
 *
 * @param name
 * @type string
 * @text Name
 * @desc A message box name
 *
 * @param color
 * @type number
 * @text Color
 * @desc The color id for the name
 */

(() => {
	const PARAMS = PluginManager.parameters("colored_names");
	const NAME_COLOR_PARAMS = JSON.parse(PARAMS["Name Color"]);
	const NAME_COLORS = {};

	for (const nameColorString of NAME_COLOR_PARAMS) {
		const nameColor = JSON.parse(nameColorString);
		const name = nameColor["name"];
		const color = nameColor["color"];
		NAME_COLORS[name] = color;
	}

	const _Game_Message_speakerName = Game_Message.prototype.speakerName;
	Game_Message.prototype.speakerName = function() {
		let speakerName = _Game_Message_speakerName.call(this);
		const color = NAME_COLORS[speakerName];
		if (color != null) {
			speakerName = "\\C[" + color + "]" + speakerName;
		}
		return speakerName;
	};

})();