// Trilobytes - Star Knightess Aura Craft Menu/
// TLB_SKACraftMenu.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKACraftMenu = true;

window.TLB = window.TLB || {};
TLB.SKACraftMenu = TLB.SKACraftMenu || {};

/*:
 * @target MZ
 * @plugindesc This plugin modifies the crafting interface of Star
 * Knightess Aura to reflect the prototypes by Yoroiookami. It is a
 * commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the item selection interface
 * originally implemented for blessing consumable items into a full scene
 * to match a prototype specified by the client. It will not be compatible with
 * any other project.
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
 * @command openScene
 * @text Open Scene
 * @desc Opens the crafting scene.
 *
 * @arg itemList
 * @text Item List
 * @desc The list of craftable items.
 * @type struct<craftItem>[]
 *
 * @param craft_sound_effect
 * @text Craft Sound Effect
 * @type file
 * @dir audio/se/
 * @desc Sound effect that is played whenever an item is crafted
 *
 * @arg successSwitch
 * @text Success Switch
 * @desc The switch to turn on when crafting an item.
 * @type switch
 * @default 0
 *
 * @param item_window
 * @text Item Window
 *
 * @param item_window_bg
 * @parent item_window
 * @text Background
 * @desc Image to use for the item window background.
 * @type file
 * @dir img/menu/
 * @default Craft_Menu/CRAFT_MENU_ITEM_WINDOW
 *
 * @param item_window_select
 * @parent item_window
 * @text Item Window Select
 * @desc Filename of image to use for selection in the item window.
 * @type file
 * @dir img/menu/
 * @default Craft_Menu/CRAFT_MENU_ITEM_SELECT
 *
 * @param item_window_content
 * @parent item_window
 * @text Item Window Content
 * @desc Filename of image to use for content in the item window.
 * @type file
 * @dir img/menu/
 * @default Craft_Menu/CRAFT_MENU_ITEM_WINDOW_CONTENT
 *
 * @param itemWindowX
 * @parent item_window
 * @text X
 * @desc X coordinate of item window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -144
 *
 * @param itemWindowY
 * @parent item_window
 * @text Y
 * @desc Y coordinate of item window rect.
 * @type number
 * @default 14
 *
 * @param itemWindowWidth
 * @parent item_window
 * @text Width
 * @desc Width of item window rect.
 * @type number
 * @default 764
 *
 * @param itemWindowHeight
 * @parent item_window
 * @text Height
 * @desc Height of item window rect.
 * @type number
 * @default 496
 *
 * @param helpWindow
 * @text Help Window
 *
 * @param craftmenu_helpwindow_bgimage
 * @parent helpWindow
 * @text BG
 * @desc Filename of image to use for the help window background.
 * @type file
 * @dir img/menu/
 * @default Craft_Menu/CRAFT_MENU_HELP_BG_B
 *
 * @param helpWindowX
 * @parent helpWindow
 * @text X
 * @desc X coordinate of the help window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -148
 *
 * @param helpWindowY
 * @parent helpWindow
 * @text Y
 * @desc Y coordinate of the help window rect.
 * @type number
 * @default 0
 *
 * @param helpWindowWidth
 * @parent helpWindow
 * @text Width
 * @desc Width of the help window rect.
 * @default 773
 *
 * @param helpWindowHeight
 * @parent helpWindow
 * @text Height
 * @desc Height of the help window rect.
 * @default 192
 *
 * @param ingredientWindow
 * @text Ingredient Window
 *
 * @param ingredient_window_bg
 * @parent ingredientWindow
 * @text BG
 * @desc Filename of image to use for the ingredient window background.
 * @type file
 * @dir img/menu/
 * @default Craft_Menu/CRAFT_MENU_INGREDIENTS_WINDOW_BG_A
 *
 * @param ingredientWindowXOffset
 * @parent ingredientWindow
 * @text X Offset
 * @desc X offset from right side of item window.
 * @type number
 * @default 1
 *
 * @param ingredientWindowY
 * @parent ingredientWindow
 * @text Y
 * @desc Y coordinate of ingredient window rect.
 * @type number
 * @default 328
 *
 * @param ingredientWindowWidth
 * @parent ingredientWindow
 * @text Width
 * @desc Width of ingredient window rect.
 * @type number
 * @default 382
 *
 * @param ingredientWindowHeight
 * @parent ingredientWindow
 * @text Height
 * @desc Height of ingredient window rect.
 * @type number
 * @default 370
 *
 * @param numberWindow
 * @text Number Window
 *
 * @param craft_number_bg
 * @parent numberWindow
 * @text Craft Number BG
 * @desc Filename of image to use for the number window background.
 * @type file
 * @dir img/menu/
 * @default Craft_Menu/CRAFT_MENU_ITEM_ALT_WINDOW
 *
 * @param numberWindowX
 * @parent numberWindow
 * @text X
 * @desc X coordinate of number window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -144
 *
 * @param numberWindowY
 * @parent numberWindow
 * @text Y
 * @desc Y coordinate of number window rect.
 * @type number
 * @default 14
 *
 * @param numberWindowWidth
 * @parent numberWindow
 * @text Width
 * @desc Width of number window rect.
 * @type number
 * @default 764
 *
 * @param numberWindowHeight
 * @parent numberWindow
 * @text Height
 * @desc Height of number window rect.
 * @type number
 * @default 496
 *
 * @param stockWindow
 * @text Stock Window
 *
 * @param craftmenu_stockwindow_bgimage
 * @parent stockWindow
 * @text BG
 * @desc Filename of image to use for the stock window background.
 * @type file
 * @dir img/menu/
 * @default Craft_Menu/CRAFT_MENU_STOCK_WINDOW
 *
 * @param craftmenu_stockwindow_arrow
 * @parent stockWindow
 * @text Arrow
 * @desc Filename of image to use for the stock window arrow.
 * @type file
 * @dir img/menu/
 * @default Craft_Menu/CRAFT_MENU_DAMAGE_ARROW
 *
 * @param stockWindowXOffset
 * @parent stockWindow
 * @text X Offset
 * @desc X offset from right side of item window.
 * @type number
 * @default 1
 *
 * @param stockWindowY
 * @parent stockWindow
 * @text Y
 * @desc Y coordinate of stock window rect.
 * @type number
 * @default 236
 *
 * @param stockWindowWidth
 * @parent stockWindow
 * @text Width
 * @desc Width of stock window rect.
 * @type number
 * @default 382
 *
 * @param stockWindowHeight
 * @parent stockWindow
 * @text Height
 * @desc Height of stock window rect.
 * @type number
 * @default 89
 *
 */
