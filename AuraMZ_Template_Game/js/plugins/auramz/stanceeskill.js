//=============================================================================
// RPG Maker MZ - StanceSkill Tag
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
 * @plugindesc StanceSkill Tag
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help stanceskill.js
 *
 * This plugin parses the stanceskill tag. When applied to a skill,
 * the skill can be activated to have a passive effect. Only one skill
 * can be the current stanceeskill.
 *
 * [stanceskill itemType itemId]
 *
 * itemType = armor or weapon
 * itemID is the armor/weapon id that will be applied upon activation of the stanceskill.
 *
 * Note that when learning a new skill it will automatically upgrade the equipped
 * stance skill if the skill has a <rank:x> tag 1 higher and an ID 1 higher than
 * the equipped one.
 *
 * Dependencies:
 * - tags.js
 * - prefix_itemnames_objects.js
 */

class StanceSkillTagFactory {

	static get TAG_TYPE_STANCESKILL() { return "stanceskill"; }

	// Creates an autoskill tag object from a list of tokens
	static createStanceSkillTagFromTokens(tokens) {
		return new StanceSkillTag(tokens[0], tokens[1]);
	}

	// Creates all autoskill tags from a note
	static createStanceSkillTagsFromNote(note) {
		return TagFactory.createTagsFromNote(
			StanceSkillTagFactory.TAG_TYPE_STANCESKILL, StanceSkillTagFactory.createStanceSkillTagFromTokens, note
		);
	}
}

// Holds the data of an stance tag
class StanceSkillTag {
	constructor(type, itemID) {
		this._type = type;
		this._itemID = parseInt(itemID);
	}
}

