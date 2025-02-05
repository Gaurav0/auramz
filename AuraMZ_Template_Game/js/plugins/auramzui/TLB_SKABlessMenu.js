// Trilobytes - Star Knightess Aura Bless Menu/
// TLB_SKABlessMenu.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKABlessMenu = true;

window.TLB = window.TLB || {};
TLB.SKABlessMenu = TLB.SKABlessMenu || {};

/*:
 * @target MZ
 * @plugindesc This plugin modifies the bless interface of Star
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
 * @desc Opens the bless menu.
 *
 * @arg mode
 * @text Mode
 * @desc Which mode to run the scene in.
 * @type select
 * @option MP
 * @value 1
 * @option Gold
 * @value 2
 * @default 1
 *
 * @param bless_sound_effect
 * @text Bless Sound Effect
 * @type file
 * @dir audio/se/
 * @desc Sound effect that is played whenever an item is blessed
 *
 * @param blessmenu_categorywindow
 * @text Category Window
 *
 * @param blessmenu_categorywindow_topbgimage
 * @parent blessmenu_categorywindow
 * @text Top BG Image
 * @desc Filename of image to use for the first category.
 * @type file
 * @dir img/menu/
 * @default Bless_Menu/BLESS_MENU_CATEGORY_BG_MAIN
 *
 * @param blessmenu_categorywindow_bgimage
 * @parent blessmenu_categorywindow
 * @text BG Image
 * @desc Filename of image to use for categories besides the first.
 * @type file
 * @dir img/menu/
 * @default Bless_Menu/BLESS_MENU_CATEGORY_BG
 *
 * @param blessmenu_categorywindow_x
 * @parent blessmenu_categorywindow
 * @text X
 * @desc X coordinate of category window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -160
 *
 * @param blessmenu_categorywindow_y
 * @parent blessmenu_categorywindow
 * @text Y
 * @desc Y coordinate of category window rect.
 * @type number
 * @default 7
 *
 * @param blessmenu_categorywindow_width
 * @parent blessmenu_categorywindow
 * @text Width
 * @desc Width of category window rect.
 * @type number
 * @default 363
 *
 * @param blessmenu_helpwindow
 * @text Help Window
 *
 * @param blessmenu_helpwindow_bgimage
 * @parent blessmenu_helpwindow
 * @text BG
 * @desc Filename of image to use for the help window background.
 * @type file
 * @dir img/menu/
 * @default Bless_Menu/BLESS_MENU_HELP_BG_A
 *
 * @param blessmenu_helpwindow_x
 * @parent blessmenu_helpwindow
 * @text X
 * @desc X coordinate of the help window rect.
 * @type number
 * @default 184
 *
 * @param blessmenu_helpwindow_y
 * @parent blessmenu_helpwindow
 * @text Y
 * @desc Y coordinate of the help window rect.
 * @type number
 * @default 0
 *
 * @param blessmenu_helpwindow_width
 * @parent blessmenu_helpwindow
 * @text Width
 * @desc Width of the help window rect.
 * @default 815
 *
 * @param blessmenu_helpwindow_height
 * @parent blessmenu_helpwindow
 * @text Height
 * @desc Height of the help window rect.
 * @default 180
 *
 * @param numberWindow
 * @text Number Window
 *
 * @param numberWindowX
 * @parent numberWindow
 * @text X
 * @desc X coordinate of number window rect.
 * @type number
 * @default 186
 *
 * @param numberWindowY
 * @parent numberWindow
 * @text Y
 * @desc Y coordinate of number window rect.
 * @type number
 * @default 18
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
 * @param infoWindow
 * @text Information Window
 *
 * @param blessmenu_infowindow_bgimage
 * @parent infoWindow
 * @text BG
 * @desc Filename of image to use for the information window background.
 * @type file
 * @dir img/menu/
 * @default Bless_Menu/BLESS_MENU_INFORMATION_WINDOW_BG_BIG
 *
 * @param infoWindowX
 * @parent infoWindow
 * @text X
 * @desc X coordinate of information window rect.
 * @type number
 * @default 710
 *
 * @param infoWindowY
 * @parent infoWindow
 * @text Y
 * @desc Y coordinate of information window rect.
 * @type number
 * @default 24
 *
 * @param infoWindowWidth
 * @parent infoWindow
 * @text Width
 * @desc Width of information window rect.
 * @type number
 * @default 338
 *
 * @param infoWindowHeight
 * @parent infoWindow
 * @text Height
 * @desc Height of information window rect.
 * @type number
 * @default 388
 *
 * @param blessmenu_arrowimage
 * @text Damage Arrow Image
 * @desc Filename of image to use for the damage type conversion arrow.
 * @type file
 * @dir img/menu/
 * @default Bless_Menu/BLESS_MENU_DAMAGE_ARROW
 *
 * @param mpWindow
 * @text MP Window
 *
 * @param blessmenu_mpwindow_bgimage
 * @parent mpWindow
 * @text BG
 * @desc Filename of image to use for the MP window background.
 * @type file
 * @dir img/menu/
 * @default Bless_Menu/BLESS_MENU_MP_WINDOW_BG
 *
 * @param blessmenu_mpbar_frame
 * @parent mpWindow
 * @text Frame
 * @desc Filename of image to use for the MP bar frame.
 * @type file
 * @dir img/menu/
 * @default Bless_Menu/BLESS_MENU_MP_BAR_FRAME
 *
 * @param mpWindowY
 * @parent mpWindow
 * @text Y
 * @desc Y coordinate of MP window rect.
 * @type number
 * @default 416
 *
 * @param mpWindowWidth
 * @parent mpWindow
 * @text Width
 * @desc Width of MP window rect.
 * @type number
 * @default 338
 *
 * @param mpWindowHeight
 * @parent mpWindow
 * @text Height
 * @desc Height of MP window rect.
 * @type number
 * @default 95
 *
 * @param itemWindow
 * @text Item Window
 *
 * @param itemWindowX
 * @parent itemWindow
 * @text X
 * @desc X coordinate of item window rect.
 * @type number
 * @default 186
 *
 * @param itemWindowY
 * @parent itemWindow
 * @text Y
 * @desc Y coordinate of item window rect.
 * @type number
 * @default 18
 *
 * @param itemWindowWidth
 * @parent itemWindow
 * @text Width
 * @desc Width of item window rect.
 * @type number
 * @default 523
 *
 * @param itemWindowHeight
 * @parent itemWindow
 * @text Height
 * @desc Height of item window rect.
 * @type number
 * @default 494
 *
 * @param item_number_bg
 * @parent item_window
 * @text Quantity Background
 * @desc Image to use for the item number background.
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_ITEM_ALT_WINDOW
 *
 * @param item_window_bg
 * @parent item_window
 * @text Background
 * @desc Image to use for the item window background.
 * @type file
 * @dir img/menu/
 * @default Shop_Menu/SHOP_MENU_ITEM_WINDOW
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
 */

 //----------------------------------------------------------------------------
 //
 // Parameter conversion
 //
 //----------------------------------------------------------------------------

