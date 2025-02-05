//=============================================================================
// RPG Maker MZ - Compendium
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/11/27
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Compendium
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help compendium.js
 *
 * This plugin provides a UI for tracking various information about the game state.
 *
 * @param races
 * @text Races
 * @desc List of enemy races.
 * @type string[]
 *
 * @param enabledCondition
 * @text Enabled Condition
 * @desc The condition for the compendium being enabled.
 * @default true
 *
 * @command addBeastiaryEntry
 * @text Add Beastiary Entry
 * @desc Adds a new entry to the beastiary
 *
 * @arg enemy
 * @type enemy
 * @text enemy
 * @desc The enemy
 *
 * @command revealStat
 * @text Reveal Stat
 * @desc Reveals the stat of an enemy
 *
 * @arg enemy
 * @type enemy
 * @text enemy
 * @desc The enemy
 *
 * @arg stat
 * @type number
 * @text stat
 * @desc The ID of the stat
 *
 * @command revealAffinity
 * @text Reveal Affinity
 * @desc Reveals the affinity of an enemy
 *
 * @arg enemy
 * @type enemy
 * @text enemy
 * @desc The enemy
 *
 * @arg elementID
 * @type number
 * @text elementID
 * @desc The ID of the element of the affinity
 *
 * @command revealSkill
 * @text Reveal Skill
 * @desc Reveals the skill of an enemy
 *
 * @arg enemy
 * @type enemy
 * @text enemy
 * @desc The enemy
 *
 * @arg skillID
 * @type skill
 * @desc The ID of the element of the affinity
 *
 * @command revealTrait
 * @text Reveal Trait
 * @desc Reveals the trait of an enemy
 *
 * @arg enemy
 * @type enemy
 * @text enemy
 * @desc The enemy
 *
 * @arg trait
 * @type string
 * @test trait
 * @desc The trait
 *
 * @command revealAll
 * @text Reveal All
 * @desc Reveals all data except for secret traits
 *
 * @arg enemy
 * @type enemy
 * @text enemy
 * @desc The enemy
 *
 * @command addBossKill
 * @text Add Defeated Boss
 * @desc Add 1 to the Tracked Number of Defeated Bosses
 *
 * @arg enemy
 * @type enemy
 * @text enemy
 * @desc The enemy just defeated
 *
 */

// ---------------------------------------------------------------------------------
// OBJECTS
// ---------------------------------------------------------------------------------
let compParameters = PluginManager.parameters("compendium");

window.AuraMZ = window.AuraMZ || {};

AuraMZ.Compendium = AuraMZ.Compendium || {};
AuraMZ.Compendium.races = compParameters["races"];
AuraMZ.Compendium.enabledCondition = compParameters["enabledCondition"];

// Global variable for accessing quest data
window.$gameBestiary = null;

// Plain data container for containing the registered quests
class Game_Beastiary {
	constructor() {
		this._data = [];
	}
}

class BeastiaryEntry {
	constructor() {
		this._enemyID = 0;
		this._knownStats = [];
		this._knownAffinities = [];
		this._knownSkills = [];
		this._knownTraits = [];
		this._numKilled = 0;
	}
}


// Service class for managing the compendium
class CompendiumManager {
	static isCompendiumEnabled() {
		return eval(AuraMZ.Compendium.enabledCondition);
	}
}

// Service class for manipulating beastiary data
class BeastiaryManager {
	static addBeastiaryEntry(enemyID) {
		if (!$gameBeastiary._data[enemyID]) {
			const beastiaryEntry = new BeastiaryEntry();
			beastiaryEntry._enemyID = enemyID;
			$gameBeastiary._data[enemyID] = beastiaryEntry;
		}
	}

	static getOrCreateBeastiaryEntry(enemyID) {
		if (!$gameBeastiary._data[enemyID]) {
			BeastiaryManager.addBeastiaryEntry(enemyID);
		}

		return $gameBeastiary._data[enemyID];
	}

	static stats() {
		return [
			{ name: "HP", param: 0 },
			{ name: "MP", param: 1 },
			{ name: "ATK", param: 2 },
			{ name: "MATK", param: 4 },
			{ name: "DEF", param: 3 },
			{ name: "MDEF", param: 5 },
			{ name: "AGI", param: 6 },
			{ name: "LUCK", param: 7 },
		];
	}

	static raceTraits() {
		const races = JSON.parse(AuraMZ.Compendium.races);
		return (races || []).sort();
	}

