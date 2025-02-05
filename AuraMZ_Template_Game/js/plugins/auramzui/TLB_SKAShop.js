// Trilobytes - Star Knightess Aura Shop/
// TLB_SKAShop.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAShop = true;

window.TLB = window.TLB || {};
TLB.SKAShop = TLB.SKAShop || {};

/*:
 * @target MZ
 * @base TLB_GradientTextExtensions
 * @plugindesc This plugin modifies the shop scene of Star Knightess
 * Aura to reflect the prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the base Scene_Shop to match a
 * prototype specified by the client. It will not be compatible with any other
 * project.
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
 * Copyright 2022 Auradev
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
 * @command merchant_setup
 * @text Merchant Setup
 * @desc Set up merchant info for a shop.
 *
 * @arg merchant_image
 * @text Merchant Image
 * @type file
 * @dir img/portraits/
 *
 * @arg merchant_xoffset
 * @text Merchant X Offset
 * @desc X coordinate offset for the image.
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @arg merchant_yoffset
 * @text Merchant Y Offset
 * @desc Y coordinate offset for the image.
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @command item_setup
 * @text Item Setup
 * @desc Set up item info for a shop.
 *
 * @arg itemId
 * @text Item ID
 * @desc ID of the item to create data for.
 * @type item
 *
 * @arg percentageFormula
 * @text Percentage Formula
 * @desc The formula to use for the bar percentage.
 *
 * @arg restockText
 * @text Restock Text
 * @desc The text to show underneath the stock bar.
 *
 * @param command_window
 * @text Command Window
 *
 * @param command_window_bg
 * @parent command_window
 * @text Background
 * @desc Image to use for the command window background.
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_BUY_AND_SELL_WINDOW
 *
 * @param command_window_cursor
 * @parent command_window
 * @text Cursor Image
 * @desc Image to use for the command window cursor.
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_BUY_AND_SELL_SELECT
 *
 * @param commandWindowX
 * @parent command_window
 * @text X
 * @desc X coordinate of command window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -144
 *
 * @param commandWindowY
 * @parent command_window
 * @text Y
 * @desc Y coordinate of command window rect.
 * @type number
 * @default 0
 *
 * @param commandWindowWidth
 * @parent command_window
 * @text Width
 * @desc Width of command window rect.
 * @type number
 * @default 329
 *
 * @param commandWindowHeight
 * @parent command_window
 * @text Height
 * @desc Height of command window rect.
 * @type number
 * @default 81
 *
 * @param categoryWindow
 * @text Category Window
 *
 * @param categoryWindowXOffset
 * @parent categoryWindow
 * @text X Offset
 * @desc X offset from left side of command window.
 * @type number
 * @default 220
 *
 * @param categoryWindowYOffset
 * @parent categoryWindow
 * @text Y Offset
 * @desc Y offset from bottom of command window.
 * @type number
 * @min -9999
 * @max 9999
 * @default -10
 *
 * @param categoryWindowWidth
 * @parent categoryWindow
 * @text Width
 * @desc Width of category window rect.
 * @type number
 * @default 363
 *
 * @param categoryWindowLines
 * @parent categoryWindow
 * @text Max Lines
 * @desc Number of lines window can show.
 * @type number
 * @default 10
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
 * @default Shop_Menu/SHOP_MENU_ITEM_WINDOW
 *
 * @param item_window_bg_greed
 * @parent item_window
 * @text Background with Eyes of Greed
 * @desc Image to use for the item window background if eyes of greed curse is active
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_ITEM_WINDOW_GREED
 *
 * @param item_window_content
 * @parent item_window
 * @text Content
 * @desc Image to use for item window content background.
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_ITEM_CONTENT
 *
 * @param item_window_select
 * @parent item_window
 * @text Cursor
 * @desc Image to use for item window cursor.
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_ITEM_SELECT
 *
 * @param numberWindow
 * @text Number Window
 *
 * @param item_number_bg
 * @parent numberWindow
 * @text BG
 * @desc Image to use for the item number background.
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_ITEM_ALT_WINDOW
 *
 * @param numberWindowX
 * @parent numberWindow
 * @text X
 * @desc X coordinate of number window rect.
 * @type number
 * @default 0
 *
 * @param numberWindowWidth
 * @parent numberWindow
 * @text Width
 * @desc Width of number window rect.
 * @type number
 * @default 523
 *
 * @param numberWindowHeight
 * @parent numberWindow
 * @text Height
 * @desc Height of number window rect.
 * @type number
 * @default 494
 *
 * @param gold_window
 * @text Gold Window
 *
 * @param gold_window_bg
 * @parent gold_window
 * @text Background
 * @desc Image to use for the gold window background.
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_GOLD_WINDOW
 *
 * @param goldWindowX
 * @parent gold_window
 * @text X
 * @desc X coordinate of gold window rect.
 * @type number
 * @default 710
 *
 * @param goldWindowY
 * @parent gold_window
 * @text Y
 * @desc Y coordinate of gold window rect.
 * @type number
 * @default 328
 *
 * @param goldWindowWidth
 * @parent gold_window
 * @text Width
 * @desc Width of gold window rect.
 * @type number
 * @default 338
 *
 * @param goldWindowHeight
 * @parent gold_window
 * @text Height
 * @desc Height of gold window rect.
 * @type number
 * @default 88
 *
 * @param restock_window
 * @text Restock Window
 *
 * @param restock_window_bg
 * @parent restock_window
 * @text Background
 * @desc Image to use for restock window background.
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_STOCK_WINDOW
 *
 * @param restock_gauge
 * @parent restock_window
 * @text Restock Gauge
 *
 * @param restock_gauge_frame
 * @parent restock_gauge
 * @text Frame
 * @desc Image to use for restock gauge frame.
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_STOCK_BAR_FRAME
 *
 * @param restockWindowXOffset
 * @parent restock_window
 * @text X Offset
 * @desc X offset from left side of the gold window.
 * @type number
 * @min -9999
 * @max 9999
 * @default -50
 *
 * @param restockWindowY
 * @parent restock_window
 * @text Y
 * @desc Y coordinate of restock window rect.
 * @type number
 * @default 416
 *
 * @param restockWindowWidth
 * @parent restock_window
 * @text Width
 * @desc Width of restock window rect.
 * @type number
 * @default 338
 *
 * @param restockWindowHeight
 * @parent restock_window
 * @text Height
 * @desc Height of restock window rect.
 * @type number
 * @default 95
 *
 * @param helpWindow
 * @text Help Window
 *
 * @param helpWindowX
 * @parent helpWindow
 * @text X
 * @desc X coordinate of the help window rect.
 * @type number
 * @default 186
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
 * @default 815
 *
 * @param helpWindowHeight
 * @parent helpWindow
 * @text Height
 * @desc Height of the help window rect.
 * @default 180
 *
 */

 //----------------------------------------------------------------------------
 //
 // Parameter conversion
 //
 //----------------------------------------------------------------------------

