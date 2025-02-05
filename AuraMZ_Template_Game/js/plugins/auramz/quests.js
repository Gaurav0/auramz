//=============================================================================
// RPG Maker MZ - Quest System
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
 * @plugindesc Quest System
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help quests.js
 *
 * This plugin provides functionality for managing quests.
 *
 * Each quest has a stage (which is a single number representing the current state or progress of the quest),
 * a state represening ongoing, complected, failed, and a list of objectives to be reached.
 *
 * Quests can be added and modified using plugin commands.
 *
 * The plugin provides a UI integration in form of a quest log.
 *
 * @command addQuest
 * @text Add Quest
 * @desc Adds a new quest to the quest data
 *
 * @arg questID
 * @type number
 * @text questID
 * @desc The ID of the quest
 *
 * @arg title
 * @type string
 * @text title
 * @desc The title of the quest
 *
 * @arg description
 * @type string
 * @text description
 * @desc The description of the quest
 *
 * @arg reward
 * @type string
 * @text reward
 * @desc The description of the quest reward
 *
 * @command addObjective
 * @text Add Objective to Quest
 * @desc Adds a new objective to a quest
 *
 * @arg questID
 * @type number
 * @text questID
 * @desc The ID of the quest
 *
 * @arg description
 * @type string
 * @text description
 * @desc The description of the objective
 *
 * @command setQuestStage
 * @text Set the Quest Stage
 * @desc Sets the main control variable for quest progress
 *
 * @arg questID
 * @type number
 * @text questID
 * @desc The ID of the quest
 *
 * @arg stage
 * @type number
 * @text stage
 * @desc The progress stage of the quest
 *
 * @command setQuestStatus
 * @text Set the Quest Status
 * @desc Sets the quest status.
 *
 * @arg questID
 * @type number
 * @text questID
 * @desc The ID of the quest
 *
 * @arg status
 * @type number
 * @text status
 * @desc 0 = Ongoing, 1 = Completed, 2 = Failed.
 *
 * @command setObjectiveStatus
 * @text Set the Objective Status of a Quest
 * @desc Sets the Objective Status of a Quest.
 *
 * @arg questID
 * @type number
 * @text questID
 * @desc The ID of the quest
 *
 * @arg objectiveID
 * @type number
 * @text objectiveID
 * @desc The ID of the objective
 *
 * @arg status
 * @type number
 * @text status
 * @desc 0 = Ongoing, 1 = Completed, 2 = Failed.
 *
 * @command updateReward
 * @text Update Reward
 * @desc Updates the reward text with a new text
 *
 * @arg questID
 * @type number
 * @text questID
 * @desc The ID of the quest
 *
 * @arg reward
 * @type string
 * @text reward
 * @desc The updated description of the quest reward
 *
 * @command updatedObjectiveDescription
 * @text Updated Objective Description
 * @desc Creates a message popup to inform the player that the objective description has been updated
 *
 * @arg questID
 * @type number
 * @text questID
 * @desc The ID of the quest
 *
 * @arg objectiveID
 * @type number
 * @text objectiveID
 * @desc The ID of the objective
 *
 */

// ---------------------------------------------------------------------------------
// OBJECTS
// ---------------------------------------------------------------------------------

// Global variable for accessing quest data
$gameQuests = null;

// Plain data container for containing the registered quests
class Game_Quests {
	constructor() {
		this._data = [];
	}
}

// Plain data object for holding information about a single quest objective
class Quest_Objective {
	constructor() {
		this._status = 0;
		this._description = "";
	}
}

// Plain data object for holding Quest data
class Quest {
	constructor() {
		this._stage = 0;
		this._status = 0;
		this._objectives = [];
		this._title = "";
		this._description = "";
		this._reward = "";
	}
}

// ---------------------------------------------------------------------------------
// MANAGERS
// ---------------------------------------------------------------------------------

// Service provider that takes care of forwarding callbacks
class QuestManager {
	constructor() {
		throw new Error("This is a static class");
	}

	static setup() {
		this.initMembers();
	}