window.parameters = PluginManager.parameters('TLB_SKABlessMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKABM = TLB.Param.SKABM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKABM);

PluginManager.registerCommand("TLB_SKABlessMenu", "openScene", args => {
    $gameTemp._blessMode = parseInt(args.mode);
    SceneManager.push(Scene_Bless);
});

TLB.SKABlessMenu.itemValid = function(item) {
	const params = TLB.Param.SKABM;
	const blessSkill = $dataSkills[$gameTemp.lastActionData(0)];
	const hasBlessedVersion = TLB.SKABlessMenu.getBlessedItem(item);
	if (!hasBlessedVersion) return false;
	return item.meta.blessed != "true" && item.meta.cannot_bless != "true" && blessSkill.meta.canbless?.split(",").some(iType => item.meta[iType] == "true");
};

TLB.SKABlessMenu.getBlessedItem = function(item) {
    return $dataItems.find(bItem => bItem?.name === `Blessed ${item?.name}`);
};

class Scene_Bless extends Scene_MenuBase {
    create() {
        super.create();
        this.createEffectsWindow();
        this.createMpWindow();
        this.createCategoryWindow();
        this.createNumberWindow();
        this.createItemWindow();
        this.createHelpWindow();
        this.drawAura();
        this._categoryWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._helpWindow.children[0].bitmap = ImageManager.loadMenu(TLB.Param.SKABM.blessmenu_helpwindow_bgimage);
        this._helpWindow.children[0].x -= 5;
        this._helpWindow.children[0].children[0].x += 5;
        this._helpWindow.y = this._itemWindow.y + this._itemWindow.height + 4;
        if (this._categoryWindow._list.length === 1) {
            this._categoryWindow.deactivate();
            this.onCategoryOk();
        }
    }

    createHelpWindow() {
        const rect = this.helpWindowRect();
        this._helpWindow = new Window_SKAHelp(rect);
        this.addWindow(this._helpWindow);
    }

	helpWindowRect() {
		const params = TLB.Param.SKABM;
        const wx = params.blessmenu_helpwindow_x;
        const wy = params.blessmenu_helpwindow_y;
        const ww = params.blessmenu_helpwindow_width;
        const wh = params.blessmenu_helpwindow_height;
        return new Rectangle(wx, wy, ww, wh);
    }

    createNumberWindow() {
        const rect = this.numberWindowRect();
        this._numberWindow = new Window_BlessNumber(rect);
        this._numberWindow.hide();
        this._numberWindow.setHandler("ok", this.onNumberOk.bind(this));
        this._numberWindow.setHandler("cancel", this.onNumberCancel.bind(this));
        this.addWindow(this._numberWindow);
    };

	numberWindowRect = function() {
		const params = TLB.Param.SKABM;
        const wx = params.numberWindowX;
        const wy = params.numberWindowY;
        const ww = params.numberWindowWidth;
        const wh = params.numberWindowHeight;
        return new Rectangle(wx, wy, ww, wh);
    };

    createEffectsWindow() {
        const rect = this.effectsWindowRect();
        this._effectsWindow = new Window_BlessEffects(rect);
        this.addWindow(this._effectsWindow);
    }

	effectsWindowRect() {
		const params = TLB.Param.SKABM;
		const wx = params.infoWindowX;
        const wy = params.infoWindowY;
        const ww = params.infoWindowWidth;
        const wh = params.infoWindowHeight;
        return new Rectangle(wx, wy, ww, wh);
    }

    createMpWindow() {
        const rect = this.mpWindowRect();
        this._mpWindow = new Window_BlessMp(rect);
        this.addWindow(this._mpWindow);
    }

	mpWindowRect() {
		const params = TLB.Param.SKABM;
		const wx = this._effectsWindow.x;
        const wy = params.mpWindowY;
        const ww = params.mpWindowWidth;
        const wh = params.mpWindowHeight;
        return new Rectangle(wx, wy, ww, wh);
    }

    createCategoryWindow() {
        const rect = this.categoryWindowRect();
        this._categoryWindow = new Window_BlessItemCategory(rect);
        this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
        this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
        this.addWindow(this._categoryWindow);
    }

	categoryWindowRect() {
		const params = TLB.Param.SKABM;
        const wx = params.blessmenu_categorywindow_x;
        const wy = params.blessmenu_categorywindow_y;
        const ww = params.blessmenu_categorywindow_width;
        const wh = this.calcWindowHeight((TLB.Param.SKAB.itemcategories || "[]").length, true, true);
        return new Rectangle(wx, wy, ww, wh);
    }

    createItemWindow() {
        const rect = this.itemWindowRect();
        this._itemWindow = new Window_BlessItemList(rect);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow)
        this._itemWindow.setEffectsWindow(this._effectsWindow);
        this._categoryWindow.setItemWindow(this._itemWindow);
    };

	itemWindowRect() {
		const params = TLB.Param.SKABM;
        const wx = params.itemWindowX;
        const wy = params.itemWindowY;
        const ww = params.itemWindowWidth;
        const wh = params.itemWindowHeight;
        return new Rectangle(wx, wy, ww, wh);
    }

    drawAura() {
        const bust = new Sprite();
        bust.scale.x = -1;
        let y = 252;
        if ($gameTemp._blessMode === 2) y += 95;
        bust.move(Graphics.width - 38, y);
        this.addChild(bust);
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
            bust.bitmap = new Bitmap(width, height);
            bust.bitmap.blt(source, sourceX, sourceY, 290, 315, 0, 0, width, height);
        }
    };

    onCategoryOk() {
        this._itemWindow.refresh();
        this._itemWindow.show();
        this._itemWindow.activate();
        this._itemWindow.select(0);
    }

    onCategoryCancel() {
        SceneManager.pop();
    }

    onItemOk() {
        const item = this._itemWindow.item();
        if (item) {
            this._item = this._itemWindow.item();
            const blessedItem = TLB.SKABlessMenu.getBlessedItem(item);
            this._itemWindow.hide();
            this._numberWindow.setup(blessedItem, this.maxBless(), this.blessCost());
            this._numberWindow.show();
            this._numberWindow.activate();
            this._helpWindow.setItem(blessedItem);
        } else {
            this._itemWindow.activate();
        }
    }

    onItemCancel() {
        this._itemWindow.deselect();
        this._categoryWindow.activate();
        this._categoryWindow.refresh();
    }

    onNumberOk() {
		const params = TLB.Param.SKABM;
        const sound = { name: params.bless_sound_effect, volume: 90, pitch: 100 };
        AudioManager.playStaticSe(sound);
        const blessedItem = TLB.SKABlessMenu.getBlessedItem(this._item);
        const number = this._numberWindow.number();
        if ($gameTemp._blessMode === 1) {
            $gameParty.leader().gainMp(-number * this.blessCost());
        } else {
            $gameParty.gainGold(-number * this.blessCost());
        }
        $gameParty.loseItem(this._item, number);
        $gameParty.gainItem(blessedItem, number);
        this.endNumberInput();
        if (this._itemWindow.index() >= this._itemWindow._data.length && $gameParty.numItems(this._item) === 0) {
            this._itemWindow.select(this._itemWindow._data.length - 1);
        }
        this._mpWindow.refresh();
    }

    onNumberCancel() {
        SoundManager.playCancel();
        this.endNumberInput();
    }

    endNumberInput() {
        this._numberWindow.hide();
        this._itemWindow.refresh();
        this._itemWindow.show();
        this._itemWindow.activate();
    }

    maxBless() {
        const blessedItem = TLB.SKABlessMenu.getBlessedItem(this._item);
        const blessedInv = $gameParty.numItems(blessedItem);
        const blessedMax = $gameParty.maxItems(blessedItem) - blessedInv;
        const resource = $gameTemp._blessMode === 1 ? $gameParty.leader().mp : $gameParty.gold();
        return Math.min(blessedMax, Math.floor(resource / this.blessCost()), $gameParty.numItems(this._item));
    }

    blessCost() {
        const multiplier = $gameTemp._blessMode === 1 ? (0.25 * $gameParty.leader().mcr) : 5;
        return Math.floor((this._item?.price || 0) * multiplier);
    };
}

