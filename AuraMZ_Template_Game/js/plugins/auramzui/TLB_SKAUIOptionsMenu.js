// Trilobytes - Star Knightess Aura UI Options Menu/
// TLB_SKAUIOptionsMenu.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAUIOptionsMenu = true;

window.TLB = TLB || {};
TLB.SKAUIOptionsMenu = TLB.SKAUIOptionsMenu || {};

/*:
 * @target MZ
 * @plugindesc This plugin modifies the options menu of Star Knightess
 * Aura to reflect the prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the current Scene_Options to match a
 * prototype specified by the client. It will not be compatible with any other
 * project and may not be used by anyone besides the client of the commission.
 *
 * COMMAND ORDER
 * The order in which commands will be listed in the controls category is
 * determined by the "Key Codes" parameter. They will be listed in the exact
 * order of the code numbers there.
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
 * @param helpwindow_bgimage
 * @text Help BG Image
 * @desc Filename of image to use for the help window.
 * @type file
 * @dir img/menu/
 * @default Options_Menu/HELP_WINDOW
 *
 * @param optionswindow_bgimage
 * @text Options BG Image
 * @desc Filename of image to use for the options window.
 * @type file
 * @dir img/menu/
 * @default Options_Menu/OPTIONS_MENU_OPTION_WINDOW
 *
 * @param optionswindow_contentimage
 * @text Options BG Image
 * @desc Filename of image to use for the options window content.
 * @type file
 * @dir img/menu/
 * @default Options_Menu/OPTIONS_MENU_OPTION_CONTENT
 *
*/

