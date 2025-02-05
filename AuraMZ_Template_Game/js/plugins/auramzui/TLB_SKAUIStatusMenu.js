// Trilobytes - Star Knightess Aura UI Status Menu/
// TLB_SKAUIStatusMenu.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAUIStatusMenu = true;

window.TLB = TLB || {};
TLB.SKAUIStatusMenu = TLB.SKAUIStatusMenu || {};

/*:
 * @target MZ
 * @plugindesc This plugin modifies the status menu of Star Knightess
 * Aura to reflect the prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the base Scene_Status to match a
 * prototype specified by the client. It will not be compatible with any other
 * project and may not be used by anyone besides the client of the commission.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * PORTRAIT AND FACE NOTETAGS
 * The portrait (full-sized actor image) and face can be controlled with the
 * following notetags:
 *
 * <faceX:number>
 * Defines how many pixels off from the default X position the face graphic
 * will be in the status window's circular frame.
 *
 * <faceY:number>
 * Defines how many pixels off from the default Y position the face graphic
 * will be in the status window's circular frame.
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
 * @param statusmenu
 * @text Status Menu Settings
 *
 * @param statusmenu_statusparamswindow
 * @parent statusmenu
 * @text Status Params Window
 *
 * @param statusmenu_statusparamswindow_expbgimage
 * @parent statusmenu_statusparamswindow
 * @text Exp BG Image
 * @desc Filename of image to use for the status params exp background.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_EXP_BAR_BG
 *
 * @param statusmenu_statusparamswindow_bgimage
 * @parent statusmenu_statusparamswindow
 * @text BG Image
 * @desc Filename of image to use for the status params window background.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_STATS_BG
 *
 * @param statusmenu_statusparamswindow_x
 * @parent statusmenu_statusparamswindow
 * @text X
 * @desc X coordinate of the status params window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -227
 *
 * @param statusmenu_statusparamswindow_y
 * @parent statusmenu_statusparamswindow
 * @text Y
 * @desc Y coordinate of the status params window rect.
 * @type number
 * @default 141
 *
 * @param statusmenu_statusparamswindow_width
 * @parent statusmenu_statusparamswindow
 * @text Width
 * @desc Width of the status params window rect.
 * @type number
 * @default 432
 *
 * @param statusmenu_statusparamswindow_height
 * @parent statusmenu_statusparamswindow
 * @text Height
 * @desc Height of the status params window rect.
 * @type number
 * @default 295
 *
 * @param statusmenu_statuswindow
 * @text Status Window
 *
 * @param statusmenu_statuswindow_overlay
 * @parent statusmenu_statuswindow
 * @text Face Overlay
 * @desc Filename of image to use for the face overlay.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_LEADER_OVERLAY
 *
 * @param statusmenu_statuswindow_innermostframe
 * @parent statusmenu_statuswindow
 * @text Innemost Frame
 * @desc Filename of image to use for the face innermost frame.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_LEADER_INNERMOST_FRAME
 *
 * @param statusmenu_statuswindow_outerframe
 * @parent statusmenu_statuswindow
 * @text Outer Frame
 * @desc Filename of image to use for the face outer frame.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_LEADER_OUTER_FRAME
 *
 * @param statusmenu_statuswindow_corruptionicon
 * @parent statusmenu_statuswindow
 * @text Corruption Icon
 * @desc Filename of image to use for the corruption icon.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_CORRUPTION_ICON
 *
 * @param statusmenu_statuswindow_lewdnessicon
 * @parent statusmenu_statuswindow
 * @text Lewdness Icon
 * @desc Filename of image to use for the lewdness icon.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_LEWDNESS_ICON
 *
 * @param statusmenu_statuswindow_viceicon
 * @parent statusmenu_statuswindow
 * @text Vice Icon
 * @desc Filename of image to use for the vice icon.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_VICE_ICON
 *
 * @param statusmenu_statuswindow_x
 * @parent statusmenu_statuswindow
 * @text X
 * @desc X coordinate of the status window rect.
 * @type number
 * @default 193
 *
 * @param statusmenu_statuswindow_y
 * @parent statusmenu_statuswindow
 * @text Y
 * @desc Y coordinate of the status window rect.
 * @type number
 * @default 358
 *
 * @param statusmenu_statuswindow_width
 * @parent statusmenu_statuswindow
 * @text Width
 * @desc Width of the status window rect.
 * @type number
 * @default 540
 *
 * @param statusmenu_statuswindow_height
 * @parent statusmenu_statuswindow
 * @text Height
 * @desc Height of the status window rect.
 * @type number
 * @default 220
 *
 * @param statusmenu_equipwindow
 * @text Status Equip Window
 *
 * @param statusmenu_equipwindow_bg
 * @parent statusmenu_equipwindow
 * @text Background Image
 * @desc Filename of image to use for the status equip window background.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_EQUIPMENT_BG
 *
 * @param statusmenu_equipwindow_x_offset
 * @parent statusmenu_equipwindow
 * @text X Offset
 * @desc X offset from the left of the status params window.
 * @type number
 * @default 11
 *
 * @param statusmenu_equipwindow_y_offset
 * @parent statusmenu_equipwindow
 * @text Y Offset
 * @desc Y offset from the bottom of the status params window.
 * @type number
 * @min -9999
 * @max 9999
 * @default -2
 *
 * @param statusmenu_equipwindow_width
 * @parent statusmenu_equipwindow
 * @text Width
 * @desc Width of the equip window rect.
 * @type number
 * @default 411
 *
 * @param statusmenu_namewindow
 * @text Status Name Window
 *
 * @param statusmenu_namewindow_bg
 * @parent statusmenu_namewindow
 * @text Background Image
 * @desc Filename of image to use for the status name window background.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_NAME_CLASS_BG
 *
 * @param statusmenu_namewindow_x
 * @parent statusmenu_namewindow
 * @text X
 * @desc X coordinate of the name window rect.
 * @type number
 * @default 412
 *
 * @param statusmenu_namewindow_y
 * @parent statusmenu_namewindow
 * @text Y
 * @desc Y coordinate of the name window rect.
 * @type number
 * @default 86
 *
 * @param statusmenu_namewindow_width
 * @parent statusmenu_namewindow
 * @text Width
 * @desc Width of the name window rect.
 * @type number
 * @default 524
 *
 * @param statusmenu_namewindow_height
 * @parent statusmenu_namewindow
 * @text Height
 * @desc Height of the name window rect.
 * @type number
 * @default 130
 *
 * @param statusmenu_elementswindow
 * @text Status Elements Window
 *
 * @param statusmenu_elementswindow_noneicon
 * @parent statusmenu_elementswindow
 * @text None Icon
 * @desc Filename of image to use when actor is neither weak nor strong against an element.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_ELEMENT_ICON_NONE
 *
 * @param statusmenu_elementswindow_badicon
 * @parent statusmenu_elementswindow
 * @text Bad Icon
 * @desc Filename of image to use when actor is weak against an element.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_ELEMENT_ICON_BAD
 *
 * @param statusmenu_elementswindow_goodicon
 * @parent statusmenu_elementswindow
 * @text Good Icon
 * @desc Filename of image to use when actor is strong against an element.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_ELEMENT_ICON_GOOD
 *
 * @param statusmenu_elementswindow_frame
 * @parent statusmenu_elementswindow
 * @text Frame Image
 * @desc Filename of image to use for the element rate frame.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_ELEMENT_FRAME
 *
 * @param statusmenu_elementswindow_x
 * @parent statusmenu_elementswindow
 * @text X
 * @desc X coordinate of the elements window rect.
 * @type number
 * @default 438
 *
 * @param statusmenu_elementswindow_y
 * @parent statusmenu_elementswindow
 * @text Y
 * @desc Y coordinate of the elements window rect.
 * @type number
 * @default 228
 *
 * @param statusmenu_elementswindow_width
 * @parent statusmenu_elementswindow
 * @text Width
 * @desc Width of the elements window rect.
 * @type number
 * @default 492
 *
 * @param statusmenu_elementswindow_height
 * @parent statusmenu_elementswindow
 * @text Height
 * @desc Height of the elements window rect.
 * @type number
 * @default 138
 *
 * @param statusmenu_switcharrow
 * @text Party Member Switch Arrow
 *
 * @param statusmenu_switcharrow_bg
 * @parent statusmenu_switcharrow
 * @text Switch Arrow Background
 * @desc Filename of image to use for the page up/down background.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_ACTOR_SWITCH_ARROW_BG
 *
 * @param statusmenu_switcharrow_left
 * @parent statusmenu_switcharrow
 * @text Left Arrow Image
 * @desc Filename of image to use for the left arrow.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_ACTOR_SWITCH_ARROW_LEFT
 *
 * @param statusmenu_switcharrow_right
 * @parent statusmenu_switcharrow
 * @text Right Arrow Image
 * @desc Filename of image to use for the right arrow.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_ACTOR_SWITCH_ARROW_RIGHT
 *
 */