/*~struct~craftItem:
 *
 * @param targetItemId
 * @text Target Item ID
 * @desc The item that will be crafted.
 * @type item
 *
 * @param quantity
 * @text Quantity
 * @desc The number that will be crafted per set of ingredients.
 * @type number
 * @min 1
 * @max 99
 *
 * @param craftMax
 * @text Maximum Craftable
 * @desc The maximum number of the item that can be crafted at once (0 for no max)
 * @type number
 * @min 0
 * @max 99
 * @default 0
 *
 * @param ingredients
 * @text Ingredients
 * @desc The ingredients required to craft the item.
 * @type struct<ingredient>[]
 *
 * @param showCondition
 * @text Show Condition
 * @desc The condition for showing the item in the list.
 *
 * @param stockVar
 * @text Stock Variable
 * @desc The variable that holds the stock of the target item.
 * @type variable
 *
 * @param efficiencyVar
 * @text Efficiency Variable
 * @desc The variable that will increase the efficiency of the craft.
 * @type variable
 * @default 0
 *
 */
/*~struct~ingredient:
 *
 * @param itemId
 * @text Item ID
 * @desc The item used as an ingredient.
 * @type item
 *
 * @param quantity
 * @text Quantity
 * @desc The number of the item required per craft.
 * @type number
 * @min 1
 * @max 99
 *
 */

//----------------------------------------------------------------------------
//
// Parameter conversion
//
//----------------------------------------------------------------------------