window.parameters = PluginManager.parameters('TLB_SKAUIOptionsMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKAUIOM = TLB.Param.SKAUIOM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAUIOM);

Window_Options.prototype._createAllParts = function() {
	Window.prototype._createAllParts.call(this);
	this.createSprites();
};

TLB.SKAUIOptionsMenu.Window_Options_initialize = Window_Options.prototype.initialize;
Window_Options.prototype.initialize = function(rect) {
	TLB.SKAUIOptionsMenu.Window_Options_initialize.call(this, rect);
	let image = TLB.Param.SKAUIB.arrowimage;
	let bitmap = ImageManager.loadMenu(image);
	const arrowAnchor = { x: 0.5, y: 0.5 };
	this._downArrowSprite.bitmap = bitmap;
	this._downArrowSprite.anchor = arrowAnchor;
	this._downArrowSprite.move(424 / 2, 468);
	this._upArrowSprite.bitmap = bitmap;
	this._upArrowSprite.anchor = arrowAnchor;
	this._upArrowSprite.scale.y = -1;
	this._upArrowSprite.move(424 / 2, 5);
	this.opacity = 0;
	this.deactivate();
	this.cursorVisible = false;
	this._contentsSprite.y += 12;
};

Window_Options.prototype.drawItem = function(index) {
	const title = this.commandName(index);
	const status = this.statusText(index);
	const rect = this.itemLineRect(index);
	const statusWidth = this.statusWidth();
	const titleWidth = rect.width - statusWidth;
	const onGradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
	const offGradient = ["#887a8c", "#a397a7", "#7e7281"];
	this.resetTextColor();
	this.contents.fontFace = "franklin-gothic-med";
	this.contents.fontSize = 18;
	const enabled = this.isCommandEnabled(index);
	this.changePaintOpacity(enabled);
	this.drawGradientText(title, enabled ? onGradient : offGradient, rect.x, rect.y, titleWidth, "left", { outlineGradient: ["#4f4f4f", "#000000"], outlineThickness: 2, dropShadow: true, dropShadowX: 0, dropShadowY: 1, shadowOpacity: 0.75 });
	this.contents.fontFace = "franklin-gothic-heavy";
	const symbol = this.commandSymbol(index);
	const value = this.getConfigValue(symbol);
	this.drawGradientText(status, value || symbol.includes("mapper") || symbol === 'hudsize' || (symbol === "difficulty" && enabled) ? onGradient : offGradient, rect.x + titleWidth + 13, rect.y, statusWidth, "center", { outlineGradient: ["#4f4f4f", "#000000"], outlineThickness: 2, dropShadow: true, dropShadowX: 0, dropShadowY: 1, shadowOpacity: 0.75 });
};

Window_Options.prototype.drawItemBackground = function(index) {
	//
};

Window_Options.prototype.statusWidth = function() {
	return 170;
};

Window_Options.prototype.hitIndex = function() {
	const touchPos = new Point(TouchInput.x, TouchInput.y);
	const localPos = this.worldTransform.applyInverse(touchPos);
	return this.hitTest(localPos.x, localPos.y - 12);
};

Window_Options.prototype.refreshCursor = function() {
	this._remapKey = null;
	if (this.index() >= 0) {
		const rect = this.itemRect(this.index());
		rect.y += 12;
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		this.setCursorRect(0, 0, 0, 0);
		this.cursorVisible = false;
	}
};

Window_Options.prototype.updateScrollBase = function(baseX, baseY) {
	const deltaX = baseX - this._scrollBaseX;
	const deltaY = baseY - this._scrollBaseY;
	this._contentBg.x -= deltaX;
	this._contentBg.y -= deltaY;
	if (deltaY > 44) { // scrolling more than 1 row, select last item
		this._contentBg.y = this.row() % 2 === 0 ? -120 : -76;
	} else if (this._contentBg.y <= -164 || this._contentBg.y >= 12) this._contentBg.y = -76;
	Window_Scrollable.prototype.updateScrollBase.call(this, baseX, baseY);
};

Window_Options.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKAUIB.itemwindow_cursorimage;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_Options.prototype._refreshCursor = function() {
	//
};

Window_Options.prototype._refreshArrows = function() {
	//
};

Window_Options.prototype._updateFilterArea = function() {
	const pos = this._clientArea.worldTransform.apply(new Point(0, 12));
	const filterArea = this._clientArea.filterArea;
	filterArea.x = pos.x + this.origin.x;
	filterArea.y = pos.y + this.origin.y;
	filterArea.width = this.innerWidth;
	filterArea.height = 440;
};

Window_Options.prototype.createSprites = function() {
	const params = TLB.Param.SKAUIOM;
	const sprite = new Sprite();
	let image = params.optionswindow_bgimage;
	let bitmap = ImageManager.loadMenu(image);
	sprite.bitmap = bitmap;
	this.addChildAt(sprite, 0);
	this._contentBg = new Sprite();
	image = params.optionswindow_contentimage;
	bitmap = ImageManager.loadMenu(image);
	this._contentBg.bitmap = bitmap;
	this._contentBg.move(5, -76);
	this._clientArea.addChildAt(this._contentBg, 0);
};

Object.defineProperty(Window_Options.prototype, "innerHeight", {
	get: function() {
		return 440;
	},
	configurable: true
});

Object.defineProperty(Window_Options.prototype, "innerRect", {
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

TLB.SKAUIOptionsMenu.Window_OptionsCategory_initialize = Window_OptionsCategory.prototype.initialize;
Window_OptionsCategory.prototype.initialize = function(rect) {
	TLB.SKAUIOptionsMenu.Window_OptionsCategory_initialize.call(this, rect);
	this.createSprites();
	this.opacity = 0;
};

Window_OptionsCategory.prototype.createSprites = function() {
	for (let i = 0; i < this._list.length; i++) {
		const rect = this.itemRect(i);
		if (i > 0) rect.y -= 9 * (i - 1);
		const sprite = new Sprite();
		let image;
		if (i === 0) {
			image = TLB.Param.SKAUIB.categorywindow_topbgimage;
		} else {
			image = TLB.Param.SKAUIB.categorywindow_bgimage;
		}
		sprite.bitmap = ImageManager.loadMenu(image);
		sprite.y = rect.y;
		this.addChildAt(sprite, i);
	}
};

Window_OptionsCategory.prototype.itemHeight = function() {
	return 79;
};

Window_OptionsCategory.prototype.drawItemBackground = function(index) {
	//
};

Window_OptionsCategory.prototype.drawItem = function(index) {
	const rect = this.itemRect(index);
	rect.y -= 1;
	const align = "left";
	const enabledGradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
	const disabledGradient = ["#887a8c", "#a397a7", "#7e7281"];
	this.resetTextColor();
	const enabled = this.isCommandEnabled(index);
	this.drawIcon(this.icon(index), rect.x + 5, rect.y + -9 * (index - 2));
	this.contents.fontFace = 'franklin-gothic-demi-cond';
	this.contents.fontSize = 30;
	this.drawGradientText(this.commandName(index), enabled ? enabledGradient : disabledGradient, rect.x + 49, rect.y - 4 + -9 * (index - 2), 180, align, { outlineThickness: 3 });
};

Window_OptionsCategory.prototype.icon = function(index) {
	switch (index) {
		case 0: return 190;
		case 1: return 207;
		case 2: return 200;
		case 3: return 242;
	}
};

Window_OptionsCategory.prototype.refreshCursor = function() {
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

Window_OptionsCategory.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKAUIB.categorywindow_cursorimage;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_OptionsCategory.prototype._refreshCursor = function() {
	//
};

Window_OptionsHelp.prototype.initialize = function(rect) {
	Window_Help.prototype.initialize.call(this, rect);
	this._backSprite = new Sprite();
	const image = TLB.Param.SKAUIOM.helpwindow_bgimage;
	this._backSprite.bitmap = ImageManager.loadMenu(image);
	this._backSprite.position.y -= 10;
	this.addChildAt(this._backSprite, 0);
	this.opacity = 0;
};

Scene_Options.prototype.helpWindowRect = function() {
	const wx = 34;
	const wy = this._optionsWindow.y + this._optionsWindow.height + 40;
	const ww = 754;
	const wh = 121;
	return new Rectangle(wx, wy, ww, wh);
};