//----------------------------------------------------------------------------
//
// Parameter conversion
//
//----------------------------------------------------------------------------

window.parameters = PluginManager.parameters('TLB_SKAUIStatusMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKAUIStM = TLB.Param.SKAUIStM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAUIStM);

//-----------------------------------------------------------------------------
//
// Scene_Boot (existing class)
//
// Alias: start
//
//-----------------------------------------------------------------------------

TLB.SKAUIStatusMenu.Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	TLB.SKAUIStatusMenu.Scene_Boot_start.call(this);
	for (const actor of $dataActors) {
		if (!actor) continue;
		const meta = actor.meta;
		if (meta.faceX) actor.statusFaceOffsetX = Number(meta.faceX);
		if (meta.faceY) actor.statusFaceOffsetY = Number(meta.faceY);
	}
};

//-----------------------------------------------------------------------------
//
// Sprite_ExpGauge (new class)
// Inherits from Sprite_Gauge
//
// initialize
//
//-----------------------------------------------------------------------------

// Creating a specific class for SKA gauges is the best solution as
// the default is a uniform size and ours are all different.

function Sprite_ExpGauge() {
	this.initialize(...arguments);
}

Sprite_ExpGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_ExpGauge.prototype.constructor = Sprite_ExpGauge;

Sprite_ExpGauge.prototype.initialize = function() {
	Sprite.prototype.initialize.call(this);
	this.initMembers();
	this.createBitmap();
}

Sprite_ExpGauge.prototype.bitmapWidth = function() {
	return 396;
};

Sprite_ExpGauge.prototype.bitmapHeight = function() {
	return 25;
};

Sprite_ExpGauge.prototype.gaugeHeight = function() {
	return this.bitmapHeight();
};