class Sprite_MpGauge extends Sprite_Gauge {
    bitmapWidth() {
        return 204;
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

    setup() {
        this._value = this.currentValue();
        this._maxValue = this.currentMaxValue();
        this.updateBitmap();
    }

    isValid() {
       return true;
    }

    currentValue() {
        return $gameParty.leader().mp;
    }

    currentMaxValue() {
        return $gameParty.leader().mmp;
    }

    gaugeColor1() {
        return "#77daff";
    }

    gaugeColor2() {
        return "#71a7db";
    }

    redraw() {
        this.bitmap.clear();
        const currentValue = this.currentValue();
        if (!isNaN(currentValue)) {
            this.drawGauge();
        }
    }

    drawGaugeRect(x, y, width, height) {
        let image = TLB.Param.SKABM.blessmenu_mpbar_frame;
        const nWidth = 204;
		const nHeight = 14;
        x += 1;
        y -= 9;
        const source = ImageManager.loadMenu(image);
        super.drawGaugeRect(x, y, width, height - 2);
        source.addLoadListener(() => this.bitmap.blt(source, 0, 0, source.width, source.height, 0, 0, nWidth, nHeight));
    }
}

class Window_BlessItemCategory extends Window_ItemCategory {
    constructor(rect) {
        super(rect);
        this._win = null;
        this.select(0);
        this.opacity = 0;
    }

