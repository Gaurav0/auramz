//=============================================================================
// RPG Maker MZ - Game Over
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
 * @plugindesc Custom Game Over
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help game_over.js
 *
 * Allows to customize the game over behavior with common events.
 *
 * @param gameOverCommonEventID
 * @desc Instead of getting the game over screen, the common event with this ID will be called instead.
 * @text Game Over Common Event ID
 * @type common_event
 *
 * @param useOldGameOverCondition
 * @desc If this condition evaluates to true, then instead of calling a common event, the plugin will defer
 * to the previous game over implementation. If no other plugins overwrite it, this means causing a regular game over.
 * @text Use Old Game Over Condition
 * @type text
 */

window.AuraMZ = window.AuraMZ || {};
AuraMZ.GameOver = {};

(($) => {
	const PLUGIN_NAME = "game_over"
	const PARAMS = PluginManager.parameters(PLUGIN_NAME);
	$.commonEventDeath = PARAMS["gameOverCommonEventID"];
	$.useOldGameOverCondition = PARAMS["useOldGameOverCondition"];

	const _Scene_Base_checkGameover = Scene_Base.prototype.checkGameover;
	Scene_Base.prototype.checkGameover = function() {
		if ($gameParty.isAllDead() && !$gameTemp._reservedGameOverCommonEvent) {
			if (eval($.useOldGameOverCondition)) {
				_Scene_Base_checkGameover.call(this);
			} else {
				$gameTemp._reservedGameOverCommonEvent = true;
				$gameTemp.reserveCommonEvent($.commonEventDeath);
			}
		}
	};

	const _BattleManager_processDefeat = BattleManager.processDefeat;
	BattleManager.processDefeat = function() {
		_BattleManager_processDefeat.call(this);

		if (!eval($.useOldGameOverCondition)) {
			$gameTemp._reservedGameOverCommonEvent = true;
			$gameTemp.reserveCommonEvent($.commonEventDeath);
		}
	};

})(AuraMZ.GameOver)