Sprite_ExpGauge.prototype.gaugeX = function() {
	return 0;
};

Sprite_ExpGauge.prototype.currentValue = function() {
	if (this._battler) {
		if (this._battler.isMaxLevel()) return this._battler.currentLevelExp();
		return this._battler.nextLevelExp() - this._battler.currentLevelExp() - this._battler.nextRequiredExp();
	}
	return NaN;
};

Sprite_ExpGauge.prototype.currentMaxValue = function() {
	if (this._battler) {
		if (this._battler.isMaxLevel()) return this._battler.currentLevelExp();
		return this._battler.nextLevelExp() - this._battler.currentLevelExp();
	}
	return NaN;
};

Sprite_ExpGauge.prototype.gaugeColor1 = function() {
	return "#5d6ebb";
};

Sprite_ExpGauge.prototype.gaugeColor2 = function() {
	return "#7af9ae";
};

Sprite_ExpGauge.prototype.redraw = function() {
	this.bitmap.clear();
	const currentValue = this.currentValue();
	if (!isNaN(currentValue)) {
		this.drawGauge();
	}
};

Window_Status.prototype._createAllParts = function() {
	const params = TLB.Param.SKAUIStM;
	this.createSprites();
	Window.prototype._createAllParts.call(this);
	const overlaySprite = new Sprite();
	let image = params.statusmenu_statuswindow_overlay;
	let bitmap = ImageManager.loadMenu(image);
	const anchor = { x: 0.5, y: 0.5 };
	const spritePos = { x: 191, y: 83 };
	overlaySprite.anchor = anchor;
	overlaySprite.bitmap = bitmap;
	overlaySprite.move(spritePos.x, spritePos.y);
	this.addInnerChild(overlaySprite);
	const outerSprite = new Sprite();
	image = params.statusmenu_statuswindow_innermostframe;
	bitmap = ImageManager.loadMenu(image);
	outerSprite.anchor = anchor;
	outerSprite.bitmap = bitmap;
	outerSprite.move(spritePos.x, spritePos.y);
	this.addInnerChild(outerSprite);
};

Window_Status.prototype._createContentsSprite = function() {
	this._contentsSprite = new Sprite();
	this._clientArea.addChild(this._contentsSprite);
	this._faceLayer = new Sprite();
	this._faceLayer.bitmap = new Bitmap(520, 170);
	this._clientArea.addChild(this._faceLayer);
};

Window_Status.prototype.drawFace = function(
	faceName, faceIndex, x, y, width, height
) {
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
	this._faceLayer.bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy);
};

TLB.SKAUIStatusMenu.Window_Status_initialize = Window_Status.prototype.initialize;
Window_Status.prototype.initialize = function(rect) {
	const params = TLB.Param.SKAUIStM;
	TLB.SKAUIStatusMenu.Window_Status_initialize.call(this, rect);
	this.opacity = 0;
	let circle = new PIXI.Graphics()
		.lineStyle(0)
		.beginFill(0x66ffcc, 1)
		.drawCircle(203, 95, 63)
		.endFill();
	this.addChild(circle);
	this._faceLayer.mask = circle;
	if (eval(TLB.Param.SKAUIB.showCorruption)) {
		this._corruptionIcon = new Sprite();
		this._corruptionIcon.bitmap = ImageManager.loadMenu(params.statusmenu_statuswindow_corruptionicon);
		this._corruptionIcon.move(263, 25);
		this.addChild(this._corruptionIcon);
	}
	if (eval(TLB.Param.SKAUIB.showLewdness)) {
		this._lewdnessIcon = new Sprite();
		this._lewdnessIcon.bitmap = ImageManager.loadMenu(params.statusmenu_statuswindow_lewdnessicon);
		this._lewdnessIcon.move(287, 73);
		this.addChild(this._lewdnessIcon);
	}
	if (eval(TLB.Param.SKAUIB.showVice)) {
		this._viceIcon = new Sprite();
		this._viceIcon.bitmap = ImageManager.loadMenu(params.statusmenu_statuswindow_viceicon);
		this._viceIcon.move(275, 119);
		this.addChild(this._viceIcon);
	}
	this.refresh();
};

Window_Status.prototype.createSprites = function() {
	const sprite = new Sprite();
	let image = TLB.Param.SKAUIStM.statusmenu_statuswindow_outerframe;
	let bitmap = ImageManager.loadMenu(image);
	const anchor = { x: 0.5, y: 0.5 };
	sprite.anchor = anchor;
	sprite.bitmap = bitmap;
	sprite.move(203, 95);
	this.addChild(sprite);
};

Window_Status.prototype.placeSKAGauge = function(actor, type, x, y) {
	const key = "actor%1-gauge-%2".format(actor.actorId(), type);
	const sprite = this.createInnerSprite(key, Sprite_SKAItemGauge, type);
	sprite.setup(actor, type);
	sprite.move(x, y);
	this.drawGaugeLabel(sprite, 100, 8, 2);
	sprite.show();
};

Window_Status.prototype.placeSKALargeGauge = function(actor, type, x, y) {
	const key = "actor%1-gauge-%2".format(actor.actorId(), type);
	const sprite = this.createInnerSprite(key, Sprite_SKAGauge, type);
	sprite.setup(actor, type);
	sprite.move(x, y);
	this.drawGaugeLabel(sprite, sprite._statusType === "corruption" ? 191 : 198, 14, 7);
	sprite.show();
};