	static initMembers() {
		this._addQuestCallback = null;
		this._addObjectiveCallback = null;
		this._setQuestStatusCallback = null;
		this._setObjectiveStatusCallback = null;
		this._updateQuestRewardCallback = null
		this._updatedObjectiveDescriptionCallback = null;
		this._enableCallbacks = true;
	}

	static setAddQuestCallback(callback) {
		this._addQuestCallback = callback;
	}

	static setAddObjectiveCallback(callback) {
		this._addObjectiveCallback = callback;
	}

	static setQuestStatusCallback(callback) {
		this._setQuestStatusCallback = callback;
	}

	static setUpdateQuestRewardCallback(callback) {
		this._updateQuestRewardCallback = callback;
	}

	static setObjectiveStatusCallback(callback) {
		this._setObjectiveStatusCallback = callback;
	}

	static setUpdatedObjectiveDescriptionCallback(callback) {
		this._updatedObjectiveDescriptionCallback = callback;
	}

	static onAddQuest(quest) {
		if (this._addQuestCallback && this._enableCallbacks) {
			this._addQuestCallback(quest);
		}
	}

	static onAddObjective(quest, objective) {
		if (this._addObjectiveCallback && this._enableCallbacks) {
			this._addObjectiveCallback(quest, objective);
		}
	}

	static onSetQuestStatus(quest) {
		if (this._setQuestStatusCallback && this._enableCallbacks) {
			this._setQuestStatusCallback(quest);
		}
	}

	static onUpdateQuestReward(quest) {
		if (this._updateQuestRewardCallback && this._enableCallbacks) {
			this._updateQuestRewardCallback(quest);
		}
	}

	static onSetObjectiveStatus(quest, objective) {
		if (this._setObjectiveStatusCallback && this._enableCallbacks) {
			this._setObjectiveStatusCallback(quest, objective);
		}
	}

	static onUpdatedObjectiveDescription(quest, objective) {
		if (this._updatedObjectiveDescriptionCallback && this._enableCallbacks) {
			this._updatedObjectiveDescriptionCallback(quest, objective);
		}
	}

	// Gets the objective status of a quest. If either quest or
	// objective don't exist, returns -1
	static getObjectiveStatus(questID, objectiveID) {
		const quest = $gameQuests._data[questID];
		if (quest != undefined) {
			const objective = quest._objectives[objectiveID];
			if (objective != undefined) {
				return objective._status;
			}
		}

		return -1;
	}

	// Gets the quest status of a quest. If the quest doesn't exist, returns -1
	static getQuestStatus(questID) {
		const quest = $gameQuests._data[questID];
		if (quest != undefined) {
			return quest._status;
		}

		return -1;
	}
}

// ---------------------------------------------------------------------------------
// WINDOWS
// ---------------------------------------------------------------------------------

// Window that manages the tabs for the different quest states
class Window_QuestCategory extends Window_HorzCommand {
	constructor(rect) {
		super(rect);
	}

	makeCommandList() {
		this.addCommand("Quest", "quest");
		this.addCommand("Completed", "completed");
		this.addCommand("Failed", "failed");
	}

	update() {
		super.update();
		if (this._questWindow) {
			this._questWindow.setCategory(this.currentSymbol());
		}
	}

	setQuestWindow(questWindow) {
		this._questWindow = questWindow;
	}
}

// Manages a list of quests
class Window_QuestList extends Window_Selectable {
	constructor(rect) {
		super(rect);
		this._category = "none";
		this._data = [];
	}

	setCategory(category) {
		if (this._category != category) {
			this._category = category;
			this.refresh();
			this.scrollTo(0, 0);
		}
	}

	maxCols() {
		return 1;
	}

	colSpacing() {
		return 16;
	}

	maxItems() {
		return this._data ? this._data.length : 1;
	}

	includes(quest) {
		if (!quest) {
			return false;
		}

		switch (this._category) {
			case "quest": return quest._status == 0;
			case "completed": return quest._status == 1;
			case "failed": return quest._status == 2;
		}
	}

	makeQuestList() {
		this._data = $gameQuests._data.filter(quest => this.includes(quest));
	}

