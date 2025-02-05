// Trilobytes - Star Knightess Aura UI Quest Menu/
// TLB_SKAUIQuestMenu.js
//=============================================================================

window.Imported = window.Imported || {};
Imported.TLB_SKAUIQuestMenu = true;

window.TLB = window.TLB || {};
TLB.SKAUIQuestMenu = TLB.SKAUIQuestMenu || {};

/*:
 * @target MZ
 * @plugindesc This plugin modifies the quest menu of Star Knightess
 * Aura to reflect the prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the current Scene_Quest to match a
 * prototype specified by the client. It will not be compatible with any other
 * project and may not be used by anyone besides the client of the commission.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * All parameters are explained in their respective description field.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * None
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 *
 * There shouldn't be any compatibility issues with non-menu plugins.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * Copyright 2023 Auradev
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
 * ============================================================================
 *
 * @param questWindow
 * @text Quest List Window
 *
 * @param questmenu_selection_window
 * @parent questWindow
 * @text BG
 * @desc Image to use for quest selection window.
 * @type file
 * @dir img/menu/
 * @default Quest_Menu/QUEST_MENU_QUEST_SELECTION_WINDOW
 *
 * @param questmenu_selection_content
 * @parent questWindow
 * @text Content
 * @desc Image to use for quest selection content.
 * @type file
 * @dir img/menu/
 * @default Quest_Menu/QUEST_MENU_QUEST_SELECTION_CONTENT
 *
 * @param questmenu_selection_x_offset
 * @parent questWindow
 * @text X Offset
 * @desc X offset of the quest window from the right of the category window.
 * @type number
 * @default 1
 *
 * @param questmenu_selection_y_offset
 * @parent questWindow
 * @text Y Offset
 * @desc Y offset of the quest window from the bottom of the category window.
 * @type number
 * @min -9999
 * @max 9999
 * @default -1
 *
 * @param questmenu_selection_width
 * @parent questWindow
 * @text Width
 * @desc Width of the quest window rect.
 * @type number
 * @default 258
 *
 * @param questmenu_selection_height
 * @parent questWindow
 * @text Height
 * @desc Height of the quest window rect.
 * @type number
 * @default 544
 *
 * @param questmenu_selection
 * @text Selection Cursor
 * @desc Image to use for quest selection cursor.
 * @type file
 * @dir img/menu/
 * @default Quest_Menu/QUEST_MENU_SELECTION
 *
 * @param detailWindow
 * @text Quest Detail Window
 *
 * @param questmenu_description_window
 * @parent detailWindow
 * @text BG
 * @desc Image to use for quest description window.
 * @type file
 * @dir img/menu/
 * @default Quest_Menu/QUEST_MENU_QUEST_DESCRIPTION_WINDOW
 *
 * @param questmenu_description_x_offset
 * @parent detailWindow
 * @text X Offset
 * @desc X offset of the detail window from the right of the quest list window.
 * @type number
 * @default 16
 *
 * @param questmenu_description_y_offset
 * @parent detailWindow
 * @text Y Offset
 * @desc Y offset of the detail window from the bottom of the quest list window.
 * @type number
 * @default 12
 *
 * @param questmenu_description_width
 * @parent detailWindow
 * @text Width
 * @desc Width of the detail window rect.
 * @type number
 * @default 522
 *
 * @param questmenu_description_height
 * @parent detailWindow
 * @text Height
 * @desc Height of the detail window rect.
 * @type number
 * @default 167
 *
 * @param objectiveWindow
 * @text Objective Window
 *
 * @param questmenu_objectives_window
 * @parent objectiveWindow
 * @text BG
 * @desc Image to use for quest objectives window.
 * @type file
 * @dir img/menu/
 * @default Quest_Menu/QUEST_MENU_QUEST_OBJECTIVES_WINDOW
 *
 * @param questmenu_objectives_x_offset
 * @parent objectiveWindow
 * @text X Offset
 * @desc X offset from the right of the detail window.
 * @type number
 * @min -9999
 * @max 9999
 * @default -4
 *
 * @param questmenu_objectives_y_offset
 * @parent objectiveWindow
 * @text Y Offset
 * @desc Y offset from the bottom of the detail window.
 * @type number
 * @default 10
 *
 * @param questmenu_objectives_width
 * @parent objectiveWindow
 * @text Width
 * @desc Width of the objective window rect.
 * @type number
 * @default 544
 *
 * @param questmenu_objectives_height
 * @parent objectiveWindow
 * @text Height
 * @desc Height of the objective window rect.
 * @type number
 * @default 357
 *
 * @param helpWindow
 * @text Help Window
 *
 * @param questmenu_help_window
 * @parent helpWindow
 * @text BG
 * @desc Image to use for quest help window.
 * @type file
 * @dir img/menu/
 * @default Quest_Menu/QUEST_MENU_HELP_WINDOW
 *
 * @param questmenu_help_x
 * @parent helpWindow
 * @text X
 * @desc X coordinate of help window rect.
 * @type number
 * @default 425
 *
 * @param questmenu_help_y
 * @parent helpWindow
 * @text Y
 * @desc Y coordinate of help window rect.
 * @type number
 * @default 562
 *
 * @param questmenu_help_width
 * @parent helpWindow
 * @text Width
 * @desc Width of help window rect.
 * @type number
 * @default 817
 *
 * @param questmenu_help_height
 * @parent helpWindow
 * @text Height
 * @desc Height of help window rect.
 * @type number
 * @default 109
 *
 * @param categoryWindow
 * @text Category Window
 *
 * @param questmenu_category_x
 * @parent categoryWindow
 * @text X
 * @desc X coordinate of category window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -142
 *
 * @param questmenu_category_y
 * @parent categoryWindow
 * @text Y
 * @desc Y coordinate of category window rect.
 * @type number
 * @default 19
 *
 * @param questmenu_category_width
 * @parent categoryWindow
 * @text Width
 * @desc Width of category window rect.
 * @type number
 * @default 329
 *
 * @param questmenu_category_height
 * @parent categoryWindow
 * @text Height
 * @desc Height of category window rect.
 * @type number
 * @default 270
 *
 */

