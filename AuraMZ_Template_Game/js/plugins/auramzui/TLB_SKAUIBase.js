// Trilobytes - Star Knightess Aura Base/
// TLB_SKAUIBase.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAUIBase = true;

window.TLB = window.TLB || {};
TLB.SKAUIBase = TLB.SKAUIBase || {};

/*:
 * @target MZ
 * @plugindesc This plugin provides base functions shared by other UI plugins.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a base plugin which provides utility and shared functions which will
 * be used by other UI plugins.
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
 * @command changePortrait
 * @text Change Portrait
 * @desc Change an actor's portrait image.
 *
 * @arg actorId
 * @text Actor ID
 * @desc The ID of the actor whose portrait will be changed.
 * @type actor
 * @default 1
 *
 * @arg filename
 * @text Filename
 * @desc The filename of the image.
 * @type file
 * @dir img/portraits/
 * @default Aura
 *
 * @arg statusOffsetX
 * @text Status Menu X Offset
 * @type number
 * @desc The X offset of the portrait on the status menu.
 * @max 1280
 * @min -1280
 * @default 0
 *
 * @arg statusOffsetY
 * @text Status Menu Y Offset
 * @type number
 * @desc The Y offset of the portrait on the status menu.
 * @max 720
 * @min -720
 * @default 0
 *
 * @arg statusScale
 * @text Status Menu Scale
 * @type number
 * @desc The decimal scale percentage of the status portrait (1 = 100%)
 * @max 1.00
 * @min 0.00
 * @decimals 2
 * @default 1
 *
 * @arg bustX
 * @text Bust Source X
 * @type number
 * @desc The X coordinate on the portrait image to start the main menu bust slice from.
 * @max 1280
 * @min 0
 * @default 0
 *
 * @arg bustY
 * @text Bust Source Y
 * @type number
 * @desc The Y coordinate on the portrait image to start the main menu bust slice from.
 * @max 1280
 * @min 0
 * @default 0
 *
 * @param mainmenu_portraits
 * @type struct<portrait>[]
 * @text Portrait Settings
 * @desc Settings for actor portraits.
 * @default []
 *
 * @param extraFonts
 * @text Extra Fonts
 * @type struct<font>[]
 * @desc Additional fonts to be loaded for menus.
 * @default ["{\"referenceString\":\"franklin-gothic-med\",\"filename\":\"framd.ttf\"}","{\"referenceString\":\"franklin-gothic-med-cond\",\"filename\":\"FRAMDCN.TTF\"}","{\"referenceString\":\"franklin-gothic-demi\",\"filename\":\"FRADM.TTF\"}","{\"referenceString\":\"franklin-gothic-demi-cond\",\"filename\":\"FRADMCN.TTF\"}","{\"referenceString\":\"franklin-gothic-heavy\",\"filename\":\"FRAHV.TTF\"}","{\"referenceString\":\"fuckboi-sans\",\"filename\":\"FUCKBOI_SANS_BY_MRKRAZYMAN.TTF\"}"]
 *
 * @param menu_settings
 * @text Base Menu Settings
 *
 * @param menu_backgroundimage
 * @parent menu_settings
 * @text Background Image
 * @desc Image to use as the background.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_BG_BACK
 *
 * @param menu_upper_backgroundimage
 * @parent menu_settings
 * @text Upper Background Image
 * @desc Image to use as the upper background on menus.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_BG_FRONT_TOP
 *
 * @param menu_lower_backgroundimage
 * @parent menu_settings
 * @text Lower Background Image
 * @desc Image to use as the lower background on menus.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_BG_FRONT_DOWN
 *
 * @param menu_lower_xoffset
 * @parent menu_settings
 * @text Lower Background X Offset
 * @desc X offset of the lower background.
 * @type number
 * @max 1280
 * @min -1280
 * @default 0
 *
 * @param menu_lower_yoffset
 * @parent menu_settings
 * @text Lower Background Y Offset
 * @desc Y offset of the lower background.
 * @type number
 * @max 720
 * @min -720
 * @default 618
 *
 * @param menu_mid_backgroundimage
 * @parent menu_settings
 * @text Mid Background Image
 * @desc Image to use for the mid background.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/BGII
 *
 * @param gold
 * @text Gold
 * @parent menu_settings
 *
 * @param gold_icon
 * @parent gold
 * @text Gold Icon
 * @desc Filename for gold icon.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_GOLD_ICON
 *
 * @param gold_fontsize
 * @parent gold
 * @text Font Size
 * @desc Font size to use for gold value.
 * @type number
 * @default 22
 *
 * @param gold_gradient
 * @parent gold
 * @text Gradient
 * @desc Gradient to use for the gold display
 * @default ["#ab8845", "#d8b976", "#ab8745"]
 *
 * @param textoutlinegradient
 * @parent menu_settings
 * @text Text Outline Gradient
 * @desc General outline gradient to use for text.
 * @default ["#4f4f4f", "#000000"]
 *
 * @param itemwindow_cursorimage
 * @parent menu_settings
 * @text Item Window Cursor Image
 * @desc Filename of image to use for the item window cursor.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_WINDOW_SELECT
 *
 * @param arrowimage
 * @parent menu_settings
 * @text Arrow Image
 * @desc Filename of image to use for the up/down arrows.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_ARROW_DOWN_ICON
 *
 * @param cancelbutton
 * @parent menu_settings
 * @text Cancel Button
 *
 * @param cancelbutton_image
 * @parent cancelbutton
 * @text Image
 * @desc Filename to use for cancel button image.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_ARROW
 *
 * @param cancelbutton_width
 * @parent cancelbutton
 * @text Width
 * @desc Width of cancel button.
 * @type number
 * @default 70
 *
 * @param cancelbutton_height
 * @parent cancelbutton
 * @text Height
 * @desc Height of cancel button.
 * @type number
 * @default 52
 *
 * @param cancelbutton_xoffset
 * @parent cancelbutton
 * @text X Offset
 * @desc The X coordinate offset from origin.
 * @type number
 * @max 1280
 * @min -1280
 * @default -229
 *
 * @param cancelbutton_yoffset
 * @parent cancelbutton
 * @text Y Offset
 * @desc The Y coordinate offset from origin.
 * @type number
 * @max 720
 * @min -720
 * @default 4
 *
 * @param helpwindow
 * @parent menu_settings
 * @text Help Window Settings
 *
 * @param helpwindow_bgimage
 * @parent helpwindow
 * @text BG Image
 * @desc Filename of image to use for the help window.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_HELP_BG
 *
 * @param categorywindow
 * @parent menu_settings
 * @text Category Window Settings
 *
 * @param categorywindow_cursorimage
 * @parent menu_settings
 * @text Category Window Cursor Image
 * @desc Filename of image to use for the category window cursor.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_CATEGORY_SELECT
 *
 * @param categorywindow_topbgimage
 * @parent categorywindow
 * @text Top BG Image
 * @desc Filename of image to use for the first category.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_CATEGORY_BG_MAIN
 *
 * @param categorywindow_bgimage
 * @parent categorywindow
 * @text BG Image
 * @desc Filename of image to use for categories besides the first.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_CATEGORY_BG
 *
 * @param itemwindow
 * @text Item Window Settings
 *
 * @param itemwindow_bgimage
 * @parent itemwindow
 * @text BG Image
 * @desc Filename of image to use for the item window.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_WINDOW_BG
 *
 * @param itemwindow_contentimage
 * @parent itemwindow
 * @text Content Image
 * @desc Filename to use for scrolling content background.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_CONTENT_BG
 *
 * @param actorwindow
 * @parent menu_settings
 * @text Actor Window (Item/Skill selection)
 *
 * @param actorwindow_bgimage
 * @parent actorwindow
 * @text BG Image
 * @desc Filename of image to use for actor window background.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_ACTORS_BG
 *
 * @param actorwindow_actorbgimage_active
 * @parent actorwindow
 * @text Inactive Actor BG Image
 * @desc Filename of image to use for active actor background.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_ACTORS_BG_ACTIVE
 *
 * @param actorwindow_actorbgimage_inactive
 * @parent actorwindow
 * @text Active Actor BG Image
 * @desc Filename of image to use for inactive actor background.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_ACTORS_BG_INACTIVE
 *
 * @param actorwindow_actorbgimage_locked
 * @parent actorwindow
 * @text Locked Actor BG Image
 * @desc Filename of image to use for locked actor background.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_ACTORS_BG_LOCKED
 *
 * @param actorwindow_actornameframe_locked
 * @parent actorwindow
 * @text Locked Name Frame Image
 * @desc Filename of image to use for locked actor name frame.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_ACTORS_NAME_FRAME_LOCKED
 *
 * @param actorwindow_actornameframe_unlocked
 * @parent actorwindow
 * @text Unlocked Name Frame Image
 * @desc Filename of image to use for unlocked actor name frame.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_ACTORS_NAME_FRAME_UNLOCKED
 *
 * @param actorwindow_actornameframe_star_unlocked
 * @parent actorwindow
 * @text Unlocked Star Image
 * @desc Filename of image to use for the upper star when unlocked.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_STAR_ICON_UNLOCKED
 *
 * @param actorwindow_actornameframe_star_locked
 * @parent actorwindow
 * @text Locked Star Image
 * @desc Filename of image to use for the upper star when locked.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_STAR_ICON_LOCKED
 *
 * @param actorwindow_gauge_bgimage
 * @parent actorwindow
 * @text Gauge BG Image
 * @desc Filename of image to use for gauge background.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_ACTORS_GAUGE_BG
 *
 * @param actorwindow_gauge_frameimage
 * @parent actorwindow
 * @text Gauge Frame Image
 * @desc Filename of image to use for gauge frame.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_ACTORS_GAUGE_FRAME
 *
 * @param actorwindow_gauge_wpframeimage
 * @parent actorwindow
 * @text WP Gauge Frame Image
 * @desc Filename of image to use for WP gauge frame.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_ACTORS_WPGAUGE_FRAME
 *
 * @param actorwindow_gauge_wpthresholdwidth
 * @parent actorwindow
 * @text WP Gauge Threshold Width
 * @desc Width of WP threshold area.
 * @type number
 * @max 1280
 * @default 64
 *
 * @param actorwindow_gauge_wpthresholdmultiplier
 * @parent actorwindow
 * @text WP Gauge Threshold Multiplier
 * @desc The multiplier to use to get from value to filled pixels.
 * @type number
 * @default 1
 *
 * @param backgroundopacity
 * @parent menu_settings
 * @text Background Opacity
 * @desc Opacity of the backround image.
 * @type number
 * @default 192
 *
 * @param dimmer
 * @text Dimmer Sprite
 *
 * @param dimmer_image
 * @parent dimmer
 * @text Dimmer Image
 * @desc Filename of image to use for dimmer.
 * @type file
 * @dir img/menu/
 * @default Item_Menu/ITEM_MENU_SHADE
 *
 * @param dimmer_opacity
 * @parent dimmer
 * @text Opacity
 * @desc Opacity of the dimmer image.
 * @type number
 * @max 255
 * @default 220
 *
 * @param showConditions
 * @text Show Conditions
 *
 * @param showGold
 * @parent showConditions
 * @text Show Gold Condition
 * @desc The condition that must be met for gold to be displayed.
 * @default true
 *
 * @param showCorruption
 * @parent showConditions
 * @text Show Corruption Condition
 * @desc The condition that must be met for corruption to be displayed.
 * @default true
 *
 * @param showLewdness
 * @parent showConditions
 * @text Show Lewdness Condition
 * @desc The condition that must be met for lewdness to be displayed.
 * @default true
 *
 * @param showVice
 * @parent showConditions
 * @text Show Vice Condition
 * @desc The condition that must be met for vice to be displayed.
 * @default true
 *
 * @param showWillpower
 * @parent showConditions
 * @text Show Willpower Condition
 * @desc The condition that must be met for willpower to be displayed.
 * @default true
 *
 * @param corruptionGauge
 * @text Corruption Gauge
 *
 * @param corruptiongauge_barborder
 * @parent corruptionGauge
 * @text Bar Border
 * @desc Image to use for the border of the bar.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/CORRUPTION_BAR_BORDER
 *
 * @param corruptiongauge_width
 * @parent corruptionGauge
 * @text Width
 * @desc Width of corruption gauge.
 * @type number
 * @max 1280
 * @default 204
 *
 * @param corruptiongauge_height
 * @parent corruptionGauge
 * @text Height
 * @desc Height of corruption gauge.
 * @type number
 * @max 720
 * @default 19
 *
 * @param corruptiongauge_color1
 * @parent corruptionGauge
 * @text Gauge Color 1
 * @desc First color to use for gauge gradient.
 * @default #ba5554
 *
 * @param corruptiongauge_color2
 * @parent corruptionGauge
 * @text Gauge Color 2
 * @desc Second color to use for gauge gradient.
 * @default #fba081
 *
 * @param lewdnessGauge
 * @text Lewdness Gauge
 *
 * @param lewdnesscolor1
 * @parent lewdnessGauge
 * @text Color 1
 * @desc First color to use for gradient on lewdness bars.
 * @default #c04c62
 *
 * @param lewdnesscolor2
 * @parent lewdnessGauge
 * @text Color 2
 * @desc Second color to use for gradient on lewdness bars.
 * @default #f87eb4
 *
 * @param viceGauge
 * @text Vice Gauge
 *
 * @param vicecolor1
 * @parent viceGauge
 * @text Color 1
 * @desc First color to use for gradient on vice bars.
 * @default #a39b43
 *
 * @param vicecolor2
 * @parent viceGauge
 * @text Color 2
 * @desc Second color to use for gradient on vice bars.
 * @default #fbd97e
 *
 * @param wpGauge
 * @text Willpower Gauge
 *
 * @param wpgauge_width
 * @parent wpGauge
 * @text Width
 * @desc Width of WP gauge.
 * @type number
 * @max 1280
 * @default 220
 *
 * @param wpgauge_height
 * @parent wpGauge
 * @text Height
 * @desc Height of WP gauge.
 * @type number
 * @max 720
 * @default 21
 *
 * @param wpgauge_color1
 * @parent wpGauge
 * @text Gauge Color 1
 * @desc First color to use for gauge gradient.
 * @default #8ea644
 *
 * @param wpgauge_color2
 * @parent wpGauge
 * @text Gauge Color 2
 * @desc Second color to use for gauge gradient.
 * @default #e1e748
 *
 * @param wpgauge_separatorthreshold
 * @parent wpGauge
 * @text Separator Threshold
 * @desc The value at which the last threshold lies.
 * @type Number
 * @default 60
 *
 * @param wpgauge_thresholdwidth
 * @parent wpGauge
 * @text Threshold Width
 * @desc The width of the threshold area.
 * @type number
 * @max 1280
 * @default 128
 *
 * @param wpgauge_thresholdmultiplier
 * @parent wpGauge
 * @text Threshold Multiplier
 * @desc The multiplier to use to get from value to filled pixels.
 * @type number
 * @decimals 2
 * @default 2.1
 *
 * @param hpMpGauge
 * @text HP/MP Gauge
 *
 * @param hpmpgauge_bgimage
 * @parent hpMpGauge
 * @text BG Image
 * @desc Filename of the background image for the gauge.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_ACTOR_GAUGE_BG
 *
 * @param hpmpgauge_width
 * @parent hpMpGauge
 * @text Width
 * @desc Width of HP/MP gauges.
 * @type number
 * @max 1280
 * @default 204
 *
 * @param hpmpgauge_height
 * @parent hpMpGauge
 * @text Height
 * @desc Height of HP/MP gauges.
 * @type number
 * @max 720
 * @default 14
 *
 */