	itemAt(index) {
		return this._data && index >= 0 ? this._data[index] : null;
	}

	item() {
		return this._data[this.index()];
	}

	selectFirst() {
		this.forceSelect(0);
	}

	drawItem(index) {
		const item = this.itemAt(index);
		if (item) {
			const rect = this.itemLineRect(index);
			this.drawText(item._title, rect.x, rect.y, rect.width);
		}
	}

	update() {
		super.update();
		if (this._questDetailWindow) {
			this._questDetailWindow.setQuest(this.item());
		}
	}

	updateHelp() {
		if (this.item()) {
			const item = this.item();
			const reward = "\\c[16]Reward: \\c[0]" + item._reward;
			const help = { description: reward };
			this.setHelpWindowItem(help);
		}
	}

	refresh() {
		this.makeQuestList();
		super.refresh();
	}

	setQuestDetailWindow(questDetailWindow) {
		this._questDetailWindow = questDetailWindow;
	}
}

// Utility class for processing raw object data
class Quest_Util {
	getColorCodeForStatus(status) {
		switch (status) {
			case 1: return "\\c[29]";
			case 2: return "\\c[2]";
		}

		return "\\c[0]";
	}

	getDetailObjective(objective) {
		const colorCode = this.getColorCodeForStatus(objective._status);
		return colorCode + "- " + objective._description;
	}

	getDetailQuest(quest) {
		let detail = quest._description;

		if (quest._objectives.length > 0) {
			const objectivesDetail = quest._objectives
				.map(objective => this.getDetailObjective(objective))
				.join("\n");

			detail += "\n\nObjectives:\n" + objectivesDetail;
		}

		return detail;
	}

}

// This window manages the detail screen of a single quest log entry
class Window_QuestDetail extends Window_Selectable {
	static questUtil = new Quest_Util();

	constructor(rect) {
		super(rect);
		this._quest = null;
		this._data = "";
	}

	setQuest(quest) {
		if (this._quest != quest) {
			this._quest = quest;
			this.refresh();
			this.scrollTo(0, 0);
		}
	}

	makeDetail() {
		if (this._quest) {
			this._data = Window_QuestDetail.questUtil.getDetailQuest(this._quest);
			this._data = this.formatDetail(this._data);
		}
	}

	formatDetail(data) {
		this.contents.fontSize = 18;
		let detail = "";
		const lines = data.split("\n");
		const itemPadding = this.itemPadding();
		lines.forEach((line) => {
			const words = line.split(' ');
			let x = 0;
			words.forEach((word) => {
				const wordWithWhitespace = word + ' ';
				let wordForWidth = wordWithWhitespace;

				if (wordWithWhitespace[0] == "\\" || wordWithWhitespace.substring(0, 2) == "(\\") {
					let indexMetaDataEnd = wordWithWhitespace.indexOf("]");
					if (indexMetaDataEnd == -1) {
						indexMetaDataEnd = wordWithWhitespace.indexOf(">");
					}
					wordForWidth = wordWithWhitespace.substring(indexMetaDataEnd + 1);
				}

				const wordWidth = this.textWidth(wordForWidth);
				if (x + wordWidth > this.contentsWidth() - itemPadding * 3) {
					x = 0;
					detail += "\n";
				}

				detail += wordWithWhitespace;
				x += wordWidth;
			});

			detail += "\n";
		});

		return detail;
	}

	maxCols() {
		return 1;
	}

	colSpacing() {
		return 16;
	}

	maxItems() {
		return 1;
	}

	itemRect() {
		const x = 0;
		const y = 0;
		const width = this.width;
		const height = this.height;
		return new Rectangle(x, y, width, height);
	}

	drawAllItems() {
		if (this._quest) {
			const rect = this.itemRect();
			this.drawTextEx("\\FS[18]" + this._data, rect.x, rect.y, rect.width);
		}
	}

	refresh() {
		this.makeDetail();
		super.refresh();
	}

}

// Window that pops up upon changing the state of a quest
class Window_QuestMessage extends Window_Base {
	constructor(rect) {
		super(rect);
		this.opacity = 0;
		this.contentsOpacity = 0;
		this._showCount = 0;
		this._messageQueue = [];
		this._message = "";
		this.hide();
		this.refresh();
	}

