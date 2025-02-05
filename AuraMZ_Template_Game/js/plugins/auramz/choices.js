//=============================================================================
// RPG Maker MZ - Choice Customizations
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
 * @plugindesc Choice Customizations
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help choices.js
 *
 * This plugin allows to customize the choice selection dialog by changing choice properties such
 * as enablement based on custom conditions.
 *
 * Dependencies:
 * - event_utils
 *
 * @command setChoiceOption
 * @text Set Choice Option
 * @desc Customizes the option in a choice
 *
 * @arg choiceID
 * @type number
 * @text choiceID
 * @desc The ID of the choice
 *
 * @arg condition
 * @type string
 * @text condition
 * @desc The enablement condition
 *
 * @command setChoiceShowCondition
 * @text Set Choice Show Condition
 * @desc Shows the choice only when the condition is fulfilled
 *
 * @arg choiceID
 * @type number
 * @text choiceID
 * @desc The ID of the choice
 *
 * @arg condition
 * @type string
 * @text condition
 * @desc The show condition
 *
 * @command setChoiceColorCondition
 * @text Set Choice Color Condition
 * @desc Shows the choice in the given color when the condition is true
 *
 * @arg choiceID
 * @type number
 * @text choiceID
 * @desc The ID of the choice
 *
 * @arg condition
 * @type string
 * @text condition
 * @desc The color condition
 *
 * @arg color
 * @type number
 * @text color
 * @desc The color id
 *
 * @command setChoiceAlternateText
 * @text Set Choice Alternate Text
 * @desc Sets an alternate text for the choice
 *
 * @arg choiceID
 * @type number
 * @text choiceID
 * @desc The ID of the choice
 *
 * @arg condition
 * @type string
 * @text condition
 * @desc The color condition
 *
 * @arg alternateText
 * @type string
 * @text alternateText
 * @desc The alternate text
 *
 * @command setHideSingleOptionChoices
 * @text Hide Single Option Choices
 * @desc Hides the choice window if there is only one choice in it
 *
 * @command createChoice
 * @text Create Choice
 * @desc Creates an custom sized choice list
 *
 * @arg choices
 * @text Choices
 * @type struct<Choice>[]
 * @desc The choices
 *
 * @arg returnVariable
 * @text Return Variable
 * @desc Variable ID which will store the result of the choice selection
 * @type variable
 *
 * @arg speaker
 * @type string
 * @text Speaker
 * @desc The speaker
 *
 * @arg text
 * @type string[]
 * @text Text
 * @desc The message box text
 *
 * @arg cancelID
 * @type number
 * @text cancelID
 * @desc The ID of the cancel choice
 *
 */

/*~struct~Choice:
 *
 * @param text
 * @type string
 * @text Text
 * @desc The displayed choice text
 *
 * @param enableCondition
 * @type Text
 * @default true
 * @text Enable Condition
 * @desc The enablement condition of the choice
 *
 * @param showCondition
 * @type Text
 * @default true
 * @text Show Condition
 * @desc The show condition of the choice
 *
 * @param colorCondition
 * @type Text
 * @default false
 * @text Color Condition
 * @desc A special condition under which the choice will be shown with the special color
 *
 * @param specialColor
 * @type Number
 * @default 0
 * @text Special Color
 * @desc The special color that will be used for the choice if the color condition is true
 *
 * @param returnValue
 * @type Number
 * @default 0
 * @text Return Value
 * @desc The return value for selecting this choice
 */