/*~struct~portrait:
 * @param actorId
 * @text Actor ID
 * @type actor
 * @desc The actor to define portrait settings for.
 *
 * @param filename
 * @text Image Filename
 * @type file
 * @desc The filename for the full portrait.
 * @dir img/portraits/
 *
 * @param statusOffsetX
 * @text Status Menu X Offset
 * @type number
 * @desc The X offset of the portrait on the status menu.
 * @max 1280
 * @min -1280
 * @default 0
 *
 * @param statusOffsetY
 * @text Status Menu Y Offset
 * @type number
 * @desc The Y offset of the portrait on the status menu.
 * @max 720
 * @min -720
 * @default 0
 *
 * @param statusScale
 * @text Status Menu Scale
 * @type number
 * @desc The decimal scale percentage of the status portrait (1 = 100%)
 * @decimals 2
 * @max 1
 * @default 1
 *
 * @param bustX
 * @text Bust Source X
 * @type number
 * @desc The X coordinate on the portrait image to start the main menu bust slice from.
 * @max 1280
 * @default 0
 *
 * @param bustY
 * @text Bust Source Y
 * @type number
 * @desc The Y coordinate on the portrait image to start the main menu bust slice from.
 * @max 720
 * @default 0
 */
/*~struct~font:
 * @param referenceString
 * @text Reference String
 * @desc String used to reference the font in code.
 *
 * @param filename
 * @text Font Filename
 * @desc The filename of the font.
 */