	static isKnown(enemyID) {
		const entry = $gameBeastiary._data[enemyID];
		return entry;
	}

	static isKnownStat(enemyID, stat) {
		const entry = $gameBeastiary._data[enemyID];
		if (entry) {
			return entry._knownStats[stat];
		}
	}

	static isKnownAffinity(enemyID, element) {
		const entry = $gameBeastiary._data[enemyID];
		if (entry) {
			return entry._knownAffinities[element];
		}
	}

	static isKnownSkill(enemyID, skillID) {
		const entry = $gameBeastiary._data[enemyID];
		if (entry) {
			return entry._knownSkills.includes(parseInt(skillID));
		}
	}

	static isKnownTrait(enemyID, trait) {
		const entry = $gameBeastiary._data[enemyID];
		if (entry) {
			return entry._knownTraits.includes(trait);
		}
	}

	static getNumKilled(enemyID) {
		const entry = $gameBeastiary._data[enemyID];
		if (entry) {
			return entry._numKilled;
		}
	}

	static revealStat(enemyID, stat) {
		const entry = BeastiaryManager.getOrCreateBeastiaryEntry(enemyID);
		entry._knownStats[stat] = true;
	}

	static revealAllStats(enemyID) {
		for (const stat of BeastiaryManager.stats()) {
			BeastiaryManager.revealStat(enemyID, stat.param);
		}
	}

	static revealAffinity(enemyID, element) {
		const entry = BeastiaryManager.getOrCreateBeastiaryEntry(enemyID);
		entry._knownAffinities[element] = true;
	}

	static revealAllAffinities(enemyID) {
		for (const element in $dataSystem.elements) {
			BeastiaryManager.revealAffinity(enemyID, element);
		}
	}

	static revealSkill(enemyID, skillID) {
		const entry = BeastiaryManager.getOrCreateBeastiaryEntry(enemyID);
		entry._knownSkills.push(parseInt(skillID));
	}

	static revealAllSkills(enemyID) {
		const skills = $dataEnemies[enemyID].actions
			.filter(action => action != null)
			.map(action => action.skillId);
		for (const skillID of skills) {
			BeastiaryManager.revealSkill(enemyID, skillID);
		}
	}

	static revealTrait(enemyID, trait) {
		const entry = BeastiaryManager.getOrCreateBeastiaryEntry(enemyID);
		entry._knownTraits.push(trait);
	}

	static revealAll(enemyID) {
		BeastiaryManager.revealAllStats(enemyID);
		BeastiaryManager.revealAllAffinities(enemyID);
		BeastiaryManager.revealAllSkills(enemyID);
	}

	static addKill(enemyID) {
		const entry = BeastiaryManager.getOrCreateBeastiaryEntry(enemyID);
		entry._numKilled++;
	}



	static getEntries(includeTraits, excludeTraits) {
		return $gameBeastiary._data.filter(enemy => enemy && includeTraits.every(trait => $dataEnemies[enemy._enemyID].meta[trait]) && excludeTraits.every(trait => !$dataEnemies[enemy._enemyID].meta[trait]));
	}
}

// Scene providing the Compendium
class Scene_Compendium extends Scene_MenuBase {
	create() {
		super.create();
		this.createCategoryWindow();
		this._bestiaryWindow = this.createPage(Window_EnemyList, this.onBestiaryPageOk);
		this._enemyDetailWindow = this.createDetailPage(Window_EnemyDetail, this._bestiaryWindow);
	}

