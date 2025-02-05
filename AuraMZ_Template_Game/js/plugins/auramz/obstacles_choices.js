//=============================================================================
// RPG Maker MZ - Show Choices to bypass obstacles with items/skills
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2022/01/01
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Show list of choices for items/skills to bypass obstacles
 * @author Gaurav Munjal
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help obstacles_choices.js
 * 
 * This plugin allows to show choices for bypassing obstacles with items
 * or skills based on notetags of the form <burn:x> or <explode:x>.
 * 
 * Dependencies:
 * - event_utils
 *
 * @command showChociesForObstacle
 * @text Show Choices For Obstacle
 * @desc Show Choices For Obstacle
 * 
 * @arg obstacleType
 * @type string
 * @text Obstacle Type
 * @desc Obstacle type, either 'burn' or 'explode'
 * 
 * @arg text
 * @type string
 * @text Text to Display
 * @desc Text to Display while showing choices
 * 
 * @arg level
 * @type number
 * @text Level of Obstacle
 * @desc Level of Obstacle.
 * @default 1
 * 
 * @arg commonEvent
 * @type common_event
 * @text Common Event for animation
 * @desc Common Event for animation
 * 
 * @arg removeCollar
 * @type boolean
 * @text Should Show Choice For Remove Collar
 * @desc Should Show Choice For Remove Collar
 * 
 * @arg variableForReturnValue
 * @type variable
 * @text Variable to set to 0 or 1 for accepted/cancel
 * @desc Variable to set to 0 if user cancelled, 1 if user accepted
 */