Window_Status.prototype.drawGaugeLabel = function(sprite, maxWidth, spaceSize, yOffset) {
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 14;
	const gradient = ["#d9c5dd", "#eee5f1", "#d9c5dd"];
	const label = sprite.label();
	const labelX = sprite.x + sprite.labelX();
	const labelY = sprite.y + yOffset;
	const labelWidth = this.textWidth(label);
	this.contents.letterSpacing = 1;
	this.drawGradientText(sprite.label(), gradient, labelX, labelY, labelWidth, "left", { outlineGradient: ["#4f4f4f", "#000000"], dropShadow: true, dropShadowX: 0, dropShadowY: 1, shadowOpacity: 0.75 });
	this.contents.resetLetterSpacing();
	this.drawGaugeValue(labelX, labelY, maxWidth, sprite.currentValue(), sprite.currentMaxValue(), spaceSize);
};

Window_Status.prototype.drawGaugeValue = function(x, y, maxWidth, current, max, spaceSize) {
	const gradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
	const textOptions = {
		outlineGradient: ["#4f4f4f", "#000000"],
		outlineThickness: 2,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75
	}
	let valueWidth = this.textWidth(max);
	this.drawGradientText(max, gradient, x, y, maxWidth, "right", textOptions);
	this.contents.fontFace = 'fuckboi-sans';
	this.contents.fontSize = 2;
	valueWidth += this.textWidth(" ");
	this.contents.fontSize = 13;
	this.drawGradientText("/", gradient, x, y, maxWidth - valueWidth, "right", textOptions);
	valueWidth += this.textWidth("/");
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = spaceSize;
	valueWidth += this.textWidth(" ");
	this.contents.fontSize = 14;
	this.drawGradientText(current, gradient, x, y, maxWidth - valueWidth, "right", textOptions);
};

Window_Status.prototype.placeSKAGauges = function(actor) {
	if (eval(TLB.Param.SKAUIB.showWillpower)) this.placeSKAGauge(actor, "wp", 10, 110);
	if (eval(TLB.Param.SKAUIB.showCorruption)) this.placeSKALargeGauge(actor, "corruption", 277, 29);
	if (eval(TLB.Param.SKAUIB.showLewdness)) this.placeSKALargeGauge(actor, "lewdness", 297, 74);
	if (eval(TLB.Param.SKAUIB.showVice)) this.placeSKALargeGauge(actor, "vice", 285, 120);
};

Window_Status.prototype.showIcons = function() {
	if (this._corruptionIcon) this._corruptionIcon.show();
	if (this._lewdnessIcon) this._lewdnessIcon.show();
	if (this._viceIcon) this._viceIcon.show();
};

Window_Status.prototype.hideIcons = function() {
	if (this._corruptionIcon) this._corruptionIcon.hide();
	if (this._lewdnessIcon) this._lewdnessIcon.hide();
	if (this._viceIcon) this._viceIcon.hide();
}

Window_Status.prototype.refresh = function() {
	Window_StatusBase.prototype.refresh.call(this);
	this._faceLayer.bitmap.clear();
	if (this._actor) {
		const actor = this._actor;
		let x = 160;
		let y = 147;
		this.placeSKAGauge(actor, "hp", 10, 36);
		this.placeSKAGauge(actor, "mp", 0, 73);
		this.drawActorFace(actor, 120 + (actor.actor().statusFaceOffsetX || 0), 10 + (actor.actor().statusFaceOffsetY || 0));
		if (actor.actorId() === 1) {
			this.placeSKAGauges(actor);
			this.showIcons();
		} else {
			this.hideIcons();
		}
		let lastX = x + ((ImageManager.iconWidth / 2) * Math.max(0, 3 - actor.allIcons().length));
		for (let i = 0; i < 3; ++i) {
			this.placeStateIcon(actor, lastX, y, i);
			lastX += ImageManager.iconWidth;
		}
	}
};

Window_StatusParams.prototype._createAllParts = function() {
	this.createSprites();
	Window.prototype._createAllParts.call(this);
};

TLB.SKAUIStatusMenu.Window_StatusParams_initialize = Window_StatusParams.prototype.initialize;
Window_StatusParams.prototype.initialize = function(rect) {
	TLB.SKAUIStatusMenu.Window_StatusParams_initialize.call(this, rect);
	this.opacity = 0;
};

Window_StatusParams.prototype.createSprites = function() {
	const sprite = new Sprite();
	let image = TLB.Param.SKAUIStM.statusmenu_statusparamswindow_expbgimage;
	let bitmap = ImageManager.loadMenu(image);
	sprite.bitmap = bitmap;
	sprite.move(21, 50);
	this.addChild(sprite);
	this._expBar = new Sprite_ExpGauge();
	sprite.addChild(this._expBar);
	this._backSprite = new Sprite();
	image = TLB.Param.SKAUIStM.statusmenu_statusparamswindow_bgimage;
	bitmap = ImageManager.loadMenu(image);
	this._backSprite.bitmap = bitmap;
	this.addChild(this._backSprite);
};

TLB.SKAUIStatusMenu.Window_StatusParams_drawAllItems = Window_StatusParams.prototype.drawAllItems;
Window_StatusParams.prototype.drawAllItems = function() {
	TLB.SKAUIStatusMenu.Window_StatusParams_drawAllItems.call(this);
	this._expBar.setup(this._actor, "");
	this.drawLevel();
	this.drawExp();
	this.drawLabels();
};

