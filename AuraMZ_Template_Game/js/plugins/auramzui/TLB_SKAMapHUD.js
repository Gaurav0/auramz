// Trilobytes - Star Knightess Aura Map HUD
// TLB_SKAMapHUD.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAMapHUD = true;

window.TLB = TLB || {};
TLB.SKAMapHUD = TLB.SKAMapHUD || {};

/*:
 * @target MZ
 * @plugindesc This plugin modifies the map scene of Star Knightess
 * Aura to reflect the HUD prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the current Scene_Map to match a
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
 * @param corruptionActorEval
 * @text Corruption Actor Eval
 * @desc Code to determine whether the active actor is the corruptor.
 * @default $gameParty.leader()?.actorId() === 5
 *
 * @param hudWindow
 * @text HUD Window
 *
 * @param hudWindowXOffset
 * @parent hudWindow
 * @text X Offset
 * @desc X offset from the right side of the screen.
 * @type number
 * @default 17
 *
 * @param hudWindowY
 * @parent hudWindow
 * @text Y
 * @desc Y coordinate of the HUD window.
 * @type number
 * @default 0
 *
 * @param hudWindowWidth
 * @parent hudWindow
 * @text Width
 * @desc Width of the HUD window rect.
 * @type number
 * @default 360
 *
 * @param maphud_background_normal
 * @text Normal HUD Background
 * @desc The image to use for the normal-sized HUD background.
 * @type file
 * @dir img/menu/
 * @default HUD_NORMAL_BG
 *
 * @param maphud_background_mini
 * @text Mini HUD Background
 * @desc The image to use for the mini-sized HUD background.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_MINI_BG
 *
 * @param maphud_background_ultramini
 * @text Ultramini HUD Background
 * @desc The image to use for the ultramini-sized HUD background
 * @type file
 * @dir img/menu/
 * @default HUD_ULTRAMINI_BG
 *
 * @param maphud_hudwindow_leader
 * @text Leader Settings
 *
 * @param maphud_hudwindow_leader_innermostframe
 * @parent maphud_hudwindow_leader
 * @text Leader Innermost Frame Image
 * @desc The image to use for the leader's innermost frame.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_LEADER_INNERMOST_FRAME
 *
 * @param maphud_hudwindow_leader_innerframe
 * @parent maphud_hudwindow_leader
 * @text Leader Inner Frame Image
 * @desc The image to use for the leader's inner frame.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_LEADER_INNER_FRAME
 *
 * @param maphud_hudwindow_leader_overlay
 * @parent maphud_hudwindow_leader
 * @text Leader Overlay Image
 * @desc The image to use for the leader's overlay.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_LEADER_OVERLAY
 *
 * @param maphud_hudwindow_leader_outerframe
 * @parent maphud_hudwindow_leader
 * @text Leader Outer Frame Image
 * @desc The image to use for the leader's outer frame.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_LEADER_OUTER_FRAME
 *
 * @param maphud_gauge
 * @text Gauge Settings
 *
 * @param maphud_gauge_leader
 * @text Leader Gauge
 *
 * @param maphud_gauge_leader_bgimage
 * @parent maphud_gauge_leader
 * @text BG Image
 * @desc Image to use for leader's gauge background.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_LEADER_BAR_BG
 *
 * @param maphud_gauge_leader_frameimage
 * @parent maphud_gauge_leader
 * @text Frame Image
 * @desc Image to use for leader's gauge frame.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_LEADER_BAR_FRAME
 *
 * @param maphud_gauge_leader_lightimage
 * @parent maphud_gauge_leader
 * @text Light Image
 * @desc Image to use for leader's gauge lights.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_LEADER_BAR_LIGHTS
 *
 * @param maphud_gauge_party
 * @text Party Gauges
 * @parent maphud_gauge
 *
 * @param maphud_gauge_party_bgimage
 * @parent maphud_gauge_party
 * @text BG Image
 * @desc Image to use for party's gauge background.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_PARTY_MEMBER_BAR_BG
 *
 * @param maphud_gauge_party_frameimage
 * @parent maphud_gauge_party
 * @text Frame Image
 * @desc Image to use for party's gauge frame.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_PARTY_MEMBER_BAR_FRAME
 *
 * @param maphud_gauge_party_lightimage
 * @parent maphud_gauge_party
 * @text Light Image
 * @desc Image to use for party's gauge lights.
 * @type file
 * @dir img/menu/
 * @default Map_HUD/HUD_PARTY_MEMBER_BAR_LIGHTS
 *
 * @param maphud_normalsettings
 * @text Normal Settings
 * @type struct<layoutsettings>
 * @default {"background":"Map_HUD/HUD_NORMAL_BG","partyframes":"","party_innermostframe":"Map_HUD/HUD_PARTY_MEMBER_NORMAL_INNERMOST_FRAME","party_innerframe":"Map_HUD/HUD_PARTY_MEMBER_NORMAL_INNER_FRAME","party_overlay":"Map_HUD/HUD_PARTY_MEMBER_NORMAL_OVERLAY","party_outerframe":"Map_HUD/HUD_PARTY_MEMBER_NORMAL_OUTER_FRAME","slot1position":"{\"x\":\"241\",\"y\":\"90\"}","slot2position":"{\"x\":\"241\",\"y\":\"165\"}","slot3position":"{\"x\":\"241\",\"y\":\"241\"}"}
 *
 * @param maphud_minisettings
 * @text Mini Settings
 * @type struct<layoutsettings>
 * @default {"background":"Map_HUD/HUD_MINI_BG","partyframes":"","party_innermostframe":"Map_HUD/HUD_PARTY_MEMBER_MINI_INNERMOST_FRAME","party_innerframe":"Map_HUD/HUD_PARTY_MEMBER_MINI_INNER_FRAME","party_overlay":"Map_HUD/HUD_PARTY_MEMBER_MINI_OVERLAY","party_outerframe":"Map_HUD/HUD_PARTY_MEMBER_MINI_OUTER_FRAME","slot1position":"{\"x\":\"250\",\"y\":\"83\"}","slot2position":"{\"x\":\"250\",\"y\":\"150\"}","slot3position":"{\"x\":\"250\",\"y\":\"217\"}"}
 *
 * @param maphud_ultraminisettings
 * @text Ultramini Settings
 * @type struct<layoutsettings>
 * @default {"background":"Map_HUD/HUD_ULTRAMINI_BG","partyframes":"","party_innermostframe":"Map_HUD/HUD_PARTY_MEMBER_ULTRAMINI_INNERMOST_FRAME","party_innerframe":"Map_HUD/HUD_PARTY_MEMBER_ULTRAMINI_INNER_FRAME","party_overlay":"Map_HUD/HUD_PARTY_MEMBER_ULTRAMINI_OVERLAY","party_outerframe":"Map_HUD/HUD_PARTY_MEMBER_ULTRAMINI_OUTER_FRAME","slot1position":"{\"x\":\"257\",\"y\":\"78\"}","slot2position":"{\"x\":\"257\",\"y\":\"130\"}","slot3position":"{\"x\":\"257\",\"y\":\"183\"}"}
 *
 */