window.parameters = PluginManager.parameters('TLB_SKAShop');
TLB.Param = TLB.Param || {};
TLB.Param.SKASH = TLB.Param.SKASH || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKASH);

PluginManager.registerCommand("TLB_SKAShop", "merchant_setup", args => {
	const merchantImage = args.merchant_image;
	const merchantXOffset = parseInt(args.merchant_xoffset);
    const merchantYOffset = parseInt(args.merchant_yoffset);

	if (merchantImage.length > 0) {
        $gameTemp._merchantImage = merchantImage;
        ImageManager.loadPortrait($gameTemp._merchantImage);
    }
	$gameTemp._merchantXOffset = merchantXOffset || 0;
    $gameTemp._merchantYOffset = merchantYOffset || 0;
});

PluginManager.registerCommand("TLB_SKAShop", "item_setup", args => {
    const id = parseInt(args.itemId);
    if (id) {
        $gameTemp._stockData = $gameTemp._stockData || {};
        $gameTemp._stockData[id] = {};
        $gameTemp._stockData[id]._restockText = args.restockText;
        try {
            $gameTemp._stockData[id]._percentageFormula = eval(args.percentageFormula);
        } catch (e) {
            $gameTemp._stockData[id]._percentageFormula = args.percentageFormula;
        }
    }
});

TLB.SKAShop.Scene_Shop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.drawMerchant();
    this.createGoldWindow();
    this.createCommandWindow();
    this.createDummyWindow();
    this.createNumberWindow();
    this.createStatusWindow();
    this.createBuyWindow();
    this.createCategoryWindow();
    this.createSellWindow();
    this.createHelpWindow();
    this.drawAura();
    this._buyWindow.x = this._sellWindow.x = this._numberWindow.x = this._dummyWindow.x = this._commandWindow.x + this._commandWindow.width + 1;
    this._buyWindow.y = this._sellWindow.y = this._numberWindow.y = this._dummyWindow.y = this._commandWindow.y - 3;
    this._helpWindow.y = this._dummyWindow.y + this._dummyWindow.height + 4;
    this._statusWindow.x += 50;
    this._commandWindow.setCategoryWindow(this._categoryWindow);
    this._categoryWindow.setHelpWindow(this._helpWindow);
	this._buyWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.setHelpWindow(this._helpWindow);
    SceneManager._scene._buyWindow.setMoney($gameParty.gold());
    if (this._categoryWindow._list.length === 1) {
        SceneManager._scene._buyWindow.setCategory(this._categoryWindow._list[0].symbol);
        SceneManager._scene._buyWindow.show();
        SceneManager._scene._buyWindow.select(-1);
    }
    TLB.SKAUIBase.loadImages([TLB.Param.SKAUIB.categorywindow_bgimage]);
};

TLB.SKAShop.Scene_Shop_terminate = Scene_Shop.prototype.terminate;
Scene_Shop.prototype.terminate = function() {
    TLB.SKAShop.Scene_Shop_terminate.call(this);
    delete $gameTemp._stockData;
}

