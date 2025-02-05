//=============================================================================
// RPG Maker MZ - AutoSkill Tag
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/08/02
// 1.0.1 2021/12/12 - Fixed RPGM 1.4.0 incompatibility
// 1.0.2 2022/05/13 - Fixed Auto-Skill disabled in Main Menu if skill cost cannot be paid
//=============================================================================

/*:
 * @target MZ
 * @plugindesc AutoSkill Tag
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help autoskill.js
 *
 * This plugin introduces the autoskill tag. When applied to a skill,
 * the skill will be automatically executed at the start of a battle.
 *
 * [autoskill true]
 *
 * Note that when learning a new skill it will automatically upgrade the equipped
 * auto skill if the skill has a <rank:x> tag 1 higher and an ID 1 higher than
 * the equipped one.
 *
 * Dependencies:
 * - tags.js
 * - prefix_itemnames_objects.js
 */

class AutoSkillTagFactory {

	static get TAG_TYPE_AUTOSKILL() { return "autoskill"; }

	// Creates an autoskill tag object from a list of tokens
	static createAutoSkillTagFromTokens(_tokens) {
		return new AutoSkillTag();
	}

	// Creates all autoskill tags from a note
	static createAutoSkillTagsFromNote(note) {
		return TagFactory.createTagsFromNote(
			AutoSkillTagFactory.TAG_TYPE_AUTOSKILL, AutoSkillTagFactory.createAutoSkillTagFromTokens, note
		);
	}
}

class AutoSkillTag { }

