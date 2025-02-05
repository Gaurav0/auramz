//=============================================================================
// RPG Maker MZ - EnhanceSkill Tag
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/08/02
// 1.0.1 2021/10/10 Added on enhance/unenhance map
// 1.0.2 2022/02/06 Added tags for enhance/unenhance/onbattlestart effects
//=============================================================================

/*:
 * @target MZ
 * @plugindesc EnhanceSkill Tag
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help enhanceskill.js
 *
 * This plugin parses the enhanceskill tag. When applied to a skill,
 * the skill can be activated to have a passive effect. Only one skill
 * can be current enhanceskill.
 *
 * [enhanceskill itemType itemId]
 *
 * itemType = armor or weapon
 * itemID is the armor/weapon id that will be applied upon activation of the enhanceskill.
 *
 * Note that when learning a new skill it will automatically upgrade the equipped
 * enhance skill if the skill has a <rank:x> tag 1 higher and an ID 1 higher than
 * the equipped one.
 *
 * Dependencies:
 * - tags.js
 * - prefix_itemnames_objects.js
 */

window.AuraMZ = window.AuraMZ || {};

class EnhanceSkillTagFactory {

	static get TAG_TYPE_ENHANCESKILL() { return "enhanceskill"; }

	// Creates an autoskill tag object from a list of tokens
	static createEnhanceSkillTagFromTokens(tokens) {
		return new EnhanceSkillTag(tokens[0], tokens[1]);
	}

	// Creates all autoskill tags from a note
	static createEnhanceSkillTagsFromNote(note) {
		return TagFactory.createTagsFromNote(
			EnhanceSkillTagFactory.TAG_TYPE_ENHANCESKILL, EnhanceSkillTagFactory.createEnhanceSkillTagFromTokens, note
		);
	}
}

// Holds the data of an enhance tag
class EnhanceSkillTag {
	constructor(type, itemID) {
		this._type = type;
		this._itemID = parseInt(itemID);
	}
}