//----------------------------------------------------------------------------
//
// Parameters conversion
//
//----------------------------------------------------------------------------

window.parameters = PluginManager.parameters('TLB_SKAUIBase');
TLB.Param = TLB.Param || {};
TLB.Param.SKAUIB = TLB.Param.SKAUIB || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAUIB);

TLB.SKAUIBase.loadImages = function(images) {
	for (const image of images) {
		if (image) {
			ImageManager.loadMenu(image);
		} else {
			TLB.SKABase.displayError('TLB_SKAUIBase', `TLB UI Base error: tried to display undefined image in ${new Error().stack?.split("\n")[2].trim().split(" ")[1]}`);
		}
	}
};

TLB.SKAUIBase.displayImage = function(image, x, y, dest, pluginName, errorMsg) {
	if (image) {
		const bitmap = ImageManager.loadMenu(image);
		bitmap.addLoadListener(() =>
			dest.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y));
	} else {
		TLB.SKABase.displayError(pluginName, errorMsg);
	}
};

TLB.SKAUIBase.getCaller = function() {
	return new Error().stack?.split("\n")[2].trim().split(" ")[1]
};

// Data for use with main menu and status menu portraits
TLB.Param.SKAUIB.portraitData = {};
for (const parsedData of TLB.Param.SKAUIB.mainmenu_portraits || []) {
	TLB.Param.SKAUIB.portraitData[parsedData.actorId] = {
		filename: parsedData.filename,
		statusOffsetX: parsedData.statusOffsetX,
		statusOffsetY: parsedData.statusOffsetY,
		statusScale: parsedData.statusScale,
		bustX: parsedData.bustX,
		bustY: parsedData.bustY
	};
}

//-----------------------------------------------------------------------------
//
// Plugin commands
//
// changePortrait - changes potrait settings for a given actor
//
//-----------------------------------------------------------------------------

PluginManager.registerCommand("TLB_SKAUIBase", "changePortrait", args => {
	const actorId = args.actorId;
	const actor = $gameActors.actor(actorId);

	if (args.filename !== "") actor._portraitName = args.filename;
	if (args.statusOffsetX !== "") actor._portraitOffsetX = parseInt(args.offsetX) || 0;
	if (args.statusOffsetY !== "") actor._portraitOffsetY = parseInt(args.offsetY) || 0;
	if (args.portraitScale !== "") actor._portraitScale = parseInt(args.scale) || 1;
	if (args.bustX !== "") actor._bustX = parseInt(args.bustX) || 0;
	if (args.bustY !== "") actor._bustY = parseInt(args.bustY) || 0;
});

//-----------------------------------------------------------------------------
//
// Bitmap (existing class)
//
// New function: drawLevel(text, x, y, maxWidth align)
//
//-----------------------------------------------------------------------------

