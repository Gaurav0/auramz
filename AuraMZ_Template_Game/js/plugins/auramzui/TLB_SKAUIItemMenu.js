// Trilobytes - Star Knightess Aura UI Item Menu/
// TLB_SKAUIItemMenu.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAUIItemMenu = true;

window.TLB = window.TLB || {};
TLB.SKAUIItemMenu = TLB.SKAUIItemMenu || {};

/*:
 * @target MZ
 * @base TLB_GradientTextExtensions
 * @base TLB_SKABase
 * @orderAfter TLB_SKABase
 * @plugindesc This plugin modifies the item menu of Star Knightess
 * Aura to reflect the prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the base Scene_Item to match a
 * prototype specified by the client. It will not be compatible with any other
 * project and may not be used by anyone besides the client of the commission.
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
 * @param itemmenu_detailwindow
 * @text Detail Window
 *
 * @param itemmenu_detailwindow_bg
 * @parent itemmenu_detailwindow
 * @text BG Image
 * @desc Filename of image to use for item detail background.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_SELECT_BG
 *
 * @param categorywindow
 * @text Category Window
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
 * @min -9999
 * @max 9999
 * @default 19
 *
 * @param categoryWindowWidth
 * @parent categoryWindow
 * @text Width
 * @desc Width of the category window rect.
 * @type number
 * @default 329
 *
 * @param itemWindow
 * @text Item Window
 *
 * @param itemWindowX
 * @parent itemWindow
 * @text X
 * @desc X coordinate of the item window rect.
 * @type number
 * @default 188
 *
 * @param itemWindowY
 * @parent itemWindow
 * @text Y
 * @desc Y coordinate of the item window rect.
 * @type number
 * @default 18
 *
 * @param itemWindowWidth
 * @parent itemWindow
 * @text Width
 * @desc Width of the item window rect.
 * @type number
 * @default 817
 *
 * @param itemWindowHeight
 * @parent itemWindow
 * @text Height
 * @desc Height of the item window rect.
 * @type number
 * @default 495
 *
 * @param helpWindow
 * @text Help Window
 *
 * @param helpWindowX
 * @parent helpWindow
 * @text X
 * @desc X coordinate of the help window rect.
 * @type number
 * @default 188
 *
 * @param helpWindowYOffset
 * @parent helpWindow
 * @text Y
 * @desc Y coordinate offset from the bottom of the item window.
 * @type number
 * @default 3
 *
 * @param helpWindowWidth
 * @parent helpWindow
 * @text Width
 * @desc Width of the help window rect.
 * @type number
 * @default 817
 *
 * @param helpWindowHeight
 * @parent helpWindow
 * @text Height
 * @desc Height of the help window rect.
 * @type number
 * @default 186
 *
 */

 //----------------------------------------------------------------------------
 //
 // Parameter conversion
 //
 //----------------------------------------------------------------------------

