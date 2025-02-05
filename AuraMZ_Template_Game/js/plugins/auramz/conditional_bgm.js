//=============================================================================
// RPG Maker MZ - Conditional BGM
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
 * @plugindesc Conditional BGM Customizations
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help conditional_bgm.js
 *
 * This plugin allows to define conditions under which the default BGM track will be replaced by a different one.
 *
 * @param Conditional Battle BGMs
 * @type struct<ConditionalBGM>[]
 * @desc A list of conditional battle BGMs. If the default battle BGM is not changed, 
 * then the first applicable battle BGM will be chosen from this list.
 */

/*~struct~ConditionalBGM:
 *
 * @param name
 * @text Name
 * @type file
 * @dir audio/bgm/
 * @desc The name of the BGM that will be played
 *
 * @param pan
 * @text Pan
 * @type Number
 * @default 0
 * @desc The audio pan
 *
 * @param pitch
 * @text Pitch
 * @type Number
 * @default 100
 * @desc The audio pitch
 *
 * @param volume
 * @text Volume
 * @type Number
 * @default 90
 * @desc The audio volume
 *
 * @param condition
 * @type string
 * @text Conidition
 * @desc The condition that needs to be true for the BGM to be played
 */

(() => {
	const PLUGIN_NAME = "conditional_bgm";
	const PARAMS = PluginManager.parameters(PLUGIN_NAME);
	const CONDITIONAL_BATTLE_BGMS = JSON.parse(PARAMS["Conditional Battle BGMs"]);

	// Inject custom logic to register conditional BGMs
	const _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		_Scene_Boot_start.call(this);
		BattleManager._conditionalBattleBGMs = [];

		for (const conditionalBattleBGMString of CONDITIONAL_BATTLE_BGMS) {
			const conditionalBattleBGM = JSON.parse(conditionalBattleBGMString);
			BattleManager._conditionalBattleBGMs.push(conditionalBattleBGM);
		}
	};

	// Inject custom logic to return a conditional battle BGM if applicable
	const _Game_System_battleBgm = Game_System.prototype.battleBgm;
	Game_System.prototype.battleBgm = function() {
		if (!this._battleBgm || this._battleBgm.name == $dataSystem.battleBgm.name) {
			for (const conditionalBattleBGM of BattleManager._conditionalBattleBGMs) {
				if (eval(conditionalBattleBGM.condition)) {
					return conditionalBattleBGM;
				}
			}
		}
		
		return _Game_System_battleBgm.call(this);
	};
})();