(() => {
	const PLUGIN_ID = "obstacles_choices"
	const pluralize = (word, num) => word + ((num === 1 || !word.slice(-1).match(/[a-z]/i)) ? "" : "s");
	const capitalize = str => str.replace(/\b\w/g, c => c.toUpperCase());

	function getUsablePartySkills(obstacleType, level) {
		const partySkills = [];
		for (const actor of $gameParty.members()) {
			for (const skill of actor.skills()) {
				if (eval(skill.meta[obstacleType]) >= level && actor.skillTypes().includes(skill.stypeId)) {
					partySkills.push({ actor, skill });
				}
			}
		}
		return partySkills;
	}

	Game_Message.prototype.useSkill = function() {
		const interpreter = $gameMap.getCurrentInterpreter();
		interpreter.command117([this.commonEvent]);

		const n = $gameMessage.choiceId;
		const actor = $gameActors.actor(this.actorIds[n]);
		actor.paySkillCost($dataSkills[this.skillIds[n]]);
		this.setReturnVariable(1);
	}

	Game_Message.prototype.useItem = function() {
		const interpreter = $gameMap.getCurrentInterpreter();
		interpreter.command117([this.commonEvent]);

		const n = $gameMessage.choiceId;
		$gameParty.loseItem($dataItems[this.itemIds[n]], this.nums[n]);
		this.setReturnVariable(1);
	}

	Game_Message.prototype.removeCollar = function() {
		const interpreter = $gameMap.getCurrentInterpreter();
		interpreter.command117([203]);
		this.setReturnVariable(1);
	}

	Game_Message.prototype.setReturnVariable = function(value) {
		if (this.returnVariable) {
			$gameVariables.setValue(this.returnVariable, value);
		}
	}

	Game_Message.prototype.createChoiceCallback = function(choices, commonEvent, returnVariable) {
		this.callbacks = [];
		let index = 0;

		// assign callback functions
		for (const choice of choices) {
			if (choice.type === 'removeCollar') {
				this.callbacks.push(() => $gameMessage.removeCollar());
			}
			if (choice.type === 'useItem') {
				this.itemIds = this.itemIds || {};
				this.itemIds[index] = choice.item.id;
				this.nums = this.nums || {};
				this.nums[index] = choice.num;
				this.commonEvent = commonEvent;
				this.returnVariable = returnVariable;
				this.callbacks.push(() => $gameMessage.useItem());
			}
			if (choice.type === 'castSkill') {
				this.actorIds = this.actorIds || {};
				this.actorIds[index] = choice.actor.actorId();
				this.skillIds = this.skillIds || {};
				this.skillIds[index] = choice.skill.id;
				this.commonEvent = commonEvent;
				this.returnVariable = returnVariable;
				this.callbacks.push(() => $gameMessage.useSkill());
			}
			if (choice.type === 'leave') {
				this.callbacks.push(() => $gameMessage.setReturnVariable(0));
			}
			index++;
		}

		// return a function that calls the appropriate callback
		return n => {
			$gameMessage.choiceId = n;
			$gameMessage.callbacks[n]();
			delete $gameMessage.choiceId;
			delete $gameMessage.actorIds;
			delete $gameMessage.skillIds;
			delete $gameMessage.itemIds;
			delete $gameMessage.nums;
			delete $gameMessage.commonEvent;
			delete $gameMessage.returnVariable;
			delete $gameMessage.callbacks;
		}
	}

	function setChoicesForObstacle(obstacleType, level, commonEvent, removeCollar, returnVariable) {
		const usableItems = $gameParty.items().filter(item => item.meta[obstacleType]);
		const usablePartySkills = getUsablePartySkills(obstacleType, level);
		const choices = [];

		// If no item or party skill is available
		// search for the lowest level / lowest id item/skill that can be used to bypass the obstacle
		if (usableItems.length == 0 && usablePartySkills.length == 0) {
			getUsableItems(obstacleType, usableItems);

			if (usableItems.length == 0) {
				getUsableSkills(obstacleType, level, usablePartySkills);
			}
		}

		if (removeCollar) {
			choices.push({
				type: 'removeCollar',
				text: "Remove Collar. (+\\V[568] Corruption)",
				condition: "!$gameSwitches.value(23)"
			});
		}

		for (const partySkill of usablePartySkills) {
			const { actor, skill } = partySkill;
			if (skill.hitType == 1) {
				// If this is a phyiscal skill
				choices.push({
					type: 'castSkill',
					actor,
					skill,
					text: `${actor.name()} Use ${skill.name}. (-${actor.actorSkillCost(skill).value} HP)`,
					condition: "$gameActors.actor(" + actor._actorId + ").hp > " + actor.actorSkillCost(skill).value
						+ " && $gameActors.actor(" + actor._actorId + ").skills().contains($dataSkills[" + skill.id + "])"
				});
			} else {
				choices.push({
					type: 'castSkill',
					actor,
					skill,
					text: `${actor.name()} Cast ${skill.name}. (-${actor.skillMpCost(skill)} MP)`,
					condition: "$gameActors.actor(" + actor._actorId + ").mp >= " + actor.skillMpCost(skill)
						+ " && $gameActors.actor(" + actor._actorId + ").skills().contains($dataSkills[" + skill.id + "])"
				});
			}
		}

		for (const item of usableItems) {
			const num = Math.ceil(level / eval(item.meta[obstacleType]));
			choices.push({
				type: 'useItem',
				item,
				num,
				text: `Use ${capitalize(item.name)}. (-${num} ${pluralize(item.name, num)})`,
				condition: "$gameParty.numItems($dataItems[" + item.id + "]) >= " + num
			})
		}

		choices.push({
			type: 'leave',
			text: 'Leave.'
		});

		const lastChoice = choices.length - 1;
		$gameMessage.setChoices(choices.map(choice => choice.text), lastChoice, lastChoice);
		for (let i = 0; i < choices.length; ++i) {
			$gameMessage._enableConditions[i] = choices[i].condition;
		}
		$gameMessage.setChoiceCallback($gameMessage.createChoiceCallback(choices, commonEvent, returnVariable));
	}

	function getUsableItems(obstacleType, currentItems) {
		for (const item of $dataItems) {
			if (item && item.meta[obstacleType]) {
				currentItems.push(item);
				break;
			}
		}
	}

	function getUsableSkills(obstacleType, level, currentSkills) {
		const actor = $gameParty.leader();
		for (const skill of $dataSkills) {
			if (skill && eval(skill.meta[obstacleType]) == level) {
				currentSkills.push({ actor, skill });
				break;
			}
		}
	}

	PluginManager.registerCommand(PLUGIN_ID, "showChociesForObstacle", args => {
		const obstacleType = args.obstacleType;
		const text = args.text;
		const level = parseInt(args.level || 1); // do not allow level 0
		const commonEvent = parseInt(args.commonEvent);
		const removeCollar = args.removeCollar === 'true';

		let returnVariable = args.variableForReturnValue;
		returnVariable = returnVariable ? parseInt(returnVariable) : null;

		setChoicesForObstacle(obstacleType, level, commonEvent, removeCollar, returnVariable);
		$gameMessage.setSpeakerName($gameParty.leader().name());
		$gameMessage.add(text.replace(/\\n/g, "\n"));

		const interpreter = $gameMap.getCurrentInterpreter();
		interpreter.setWaitMode('message');
	});

})();
