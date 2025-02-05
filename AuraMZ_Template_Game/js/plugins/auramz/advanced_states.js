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
 * @plugindesc Advanced States
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help advanced_states.js
 *
 * Adds additional tags to give states special behavior.
 *
 * Added tags:
 * <persist_death: CONDITION>
 * - The state is only removed on death if the CONDITION is true.
 * <persist_battle_end: CONDITION>
 * - The state is only removed on battle end if the CONDITION is true.
 * <persist_recover_all: CONDITION>
 * - The state is only removed on recovery if the CONDITION is true.
 * <on_make_damage_value: SCRIPT>
 * - Executes the SCRIPT whenever an action creating a damage occurs.
 *   Can e.g. modify the value of the damage based on custom logic.
 *   The state is checked both for subject and the target of the action.
 * <onEraseState: SCRIPT>
 * - SCRIPT that is executed when the corresponding state is removed through any means.
 * <onExpireState: SCRIPT>
 * - SCRIPT that is executed when the corresponding state is removed because it expired.
 * <seal_items: CONDITION>
 * - The trait seals the usage of items if the CONDITION is true.
 * <category: STRING>
 * - Denotes the state as belonging to a particular category. If a state is applied with
 *   the same category as one the target already has, its duration will be refreshed.
 * <item times plus: NUMBER>
 * - When using an item, an extra NUMBER items of the same type will be used. E.g. when consuming
 * a health potion and the actor has a trait with item times plus: 1, two health potions will be
 * consumed in one action.
 * <conditional_seal_skill: CONDITION>
 * - The trait seals the usage of skills if the CONDITION is true.
 */

window.AuraMZ = window.AuraMZ || {};