/*~struct~layoutsettings:
 *
 * @param background
 * @text Background
 * @type file
 * @dir img/menu/
 *
 * @param partyframes
 * @text Party Frames
 *
 * @param party_innermostframe
 * @parent partyframes
 * @text Innermost Frame
 * @desc The image to use for a party member's innermost frame.
 * @type file
 * @dir img/menu/
 *
 * @param party_innerframe
 * @parent partyframes
 * @text Inner Frame
 * @desc The image to use for a party member's inner frame.
 * @type file
 * @dir img/menu/
 *
 * @param party_overlay
 * @parent partyframes
 * @text Overlay
 * @desc The image to use for a party member's overlay.
 * @type file
 * @dir img/menu/
 *
 * @param party_outerframe
 * @parent partyframes
 * @text Outer Frame
 * @desc The image to use for a party member's outer frame.
 * @type file
 * @dir img/menu/
 *
 * @param slot1position
 * @text Slot 1 Position
 * @type struct<coordinate>
 *
 * @param slot2position
 * @text Slot 2 Position
 * @type struct<coordinate>
 *
 * @param slot3position
 * @text Slot 3 Position
 * @type struct<coordinate>
 *
 */
/*~struct~coordinate:
 *
 * @param x
 * @type number
 * @default 0
 *
 * @param y
 * @type number
 * @default 0
 *
 */

