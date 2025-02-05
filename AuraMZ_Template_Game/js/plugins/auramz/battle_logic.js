//=============================================================================
// RPG Maker MZ - Battle Logic
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
 * @plugindesc Battle Logic
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help battle_logic.js
 *
 * Collection of various additions/modifications to elements of the battle logic.
 * - Biggest change is the rework of the luck stat to have a stronger effect on random
 * events during battle. On the other hand, 100% chance events are unaffected by luck.
 * - Recovery rate and Pharmacology affecting the amount of HP gained from an HP drain attack,
 * - Escapes are always successful
 *
 * Added tags:
 * <enemy_on_battle_start: SCRIPT>
 * - Executes the SCRIPT for each enemy on battle start.
 * <substitute_condition: CONDITION>
 * - Only applies the target subsitution from a state if the CONDITION evaluates to true.
 *
 * @param probablityPerLuck
 * @type number
 * @text Probability Per Luck (In Permil)
 * @desc Amount Probability change on the luck rate applied a probabilistic battle event, comparing the
 * subject and the target luck.
 * @default 25
 *
 * @param luckRateMax
 * @type number
 * @text Luck Rate Max
 * @desc Maximum value of the luck rate. 200% means that the probability of an event may at most double.
 * @default 200
 *
 * @param luckRateMin
 * @type number
 * @text Luck Rate Min
 * @desc Minimum value of the luck rate. 50% means that the probability of an event may at most half.
 * @default 50
 *
 * @param speedPerLuck
 * @type number
 * @text Speed Per Luck (In Permil)
 * @desc Increases speed (=initiative) by speedPerLuck/1000 per luck. 
 * @default 50
 * 
 * @param minDamageCondition
 * @type string
 * @text Min Damage Condition
 * @desc Condition under which 0 damage is always treated as minimum 1 damage
 * @default this.item().damage.elementId != 0
 *
 */

window.AuraMZ = window.AuraMZ || {};
AuraMZ.BattleLogic = {};