// Inject the tag checks into the existing logic
(() => {
	// Inject processing of Stance Skills
	const _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		_Scene_Boot_start.call(this);
		DataManager.processStanceSkills();
	};

	// Processing of Stance Skills
	DataManager.processStanceSkills = function() {
		for (const skill of $dataSkills) {
			if (!skill) {
				continue;
			}

			const stanceSkillTags = StanceSkillTagFactory.createStanceSkillTagsFromNote(skill.note);
			if (stanceSkillTags.length > 0) {
				const stanceSkillTag = stanceSkillTags[0];
				if (stanceSkillTag._type == "weapon") {
					skill.stance = new Game_Item($dataWeapons[stanceSkillTag._itemID]);
				} else if (stanceSkillTag._type == "armor") {
					skill.stance = new Game_Item($dataArmors[stanceSkillTag._itemID]);
				}
			}
		}
	};

	// Gets all stance skills from a battler
	Game_Actor.prototype.stanceSkills = function() {
		return this.skills().filter(skill => skill.stance);
	}

	// Get the stance skill of this battler. Undefined if no stance is defined.
	Game_Actor.prototype.stanceSkill = function() {
		if (this._stanceSkill) {
			const stanceSkill = $dataSkills[this._stanceSkill];
			if (stanceSkill.stance) {
				return stanceSkill.stance.object();
			}
		}

		return undefined;
	}

	const ADD_NOTE_TAG = "add parameter changes";
	const MULTIPLIER_NOTE_TAG = "multiply parameter changes";

	// Injects logic for applying stanceskill changes to attributes
	const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
	Game_Actor.prototype.paramPlus = function(paramId) {
		let value = _Game_Actor_paramPlus.call(this, paramId);
		const stanceSkill = this.stanceSkill();
		if (stanceSkill != undefined) {
			const add = stanceSkill.meta[ADD_NOTE_TAG] ? eval(stanceSkill.meta[ADD_NOTE_TAG]) : 0;
			const multiplier = stanceSkill.meta[MULTIPLIER_NOTE_TAG] ? eval(stanceSkill.meta[MULTIPLIER_NOTE_TAG]) : 1;
			value += Math.ceil((stanceSkill.params[paramId] + add) * multiplier);
		}
		return value;
	};

	// Injects logic for applying stanceskill traits to traits
	const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
	Game_Actor.prototype.traitObjects = function() {
		const objects = _Game_Actor_traitObjects.call(this);
		const stanceSkill = this.stanceSkill();
		if (stanceSkill != undefined) {
			return objects.concat(stanceSkill);
		}
		return objects;
	};

	// Make stances deactivateable at all times
	const _Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
	Game_BattlerBase.prototype.canUse = function(item) {
		if (item && DataManager.isSkill(item) && this.canCancelStance(item.id)) {
			return true;
		}

		return _Game_BattlerBase_canUse.call(this, item);
	};

	// A stance can be cancelled if it is currently active
	Game_BattlerBase.prototype.canCancelStance = function(skillId) {
		return this._stanceSkill == skillId;
	};

	// Executes a stance
	const _Game_action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		const stance = this.item().stance;
		if (stance) {
			if (target._stanceSkill == this.item().id) {
				// If this is already the stance skill, unset the stance skill
				target._stanceSkill = undefined;
			} else {
				// Otherwise, set this skill as the stance skill
				target._stanceSkill = this.item().id;
			}
		}

		_Game_action_apply.call(this, target);
	};

	// Makes the battle log show the correct message
	const _Window_BattleLog_displayItemMessage = Window_BattleLog.prototype.displayItemMessage;
	Window_BattleLog.prototype.displayItemMessage = function(fmt, subject, item) {
		const stance = item.stance;
		if (stance) {
			// When this stance is set, then show the leaves message, otherwise show enters message
			let action = "enters";
			if (subject._stanceSkill == item.id) {
				action = "leaves";
			}

			if (fmt) {
				this.push("addText", fmt.format(subject.name(), item.name, action));
			}
		} else {
			_Window_BattleLog_displayItemMessage.call(this, fmt, subject, item);
		}
	};

	// Adds the prefix "Stance: " if the skill is the actors current stance
	const _Window_Base_itemName = Window_Base.prototype.itemName;
	Window_Base.prototype.itemName = function(item, actor) {
		if (actor && actor._stanceSkill == item.id) {
			return "Stance: " + item.name;
		}

		return _Window_Base_itemName.call(this, item, actor);
	}

	// Inject logic to execute on battle start effects on stance skills
	const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
	Game_Battler.prototype.onBattleStart = function(advantageous) {
		this.applyOnBattleStartStanceEffects();
		_Game_Battler_onBattleStart.call(this, advantageous);
	};

	Game_Battler.prototype.applyOnBattleStartStanceEffects = function() {
		if (this._stanceSkill) {
			const onBattleStartEffect = $dataSkills[this._stanceSkill].meta["stance_on_battle_start_effect"];
			if (onBattleStartEffect) {
				eval(onBattleStartEffect);
			}
		}
	}

	const _Scene_Skill_onItemOk = Scene_Skill.prototype.onItemOk;
	Scene_Skill.prototype.onItemOk = function() {
		const item = this.item();
		const isStanceSkill = StanceSkillTagFactory.createStanceSkillTagsFromNote(item.note).length > 0;
		if (isStanceSkill) {
			const actor = this.actor();
			if (actor._stanceSkill == item.id) {
				// If this is already the stance skill, unset the stance skill
				actor._stanceSkill = undefined;
			} else {
				// Otherwise, set this skill as the stance skill
				actor._stanceSkill = item.id;
			}
			this.activateItemWindow();
		} else {
			_Scene_Skill_onItemOk.apply(this);
		}
	};

	// Inject logic to upgrade stance skill if the next rank is learned
	const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
	Game_Actor.prototype.learnSkill = function(skillId) {
		_Game_Actor_learnSkill.call(this, skillId);
		const stanceSkill = $dataSkills[this._stanceSkill];
		const newSkill = $dataSkills[skillId];
		if (newSkill?.id === stanceSkill?.id + 1) {
			const stanceSkillRank = parseInt(stanceSkill?.meta.rank) || 1;
			const newSkillRank = parseInt(newSkill?.meta.rank) || 1;
			if (newSkillRank === stanceSkillRank + 1) {
				this._stanceSkill = newSkill.id;
			}
		}
	};
})();