window.parameters = PluginManager.parameters('TLB_SKAUIQuestMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKAUIQM = TLB.Param.SKAUIQM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAUIQM);

Window_QuestCategory.prototype.initialize = function(rect) {
	this._categoryBackSprites = [];
	Window_HorzCommand.prototype.initialize.call(this, rect);
	this.opacity = 0;
	this.cursorVisible = false;
	this._canRepeat = false;
	this.refresh();
	this.select(0);
};

Window_QuestCategory.prototype.maxCols = function() {
	return 1;
};

Window_QuestCategory.prototype.refreshCursor = function() {
	const index = this.index();
	if (index >= 0) {
		const rect = this.itemRect(index);
		rect.y += 13 - (9 * index);
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		this.setCursorRect(0, 0, 0, 0);
		this.cursorVisible = false;
	}
};

Window_QuestCategory.prototype.drawAllItems = function() {
	for (const sprite of this._categoryBackSprites) {
		this.removeChild(sprite);
	}
	this._categoryBackSprites = [];
    const topIndex = this.topIndex();
	const icons = [296, 297, 298];
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItemBackground(index);
            this.drawItem(index, icons[i]);
        }
    }
};

Window_QuestCategory.prototype.drawItemBackground = function(index) {
	const rect = this.itemRect(index);
	if (index > 1) rect.y -= 9 * (index - 1);
	this._categoryBackSprites.push(new Sprite());
	let image;
	if (index === 0) {
		image = TLB.Param.SKAUIB.categorywindow_topbgimage;
	} else {
		image = TLB.Param.SKAUIB.categorywindow_bgimage;
	}
	this._categoryBackSprites[index].bitmap = ImageManager.loadMenu(image);
	this._categoryBackSprites[index].y = rect.y;
	image = TLB.Param.SKAUIB.categorywindow_cursorimage;
	const cursor = new Sprite();
	cursor.bitmap = ImageManager.loadMenu(image);
	cursor.position.set(15, 25);
	if (index > 0) cursor.position.y -= 8;
	cursor.visible = false;
	this._categoryBackSprites[index].addChild(cursor);
	this.addChildAt(this._categoryBackSprites[index], index);
};