Bitmap.prototype.drawLevel = function(text, x, y, maxWidth, align) {
	let ctx = this.context;
	let lineHeight = 24;
	let tx = x;
	let ty = Math.round(y + lineHeight / 2 + this.fontSize * 0.35);
	ctx.save();
	ctx.font = this._makeFontNameText();
	ctx.textAlign = align;
	ctx.textBaseLine = "alphabetic";
	ctx.globalAlpha = 0.75;
	ctx.lineJoin = "round";
	const metrics = ctx.measureText(text);
	const ascent = metrics.actualBoundingBoxAscent;
	let outerGrad2 = ctx.createLinearGradient(tx, ty - ascent, tx, ty);
	outerGrad2.addColorStop(0, "#4f4f4f");
	outerGrad2.addColorStop(1, "#000000");
	ctx.strokeStyle = outerGrad2;
	ctx.lineWidth = 4;
	ctx.shadowColor = '#000000';
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 2;
	ctx.shadowBlur = 2;
	ctx.strokeText(text, tx, ty, maxWidth);
	ctx.shadowColor = "rgba(0, 0, 0, 0)";
	let outerGrad = ctx.createLinearGradient(tx, ty - ascent, tx, ty);
	outerGrad.addColorStop(0, "#5b69bb");
	outerGrad.addColorStop(1, "#7afaad");
	ctx.strokeStyle = outerGrad;
	ctx.lineWidth = 2;
	ctx.strokeText(text, tx, ty, maxWidth);
	ctx.globalAlpha = 1;
	let innerGrad = ctx.createLinearGradient(tx, ty - ascent, tx, ty);
	innerGrad.addColorStop(0, "#d9c4de");
	innerGrad.addColorStop(0.5, "#eee5f1");
	innerGrad.addColorStop(1, "#d9c5dd");
	ctx.fillStyle = innerGrad;
	ctx.fillText(text, tx, ty, maxWidth);
	this._baseTexture.update();
	ctx.restore();
};

Bitmap.prototype.toDataURL = function() {
	const png = this._canvas.toDataURL('image/png');
	const jpeg = this._canvas.toDataURL('image/jpeg');
	return (png.length < jpeg.length) ? png : jpeg;
};

//-----------------------------------------------------------------------------
//
// ImageManager (existing class)
//
// New function: loadMenu(filename)
// New function: loadPortrait(filename)
//
//-----------------------------------------------------------------------------

ImageManager.loadMenu = function(filename) {
	if (filename) {
		return this.loadBitmap("img/menu/", filename);
	} else {
		TLB.SKABase.displayError('TLB_SKAUIBase', `TLB UI Base error: tried to display undefined menu image in ${new Error().stack?.split("\n")[2].trim().split(" ")[1]}`);
	}
};

ImageManager.loadPortrait = function(filename) {
	if (filename) {
		return this.loadBitmap("img/portraits/", filename);
	} else {
		TLB.SKABase.displayError('TLB_SKAUIBase', `TLB UI Base error: tried to display undefined portrait image in ${new Error().stack?.split("\n")[2].trim().split(" ")[1]}`);
	}
};

//-----------------------------------------------------------------------------
//
// Scene_Boot (existing class)
// Inherits from Scene_Base
//
// Alias: loadGameFonts
// Alias: start
//
//-----------------------------------------------------------------------------

TLB.SKAUIBase.Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function() {
	TLB.SKAUIBase.Scene_Boot_loadGameFonts.call(this);
	for (const font of TLB.Param.SKAUIB.extraFonts) {
		FontManager.load(font.referenceString, font.filename);
	}
};

TLB.SKAUIBase.Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	TLB.SKAUIBase.Scene_Boot_start.call(this);
	for (const actor of $dataActors) {
		if (!actor) continue;
		const data = TLB.Param.SKAUIB.portraitData[actor.id];
		if (data) {
			actor.portraitName = data.filename;
			actor.portraitOffsetX = data.statusOffsetX;
			actor.portraitOffsetY = data.statusOffsetY;
			actor.portraitScale = data.statusScale;
			actor.bustX = data.bustX;
			actor.bustY = data.bustY;
		}
	}
};

//-----------------------------------------------------------------------------
//
// Scene_MenuBase (existing class)
// Inherits from Scene_Base
//
// Alias: create
// Alias: createBackground
// Overwrite: createCancelButton
//
//-----------------------------------------------------------------------------

TLB.SKAUIBase.Scene_MenuBase_create = Scene_MenuBase.prototype.create;
Scene_MenuBase.prototype.create = function() {
	TLB.SKAUIBase.Scene_MenuBase_create.call(this);
	const params = TLB.Param.SKAUIB;
	const images = [params.menu_backgroundimage, params.menu_upper_backgroundimage, params.menu_lower_backgroundimage, params.menu_mid_backgroundimage];
	TLB.SKAUIBase.loadImages(images);
}

TLB.SKAUIBase.Scene_MenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	const params = TLB.Param.SKAUIB;
	TLB.SKAUIBase.Scene_MenuBase_createBackground.call(this);
	this._backgroundSprite2 = new Sprite();
	let image = params.menu_backgroundimage;
	const opacity = params.backgroundopacity;
	this._backgroundSprite2.bitmap = ImageManager.loadMenu(image);
	this._backgroundSprite2.opacity = opacity;
	this.addChild(this._backgroundSprite2);
	const upperBg = new Sprite();
	image = params.menu_upper_backgroundimage;
	upperBg.bitmap = ImageManager.loadMenu(image);
	this.addChild(upperBg);
	const lowerBg = new Sprite();
	image = params.menu_lower_backgroundimage;
	lowerBg.bitmap = ImageManager.loadMenu(image);
	lowerBg.position.set(params.menu_lower_xoffset, params.menu_lower_yoffset);
	this.addChild(lowerBg);
	const midBg = new Sprite();
	image = params.menu_mid_backgroundimage;
	midBg.bitmap = ImageManager.loadMenu(image);
	this.addChild(midBg);
};

Scene_MenuBase.prototype.createCancelButton = function() {
	const params = TLB.Param.SKAUIB;
    this._cancelButton = new Sprite_SKACancelButton("cancel");
    this._cancelButton.x = params.cancelbutton_xoffset;
    this._cancelButton.y = params.cancelbutton_yoffset;
    this.addWindow(this._cancelButton);
};

//-----------------------------------------------------------------------------
//
// Scene_ItemBase (existing class)
//
// Overwrite: actorWindowRect
//
//-----------------------------------------------------------------------------

Scene_ItemBase.prototype.createActorWindow = function() {
    const rect = this.actorWindowRect();
    this._actorWindow = new Window_MenuActor(rect);
    this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
    this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
    this.addChild(this._actorWindow);
};

Scene_ItemBase.prototype.actorWindowRect = function() {
    const wx = 543;
    const wy = 22;
    const ww = 574;
    const wh = 680;
    return new Rectangle(wx, wy, ww, wh);
};

// Creating a specific class for SKA gauges is the best solution as
// the default is a uniform size and ours are all different.

