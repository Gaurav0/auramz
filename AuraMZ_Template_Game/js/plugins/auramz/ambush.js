//=============================================================================
// RPG Maker MZ - Ambush / Surprise Attack Mechanic on Open Field
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
 * @plugindesc  Ambush / Surprise Attack Mechanic on Open Field
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help ambush.js
 *
 * When battle is initiated while the player is facing an opponent with his back,
 * the enemy will get an ambush. When battle is initiated while the player faces an
 * opponents back, then a surprise attack is initiated.
 *
 * @command makeNextBattleAmbush
 * @text Make Next Battle Ambush
 * @desc Makes the next battle an ambush
 *
 * @command makeNextBattleSurprise
 * @text Make Next Battle Surprise
 * @desc Makes the next battle an enemy surprise
 *
 * Dependencies:
 * - tags.js
 * - detectors.js
 */

(() => {

	const PLUGIN_ID = "ambush";

	// Registers a choice enablement condition in the message data
	PluginManager.registerCommand(PLUGIN_ID, "makeNextBattleAmbush", _ => {
		$gameTemp._nextBattleAmbush = true;
	});
	
	// Registers a choice enablement condition in the message data
	PluginManager.registerCommand(PLUGIN_ID, "makeNextBattleSurprise", _ => {
		$gameTemp._nextBattleSurprise = true;
	});

	// Inject additional logic for BattleProcessing command
	const _Game_Interpreter_command301 = Game_Interpreter.prototype.command301;
	Game_Interpreter.prototype.command301 = function(params) {
		_Game_Interpreter_command301.call(this, params);

		const eventID = this.eventId();
		const event = $gameMap.event(eventID);

		// Restrict the tritggering of preemptive attacks / surprise attacks
		// to on field enemies with the detector tag. Otherwise they can occur
		// during story battles.
		const detectorTags = DetectorTagFactory.createDetectorTagsFromNote($dataMap.events[eventID].note);
		const detectorTag = detectorTags.find(tag => tag instanceof DetectorTag);

		if ($gameTemp._nextBattleAmbush) {
			BattleManager._preemptive = true;
			$gameTemp._nextBattleAmbush = false;
		} else if ($gameTemp._nextBattleSurprise) {
			BattleManager._surprise = true;
			$gameTemp._nextBattleSurprise = false;
		} else if (detectorTag != undefined) {
			const playerDirection = $gamePlayer.direction();
			const enemyDirection = event._prelockDirection;

			if (playerDirection == enemyDirection) {
				$gameTemp._nextBattleAmbush = false;
				const x = $gameMap.roundXWithDirection(event.x, enemyDirection);
				const y = $gameMap.roundYWithDirection(event.y, enemyDirection);
				if ($gamePlayer.pos(x, y)) {
					BattleManager._surprise = true;
				} else {
					BattleManager._preemptive = true;
				}
			}
		}

		return true;
	};

})();