Window_QuestCategory.prototype.itemHeight = function() {
	return 79;
};

Window_QuestCategory.prototype.drawItem = function(index, icon) {
	const sprite = this._categoryBackSprites[index];
	if (sprite) {
		const rect = this.itemRect(index);
		rect.y -= 1;
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		this.drawIcon(icon, rect.x + 7, rect.y + -9 * (index - 2));
		this.contents.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = 30;
		this.drawGradientText(this.commandName(index), ["#d9c4de", "#eee5f1", "#d9c5dd"], rect.x + 45, rect.y - 4 + -9 * (index - 2), 180, "left", { outlineThickness: 3});
	}
};

Window_QuestCategory.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKAUIB.categorywindow_cursorimage;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_QuestCategory.prototype._refreshCursor = function() {
	//
};

Window_QuestList.prototype._createAllParts = function() {
	this.createSprites();
	Window.prototype._createAllParts.call(this);
};

Window_QuestList.prototype.createSprites = function() {
	this._backgroundSprite = new Sprite();
	let image = TLB.Param.SKAUIQM.questmenu_selection_window;
	let bitmap = ImageManager.loadMenu(image);
	this._backgroundSprite.bitmap = bitmap;
	this.addChild(this._backgroundSprite);
};

TLB.SKAUIQuestMenu.Window_QuestList_initialize = Window_QuestList.prototype.initialize;
Window_QuestList.prototype.initialize = function(rect) {
    TLB.SKAUIQuestMenu.Window_QuestList_initialize.call(this, rect);
	this._contentBg = new Sprite();
	let image = TLB.Param.SKAUIQM.questmenu_selection_content;
	let bitmap = ImageManager.loadMenu(image);
	this._contentBg.bitmap = bitmap;
	this._contentBg.move(0, -72);
	this._clientArea.addChildAt(this._contentBg, 0);
	image = TLB.Param.SKAUIB.arrowimage;
	bitmap = ImageManager.loadMenu(image);
	const arrowAnchor = { x: 0.5, y: 0.5 };
    this._downArrowSprite.bitmap = bitmap;
	this._downArrowSprite.anchor = arrowAnchor;
	this._downArrowSprite.move(258 / 2, 544 - 15);
	this._upArrowSprite.bitmap = bitmap;
	this._upArrowSprite.anchor = arrowAnchor;
	this._upArrowSprite.scale.y = -1;
	this._upArrowSprite.move(258 / 2, 5);
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 18;
	this._contentsSprite.y += 18;
	this.opacity = 0;
	this.cursorVisible = false;
};

Window_QuestList.prototype.hitIndex = function() {
	const touchPos = new Point(TouchInput.x, TouchInput.y);
	const localPos = this.worldTransform.applyInverse(touchPos);
	return this.hitTest(localPos.x, localPos.y - 18);
};

Window_QuestList.prototype.refreshCursor = function() {
	const index = this.index();
	if (index >= 0) {
		const rect = this.itemRect(index);
		rect.x -= 3;
		rect.y += 15;
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		this.setCursorRect(0, 0, 0, 0);
		this.cursorVisible = false;
	}
};

Window_QuestList.prototype.updateScrollBase = function(baseX, baseY) {
	const deltaX = baseX - this._scrollBaseX;
	const deltaY = baseY - this._scrollBaseY;
	this._contentBg.x -= deltaX;
	this._contentBg.y -= deltaY;
	if (deltaY > 44) { // scrolling more than 1 row, select last item
		this._contentBg.y = this.row() % 2 === 0 ? -116 : -72;
	} else if (this._contentBg.y <= -160 || this._contentBg.y >= 16) this._contentBg.y = -72;
	Window_Scrollable.prototype.updateScrollBase.call(this, baseX, baseY);
};

Window_QuestList.prototype.drawItem = function(index) {
	const item = this.itemAt(index);
	if (item) {
		const rect = this.itemLineRect(index);
		this.drawText(item._title, rect.x, rect.y - 2, rect.width, "center");
	}
};