(($) => {
	const PLUGIN_NAME = "battle_logic";
	const PARAMS = PluginManager.parameters(PLUGIN_NAME);
	$.probabilityPerLuck = parseInt(PARAMS["probablityPerLuck"]) / 1000.0;
	$.luckRateMax = parseInt(PARAMS["luckRateMax"]) / 100.0;
	$.luckRateMin = parseInt(PARAMS["luckRateMin"]) / 100.0;
	$.speedPerLuck = parseInt(PARAMS["speedPerLuck"]) / 1000.0;
	$.minDamageCondition = PARAMS["minDamageCondition"];
	
	// Overwrite luck formula handling. The luck rate increases by 1 probabilityPerLuck for each
	// luck of the subject and decreases by the same amount of each luck of the target.
	Game_Action.prototype.lukEffectRate = function(target) {
		return Math.min($.luckRateMax, Math.max(1.0 + (this.subject().luk - target.luk) * $.probabilityPerLuck, $.luckRateMin));
	};

	// Inject logic that a 100% effect doesn't get affected by luck
	Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
		let chance = effect.value1;
		if (!this.isCertainHit()) {
			chance *= target.stateRate(effect.dataId);
			if (chance < 1.0) {
				chance *= this.lukEffectRate(target);
			}
		}
		if (Math.random() < chance) {
			target.addState(effect.dataId);
			this.makeSuccess(target);
		}
	};

	// Overwrite logic that a 100% effect doesn't get affected by luck
	Game_Action.prototype.itemEffectAddDebuff = function(target, effect) {
		let chance = target.debuffRate(effect.dataId);
		if (chance < 1.0) chance * this.lukEffectRate(target);
		if (Math.random() < chance) {
			target.addDebuff(effect.dataId, effect.value1);
			this.makeSuccess(target);
		}
	};

	// Overwrite logic to have luck affect evasion
	// Also decrease enemy evasion by hit if hit >= 1
	Game_Action.prototype.itemEva = function(target) {
		if (this.isPhysical()) {
			const hit = Math.max(0, this.itemHit(target) - 1);
			return Math.max(0, target.eva / this.lukEffectRate(target) - hit);
		} else if (this.isMagical()) {
			return target.mev / this.lukEffectRate(target);
		} else {
			return 0;
		}
	};

	// Overwrite logic to respect luk during speed computation
	Game_Action.prototype.speed = function() {
		const agi = this.subject().agi;
		const luk = this.subject().luk;
		let speed = agi + Math.randomInt(Math.floor(agi / 4 + luk * $.speedPerLuck));
		if (this.item()) {
			speed += this.item().speed;
		}
		if (this.isAttack()) {
			speed += this.subject().attackSpeed();
		}
		return speed;
	};

	// Overwrite variance application to shift probability distribution of
	// variance towards the max value based on luck difference to target
	// Does not affect heals
	Game_Action.prototype.applyVariance = function(damage, variance) {
		const amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));
		// Reduce random component by luck rate and instead add fixed variance based on luck rate
		const lukEffectRate = damage > 0 ? this.lukEffectRate(this._currentTarget) : 1;
		const amp1 = lukEffectRate > 1 ? amp / lukEffectRate : amp;
		const amp2 = lukEffectRate < 1 ? amp * lukEffectRate : amp;
		const v = Math.floor(Math.randomInt(amp1 + 1) + Math.randomInt(amp2 + 1) - amp1);
		return damage >= 0 ? damage + v : damage - v;
	};
	
	// Inject custom substitute logic
	BattleManager.applySubstitute = function(target) {
		const substitute = target.friendsUnit().substituteBattler();
		if (substitute && target !== substitute && this.checkSubstitute(substitute, target)) {
			this._logWindow.displaySubstitute(substitute, target);
			return substitute;
		}
		return target;
	};

	// Subsitute triggers iff at least one substitute state evaluates to true
	BattleManager.checkSubstitute = function(substitute, target) {
		for (const state of substitute.states()) {
			if (eval(state.meta.substitute_condition)) {
				return true
			}
		}

		return false
	};

	// Inject custom logic to have the protect target also do a counter attack check
	BattleManager.invokeNormalAction = function(subject, target) {
		const realTarget = this.applySubstitute(target);
		if (Math.random() < this._action.itemCnt(realTarget)) {
			this.invokeCounterAttack(subject, realTarget);
		} else {
			this._action.apply(realTarget);
		}
		this._logWindow.displayActionResults(subject, realTarget);
	};

	// Remove successful escape message
	BattleManager.displayEscapeSuccessMessage = function() { };

	// Hard set escape ratio to 1
	BattleManager.makeEscapeRatio = function() {
		this._escapeRatio = 1;
	};
	
	// Inject custom logic for respecting pharmacology in HP drain skills
	const _Game_Action_gainDrainedHp = Game_Action.prototype.gainDrainedHp;
	Game_Action.prototype.gainDrainedHp = function(value) {
		let gainTarget = this.subject();
		if (this._reflectionTarget) {
			gainTarget = this._reflectionTarget;
		}

		return _Game_Action_gainDrainedHp.call(this, value * gainTarget.pha * gainTarget.rec);
	};

	// Overwriting HP regeneration logic to respect recovery rate if HP regeneration is positive
	Game_Battler.prototype.regenerateHp = function() {
		const minRecover = -this.maxSlipDamage();
		let baseRecovery = this.mhp * this.hrg;
		if (baseRecovery > 0) {
			baseRecovery *= this.rec;
		}
		const value = Math.max(Math.floor(baseRecovery), minRecover);

		if (value !== 0) {
			this.gainHp(value);
		}
	};
	
	// Inject logic for handling on handling on battle start effects by skills for enemies
	const _Game_Enemy_onBattleStart = Game_Enemy.prototype.onBattleStart;
	Game_Enemy.prototype.onBattleStart = function(advantageous) {
		const enemyId = this.enemyId();
		const enemy = $dataEnemies[enemyId];
		for (const action of enemy.actions) {
			const skill = $dataSkills[action.skillId];
			if (skill.meta.enemy_on_battle_start != undefined) {
				eval(skill.meta.enemy_on_battle_start);
			}
		}

		_Game_Enemy_onBattleStart.call(this, advantageous);
	};
	
	// If the minimum damage condition applies, sets 0 damage values to 1
	const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function(target, value) {
		if (value == 0 && eval($.minDamageCondition)) {
			value = 1;
		}

		_Game_Action_executeDamage.call(this, target, value);
	}
})(AuraMZ.BattleLogic);