//-----------------------------------------------------------------------------
//
// Sprite_SKAGauge (new class)
// Inherits from Sprite_Gauge
//
// Can't write this with £S6 class syntax because we need to insert the
// initialisation of _statusType between initMembers and createBitmap in order
// to accurately calculate gauge width and height, which we can't do if we call
// the super Sprite_Gauge constructor.
//
// New function: labelX
// Override: initialize(statusType) (from Sprite_Gauge)
// Override: bitmapWidth (from Sprite_Gauge)
// Override: bitmapHeight (from Sprite_Gauge)
// Override: gaugeHeight (from Sprite_Gauge)
// Override: gaugeX (from Sprite_Gauge)
// Override: isValid (from Sprite_Gauge)
// Overrite: currentValue (from Sprite_Gauge)
// Override: currentMaxValue (from Sprite_Gauge)
// Override: label (from Sprite_Gauge)
// Override: gaugeColor1 (from Sprite_Gauge)
// Override: gaugeColor2 (from Sprite_Gauge)
// Override: redraw (from Sprite_Gauge)
// Override: drawGaugeRect(x, y, width, height) (from Sprite_Gauge)
// Override: gaugeRate (from Sprite_Gauge)
//
//-----------------------------------------------------------------------------

function Sprite_SKAGauge() {
	this.initialize(...arguments);
}

Sprite_SKAGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_SKAGauge.prototype.constructor = Sprite_SKAGauge;

Sprite_SKAGauge.prototype.labelX = function() {
	switch (this._statusType) {
		case "hp":
		case "mp":
		case "lewdness":
		case "vice":
		case "wp":
			return 2;
		case "corruption":
			return 11;
		default:
			return 0;
	}
};

Sprite_SKAGauge.prototype.initialize = function(statusType) {
	Sprite.prototype.initialize.call(this);
	this.initMembers();
	this._statusType = statusType;
	this.createBitmap();
}

Sprite_SKAGauge.prototype.bitmapWidth = function() {
	const params = TLB.Param.SKAUIB;
	switch (this._statusType) {
		case "corruption":
		case "lewdness":
		case "vice":
			return params.corruptiongauge_width;
		case "wp":
			return params.wpgauge_width;
		case "hp":
		case "mp":
			return params.hpmpgauge_width;
	}
};

Sprite_SKAGauge.prototype.bitmapHeight = function() {
	const params = TLB.Param.SKAUIB;
	switch (this._statusType) {
		case "corruption":
		case "lewdness":
		case "vice":
			return params.corruptiongauge_height;
		case "wp":
			return params.wpgauge_height;
		case "hp":
		case "mp":
			return params.hpmpgauge_height;
	}
};

Sprite_SKAGauge.prototype.gaugeHeight = function() {
	return this.bitmapHeight();
};

Sprite_SKAGauge.prototype.gaugeX = function() {
	return 0;
};

Sprite_SKAGauge.prototype.isValid = function() {
	switch (this._statusType) {
		case "corruption":
		case "lewdness":
		case "vice":
		case "wp":
			return true;
	}
	return Sprite_Gauge.prototype.isValid.call(this);
};

Sprite_SKAGauge.prototype.currentValue = function() {
	const params = TLB.Param.SKAB;
	let variableId;
	switch (this._statusType) {
		case "corruption":
			variableId = params.currentCorruptionVar;
			return $gameVariables.value(variableId);
		case "lewdness":
			variableId = params.currentLewdnessVar;
			return $gameVariables.value(variableId);
		case "vice":
			variableId = params.currentViceVar;
			return $gameVariables.value(variableId);
		case "wp":
			variableId = params.currentWpVar;
			return $gameVariables.value(variableId);
		default:
			return Sprite_Gauge.prototype.currentValue.call(this);
	}
};

Sprite_SKAGauge.prototype.currentMaxValue = function() {
	const params = TLB.Param.SKAB;
	let variableId;
	switch (this._statusType) {
		case "corruption":
			variableId = params.maxCorruptionVar;
			return $gameVariables.value(variableId);
		case "lewdness":
			return params.maxLewdness;
		case "vice":
			return params.maxVice;
		case "wp":
			variableId = params.maxWpVar;
			return $gameVariables.value(variableId);
		default:
			return Sprite_Gauge.prototype.currentMaxValue.call(this);
	}
};

Sprite_SKAGauge.prototype.label = function() {
	switch (this._statusType) {
		case "wp":
			return "WP";
		case "corruption":
			return "CORRUPTION";
		case "lewdness":
			return "LEWDNESS";
		case "vice":
			return "VICE";
		default:
			return Sprite_Gauge.prototype.label.call(this);
	}
};

Sprite_SKAGauge.prototype.gaugeColor1 = function() {
	const params = TLB.Param.SKAUIB;
	switch (this._statusType) {
		case "corruption":
			return params.corruptiongauge_color1;
		case "lewdness":
			return params.lewdnesscolor1;
		case "vice":
			return params.vicecolor1;
		case "wp":
			return params.wpgauge_color1;
		default:
			return Sprite_Gauge.prototype.gaugeColor1.call(this);
	}
};

Sprite_SKAGauge.prototype.gaugeColor2 = function() {
	const params = TLB.Param.SKAUIB;
	switch (this._statusType) {
		case "corruption":
			return params.corruptiongauge_color2;
		case "lewdness":
			return params.lewdnesscolor2;
		case "vice":
			return params.vicecolor2;
		case "wp":
			return params.wpgauge_color2;
		default:
			return Sprite_Gauge.prototype.gaugeColor2.call(this);
	}
};

Sprite_SKAGauge.prototype.redraw = function() {
	this.bitmap.clear();
	const currentValue = this.currentValue();
	if (!isNaN(currentValue)) {
		this.drawGauge();
	}
};

Sprite_SKAGauge.prototype.drawWpRect = function(x, y, width, height, yOffset, thresholdWidth, thresholdMultiplier) {
	const params = TLB.Param.SKAUIB;
	const rate = this.gaugeRate();
	const threshold = params.wpgauge_separatorthreshold;
	const fillW = this.currentValue() <= threshold ? this.currentValue() * thresholdMultiplier : thresholdWidth + Math.floor((width - thresholdWidth) * rate);
	const fillH = height - 2;
	const color0 = this.gaugeBackColor();
	const color1 = this.gaugeColor1();
	const color2 = this.gaugeColor2();
	this.bitmap.fillRect(x, y, width, height, color0);
	this.bitmap.gradientFillRect(x + 1, y + yOffset, fillW, fillH, color1, color2);
};