	createCategoryWindow() {
		const rect = this.categoryWindowRect();
		this._categoryWindow = new Window_CompendiumCategory(rect);
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

	createPage(windowClass, okHandler) {
		const rect = this.pageWindowRect();
		const window = new windowClass(rect);
		window.setHandler("ok", okHandler.bind(this));
		window.setHandler("cancel", this.onPageCancel.bind(this));
		window.refresh();
		this.addWindow(window);
		this._categoryWindow.addPageWindow(window);
		window.hide();
		return window;
	}

	pageWindowRect() {
		const wx = 0;
		const wy = this._categoryWindow.y + this._categoryWindow.height;
		const ww = Graphics.boxWidth / 3;
		const wh = this.mainAreaHeight();
		return new Rectangle(wx, wy, ww, wh);
	}

	createDetailPage(windowClass, parent) {
		const rect = this.detailWindowRect(parent);
		const detailPage = new windowClass(rect);
		detailPage.setHandler("cancel", this.onDetailCancel.bind(this, detailPage, parent));
		detailPage.refresh();
		this.addWindow(detailPage);
		parent.addPageWindow(detailPage);
		detailPage.hide();
		return detailPage;
	}

	detailWindowRect(parent) {
		const wx = parent.width;
		const wy = parent.y;
		const ww = 2 * Graphics.boxWidth / 3;
		const wh = parent.height;
		return new Rectangle(wx, wy, ww, wh);
	}

	onCategoryOk() {
		const window = this._categoryWindow._mapCategoryToPage[this._categoryWindow.index()];
		window.activate();
		window.selectFirst();
	};

	onPageCancel() {
		this._bestiaryWindow.deselect();
		this._categoryWindow.activate();
	}

	onDetailCancel(window, parent) {
		window.deselect();
		parent.activate();
	}

	onBestiaryPageOk() {
		const item = this._bestiaryWindow.item();
		if (!item.name) {
			this._bestiaryWindow.flipExpansionState(item);
			this._bestiaryWindow.refresh();
		}

		this._bestiaryWindow.activate();
	}
}

// ---------------------------------------------------------------------------------
// WINDOWS
// ---------------------------------------------------------------------------------

// Window that manages the tabs for the different quest states
class Window_CompendiumCategory extends Window_HorzCommand {
	constructor(rect) {
		super(rect);
		this._mapCategoryToPage = [];
	}

	makeCommandList() {
		this.addCommand("Beastiary", "bestiary", $gameBeastiary._data.length > 0);
	}

	update() {
		super.update();

		for (const window of this._mapCategoryToPage) {
			window.hide();
		}

		const index = this.index() == -1 ? 0 : this.index();
		this._mapCategoryToPage[index].show();
	}


	addPageWindow(window) {
		this._mapCategoryToPage.push(window);
	}
}

// Manages a list of enemies
class Window_EnemyList extends Window_Selectable {
	constructor(rect) {
		super(rect);
		this._data = [];
		this._mapPageToWindow = [];
		this._categories = BeastiaryManager.raceTraits();
		this._expandedCategories = [];
	}

	maxCols() {
		return 1;
	}

	colSpacing() {
		return 16;
	}

	maxItems() {
		return this._data.length;
	}

	itemAt(index) {
		return index >= 0 ? this._data[index] : null;
	}

	item() {
		return this._data[this.index()];
	}

	selectFirst() {
		this.forceSelect(0);
	}

	update() {
		super.update();

		for (const window of this._mapPageToWindow) {
			window.hide();
		}

		if (this.visible && this._mapPageToWindow[0]) {
			this._mapPageToWindow[0].show();
			const item = this.item();
			if (item?.name) {
				this._mapPageToWindow[0].setEnemy(this.item());
			}
		}
	}

	hasCategory(enemy, category) {
		return enemy.meta[category.toLowerCase()] == "true";
	}

	isExpanded(category) {
		return this._expandedCategories[category];
	}

	flipExpansionState(category) {
		this._expandedCategories[category] = !this._expandedCategories[category];
	}

	makeEnemies() {
		this._data = [];
		for (const category of this._categories) {
			const knownEnemies = [];
			for (const enemy of $dataEnemies) {
				if (enemy && this.hasCategory(enemy, category) && $gameBeastiary._data[enemy.id] != undefined && knownEnemies.filter(other => other.name == enemy.name).length == 0) {
					knownEnemies.push(enemy)
				}
			}

			if (knownEnemies.length > 0) {
				this._data.push(category);
				if (this.isExpanded(category)) {
					knownEnemies.sort((enemy1, enemy2) => $dataEnemies[enemy1.id].name.localeCompare($dataEnemies[enemy2.id].name));
					this._data.push(...knownEnemies);
				}
			}
		}
	}

	refresh() {
		this.makeEnemies();
		super.refresh();
	}

	getLabel(item) {
		if (item.name) {
			return "  " + item.name;
		} else {
			const sign = this.isExpanded(item) ? "-" : "+";
			return sign + " " + item;
		}
	}

	drawItem(index) {
		const item = this.itemAt(index);
		if (item) {
			const rect = this.itemLineRect(index);
			this.drawText(this.getLabel(item), rect.x, rect.y, rect.width);
		}
	}

	addPageWindow(window) {
		this._mapPageToWindow.push(window);
	}
}

// This window manages the detail screen of an enemy page
class Window_EnemyDetail extends Window_Selectable {