Window_StatusParams.prototype.drawLevel = function() {
	const labelX = 7;
	const valueX = 123;
	const y = 6;
	this.contents.fontFace = "franklin-gothic-med";
	this.contents.fontSize = 30;
	let textWidth = this.textWidth("LEVEL");
	this.contents.drawLevel("LEVEL", labelX, y, textWidth, "left");
	textWidth = this.textWidth("99");
	this.contents.drawLevel(this._actor.level, valueX, y, textWidth, "center");

};

Window_StatusParams.prototype.drawExp = function() {
	let labelX = 160;
	let textWidth;
	const width = 244;
	const gradient = ["#d9c4de", "#eee5f1", "#d9c5dd"];
	let y = 11;
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 16;
	const textOptions = {
		outlineThickness: 2,
		outlineGradient: ["#4f4f4f", "#000000"],
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 2,
		shadowOpacity: 0.75
	}

	const spacing = this.contents.letterSpacing;
	if (this._actor.isMaxLevel()) {
		this.drawGradientText("MAX", gradient, labelX, y, width, "right", textOptions);
		textWidth = this.textWidth(this.applySpacing("MAX", spacing));
	} else {
		this.drawGradientText(this.nextExp(), gradient, labelX, y, width, "right", textOptions);
		textWidth = this.textWidth(this.applySpacing(this.nextExp(), spacing));
		this.contents.fontSize = 2;
		textWidth += this.textWidth(" ");
		this.contents.fontSize = 15;
		this.contents.fontFace = 'fuckboi-sans';
		this.drawGradientText("/", gradient, labelX, y, width - textWidth, "right", textOptions);
		textWidth += this.textWidth("/");
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 10;
		textWidth += this.textWidth(" ");
		this.contents.fontSize = 16;
		this.drawGradientText(this.currentExp(), gradient, labelX, y, width - textWidth, "right", textOptions);
		textWidth += this.textWidth(this.currentExp());
	}
	this.contents.fontSize = 19;
	labelX = labelX + width - textWidth - 35;
	textWidth = this.textWidth(this.applySpacing("EXP", spacing));
	this.drawGradientText("EXP", gradient, labelX, y, width - textWidth, "left", textOptions);
};

Window_StatusParams.prototype.drawLabels = function() {
	const x = 12;
	let y = 74;
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 18;
	const labelPairs = [["HEALTH", "HP"], ["MANA", "MP"], ["ATTACK", "ATK"], ["DEFENSE", "DEF"], ["MAGICAL ATTACK", "MATK"], ["MAGICAL DEFENSE", "MDEF"], ["AGILITY", "AGI"], ["LUCK", "LUK"]];
	for (const labelPair of labelPairs) {
		this.drawLabel(labelPair[0], labelPair[1], x, y);
		y += 24;
	}
};

Window_StatusParams.prototype.drawLabel = function(longLabel, shortLabel, x, y) {
	const gradient = ["#d4a9e5", "#b5b0e6"];
	const textOptions = {
		outlineThickness: 2,
		outlineGradient: ["#4f4f4f", "#000000"],
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75
	};
	this.contents.letterSpacing = 1;
	this.drawGradientText(longLabel, gradient, x, y, 172, "center", textOptions);
	this.contents.resetLetterSpacing();
	x += 172;
	this.drawGradientText(shortLabel, gradient, x, y, 70, "center", textOptions);
	this.contents.paintOpacity = 255;
};

Window_StatusParams.prototype.currentExp = function() {
	return this.nextExp() - this._actor.nextRequiredExp();
};

Window_StatusParams.prototype.nextExp = function() {
	return this._actor.nextLevelExp() - this._actor.currentLevelExp();
};

Window_StatusParams.prototype.lineHeight = function() {
	return 24;
};

Window_StatusParams.prototype.maxItems = function() {
	return 8;
};

Window_StatusParams.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	rect.x += 243;
	rect.y += 74;
	const paramId = index;
	const value = this._actor.param(paramId);
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 18;
	let gradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
	const textOptions = {
		outlineThickness: 2,
		outlineGradient: ["#4f4f4f", "#000000"],
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75
	};
	this.drawGradientText(value, gradient, rect.x, rect.y, 72, "center", textOptions);
	rect.x += 72;
	const baseParam = this._actor.paramBase(paramId) + this._actor._paramPlus[paramId];
	const paramDiff = this._actor.param(paramId) - baseParam;
	if (paramDiff > 0) gradient = ['#65a74f', '#8dcd77	', '#65a74f'];
	else if (paramDiff < 0) gradient = ['#bb5c79', '#ea8b72', '#bb5c79'];
	else gradient = ['#887a8c', '#a397a7', '#7e7281'];
	const diffString = `(${paramDiff >= 0 ? '+' : '-'}${Math.abs(paramDiff)})`;
	this.drawGradientText(diffString, gradient, rect.x, rect.y, 70, "center", textOptions);

};

Window_StatusEquip.prototype._createAllParts = function() {
	this.createSprites();
	Window.prototype._createAllParts.call(this);
};

TLB.SKAUIStatusMenu.Window_StatusEquip_initialize = Window_StatusEquip.prototype.initialize;
Window_StatusEquip.prototype.initialize = function(rect) {
	TLB.SKAUIStatusMenu.Window_StatusEquip_initialize.call(this, rect);
	this.opacity = 0;
};