Scene_Shop.prototype.drawMerchant = function() {
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

Scene_Shop.prototype.drawAura = function() {
    this._bust = new Sprite();
    this._bust.scale.x = -1;
    this._bust.move(Graphics.width - 38, 252);
    this.addChild(this._bust);
	let image = null;
    const actor = $gameParty.leader();
	if (actor._portraitName) image = actor._portraitName;
	else if (actor.actor().portraitName) image = actor.actor().portraitName;
	if (image)  {
		const source = ImageManager.loadPortrait(image);
		const sourceX = 30;
		const sourceY = 0;
		const width = 156;
		const height = 168;
		this._bust.bitmap = new Bitmap(width, height);
		this._bust.bitmap.blt(source, sourceX, sourceY, 290, 315, 0, 0, width, height);
	}
};

Scene_Shop.prototype.createHelpWindow = function() {
	const rect = this.helpWindowRect();
	this._helpWindow = new Window_SKAHelp(rect);
	this.addWindow(this._helpWindow);
};

Scene_Shop.prototype.helpWindowRect = function() {
	const params = TLB.Param.SKASH;
	const wx = params.helpWindowX;
	const wy = params.helpWindowY;
	const ww = params.helpWindowWidth;
	const wh = params.helpWindowHeight;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.createGoldWindow = function() {
    const rect = this.goldWindowRect();
    this._goldWindow = new Window_SKAShopGold(rect);
    this.addWindow(this._goldWindow);
};

Scene_Shop.prototype.goldWindowRect = function() {
	const params = TLB.Param.SKASH;
	const wx = params.goldWindowX;
    const wy = params.goldWindowY;
    const ww = params.goldWindowWidth;
    const wh = params.goldWindowHeight;
    return new Rectangle(wx, wy, ww, wh);
};

TLB.SKAShop.Scene_Shop_createCommandWindow = Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function() {
    TLB.SKAShop.Scene_Shop_createCommandWindow.call(this);
    this._commandWindow.y = 21;
};

Scene_Shop.prototype.commandWindowRect = function() {
	const params = TLB.Param.SKASH;
    const wx = params.commandWindowX;
    const wy = params.commandWindowY;
    const ww = params.commandWindowWidth;
    const wh = params.commandWindowHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.numberWindowRect = function() {
	const params = TLB.Param.SKASH;
    const wx = params.numberWindowX;
    const wy = this._dummyWindow.y;
    const ww = params.numberWindowWidth;
    const wh = params.numberWindowHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.createDummyWindow = function() {
    const rect = this.dummyWindowRect();
    this._dummyWindow = new Window_Base(rect);
    const backgroundSprite = new Sprite();
    let image = TLB.Param.SKASH.item_window_bg;
    const bmp = ImageManager.loadMenu(image);
    backgroundSprite.bitmap = bmp;
    this._dummyWindow.addChildAt(backgroundSprite, 0);
    this._dummyWindow.opacity = 0;
    this._dummyWindow.contents.fontFace = 'franklin-gothic-demi-cond';
    this._dummyWindow.contents.fontSize = 20;
    this._dummyWindow.drawText("ITEM", 2, 15, 310, "center");
    this._dummyWindow.drawText("OWNED", 316, 15, 90, "center");
    this._dummyWindow.drawText("PRICE", 405, 15, 87, "center");
    this.addWindow(this._dummyWindow);
};

Scene_Shop.prototype.dummyWindowRect = function() {
	const params = TLB.Param.SKASH;
    const wx = params.numberWindowX;
    const wy = this._commandWindow.y + this._commandWindow.height;
    const ww = params.numberWindowWidth;
    const wh = params.numberWindowHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_ShopStatus(rect);
    this.addWindow(this._statusWindow);
};

Scene_Shop.prototype.statusWindowRect = function() {
	const params = TLB.Param.SKASH;
	const wx = this._goldWindow.x + params.restockWindowXOffset;
    const wy = params.restockWindowY;
    const ww = params.restockWindowWidth;
    const wh = params.restockWindowHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.buyWindowRect = function() {
	return this.numberWindowRect();
};

Scene_Shop.prototype.sellWindowRect = function() {
	return this.numberWindowRect();
};

Scene_Shop.prototype.createCategoryWindow = function() {
    const rect = this.categoryWindowRect();
    this._categoryWindow = new Window_SKAShopItemCategory(rect);
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.deactivate();
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
    this.addChild(this._categoryWindow);
};

Scene_Shop.prototype.categoryWindowRect = function() {
	const params = TLB.Param.SKASH;
    const wx = this._commandWindow.x + params.categoryWindowXOffset;
    const wy = this._commandWindow.y + this._commandWindow.height + params.categoryWindowYOffset;
    const ww = params.categoryWindowWidth;
    const wh = this.calcWindowHeight(params.categoryWindowLines, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.activateSellWindow = function() {
    if (this._categoryWindow.needsSelection()) {
        this._categoryWindow.show();
    }
	this._sellWindow.refresh();
	if (!this._sellWindow.item() && this._sellWindow.index() > 0 && this._sellWindow.index() === this._sellWindow._data.length) {
		this._sellWindow.select(this._sellWindow.index() - 1);
		this._sellWindow.smoothScrollTo(this._sellWindow._scrollX, this._sellWindow.maxScrollY());
	}
    this._sellWindow.show();
    this._sellWindow.activate();
};

Scene_Shop.prototype.commandBuy = function() {
    this._dummyWindow.hide();
    this._buyWindow.show();
    this._buyWindow.deselect();
    this._buyWindow.refresh();
    if (this._categoryWindow.needsSelection()) {
        this._categoryWindow.show();
        this._categoryWindow.activate();
        if (this._categoryWindow.index() === -1) this._categoryWindow.select(0);
    } else {
        this._categoryWindow.select(0);
        this.onCategoryOk();
    }
};

Scene_Shop.prototype.commandSell = function() {
    this._dummyWindow.hide();
    this._sellWindow.show();
    this._sellWindow.deselect();
    this._sellWindow.refresh();
    if (this._categoryWindow.needsSelection()) {
        this._categoryWindow.show();
        this._categoryWindow.activate();
        if (this._categoryWindow.index() === -1) this._categoryWindow.select(0);
    } else {
        this._categoryWindow.select(0);
        this.onCategoryOk();
    }
};

Scene_Shop.prototype.onSellOk = function() {
    this._item = this._sellWindow.item();
    this._categoryWindow.hide();
    this._sellWindow.hide();
    this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
};

Scene_Shop.prototype.onBuyCancel = function() {
    this._buyWindow.deselect();
    this._statusWindow.setItem(null);
    this._helpWindow.clear();
    if (this._categoryWindow.needsSelection()) {
        this._categoryWindow.activate();
        this._categoryWindow.refresh();
        const numCategories = this._categoryWindow._list.length;
        if (this._categoryWindow.index() >= numCategories) this._categoryWindow.select(numCategories - 1);
        this._buyWindow.setCategory(this._categoryWindow.currentSymbol());
    } else {
        this.onCategoryCancel();
    }
};

Scene_Shop.prototype.onSellCancel = function() {
    this._sellWindow.deselect();
    this._statusWindow.setItem(null);
    this._helpWindow.clear();
    if (this._categoryWindow.needsSelection()) {
        this._categoryWindow.activate();
        this._categoryWindow.refresh();
        const numCategories = this._categoryWindow._list.length;
        if (this._categoryWindow.index() >= numCategories) this._categoryWindow.select(numCategories - 1);
        this._sellWindow.setCategory(this._categoryWindow.currentSymbol());
    } else {
        this.onCategoryCancel();
    }
};

Scene_Shop.prototype.onCategoryOk = function() {
    if (this._commandWindow.currentSymbol() === "buy") {
        this.activateBuyWindow();
        this._buyWindow.select(0);
    } else {
        this.activateSellWindow();
        this._sellWindow.select(0);
    }
};

Scene_Shop.prototype.onCategoryCancel = function() {
    this._commandWindow.activate();
    this._categoryWindow.select(-1);
    this._buyWindow.hide();
    this._sellWindow.hide();
    if (this._commandWindow.currentSymbol() === "buy") {
        this._categoryWindow.setItemWindow(this._buyWindow);
        this._categoryWindow._mode = "buy";
        this._categoryWindow.refresh();
        if (this._categoryWindow._list.length === 1) {
            this._buyWindow.setCategory(this._categoryWindow._list[0].symbol);
			this._buyWindow.show();
        }
    } else {
        this._categoryWindow.setItemWindow(this._sellWindow);
        this._categoryWindow._mode = "sell";
        this._categoryWindow.refresh();
        if (this._categoryWindow._list.length === 1) {
            this._sellWindow.setCategory(this._categoryWindow._list[0].symbol);
            this._sellWindow.show();
        }
    }
    this._dummyWindow.show();
};

class Sprite_ShopGauge extends Sprite_Gauge {
    bitmapWidth() {
        return 164;
    }

    bitmapHeight() {
        return 14;
    }

    gaugeX() {
        return 0;
    }

    gaugeHeight() {
        return this.bitmapHeight();
    }

    setup(itemId) {
        this._itemId = itemId;
        this._value = this.currentValue();
        this._maxValue = this.currentMaxValue();
        this.updateBitmap();
    }

    isValid() {
       return true;
    }

    currentValue() {
        if (this._itemId) {
            return $gameTemp._stockData?.[this._itemId]?._percentageFormula || 0;
        }
    }

    currentMaxValue() {
        return 100;
    }

    gaugeColor1() {
        return "#dac6df";
    }

    gaugeColor2() {
        return "#eae2ec";
    }

    redraw() {
        this.bitmap.clear();
        const currentValue = this.currentValue();
        if (!isNaN(currentValue)) {
            this.drawGauge();
        }
    }

    drawGaugeRect(x, y, width, height) {
        let image = TLB.Param.SKASH.restock_gauge_frame;
        const nWidth = 164;
		const nHeight = 14;
        x += 1;
        y -= 9;
        const source = ImageManager.loadMenu(image);
        super.drawGaugeRect(x, y, width, height - 2);
        source.addLoadListener(() => this.bitmap.blt(source, 0, 0, source.width, source.height, 0, 0, nWidth, nHeight));
    }
}

class Window_SKAShopGold extends Window_Gold {
    constructor(rect) {
        super(rect);
        this.opacity = 0;
    }

    _createAllParts() {
        this.createSprites();
        super._createAllParts();
    }

    createSprites() {
        const sprite = new Sprite();
        let image = TLB.Param.SKASH.gold_window_bg;
        let bitmap = ImageManager.loadMenu(image);
        sprite.bitmap = bitmap;
        this.addChildAt(sprite, 0);
    }

    refresh() {
        this.contents.clear();
        const params = TLB.Param.SKAUIB;
	    const image = params.gold_icon;
        const fontSize = params.gold_fontsize;
	    const gradient = params.gold_gradient;
	    const outlineGradient = params.textoutlinegradient;
        this.contents.fontFace = 'franklin-gothic-demi-cond';
        this.contents.fontSize = fontSize;
        const textOptions = {
            outlineThickness: 2,
            outlineGradient: outlineGradient,
            dropShadow: true,
            dropShadowX: 0,
            dropShadowY: 2,
            shadowOpacity: 0.75
        };
        const bitmap = ImageManager.loadMenu(image);
        bitmap.addLoadListener(() => this.contents.blt(bitmap, 0, 0, 26, 27, 97, 20));
        this.drawGradientText(TLB.SKABase.goldAsString(), gradient, 11, 16, 88, "right", textOptions);
    }
}

class Window_SKAShopItemCategory extends Window_ItemCategory {
    constructor(rect) {
        super(rect);
        this._win = null;
        this._mode = "buy";
        this.select(-1);
        this.opacity = 0;
    }

    maxCols() {
        return 1;
    }

    setItemWindow(win) {
        this._win = win;
    }

    select(index) {
        super.select(index);
        if (this._win) this._win.setCategory(this.currentSymbol());
    }

    makeCommandList() {
        if (!this._mode || this._mode === "buy") {
            this.addBuyCategories();
        } else {
            this.addSellCategories();
        }
    };

    addBuyCategories() {
        const categories = TLB.Param.SKAB.itemcategories.filter(cat => cat.showInMenu) || "[]";
        const goods = SceneManager._scene._goods;
        const sellingUsables = !categories.some(cat => goods.every(good => Window_ShopBuy.prototype.goodsToItem(good).meta[cat.symbol] || Window_ShopBuy.prototype.goodsToItem(good).itypeId === 2));
        const sellingKeyItems = goods.some(good => Window_ShopBuy.prototype.goodsToItem(good).itypeId === 2 && Window_SKAItemCategory.prototype.getItemCategories(Window_ShopBuy.prototype.goodsToItem(good)).length === 0);
        const filteredCategories = categories.filter(cat => (cat.symbol === "item" && sellingUsables || cat.symbol === "keyItem" && sellingKeyItems) || goods.some(good => Window_ShopBuy.prototype.goodsToItem(good).meta[cat.symbol]));
        for (const category of filteredCategories) {
            if (eval(category.showInMenu)) this.addCommand(category.name, category.symbol);
        }
    }

    addSellCategories() {
        this.addCommand("Usables", "item");
        const categories = TLB.Param.SKAB.itemcategories || "[]";
        for (const category of categories) {
            if (eval(category.showInMenu) && $gameParty.allItems().some(item => item.price > 0 && this.getItemCategories(item).map(cat => cat.symbol).includes(category.symbol)))
                this.addCommand(category.name, category.symbol);
        }
    }

    itemHeight() {
        return 71;
    }

    drawItem(index) {
        const rect = this.itemRect(index);
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		const categories = TLB.Param.SKAB.itemcategories || "[]";
		const categoryIndex = categories.findIndex(category => category.name === this.commandName(index));
		const category = categories[categoryIndex];
		const iconID = category.iconID;
		this.drawIcon(iconID, rect.x + 23, rect.y + 20);
		this.contents.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = 30;
		this.drawGradientText(this.commandName(index), ["#d9c4de", "#eee5f1", "#d9c5dd"], rect.x + 64, rect.y + 18, 180, "left", { outlineThickness: 3 });
    };

    drawBackgroundRect(rect) {
        const params = TLB.Param.SKAUIB;
        const image = params.categorywindow_bgimage;
        const bitmap = ImageManager.loadMenu(image);
        bitmap.addLoadListener(() => this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y));
    }

    refreshCursor() {
        if (this._cursorAll) {
            this.refreshCursorForAll();
        } else if (this.index() >= 0) {
            const rect = this.itemRect(this.index());
            rect.x += 15;
            rect.y += 16;
            rect.width = 298;
            rect.height = 40;
            this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    };
}

Window_ShopCommand.prototype._createAllParts = function() {
    this.createSprites();
	Window_HorzCommand.prototype._createAllParts.call(this);
};

Window_ShopCommand.prototype.createSprites = function() {
    const sprite = new Sprite();
	let image = TLB.Param.SKASH.command_window_bg;
	let bitmap = ImageManager.loadMenu(image);
	sprite.bitmap = bitmap;
	this.addChildAt(sprite, 0);
};

TLB.SKAShop.Window_ShopCommand_initialize = Window_ShopCommand.prototype.initialize;
Window_ShopCommand.prototype.initialize = function(rect) {
    TLB.SKAShop.Window_ShopCommand_initialize.call(this, rect);
    this._categoryWindow = null;
    this.opacity = 0;
    this._contentsSprite.x -= 1;
    this._contentsSprite.y += 11;
};

Window_ShopCommand.prototype.setCategoryWindow = function(win) {
    this._categoryWindow = win;
};

TLB.SKAShop.Window_ShopCommand_select = Window_ShopCommand.prototype.select;
Window_ShopCommand.prototype.select = function(index) {
    TLB.SKAShop.Window_ShopCommand_select.call(this, index);
    if (this._categoryWindow) {
        if (this.currentSymbol() === "buy") {
            this._categoryWindow.setItemWindow(SceneManager._scene._buyWindow);
            this._categoryWindow._mode = "buy";
            this._categoryWindow.refresh();
            if (this._categoryWindow._list.length === 1) {
                SceneManager._scene._buyWindow.setCategory(this._categoryWindow._list[0].symbol);
				SceneManager._scene._buyWindow.show();
				SceneManager._scene._sellWindow.hide();
            } else {
                SceneManager._scene._buyWindow.hide();
                SceneManager._scene._sellWindow.hide();
            }
        } else {
            this._categoryWindow.setItemWindow(SceneManager._scene._sellWindow);
            this._categoryWindow._mode = "sell";
            this._categoryWindow.refresh();
            if (this._categoryWindow._list.length === 1) {
                SceneManager._scene._sellWindow.setCategory(this._categoryWindow._list[0].symbol);
				SceneManager._scene._sellWindow.show();
				SceneManager._scene._buyWindow.hide();
            } else {
                SceneManager._scene._buyWindow.hide();
                SceneManager._scene._sellWindow.hide();
            }
        }
    }
}

Window_ShopCommand.prototype.drawItemBackground = function() {
    //
};

Window_ShopCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.buy, "buy");
    this.addCommand(TextManager.sell, "sell", !this._purchaseOnly);
};

Window_ShopCommand.prototype.refreshCursor = function() {
	const index = this.index();
	if (index >= 0) {
		const rect = this.itemRect(index);
        rect.x -= 1;
		rect.y += 11;
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		this.setCursorRect(0, 0, 0, 0);
		this.cursorVisible = false;
	}
};

Window_ShopCommand.prototype.maxCols = function() {
    return 2;
};

Window_ShopCommand.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKASH.command_window_cursor;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_ShopCommand.prototype._refreshCursor = function() {
	//
};

TLB.SKAShop.Window_ShopSell_initialize = Window_ShopSell.prototype.initialize;
Window_ShopSell.prototype.initialize = function(rect) {
    const params = TLB.Param.SKASH;
    TLB.SKAShop.Window_ShopSell_initialize.call(this, rect);
    this._backgroundSprite = new Sprite();
    let image = params.item_window_bg;
    const bmp = ImageManager.loadMenu(image);
    this._backgroundSprite.bitmap = bmp;
    this.addChildAt(this._backgroundSprite, 0);
    const textSprite = new Sprite();
    textSprite.move(14, 27);
    textSprite.bitmap = new Bitmap(523, 44);
    textSprite.bitmap.fontFace = 'franklin-gothic-demi-cond';
    textSprite.bitmap.fontSize = 20;
    textSprite.bitmap.drawText("ITEM", 0, 0, 310, this.lineHeight(), "center");
    textSprite.bitmap.drawText("OWNED", 314, 0, 90, this.lineHeight(), "center");
    textSprite.bitmap.drawText("PRICE", 403, 0, 87, this.lineHeight(), "center");
    this._backgroundSprite.addChild(textSprite);
    this._contentBg = new Sprite();
    image = params.item_window_content;
    let bitmap = ImageManager.loadMenu(image);
    this._contentBg.bitmap = bitmap;
    this._contentBg.move(5, -30);
    this._clientArea.addChildAt(this._contentBg, 0);
    image = TLB.Param.SKAUIB.arrowimage;
	bitmap = ImageManager.loadMenu(image);
	const arrowAnchor = { x: 0.5, y: 0.5 };
    this._downArrowSprite.bitmap = bitmap;
    this._downArrowSprite.anchor = arrowAnchor;
    this._downArrowSprite.move(478 / 2, 479);
    this._upArrowSprite.bitmap = bitmap;
    this._upArrowSprite.anchor = arrowAnchor;
    this._upArrowSprite.scale.y = -1;
    this._upArrowSprite.move(478 / 2, 5);
    this.opacity = 0;
    this.cursorVisible = false;
    this._contentsSprite.x += 7;
    this._contentsSprite.y += 58;
};

Window_ShopSell.prototype.drawItem = function(index) {
    const item = this.itemAt(index);
    if (item) {
        const rect = this.itemLineRect(index);
        const price = this.sellingPrice(item);
        const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        this.drawIcon(item.iconIndex, rect.x, iconY);
        this.contents.fontFace = "franklin-gothic-med";
        this.contents.fontSize = 18;
        this.changePaintOpacity(this.isEnabled(item));
        this.drawText(item.name, rect.x + 39, rect.y, 254);
        this.drawText($gameParty.numItems(item), rect.x + 269, rect.y, 90, "right");
        this.contents.fontFace = "franklin-gothic-demi";
        this.contents.fontSize = 14;
        this.drawText("x", rect.x + 327, rect.y - 1, 10);
        const params = TLB.Param.SKAUIB;
	    const fontSize = params.gold_fontsize;
	    const gradient = params.gold_gradient;
	    const outlineGradient = params.textoutlinegradient;
        this.contents.fontFace = 'franklin-gothic-demi-cond';
        this.contents.fontSize = fontSize;
        const textOptions = {
            outlineThickness: 2,
            outlineGradient: outlineGradient,
            dropShadow: true,
            dropShadowX: 0,
            dropShadowY: 2,
            shadowOpacity: 0.75
        };
        this.drawGradientText(TLB.SKABase.priceAsString(price), gradient, rect.x + 332 + 45, rect.y, 88, "right", textOptions);

        this.changePaintOpacity(1);
    }
};

Window_ShopSell.prototype.maxCols = function() {
    return 1;
};

Window_ShopSell.prototype.includes = function(item) {
    if (item?.price === 0 || item?.itypeId === 2) return false;
    const itemCategories = this.getItemCategories(item);
    const defaultInclude = itemCategories.filter(category => eval(category.showInMenu)).length == 0 && Window_ItemList.prototype.includes.call(this, item);
    if (defaultInclude) {
        return true;
    } else {
        const categories = itemCategories.map(category => category.symbol);
        return categories.includes(this._category);
    }
};

Window_ShopSell.prototype.sellingPrice = function(item) {
    return Math.floor(item.price / 2);
};

Window_ShopSell.prototype.drawItemBackground = function(index) {
    //
};

Window_ShopSell.prototype.refreshCursor = function() {
    if (this.index() >= 0) {
        const rect = this.itemRect(this.index());
        rect.x += 0;
        rect.y += 58;
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        this.cursorVisible = true;
    } else {
        this.setCursorRect(0, 0, 0, 0);
        this.cursorVisible = false;
    }
};

Window_ShopSell.prototype.hitIndex = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.hitTest(localPos.x, localPos.y - 58);
};

Window_ShopSell.prototype.updateScrollBase = function(baseX, baseY) {
    const deltaX = baseX - this._scrollBaseX;
    const deltaY = baseY - this._scrollBaseY;
    this._contentBg.x -= deltaX;
    this._contentBg.y -= deltaY;
    if (deltaY > 44) { // scrolling more than 1 row, select last item
        this._contentBg.y = this.row() % 2 === 0 ? -74 : -30;
    } else if (this._contentBg.y <= -118 || this._contentBg.y >= 58) this._contentBg.y = -30;
    Window_Selectable.prototype.updateScrollBase.call(this, baseX, baseY);
};

Window_ShopSell.prototype.itemPadding = function() {
    return 5;
};

Window_ShopSell.prototype._createCursorSprite = function() {
    this._cursorSprite = new Sprite();
    let image = TLB.Param.SKASH.item_window_select;
    let bmp = ImageManager.loadMenu(image);
    this._cursorSprite.bitmap = bmp;
    this._clientArea.addChild(this._cursorSprite);
}

Window_ShopSell.prototype._refreshCursor = function() {
    //
}

Window_ShopSell.prototype._refreshArrows = function() {
    //
}

Window_ShopSell.prototype._updateFilterArea = function() {
    const pos = this._clientArea.worldTransform.apply(new Point(0, 58));
    const filterArea = this._clientArea.filterArea;
    filterArea.x = pos.x + this.origin.x;
    filterArea.y = pos.y + this.origin.y;
    filterArea.width = this.innerWidth;
    filterArea.height = 396;
};

Object.defineProperty(Window_ShopSell.prototype, "innerHeight", {
get: function() {
    return 396;
},
configurable: true
});

Object.defineProperty(Window_ShopSell.prototype, "innerRect", {
get: function() {
    return new Rectangle(
        17,
        26,
        this.innerWidth,
        396
    );
},
configurable: true
});

TLB.SKAShop.Window_ShopBuy_initialize = Window_ShopBuy.prototype.initialize;
Window_ShopBuy.prototype.initialize = function(rect) {
    const params = TLB.Param.SKASH;
    TLB.SKAShop.Window_ShopBuy_initialize.call(this, rect);
    this._category = "none";
    this._backgroundSprite = new Sprite();
    let image = params[this.backgroundImageParam()];
    const bmp = ImageManager.loadMenu(image);
    this._backgroundSprite.bitmap = bmp;
    this.addChildAt(this._backgroundSprite, 0);
    const textSprite = new Sprite();
    textSprite.move(14, 27);
    textSprite.bitmap = new Bitmap(523, 44);
    textSprite.bitmap.fontFace = 'franklin-gothic-demi-cond';
    textSprite.bitmap.fontSize = 20;
    textSprite.bitmap.drawText("ITEM", 0, 0, 310, this.lineHeight(), "center");
    textSprite.bitmap.drawText("OWNED", 314, 0, 90, this.lineHeight(), "center");
    textSprite.bitmap.drawText("PRICE", 403, 0, 87, this.lineHeight(), "center");
    this._backgroundSprite.addChild(textSprite);
    this._contentBg = new Sprite();
    image = params.item_window_content;
    let bitmap = ImageManager.loadMenu(image);
    this._contentBg.bitmap = bitmap;
    this._contentBg.move(5, -30);
    if (this.isCursed?.()) {
        this._contentBg.opacity = 0;
    }
    this._clientArea.addChildAt(this._contentBg, 0);
    image = TLB.Param.SKAUIB.arrowimage;
	bitmap = ImageManager.loadMenu(image);
	const arrowAnchor = { x: 0.5, y: 0.5 };
    this._downArrowSprite.bitmap = bitmap;
    this._downArrowSprite.anchor = arrowAnchor;
    this._downArrowSprite.move(478 / 2, 479);
    this._upArrowSprite.bitmap = bitmap;
    this._upArrowSprite.anchor = arrowAnchor;
    this._upArrowSprite.scale.y = -1;
    this._upArrowSprite.move(478 / 2, 5);
    this.opacity = 0;
    this.cursorVisible = false;
    this._contentsSprite.x += 7;
    this._contentsSprite.y += 58;
};

Window_ShopBuy.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        this.scrollTo(0, 0);
    }
};

Window_ShopBuy.prototype.includes = function(item) {
    const itemCategories = this.getItemCategories(item);
    const defaultInclude = itemCategories.filter(category => eval(category.showInMenu)).length == 0 && Window_ItemList.prototype.includes.call(this, item);
    if (defaultInclude) {
        return true;
    } else {
        const categories = itemCategories.map(category => category.symbol);
        return categories.includes(this._category);
    }
};

Window_ShopBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];
    for (const goods of this._shopGoods) {
        const item = this.goodsToItem(goods);
        if (item && this.includes(item)) {
            this._data.push(item);
            this._price.push(goods[2] === 0 ? item.price : goods[3]);
        }
    }
}