Window_QuestList.prototype.drawItemBackground = function(index) {
    //
};

Window_QuestList.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKAUIQM.questmenu_selection;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_QuestList.prototype._refreshCursor = function() {
	//
};

Window_QuestList.prototype._updateFilterArea = function() {
	const pos = this._clientArea.worldTransform.apply(new Point(0, 18));
	const filterArea = this._clientArea.filterArea;
	filterArea.x = pos.x + this.origin.x;
	filterArea.y = pos.y + this.origin.y;
	filterArea.width = this.innerWidth;
	filterArea.height = 484;
};

Object.defineProperty(Window_QuestList.prototype, "innerHeight", {
    get: function() {
        return 484;
    },
    configurable: true
});

Object.defineProperty(Window_QuestList.prototype, "innerRect", {
    get: function() {
        return new Rectangle(
            16,
			18,
            this.innerWidth,
            484
        );
    },
    configurable: true
});

TLB.SKAUIQuestMenu.Window_QuestList_update = Window_QuestList.prototype.update;
Window_QuestList.prototype.update = function() {
	TLB.SKAUIQuestMenu.Window_QuestList_update.call(this);
	if (this._questObjectiveDetailWindow) {
		this._questObjectiveDetailWindow.setQuest(this.item());
	}
};

Window_QuestList.prototype.setQuestObjectiveDetailWindow = function(questObjectiveDetailWindow) {
	this._questObjectiveDetailWindow = questObjectiveDetailWindow;
};


Window_QuestList.prototype.itemHeight = function() {
	return 44;
};

Window_QuestList.prototype._refreshArrows = function() {
    //
};

Window_QuestList.prototype.updateArrows = function() {
    this.downArrowVisible = this.maxItems() - this.topIndex() > 11;
    this.upArrowVisible = this.topIndex() > 0;
};

Window_QuestDetail.prototype._createAllParts = function() {
	this.createSprites();
	Window.prototype._createAllParts.call(this);
};

Window_QuestDetail.prototype.createSprites = function() {
	this._backSprite = new Sprite();
	let image = TLB.Param.SKAUIQM.questmenu_description_window;
	let bitmap = ImageManager.loadMenu(image);
	this._backSprite.bitmap = bitmap;
	this._backSprite.move(-15, -12);
	this.addChild(this._backSprite);
};

class Window_QuestObjectiveDetail extends Window_Selectable {
	static questUtil = new Quest_Util();

	constructor(rect) {
		super(rect);
		this._quest = null;
		this._data = "";
		this.opacity = 0;
	}

	_createAllParts() {
		this.createSprites();
		Window.prototype._createAllParts.call(this);
	}

	createSprites() {
		this._backSprite = new Sprite();
		let image = TLB.Param.SKAUIQM.questmenu_objectives_window;
		let bitmap = ImageManager.loadMenu(image);
		this._backSprite.move(-11, 0);
		this._backSprite.bitmap = bitmap;
		this.addChild(this._backSprite);
	}

	lineHeight() {
		return 40;
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
			this._data = Window_QuestDetail.questUtil.getDetailObjectives(this._quest);
			this._data = Window_QuestDetail.prototype.formatDetail.call(this, this._data);
		}
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
		const y = 52;
		const width = this.width;
		const height = this.height;
		return new Rectangle(x, y, width, height);
	}

	drawAllItems() {
		const text = "QUEST OBJECTIVES";
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 25;
		this.drawGradientText(text, ["#ada0b0", "#c2b7c5"], 0, 12, this.textWidth(text), "left", { dropShadow: true, dropShadowX: -1, dropShadowY: -1 });
		if (this._quest) {
			const rect = this.itemRect();
			this.contents.fontFace = 'franklin-gothic-demi-cond';
			this.contents.fontSize = 18;
			this.drawTextEx("\\FS[18]" + this._data, rect.x, rect.y + 1, rect.width - 50, true);
		}
	}

	refresh() {
		this.makeDetail();
		super.refresh();
	}
}