Window_StatusEquip.prototype.createSprites = function() {
	this._backSprite = new Sprite();
	let image = TLB.Param.SKAUIStM.statusmenu_equipwindow_bg;
	let bitmap = ImageManager.loadMenu(image);
	this._backSprite.bitmap = bitmap;
	this.addChild(this._backSprite);
};

Window_StatusEquip.prototype.lineHeight = function() {
	return 36;
};

Window_StatusEquip.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	rect.x -= 12;
	rect.y += 6;
	const items = this.items(this._actor);
	const item = items[index];
	const slotName = item.slot;
	const sw = 120;
	this.changeTextColor(ColorManager.systemColor());
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 18;
	this.drawGradientText(slotName, ["#a5acdc", "#6b73a5"], rect.x, rect.y, sw, "center", { outlineThickness: 2, outlineGradient: ["#4f4f4f", "#000000"], dropShadow: true, dropShadowX: 0, dropShadowY: 2, shadowOpacity: 0.75 });
	this.drawItemName(item, rect.x + 50, rect.y, rect.width);
};

Window_StatusEquip.prototype.drawItemName = function(item, x, y, width) {
	if (item) {
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 18;
		const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
		const textMargin = ImageManager.iconWidth + 13;
		const itemWidth = Math.max(0, width - textMargin);
		this.resetTextColor();
		this.drawIcon(item.iconIndex, x, iconY);
		const gradient = ['#d9c4de', '#eee5f1', '#d9c5dd'];
		this.drawGradientText(item.name, gradient, x + textMargin, y, itemWidth, "center", { outlineThickness: 1, dropShadow: true, dropShadowX: 0, dropShadowY: 1, shadowOpacity: 0.75 });
	}
};

function toItem(skill, label) {
	return {
		slot: label.toUpperCase(),
		name: skill?.name || '---'
	};
}

Window_StatusEquip.prototype.items = function(actor) {
	const skills = {
		auto: actor.autoSkill(),
		enhance: actor.enhanceSkill(),
		stance: actor.stanceSkill()
	};
	return Object.entries(skills).map(([label, skill]) => toItem(skill, label));
};

Window_StatusEquip.prototype.maxItems = function() {
    return 3;
};

Window_StatusEquip.prototype.windowHeight = function() {
	const rows = this.maxItems();
    const height = Scene_Base.prototype.calcWindowHeight(rows, false);
	return height;
};

function Window_StatusName() {
	this.initialize(...arguments);
}

Window_StatusName.prototype = Object.create(Window_Base.prototype);
Window_StatusName.prototype.constructor = Window_StatusName;

Window_StatusName.prototype._createAllParts = function() {
	this.createSprites();
	Window.prototype._createAllParts.call(this);
};

Window_StatusName.prototype.createSprites = function() {
	this._backSprite = new Sprite();
	let image = TLB.Param.SKAUIStM.statusmenu_namewindow_bg;
	let bitmap = ImageManager.loadMenu(image);
	this._backSprite.bitmap = bitmap;
	this.addChild(this._backSprite);
};

Window_StatusName.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	this._actor = null;
	this.opacity = 0;
};

Window_StatusName.prototype.setActor = function(actor) {
	if (this._actor != actor) {
		this._actor = actor;
		this.refresh();
	}
};

Window_StatusName.prototype.refresh = function() {
	this.contents.clear();
	this.contents.fontFace = 'franklin-gothic-med-cond';
	this.contents.fontSize = 60;
	if (this._actor) {
		const nameX = 10;
		const nameY = 16;
		const classX = 15;
		const classY = 72;
		const gradient = ["#c08f56", "#743e5a"];
		const name = this._actor.name().toUpperCase();
		this.drawGradientText(name, gradient, nameX, nameY, this.contentsWidth(), "center", { angle: -0.03 });
		this.contents.fontSize = 26;
		const actorClass = this._actor.currentClass().name.toUpperCase();
		this.drawGradientText(actorClass, gradient, classX, classY, this.contentsWidth(), "center", { angle: -0.03 });
	}
};

function Window_StatusElements() {
	this.initialize(...arguments);
}

Window_StatusElements.prototype = Object.create(Window_Base.prototype);
Window_StatusElements.prototype.constructor = Window_StatusElements;

Window_StatusElements.prototype._createAllParts = function() {
	this.createSprites();
	Window.prototype._createAllParts.call(this);
};

Window_StatusElements.prototype.createSprites = function() {
	const params = TLB.Param.SKAUIStM;
	const elevations = this.elevations();
	let x = 4;
	let y = 0;
	for (let i = 0; i < 8; i++) {
		const sprite = new Sprite();
		sprite.bitmap = ImageManager.loadMenu(params.statusmenu_elementswindow_noneicon);
		sprite.move(x, y);
		const frameSprite = new Sprite();
		frameSprite.bitmap = ImageManager.loadMenu(params.statusmenu_elementswindow_frame);
		frameSprite.move(11, 27);
		sprite.addChild(frameSprite);
		this.addChild(sprite);

		x += 61;
		y -= elevations[i];
	}
};

Window_StatusElements.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	this._actor = null;
	this.opacity = 0;
};

Window_StatusElements.prototype.elements = function() {
	return [1, 2, 4, 5, 6, 7, 8, 9];
};