Window_ShopBuy.prototype.drawItem = function(index) {
    const item = this.itemAt(index);
    if (item) {
        const rect = this.itemLineRect(index);
        const price = this.price(item);
        const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        this.drawIcon(item.iconIndex, rect.x, iconY);
        this.contents.fontFace = "franklin-gothic-med";
        this.contents.fontSize = 18;
        this.changePaintOpacity(this.isEnabled(item));
        this.drawText(item.name, rect.x + 39, rect.y, 254);
        this.drawText($gameParty.numItems(item), rect.x + 269, rect.y, 90, "right");
        this.contents.fontFace = "franklin-gothic-demi";
        this.contents.fontSize = 14;
        this.drawText("x", rect.x + 327, rect.y - 1, 10);
        const params = TLB.Param.SKAUIB;
	    const fontSize = params.gold_fontsize;
	    const gradient = params.gold_gradient;
	    const outlineGradient = params.textoutlinegradient;
        this.contents.fontFace = 'franklin-gothic-demi-cond';
        this.contents.fontSize = fontSize;
        const textOptions = {
            outlineThickness: 2,
            outlineGradient: outlineGradient,
            dropShadow: true,
            dropShadowX: 0,
            dropShadowY: 2,
            shadowOpacity: 0.75
        };
        this.drawGradientText(TLB.SKABase.priceAsString(price), gradient, rect.x + 332 + 45, rect.y, 88, "right", textOptions);

        this.changePaintOpacity(1);
    }
};