class Window_SKAQuestHelp extends Window_Help {
	constructor(rect) {
		super(rect);
		this._backSprite = new Sprite();
		this._backSprite.y -= 3;
		const image = TLB.Param.SKAUIQM.questmenu_help_window;
		this._backSprite.bitmap = ImageManager.loadMenu(image);
		this.addChildAt(this._backSprite, 0);
		this.opacity = 0;
	}

	lineHeight() {
		return 32;
	}

	refresh() {
		this.contents.clear();
		this.contents.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = 22;
		this.drawTextEx(this._text, 10, 10, 760, true);
	}
}

Quest_Util.prototype.getDetailQuest = function(quest) {
	const detail = quest._description;
	return detail;
};

Quest_Util.prototype.getDetailObjectives = function(quest) {
	let objectivesDetail = "";
	if (quest._objectives.length > 0) {
		objectivesDetail = quest._objectives
			.map(objective => this.getDetailObjective(objective))
			.join("\n");
	}
	return objectivesDetail;
};

TLB.SKAUIQuestMenu.Window_QuestDetail_initialize = Window_QuestDetail.prototype.initialize;
Window_QuestDetail.prototype.initialize = function(rect) {
    TLB.SKAUIQuestMenu.Window_QuestDetail_initialize.call(this, rect);
	this.opacity = 0;
};

Window_QuestDetail.prototype.drawAllItems = function() {
	if (this._quest) {
		const rect = this.itemRect();
		this.drawTextEx("\\FS[18]" + this._data, rect.x, rect.y, rect.width, true);
	}
};

TLB.SKAUIQuestMenu.Scene_Quest_create = Scene_Quest.prototype.create;
Scene_Quest.prototype.create = function() {
	TLB.SKAUIQuestMenu.Scene_Quest_create.call(this);
	this.createQuestObjectiveDetailWindow();
};

Scene_Quest.prototype.createHelpWindow = function() {
	const rect = this.helpWindowRect();
	this._helpWindow = new Window_SKAQuestHelp(rect);
	this.addChildAt(this._helpWindow, 5);
};

Scene_Quest.prototype.helpWindowRect = function() {
	const params = TLB.Param.SKAUIQM;
	const wx = params.questmenu_help_x;
	const wy = params.questmenu_help_y;
	const ww = params.questmenu_help_width;
	const wh = params.questmenu_help_height;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.categoryWindowRect = function() {
	const params = TLB.Param.SKAUIQM;
	const wx = params.questmenu_category_x;
	const wy = params.questmenu_category_y;
	const ww = params.questmenu_category_width;
	const wh = params.questmenu_category_height;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.questWindowRect = function() {
	const params = TLB.Param.SKAUIQM;
	const wx = this._categoryWindow.x + this._categoryWindow.width + params.questmenu_selection_x_offset;
	const wy = this._categoryWindow.y + params.questmenu_selection_y_offset;
	const ww = params.questmenu_selection_width;
	const wh = params.questmenu_selection_height;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.questDetailWindowRect = function() {
	const params = TLB.Param.SKAUIQM;
	const wx = this._questWindow.x + this._questWindow.width + params.questmenu_description_x_offset;
	const wy = this._questWindow.y + params.questmenu_description_y_offset;
	const ww = params.questmenu_description_width;
	const wh = params.questmenu_description_height;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.createQuestObjectiveDetailWindow = function() {
	const rect = this.questObjectiveDetailWindowRect();
	this._questObjectiveDetailWindow = new Window_QuestObjectiveDetail(rect);
	this.addWindow(this._questObjectiveDetailWindow);
	this._questWindow.setQuestObjectiveDetailWindow(this._questObjectiveDetailWindow);
};

Scene_Quest.prototype.questObjectiveDetailWindowRect = function() {
	const params = TLB.Param.SKAUIQM;
	const wx = this._questDetailWindow.x + params.questmenu_objectives_x_offset;
	const wy = this._questDetailWindow.y + this._questDetailWindow.height + params.questmenu_objectives_y_offset;
	const ww = params.questmenu_objectives_width;
	const wh = params.questmenu_objectives_height;
	return new Rectangle(wx, wy, ww, wh);
};
