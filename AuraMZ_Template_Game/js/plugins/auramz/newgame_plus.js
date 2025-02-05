//=============================================================================
// RPG Maker MZ - New Game Plus Mechanic
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
 * @plugindesc  New Game Plus Mechanic
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help newgame_plus.js
 *
 * Starts a newgame plus while carrying over specified data from the last playthrough. 
 *
 * @command startNewGamePlus
 * @text Start NewGame+
 * @desc Starts a new game plus
 *
 * @command carryOverVariableRange
 * @text Carry Over Variable Range
 * @desc Carries over the value of the variables within the given range
 *
 * @arg fromId
 * @type number
 * @text fromId
 * @desc The first variable that should be carried over
 *
 * @arg toId
 * @type number
 * @text toId
 * @desc The last variable that should be carried over
 *
 * @command carryOverSwitchRange
 * @text Carry Over Switch Range
 * @desc Carries over the value of the switches within the given range
 *
 * @arg fromId
 * @type number
 * @text fromId
 * @desc The first switch that should be carried over
 *
 * @arg toId
 * @type number
 * @text toId
 * @desc The last switch that should be carried over
 * 
 */

window.AuraMZ = window.AuraMZ || {};

(() => {
	const PLUGIN_NAME = "newgame_plus";
	const carryOverVariableRanges = [];
	const carryOverSwitchRanges = [];

	AuraMZ.startNewGamePlus = function() {
		// Save the play time
		const frameCount = Graphics.frameCount;

		// Memorize variable values for carry over
		const variableCarryOvers = [];
		for (const variableRange of carryOverVariableRanges) {
			const fromId = variableRange.fromId;
			const toId = variableRange.toId;

			for (let i = fromId; i <= toId; ++i) {
				variableCarryOvers[i] = $gameVariables.value(i);
			}
		}

		// Memorize switch values for carry over
		const switchCarryOvers = [];
		for (const switchRange of carryOverSwitchRanges) {
			const fromId = switchRange.fromId;
			const toId = switchRange.toId;

			for (let i = fromId; i <= toId; ++i) {
				switchCarryOvers[i] = $gameSwitches.value(i);
			}
		}

		DataManager.setupNewGame();
		SceneManager.goto(Scene_Map);
		$gameMap.setupEvents();

		Graphics.frameCount = frameCount;

		// Re-apply memorized carried over variables
		for (const entry of variableCarryOvers.entries()) {
			if (entry[1] != undefined) {
				$gameVariables.setValue(entry[0], entry[1]);
			}
		}

		// Re-apply memorized carried over switches
		for (const entry of switchCarryOvers.entries()) {
			if (entry[1] != undefined) {
				$gameSwitches.setValue(entry[0], entry[1]);
			}
		}
	}


	// Command that starts a new game plus
	PluginManager.registerCommand(PLUGIN_NAME, "startNewGamePlus", _args => {
		AuraMZ.startNewGamePlus();
	});

	// Command that marks a variable range to be carried over
	PluginManager.registerCommand(PLUGIN_NAME, "carryOverVariableRange", args => {
		carryOverVariableRanges.push(args);
	});

	// Command that marks a switch range to be carried over
	PluginManager.registerCommand(PLUGIN_NAME, "carryOverSwitchRange", args => {
		carryOverSwitchRanges.push(args);
	});
})();