Window_ShopBuy.prototype.drawItemBackground = function(index) {
    //
};

Window_ShopBuy.prototype.refreshCursor = function() {
    if (this.index() >= 0) {
        const rect = this.itemRect(this.index());
        rect.x += 3;
        rect.y += 58;
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        this.cursorVisible = true;
    } else {
        this.setCursorRect(0, 0, 0, 0);
        this.cursorVisible = false;
    }
};

Window_ShopBuy.prototype.hitIndex = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.hitTest(localPos.x, localPos.y - 58);
};

Window_ShopBuy.prototype.updateScrollBase = function(baseX, baseY) {
    const deltaX = baseX - this._scrollBaseX;
    const deltaY = baseY - this._scrollBaseY;
    this._contentBg.x -= deltaX;
    this._contentBg.y -= deltaY;
    if (deltaY > 44) { // scrolling more than 1 row, select last item
        this._contentBg.y = this.row() % 2 === 0 ? -74 : -30;
	} else if (this._contentBg.y <= -118 || this._contentBg.y >= 58) this._contentBg.y = -30;
    Window_Selectable.prototype.updateScrollBase.call(this, baseX, baseY);
};

Window_ShopBuy.prototype.itemPadding = function() {
    return 5;
};

Window_ShopBuy.prototype._createCursorSprite = function() {
    this._cursorSprite = new Sprite();
    let image = TLB.Param.SKASH.item_window_select;
    let bmp = ImageManager.loadMenu(image);
    this._cursorSprite.bitmap = bmp;
    this._clientArea.addChild(this._cursorSprite);
}