Window_StatusElements.prototype.iconList = function() {
	return [77, 64, 66, 67, 68, 69, 70, 71];
};

Window_StatusElements.prototype.elevations = function() {
	return [1, 2, 2, 3, 2, 2, 2, 0];
};

Window_StatusElements.prototype.drawIcons = function() {
	const icons = this.iconList();
	const elevations = [1, 2, 2, 3, 2, 2, 2, 0];
	let x = 5;
	let y = 17;
	for (let i = 0; i < 8; i++) {
		this.drawIcon(icons[i], x, y);
		x += 61;
		y -= elevations[i];
	}
};

Window_StatusElements.prototype.setActor = function(actor) {
	if (this._actor != actor) {
		this._actor = actor;
		this.refresh();
	}
};

Window_StatusElements.prototype.refresh = function() {
	this.contents.clear();
	this.drawIcons();
	if (this._actor) {
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 24;
		const gradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
		const textOptions = { outlineThickness: 2, outlineGradient: ["#4f4f4f", "#000000"], dropShadow: true, dropShadowX: 0, dropShadowY: 2, shadowOpacity: 0.75 };
		const elements = this.elements();
		const elevations = this.elevations();
		let x = 0;
		let y = 49;
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			const rate = this._actor.elementRate(element);
			const baseRate = this._actor.baseElementRate(element);
			const elementRateLabel = this.elementRateLabel(rate);
			const elementRateIcon = this.elementRateIcon(rate, baseRate);
			this.drawGradientText(elementRateLabel, gradient, x, y, 42, "center", textOptions);
			this.children[i].bitmap = ImageManager.loadMenu(elementRateIcon);

			x += 61;
			y -= elevations[i];
		}
	}
};

Window_StatusElements.prototype.elementRateLabel = function(rate) {
	if (rate < 1) return "RS";
	else if (rate > 1) return "WK";
	return "-";
}

Window_StatusElements.prototype.elementRateIcon = function(rate, baseRate) {
	const params = TLB.Param.SKAUIStM;

	if (rate > baseRate) return params.statusmenu_elementswindow_badicon;
	else if (rate < baseRate)return params.statusmenu_elementswindow_goodicon;
	else return params.statusmenu_elementswindow_noneicon;
}

TLB.SKAUIStatusMenu.Scene_Status_create = Scene_Status.prototype.create;
Scene_Status.prototype.create = function() {
	TLB.SKAUIStatusMenu.Scene_Status_create.call(this);
	this.createStatusNameWindow();
	this.createStatusElementsWindow();
	this.createPortrait();
};

Scene_Status.prototype.needsPageButtons = function() {
	return $gameParty.size() > 1;
};

Scene_Status.prototype.createStatusWindow = function() {
	const rect = this.statusWindowRect();
	this._statusWindow = new Window_Status(rect);
	this._statusWindow.setHandler("cancel", this.popScene.bind(this));
	this._statusWindow.setHandler("pagedown", this.nextActor.bind(this));
	this._statusWindow.setHandler("pageup", this.previousActor.bind(this));
	this.addWindow(this._statusWindow);
	this._profileWindow.hide();
};