    maxCols() {
        return 1;
    }

    setItemWindow(win) {
        this._win = win;
        this._win.setCategory(this.currentSymbol());
    }

    select(index) {
        super.select(index);
        if (this._win) this._win.setCategory(this.currentSymbol());
    }

    makeCommandList() {
        this.addCommand("Usables", "item");
        const categories = TLB.Param.SKAB.itemcategories || "[]";
        for (const category of categories) {
            if (eval(category.showInMenu) && $gameParty.allItems().some(item => item.price > 0 && this.getItemCategories(item).map(cat => cat.symbol).includes(category.symbol) && TLB.SKABlessMenu.itemValid(item)))
                this.addCommand(category.name, category.symbol);
        }
    }

    itemHeight() {
        return 79;
    }

    drawItem(index) {
        const rect = this.itemRect(index);
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		const categories = TLB.Param.SKAB.itemcategories || "[]";
		const categoryIndex = categories.findIndex(category => category.name === this.commandName(index));
		const category = categories[categoryIndex];
		const iconID = category.iconID;
		this.drawIcon(iconID, rect.x + 23, rect.y + 28 - (9 * index - 1));
		this.contents.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = 30;
		this.drawGradientText(this.commandName(index), ["#d9c4de", "#eee5f1", "#d9c5dd"], rect.x + 64, rect.y + 26 - (9 * index - 1), 180, "left", { outlineThickness: 3 });
    }