	constructor(rect) {
		super(rect);

		this._sprite = new Sprite();
		this._sprite.anchor.set(0.5);
		this._sprite.move(this.width * 0.2, this.height * 0.2);
		this.addInnerChild(this._sprite);
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

	setEnemy(enemy) {
		this._enemy = enemy;
		this._gameEnemy = new Game_Enemy(enemy.id, -1, -1);

		const bitmap = ImageManager.loadSvEnemy(enemy.battlerName);
		this._sprite.bitmap = bitmap;
		if (bitmap && !bitmap.isReady()) {
			bitmap.addLoadListener(this.initSprite.bind(this));
		} else {
			this.initSprite();
		}
	}

	initSprite() {
		const scaleX = this.width * 0.4 / this._sprite._bitmap.width;
		const scaleY = this.height * 0.4 / this._sprite._bitmap.height;
		const scale = Math.min(scaleX, scaleY, 1);
		this._sprite.scale.x = scale;
		this._sprite.scale.y = scale;
		this._sprite.setHue(this._enemy.battlerHue);

		this.refresh();
	}

	makeStat(name, stat) {
		const value = BeastiaryManager.isKnownStat(this._enemy.id, stat) ? this._gameEnemy.param(stat) : "?";
		return { name: name, value: value };
	}

	makeStats() {
		return BeastiaryManager.stats().map(stat => this.makeStat(stat.name, stat.param));
	}

	drawStats() {
		const stats = this.makeStats();
		const padding = this.width * 0.04;
		const offsetStats = this.width * 0.45;
		const statsWidth = this.width * 0.225;
		let offset = padding;
		for (let i = 0; i < stats.length; i += 2) {
			const stat1 = stats[i];
			this.drawTextEx("\\C[16]" + stat1.name + "\\C[0]", offsetStats, offset, statsWidth);
			this.drawText(stat1.value, offsetStats, offset, statsWidth, "right");

			const stat2 = stats[i + 1];
			this.drawTextEx("\\C[16]" + stat2.name + "\\C[0]", offsetStats + statsWidth + padding, offset, statsWidth);
			this.drawText(stat2.value, offsetStats + statsWidth + padding, offset, statsWidth, "right");

			offset += this.lineHeight();
		}
	}

	getAffinity(element) {
		if (!BeastiaryManager.isKnownAffinity(this._enemy.id, element)) {
			return "?";
		}

		if (Imported.TLB_SKAElementDrain) {
			const elementId = TLB.SKAElementDrain.getDrainElement(this._enemy);
			if (elementId === element) {
				return "DR";
			}
		}
		const elementRate = this._gameEnemy.elementRate(element);
		if (elementRate < 1) {
			return "RS";
		} else if (elementRate > 1) {
			return "WK";
		} else {
			return "-";
		}
	}

	drawAffinities() {
		const mapElementIDToIconID = [];
		mapElementIDToIconID[1] = 77;
		mapElementIDToIconID[2] = 64;
		mapElementIDToIconID[4] = 66;
		mapElementIDToIconID[5] = 67;
		mapElementIDToIconID[6] = 68;
		mapElementIDToIconID[7] = 69;
		mapElementIDToIconID[8] = 70;
		mapElementIDToIconID[9] = 71;
		const offsetY = this.height * 0.4;
		let offsetX = 0;
		for (let i = 0; i < $dataSystem.elements.length; ++i) {
			const iconID = mapElementIDToIconID[i];
			if (iconID != null) {
				this.drawIcon(iconID, offsetX, offsetY);
				const affinity = this.getAffinity(i);
				this.drawText(affinity, offsetX, offsetY + ImageManager.iconHeight, ImageManager.iconWidth, "center");
				offsetX += this.width / 8;
			}
		}
	}

	makeSkills() {
		const skills = $dataEnemies
			.filter(enemy => enemy && enemy.name == this._enemy.name)
			.map(enemy => enemy.actions).flat()
			.filter(action => action != null)
			.map(action => $dataSkills[action.skillId]);
		return [...new Set(skills)]
			.map(skill =>
				BeastiaryManager.isKnownSkill(this._enemy.id, skill.id) ? "\\I[" + skill.iconIndex + "]" + skill.name : "?"
			);
	}

	drawSkills() {
		const text = "\\C[16][Skills]\\C[0] " + this.makeSkills().join(", ");
		const offsetY = this.height * 0.4 + ImageManager.iconHeight + this.lineHeight();
		this.drawTextEx(this.formatDetail(text), 0, offsetY, this.width);
	}

	makeTraits() {
		const traits = [];
		for (const [key, value] of Object.entries(this._enemy.meta)) {
			if (value == "true" || BeastiaryManager.isKnownTrait(this._enemy.id, key)) {
				traits.push(key.charAt(0).toUpperCase() + key.slice(1));
			} else if (value == "secret") {
				traits.push("?");
			}
		}
		return traits;
	}

	drawTraits() {
		const text = "\\C[16][Traits]\\C[0] " + this.makeTraits().join(", ");
		const offsetY = this.height * 0.4 + ImageManager.iconHeight + this.lineHeight() * 4;
		this.drawTextEx(this.formatDetail(text), 0, offsetY, this.width);
	}

	makeKilledBosses() {
		let total = parseInt(this._enemy.meta.num);
		if (total > 0) {
			let numKilled = BeastiaryManager.getNumKilled(this._enemy.id) || 0;

			// if either user has clear gem or killed all, show total, otherwise a "?"
			if (!this.showTotalBosses(numKilled, total)) {
				total = "?";
			}

			const text = "\\C[16]Defeated\\C[0] " + numKilled + "/" + total;
			return text;
		}
		return "";
	}

	showTotalBosses(killed, total) {
		return killed === total;
	}

	drawKilledBosses() {
		const text = this.makeKilledBosses();
		const offsetY = this.height * 0.4 + ImageManager.iconHeight + this.lineHeight() * 6;
		if (text) {
			this.drawTextEx(text, 0, offsetY, this.width);
		}
	}

	drawAllItems() {
		if (this._enemy) {
			this.drawStats();
			this.drawAffinities();
			this.drawSkills();
			this.drawTraits();
			this.drawKilledBosses();
		}
	}

	formatDetail(data) {
		const DETAIL_PADDING = 10;
		let detail = "";
		const lines = data.split("\n");
		lines.forEach((line) => {
			const words = line.split(' ');
			let x = 0;
			words.forEach((word) => {
				const wordWithWhitespace = word + ' ';
				let wordForWidth = wordWithWhitespace;
				let iconWidth = 0;

				if (wordWithWhitespace.startsWith("\\")) {
					const indexMetaDataEnd = wordWithWhitespace.indexOf("]");
					wordForWidth = wordWithWhitespace.substring(indexMetaDataEnd + 1);
					if (wordWithWhitespace[1] == "I") {
						iconWidth = ImageManager.iconWidth;
					}
				}

				const wordWidth = this.textWidth(wordForWidth) + iconWidth;
				if (x + wordWidth + DETAIL_PADDING > this.width) {
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
}

(() => {
	const PLUGIN_NAME = "compendium";

	// Initialize the data container for bestiary
	const _DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = () => {
		_DataManager_createGameObjects();
		window.$gameBeastiary = new Game_Beastiary();
	};

	// Ensure that the current quest data is saved
	const _DataManager_makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = () => {
		const contents = _DataManager_makeSaveContents();
		contents.beastiary = $gameBeastiary;
		return contents;
	};

	// Ensure that the current quest data is loaded
	const _DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = (contents) => {
		_DataManager_extractSaveContents(contents);
		if (contents.beastiary) {
			window.$gameBeastiary = contents.beastiary;
		}
	};

	// Command that adds a new beastiary entry
	PluginManager.registerCommand(PLUGIN_NAME, "addBeastiaryEntry", args => {
		BeastiaryManager.addBeastiaryEntry(args.enemyID);
	});

	// Command that reveals a stat
	PluginManager.registerCommand(PLUGIN_NAME, "revealStat", args => {
		BeastiaryManager.revealStat(args.enemy, args.stat);
	});

	// Command that reveals an affinity
	PluginManager.registerCommand(PLUGIN_NAME, "revealAffinity", args => {
		BeastiaryManager.revealAffinity(args.enemy, args.elementID);
	});

	// Command that reveals a skill
	PluginManager.registerCommand(PLUGIN_NAME, "revealSkill", args => {
		BeastiaryManager.revealSkill(args.enemy, args.skillID);
	});

	// Command that reveals everything except secrets
	PluginManager.registerCommand(PLUGIN_NAME, "revealAll", args => {
		BeastiaryManager.addBeastiaryEntry(args.enemy);
		BeastiaryManager.revealAll(args.enemy);
	});

	// Command that reveals a trait
	PluginManager.registerCommand(PLUGIN_NAME, "revealTrait", args => {
		BeastiaryManager.revealTrait(args.enemy, args.trait);
	});

	// Command that adds a kill
	PluginManager.registerCommand(PLUGIN_NAME, "addBossKill", args => {
		BeastiaryManager.addKill(args.enemy);
	});

	// Tracked Forms of an enemy
	let trackedForms = [];

	function trackForm(enemyId) {
		trackedForms.push(enemyId);
	}

	function revealTrackedForms() {
		for (const enemyId of trackedForms) {
			BeastiaryManager.revealAll(enemyId);
		}
		clearTrackedForms();
	}

	function clearTrackedForms() {
		trackedForms = [];
	}

	// Reveal all data of an enemy upon defeating it
	const _BattleManager_processVictory = BattleManager.processVictory;
	BattleManager.processVictory = function() {
		_BattleManager_processVictory.call(this);
		if (CompendiumManager.isCompendiumEnabled()) {
			for (const member of $gameTroop.troop().members) {
				BeastiaryManager.addBeastiaryEntry(member.enemyId);
				BeastiaryManager.revealAll(member.enemyId);
			}
			revealTrackedForms();
		}
	};

	// Reveal the beastiary entry of an enemy when escaping
	const _BattleManager_processEscape = BattleManager.processEscape;
	BattleManager.processEscape = function() {
		_BattleManager_processEscape.call(this);
		if (CompendiumManager.isCompendiumEnabled()) {
			for (const member of $gameTroop.troop().members) {
				BeastiaryManager.addBeastiaryEntry(member.enemyId);
				BeastiaryManager.revealAll(member.enemyId);
			}
			clearTrackedForms();
		}
	};

	// Reveal the beastiary entry of an enemy when losing
	const _BattleManager_processDefeat = BattleManager.processDefeat;
	BattleManager.processDefeat = function() {
		_BattleManager_processDefeat.call(this);
		if (CompendiumManager.isCompendiumEnabled()) {
			for (const member of $gameTroop.troop().members) {
				BeastiaryManager.addBeastiaryEntry(member.enemyId);
				BeastiaryManager.revealAll(member.enemyId);
			}
			clearTrackedForms();
		}
	};

	// Reveal the elemental affinity when an enemy takes damage
	const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function(target, value) {
		_Game_Action_executeDamage.call(this, target, value);

		if (CompendiumManager.isCompendiumEnabled() && target._enemyId) {
			BeastiaryManager.revealAffinity(target._enemyId, this.item().damage.elementId);
		}
	}

	// Reveal skill when enemy uses it
	const _Game_Enemy_performAction = Game_Enemy.prototype.performAction;
	Game_Enemy.prototype.performAction = function(action) {
		_Game_Enemy_performAction.call(this, action);
		if (CompendiumManager.isCompendiumEnabled()) {
			BeastiaryManager.revealSkill(this._enemyId, action._item._itemId);
		}
	};

	// Track forms when an enemy transforms into a different enemy
	const _Game_Enemy_transform = Game_Enemy.prototype.transform;
	Game_Enemy.prototype.transform = function(enemyId) {
		const originalEnemyId = this._enemyId;
		_Game_Enemy_transform.call(this, enemyId);
		if (CompendiumManager.isCompendiumEnabled() && originalEnemyId !== this._enemyId) {
			BeastiaryManager.addBeastiaryEntry(this._enemyId);
			trackForm(this._enemyId);
		}
	};

	const _AuraMZ_startNewGamePlus = AuraMZ.startNewGamePlus;
	AuraMZ.startNewGamePlus = function() {
		const oldGameBeastiary = $gameBeastiary;
		_AuraMZ_startNewGamePlus.call();
		window.$gameBeastiary = oldGameBeastiary;

		// reset number of killed enemies to 0
		for (const entry of $gameBeastiary._data) {
			if (entry) {
				entry._numKilled = 0;
			}
		}
	}

	// Registers the compendium entry in the main menu
	const _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
	Window_MenuCommand.prototype.addMainCommands = function() {
		_Window_MenuCommand_addMainCommands.call(this);
		const enabled = CompendiumManager.isCompendiumEnabled();
		this.addCommand("Compendium", "compendium", enabled);
	};

	// Registers the handler to open the quest log in the main menu
	const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		_Scene_Menu_createCommandWindow.call(this);
		this._commandWindow.setHandler("compendium", this.commandCompendium.bind(this));
	};

	Scene_Menu.prototype.commandCompendium = function() {
		SceneManager.push(Scene_Compendium);
	};
})();