window.parameters = PluginManager.parameters('TLB_SKAMapHUD');
TLB.Param = TLB.Param || {};
TLB.Param.SKAMH = TLB.Param.SKAMH || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAMH);

TLB.SKAMapHUD.displayImage = function(image, x, y, dest, errorMsg) {
	TLB.SKAUIBase.displayImage(image, x, y, dest, "TLB_SKAMapHUD", errorMsg);
};

TLB.SKAMapHUD.NONE = 0;
TLB.SKAMapHUD.NORMAL = 1;
TLB.SKAMapHUD.MINI = 2;
TLB.SKAMapHUD.ULTRAMINI = 3;

TLB.SKAMapHUD.HUDSIZES = 4;

TLB.SKAMapHUD.getSettings = function() {
	const params = TLB.Param.SKAMH;
	const hudSize = ConfigManager.hudsize;
	switch (hudSize) {
		case TLB.SKAMapHUD.MINI:
			return params.maphud_minisettings;
		case TLB.SKAMapHUD.ULTRAMINI:
			return params.maphud_ultraminisettings;
		default:
			return params.maphud_normalsettings;
	}
};

ConfigManager.hudsize = TLB.SKAMapHUD.NORMAL;

TLB.SKAMapHUD.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = TLB.SKAMapHUD.ConfigManager_makeData.call(this);
	config.hudsize = this.hudsize;
	return config;
};

TLB.SKAMapHUD.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	TLB.SKAMapHUD.ConfigManager_applyData.call(this, config);
	this.hudsize = this.readHUD(config, "hudsize");
};

ConfigManager.readHUD = function(config, name) {
    if (name in config) {
        return Number(config[name]).clamp(0, TLB.SKAMapHUD.HUDSIZES - 1);
    } else {
        return 1;
    }
};

TLB.SKAMapHUD.Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
	const params = TLB.Param.SKAMH;
	const images = [params.maphud_hudwindow_leader_innermostframe, params.maphud_hudwindow_leader_innerframe, params.maphud_hudwindow_leader_overlay, params.maphud_hudwindow_leader_outerframe, params.maphud_gauge_leader_bgimage, params.maphud_gauge_leader_frameimage, params.maphud_gauge_leader_lightimage, params.maphud_gauge_party_bgimage, params.maphud_gauge_party_frameimage, params.maphud_gauge_party_lightimage];
	const settings = TLB.SKAMapHUD.getSettings();
    TLB.SKAMapHUD.Scene_Map_create.call(this);
    images.push(settings.background, settings.party_innermostframe, settings.party_innerframe, settings.party_overlay, settings.party_outerframe);
	for (const image of images) {
		ImageManager.loadMenu(image);
	}
};

TLB.SKAMapHUD.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    TLB.SKAMapHUD.Scene_Map_createAllWindows.call(this);
    if (ConfigManager.hudsize > TLB.SKAMapHUD.NONE) this.createHUDWindow();
}

Scene_Map.prototype.createHUDWindow = function() {
    const rect = this.hudWindowRect();
    this._hudWindow = new Window_HUD(rect);
    this._hudWindow.alpha = 0;
    this.addChild(this._hudWindow);
}

Scene_Map.prototype.hudWindowRect = function() {
	const params = TLB.Param.SKAMH;
    const ww = params.hudWindowWidth;
    const wh = Graphics.height;
    let wx = Graphics.width - ww + params.hudWindowXOffset;
    if (eval(params.corruptionActorEval)) wx += 40;
    const wy = params.hudWindowY;
    return new Rectangle(wx, wy, ww, wh);
};

