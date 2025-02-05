//=============================================================================
// RPG Maker MZ - Advanced States
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
 * @plugindesc Limited Resists
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help limited_resists.js
 *
 * Manages a limited resource for resisting states.
 * E.g. if a charactor would be KOed but has a limited resist of 1 against KO,
 * he will not be KOed and instead the limited resist will be decreased by 1.
 *
 */

window.AuraMZ = window.AuraMZ || {};

(() => {

	// Inject custom logic to only carry out die function if death is not resisted through limited resists
	const DEATH_STATE = 1;
	const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
	Game_BattlerBase.prototype.die = function() {
		if (!this._limitedResists || this._limitedResists[DEATH_STATE] == 0) {
			_Game_BattlerBase_die.call(this);
		}
	};

	// Clears all limited state resists
	Game_BattlerBase.prototype.clearLimitedResists = function(stateId) {
		if (!this._limitedResists) {
			this._limitedResists = {};
		}

		this._limitedResists[stateId] = 0;
	}

	// Adds limited state resists
	Game_BattlerBase.prototype.addLimitedResists = function(stateId, resists) {
		if (!this._limitedResists) {
			this._limitedResists = {};
		}

		if (!this._limitedResists[stateId]) {
			this._limitedResists[stateId] = 0;
		}

		this._limitedResists[stateId] += resists;
	}

	// Injects custom logic to display the resist in the battle log or map
	const _Game_Battler_addState = Game_Battler.prototype.addState;
	Game_Battler.prototype.addState = function(stateId) {
		const canAddState = this.isStateAddable(stateId);
		if (canAddState) {
			// If the state being added has a category, check limited resists on any existing state with the same one
			let sameCategoryResistState;
			const category = $dataStates[stateId].meta.category;
			if (category) {
				sameCategoryResistState = $dataStates.filter(state => state?.meta.category === category).find(state => this._limitedResists?.[state.id])
			}
			if (this._limitedResists?.[stateId] > 0 || sameCategoryResistState) {
				if ($gameParty.inBattle()) {
						const logWin = BattleManager._logWindow;
						logWin.push("pushBaseLine");
						logWin.push("addText", `${this.name()} resists ${$dataStates[stateId].name}`);
						logWin.push("waitForNewLine");
					if (BattleManager._phase !== "action") {
						logWin.push("clear");
					} else {
						logWin.push("popBaseLine");
					}
				} else {
					$gameMessage.add(`${this.name()} resists ${$dataStates[stateId].name}!!`);
				}
				if (sameCategoryResistState) {
					this._limitedResists[sameCategoryResistState.id]--;
				} else {
					this._limitedResists[stateId]--;
					this.revive();
				}
			} else {
				_Game_Battler_addState.call(this, stateId);
			}
		}
	}
})();

