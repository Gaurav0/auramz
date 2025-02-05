window.Imported = window.Imported || {};
window.Imported.TLB_SKAUICompendium = true;

window.TLB = window.TLB || {};
TLB.SKAUICompendium = TLB.SKAUICompendium || {};

/*:
 * @author coffeenahc / Trihan
 *
 * @target MZ
 * @plugindesc This plugin modifies the compendium scene with the update UI.
 * Commissioned work by coffeenahc for Star Knightness Aura.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * Use SceneManager.push(Scene_Compendium) to access.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * Copyright 2024 Auradev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @param categoryWindow
 * @text Category Window
 *
 * @param category_bg_main
 * @parent categoryWindow
 * @text Category Main Background
 * @desc The image to use as the main category background.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_CATEGORY_BG_MAIN
 *
 * @param category_bg
 * @parent categoryWindow
 * @text Category Background
 * @desc The image to use as the category background.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_CATEGORY_BG
 *
 * @param categoryWindowX
 * @parent categoryWindow
 * @text X
 * @desc X coordinate of the category window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -142
 *
 * @param categoryWindowY
 * @parent categoryWindow
 * @text Y
 * @desc Y coordinate of the category window rect.
 * @type number
 * @default 19
 *
 * @param categoryWindowWidth
 * @parent categoryWindow
 * @text Width
 * @desc Width of the category window rect.
 * @type number
 * @default 329
 *
 * @param categoryWindowHeight
 * @parent categoryWindow
 * @text Height
 * @desc Height of hte category window rect.
 * @type number
 * @default 270
 *
 * @param subcategoryWindow
 * @text Subcategory Window
 *
 * @param subcategory_bg
 * @parent subcategoryWindow
 * @text Subcategory Background
 * @desc The image to use as the subcategory background.
 * @type file
 * @dir img/menu/
 * @default Compendium/COMPENDIUM_SUBCATEGORY_WINDOW
 *
 * @param subcategory_cursor
 * @parent subcategoryWindow
 * @text Subcategory Cursor
 * @desc The image to use as the subcategory cursor.
 * @type file
 * @dir img/menu/
 * @default Quest_Menu/QUEST_MENU_SELECTION
 *
 * @param subcategoryWindowXOffset
 * @parent subcategoryWindow
 * @text X Offset
 * @desc X offset from the right of hte category window.
 * @type number
 * @default 5
 *
 * @param subcategoryWindowY
 * @parent subcategoryWindow
 * @text Y
 * @desc Y coordinate of the subcategory window rect.
 * @type number
 * @default 23
 *
 * @param subcategoryWindowWidth
 * @parent subcategoryWindow
 * @text Width
 * @desc Width of the subcategory window rect.
 * @type number
 * @default 256
 *
 * @param subcategoryWindowHeight
 * @parent subcategoryWindow
 * @text Height
 * @desc Height of the subcategory window rect.
 * @type number
 * @default 610
 *
 * @param informationWindow
 * @text Information Window
 *
 * @param information_bg
 * @parent informationWindow
 * @text Information Background
 * @desc The image to use as the information window background.
 * @type file
 * @dir img/menu/
 * @default Compendium/COMPENDIUM_INFORMATION_WINDOW
 *
 * @param informationWindowXOffset
 * @parent informationWindow
 * @text X Offset
 * @desc X offset from the right of the subcategory window.
 * @type number
 * @default 3
 *
 * @param informationWindowY
 * @parent informationWindow
 * @text Y
 * @desc Y coordinate of the information window rect.
 * @type number
 * @default 18
 *
 * @param informationWindowWidth
 * @parent informationWindow
 * @text Width
 * @desc Width of the information window rect.
 * @type number
 * @default 558
 *
 * @param informationWindowHeight
 * @parent informationWindow
 * @text Height
 * @desc Height of the information window rect.
 * @type number
 * @default 618
 *
 */

window.parameters = PluginManager.parameters('TLB_SKAUICompendium');
TLB.Param = TLB.Param || {};
TLB.Param.SKAUIC = TLB.Param.SKAUIC || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAUIC);

Scene_Compendium.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.createRelevantWindows();
};

Scene_Compendium.prototype.createRelevantWindows = function() {
	this.createWindowLayer();
	this.createCategoryWindow();
	this.createSubCategoryWindow();
	this.createInformationWindow();
	this._subcategoryWindow.setInfoWindow(this._informationWindow);
};