class Sprite_SKAMapLeaderGauge extends Sprite_SKAGauge {
	bitmapWidth() {
		return 54;
	}

	bitmapHeight() {
		return 14;
	}

	drawGaugeRect(x, y, width, height) {
		const params = TLB.Param.SKAMH;
		const bgImage = params.maphud_gauge_leader_bgimage;
		const bgSource = ImageManager.loadMenu(bgImage);
        this.bitmap.blt(bgSource, 0, 0, 50, 10, 2, 2, width - 4, height - 4);
        Sprite_Gauge.prototype.drawGaugeRect.call(this, x + 1, y - 9, width - 2, height - 2);
		const frameImage = params.maphud_gauge_leader_frameimage;
		const frameSource = ImageManager.loadMenu(frameImage);
		this.bitmap.blt(frameSource, 0, 0, 54, 14, 0, 0, width, height);
        const lightImage = params.maphud_gauge_leader_lightimage;
        const lightSource = ImageManager.loadMenu(lightImage);
        this.bitmap.blt(lightSource, 0, 0, 50, 10, 2, 2, width - 4, height - 4);
	}

    gaugeRate() {
        return Sprite_Gauge.prototype.gaugeRate.call(this);
    }
}

class Sprite_SKAMapPartyGauge extends Sprite_SKAGauge {
	bitmapWidth() {
		return 29;
	}

	bitmapHeight() {
		return 14;
	}

	drawGaugeRect(x, y, width, height) {
		const params = TLB.Param.SKAMH;
		const bgImage = params.maphud_gauge_party_bgimage;
		const bgSource = ImageManager.loadMenu(bgImage);
        this.bitmap.blt(bgSource, 0, 0, 29, 14, 0, 0, width, height);
        Sprite_Gauge.prototype.drawGaugeRect.call(this, x + 1, y - 9, width - 2, height - 2);
		const frameImage = params.maphud_gauge_party_frameimage;
		const frameSource = ImageManager.loadMenu(frameImage);
		this.bitmap.blt(frameSource, 0, 0, 29, 14, 0, 0, width, height);
        const lightImage = params.maphud_gauge_party_lightimage;
        const lightSource = ImageManager.loadMenu(lightImage);
        this.bitmap.blt(lightSource, 0, 0, 29, 14, 0, 0, width, height);
	}
}

TLB.SKAMapHUD.Window_Options_addInterfaceOptions = Window_Options.prototype.addInterfaceOptions;
Window_Options.prototype.addInterfaceOptions = function() {
	TLB.SKAMapHUD.Window_Options_addInterfaceOptions.call(this);
	this.addCommand("HUD Size", "hudsize");
};

TLB.SKAMapHUD.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);
    const value = this.getConfigValue(symbol);
    if (symbol === 'hudsize') {
        switch(value) {
            case TLB.SKAMapHUD.NONE:
                return "None";
            case TLB.SKAMapHUD.NORMAL:
                return "Normal";
            case TLB.SKAMapHUD.MINI:
                return "Mini";
            case TLB.SKAMapHUD.ULTRAMINI:
                return "Ultramini";
        }
    } else {
        return TLB.SKAMapHUD.Window_Options_statusText.call(this, index);
    }
};

TLB.SKAMapHUD.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (symbol === 'hudsize') {
        this.changeValue(symbol, (this.getConfigValue(symbol) + 1) % TLB.SKAMapHUD.HUDSIZES);
    } else {
        TLB.SKAMapHUD.Window_Options_processOk.call(this);
    }
};

TLB.SKAMapHUD.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (symbol === 'hudsize') {
        this.changeValue(symbol, (this.getConfigValue(symbol) + 1) % TLB.SKAMapHUD.HUDSIZES);
    } else {
        TLB.SKAMapHUD.Window_Options_cursorRight.call(this);
    }
};