	update() {
		super.update();
		if (this._showCount > 0) {
			this.updateFadeIn();
			this._showCount--;
		} else {
			this.updateFadeOut();
		}
	}

	updateFadeIn() {
		this.contentsOpacity += 16;
	}

	updateFadeOut() {
		this.contentsOpacity -= 16;

		if (this.contentsOpacity <= 0) {
			if (this._messageQueue.length > 0) {
				this._message = this._messageQueue.shift();
				this._showCount = 150;
			} else {
				this.hide();
			}

			this.refresh();
		}
	}

	open(message) {
		this.show();
		if (this._showCount == 0) {
			this._showCount = 150;
			this._message = message;
		} else {
			this._messageQueue.push(message);
		}

		this.refresh();
	}

	close() {
		this._showCount = 0;
	}

	refresh() {
		this.contents.clear();
		const width = this.textWidth(this._message);
		this.drawTextEx(this._message, 0, 0, width, "center");
	}
}

// ---------------------------------------------------------------------------------
// SCENES
// ---------------------------------------------------------------------------------

// Scene providing the Quest Log
class Scene_Quest extends Scene_MenuBase {
	create() {
		super.create();
		this.createHelpWindow();
		this.createCategoryWindow();
		this.createQuestWindow();
		this.createQuestDetailWindow();
	}

	createCategoryWindow() {
		const rect = this.categoryWindowRect();
		this._categoryWindow = new Window_QuestCategory(rect);
		this._categoryWindow.setHelpWindow(this._helpWindow);
		this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
		this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
		this.addWindow(this._categoryWindow);
	}

	categoryWindowRect() {
		const wx = 0;
		const wy = this.mainAreaTop();
		const ww = Graphics.boxWidth;
		const wh = this.calcWindowHeight(1, true);
		return new Rectangle(wx, wy, ww, wh);
	}

	createQuestWindow() {
		const rect = this.questWindowRect();
		this._questWindow = new Window_QuestList(rect);
		this._questWindow.setHelpWindow(this._helpWindow);
		this._questWindow.setHandler("ok", this.onQuestOk.bind(this));
		this._questWindow.setHandler("cancel", this.onQuestCancel.bind(this));
		this.addWindow(this._questWindow);
		this._categoryWindow.setQuestWindow(this._questWindow);
	}

	questWindowRect() {
		const wx = 0;
		const wy = this._categoryWindow.y + this._categoryWindow.height;
		const ww = Graphics.boxWidth / 3;
		const wh = this.mainAreaBottom() - wy;
		return new Rectangle(wx, wy, ww, wh);
	}

	createQuestDetailWindow() {
		const rect = this.questDetailWindowRect();
		this._questDetailWindow = new Window_QuestDetail(rect);
		this._questDetailWindow.setHandler("cancel", this.onQuestDetailCancel.bind(this));
		this.addWindow(this._questDetailWindow);
		this._questWindow.setQuestDetailWindow(this._questDetailWindow);
	}

	questDetailWindowRect() {
		const wx = this._questWindow.width;
		const wy = this._questWindow.y;
		const ww = 2 * Graphics.boxWidth / 3;
		const wh = this._questWindow.height;
		return new Rectangle(wx, wy, ww, wh);
	}

	onCategoryOk() {
		this._questWindow.activate();
		this._questWindow.selectFirst();
	}

	onQuestOk() {
		this._questDetailWindow.activate();
	}

	onQuestCancel() {
		this._questWindow.deselect();
		this._categoryWindow.activate();
	}

	onQuestDetailCancel() {
		this._questDetailWindow.deselect();
		this._questWindow.activate();
	}
}