    drawItemBackground(index) {
        const rect = this.itemRect(index);
        this.drawBackgroundRect(rect, index);
    };

    drawBackgroundRect(rect, index) {
        const params = TLB.Param.SKABM;
        let image;
        if (index === 0) {
            image = params.blessmenu_categorywindow_topbgimage;
        } else {
            rect.y -= 9 * (index - 1);
            image = params.blessmenu_categorywindow_bgimage;
        }
        const bitmap = ImageManager.loadMenu(image);
        bitmap.addLoadListener(() => this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y));
    }

    refreshCursor() {
        const index = this.index();
        if (this._cursorAll) {
            this.refreshCursorForAll();
        } else if (this.index() >= 0) {
            const rect = this.itemRect(this.index());
            rect.x += 15;
            rect.y += 25 - (9 * index);
            rect.width = 298;
            rect.height = 40;
            this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    }
}

class Window_BlessItemList extends Window_ItemList {
    constructor(rect) {
        super(rect);
        this._effectsWindow = null;
        const params = TLB.Param.SKABM;
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
        textSprite.bitmap.drawText("COST", 403, 0, 87, this.lineHeight(), "center");
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
    }

    isEnabled(item) {
        const resource = $gameTemp._blessMode === 1 ? $gameParty.leader().mp : $gameParty.gold();
        return resource >= this.blessCost(item);
    }

	drawItem(index) {
		const item = this.itemAt(index);
        if (item) {
            const rect = this.itemLineRect(index);
            const cost = this.blessCost(item);
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
            const fontSize = 20;
            const gradient = $gameTemp._blessMode === 1 ? ["#77daff", "#71a7db"] : params.gold_gradient;
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
            this.drawGradientText(this.costAsString(cost), gradient, rect.x + 332 + 45, rect.y, 88, "right", textOptions);

            this.changePaintOpacity(1);
        }
	}

	maxCols() {
        return 1;
    }

    setEffectsWindow(win) {
        this._effectsWin = win;
    }

    select(index) {
        super.select(index);
        if (this._effectsWin) this._effectsWin.setItem(this.item());
    }

    includes(item) {
        if (!item || item?.price === 0 || item?.itypeId === 2) return false;
        const itemCategories = this.getItemCategories(item);
        const defaultInclude = itemCategories.filter(category => eval(category.showInMenu)).length == 0 && Window_ItemList.prototype.includes.call(this, item);
        if (defaultInclude) {
            return TLB.SKABlessMenu.itemValid(item);
        } else {
            const categories = itemCategories.map(category => category.symbol);
            return TLB.SKABlessMenu.itemValid(item) && categories.includes(this._category);
        }
    }