Sprite_SKAGauge.prototype.drawGaugeRect = function(x, y, width, height) {
	const params = TLB.Param.SKAUIB;
	if (this._statusType === "wp") {
		const thresholdWidth = params.wpgauge_thresholdwidth;
		const thresholdMultiplier = params.wpgauge_thresholdmultiplier;
		this.drawWpRect(x, y, width, height, 1, thresholdWidth, thresholdMultiplier);
	} else {
		let image;
		let width;
		let height;
		let needsDraw = false;
		if (this._statusType === "hp" || this._statusType === "mp") {
			image = params.hpmpgauge_bgimage;
			x += 1;
			y -= 9;
			width = params.hpmpgauge_width - 2;
			height = params.hpmpgauge_height - 2;
			needsDraw = true;
		} else if (this._statusType === "corruption" || this._statusType === "lewdness" || this._statusType === "vice") {
			image = params.corruptiongauge_barborder;
			x += 1;
			y -= 4;
			width = params.corruptiongauge_width - 2;
			height = params.corruptiongauge_height - 2;
			needsDraw = true;
		}
		if (needsDraw) {
			const source = ImageManager.loadMenu(image);
			this.bitmap.blt(source, 0, 0, source.width, source.height, 0, 0, width, height);
		}
		Sprite_Gauge.prototype.drawGaugeRect.call(this, x, y, width, height);
	}
};

Sprite_SKAGauge.prototype.gaugeRate = function() {
	if (this._statusType !== "wp") {
		return Sprite_Gauge.prototype.gaugeRate.call(this);
	}

	const threshold = TLB.Param.SKAUIB.wpgauge_separatorthreshold;
	const value = this._value <= threshold ? this._value : this._value - threshold;
	const maxValue = this._value <= threshold ? this._maxValue : this._maxValue - threshold;
	return maxValue > 0 ? value / maxValue : 0;
};

//-----------------------------------------------------------------------------
//
// Sprite_SKAItemGauge (new class)
// Inherits from Sprite_SKAGauge
//
// Override: bitmapWidth
// Override: bitmapHeight
// Override: drawGaugeRect(x, y, width, height)
//
// Item menu gauges need their own class because they are a different width
// from the main menu ones, and the WP gauge is a different height.
//
//-----------------------------------------------------------------------------

class Sprite_SKAItemGauge extends Sprite_SKAGauge {
	bitmapWidth() {
		return 104;
	}

	bitmapHeight() {
		return 14;
	}

	drawGaugeBackground(x, y, width, height) {
		const params = TLB.Param.SKAUIB;
		const image = params.actorwindow_gauge_bgimage;
		const source = ImageManager.loadMenu(image);
		this.bitmap.blt(source, 0, 0, source.width, source.height, 0, 0, width, height);
	}

	drawGaugeFrame(x, y, width, height) {
		const params = TLB.Param.SKAUIB;
		let image;

		if (this._statusType === "wp") {
			const thresholdWidth = params.actorwindow_gauge_wpthresholdwidth;
			const thresholdMultiplier = 1;
			this.drawWpRect(x, y, width, height, -9, thresholdWidth, thresholdMultiplier);
			image = params.actorwindow_gauge_wpframeimage;
		} else {
			Sprite_Gauge.prototype.drawGaugeRect.call(this, x + 1, y - 9, width - 2, height - 2);
			image = params.actorwindow_gauge_frameimage;
		}

		const source = ImageManager.loadMenu(image);
		this.bitmap.blt(source, 0, 0, source.width, source.height, 0, 0, width, height);
	}

	drawGaugeRect(x, y, width, height) {
		this.drawGaugeBackground(x, y, width, height);
		this.drawGaugeFrame(x, y, width, height);
	}
}

// Need a child class of Sprite_Button since the cancel button for the menu
// has larger dimensions than the default buttonset.

//-----------------------------------------------------------------------------
//
// Sprite_SKACancelButton (new class)
// Inherits from Sprite_Button
//
// Override: setupFrames (from Sprite_Button)
// Override: blockWidth (from Sprite_Button)
// Override: blockHeight (from Sprite_Button)
// Override: loadButtonImage (from Sprite_Button)
// Override: checkBitmap (from Sprite_Button)
//
//-----------------------------------------------------------------------------

class Sprite_SKACancelButton extends Sprite_Button {
	setupFrames() {
		const width = this.blockWidth();
		const height = this.blockHeight();
		this.loadButtonImage();
		this.setColdFrame(0, 0, width, height);
		this.setHotFrame(0, 0, width, height);
		this.updateFrame();
		this.updateOpacity();
	}

	blockWidth() {
		return TLB.Param.SKAUIB.cancelbutton_width;
	}

	blockHeight() {
		return TLB.Param.SKAUIB.cancelbutton_height;
	}

	loadButtonImage() {
		const bitmap = TLB.Param.SKAUIB.cancelbutton_image;
		this.bitmap = ImageManager.loadMenu(bitmap);
	}

	checkBitmap() {
		// We're using a static image rather than a buttonset so this needs to be suppressed.
	}
}

class Sprite_NewMarker extends Sprite {
	static bitmapWidth = 50;
	static bitmapHeight = 50;

	constructor() {
		super();
		this.bitmap = new Bitmap(Sprite_NewMarker.bitmapWidth, Sprite_NewMarker.bitmapHeight);
		this.bitmap.fontFace = "franklin-gothic-heavy";
		this.bitmap.fontSize = 14;
		this._letters = "NEW";
		this._delayFrames = 4;
		this._animatingLetterIndex = 0;
		this._currentFrame = 0;
		this._gradient = ["#bb5c79", "#fb9b7a"];
		this._textOptions = {
			bold: true,
			outlineGradient: ["#000000"],
			outlineThickness: 2
		};
	}

	getYAdjustment() {
		switch (this._currentFrame) {
			case 1:
			case 3: return 1;
			case 2: return 2;
			default: return 0;
		}
	}

	update() {
		this.bitmap.clear();
		for (let i = 0; i < this._letters.length; i++) {
			let y = 3;
			if (i === this._animatingLetterIndex) {
				y -= this.getYAdjustment();
			}
			this.bitmap.drawGradientText(this._letters[i], this._gradient, i * 9, y, Sprite_NewMarker.bitmapWidth, 36, "left", this._textOptions);
		}
		this._delayFrames--;
		if (this._delayFrames === 0) {
			this._delayFrames = 4;
			this._currentFrame++;
			if (this._currentFrame === 4) {
				this._currentFrame = 0;
				this._animatingLetterIndex++;
				if (this._animatingLetterIndex === this._letters.length) {
					this._animatingLetterIndex = 0;
				}
			}
		}
	}
}

//-----------------------------------------------------------------------------
//
// Window_SKAHelp (new class)
// Inherits from Window_Help
//
// Override: initialize(rect)
// Override: setItem(item)
// Override: refresh
// Override: lineHeight (from Window_Base)
//
// This is a separate class to avoid replacing help windows in other scenes
// with non-applicable background art.
//
//-----------------------------------------------------------------------------