// Inject the tag checks into the existing logic
(() => {

	// Gets all auto skills from a battler
	Game_Battler.prototype.autoSkills = function() {
		if (this.isEnemy()) {
			// Handling enemies
			const enemyId = this.enemyId();
			const enemy = $dataEnemies[enemyId];
			const autoSkills = [];
			for (const action of enemy.actions) {
				const skill = $dataSkills[action.skillId];
				const autoSkillTags = AutoSkillTagFactory.createAutoSkillTagsFromNote(skill.note);
				if (autoSkillTags.length > 0) {
					autoSkills.push(skill);
				}
			}
			return autoSkills;
		} else {
			// Handling actors
			const autoSkills = this.skills().filter(skill =>
				AutoSkillTagFactory.createAutoSkillTagsFromNote(skill.note).length > 0
			);
			return autoSkills;
		}
	}

	const _BattleManager_startBattle = BattleManager.startBattle;
	BattleManager.startBattle = function() {
		this._autoskill_subjects = [];
		_BattleManager_startBattle.call(this);
	};

	// Get the auto skill of this battler. Undefined if no autoskill is defined.
	Game_Battler.prototype.autoSkill = function() {
		if (this.isEnemy()) {
			const autoSkills = this.autoSkills();
			return autoSkills.length > 0 ? autoSkills[0] : undefined;
		} else {
			return this._autoSkill ? $dataSkills[this._autoSkill] : undefined;
		}
	}

	// Inject setting the in battle flag before starting any logic
	const Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
	Game_Unit.prototype.onBattleStart = function(advantageous) {
		this._inBattle = true;
		Game_Unit_onBattleStart.call(this, advantageous);
	};

	// Extends the default onBattleStart to auto cast all autoskills
	const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
	Game_Battler.prototype.onBattleStart = function(advantageous) {
		_Game_Battler_onBattleStart.call(this, advantageous);
		this.useAutoSkills();
	};

	Game_Battler.prototype.useAutoSkills = function() {
		const autoSkill = this.autoSkill();
		if (autoSkill != undefined) {
			const action = new Game_Action(this, false);
			action.setSkill(autoSkill.id);
			// Only execute if the battler can pay the skill cost
			if (action.isValid()) {
				this._actions.push(action);
				BattleManager._autoskill_subjects.push(this);
				BattleManager._phase = "action";
			}
		}
	}

	const _BattleManager_updateAction = BattleManager.updateAction;
	BattleManager.updateAction = function() {
		if (this._autoskill_subjects.length > 0 && this._targets.length == 0) {
			const subject = this._autoskill_subjects.shift();
			if (subject._actions.length > 0) {
				BattleManager.forceAction(subject);
				BattleManager.processForcedAction();
			}
		}

		_BattleManager_updateAction.call(this);
	};

	// Inject logic to have a condition for reductin state turns
	Game_BattlerBase.prototype.updateStateTurns = function() {
		for (const stateId of this._states) {
			if (this._stateTurns[stateId] > 0 && this.isUpdateStateTurn(stateId)) {
				this._stateTurns[stateId]--;
			}
		}
	};

	// Set condition to not reduce states on auto-skill turn (turn 0)
	Game_BattlerBase.prototype.isUpdateStateTurn = function(_stateId) {
		return !$gameParty.inBattle() || $gameTroop._turnCount > 0;
	};

	// Inject logic to not expire states on auto-skill turn (turn 0)
	Game_BattlerBase.prototype.isStateExpired = function(stateId) {
		return this._stateTurns[stateId] === 0 && $gameTroop._turnCount > 0;
	};

	// Ensure that executing an autoskill does not change preemptive or surprise state
	BattleManager.endTurn = function() {
		this._phase = "turnEnd";
		if ($gameTroop._turnCount > 0) {
			this._preemptive = false;
			this._surprise = false;
		}
	};

	// Inject the prefix "Auto: " if a skill is set as the auto skill
	const _Window_Base_itemName = Window_Base.prototype.itemName;
	Window_Base.prototype.itemName = function(item, actor) {
		if (actor && actor._autoSkill == item.id) {
			return "Auto: " + item.name;
		}

		return _Window_Base_itemName.call(this, item, actor);
	}

	// Inject logic to ignore MP costs for auto spells in the main menu
	const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
	Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
		const isAutoSkill = AutoSkillTagFactory.createAutoSkillTagsFromNote(skill.note).length > 0;
		if (isAutoSkill) {
			return !$gameParty.inBattle() || _Game_BattlerBase_canPaySkillCost.call(this, skill);
		} else {
			return _Game_BattlerBase_canPaySkillCost.call(this, skill);
		}
	};

	const Game_BattlerBase_meetsUsableItemConditions = Game_BattlerBase.prototype.meetsUsableItemConditions;
	Game_BattlerBase.prototype.meetsUsableItemConditions = function(item) {
		const isAutoSkill = AutoSkillTagFactory.createAutoSkillTagsFromNote(item.note).length > 0;
		return (isAutoSkill && !$gameParty.inBattle())
			|| Game_BattlerBase_meetsUsableItemConditions.call(this, item);
	};

	const _Scene_Skill_onItemOk = Scene_Skill.prototype.onItemOk;
	Scene_Skill.prototype.onItemOk = function() {
		const item = this.item();
		const isAutoSkill = AutoSkillTagFactory.createAutoSkillTagsFromNote(item.note).length > 0;
		if (isAutoSkill) {
			const actor = this.actor();
			if (actor._autoSkill == item.id) {
				// If this is already the auto skill, unset the auto skill
				actor._autoSkill = undefined;
			} else {
				// Otherwise, set this skill as the auto skill
				actor._autoSkill = item.id;
			}
			this.activateItemWindow();
		} else {
			_Scene_Skill_onItemOk.apply(this);
		}
	};

	// Inject logic to upgrade auto skill if the next rank is learned
	const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
	Game_Actor.prototype.learnSkill = function(skillId) {
		_Game_Actor_learnSkill.call(this, skillId);
		const autoSkill = $dataSkills[this._autoSkill];
		const newSkill = $dataSkills[skillId];
		if (newSkill?.id === autoSkill?.id + 1) {
			const autoSkillRank = parseInt(autoSkill?.meta.rank) || 1;
			const newSkillRank = parseInt(newSkill?.meta.rank) || 1;
			if (newSkillRank === autoSkillRank + 1) {
				this._autoSkill = newSkill.id;
			}
		}
	};

	// Inject logic to remove auto skill if the skill is removed
	const _Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
	Game_Actor.prototype.forgetSkill = function(skillId) {
		const autoSkill = this.autoSkill();
		if (autoSkill && autoSkill.id == skillId) {
			this._autoSkill = undefined;
		}
		_Game_Actor_forgetSkill.call(this, skillId);
	};

})();