TLB.SKAMapHUD.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (symbol === 'hudsize') {
        const max = TLB.SKAMapHUD.HUDSIZES;
        this.changeValue(symbol, (this.getConfigValue(symbol) - 1 + max) % max);
    } else {
        TLB.SKAMapHUD.Window_Options_cursorLeft.call(this);
    }
};

class Window_HUD extends Window_StatusBase {
    constructor(rect) {
        super(rect);

        this._normalGradient = ["#d9c5de", "#efe6f1", "#d9c5de"];

        this.createSprites();
        this.createParty();

        this._overlapRect = new Rectangle(this.x + 195, this.y, this.width, 0);
        this.opacity = 0;

        this._showCorruption = eval(TLB.Param.SKAUIB.showCorruption);
        this._showLewdness = eval(TLB.Param.SKAUIB.showLewdness);
        this._showVice = eval(TLB.Param.SKAUIB.showVice);
    }

    createSprites() {
		const settings = TLB.SKAMapHUD.getSettings();
        const pos1 = settings.slot1position;
        const pos2 = settings.slot2position;
        const pos3 = settings.slot3position;

        const partySize = $gameParty.size();

        const leaderSprite = this.createSlot(0);
        leaderSprite.position.set(195, 5);
        leaderSprite.alpha = partySize > 0 ? 1 : 0;

        const slot1Sprite = this.createSlot(1);
        slot1Sprite.position.set(pos1.x, pos1.y);
        slot1Sprite.alpha = partySize > 1 ? 1 : 0;

        const slot2Sprite = this.createSlot(2);
        slot2Sprite.position.set(pos2.x, pos2.y);
        slot2Sprite.alpha = partySize > 2 ? 1 : 0;

        const slot3Sprite = this.createSlot(3);
        slot3Sprite.position.set(pos3.x, pos3.y);
        slot3Sprite.alpha = partySize > 3 ? 1 : 0;

        this._partyFrames = [leaderSprite, slot1Sprite, slot2Sprite, slot3Sprite];
        this.addChild(leaderSprite);
        this.addChild(slot1Sprite);
        this.addChild(slot2Sprite);
        this.addChild(slot3Sprite);
    }

    createSlot(slotIndex) {
        const hudsize = ConfigManager.hudsize;

        let bitmapSize;
        let maskPos;
        let maskRadius;

        if (slotIndex === 0) {
            bitmapSize = 86;
            maskPos = 43;
            maskRadius = 34;
        } else {
            switch(hudsize) {
                case TLB.SKAMapHUD.NORMAL:
                    bitmapSize = 73;
                    maskPos = 36;
                    maskRadius = 30;
                    break;
                case TLB.SKAMapHUD.MINI:
                    bitmapSize = 66;
                    maskPos = 33;
                    maskRadius = 26;
                    break;
                case TLB.SKAMapHUD.ULTRAMINI:
                    bitmapSize = 52;
                    maskPos = 26;
                    maskRadius = 20;
                    break;
            }
        }

        const container = new PIXI.Container();
        container._baseLayer = new Sprite();
        container._baseLayer.bitmap = new Bitmap(bitmapSize, bitmapSize);
        container.addChild(container._baseLayer);
        container._gaugeContainer = new PIXI.Container();
        container.addChild(container._gaugeContainer);
        container._faceLayer = new Sprite();
        container._faceLayer.bitmap = new Bitmap(ImageManager.faceWidth, ImageManager.faceHeight);
        container.addChild(container._faceLayer);
        container._overlayLayer = new Sprite();
        container._overlayLayer.bitmap = new Bitmap(bitmapSize, bitmapSize);
        container.addChild(container._overlayLayer);
        container._attributeLayer = new Sprite();
        container._attributeLayer.bitmap = new Bitmap(250, 250);
        container._attributeLayer.x -= 100;
        container._attributeLayer.y -= 16;
        container.addChild(container._attributeLayer);
        container._textLayer = new Sprite();
        container._textLayer.bitmap = new Bitmap(250, 250);
        container._textLayer.x -= 100;
        container._textLayer.y -= 16;
        container.addChild(container._textLayer);

        container._attributeLayer.bitmap.letterSpacing = container._textLayer.bitmap.letterSpacing = 1;

        const maskCircle = new PIXI.Graphics()
            .beginFill("#ffffff")
            .drawCircle(maskPos, maskPos, maskRadius)
            .endFill();

        container._faceLayer.addChild(maskCircle);
        container._faceLayer.mask = maskCircle;

        return container;
    }