class Window_SKAHelp extends Window_Help {
	constructor(rect) {
		super(rect);
		const backSprite = new Sprite();
		const image = TLB.Param.SKAUIB.helpwindow_bgimage;
		backSprite.bitmap = ImageManager.loadMenu(image);
		backSprite.position.y -= 10;
		this.addChildAt(backSprite, 0);
		this._goldSpritePos = { x: 769, y: 143 };
		this._priceTextPos = { x: 669, y: 116 };
		this._priceTextWidth = 90;
		const goldIcon = TLB.Param.SKAUIB.gold_icon;
		const goldSprite = new Sprite();
		goldSprite.bitmap = ImageManager.loadMenu(goldIcon);
		goldSprite.position.set(this._goldSpritePos.x, this._goldSpritePos.y);
		backSprite.addChild(goldSprite);
		this.opacity = 0;
	}

	setItem(item) {
		super.setItem(item);
		this.refresh();
		if (item) {
			const categories = this.getItemCategories(item);
			let x = 9;
			for (const category of categories) {
				this.changeTextColor(category.color);
				this.contents.fontFace = "franklin-gothic-demi-cond";
				this.contents.fontSize = 18;
				this.drawText(`[${category.helpName}]`, x, this._priceTextPos.y, 180, "left");
				x += this.textWidth(`[${category.helpName}]`) + 13;
				this.resetFontSettings();
			}
			this.contents.fontFace = 'franklin-gothic-demi-cond';
			this.contents.fontSize = 22;
			this.drawGradientText(TLB.SKABase.itemPriceAsString(item), ["#ab8845", "#d8b976", "#ab8745"], this._priceTextPos.x, this._priceTextPos.y, this._priceTextWidth, "right", { outlineThickness: 2, outlineGradient: ["#4f4f4f", "#000000"], dropShadow: true, dropShadowX: 0, dropShadowY: 2, shadowOpacity: 0.75 });
		}
	}

	refresh() {
		this.contents.clear();
		this.contents.fontFace = "franklin-gothic-med";
		this.contents.fontSize = 22;
		this.drawTextEx(this._text, 10, 0, 784, true);
	}

	lineHeight() {
		return 36;
	}
}

//-----------------------------------------------------------------------------
//
// Window_StatusBase (existing class)
//
// New signature: createInnerSprite(key, spriteClass, type)
// Adds gauge type. This allows the type value to be passed to the sprite
// constructor, which allows it to be used to determine bitmap width and
// height. This was necessary to support differently-sized gauges, something
// the default code can't do.
//
//-----------------------------------------------------------------------------

Window_StatusBase.prototype.createInnerSprite = function(key, spriteClass, type) {
    const dict = this._additionalSprites;
    if (dict[key]) {
        return dict[key];
    } else {
        const sprite = new spriteClass(type);
        dict[key] = sprite;
        this.addInnerChild(sprite);
        return sprite;
    }
};

//-----------------------------------------------------------------------------
//
// Window_MenuActor (existing class)
//
// New function: setItem(item)
// New function: item
// New function: drawSKAName(actor, index)
// New function: drawSKAClass(actor, index)
// New function: drawSKALevel(actor, index)
// New function: placeSKAGauge(actor, type, x, y)
// New function: drawSKAStats(actor, index)
// Overwrite: initialize(rect)
// Override: itemHeight (from Window_MenuStatus)
// Override: drawItemStatus(index) (from Window_MenuStatus)
// Override: refresh (from Window_StatusBase)
// Override: drawActorFace(actor, x, y, width, height) (from Window_Selectable)
// Override: rowSpacing (from Window_Selectable)
// Override: select (from Window_Selectable)
// Override: maxVisibleItems (from Window_Selectable)
// Override: itemRect (index)
// Override: refreshCursor (from Window_Selectable)
// Override: _refreshArrows (from Window)
//
//-----------------------------------------------------------------------------

Window_MenuActor.prototype.setItem = function(item) {
	this._item = item;
};

Window_MenuActor.prototype.item = function() {
	return this._item;
};

Window_MenuActor.prototype.drawSKAName = function(actor, index) {
	if (!this._actorContainer.children[index].getChildByName("ActorFrame")) {
		const sprite = new Sprite();
		const image = TLB.Param.SKAUIB.actorwindow_actornameframe_unlocked;
		const bitmap = ImageManager.loadMenu(image);
		sprite.bitmap = bitmap;
		sprite.name = "ActorFrame";
		sprite.move(120, 0);
		this._actorContainer.children[index].addChild(sprite);
	}
	const rect = this.itemRect(index);
	const x = rect.x + 179;
	const y = rect.y + 2;
	let image;
	if (this.item() && !actor.canUse(this.item())) {
		image = TLB.Param.SKAUIB.actorwindow_actornameframe_locked;
	} else {
		image = TLB.Param.SKAUIB.actorwindow_actornameframe_unlocked;
	}
	const frame = this._actorContainer.children[index].getChildByName("ActorFrame");
	frame.bitmap = ImageManager.loadMenu(image);
	this.changeTextColor("#c3a38f");
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 30;
	this.contents.fontBold = true;
	this.drawText(actor.name(), x, y, this.textWidth(actor.name()));
	this.contents.fontBold = false;
	this.resetFontSettings();
};

Window_MenuActor.prototype.drawSKAClass = function(actor, index) {
	const rect = this.itemRect(index);
	const x = rect.x + 168;
	const y = rect.y + 39;
	this.changeTextColor("#eee5f1");
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 24;
	this.drawText(actor.currentClass().name, x, y, Math.min(190, this.textWidth(actor.currentClass().name)));
	this.resetFontSettings();
};

Window_MenuActor.prototype.drawSKALevel = function(actor, index) {
	const rect = this.itemRect(index);
	const x = rect.x + 366;
	const y = rect.y + 39;
	this.contents.fontFace = 'franklin-gothic-demi-cond';
	this.contents.fontSize = 18;
	this.drawGradientText("LVL", ["#9bfac1", "#707fba"], x, y, this.textWidth("LVL"), "left", { bold: true, outlineThickness: 2 });
	this.changeTextColor("#eee5f1");
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 24;
	this.contents.fontBold = true;
	this.drawText(actor.level, x + 44, y, this.textWidth(actor.level), "right");
	this.contents.fontBold = false;
	this.resetFontSettings();
};

Window_MenuActor.prototype.placeSKAGauge = function(actor, type, x, y) {
    const key = "actor%1-gauge-%2".format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_SKAItemGauge, type);
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
};