(() => {
	const PLUGIN_NAME = "quests";

	// Initialize the data container for quests
	const _DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = () => {
		_DataManager_createGameObjects();
		$gameQuests = new Game_Quests();
	};

	// Ensure that the current quest data is saved
	const _DataManager_makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = () => {
		const contents = _DataManager_makeSaveContents();
		contents.quests = $gameQuests;
		return contents;
	};

	// Ensure that the current quest data is loaded
	const _DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = (contents) => {
		_DataManager_extractSaveContents(contents);
		if (contents.quests) {
			$gameQuests = contents.quests;
		}
	};

	QuestManager.setup();

	// Command that adds a new quest
	PluginManager.registerCommand(PLUGIN_NAME, "addQuest", args => {
		const quest = new Quest();
		quest._title = args.title;
		quest._description = args.description;
		quest._reward = args.reward;
		$gameQuests._data[args.questID] = quest;

		QuestManager.onAddQuest(quest);
	});

	// Command that adds an objective to a quest
	PluginManager.registerCommand(PLUGIN_NAME, "addObjective", args => {
		const objective = new Quest_Objective();
		objective._description = args.description;

		const quest = $gameQuests._data[args.questID];
		quest._objectives.push(objective);

		QuestManager.onAddObjective(quest, objective);
	});

	// Command to manipulate the stage variable of a quest
	PluginManager.registerCommand(PLUGIN_NAME, "setQuestStage", args => {
		$gameQuests._data[args.questID]._stage = parseInt(args.stage);
	});

	// Command to set the status of a quest
	PluginManager.registerCommand(PLUGIN_NAME, "setQuestStatus", args => {
		const quest = $gameQuests._data[args.questID];
		quest._status = parseInt(args.status);

		QuestManager.onSetQuestStatus(quest);
	});

	// Command to update the reward of a quest
	PluginManager.registerCommand(PLUGIN_NAME, "updateReward", args => {
		const quest = $gameQuests._data[args.questID];
		quest._reward = args.reward;

		QuestManager.onUpdateQuestReward(quest);
	});

	// Command to set the status of an objective of a quest
	PluginManager.registerCommand(PLUGIN_NAME, "setObjectiveStatus", args => {
		const quest = $gameQuests._data[args.questID];
		const objective = quest._objectives[args.objectiveID];

		if (objective) {
			objective._status = parseInt(args.status);
			QuestManager.onSetObjectiveStatus(quest, objective);
		} else {
			const message = "ERROR: Tried to close objective with ID "
				+ args.objectiveID
				+ " of quest with ID "
				+ args.questID
				+ ",\n"
				+ "but no such objective is registered."
			$gameMessage.add(message);
		}
	});

	// Command to set the status of an objective of a quest
	PluginManager.registerCommand(PLUGIN_NAME, "updatedObjectiveDescription", args => {
		const quest = $gameQuests._data[args.questID];
		const objective = quest._objectives[args.objectiveID];

		if (objective) {
			QuestManager.onUpdatedObjectiveDescription(quest, objective);
		} else {
			const message = "ERROR: Tried to create update message for objective "
				+ args.objectiveID
				+ " of quest with ID "
				+ args.questID
				+ ",\n"
				+ "but no such objective is registered."
			$gameMessage.add(message);
		}
	});

	// Registers the quest log entry in the main menu
	const _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
	Window_MenuCommand.prototype.addMainCommands = function() {
		_Window_MenuCommand_addMainCommands.call(this);
		const enabled = this.areMainCommandsEnabled();
		this.addCommand("Quest", "quest", enabled);
	};

	// Registers the handler to open the quest log in the main menu
	const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		_Scene_Menu_createCommandWindow.call(this);
		this._commandWindow.setHandler("quest", this.commandQuest.bind(this));
	};

	// Opens the scene for the quest log
	Scene_Menu.prototype.commandQuest = function() {
		SceneManager.push(Scene_Quest);
	};

	// Create all window objects of the quest log
	const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
	Scene_Map.prototype.createAllWindows = function() {
		_Scene_Map_createAllWindows.call(this);
		this.createQuestMessageWindow();
	}

	// Create the quest update popup message and register the callbacks to
	// display the popup whenever there is a change to the quest data
	Scene_Map.prototype.createQuestMessageWindow = function() {
		const rect = this.questMessageWindowRect();
		this._questMessageWindow = new Window_QuestMessage(rect);
		this.addWindow(this._questMessageWindow);

		QuestManager.setAddQuestCallback((quest) => {
			this.onAddQuest(quest);
		});

		QuestManager.setAddObjectiveCallback((quest, objective) => {
			this.onAddObjective(quest, objective);
		});

		QuestManager.setQuestStatusCallback((quest) => {
			this.onSetQuestStatus(quest);
		});

		QuestManager.setUpdateQuestRewardCallback((quest) => {
			this.onUpdateQuestReward(quest);
		});

		QuestManager.setObjectiveStatusCallback((quest, objective) => {
			this.onSetObjectiveStatus(quest, objective);
		});

		QuestManager.setUpdatedObjectiveDescriptionCallback((quest, objective) => {
			this.onUpdatedObjectiveDescription(quest, objective);
		});
	}

	// Display a popup informing the player of obtaining a new quest
	Scene_Map.prototype.onAddQuest = function(quest) {
		const message = "\\c[6]NEW QUEST\n\\{" + quest._title;
		this._questMessageWindow.open(message);
	}

	// Display a popup informing the player of a new quest objective
	Scene_Map.prototype.onAddObjective = function(quest, objective) {
		const message = "\\c[6]NEW [" + quest._title + "] OBJECTIVE\n\\}" + objective._description;
		this._questMessageWindow.open(message);
	}

	// Display a popup informing the player of a quest success/failure
	Scene_Map.prototype.onSetQuestStatus = function(quest) {
		if (quest._status == 1) {
			const message = "\\c[6]QUEST COMPLETED\n\\{" + quest._title;
			this._questMessageWindow.open(message);
		} else {
			const message = "\\c[6]QUEST FAILED\n\\{" + quest._title;
			this._questMessageWindow.open(message);
		}
	}

	// Display a popup informing the player of a quest reward update
	Scene_Map.prototype.onUpdateQuestReward = function(quest) {
		const message = "\\c[6]QUEST REWARD UPDATED:\n\\}" + quest._reward;
		this._questMessageWindow.open(message);
	}

	// Display a popup informing the player of a quest object success/failure
	Scene_Map.prototype.onSetObjectiveStatus = function(_quest, objective) {
		if (objective._status == 1) {
			const message = "\\c[6]OBJECTIVE COMPLETED\n\\}" + objective._description;
			this._questMessageWindow.open(message);
		} else if (objective._status == 2) {
			const message = "\\c[6]Objective FAILED\n\\}" + objective._description;
			this._questMessageWindow.open(message);
		} else {
			// Refresh the objective if it's still ongoing
			this.onUpdatedObjectiveDescription(_quest, objective);
		}
	}

	// Display a popup informing the objective description got updated
	Scene_Map.prototype.onUpdatedObjectiveDescription = function(_quest, objective) {
		const message = "\\c[6]UPDATED OBJECTIVE\n\\}" + objective._description;
		this._questMessageWindow.open(message);
	}

	// Creates the size dimension sof the quest popup window
	Scene_Map.prototype.questMessageWindowRect = function() {
		const wx = 0;
		const wy = 0;
		const ww = 500;
		const wh = this.calcWindowHeight(3, false);
		return new Rectangle(wx, wy, ww, wh);
	};

	// Close the quest popup window when the map is closed
	const _Scene_Map_stop = Scene_Map.prototype.stop;
	Scene_Map.prototype.stop = function() {
		_Scene_Map_stop.call(this);
		this._questMessageWindow.close();
	}

	// Close the quest popup window when the map is terminated
	const _Scene_Map_terminate = Scene_Map.prototype.terminate;
	Scene_Map.prototype.terminate = function() {
		_Scene_Map_terminate.call(this);
		this._questMessageWindow.hide();
	}

	// Close the quest popup window when the main menu is opened
	const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
	Scene_Map.prototype.callMenu = function() {
		_Scene_Map_callMenu.call(this);
		this._questMessageWindow.hide();
	}

	// Close the quest popup window when a battle is started
	const _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
	Scene_Map.prototype.launchBattle = function() {
		_Scene_Map_launchBattle.call(this);
		this._questMessageWindow.hide();
	}
})();