window.parameters = PluginManager.parameters('TLB_SKAUIItemMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKAUIIM = TLB.Param.SKAUIIM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAUIIM);

//-----------------------------------------------------------------------------
//
// Scene_Item (existing class)
//
// New function: createItemDetailWindow
// New function: itemDetailWindowRect
// Overwrite: create
// Overwrite: createCategoryWindow
// Overwrite: categoryWindowRect
// Overwrite: createItemWindow
// Overwrite: itemWindowRect
// Overwrite: user
// Alias: useItem
// Override: showActorWindow (from Scene_ItemBase)
// Override: hideActorWindow (from Scene_ItemBase)
// Override: createHelpWindow (from Scene_MenuBase)
// Override: helpWindowRect (from Scene_Menubase)
// Override: calcWindowHeight (from Scene_Base)
//
//-----------------------------------------------------------------------------

Scene_Item.prototype.createItemDetailWindow = function() {
	const rect = this.itemDetailWindowRect();
	this._itemDetailWindow = new Window_ItemDetails(rect);
	this.addChild(this._itemDetailWindow);
};

Scene_Item.prototype.itemDetailWindowRect = function() {
	const wx = 140;
	const wy = 77;
	const ww = 404;
	const wh = 61;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.createDimmerSprite = function() {
	const bParams = TLB.Param.SKAUIB;
	this._dimmerSprite = new Sprite();
	let image = bParams.dimmer_image;
	this._dimmerSprite.bitmap = ImageManager.loadMenu(image);
	this._dimmerSprite.opacity = bParams.dimmer_opacity;
	this._dimmerSprite.visible = false;
	this.addChild(this._dimmerSprite);
};

Scene_Item.prototype.create = function() {
	const iParams = TLB.Param.SKAUIIM;
	const bParams = TLB.Param.SKAUIB;
	Scene_Base.prototype.create.call(this);
	const images = [bParams.categorywindow_topbgimage, bParams.categorywindow_bgimage, bParams.categorywindow_cursorimage, bParams.itemwindow_bgimage, TLB.Param.SKAUIB.itemwindow_cursorimage, bParams.arrowimage, bParams.helpwindow_bgimage, bParams.actorwindow_bgimage, bParams.actorwindow_actorbgimage_active, bParams.actorwindow_actorbgimage_inactive, bParams.actorwindow_actorbgimage_locked, bParams.actorwindow_actornameframe_locked, bParams.actorwindow_actornameframe_unlocked, bParams.actorwindow_actornameframe_star_locked, bParams.actorwindow_actornameframe_star_locked, bParams.actorwindow_gauge_bgimage, bParams.actorwindow_gauge_frameimage, bParams.actorwindow_gauge_wpframeimage, iParams.itemmenu_detailwindow_bg, bParams.dimmer_image];
	TLB.SKAUIBase.loadImages(images);
	this.createBackground();
	this.updateActor();
	this.createWindowLayer();
	this.createCategoryWindow();
	this.createItemWindow();
	this.createHelpWindow();
	this.createDimmerSprite();
	this.createButtons();
	this.createItemDetailWindow();
	this.createActorWindow();
};

Scene_Item.prototype.createCategoryWindow = function() {
	const rect = this.categoryWindowRect();
	this._categoryWindow = new Window_SKAItemCategory(rect);
	this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._categoryWindow);
};

Scene_Item.prototype.categoryWindowRect = function() {
	const params = TLB.Param.SKAUIIM;
	const wx = params.categoryWindowX;
	const wy = params.categoryWindowY;
	const ww = params.categoryWindowWidth;
	const wh = this.calcWindowHeight((TLB.Param.SKAB.itemcategories || "[]").length, true, true);
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.createItemWindow = function() {
	const rect = this.itemWindowRect();
	this._itemWindow = new Window_SKAItemList(rect);
	this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
	this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
	this.addWindow(this._itemWindow)
	this._categoryWindow.setItemWindow(this._itemWindow);
};

Scene_Item.prototype.itemWindowRect = function() {
	const params = TLB.Param.SKAUIIM;
	const wx = params.itemWindowX;
	const wy = params.itemWindowY;
	const ww = params.itemWindowWidth;
	const wh = params.itemWindowHeight;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.user = function() {
	const memberId = Math.max(0, this._actorWindow.index());
	return $gameParty.members()[memberId];
};

TLB.SKAUIItemMenu.Scene_Item_useItem = Scene_Item.prototype.useItem;
Scene_Item.prototype.useItem = function() {
    TLB.SKAUIItemMenu.Scene_Item_useItem.call(this);
	this._actorWindow.selectLast();
};

Scene_Item.prototype.showActorWindow = function() {
	this._actorWindow.setItem(this.item());
	this._actorWindow.refresh();
    this._actorWindow.show();
    this._actorWindow.activate();
	this._dimmerSprite.visible = true;
	this._itemDetailWindow.setItem(this.item());
	this._itemDetailWindow.show();
};

Scene_Item.prototype.hideActorWindow = function() {
	this._actorWindow.setItem(null);
    this._actorWindow.hide();
    this._actorWindow.deactivate();
	this._dimmerSprite.visible = false;
	this._itemDetailWindow.hide();
};

Scene_Item.prototype.createHelpWindow = function() {
	const rect = this.helpWindowRect();
	this._helpWindow = new Window_SKAHelp(rect);
	this.addWindow(this._helpWindow);
	this._categoryWindow.setHelpWindow(this._helpWindow);
	this._itemWindow.setHelpWindow(this._helpWindow);
};

Scene_Item.prototype.helpWindowRect = function() {
	const params = TLB.Param.SKAUIIM;
	const wx = params.helpWindowX;
	const wy = this._itemWindow.y + this._itemWindow.height + params.helpWindowYOffset;
	const ww = params.helpWindowWidth;
	const wh = params.helpWindowHeight;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.calcWindowHeight = function(numLines, selectable, categoryWindow = false) {
	if (categoryWindow) {
		return Window_ItemCategory.prototype.fittingHeight(numLines);
	} else {
		return Scene_Base.prototype.calcWindowHeight.call(this, numLines, selectable);
	}
};

TLB.SKAUIItemMenu.Scene_Item_onItemCancel = Scene_Item.prototype.onItemCancel;
Scene_Item.prototype.onItemCancel = function() {
	const iWin = this._itemWindow;
	const first = iWin.topIndex();
	const numItems = Math.min(iWin._data.length, iWin.maxVisibleItems() - 2);
	$gameParty._recordedItems = $gameParty._recordedItems || [];
	for (let i = 0; i <= numItems; i++) {
		const item = iWin._data[i + first];
		if (item && !$gameParty._recordedItems.contains(item.id)) $gameParty._recordedItems.push(item.id);
	}
	TLB.SKAUIItemMenu.Scene_Item_onItemCancel.call(this);
};

//-----------------------------------------------------------------------------
//
// Window_ItemDetails (new class)
// Inherits from Window_Base
//
// Override: initialize(rect)
// Override: update
// New function: createBackground
// New function: setItem(item)
// New function: refresh
//
// This is the window that shows which item is being used during actor
// selection.
//
//-----------------------------------------------------------------------------

class Window_ItemDetails extends Window_Base {
	constructor(rect) {
		super(rect);
		this.createBackground();
		this._item = null;
		this.opacity = 0;
		this.hide();
	}

	update() {
		super.update();
		this.refresh();
	}

	createBackground() {
		let image = TLB.Param.SKAUIIM.itemmenu_detailwindow_bg;
		let bitmap = ImageManager.loadMenu(image);
		let sprite = new Sprite();
		sprite.bitmap = bitmap;
		this.addChildAt(sprite, 0);
		image = TLB.Param.SKAUIB.itemwindow_cursorimage;
		bitmap = ImageManager.loadMenu(image);
		sprite = new Sprite();
		sprite.bitmap = bitmap;
		sprite.move(9, 11);
		this.addChildAt(sprite, 1);
	}

	setItem(item) {
		this._item = item;
	}

	refresh() {
		this.contents.clear();
		if (this._item) {
			this.drawIcon(this._item.iconIndex, 6, 3);
			this.contents.fontFace = 'franklin-gothic-med';
			this.contents.fontSize = 18;
			this.contents.fontBold = true;
			this.drawText(this._item.name, 47, 0, 180);
			this.drawText($gameParty.numItems(this._item), 47, 0, 325, "right");
			this.contents.fontFace = 'franklin-gothic-demi';
			this.contents.fontSize = 14;
			this.drawText("x", 337, 0, 20);
		}
	}
}

//-----------------------------------------------------------------------------
//
// Window_SKAItemCategory (new class)
// Inherits from Window_ItemCategory
//
// New function: createSprites
// Overwrite: initialize(rect)
// Overwrite: makeCommandList
// Override: maxCols (from Window_HorzCommand)
// Override: drawItem(index) (from Window_Command)
// Override: itemHeight (from Window_Selectable)
// Override: drawItemBackground(index) (from Window_Selectable)
// Override: refreshCursor (from Window_Selectable)
// Override: _createCursorSprite (from Window)
// Override: _refreshCursor (from Window)
//
// The overwrites and overrides here turn the category window from a horizontal
// command window to vertical, and apply a background and styling to each item.
//
//-----------------------------------------------------------------------------

function Window_SKAItemCategory() {
	this.initialize(...arguments);
}

Window_SKAItemCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_SKAItemCategory.prototype.constructor = Window_SKAItemCategory;

Window_SKAItemCategory.prototype.createSprites = function() {
	const categories = (TLB.Param.SKAB.itemcategories || "[]").filter(category => eval(category.showInMenu));
	for (const i in categories) {
		const index = Number(i);
		const rect = this.itemRect(index);
		if (index > 0) rect.y -= 9 * (index - 1);
		this._categoryBackSprites.push(new Sprite());
		let image;
		if (index === 0) {
			image = TLB.Param.SKAUIB.categorywindow_topbgimage;
		} else {
			image = TLB.Param.SKAUIB.categorywindow_bgimage;
		}
		this._categoryBackSprites[index].bitmap = ImageManager.loadMenu(image);
		this._categoryBackSprites[index].y = rect.y;
		this.addChildAt(this._categoryBackSprites[index], index);
	}
};

Window_SKAItemCategory.prototype.initialize = function(rect) {
	this._categoryBackSprites = [];
	Window_Command.prototype.initialize.call(this, rect);
	this.createSprites();
	this.opacity = 0;
	this.cursorVisible = false;
	this._canRepeat = false;
	this.refresh();
	this.select(0);
};

Window_SKAItemCategory.prototype.makeCommandList = function() {
    const categories = TLB.Param.SKAB.itemcategories || "[]";
	for (const category of categories) {
		if (eval(category.showInMenu)) this.addCommand(category.name, category.symbol);
	}
};

Window_SKAItemCategory.prototype.maxCols = function() {
	return 1;
};

Window_SKAItemCategory.prototype.drawItem = function(index) {
	const sprite = this._categoryBackSprites[index];
	if (sprite) {
		const rect = this.itemRect(index);
		rect.y -= 1;
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		const categories = TLB.Param.SKAB.itemcategories || "[]";
		const categoryIndex = categories.findIndex(category => category.name === this.commandName(index));
		const category = categories[categoryIndex];
		const iconID = category.iconID;
		this.drawIcon(iconID, rect.x + 5, rect.y + -9 * (index - 2));
		this.contents.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = 30;
		this.drawGradientText(this.commandName(index), ["#d9c4de", "#eee5f1", "#d9c5dd"], rect.x + 49, rect.y - 4 + -9 * (index - 2), 180, "left", { outlineThickness: 3 });
	}
};

Window_SKAItemCategory.prototype.itemHeight = function() {
	return 79;
};

Window_SKAItemCategory.prototype.drawItemBackground = function(index) {
	//
};

Window_SKAItemCategory.prototype.refreshCursor = function() {
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

Window_SKAItemCategory.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKAUIB.categorywindow_cursorimage;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_SKAItemCategory.prototype._refreshCursor = function() {
	//
};

//-----------------------------------------------------------------------------
//
// Window_SKAItemList (new class)
// Inherits from Window_ItemList
//
// Overwrite: initialize(rect)
// Overwrite: includes(item)
// Overwrite: drawItem(index)
// Override: hitIndex (from Window_Selectable)
// Override: refreshCursor (from Window_Selectable)
// Override: updateScrollBase(baseX, baseY) (from Window_Scrollable)
// Override: itemPadding (from Window_Base)
// Oerride: _createCursorSprite (from Window)
// Override: _refreshCursor (from Window)
// Override: _refreshArrows (from Window)
// Override: _updateFilterArea (from Window)
// Property redefinition: innerHeight
// Property redefinition: innerRect
//
//-----------------------------------------------------------------------------

class Window_SKAItemList extends Window_ItemList {
	constructor(rect) {
		super(rect);
		this._backgroundSprite = new Sprite();
		let image = TLB.Param.SKAUIB.itemwindow_bgimage;
		const bmp = ImageManager.loadMenu(image);
		this._backgroundSprite.bitmap = bmp;
		this.addChildAt(this._backgroundSprite, 0);
		this._contentBg = new Sprite();
		image = TLB.Param.SKAUIB.itemwindow_contentimage;
		let bitmap = ImageManager.loadMenu(image);
		this._contentBg.bitmap = bitmap;
		this._contentBg.move(5, -73);
		this._clientArea.addChildAt(this._contentBg, 0);
		image = TLB.Param.SKAUIB.arrowimage;
		bitmap = ImageManager.loadMenu(image);
		const arrowAnchor = { x: 0.5, y: 0.5 };
		this._downArrowSprite.bitmap = bitmap;
		this._downArrowSprite.anchor = arrowAnchor;
		this._downArrowSprite.move(817 / 2, 480);
		this._upArrowSprite.bitmap = bitmap;
		this._upArrowSprite.anchor = arrowAnchor;
		this._upArrowSprite.scale.y = -1;
		this._upArrowSprite.move(817 / 2, 5);
		this.opacity = 0;
		this.cursorVisible = false;
		this._contentsSprite.y += 15;
		this._additionalSprites = {};
		this.refresh();
	}

	createInnerSprite(key, spriteClass) {
		const dict = this._additionalSprites;
		if (dict[key]) {
			return dict[key];
		} else {
			const sprite = new spriteClass();
			dict[key] = sprite;
			this.addInnerChild(sprite);
			return sprite;
		}
	};

	removeInnerSprite(key) {
		const dict = this._additionalSprites;
		const sprite = dict[key];
		this._clientArea.removeChild(sprite);
		this._innerChildren.remove(sprite);
		delete dict[key];
		if (sprite) sprite.destroy();
	}

	includes(item) {
		const itemCategories = this.getItemCategories(item);
		const defaultInclude = itemCategories.filter(category => eval(category.showInMenu)).length == 0 && super.includes(item);
		if (defaultInclude) {
			return true;
		} else {
			const categories = itemCategories.map(category => category.symbol);
			return categories.includes(this._category);
		}
	}

	drawAllItems() {
		if (this._additionalSprites) {
			for (const key of Object.keys(this._additionalSprites)) {
				this.removeInnerSprite(key);
			}
		}
		super.drawAllItems();
	}

	drawItem(index) {
		const item = this.itemAt(index);
		if (item) {
			const rect = this.itemLineRect(index);
			const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
			this.changePaintOpacity(this.isEnabled(item));
			this.drawIcon(item.iconIndex, rect.x, iconY);
			this.contents.fontFace = "franklin-gothic-med";
			this.contents.fontSize = 18;
			this.drawText(item.name, rect.x + 39, rect.y, 278, this.lineHeight());
			this.drawText($gameParty.numItems(item), rect.x + 346, rect.y, 24, this.lineHeight(), "right");
			this.contents.fontFace = "franklin-gothic-demi";
			this.contents.fontSize = 14;
			this.drawText("x", rect.x + 335, rect.y - 1, 15, this.lineHeight());
			$gameParty._recordedItems = $gameParty._recordedItems || [];
			if (ConfigManager.showNewMarker && !$gameParty._recordedItems.includes(item.id)) {
				const key = "item%1-newmarker".format(item.id);
				const sprite = this.createInnerSprite(key, Sprite_NewMarker);
				sprite.move(rect.x + 1, rect.y + 25);
				sprite.show();
			}
			this.changePaintOpacity(1);
		}
	}

	drawItemBackground(index) {
		//
	}

	select(index) {
		const prevItem = this.item();
		if (prevItem) {
			$gameParty._recordedItems = $gameParty._recordedItems || [];
			if (!$gameParty._recordedItems.includes(prevItem.id)) $gameParty._recordedItems.push(prevItem.id);
			const key = "item%1-newmarker".format(prevItem.id);
			this.removeInnerSprite(key);
		}
		super.select(index);
		this.refresh();
	}

	hitIndex() {
		const touchPos = new Point(TouchInput.x, TouchInput.y);
		const localPos = this.worldTransform.applyInverse(touchPos);
		return this.hitTest(localPos.x, localPos.y - 15);
	}

	refreshCursor() {
		if (this.index() >= 0) {
			const rect = this.itemRect(this.index());
			rect.y += 15;
			this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
			this.cursorVisible = true;
		} else {
			this.setCursorRect(0, 0, 0, 0);
			this.cursorVisible = false;
		}
	}

	updateScrollBase(baseX, baseY) {
		const deltaX = baseX - this._scrollBaseX;
		const deltaY = baseY - this._scrollBaseY;
		this._contentBg.x -= deltaX;
		this._contentBg.y -= deltaY;
		if (deltaY > 44) { // scrolling more than 1 row, select last item
			this._contentBg.y = this.row() % 2 === 0 ? -117 : -73;
		} else if (this._contentBg.y <= -161 || this._contentBg.y >= 15) this._contentBg.y = -73;
		super.updateScrollBase(baseX, baseY);
	}

	itemPadding() {
		return 5;
	}

	_createCursorSprite() {
		this._cursorSprite = new Sprite();
		let image = TLB.Param.SKAUIB.itemwindow_cursorimage;
		let bmp = ImageManager.loadMenu(image);
		this._cursorSprite.bitmap = bmp;
		this._clientArea.addChild(this._cursorSprite);
	}

	_refreshCursor() {
		//
	}

	_refreshArrows() {
		//
	}

	_updateFilterArea() {
		const pos = this._clientArea.worldTransform.apply(new Point(0, 15));
		const filterArea = this._clientArea.filterArea;
		filterArea.x = pos.x + this.origin.x;
		filterArea.y = pos.y + this.origin.y;
		filterArea.width = this.innerWidth;
		filterArea.height = 440;
	}
}

Object.defineProperty(Window_SKAItemList.prototype, "innerHeight", {
    get: function() {
        return 440;
    },
    configurable: true
});

Object.defineProperty(Window_SKAItemList.prototype, "innerRect", {
    get: function() {
        return new Rectangle(
            17,
            27,
            this.innerWidth,
            440
        );
    },
    configurable: true
});

TLB.SKAUIItemMenu.Window_BattleItem_select = Window_BattleItem.prototype.select;
Window_BattleItem.prototype.select = function(index) {
	const prevItem = this.item();
	if (prevItem) {
		$gameParty._recordedItems = $gameParty._recordedItems || [];
		if (!$gameParty._recordedItems.includes(prevItem.id)) $gameParty._recordedItems.push(prevItem.id);
	}
	TLB.SKAUIItemMenu.Window_BattleItem_select.call(this, index);
};