Window_MenuActor.prototype.drawValue = function(label, maxWidth, value, maxValue, x, y) {
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 14;
	this.drawText(label, x, y, this.textWidth(label));
	let textWidth = this.textWidth(maxValue);
	this.drawText(maxValue, x, y, maxWidth, "right");
	this.contents.fontFace = 'fuckboi-sans';
	this.contents.fontSize = 2;
	textWidth += this.textWidth(" ");
	this.contents.fontSize = 13;
	this.drawText("/", x, y, maxWidth - textWidth, "right");
	textWidth += this.textWidth("/");
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 8;
	textWidth += this.textWidth(" ");
	this.contents.fontSize = 14;
	this.drawText(value, x, y, maxWidth - textWidth, "right");
};

Window_MenuActor.prototype.drawSKAStats = function(actor, index) {
	const rect = this.itemRect(index);
	let x = rect.x + 167;
	const y = rect.y + 74;
	this.placeSKAGauge(actor, "hp", x, y);
	this.drawValue("HP", 99, actor.hp, actor.mhp, x + 4, y + 2);
	x += 112;
	this.placeSKAGauge(actor, "mp", x, y);
	this.drawValue("MP", 99, actor.mp, actor.mmp, x + 4, y + 2);
	if (actor.actorId() === 1 && eval(TLB.Param.SKAUIB.showWillpower)) {
		x += 114;
		this.placeSKAGauge(actor, "wp", x, y);
		const currentVarId = TLB.Param.SKAB.currentWpVar;
		const maxVarId = TLB.Param.SKAB.maxWpVar;
		const currentValue = $gameVariables.value(currentVarId);
		const maxValue = $gameVariables.value(maxVarId);
		this.drawValue("WP", 99, currentValue, maxValue, x + 4, y + 2);
	}
};

Window_MenuActor.prototype.drawSKABackground = function(actor, index, x, y) {
	if (!this._actorContainer.children[index]) {
		const image = TLB.Param.SKAUIB.actorwindow_actorbgimage_inactive;
		const bitmap = ImageManager.loadMenu(image);
		const sprite = new Sprite();
		sprite.bitmap = bitmap;
		sprite.move(x + 5, y);
		this._actorContainer.addChild(sprite);
	}
	if (this.item()) {
		let image;
		if (!actor.canUse(this.item())) {
			image = TLB.Param.SKAUIB.actorwindow_actorbgimage_locked;
		} else {
			image = TLB.Param.SKAUIB.actorwindow_actorbgimage_inactive;
		}
		const bitmap = ImageManager.loadMenu(image);
		this._actorContainer.children[index].bitmap = bitmap;
	}
};

Window_MenuActor.prototype.initialize = function(rect) {
	Window_StatusBase.prototype.initialize.call(this, rect);
	this._bgSprite = new Sprite();
	this._item = null;
	let image = TLB.Param.SKAUIB.actorwindow_bgimage;
	this._bgSprite.bitmap = ImageManager.loadMenu(image);
	this._actorContainer = new PIXI.Container;
	this._actorContainer.x -= 12;
	this._actorContainer.y -= 12;
	this._drawingLayer = new Sprite();
	this._drawingLayer.bitmap = new Bitmap(817, 495);
	this.addChildAt(this._bgSprite, 0);
	this.addChildAt(this._drawingLayer, 1);
	this._clientArea.addChildAt(this._actorContainer, 0);
	image = TLB.Param.SKAUIB.arrowimage;
	const bitmap = ImageManager.loadMenu(image);
	const arrowAnchor = { x: 0.5, y: 0.5 };
    this._downArrowSprite.bitmap = bitmap;
	this._downArrowSprite.anchor = arrowAnchor;
	this._downArrowSprite.move(574 / 2, 674 - 15);
	this._upArrowSprite.bitmap = bitmap;
	this._upArrowSprite.anchor = arrowAnchor;
	this._upArrowSprite.scale.y = -1;
	this._upArrowSprite.move(574 / 2, 5);
	this.hide();
	this.opacity = 0;
	this.refresh();
};

Window_MenuActor.prototype.itemHeight = function() {
    return 164;
};

Window_MenuActor.prototype.drawItemStatus = function(index) {
	const actor = this.actor(index);
	const rect = this.itemRect(index);
	const x = rect.x;
	const y = rect.y;
	this.drawSKABackground(actor, index, x, y);
	this.drawSKAName(actor, index);
	this.drawSKAClass(actor, index);
	this.drawSKALevel(actor, index);
	this.drawSKAStats(actor, index);
	let lastX = rect.x + 187;
	for (let i = 0; i < 3; ++i) {
		this.placeStateIcon(actor, lastX, rect.y + 120, i);
		lastX += ImageManager.iconWidth;
	}
	const starImage = TLB.Param.SKAUIB.actorwindow_actornameframe_star_unlocked;
	const starBmp = ImageManager.loadMenu(starImage);
	this.contents.blt(starBmp, 0, 0, starBmp.width, starBmp.height, rect.x + 113, rect.y - 13);
};

Window_MenuActor.prototype.drawItemBackground = function(index) {
    //
};

Window_MenuActor.prototype.refresh = function() {
	Window_StatusBase.prototype.refresh.call(this);
	for (const child of this._actorContainer.children) {
		child._refresh();
	}
};

Window_MenuActor.prototype.drawActorFace = function(
    actor, x, y, width, height
) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x - 3, y - 17, width, height);
};

Window_MenuActor.prototype.rowSpacing = function() {
	return 13;
};

Window_MenuActor.prototype.select = function(index) {
	const actorSelected = this._index >= 0;
	if(actorSelected) {
		const actor = this.actor(this._index);
		let image;
		if (actor && this.item() && !actor.canUse(this.item())) {
			image = TLB.Param.SKAUIB.actorwindow_actorbgimage_locked;
		} else {
			image = TLB.Param.SKAUIB.actorwindow_actorbgimage_inactive;
		}
		const sprite = this._actorContainer.children[this._index - this.topIndex()];
		if (sprite) sprite.bitmap = ImageManager.loadMenu(image);
	}
	this._index = index;
	this.ensureCursorVisible();
	if (index >= 0) {
		const image = TLB.Param.SKAUIB.actorwindow_actorbgimage_active;
		this._actorContainer.children[index - this.topIndex()].bitmap = ImageManager.loadMenu(image);
	}
	this.refreshCursor();
	this.callUpdateHelp();
};

Window_MenuActor.prototype.maxVisibleItems = function() {
	return $gameParty.size();
};

Window_MenuActor.prototype.itemRect = function(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = row * itemHeight - this.scrollBaseY() + rowSpacing;
    const width = itemWidth - colSpacing;
    const height = itemHeight;
    return new Rectangle(x, y, width, height);
};

Window_MenuActor.prototype.refreshCursor = function() {
	this.setCursorRect(0, 0, 0, 0);
};

Window_MenuActor.prototype._refreshArrows = function() {
    //
};