Window_ShopBuy.prototype._refreshCursor = function() {
    //
}

Window_ShopBuy.prototype._refreshArrows = function() {
    //
}

Window_ShopBuy.prototype._updateFilterArea = function() {
    const pos = this._clientArea.worldTransform.apply(new Point(0, 58));
    const filterArea = this._clientArea.filterArea;
    filterArea.x = pos.x + this.origin.x;
    filterArea.y = pos.y + this.origin.y;
    filterArea.width = this.innerWidth;
    filterArea.height = 396;
};

Window_ShopBuy.prototype.backgroundImageParam = function() {
    return this.isCursed?.() ? 'item_window_bg_greed' : 'item_window_bg';
}

Object.defineProperty(Window_ShopBuy.prototype, "innerHeight", {
get: function() {
    return 396;
},
configurable: true
});

Object.defineProperty(Window_ShopBuy.prototype, "innerRect", {
get: function() {
    return new Rectangle(
        17,
        26,
        this.innerWidth,
        396
    );
},
configurable: true
});

TLB.SKAShop.Window_ShopNumber_initialize = Window_ShopNumber.prototype.initialize;
Window_ShopNumber.prototype.initialize = function(rect) {
    TLB.SKAShop.Window_ShopNumber_initialize.call(this, rect);
    this._backgroundSprite = new Sprite();
    let image = TLB.Param.SKASH.item_number_bg;
    const bmp = ImageManager.loadMenu(image);
    this._backgroundSprite.bitmap = bmp;
    this.addChildAt(this._backgroundSprite, 0);
    this.opacity = 0;
};