(() => {
	const PLUGIN_ID = "choices";

	// Clears the current conditions when the message window is cleared
	const _Game_Message_clear = Game_Message.prototype.clear;
	Game_Message.prototype.clear = function() {
		_Game_Message_clear.call(this);
		this._enableConditions = [];
		this._showConditions = [];
		this._colorConditions = [];
		this._colors = [];
		this._alternateTextConditions = [];
		this._alternateTexts = [];
		this._hideSingleOptionChoices = null;
	}

	// Checks if a given choice is enabled
	Game_Message.prototype.isChoiceEnabled = function(choiceID) {
		const condition = $gameMessage._enableConditions[choiceID];
		return !condition || eval(condition);
	}

	// Checks if a given choice is visible
	Game_Message.prototype.isChoiceVisible = function(choiceID) {
		const condition = $gameMessage._showConditions[choiceID];
		return !condition || eval(condition);
	}

	// Checks if a given choice is visible
	Game_Message.prototype.isChoiceColored = function(choiceID) {
		const condition = $gameMessage._colorConditions[choiceID];
		return condition && eval(condition);
	}

	// Checks if an alternative text should be shown and if so returns the alternative id
	Game_Message.prototype.getAlternateTextID = function(choiceID) {
		const alternatives = $gameMessage._alternateTextConditions[choiceID];
		if (alternatives) {
			for (let i = 0; i < alternatives.length; ++i) {
				const condition = alternatives[i];
				if (eval(condition)) {
					return i;
				}
			}
		}

		return -1;
	}

	// Gets the number of visible choices
	Game_Message.prototype.getNumVisibleChoices = function() {
		const choices = this.choices();
		let numVisibleChoices = 0;
		for (let i = 0; i < choices.length; ++i) {
			if ($gameMessage.isChoiceVisible(i)) {
				numVisibleChoices++;
			}
		}
		return numVisibleChoices;
	}

	// Computes the choice id with respect to only visible choices 
	Game_Message.prototype.getVisibleChoiceIndex = function(choiceID) {
		let visibleChoiceID = choiceID;
		for (let i = 0; i < choiceID; ++i) {
			if (!$gameMessage.isChoiceVisible(i)) {
				visibleChoiceID--;
			}
		}
		return visibleChoiceID;
	}

	// Computes the choice id with from a visible choice ID
	Game_Message.prototype.getChoiceIndex = function(choice) {
		const choices = this.choices();
		for (let i = 0; i < choices.length; ++i) {
			if (choices[i] == choice) {
				return i;
			}
		}
		return -1;
	}

	// Gets the color of a conditionally colored choice
	Game_Message.prototype.getChoiceColor = function(choiceID) {
		return "\\C[" + $gameMessage._colors[choiceID] + "]";
	}

	// Gets the text for a choice considering alternate text
	Game_Message.prototype.getChoiceText = function(choiceID) {
		const alternativeID = this.getAlternateTextID(choiceID);
		if (alternativeID != -1) {
			return this._alternateTexts[choiceID][alternativeID];
		} else {
			return this.choices()[choiceID];
		}
	}
	
	// Inject logic to only process a choice if there are more than two visible entries
	// if the hideSingleOptionChoices flag is set
	const _Game_Message_isChoice = Game_Message.prototype.isChoice;
	Game_Message.prototype.isChoice = function() {
		if (this._hideSingleOptionChoices && this.getNumVisibleChoices() <= 1) {
			return false;
		} else {
			return _Game_Message_isChoice.call(this);
		}
	};

	// Registers a choice enablement condition in the message data
	PluginManager.registerCommand(PLUGIN_ID, "setChoiceOption", args => {
		const choiceID = parseInt(args.choiceID);
		const condition = args.condition;
		$gameMessage._enableConditions[choiceID] = condition;
	});

	// Registers a choice show condition in the message data
	PluginManager.registerCommand(PLUGIN_ID, "setChoiceShowCondition", args => {
		const choiceID = parseInt(args.choiceID);
		const condition = args.condition;
		$gameMessage._showConditions[choiceID] = condition;
	});

	// Registers a choice color condition in the message data
	PluginManager.registerCommand(PLUGIN_ID, "setChoiceColorCondition", args => {
		const choiceID = parseInt(args.choiceID);
		const condition = args.condition;
		const color = args.color;
		$gameMessage._colorConditions[choiceID] = condition;
		$gameMessage._colors[choiceID] = color;
	});

	// Registers a choice alternate text condition in the message data
	PluginManager.registerCommand(PLUGIN_ID, "setChoiceAlternateText", args => {
		const choiceID = parseInt(args.choiceID);
		const condition = args.condition;
		const alternateText = args.alternateText;
		if (!$gameMessage._alternateTextConditions[choiceID]) {
			$gameMessage._alternateTextConditions[choiceID] = [];
			$gameMessage._alternateTexts[choiceID] = [];
		}
		$gameMessage._alternateTextConditions[choiceID].push(condition);
		$gameMessage._alternateTexts[choiceID].push(alternateText);
	});

	// Registers a choice alternate text condition in the message data
	PluginManager.registerCommand(PLUGIN_ID, "setHideSingleOptionChoices", _ => {
		$gameMessage._hideSingleOptionChoices = true;
	});

	// Registers a choice alternate text condition in the message data
	PluginManager.registerCommand(PLUGIN_ID, "createChoice", args => {
		const choices = JSON.parse(args.choices).map(choice => JSON.parse(choice));
		const returnVariable = eval(args.returnVariable);
		const cancelID = parseInt(args.cancelID);

		let lastChoiceID = -1;
		for (let i = 0; i < choices.length; ++i) {
			$gameMessage._enableConditions[i] = choices[i].enableCondition;
			$gameMessage._showConditions[i] = choices[i].showCondition;
			$gameMessage._colorConditions[i] = choices[i].colorCondition;
			$gameMessage._colors[i] = choices[i].specialColor;

			if (eval($gameMessage._showConditions[i])) {
				lastChoiceID++;
			}
		}

		$gameMessage.setChoices(choices.map(choice => choice.text), lastChoiceID, cancelID);

		$gameMessage.setChoiceCallback(n => {
			$gameVariables.setValue(returnVariable, eval(choices[n].returnValue))
		});

		$gameMessage.setSpeakerName(args.speaker);
		$gameMessage.add(JSON.parse(args.text).join("\n"));

		const interpreter = $gameMap.getCurrentInterpreter();
		interpreter.setWaitMode('message');
	});


	// Only call the OK handler if a choice is enabled
	const _Window_ChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
	Window_ChoiceList.prototype.callOkHandler = function() {
		if (this.isCommandEnabled(this.index())) {
			_Window_ChoiceList_callOkHandler.call(this);
		}
	};

	// Ensure that choices which are not enabled are disabled
	Window_ChoiceList.prototype.makeCommandList = function() {
		const choices = $gameMessage.choices();
		for (let i = 0; i < choices.length; ++i) {
			const choice = choices[i];
			if ($gameMessage.isChoiceVisible(i)) {
				this.addCommand(choice, "choice", $gameMessage.isChoiceEnabled(i));
			}
		}
	};

	// Filter out the invisible choices when computing the number of visible rows
	Window_ChoiceList.prototype.numVisibleRows = function() {
		const numVisibleChoices = $gameMessage.getNumVisibleChoices();
		return Math.min(numVisibleChoices, this.maxLines());
	};

	// Adjust the default choice by accounting for invisible choices
	Window_ChoiceList.prototype.selectDefault = function() {
		const defaultChoiceID = $gameMessage.choiceDefaultType();
		const visibleDefaultChoiceID = $gameMessage.getVisibleChoiceIndex(defaultChoiceID);
		this.select(visibleDefaultChoiceID);
	};

	// Adjust the choice selection by accounting for invisible choices
	Window_ChoiceList.prototype.callOkHandler = function() {
		const visibleChoiceID = this.index();
		const choice = _Window_ChoiceList_commandName.call(this, visibleChoiceID);
		const choiceID = $gameMessage.getChoiceIndex(choice);
		$gameMessage.onChoice(choiceID);
		this._messageWindow.terminateMessage();
		this.close();
	};

	// Ensure that choices which are not enabled are greyed out
	const _Window_ChoiceList_commandName = Window_ChoiceList.prototype.commandName;
	Window_ChoiceList.prototype.commandName = function(index) {
		const commandName = _Window_ChoiceList_commandName.call(this, index);
		const choiceID = $gameMessage.getChoiceIndex(commandName);
		const choiceText = $gameMessage.getChoiceText(choiceID);
		if (this.isCommandEnabled(index)) {
			if ($gameMessage.isChoiceColored(choiceID)) {
				return $gameMessage.getChoiceColor(choiceID) + choiceText;
			} else {
				return choiceText;
			}
		} else {
			return "\\C[8]" + choiceText;
		}
	};

	Window_ChoiceList.prototype.maxChoiceWidth = function() {
		let maxWidth = 96;
		const choices = $gameMessage.choices();
		for (let i = 0; i < choices.length; ++i) {
			if ($gameMessage.isChoiceVisible(i)) {
				const choiceText = $gameMessage.getChoiceText(i)
				const textWidth = this.textSizeEx(choiceText).width;
				const choiceWidth = Math.ceil(textWidth) + this.itemPadding() * 2;
				if (maxWidth < choiceWidth) {
					maxWidth = choiceWidth;
				}
			}
		}
		return maxWidth;
	};

	// Disable cancel option when cancel choice is disabled
	const _Window_ChoiceList_processCancel = Window_ChoiceList.prototype.processCancel;
	Window_ChoiceList.prototype.processCancel = function() {
		const cancelChoiceID = $gameMessage.choiceCancelType();
		if ($gameMessage.isChoiceEnabled(cancelChoiceID)) {
			_Window_ChoiceList_processCancel.call(this);
		} else {
			this.playBuzzerSound();
		}
	};
})();