    drawFace(faceName, faceIndex, x, y, width, height, destBmp, destWidth, destHeight) {
        width = width || ImageManager.faceWidth;
        height = height || ImageManager.faceHeight;
        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
        const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
        destBmp.blt(bitmap, sx, sy, sw, sh, dx, dy, destWidth, destHeight);
    }

    drawAttributeValue(maxWidth, value, x, y) {
        const frame = this._partyFrames[0];
        const bitmap = frame._textLayer.bitmap;
        const textOptions = {
            outlineGradient: ["#4f4f4f", "#000000"],
		    outlineThickness: 2,
            dropShadow: true,
            dropShadowX: 0,
		    dropShadowY: 2,
            shadowOpacity: 0.75,
            bitmap: bitmap
        };
        this.contents.fontFace = bitmap.fontFace = 'franklin-gothic-demi-cond';
        this.contents.fontSize = bitmap.fontSize = 18;
        this.drawGradientText(value, this._normalGradient, x, y, maxWidth, "center", textOptions);
    }

    drawValue(maxWidth, value, maxValue, x, y, gradient, slot) {
        const frame = this._partyFrames[slot];
        const bitmap = frame._textLayer.bitmap;
        const textOptions = {
            outlineGradient: ["#4f4f4f", "#000000"],
		    outlineThickness: 2,
            dropShadow: true,
            dropShadowX: 0,
		    dropShadowY: 2,
            shadowOpacity: 0.75,
            bitmap: bitmap,
            bold: true
        };
        this.contents.fontFace = bitmap.fontFace = 'franklin-gothic-demi-cond';
        this.contents.fontSize = bitmap.fontSize = 18;
        this.drawGradientText(value, gradient, x, y, maxWidth, "left", textOptions);
        let textWidth = this.textWidth(value);
        this.contents.fontSize = bitmap.fontSize = 12;
        textWidth += this.textWidth(" ");
        this.contents.fontFace = bitmap.fontFace = 'fuckboi-sans';
        this.contents.fontSize = bitmap.fontSize = 17;
        this.drawGradientText("/", gradient, x + textWidth, y, maxWidth, "left", textOptions);
        textWidth += this.textWidth("/");
        this.contents.fontSize = bitmap.fontSize = 6;
        textWidth += this.textWidth(" ");
        this.contents.fontFace = bitmap.fontFace = 'franklin-gothic-demi-cond';
        this.contents.fontSize = bitmap.fontSize = 18;
        this.drawGradientText(maxValue, gradient, x + textWidth, y, maxWidth, "left", textOptions);
    }

    placeSKAGauge(actor, type, x, y) {
        const key = `slot${actor.index()}-gauge-${type}`;
        const spriteClass = actor.index() === 0 ? Sprite_SKAMapLeaderGauge : Sprite_SKAMapPartyGauge;
        const sprite = this.createInnerSprite(key, spriteClass, type, actor.index());
        sprite.setup(actor, type);
        sprite.move(x, y);
        sprite.show();
    }

    createInnerSprite(key, spriteClass, type, targetIndex) {
        const dict = this._additionalSprites;
        if (dict[key]) {
            return dict[key];
        } else {
            const sprite = new spriteClass(type);
            dict[key] = sprite;
            this.addInnerChild(sprite, targetIndex);
            return sprite;
        }
    }

    addInnerChild(child, targetIndex) {
        const frame = this._partyFrames[targetIndex];
        this._innerChildren.push(child);
        return frame._gaugeContainer.addChild(child);
    }