(() => {

	// Inject custom logic to only clear states that are not persisted if
	// a persist tag is defined
	const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
	Game_BattlerBase.prototype.clearStates = function() {
		if (this._persist_tag) {
			this.clearNotPersistedStates(this._persist_tag);
			this._persist_tag = undefined;
		} else {
			_Game_BattlerBase_clearStates.call(this);
		}
	};

	// Only remove states that whose corresponding persist tag doesn't evaluate to true
	Game_BattlerBase.prototype.clearNotPersistedStates = function(persistTag) {
		for (const state of this.states()) {
			if (!eval(state.meta[persistTag])) {
				this.eraseState(state.id);
			}
		}
	}

	// Inject custom logic to call custom logic for filtering out state removal on death
	const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
	Game_BattlerBase.prototype.die = function() {
		this._persist_tag = "persist_death";
		_Game_BattlerBase_die.call(this);
	}

	// Inject custom logic for persisting states after battle end
	Game_Battler.prototype.removeBattleStates = function() {
		for (const state of this.states()) {
			if (state.removeAtBattleEnd && !eval(state.meta.persist_battle_end)) {
				this.removeState(state.id);
			}
		}
	};

	// Inject custom logic for persisting states after recover all
	const _Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
	Game_BattlerBase.prototype.recoverAll = function() {
		this._persist_tag = "persist_recover_all";
		_Game_BattlerBase_recoverAll.call(this);
	};

	// Inject custom logic.Once, for memorizing targt so that sub functions have natural access to it,
	// secondly for custom tag to modify value based on states
	// Avod overwriting the method so it's compatible with potential other plugins adding logic to it
	const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
	Game_Action.prototype.makeDamageValue = function(target, critical) {
		this._currentTarget = target;

		let value = _Game_Action_makeDamageValue.call(this, target, critical);
		value = this.onMakeDamageValue(this.subject(), value, target, critical);
		value = this.onMakeDamageValue(target, value, target, critical);

		return value;
	};

	Game_Action.prototype.onMakeDamageValue = function(battler, value, target, critical) {
		const traitObjects = battler.traitObjects();
		for (const trait of traitObjects) {
			if (trait.meta.on_make_damage_value) {
				eval(trait.meta.on_make_damage_value);
			}
		}

		return value;
	}

	// Inject custom note tag onEraseState and onExpireState
	// onEraseState: State is erased through any means
	// onExpireState: State is about to be erased and has expired
	const _Game_Battler_eraseState = Game_Battler.prototype.eraseState;
	Game_Battler.prototype.eraseState = function(stateId) {
		const hadState = this.isStateAffected(stateId);
		if (this.isStateExpired(stateId) && $dataStates[stateId].meta.onExpireState) {
			eval($dataStates[stateId].meta.onExpireState);
		}
		_Game_Battler_eraseState.call(this, stateId);
		if (hadState && $dataStates[stateId].meta.onEraseState) {
			eval($dataStates[stateId].meta.onEraseState);
		}
	};

	// Checks if the usage of items is sealed
	Game_BattlerBase.prototype.isItemsSealed = function(item) {
		return this.traitObjects().some(trait => trait.meta.seal_items && eval(trait.meta.seal_items));
	}

	// Inject custom logic to consider item sealing
	const _Game_BattlerBase_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
	Game_BattlerBase.prototype.meetsItemConditions = function(item) {
		return _Game_BattlerBase_meetsItemConditions.call(this, item) && !this.isItemsSealed(item);
	};

	// Disables the use of items if they are sealed
	Window_ActorCommand.prototype.addItemCommand = function() {
		this.addCommand(TextManager.item, "item", !this._actor.isItemsSealed());
	};

	// Inject custom logic to allow for state categories and refresh duration on states with the
	// same category instead of adding a new one
	const _Game_Battler_addState = Game_Battler.prototype.addState;
	Game_Battler.prototype.addState = function(stateId) {
		if (this.isStateAddable(stateId)) {
			if (!this.isStateAffected(stateId)) {
				const category = $dataStates[stateId].meta.category;
				if (category) {
					const sameCatState = this.states().find(state => state.meta.category === category);
					if (sameCatState) {
						if ($dataStates[stateId].autoRemovalTiming === 0) {
							this.removeState(sameCatState.id);
							_Game_Battler_addState.call(this, stateId);
						} else {
							const turns = this.calcStateTurns(stateId);
							if (turns > this._stateTurns[sameCatState.id]) this._stateTurns[sameCatState.id] = turns;
						}
					} else {
						_Game_Battler_addState.call(this, stateId);
					}
				} else {
					_Game_Battler_addState.call(this, stateId);
				}
			} else {
				// Only refresh duration of an existing state if the new duration is higher than the current
				const turns = this.calcStateTurns(stateId);
				if (turns > this._stateTurns[stateId]) {
					this._stateTurns[stateId] = turns;
				}
				this._result.pushAddedState(stateId);
			}
		}
	};

	// Consider the battler resistant to a state if they have resistance to another with the same category
	const _Game_Battler_isStateResist = Game_Battler.prototype.isStateResist;
	Game_BattlerBase.prototype.isStateResist = function(stateId) {
		const category = $dataStates[stateId].meta.category;
		if (category) {
			return this.stateResistSet().some(otherStateId =>
				otherStateId == stateId || $dataStates[stateId].meta.category == $dataStates[otherStateId].meta.category
			);
		} else {
			return _Game_Battler_isStateResist.call(this, stateId);
		}
	};

	Game_Battler.prototype.calcStateTurns = function(stateId) {
		const state = $dataStates[stateId];
		const variance = 1 + Math.max(state.maxTurns - state.minTurns, 0);
		return state.minTurns + Math.randomInt(variance);
	};
	
	// Get the extra number of item uses. If an item has already been consumed
	// through a higher level logic, it can be passed into the alreadyConsumed param
	Game_BattlerBase.prototype.numItemUses = function(item, alreadyConsumed = 0) {
		let itemTimes = 1;
		if (DataManager.isItem(item) && item.consumable) {
			const traitObjects = this.traitObjects();
			for (const traitObject of traitObjects) {
				if (traitObject.meta["item times plus"]) {
					itemTimes += eval(traitObject.meta["item times plus"]);
				}
			}
		}

		return Math.min($gameParty.numItems($dataItems[item.id]) + alreadyConsumed, itemTimes);
	};

	// Inject custom logic for using multiple items during an action
	const _Game_Action_repeatTargets = Game_Action.prototype.repeatTargets;
	Game_Action.prototype.repeatTargets = function(targets) {
		const repeatedTargets = _Game_Action_repeatTargets.call(this, targets);
		if (!this.isItem()) {
			return repeatedTargets;
		}

		const itemRepeatTargets = [];
		const numItemUses = this.subject().numItemUses(this.item(), 0);
		itemRepeatTargets.push(...repeatedTargets);
		for (let i = 1; i < numItemUses; i++) {
			this.subject().consumeItem(this.item());
			this.applyGlobal();
			itemRepeatTargets.push(...repeatedTargets);
		}
		return itemRepeatTargets;
	};

	// Inject custom logic to repeat the application of an item
	// based on the item times plus tag
	const _Scene_ItemBase_applyItem = Scene_ItemBase.prototype.applyItem;
	Scene_ItemBase.prototype.applyItem = function() {
		// Subtract one since one item has already been consumed from the higher level of the call
		const itemTimes = this.user().numItemUses(this.item(), 1);
		_Scene_ItemBase_applyItem.call(this);
		for (let i = 1; i < itemTimes; ++i) {
			// Need inject item consumption for repeated item uses
			this.user().useItem(this.item());
			_Scene_ItemBase_applyItem.call(this);
		}
	};
	
	// Inject conditional_seal_skill tag that may seal skills based on a dynamic tag condition
	const _Game_BattlerBase_isSkillSealed = Game_BattlerBase.prototype.isSkillSealed;
	Game_BattlerBase.prototype.isSkillSealed = function(skillId) {
		const traitObjects = this.traitObjects();
		for (const traitObject of traitObjects) {
			const conditionalSealSkill = traitObject.meta.conditional_seal_skill;
			if (conditionalSealSkill) {
				if (!traitObject.conditionalSealCheck) {
					traitObject.conditionalSealCheck = new Function("skillId", conditionalSealSkill);
				}
				if (traitObject.conditionalSealCheck.call(this, skillId)) {
					return true;
				}
			}
		}

		return _Game_BattlerBase_isSkillSealed.call(this, skillId);
	};
})();