    blessCost(item) {
        const multiplier = $gameTemp._blessMode === 1 ? (0.25 * $gameParty.leader().mcr) : 5;
        return Math.floor((item?.price || 0) * multiplier);
    }

    costAsString(cost) {
        return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    drawItemBackground(index) {
        //
    }

    refreshCursor() {
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
		const params = TLB.Param.SKABM;
        let image = params.item_window_select;
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

Object.defineProperty(Window_BlessItemList.prototype, "innerHeight", {
    get: function() {
        return 396;
    },
    configurable: true
});

Object.defineProperty(Window_BlessItemList.prototype, "innerRect", {
    get: function () {
        return new Rectangle(
            17,
            26,
            this.innerWidth,
            396
        );
    },
    configurable: true
});

class Window_BlessEffects extends Window_Base {
    constructor(rect) {
        super(rect);
        this._item = null;
        this.opacity = 0;
    }

    _createAllParts() {
        this.createSprites();
        super._createAllParts();
    }

    createSprites() {
        const sprite = new Sprite();
        let image = TLB.Param.SKABM.blessmenu_infowindow_bgimage;
        let bitmap = ImageManager.loadMenu(image);
        sprite.bitmap = bitmap;
        this.addChildAt(sprite, 0);
    }

    setItem(item) {
        this._item = item;
        this.refresh();
    }

    refresh() {
        this.contents.clear();
        if (this._item) {
            this.contents.fontFace = 'franklin-gothic-med-cond';
            this.contents.fontSize = 18;
            let gradient1 = ["#b27996", "#e2bb8c"];
            this.drawGradientText("TEMPORARY EFFECTS", gradient1, 15, 12, 180, "left", { bold: true });
            if (this._item.damage.type) {
                this.drawGradientText("DAMAGE TYPE", gradient1, 15, 88, 180, "left", { bold: true });
            }
            this.contents.fontFace = 'franklin-gothic-med';
            gradient1 = ["#d9c5de", "#efe6f1", "#d9c5de"];
            this.drawGradientText("Positive", gradient1, 37, 33, 154, "left", { bold: true });
            this.drawGradientText("+50%", gradient1, 37, 33, 154, "right", { bold: true });
            this.drawGradientText("Negative", gradient1, 37, 54, 154, "left", { bold: true });
            this.drawGradientText("-50%", gradient1, 37, 54, 154, "right", { bold: true });
            if (this._item.damage.type) {
                const currentIcon = this._item.damage.elementId + 62;
                this.drawIcon(currentIcon, 15, 118);
                this.drawGradientText(`${$dataSystem.elements[this._item.damage.elementId]}`, gradient1, 49, 116, 154, "left", { bold: true });
                const blessItem = TLB.SKABlessMenu.getBlessedItem(this._item);
                const newIcon = blessItem?.damage.elementId + 62;
                if (newIcon) {
                    this.drawIcon(newIcon, 175, 118);
                    this.drawGradientText(`${$dataSystem.elements[blessItem.damage.elementId]}`, gradient1, 209, 116, 154, "left", { bold: true });
                }
                const arrowImage = TLB.Param.SKABM.blessmenu_arrowimage;
                const arrowBmp = ImageManager.loadMenu(arrowImage);
                arrowBmp.addLoadListener(() => this.contents.blt(arrowBmp, 0, 0, arrowBmp.width, arrowBmp.height, 125, 119));
            }
        }
    }
}

class Window_BlessMp extends Window_Base {
    constructor(rect) {
        super(rect);
        this._backgroundSprite = new Sprite();
        let image = TLB.Param.SKABM.blessmenu_mpwindow_bgimage;
        const bmp = ImageManager.loadMenu(image);
        this._backgroundSprite.bitmap = bmp;
        this.addChildAt(this._backgroundSprite, 0);
        if ($gameTemp._blessMode === 1) {
            this._mpGauge = new Sprite_MpGauge();
            this._mpGauge.move(43, 29);
            this._mpGauge.setup();
            this.addChild(this._mpGauge);
        }
        this.opacity = 0;
        this.refresh();
    }

    refresh() {
        this.contents.clear();
        this.contents.fontFace = 'franklin-gothic-med';
        this.contents.fontSize = 18;
        let gradient1, value;
        if ($gameTemp._blessMode === 1) {
            gradient1 = ["#77daff", "#71a7db"];
            this.drawGradientText("MP", gradient1, 38, 24, 70, "left", { bold: true });
            value = `${$gameParty.leader().mp} / ${$gameParty.leader().mmp}`;
            this.drawGradientText(value, gradient1, 38, 24, 194, "right", { bold: true });
        } else {
            const goldImage = TLB.Param.SKAUIB.gold_icon;
            const bitmap = ImageManager.loadMenu(goldImage);
            bitmap.addLoadListener(() => this.contents.blt(bitmap, 0, 0, 26, 27, 97, 20));
            gradient1 = TLB.Param.SKAUIB.gold_gradient;
            value = TLB.SKABase.goldAsString();
            this.contents.fontFace = 'franklin-gothic-demi-cond';
            this.contents.fontSize = TLB.Param.SKAUIB.gold_fontsize;
            this.drawGradientText(value, gradient1, 11, 16, 88, "right", { bold: true });
        }
    }
}

class Window_BlessNumber extends Window_ShopNumber {
    refresh() {
        Window_Selectable.prototype.refresh.call(this);
        this.contents.fontFace = 'franklin-gothic-demi-cond';
        this.contents.fontSize = 20;
        this.drawText("ITEM", 140, 132, 310, this.lineHeight(), "center");
        this.drawText("OWNED", 333, 132, 90, this.lineHeight(), "center");
        this.drawText("COST", 422, 132, 87, this.lineHeight(), "center");
        this.drawCurrentItemName();
        this.drawText($gameParty.numItems(this._item), 339, this.itemNameY(), 35, "right");
            this.contents.fontFace = "franklin-gothic-demi";
            this.contents.fontSize = 14;
            this.drawText("x", 339, this.itemNameY() - 1, 10);
        this.drawNumber();
        this.drawTotalPrice();
    }

    drawTotalPrice() {
        const padding = this.itemPadding();
        const total = this._price * this._number;
        const width = this.innerWidth - padding * 2;
        const y = this.totalPriceY();
        const params = TLB.Param.SKAUIB;
        const fontSize = 20;
        const gradient = $gameTemp._blessMode === 1 ? ["#77daff", "#71a7db"] : params.gold_gradient;
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
    }
}

if (!PluginManagerEx.isExistPlugin("TLB_SKAShop")) {
	Window_BlessNumber.prototype.initialize = function(rect) {
		Window_ShopNumber.prototype.initialize.call(this, rect);
		this._backgroundSprite = new Sprite();
		let image = TLB.Param.SKABM.item_number_bg;
		const bmp = ImageManager.loadMenu(image);
		this._backgroundSprite.bitmap = bmp;
		this.addChildAt(this._backgroundSprite, 0);
		this.opacity = 0;
	};

	Window_BlessNumber.prototype.drawCurrentItemName = function() {
		const padding = this.itemPadding();
		const x = padding * 2;
		const y = this.itemNameY();
		const width = this.multiplicationSignX() - padding * 3 - 100;
		this.drawItemName(this._item, x, y, width);
	};

	Window_BlessNumber.prototype.drawNumber = function() {
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

	Window_BlessNumber.prototype.itemRect = function() {
		const rect = new Rectangle();
		rect.x = this.cursorX() - 20;
		rect.y = this.buttonY() + 4;
		rect.width = this.cursorWidth() + 15;
		rect.height = this.lineHeight();
		return rect;
	};

	Window_BlessNumber.prototype.itemNameY = function() {
		return Math.floor(this.innerHeight / 2 - this.lineHeight() * 1.5) - 2;
	};

	Window_BlessNumber.prototype.totalPriceY = function() {
		return this.itemNameY();
	};

	Window_BlessNumber.prototype.buttonY = function() {
		return 224;
	};
}