Scene_Status.prototype.statusWindowRect = function() {
	const params = TLB.Param.SKAUIStM;
	const wx = params.statusmenu_statuswindow_x;
	const wy = params.statusmenu_statuswindow_y;
	const ww = params.statusmenu_statuswindow_width;
	const wh = params.statusmenu_statuswindow_height;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.statusParamsWindowRect = function() {
	const params = TLB.Param.SKAUIStM;
	const wx = params.statusmenu_statusparamswindow_x;
	const wy = params.statusmenu_statusparamswindow_y;
	const ww = params.statusmenu_statusparamswindow_width;
	const wh = params.statusmenu_statusparamswindow_height;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.statusEquipWindowRect = function() {
	const params = TLB.Param.SKAUIStM;
	const wx = this._statusParamsWindow.x + params.statusmenu_equipwindow_x_offset;
	const wy = this._statusParamsWindow.y + this._statusParamsWindow.height + params.statusmenu_equipwindow_y_offset;
	const ww = params.statusmenu_equipwindow_width;
	const wh = Window_StatusEquip.prototype.windowHeight();
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.createStatusNameWindow = function() {
	const rect = this.statusNameWindowRect();
	this._statusNameWindow = new Window_StatusName(rect);
	this.addChild(this._statusNameWindow);
};

Scene_Status.prototype.statusNameWindowRect = function() {
	const params = TLB.Param.SKAUIStM;
	const wx = params.statusmenu_namewindow_x;
	const wy = params.statusmenu_namewindow_y;
	const ww = params.statusmenu_namewindow_width;
	const wh = params.statusmenu_namewindow_height;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.createStatusElementsWindow = function() {
	const rect = this.statusElementsWindowRect();
	this._statusElementsWindow = new Window_StatusElements(rect);
	this.addChild(this._statusElementsWindow);
};

Scene_Status.prototype.statusElementsWindowRect = function() {
	const params = TLB.Param.SKAUIStM;
	const wx = params.statusmenu_elementswindow_x;
	const wy = params.statusmenu_elementswindow_y;
	const ww = params.statusmenu_elementswindow_width;
	const wh = params.statusmenu_elementswindow_height;
	return new Rectangle(wx, wy, ww, wh);
};

TLB.SKAUIStatusMenu.Scene_Status_refreshActor = Scene_Status.prototype.refreshActor;
Scene_Status.prototype.refreshActor = function() {
	const actor = this.actor();
	TLB.SKAUIStatusMenu.Scene_Status_refreshActor.call(this);
	this._statusNameWindow.setActor(actor);
	this._statusElementsWindow.setActor(actor);
	this.updatePortrait(actor);
};

Scene_Status.prototype.createButton = function(image, clickCallback) {
	const button = new Sprite_Clickable();
	button.loadButtonImage = () => button.bitmap = ImageManager.loadMenu(image);
	button.update = () => {
		Sprite.prototype.update.call(button);
		button.updateFrame();
		button.processTouch();
	}
	button.updateFrame = () => {
		button.bitmap = ImageManager.loadMenu(image);
		button.opacity = button._pressed ? 192 : 255;
		button.children[0].style.fill = button.isPressed() ? ['#dbba81'] : ['#d9c4de', '#eee5f1', '#d9c5dd'];
	}
	button.onClick = clickCallback;

	return button;
};

Scene_Status.prototype.createPageButtons = function() {
	const params = TLB.Param.SKAUIStM;
	const pageFrame = new Sprite();
	pageFrame.bitmap = ImageManager.loadMenu(params.statusmenu_switcharrow_bg);
	pageFrame.move(1137, 37);
	const textOptions = {
		fill: ['#d9c4de', '#eee5f1', '#d9c5dd'],
		fontFamily: 'franklin-gothic-med',
		fontSize: 23,
		stroke: "#000000",
		strokeThickness: 1,
		fontWeight: "bold",
		dropShadow: true,
		dropShadowDistance: 2,
		dropShadowBlur: 2
	}
	const keys = Object.keys(Input.keyMapper);
	const pageup = TLB.SKABase.getKey("pageup");
	const pagedown = TLB.SKABase.getKey("pagedown");
	const puText = new PIXI.Text(String.fromCharCode(pageup), textOptions);
	const pdText = new PIXI.Text(String.fromCharCode(pagedown), textOptions);
	puText.position.set(24, 13);
	pdText.position.set(7, 13);
	this._pageupButton = this.createButton(params.statusmenu_switcharrow_left, () => this.previousActor());
	this._pageupButton.position.set(18, 14);
	this._pageupButton.addChild(puText);
	this._pagedownButton = this.createButton(params.statusmenu_switcharrow_right, () => this.nextActor());
	this._pagedownButton.position.set(71, 14);
	this._pagedownButton.addChild(pdText);
	pageFrame.addChild(this._pageupButton);
	pageFrame.addChild(this._pagedownButton);
	if (Input.isControllerConnected()) {
		pdText.alpha = 0;
		puText.alpha = 0;
		const leftButton = new Sprite_ControllerButton("pageup");
		const rightButton = new Sprite_ControllerButton("pagedown");
		leftButton.position.set(16, 13);
		rightButton.position.set(4, 13);
		this._pageupButton.addChild(leftButton);
		this._pagedownButton.addChild(rightButton);
	}
	this.addChild(pageFrame);
};

Scene_Status.prototype.createPortrait = function() {
	this._shadowSprite = new Sprite();
	this._portraitSprite = new Sprite();
	this._shadowSprite.alpha = 0.75;
	this._shadowSprite.move(Graphics.boxWidth - 12, 0);
	this._portraitSprite.move(Graphics.boxWidth, 3);
	this.addChild(this._shadowSprite);
	this.addChild(this._portraitSprite);
};

Scene_Status.prototype.updatePortrait = function(actor) {
	const portrait = actor._portraitName || actor.actor().portraitName;
	if (portrait) {
		const portraitX = Graphics.boxWidth + (actor._portraitOffsetX || actor.actor().portraitOffsetX || 0);
		const portraitY = actor._portraitOffsetY || actor.actor().portraitOffsetY || 0;
		const scale = actor._portraitScale || actor.actor().portraitScale || 1;
		const shadowX = portraitX - 12;
		const shadowY = portraitY - 3;
		this._shadowSprite.scale.x = this._portraitSprite.scale.x = scale;
		this._shadowSprite.scale.y = this._portraitSprite.scale.y = scale;

		const container = new PIXI.Container();
		const silhouette = new Sprite();
		silhouette.bitmap = ImageManager.loadPortrait(portrait);
		container.addChild(silhouette);
		silhouette.filters = [new PIXI.filters.ColorOverlayFilter([1, 1, 1])];
		this._shadowSprite.bitmap = new Bitmap(silhouette.width, silhouette.height);
		this._shadowSprite.bitmap.gradientFillRect(0, 0, silhouette.width, silhouette.height, "#c08f56", "#743e5a", true)
		const texture = Graphics.app.renderer.generateTexture(container);
		const mask = new PIXI.Sprite(texture);
		this._shadowSprite.children = [];
		this._shadowSprite.addChild(mask);
		this._shadowSprite.mask = mask;

		this._shadowSprite.move(shadowX, shadowY);
		this._portraitSprite.bitmap = ImageManager.loadPortrait(portrait);
		this._portraitSprite.move(portraitX, portraitY);
		this._shadowSprite.show();
		this._portraitSprite.show();
	} else {
		this._shadowSprite.hide();
		this._portraitSprite.hide();
	}
};