// Inject the tag checks into the existing logic
(() => {
	// Inject processing of Enhance Skills
	const _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		_Scene_Boot_start.call(this);
		DataManager.processEnhanceSkills();
	};

	// Processing of Enhance Skills
	DataManager.processEnhanceSkills = function() {
		for (const skill of $dataSkills) {
			if (!skill) {
				continue;
			}

			const enhanceSkillTags = EnhanceSkillTagFactory.createEnhanceSkillTagsFromNote(skill.note);
			if (enhanceSkillTags.length > 0) {
				const enhanceSkillTag = enhanceSkillTags[0];
				if (enhanceSkillTag._type == "weapon") {
					skill.enhance = new Game_Item($dataWeapons[enhanceSkillTag._itemID]);
				} else if (enhanceSkillTag._type == "armor") {
					skill.enhance = new Game_Item($dataArmors[enhanceSkillTag._itemID]);
				}
			}
		}
	};

	// Gets all enhance skills from a battler
	Game_Actor.prototype.enhanceSkills = function() {
		return this.skills().filter(skill => skill.enhance);
	}

	// Get the enhance skill of this battler. Undefined if no enhanceskill is defined.
	Game_Actor.prototype.enhanceSkill = function() {
		if (this._enhanceSkill) {
			const enhanceSkill = $dataSkills[this._enhanceSkill];
			if (enhanceSkill.enhance) {
				return enhanceSkill.enhance.object();
			}
		}

		return undefined;
	}

	const ADD_NOTE_TAG = "add parameter changes";
	const MULTIPLIER_NOTE_TAG = "multiply parameter changes";

	// Injects logic for applying enhanceskill changes to attributes
	const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
	Game_Actor.prototype.paramPlus = function(paramId) {
		let value = _Game_Actor_paramPlus.call(this, paramId);
		const enhanceSkill = this.enhanceSkill();
		if (enhanceSkill != undefined) {
			const add = enhanceSkill.meta[ADD_NOTE_TAG] ? eval(enhanceSkill.meta[ADD_NOTE_TAG]) : 0;
			const multiplier = enhanceSkill.meta[MULTIPLIER_NOTE_TAG] ? eval(enhanceSkill.meta[MULTIPLIER_NOTE_TAG]) : 1;
			value += Math.ceil((enhanceSkill.params[paramId] + add) * multiplier);
		}
		return value;
	};

	// Injects logic for applying enhanceskill traits to traits
	const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
	Game_Actor.prototype.traitObjects = function() {
		const objects = _Game_Actor_traitObjects.call(this);
		const enhanceSkill = this.enhanceSkill();
		if (enhanceSkill != undefined) {
			return objects.concat(enhanceSkill);
		}
		return objects;
	};

	// Make Enhancement spells deactivateable at all times
	const _Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
	Game_BattlerBase.prototype.canUse = function(item) {
		if (item && DataManager.isSkill(item) && this._enhanceSkill == item.id) {
			return true;
		}

		return _Game_BattlerBase_canUse.call(this, item);
	};

	// Activates an enhance skill
	Game_BattlerBase.prototype.enhance = function(skillId) {
		// Check if there is an active enhance skill and if so first unenhance it
		if (this._enhanceSkill) {
			this.unenhance();
		}

		const onEnhance = $dataSkills[skillId].meta["on_enhance"];
		if (onEnhance) {
			eval(onEnhance);
		}
		this._enhanceSkill = skillId;
	}

	// Deactivates current enhance skill
	Game_BattlerBase.prototype.unenhance = function() {
		if (this._enhanceSkill) {
			const onUnenhance = $dataSkills[this._enhanceSkill].meta["on_unenhance"];
			if (onUnenhance) {
				eval(onUnenhance);
			}
			this._enhanceSkill = undefined;
		}
	}

	// Executes an enhance skill
	const _Game_action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		const enhance = this.item().enhance;
		if (enhance) {
			if (target._enhanceSkill == this.item().id) {
				// If this is already the enhance skill, unset the enhance skill
				target.unenhance();
			} else {
				// Otherwise, set this skill as the enhance skill
				target.enhance(this.item().id);
			}
		}

		_Game_action_apply.call(this, target);
	};

	// Canceling enhancement spells should not incure a cost
	const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
	Game_BattlerBase.prototype.paySkillCost = function(skill) {
		if (this._enhanceSkill != skill.id) {
			// Don't pay costs if we are cancelling an enhancement skill
			_Game_BattlerBase_paySkillCost.call(this, skill);
		}
	};

	// Makes the battle log show the correct message
	const _Window_BattleLog_displayItemMessage = Window_BattleLog.prototype.displayItemMessage;
	Window_BattleLog.prototype.displayItemMessage = function(fmt, subject, item) {
		const enhance = item.enhance;
		if (enhance) {
			// When this enhancement is set, then show the leaves message, otherwise show enters message
			let action = "casts";
			if (subject._enhanceSkill == item.id) {
				action = "cancels";
			}

			if (fmt) {
				this.push("addText", fmt.format(subject.name(), item.name, action));
			}
		} else {
			_Window_BattleLog_displayItemMessage.call(this, fmt, subject, item);
		}
	};

	// Adds the prefix "Enhance: " if the skill is the actors current enhance spell
	const _Window_Base_itemName = Window_Base.prototype.itemName;
	Window_Base.prototype.itemName = function(item, actor) {
		if (actor && actor._enhanceSkill == item.id) {
			return "Enhance: " + item.name;
		}

		return _Window_Base_itemName.call(this, item, actor);
	}

	// Inject logic to execute on battle start effects on enhance skills
	const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
	Game_Battler.prototype.onBattleStart = function(advantageous) {
		this.applyOnBattleStartEnhanceEffects();
		_Game_Battler_onBattleStart.call(this, advantageous);
	};

	Game_Battler.prototype.applyOnBattleStartEnhanceEffects = function() {
		if (this._enhanceSkill) {
			const onBattleStartEffect = $dataSkills[this._enhanceSkill].meta["enhance_on_battle_start_effect"];
			if (onBattleStartEffect) {
				eval(onBattleStartEffect);
			}
		}
	}

	const _Scene_Skill_onItemOk = Scene_Skill.prototype.onItemOk;
	Scene_Skill.prototype.onItemOk = function() {
		const item = this.item();
		const isEnhanceSkill = EnhanceSkillTagFactory.createEnhanceSkillTagsFromNote(item.note).length > 0;
		if (isEnhanceSkill) {
			const actor = this.actor();
			if (actor._enhanceSkill == item.id) {
				// If this is already the enhance skill, unset the enhance skill
				actor.unenhance();
			} else {
				// Otherwise, set this skill as the enhance skill
				actor.paySkillCost(item);
				actor.enhance(item.id);
			}
			this.activateItemWindow();
			this._statusWindow.refresh();
		} else {
			_Scene_Skill_onItemOk.apply(this);
		}
	};

	// Inject logic to upgrade enhance skill if the next rank is learned
	const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
	Game_Actor.prototype.learnSkill = function(skillId) {
		_Game_Actor_learnSkill.call(this, skillId);
		const enhanceSkill = $dataSkills[this._enhanceSkill];
		const newSkill = $dataSkills[skillId];
		if (newSkill?.id === enhanceSkill?.id + 1) {
			const enhanceSkillRank = parseInt(enhanceSkill?.meta.rank) || 1;
			const newSkillRank = parseInt(newSkill?.meta.rank) || 1;
			if (newSkillRank === enhanceSkillRank + 1) {
				this.unenhance(enhanceSkill.id);
				this._enhanceSkill = newSkill.id;
				this.enhance(newSkill.id);
			}
		}
	};
})();