window.parameters = PluginManager.parameters('TLB_SKACraftMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKACM = TLB.Param.SKACM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKACM);

PluginManager.registerCommand("TLB_SKACraftMenu", "openScene", args => {
	$gameTemp._craftItems = [];
	$gameTemp._successSwitch = parseInt(args.successSwitch);
	const parsedList = JSON.parse(args.itemList);
	TLB.SKABase.parseParameters(parsedList, $gameTemp._craftItems);
	SceneManager.push(Scene_Craft);
});

class Scene_Craft extends Scene_MenuBase {
	create() {
		super.create();
		this.drawMerchant();
		this.createItemWindow();
		this.createNumberWindow();
		this.createHelpWindow();
		this.createStockWindow();
		this.createIngredientWindow();
		this._itemWindow.setHelpWindow(this._helpWindow);
		this._helpWindow.y = this._itemWindow.y + this._itemWindow.height + 6;
		this._itemWindow.activate();
	}

	drawMerchant() {
		if ($gameTemp._merchantImage) {
			this._shadowSprite = new Sprite();
			this._shadowSprite.move(Graphics.boxWidth + 60 + ($gameTemp._merchantXOffset || 0), 0 + ($gameTemp._merchantYOffset || 0));
			this.addChildAt(this._shadowSprite, 5);
			const container = new PIXI.Container();
			const silhouette = new Sprite();
			silhouette.bitmap = ImageManager.loadPortrait($gameTemp._merchantImage);
			container.addChild(silhouette);
			silhouette.filters = [new PIXI.filters.ColorOverlayFilter([1, 1, 1])];
			this._shadowSprite.bitmap = new Bitmap(silhouette.width, 350);
			this._shadowSprite.bitmap.gradientFillRect(0, 0, silhouette.width, silhouette.height, "#4a4a60", "#2f2f3e", true)
			const texture = Graphics.app.renderer.generateTexture(container);
			const mask = new PIXI.Sprite(texture);
			this._shadowSprite.addChild(mask);
			this._shadowSprite.mask = mask;
			delete $gameTemp._merchantImage;
			delete $gameTemp._merchantXOffset;
			delete $gameTemp._merchantYOffset;
		}
	};

	createHelpWindow() {
		const rect = this.helpWindowRect();
		this._helpWindow = new Window_SKACraftHelp(rect);
		this.addWindow(this._helpWindow);
	}

	helpWindowRect() {
		const params = TLB.Param.SKACM;
		const wx = params.helpWindowX;
		const wy = params.helpWindowY;
		const ww = params.helpWindowWidth;
		const wh = params.helpWindowHeight;
		return new Rectangle(wx, wy, ww, wh);
	}

	createNumberWindow() {
		const rect = this.numberWindowRect();
		this._numberWindow = new Window_CraftNumber(rect);
		this._numberWindow.hide();
		this._numberWindow.setHandler("ok", this.onNumberOk.bind(this));
		this._numberWindow.setHandler("cancel", this.onNumberCancel.bind(this));
		this.addWindow(this._numberWindow);
	};

	numberWindowRect = function() {
		const params = TLB.Param.SKACM;
		const wx = params.numberWindowX;
		const wy = params.numberWindowY;
		const ww = params.numberWindowWidth;
		const wh = params.numberWindowHeight;
		return new Rectangle(wx, wy, ww, wh);
	};

	createItemWindow() {
		const rect = this.itemWindowRect();
		this._itemWindow = new Window_CraftItemList(rect);
		this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
		this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
		this.addWindow(this._itemWindow)
	};

	itemWindowRect() {
		const params = TLB.Param.SKACM;
		const wx = params.itemWindowX;
		const wy = params.itemWindowY;
		const ww = params.itemWindowWidth;
		const wh = params.itemWindowHeight;
		return new Rectangle(wx, wy, ww, wh);
	}

	createStockWindow() {
		const rect = this.stockWindowRect();
		this._stockWindow = new Window_CraftStock(rect);
		this._numberWindow.setStockWindow(this._stockWindow);
		this.addWindow(this._stockWindow);
	}

	stockWindowRect() {
		const params = TLB.Param.SKACM;
		const wx = this._itemWindow.x + this._itemWindow.width + params.stockWindowXOffset;
		const wy = params.stockWindowY;
		const ww = params.stockWindowWidth;
		const wh = params.stockWindowHeight;
		return new Rectangle(wx, wy, ww, wh);
	}

	createIngredientWindow() {
		const rect = this.ingredientWindowRect();
		this._ingredientWindow = new Window_CraftIngredients(rect);
		this._itemWindow.setIngredientWindow(this._ingredientWindow);
		this.addWindow(this._ingredientWindow)
	}

	ingredientWindowRect() {
		const params = TLB.Param.SKACM;
		const wx = this._itemWindow.x + this._itemWindow.width + params.ingredientWindowXOffset;
		const wy = params.ingredientWindowY;
		const ww = params.ingredientWindowWidth;
		const wh = params.ingredientWindowHeight;
		return new Rectangle(wx, wy, ww, wh);
	}

	onItemOk() {
		const item = this._itemWindow.item();
		const itemObj = this._itemWindow.itemObject();
		this._itemWindow.hide();
		this._numberWindow.setStockVar(item.stockVar);
		const numberPerCraft = item.quantity + Math.max(0, $gameVariables.value(item.efficiencyVar) - item.quantity);
		this._numberWindow.setNumberPerCraft(numberPerCraft);
		this._numberWindow.setup(itemObj, this.maxCraft(), 0);
		this._numberWindow.show();
		this._numberWindow.activate();
		this._stockWindow.show();
		this._helpWindow.setItem(itemObj);
	}

	onItemCancel() {
		this.popScene();
	}

	onNumberOk() {
		const params = TLB.Param.SKACM;
		const sound = { name: params.craft_sound_effect, volume: 90, pitch: 100 };
		AudioManager.playStaticSe(sound);
		const number = this._numberWindow.number();
		const item = this._itemWindow.item();
		this.removeIngredients(item, number);
		this.increaseStock(item, number);
		if ($gameTemp._successSwitch) $gameSwitches.setValue($gameTemp._successSwitch, true);
		this.endNumberInput();
	}

	removeIngredients(item, number) {
		for (const ingredient of item.ingredients) {
			$gameParty.loseItem($dataItems[ingredient.itemId], ingredient.quantity * number);
		}
	}

	increaseStock(item, number) {
		const stockVar = item.stockVar;
		const currentStock = $gameVariables.value(stockVar);
		const numberPerCraft = item.quantity + Math.max(0, $gameVariables.value(item.efficiencyVar) - item.quantity);
		const addedStock = numberPerCraft * number;
		$gameVariables.setValue(stockVar, currentStock + addedStock);
	}

	onNumberCancel() {
		SoundManager.playCancel();
		this.endNumberInput();
	}

	endNumberInput() {
		this._numberWindow.hide();
		this._stockWindow.hide();
		this._itemWindow.refresh();
		this._itemWindow.show();
		this._itemWindow.activate();
	}

	maxCraft() {
		const item = this._itemWindow.item();
		if (item.craftMax) {
			return parseInt(item.craftMax);
		}
		return Math.min(...this._itemWindow.item().ingredients.map(ingredient => Math.floor($gameParty.numItems($dataItems[ingredient.itemId]) / ingredient.quantity)));
	}
}

class Window_SKACraftHelp extends Window_SKAHelp {
	constructor(rect) {
		super(rect);
		this.children[0].bitmap = ImageManager.loadMenu(TLB.Param.SKACM.craftmenu_helpwindow_bgimage);
		this.children[0].x -= 5;
		this.children[0].children[0].x -= 44;
		this.children[0].children[0].y -= 1;
		this.opacity = 0;
	}

	setItem(item) {
		super.setItem(item);
		const y = 116;
		this.contents.clearRect(669, y, 90, this.lineHeight());
		if (item) {
			this.drawGradientText(TLB.SKABase.itemPriceAsString(item), ["#ab8845", "#d8b976", "#ab8745"], 620, y, 90, "right", { outlineThickness: 2, outlineGradient: ["#4f4f4f", "#000000"], dropShadow: true, dropShadowX: 0, dropShadowY: 2, shadowOpacity: 0.75 });
		}
	}
}

class Window_CraftItemList extends Window_Selectable {
	constructor(rect) {
		super(rect);
		const params = TLB.Param.SKACM;
		this._backgroundSprite = new Sprite();
		let image = params.item_window_bg;
		const bmp = ImageManager.loadMenu(image);
		this._backgroundSprite.bitmap = bmp;
		this.addChildAt(this._backgroundSprite, 0);
		const textSprite = new Sprite();
		textSprite.move(1, 32);
		textSprite.bitmap = new Bitmap(730, 44);
		textSprite.bitmap.fontFace = 'franklin-gothic-demi-cond';
		textSprite.bitmap.fontSize = 20;
		textSprite.bitmap.drawText("CRAFTABLE ITEMS", 0, 0, 550, this.lineHeight(), "center");
		textSprite.bitmap.drawText("STOCK", 564, 0, 90, this.lineHeight(), "center");
		textSprite.bitmap.drawText("OWNED", 656, 0, 90, this.lineHeight(), "center");
		this._backgroundSprite.addChild(textSprite);
		this._contentBg = new Sprite();
		image = params.item_window_content;
		let bitmap = ImageManager.loadMenu(image);
		this._contentBg.bitmap = bitmap;
		this._contentBg.move(5, -30);
		this._clientArea.addChildAt(this._contentBg, 0);
		const arrowAnchor = { x: 0.5, y: 0.5 };
		image = TLB.Param.SKAUIB.arrowimage;
		bitmap = ImageManager.loadMenu(image);
		this._downArrowSprite.bitmap = bitmap;
		this._downArrowSprite.anchor = arrowAnchor;
		this._downArrowSprite.move(764 / 2, 486);
		this._upArrowSprite.bitmap = bitmap;
		this._upArrowSprite.anchor = arrowAnchor;
		this._upArrowSprite.scale.y = -1;
		this._upArrowSprite.move(764 / 2, 5);
		this.opacity = 0;
		this.cursorVisible = false;
		this._contentsSprite.x += 7;
		this._contentsSprite.y += 58;
		this._ingredientWindow = null;
		this.refresh();
		this.select(0);
	}

	maxItems() {
		return this._data ? this._data.length : 1;
	}

	item() {
		return this.itemAt(this.index());
	}

	itemObject() {
		return $dataItems?.[this.item()?.targetItemId];
	}

	itemAt(index) {
		return this._data && index >= 0 ? this._data[index] : null;
	}

	isEnabled(item) {
		return this.hasAllIngredients(item);
	}

	isCurrentItemEnabled() {
		return this.isEnabled(this.item());
	}

	hasAllIngredients(item) {
		return item?.ingredients.every(ingredient => $gameParty.numItems($dataItems[ingredient.itemId]) >= ingredient.quantity)
	}

	refresh() {
		this.makeItemList();
		Window_Selectable.prototype.refresh.call(this);
	}

	updateHelp() {
		this.setHelpWindowItem(this.itemObject());
		if (this._ingredientWindow) this.setIngredientWindowItem(this.item());
	}

	setIngredientWindow(win) {
		this._ingredientWindow = win;
	}

	setIngredientWindowItem(item) {
		this._ingredientWindow.setItem(item);
	}

	makeItemList() {
		this._data = [];
		for (const item of $gameTemp._craftItems) {
			if (item) {
				if (!item.showCondition || eval(item.showCondition)) this._data.push(item);
			}
		}
	}

	drawItem(index) {
		const item = this.itemAt(index);
		const itemObj = $dataItems[item.targetItemId];
		const rect = this.itemLineRect(index);
		this.changePaintOpacity(this.isEnabled(item));
		this.contents.fontFace = "franklin-gothic-med";
		this.contents.fontSize = 18;
		this.drawItemName(itemObj, rect.x, rect.y, rect.width);
		this.changePaintOpacity(true);
		this.drawItemStock(item, rect.x + 540, rect.y, 90);
		this.drawItemOwned(itemObj, rect.x + 630, rect.y, 90);
	}

	drawItemStock(item, x, y, width) {
		this.drawText($gameVariables.value(item.stockVar), x, y, width, "center");
	}

	drawItemOwned(item, x, y, width) {
		this.drawText($gameParty.numItems(item), x, y, width, "center");
	}

	maxCols() {
		return 1;
	}

	includes(item) {
		return true;
	}

	drawItemBackground(index) {
		//
	}

	refreshCursor() {
		if (this.index() >= 0) {
			const rect = this.itemRect(this.index());
			rect.x += 2;
			rect.y += 58;
			this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
			this.cursorVisible = true;
		} else {
			this.setCursorRect(0, 0, 0, 0);
			this.cursorVisible = false;
		}
	}

	hitIndex() {
		const touchPos = new Point(TouchInput.x, TouchInput.y);
		const localPos = this.worldTransform.applyInverse(touchPos);
		return this.hitTest(localPos.x, localPos.y - 58);
	}

	updateScrollBase(baseX, baseY) {
		const deltaX = baseX - this._scrollBaseX;
		const deltaY = baseY - this._scrollBaseY;
		this._contentBg.x -= deltaX;
		this._contentBg.y -= deltaY;
		if (deltaY > 44) { // scrolling more than 1 row, select last item
			this._contentBg.y = this.row() % 2 === 0 ? -74 : -30;
		} else if (this._contentBg.y <= -118 || this._contentBg.y >= 58) this._contentBg.y = -30;
		Window_Selectable.prototype.updateScrollBase.call(this, baseX, baseY);
	}

	itemPadding() {
		return 5;
	}

	_createCursorSprite() {
		this._cursorSprite = new Sprite();
		let image = TLB.Param.SKACM.item_window_select;
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
		const pos = this._clientArea.worldTransform.apply(new Point(0, 58));
		const filterArea = this._clientArea.filterArea;
		filterArea.x = pos.x + this.origin.x;
		filterArea.y = pos.y + this.origin.y;
		filterArea.width = this.innerWidth;
		filterArea.height = 396;
	}
}

Object.defineProperty(Window_CraftItemList.prototype, "innerHeight", {
	get: function() {
		return 396;
	},
	configurable: true
});

Object.defineProperty(Window_CraftItemList.prototype, "innerRect", {
	get: function() {
		return new Rectangle(
			0,
			6,
			this.innerWidth + 20,
			420
		);
	},
	configurable: true
});

class Window_CraftIngredients extends Window_Selectable {
	constructor(rect) {
		super(rect);
		this._backgroundSprite = new Sprite();
		let image = TLB.Param.SKACM.ingredient_window_bg;
		const bmp = ImageManager.loadMenu(image);
		this._backgroundSprite.bitmap = bmp;
		this.addChildAt(this._backgroundSprite, 0);
		this.opacity = 0;
		this._item = null;
	}

	setItem(item) {
		this._item = item;
		this.refresh();
	}

	hasIngredient(item, quantity) {
		return $gameParty.numItems(item) >= quantity;
	}

	refresh() {
		this.contents.clear();
		this.contents.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = 20;
		this.drawText("REQUIRED INGREDIENTS", 7, 13, 256, "center");
		this.drawText("AMOUNT", 263, 13, 90, "center");
		this.drawText("QUANTITY PER RECIPE", 7, 305, 256, "center");
		if (this._item) {
			this.drawText(this._item.quantity + Math.max(0, $gameVariables.value(this._item.efficiencyVar) - this._item.quantity), 263, 305, 90, "center");
			this.contents.fontFace = 'franklin-gothic-med';
			this.contents.fontSize = 18;
			for (const index in this._item.ingredients) {
				const ingredient = this._item.ingredients[index];
				const rect = this.itemRect(index);
				rect.x += 11;
				rect.y += 58;
				const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
				const item = $dataItems[ingredient.itemId];
				const enabled = this.hasIngredient(item, ingredient.quantity);
				this.changePaintOpacity(enabled);
				this.drawIcon(item.iconIndex, rect.x, iconY);
				this.drawText(item.name, rect.x + 39, rect.y, 206, "left");
				const bracket = "(";
				const numberHeld = `${$gameParty.numItems(item)}`;
				const quantityText = `/${ingredient.quantity})`;
				const fullText = bracket + numberHeld + quantityText;
				const fullLength = this.textWidth(fullText);
				let x = rect.x + 245 - fullLength / 2;
				let width = 90;
				this.drawText(bracket, x, rect.y, width, "center");
				width += this.textWidth(bracket + numberHeld);
				if (!enabled) this.changeTextColor("#ea8b72");
				this.drawText(numberHeld, x, rect.y, width, "center");
				width += this.textWidth(fullText);
				this.changeTextColor(ColorManager.normalColor());
				this.drawText(quantityText, x, rect.y, width, "center");
				this.changePaintOpacity(true);
			}
		}
	}
}

class Window_CraftStock extends Window_Base {
	constructor(rect) {
		super(rect);
		this._backgroundSprite = new Sprite();
		let image = TLB.Param.SKACM.craftmenu_stockwindow_bgimage;
		const bmp = ImageManager.loadMenu(image);
		this._backgroundSprite.bitmap = bmp;
		this.addChildAt(this._backgroundSprite, 0);
		this.opacity = 0;
		this._stock = 0;
		this._numberPerCraft = 0;
		this._numberCrafted = 0;
		this.hide();
	}

	setup(stock, numberPerCraft, numberCrafted) {
		this._stock = stock;
		this._numberPerCraft = numberPerCraft;
		this._numberCrafted = numberCrafted;
		this.refresh();
	}

	refresh() {
		this.contents.clear();
		this.contents.fontFace = 'franklin-gothic-demi';
		this.contents.fontSize = 14;
		this.drawText("x", 20, 8, 20, "left");
		this.drawText("x", 140, 8, 20, "left");
		this.contents.fontFace = 'franklin-gothic-med';
		this.drawText("STOCK", 20, 27, 50, "left");
		this.drawText("STOCK", 140, 27, 50, "left");
		const arrow = ImageManager.loadMenu(TLB.Param.SKACM.craftmenu_stockwindow_arrow);
		arrow.addLoadListener(() => this.contents.blt(arrow, 0, 0, 32, 33, 83, 21));
		this.contents.fontSize = 18;
		this.drawText(this._stock, 33, 8, 36, "left");
		const newStock = this._stock + this._numberPerCraft * this._numberCrafted;
		this.drawText(newStock, 153, 8, 36, "left");
	}
}

class Window_CraftNumber extends Window_ShopNumber {
	constructor(rect) {
		super(rect);
		this._stockVar = null;
		this._numberPerCraft = 0;
		this._stockWindow = null;
		this._backgroundSprite.bitmap = ImageManager.loadMenu(TLB.Param.SKACM.craft_number_bg);
	}

	refresh() {
		Window_Selectable.prototype.refresh.call(this);
		this.contents.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = 20;
		this.drawText("ITEM", 238, 153, 360, this.lineHeight(), "center");
		this.drawText("STOCK", 523, 153, 90, this.lineHeight(), "center");
		this.drawCurrentItemName();
		const stock = $gameVariables.value(this._stockVar);
		this.drawText(stock, 540, this.itemNameY() + 19, 50, "left");
		this.contents.fontFace = "franklin-gothic-demi";
		this.contents.fontSize = 14;
		this.drawText("x", 528, this.itemNameY() + 18, 10);
		this.drawNumber();
		if (this._stockWindow) this._stockWindow.setup(stock, this._numberPerCraft, this._number);
	}

	setStockWindow(win) {
		this._stockWindow = win;
	}

	placeButtons() {
		const sp = this.buttonSpacing();
		const totalWidth = this.totalButtonWidth();
		let x = (this.innerWidth - totalWidth) / 2 - 45;
		for (const button of this._buttons) {
			button.x = x;
			button.y = this.buttonY();
			x += button.width + sp;
		}
	}

	cursorX() {
		const padding = this.itemPadding();
		return this.innerWidth - this.cursorWidth() - padding * 2 - 200;
	};

	buttonY() {
		return 244;
	}

	drawCurrentItemName() {
		const padding = this.itemPadding();
		const x = padding * 2 + 101;
		const y = this.itemNameY() + 19;
		const width = this.multiplicationSignX() - padding * 3 - 100;
		this.drawItemName(this._item, x, y, width);
	}

	setStockVar(stockVar) {
		this._stockVar = stockVar;
	}

	setNumberPerCraft(num) {
		this._numberPerCraft = num;
	}
}

if (!PluginManagerEx.isExistPlugin("TLB_SKAShop")) {
	Window_CraftNumber.prototype.initialize = function(rect) {
		Window_ShopNumber.prototype.initialize.call(this, rect);
		this._stockVar = null;
		this._numberPerCraft = 0;
		this._stockWindow = null;
		this._backgroundSprite = new Sprite();
		let image = TLB.Param.SKACM.craft_number_bg;
		const bmp = ImageManager.loadMenu(image);
		this._backgroundSprite.bitmap = bmp;
		this.addChildAt(this._backgroundSprite, 0);
		this.opacity = 0;
	};

	Window_CraftNumber.prototype.drawNumber = function() {
		const x = this.cursorX() - 35;
		const y = this.buttonY() + 4;
		const width = this.cursorWidth() - this.itemPadding();
		this.resetTextColor();
		this.contents.fontFace = 'franklin-gothic-demi';
		this.contents.fontSize = 14;
		this.drawText("x", x, y, width, "right");
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 18;
		this.drawText(this._number, x + 26, y + 1, width, "right");
	};

	Window_CraftNumber.prototype.itemRect = function() {
		const rect = new Rectangle();
		rect.x = this.cursorX() - 20;
		rect.y = this.buttonY() + 4;
		rect.width = this.cursorWidth() + 15;
		rect.height = this.lineHeight();
		return rect;
	};

	Window_CraftNumber.prototype.itemNameY = function() {
		return Math.floor(this.innerHeight / 2 - this.lineHeight() * 1.5) - 2;
	};

	Window_CraftNumber.prototype.totalPriceY = function() {
		return this.itemNameY();
	};
}