Scene_Compendium.prototype.createCategoryWindow = function() {
	const rect = this.categoryWindowRect();
	this._categoryWindow = new Window_GBCCategory(rect);
	this._categoryWindow.setParentScene(this);
	this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
	this.addWindow(this._categoryWindow);
};

Scene_Compendium.prototype.createSubCategoryWindow = function() {
	const rect = this.subcategoryWindowRect();
	this._subcategoryWindow = new Window_GBCSubCategory(rect);
	this._subcategoryWindow.setHandler("ok", this.onSubCategoryOk.bind(this));
	this._subcategoryWindow.setHandler("cancel", this.onSubCategoryCancel.bind(this));
	this.addWindow(this._subcategoryWindow);
};

Scene_Compendium.prototype.createInformationWindow = function() {
	const rect = this.infoWindowRect();
	this._informationWindow = new Window_GBCInfo(rect);
	this.addWindow(this._informationWindow);
	this._categoryWindow.select(0);
};

Scene_Compendium.prototype.categoryWindowRect = function() {
	const params = TLB.Param.SKAUIC;
	const wx = params.categoryWindowX;
	const wy = params.categoryWindowY;
	const ww = params.categoryWindowWidth;
	const wh = params.categoryWindowHeight;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Compendium.prototype.subcategoryWindowRect = function() {
	const params = TLB.Param.SKAUIC;
	const wx = this._categoryWindow.x + this._categoryWindow.width + params.subcategoryWindowXOffset;
	const wy = params.subcategoryWindowY;
	const ww = params.subcategoryWindowWidth;
	const wh = params.subcategoryWindowHeight;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Compendium.prototype.infoWindowRect = function() {
	const params = TLB.Param.SKAUIC;
	const wx = this._subcategoryWindow.x + this._subcategoryWindow.width + params.informationWindowXOffset;
	const wy = params.informationWindowY;
	const ww = params.informationWindowWidth;
	const wh = params.informationWindowHeight;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Compendium.prototype.onCategorySelect = function(index) {
	let item = this._categoryWindow.item();
	this._informationWindow.clearInfo();
	this._subcategoryWindow.view(item.symbol);
};

Scene_Compendium.prototype.onCategoryOk = function() {
	let item = this._categoryWindow.item();
	this._subcategoryWindow.setup(item.symbol);
	this._subcategoryWindow.activate();
	this._categoryWindow.deactivate();
};

Scene_Compendium.prototype.onCategoryCancel = function() {
	SceneManager.pop();
};

Scene_Compendium.prototype.onSubCategoryOk = function() {
	if (this._subcategoryWindow._category == "bestiary") {
		const item = this._subcategoryWindow.item();
		this._subcategoryWindow.flipExpansionState(item.name);
		this._subcategoryWindow.refresh();
	}
	this._subcategoryWindow.activate();
};

Scene_Compendium.prototype.onSubCategoryCancel = function() {
	this._informationWindow.clearInfo();
	this._subcategoryWindow.clearCommandList();
	this._subcategoryWindow._category = "";
	this._subcategoryWindow._type = "";
	this._subcategoryWindow.select(-1);
	this._subcategoryWindow.scrollTo(0, 0);
	this._subcategoryWindow.contents.clear();
	this._subcategoryWindow.deactivate();
	this._categoryWindow.activate();
};

class Window_GBCCommand extends Window_Command {
	_refreshAllParts() {
		this._refreshCursor();
		this._refreshArrows();
		this._refreshPauseSign();
	}

	item() {
		return this._list ? this._list[this._index] : null;
	}

	_refreshCursor() {
		//
	}
}

//MAIN CATEGORY WINDOW
function Window_GBCCategory() {
	this.initialize(...arguments);
}

Window_GBCCategory.prototype = Object.create(Window_GBCCommand.prototype);
Window_GBCCategory.prototype.constructor = Window_GBCCategory;

Window_GBCCategory.prototype.initialize = function(rect) {
	this._itemBGSprites = [];
	Window_Command.prototype.initialize.call(this, rect);
	this.cursorVisible = false;
	this._mapCategoryToPage = [];
};

Window_GBCCategory.prototype.makeCommandList = function() {
	this.addCommand("Bestiary", "bestiary");
};

Window_GBCCategory.prototype.setParentScene = function(s) {
	this._parentScene = s;
}

Window_GBCCategory.prototype.select = function(index) {
	this._index = index;
	if (this._parentScene) {
		SceneManager._scene.onCategorySelect(index);
	}
	this.refreshCursor();
};

Window_GBCCategory.prototype.itemHeight = function() {
	return 79;
};

Window_GBCCategory.prototype.drawAllItems = function() {
	const topIndex = this.topIndex();
	const icons = [242, 193, 226];
	for (let i = 0; i < this.maxVisibleItems(); i++) {
		const index = topIndex + i;
		if (index < this.maxItems()) {
			this.drawItemBackground(index);
			this.drawItem(index, icons[i]);
		}
	}
};

Window_GBCCategory.prototype.drawItemBackground = function(index) {
	const rect = this.itemRect(index);
	if (index > 1) rect.y -= 9 * (index - 1);
	let item = this._itemBGSprites[index];
	if (!item) {
		item = new Sprite();
		item.x = rect.x;
		item.y = rect.y;
		const image = index === 0 ? TLB.Param.SKAUIC.category_bg_main : TLB.Param.SKAUIC.category_bg;
		item.bitmap = ImageManager.loadMenu(image);
		this.addChildAt(item, 0);
		this._itemBGSprites[index] = item;
	}
};

Window_GBCCategory.prototype.drawItem = function(index, icon) {
	const rect = this.itemRect(index);
	const y = rect.y - 9 * (index - 2);
	this.drawIcon(icon, rect.x + 7, y);
	this.contents.fontFace = 'franklin-gothic-demi-cond';
	this.contents.fontSize = 30;
	this.drawGradientText(this.commandName(index), ["#d9c4de", "#eee5f1", "#d9c5dd"], rect.x + 45, y - 4, 180, "left", { outlineThickness: 3 });
};

Window_GBCCategory.prototype.refreshCursor = function() {
	const index = this.index();
	if (index >= 0) {
		const rect = this.itemRect(index);
		rect.x += 2;
		rect.y += 13 - (9 * index);
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		this.setCursorRect(0, 0, 0, 0);
		this.cursorVisible = false;
	}
};

Window_GBCCategory.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKAUIB.categorywindow_cursorimage;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_GBCCategory.prototype._refreshCursor = function() {
	//
};

Window_GBCCategory.prototype.addPageWindow = function(window) {
	this._mapCategoryToPage.push(window);
};

class Window_GBCSubCategory extends Window_GBCCommand {
	constructor(rect) {
		super(rect);
		this._category = "";
		this._enemyCategories = BeastiaryManager.raceTraits();
		this._expandedCategories = [];
		this.select(-1);
		this.deactivate();
		this.drawWindowBackground();
		const image = TLB.Param.SKAUIB.arrowimage;
		const bitmap = ImageManager.loadMenu(image);
		this._downArrowSprite.bitmap = bitmap;
		this._downArrowSprite.anchor.x = 0.5;
		this._downArrowSprite.anchor.y = 0.5;
		this._downArrowSprite.move(258 / 2, 632 - 15);
		this._upArrowSprite.bitmap = bitmap;
		this._upArrowSprite.anchor.x = 0.5;
		this._upArrowSprite.anchor.y = 0.5;
		this._upArrowSprite.scale.y = -1;
		this._upArrowSprite.move(258 / 2, 5);
		this.cursorVisible = false;
		this._textOptions = { outlineThickness: 3 };
		this._standardGradient = ["#d9c4de", "#eee5f1", "#d9c5dd"];
	}

	contentsHeight() {
		return this.innerHeight + this.itemHeight();
	}

	isScrollEnabled() {
		return this.active;
	}

	select(index) {
		this._index = index;
		this.refreshCursor();
		if (this.item()) {
			let type = this.item().symbol;
			if (this._infoWindow._enemy !== this.item()) {
				this._infoWindow.setup(this._category, type, this.item());
			}
		}
	}

	setInfoWindow(w) {
		this._infoWindow = w;
	}

	makeCommandList() {
		switch (this._category) {
			case "bestiary":
				this.makeBestiaryList();
				break;
		}
	}

	makeBestiaryList() {
		const enemyList = $dataEnemies.filter((enemy, index) => enemy && $gameBeastiary._data[enemy.id] && $dataEnemies.findIndex(e => e && $gameBeastiary._data[e.id] && e.name === enemy.name) === index);
		for (const category of this._enemyCategories) {
			const knownEnemies = enemyList.filter(enemy => this.hasCategory(enemy, category));

			if (knownEnemies.length > 0) {
				this.addCommand(category, "category");
				if (this.isExpanded(category)) {
					const sortedKnownEnemies = knownEnemies.sort((enemy1, enemy2) => $dataEnemies[enemy1.id].name.localeCompare($dataEnemies[enemy2.id].name));
					this._list.push(...sortedKnownEnemies);
				}
			}
		}
	}

	hasCategory(enemy, category) {
		return enemy.meta[category.toLowerCase()] === "true";
	}

	isExpanded(category) {
		return this._expandedCategories[category];
	}

	flipExpansionState(category) {
		this._expandedCategories[category] = !this._expandedCategories[category];
	}

	setup(type) {
		this._category = type;
		this.select(0);
		this.refresh();
	}

	view(type) {
		this._category = type;
		this.refresh();
	}

	maxScrollY() {
		return Math.max(0, this.overallHeight() - this.innerHeight + this.itemHeight() / 2);
	}

	ensureCursorVisible(smooth) {
		if (this._cursorAll) {
			this.scrollTo(0, 0);
		} else if (this.innerHeight > 0 && this.row() >= 0) {
			const scrollY = this.scrollY();
			const itemTop = this.row() * this.itemHeight();
			const itemBottom = itemTop + this.itemHeight();
			const scrollMin = itemBottom - this.innerHeight + this.itemHeight() / 2;
			if (scrollY > itemTop) {
				if (smooth) {
					this.smoothScrollTo(0, itemTop);
				} else {
					this.scrollTo(0, itemTop);
				}
			} else if (scrollY < scrollMin) {
				if (smooth) {
					this.smoothScrollTo(0, scrollMin);
				} else {
					this.scrollTo(0, scrollMin);
				}
			}
		}
	}

	drawWindowBackground() {
		this._windowBG = new Sprite();
		this._windowBG.bitmap = ImageManager.loadMenu(TLB.Param.SKAUIC.subcategory_bg);
		this._windowBG.y -= 7;
		this.addChildAt(this._windowBG, 0);
	}

	itemRect(index) {
		const rect = super.itemRect(index);
		return new Rectangle(rect.x + 2, rect.y + 15, rect.width - 4, rect.height);
	}

	drawItemBackground(index) {
		const rect = this.itemRect(index);
		this.drawBackgroundRect(rect, index);
	}

	drawBackgroundRect(rect, index) {
		let c1 = "";
		let c2 = "";
		if (index % 2 === 0) {
			c1 = "#373845";
			c2 = "#353441"
		} else {
			c1 = "#474853";
			c2 = "#4b4957"
		}
		if (index == 0) {
			c1 = "#302f3c";
		}
		const x = rect.x - 3;
		const y = rect.y - 7;
		const w = rect.width + 7;
		const h = rect.height + 2;
		this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
		this.contentsBack.strokeRect(x, y, w, h, c1);
	}

	drawItem(index) {
		const rect = this.itemLineRect(index);
		rect.y -= 9;
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 25;
		if (this._category === "bestiary") {
			let item = this._list[index];
			if (item === "EMPTY") { return; }
			if (item.enabled) {
				let symbol = this.isExpanded(item.name) ? "-" : "+";
				this.drawGradientText(`${symbol} ${this.commandName(index)}`, this._standardGradient, rect.x, rect.y, rect.width, "center", this._textOptions);
			} else {
				this.contents.fontSize = 19;
				this.drawGradientText(item.name, ["#ad9cb1", "#c3bbc5", "#b0a0b4"], rect.x, rect.y, rect.width, "center", this._textOptions);
			}
		}
	}

	refreshCursor() {
		const index = this.index();
		if (index >= 0) {
			const rect = this.itemRect(index);
			rect.x -= 1;
			rect.y -= 7;
			this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
			this.cursorVisible = true;
		} else {
			this.setCursorRect(0, -40, 0, 0);
			this.cursorVisible = false;
		}
	}

	itemHeight() {
		return 44;
	}

	_createCursorSprite() {
		this._cursorSprite = new Sprite();
		let image = TLB.Param.SKAUIC.subcategory_cursor;
		let bmp = ImageManager.loadMenu(image);
		this._cursorSprite.bitmap = bmp;
		this._clientArea.addChild(this._cursorSprite);
	}

	_refreshCursor() {
		//
	}

	_refreshArrows() {
		//
	};

	updateArrows() {
		this.downArrowVisible = this.maxItems() - this.topIndex() > 13;
		this.upArrowVisible = this.topIndex() > 0;
	};
}

class Window_GBCInfo extends Window_GBCCommand {
	constructor(rect) {
		super(rect);
		this.drawWindowBackground();
		this.deactivate();
		this._standardGradient = ["#d9c4de", "#eee5f1", "#d9c5dd"];
		this._specialGradient = ["#dcb38d", "#ca9a91", "#bc8694"];
	}

	drawWindowBackground() {
		this._windowBG = new Sprite();
		this._windowBG.bitmap = ImageManager.loadMenu(TLB.Param.SKAUIC.information_bg);
		this.addChildAt(this._windowBG, 0);
	}

	setup(category, type, item) {
		this.clearInfo();
		this._category = category;
		this._type = type;
		switch (category) {
			case "bestiary":
				if (item.battlerName) {
					this.updateBestiaryEnemy(item);
				}
				break;
		}
	}

	clearInfo() {
		this._category = "";
		this._type = "";
		this._enemy = null;
		this.contents.clear();
		if (this._enemySprite) {
			this.removeChild(this._enemySprite);
		}
		this.refresh();
	}

	maxItems() {
		return this._data ? this._data.length : 0;
	}

	_makeCursorAlpha() {
		return 0;
	}

	itemRect(index) {
		const maxCols = this.maxCols();
		const itemWidth = this.itemWidth();
		let itemHeight = this.itemHeight();
		if (index === 0) {
			itemHeight += 10;
		}
		const colSpacing = this.colSpacing();
		const rowSpacing = this.rowSpacing();
		const col = index % maxCols;
		const row = Math.floor(index / maxCols);
		let x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
		let y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
		let width = itemWidth - colSpacing;
		let height = itemHeight - rowSpacing;
		return new Rectangle(x, y, width, height);
	}

	maxPageRows() {
		return 7;
	}

	maxVisibleItems() {
		return 7;
	}

	itemHeight() {
		return 80;
	}

	drawItemBackground(index) {
		//
	}

	updateBestiaryEnemy(enemy) {
		this.contents.fontSize = 22;
		this.contents.fontFace = "franklin-gothic-med-cond";
		this.setEnemy(enemy);
		this.drawStats();
		this.drawAffinities();
		this.drawSkills();
		this.drawTraits();
		this.drawKilledBosses();
	}

	drawAffinities() {
		const mapElementIDToIconID = [null, 77, 64, null, 66, 67, 68, 69, 70, 71];

		let j = 0;
		const rect = this.itemRect(0);
		for (let i = 0; i < $dataSystem.elements.length; i++) {
			const x = rect.width - rect.width / 4 + (i < 6 ? 30 : 80);
			const y = rect.y + j * 58 + 18;
			const iconID = mapElementIDToIconID[i];
			if (iconID != null) {
				this.drawIcon(iconID, x, y);
				const affinity = Window_EnemyDetail.prototype.getAffinity.call(this, i);
				this.drawGradientText(affinity, this._standardGradient, x, y + ImageManager.iconWidth - 4, ImageManager.iconWidth, "center", this._textOptions);
				if (j === 3) { j = 0; }
				else { ++j; }
			}
		}
	}

	drawStats() {
		const statTxt = ["#d4aae5", "#c7ade5", "#b7b0e6"];
		const stats = Window_EnemyDetail.prototype.makeStats.call(this);
		for (let i = 0; i < stats.length; i++) {
			const stat = stats[i];
			const rect = this.itemRect(i);
			const y = rect.y - i * 50 + 10;
			this.drawGradientText(stat.name, statTxt, rect.width / 2, y, rect.width / 4, "left", this._textOptions);
			this.drawGradientText(stat.value, this._standardGradient, rect.width / 2, y, rect.width / 4, "right", this._textOptions);
		}
	}

	makeStat(name, stat) {
		const value = BeastiaryManager.isKnownStat(this._enemy.id, stat) ? this._gameEnemy.param(stat) : "?";
		return { name, value };
	}

	drawSkills() {
		const skills = this.makeSkills();
		this.contents.fontSize = 25;
		this.drawGradientText("Skills", this._specialGradient, 10, 280, 400, "left", this._textOptions);
		this.contents.fontSize = 22;
		const rect = this.itemRect(0);
		for (let i = 0; i < skills.length; i++) {
			const y = 290 + ((i + 1) * 30);
			let iconId = null;
			let skillName = "";
			if (skills[i].includes("[")) {
				iconId = skills[i].substring(1, skills[i].indexOf("]"));
				skillName = skills[i].replace(`[${iconId}]`, "");
				this.drawIcon(iconId, 10, y + 2);
				this.drawGradientText(skillName, this._standardGradient, 13 + ImageManager.iconWidth, y - 2, rect.width / 2 - 48, "left", this._textOptions);
			} else {
				skillName = skills[i];
				this.drawGradientText(skillName, this._standardGradient, 10, y, rect.width / 2 - 48, "left", this._textOptions);
			}
		}
	}

	makeSkills() {
		const skills = $dataEnemies
			.filter(enemy => enemy?.name === this._enemy.name)
			.map(enemy => enemy.actions).flat()
			.filter(action => action !== null)
			.map(action => $dataSkills[action.skillId]);
		return [...new Set(skills)]
			.map(skill =>
				BeastiaryManager.isKnownSkill(this._enemy.id, skill.id) ? `[${skill.iconIndex}]${skill.name}` : "?"
			);
	}

	drawTraits() {
		const traits = Window_EnemyDetail.prototype.makeTraits.call(this);
		this.contents.fontSize = 25;
		this.drawGradientText("Traits", this._specialGradient, this.width / 2 - 15, 280, 400, "left", this._textOptions);
		this.contents.fontSize = 22;
		const rect = this.itemRect(0);
		for (let i = 0; i < traits.length; i++) {
			const y = 290 + ((i + 1) * 30);
			this.drawGradientText(traits[i], this._standardGradient, this.width / 2 - 15, y, rect.width, "left", this._textOptions);
		}
	}

	drawKilledBosses() {
		const text = this.makeKilledBosses();
		if (text) {
			this.contents.fontSize = 25;
			this.drawGradientText("Defeated", this._specialGradient, 10 + this.width / 2, this.height - 70, this.width, "left", this._textOptions);
			this.contents.fontSize = 22;
			this.drawGradientText(`${text[0]}/${text[1]}`, this._standardGradient, this.width / 2, this.height - 70, this.width / 2 - 50, "right", this._textOptions);
		}
	}

	makeKilledBosses() {
		let total = parseInt(this._enemy.meta.num);
		if (total > 0) {
			let numKilled = BeastiaryManager.getNumKilled(this._enemy.id) || 0;

			// if either user has clear gem or killed all, show total, otherwise a "?"
			if (numKilled < total && !$gameParty.hasItem($dataItems[2])) {
				total = "?";
			}

			return [numKilled, total];
		}
		return null;
	}

	setEnemy(enemy) {
		this._enemySprite = new Sprite();
		this._enemySprite.anchor.set(0.5);
		this._enemySprite.move((this.width * 0.2) + 20, (this.height * 0.2) + 20);
		this.addChild(this._enemySprite);

		this._enemy = enemy;
		this._gameEnemy = new Game_Enemy(enemy.id, -1, -1);

		const bitmap = ImageManager.loadSvEnemy(enemy.battlerName);
		this._enemySprite.bitmap = bitmap;
		if (bitmap && !bitmap.isReady()) {
			bitmap.addLoadListener(this.initSprite.bind(this));
		} else {
			this.initSprite();
		}
	}

	initSprite() {
		const scaleX = this.width * 0.4 / this._enemySprite._bitmap.width;
		const scaleY = this.height * 0.4 / this._enemySprite._bitmap.height;
		const scale = Math.min(scaleX, scaleY, 1);
		this._enemySprite.scale.x = scale;
		this._enemySprite.scale.y = scale;
		if (this._enemy) this._enemySprite.setHue(this._enemy.battlerHue);
	}
}