Window_ShopNumber.prototype.refresh = function() {
    Window_Selectable.prototype.refresh.call(this);
    this.contents.fontFace = 'franklin-gothic-demi-cond';
    this.contents.fontSize = 20;
    this.drawText("ITEM", 140, 132, 310, this.lineHeight(), "center");
    this.drawText("OWNED", 333, 132, 90, this.lineHeight(), "center");
    this.drawText("PRICE", 422, 132, 87, this.lineHeight(), "center");
    this.drawCurrentItemName();
    this.drawText($gameParty.numItems(this._item), 339, this.itemNameY(), 35, "right");
        this.contents.fontFace = "franklin-gothic-demi";
        this.contents.fontSize = 14;
        this.drawText("x", 339, this.itemNameY() - 1, 10);
    this.drawNumber();
    this.drawTotalPrice();
};

Window_ShopNumber.prototype.drawCurrentItemName = function() {
    const padding = this.itemPadding();
    const x = padding * 2;
    const y = this.itemNameY();
    const width = this.multiplicationSignX() - padding * 3 - 100;
    this.drawItemName(this._item, x, y, width);
};

Window_ShopNumber.prototype.drawNumber = function() {
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

Window_ShopNumber.prototype.drawTotalPrice = function() {
    const padding = this.itemPadding();
    const total = this._price * this._number;
    const width = this.innerWidth - padding * 2;
    const y = this.totalPriceY();
    const params = TLB.Param.SKAUIB;
    const fontSize = params.gold_fontsize;
    const gradient = params.gold_gradient;
    const outlineGradient = params.textoutlinegradient;
    this.contents.fontFace = 'franklin-gothic-demi-cond';
    this.contents.fontSize = fontSize;
    const textOptions = {
        outlineThickness: 2,
        outlineGradient: outlineGradient,
        dropShadow: true,
        dropShadowX: 0,
        dropShadowY: 2,
        shadowOpacity: 0.75
    };
    this.drawGradientText(TLB.SKABase.priceAsString(total), gradient, 0, y, width, "right", textOptions);
};

Window_ShopNumber.prototype.itemRect = function() {
    const rect = new Rectangle();
    rect.x = this.cursorX() - 20;
    rect.y = this.buttonY() + 4;
    rect.width = this.cursorWidth() + 15;
    rect.height = this.lineHeight();
    return rect;
};

Window_ShopNumber.prototype.itemNameY = function() {
    return Math.floor(this.innerHeight / 2 - this.lineHeight() * 1.5) - 2;
};

Window_ShopNumber.prototype.totalPriceY = function() {
    return this.itemNameY();
};

Window_ShopNumber.prototype.buttonY = function() {
    return 224;
};

TLB.SKAShop.Window_ShopStatus_initialize = Window_ShopStatus.prototype.initialize;
Window_ShopStatus.prototype.initialize = function(rect) {
    TLB.SKAShop.Window_ShopStatus_initialize.call(this, rect);
    this._backgroundSprite = new Sprite();
    let image = TLB.Param.SKASH.restock_window_bg;
    const bmp = ImageManager.loadMenu(image);
    this._backgroundSprite.bitmap = bmp;
    this.addChildAt(this._backgroundSprite, 0);
    this._percentageGauge = new Sprite_ShopGauge();
    this._percentageGauge.move(94, 30);
    this.addChild(this._percentageGauge);
    this.opacity = 0;
};

Window_ShopStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._item) {
        const percentage = $gameTemp._stockData?.[this._item.id]?._percentageFormula;
        if (percentage !== undefined) {
            this._percentageGauge.setup(this._item.id);
            this._percentageGauge.show();
        } else {
            this._percentageGauge.hide();
        }
        this.contents.fontFace = 'franklin-gothic-med';
        this.contents.fontSize = 14;
        this.drawText("STOCK", 23, 25, 70, "left");
        this.contents.fontSize = 18;
        const stock = this.getStock(this._item);
        if (stock !== -1) {
            this.contents.fontFace = 'franklin-gothic-demi';
            this.contents.fontSize = 14;
            this.drawText("x", 23, 7, 20, "left");
            this.contents.fontSize = 18;
            this.drawText(stock, 31, 8, 24, "left");
        } else {
            this.contents.fontFace = 'franklin-gothic-demi';
            this.contents.fontSize = 18;
            this.drawText("∞", 35, 9, 24, "left");
        }
        let restockText;
        try {
            restockText = eval($gameTemp._stockData?.[this._item.id]?._restockText);
        } catch (e) {
            restockText = $gameTemp._stockData?.[this._item.id]?._restockText;
        }
        if (restockText) {
            this.contents.fontFace = 'franklin-gothic-med';
            this.contents.fontSize = 14;
            this.drawText("RESTOCK", 84, 25, 60, "left");
            this.drawText(restockText, 168 - 45, 25, 120, "right");
        }
    } else if (this._percentageGauge) this._percentageGauge.hide();
};

Window_ShopStatus.prototype.getStock = function(item) {
    const costs = CostTagFactory.createCostTagsFromNote(item.note);
    const variableCost = costs.find(cost => cost instanceof CostTagVariable);

    if (variableCost != undefined) {
        const variableID = $dataSystem.variables.indexOf(variableCost._costTarget);
        return $gameVariables.value(variableID);
    }

    return -1;
};