    createParty() {
        const params = TLB.Param.SKAMH;
        const hudsize = ConfigManager.hudsize;
        this._leadFaceSize = 86;
        this._leadHpX = 75;
        this._leadHpY = 21;
        this._leadMpX = 80;
        this._leadMpY = 36;
        this._wpX = 75;
        this._wpY = 51;
        let settings;
        let outerFrame;
        let innerFrame;
        let overlay;
        let innermostFrame;
        switch(hudsize) {
            case TLB.SKAMapHUD.NORMAL:
                settings = params.maphud_normalsettings;
                this._faceSize = 71;
                this._hpX = 65;
                this._hpY = 20;
                this._mpX = 65;
                this._mpY = 39;
                break;
            case TLB.SKAMapHUD.MINI:
                settings = params.maphud_minisettings;
                this._faceSize = 66;
                this._hpX = 56;
                this._hpY = 18;
                this._mpX = 56;
                this._mpY = 35;
                break;
            case TLB.SKAMapHUD.ULTRAMINI:
                settings = params.maphud_ultraminisettings;
                this._faceSize = 52;
                this._hpX = 42;
                this._hpY = 11;
                this._mpX = 42;
                this._mpY = 28;
                break;
        }
        for (let i = 0; i < 4; i++) {
            const frame = this._partyFrames[i];
            if ($gameParty.leader()?.actorId() === 5) {
                this.drawCorruption(TLB.Param.SKABH.battlehud_hudwindow_leader_corruptionicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
                this.drawLewdness(TLB.Param.SKABH.battlehud_hudwindow_leader_lewdnessicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
                this.drawVice(TLB.Param.SKABH.battlehud_hudwindow_leader_viceicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
            }
            if (i === 0) {
                outerFrame = params.maphud_hudwindow_leader_outerframe;
                innerFrame = params.maphud_hudwindow_leader_innerframe;
                overlay = params.maphud_hudwindow_leader_overlay;
                innermostFrame = params.maphud_hudwindow_leader_innermostframe;
            } else {
                outerFrame = settings.party_outerframe;
                innerFrame = settings.party_innerframe;
                overlay = settings.party_overlay;
                innermostFrame = settings.party_innermostframe;
            }
            TLB.SKAMapHUD.displayImage(outerFrame, 0, 0, frame._baseLayer.bitmap, `HUD slot ${i} outer frame not set.`);
            TLB.SKAMapHUD.displayImage(innerFrame, 0, 0, frame._baseLayer.bitmap, `HUD slot ${i} inner frame not set.`);
            TLB.SKAMapHUD.displayImage(overlay, 0, 0, frame._overlayLayer.bitmap, `HUD slot ${i} overlay not set.`);
            TLB.SKAMapHUD.displayImage(innermostFrame, 0, 0, frame._overlayLayer.bitmap, `HUD slot ${i} innermost frame not set.`);
        }
    }

    update() {
        if (SceneManager._scene.isMenuEnabled()) {
            this.contents.clear();
            for (const frame of this._partyFrames) {
                if (frame._faceLayer) frame._faceLayer.bitmap.clear();
            }
            if ($gameParty.size() > 0) this.updateParty();
            this.updateVisibility();
        }
        this.updateOpacity();
    }

    drawCorruption(icon, frame, textFrame) {
        if (this._showCorruption) {
            TLB.SKABattleHUD.displayImage(icon, 118, 85, frame, `Map HUD slot 0 corruption icon not set.`);
            const currentVar = TLB.Param.SKAB.currentCorruptionVar;
            const corruption = $gameVariables.value(currentVar);
            if (corruption !== frame._previousCorruption) {
                textFrame.clearRect(132, 88, 20, this.lineHeight());
                this.drawAttributeValue(20, corruption, 132, 88);
                frame._previousCorruption = corruption;
            }
        }
    }

    drawLewdness(icon, frame, textFrame) {
        if (this._showLewdness) {
            TLB.SKABattleHUD.displayImage(icon, 158, 13, frame, `Map HUD slot 0 lewdness icon not set.`);
            const currentVar = TLB.Param.SKAB.currentLewdnessVar;
            const lewdness = $gameVariables.value(currentVar);
            if (lewdness !== frame._previousLewdness) {
                textFrame.clearRect(168, 14, 20, this.lineHeight());
                this.drawAttributeValue(20, lewdness, 168, 14);
                frame._previousLewdness = lewdness;
            }
        }
    }

    drawVice(icon, frame, textFrame) {
        if (this._showVice) {
            TLB.SKABattleHUD.displayImage(icon, 87, 15, frame, `Map HUD slot 0 vice icon not set.`);
            const currentVar = TLB.Param.SKAB.currentViceVar;
            const vice = $gameVariables.value(currentVar);
            if (vice !== frame._previousVice) {
                textFrame.clearRect(97, 14, 20, this.lineHeight());
                this.drawAttributeValue(20, vice, 97, 14);
                frame._previousVice = vice;
            }
        }
    }

    updateParty() {
        for (const member of $gameParty.battleMembers()) {
            const frame = this._partyFrames[member.index()];
            if ($gameParty.leader().actorId() === 5) {
                this.drawCorruption(TLB.Param.SKABH.battlehud_hudwindow_leader_corruptionicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
                this.drawLewdness(TLB.Param.SKABH.battlehud_hudwindow_leader_lewdnessicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
                this.drawVice(TLB.Param.SKABH.battlehud_hudwindow_leader_viceicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
            }
            if (member.index() === 0) {
                if (member.actorId() !== 5) {
                    this.initializeGauge(member, "hp", this._leadHpX, this._leadHpY);
                    this.initializeGauge(member, "mp", this._leadMpX, this._leadMpY);
                    this.initializeGauge(member, "wp", this._wpX, this._wpY);
                }
                this.drawFace(member.faceName(), member.faceIndex(), 0 + (member.actor().statusFaceOffsetX || 0), 0 + (member.actor().statusFaceOffsetY || 0), ImageManager.faceWidth, ImageManager.faceHeight, frame._faceLayer.bitmap, this._leadFaceSize, this._leadFaceSize);
            } else {
                this.initializeGauge(member, "hp", this._hpX, this._hpY);
                this.initializeGauge(member, "mp", this._mpX, this._mpY);
                this.drawFace(member.faceName(), member.faceIndex(), 0 + (member.actor().statusFaceOffsetX || 0), 0 + (member.actor().statusFaceOffsetY || 0), ImageManager.faceWidth, ImageManager.faceHeight, frame._faceLayer.bitmap, this._faceSize, this._faceSize);
            }
            this.updateGauges(frame);
        }
        const wpGauge = this._additionalSprites[`slot0-gauge-wp`];
        if (wpGauge && $gameParty.leader().actorId() === 1 && eval(TLB.Param.SKAUIB.showWillpower)) {
            wpGauge.show();
        } else if (wpGauge) {
            wpGauge.hide();
        }
    }

    updateGauges(frame) {
        for (const child of frame._gaugeContainer.children) {
            if (child.update) {
                child.update();
            }
        }
    }

    initializeGauge(member, type, x, y) {
        const gauge = this._additionalSprites[`slot${member.index()}-gauge-${type}`];
        if (!gauge || gauge._battler !== member) this.placeSKAGauge(member, type, x, y);
    }

    updateOpacity() {
        const menuEnabled = SceneManager._scene.isMenuEnabled();
        if (menuEnabled === SceneManager._scene._menuEnabled || !ConfigManager.touchUI) {
            this._overlapRect.height = 100 + (90 * ($gameParty.size() - 1));
            if (menuEnabled && this._overlapRect.contains($gamePlayer.screenX(), $gamePlayer.screenY())) this.alpha = 0.2;
            else this.alpha = menuEnabled ? 1 : 0;
        }
    }

    updateVisibility() {
        for (const slot in this._partyFrames) {
            if ($gameParty.size() <= slot)
                this._partyFrames[slot].alpha = 0;
            else this._partyFrames[slot].alpha = 1;
        }
    }
}
