// Trilobytes - Gradient Text Extensions/
// TLB_GradientTextExtensions.js
//=============================================================================
 
window.Imported = window.Imported || {};
window.Imported.TLB_GradientTextExtensions = true;
 
window.TLB = window.TLB || {};
TLB.GTE = TLB.GTE || {};
 
/*:
 * @target MZ
 * @plugindesc This plugin adds functions for gradients in text.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin facilitates drawing of text with gradient colours as opposed to
 * solid colour, which is the only option by default. It also allows for
 * gradient outlines and angled text as well as drop shadow.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * None
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * None
 *
 * ============================================================================
 * HOW TO USE
 * ============================================================================
 * 
 * There is a new function available to Window_Base called drawGradientText.
 * It takes the following parameters:
 * 	text - The text to draw
 * 	gradient - The array of colours that make up the gradient. Stops will be
 *             calculated automatically and uniformly distributed.
 * 	x - The X coordinate for the text
 *  y - The Y coordinate for the text
 *  align - The alignment ("left", "center" or "right")
 *  options - an object containing any or all of the following:
 * 		bitmap - Set this if you wish to draw the text on a bitmap other than
 *               a window's contents.
 * 		bold - Set this to draw the text bolded.
 * 		angle - The radial angle at which to draw the text.
 * 		outlineOpacity - The opacity of the text outline from 0-255.
 * 		outlineThickness - The thickness of the outline stroke.
 * 		outlineGradient - The array of colours that make up the outline.
 * 		dropShadow - Boolean, true to draw drop shadow, false otherwise.
 * 		shadowOpacity - Opacity of the drop shadow.
 * 		shadowOffsetX - X offset of the drop shadow.
 * 		shadowOffsetY - Y offset of the drop shadow.
 * 		opacity - Opacity of the text body.
 * 
 * LETTER SPACING
 * 
 * Bitmaps now have a letterSpacing property which will insert hair spaces
 * between each letter of the drawn string. It needs to be set on the bitmap
 * before calling drawText.
 * 
 * ============================================================================
 * Compatibility
 * ============================================================================
 *
 * There shouldn't be any compatibility issues.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * Copyright 2022 Trilobytes
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
 * @param defaultLetterspacing
 * @text Default Letter Spacing
 * @desc The default spacing to place between letters.
 * @type number
 * @default 0
*/

window.parameters = PluginManager.parameters('TLB_GradientTextExtensions');
TLB.Param = TLB.Param || {};
TLB.Param.GTE = TLB.Param.GTE || {};

TLB.Param.GTE.defaultLetterspacing = parseInt(parameters.defaultLetterspacing);

//-----------------------------------------------------------------------------
//
// Bitmap (existing class)
//
// New function: createGradient(text, gradient, x1, y1, x2, y2, angle)
// New function: drawGradientText(text, gradient, x, y, maxWidth, lineHeight, align, options)
// New function: resetLetterSpacing
// New function: _drawGradientTextOutline(text, tx, ty, maxWidth, angle, outlineThickness, outlineGradient)
// New function: _drawGradientTextBody(text, gradient, tx, ty, maxWidth, angle)
// Alias: initialize(width, height)
//
//-----------------------------------------------------------------------------
 
Bitmap.prototype.createGradient = function(text, gradient, x1, y1, x2, y2, angle) {
	const context = this.context;
	const metrics = context.measureText(text);
	const ascent = metrics.actualBoundingBoxAscent;
	if (angle) {
		const descent = metrics.actualBoundingBoxDescent;
		x1 = 0;
		y1 = -(ascent + descent);
		x2 = 1;
		y2 = descent;
	} else {
		y1 -= ascent;
	}
	const grad = context.createLinearGradient(x1, y1, x2, y2);
	if (gradient) {
		const numColors = gradient.length;
		const numStops = numColors - 1;
		const stopGap = 1 / numStops;
		let currentStop = 0;
		for (let i = 0; i < numColors; i++) {
			const color = gradient[i];
			grad.addColorStop(currentStop, color);
			currentStop += stopGap;
		}
	}
	return grad;
}

Bitmap.prototype.drawGradientText = function(text, gradient, x, y, maxWidth, lineHeight, align, options) {
	const context = this.context;
	const alpha = context.globalAlpha;
	maxWidth = maxWidth || 0xffffffff;
	let tx = x;
	let ty = Math.round(y + lineHeight / 2 + this.fontSize * 0.35);
	if (align === "center") {
		tx += maxWidth / 2;
	}
	if (align === "right") {
		tx += maxWidth;
	}
	context.save();
	context.font = this._makeFontNameText();
	context.textAlign = align;
	context.textBaseline = "alphabetic";
	if (options.angle) {
		context.translate(tx, ty);
		context.rotate(options.angle);
		tx = 0;
		ty = 0;
	}
	context.globalAlpha = options.outlineOpacity || 1;
	this._drawGradientTextOutline(text, tx, ty, maxWidth, options.angle, options.outlineThickness, options.outlineGradient);
	if (options.dropShadow) {
		context.globalAlpha = options.shadowOpacity || 1;
		context.shadowColor = "#000000";
		context.shadowOffsetX = options.dropShadowX;
		context.shadowOffsetY = options.dropShadowY;
		context.shadowBlur = 2;
		this._drawGradientTextBody(text, gradient, tx, ty, maxWidth, options.angle);
		context.globalAlpha = alpha;
		context.shadowColor = "rgba(0, 0, 0, 0)";
	}
	context.globalAlpha = options.opacity || 1;
	this._drawGradientTextBody(text, gradient, tx, ty, maxWidth, options.angle);
	context.globalAlpha = alpha;
	context.restore();
	this.paintOpacity = 255;
	this._baseTexture.update();
};

Bitmap.prototype.resetLetterSpacing = function() {
	this.letterSpacing = TLB.Param.GTE.defaultLetterspacing;
};

 Bitmap.prototype._drawGradientTextOutline = function(text, tx, ty, maxWidth, angle, outlineThickness, outlineGradient = null) {
	const context = this.context;
	context.strokeStyle = outlineGradient ? this.createGradient(text, outlineGradient, tx, ty, tx, ty, angle) : this.outlineColor;
	context.lineWidth = outlineThickness;
	context.lineJoin = "round";
	context.strokeText(text, tx, ty, maxWidth);
};
 
Bitmap.prototype._drawGradientTextBody = function(text, gradient, tx, ty, maxWidth, angle) {
	const context = this.context;
	const grad = this.createGradient(text, gradient, tx, ty, tx, ty, angle);
	context.fillStyle = grad;
	context.fillText(text, tx, ty, maxWidth);
};

TLB.GTE.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
	TLB.GTE.Bitmap_initialize.call(this, width, height);
	this.letterSpacing = TLB.Param.GTE.defaultLetterspacing;
};

//-----------------------------------------------------------------------------
//
// Window_Base (existing class)
// Inherits from Window
//
// New function: drawGradientText(text, gradient, x, y, maxWidth, align, options)
// New function: applySpacing(text, spacing)
// Alias: drawText(text, x, y, maxWidth, align)
// Alias: textWidth(text)
//
//-----------------------------------------------------------------------------

Window_Base.prototype.drawGradientText = function(text, gradient, x, y, maxWidth, align, options = {}) {
	if (!options.bitmap) options.bitmap = this.contents;
	if (options.bold) options.bitmap.fontBold = true;
	const letterSpacing = options.bitmap.letterSpacing;
	if (letterSpacing > 0) text = this.applySpacing(text, letterSpacing);
	options.bitmap.drawGradientText(text, gradient, x, y, maxWidth, this.lineHeight(), align, options);
	options.bitmap.fontBold = false;
};

Window_Base.prototype.applySpacing = function(text, spacing) {
	return text.toString().split("").join(String.fromCharCode(8202).repeat(spacing));
};

TLB.GTE.Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
	if (this.contents.letterSpacing > 0) {
		text = this.applySpacing(text, this.contents.letterSpacing);
	}
    TLB.GTE.Window_Base_drawText.call(this, text, x, y, maxWidth, align);
};

TLB.GTE.Window_Base_textWidth = Window_Base.prototype.textWidth;
Window_Base.prototype.textWidth = function(text) {
	const letterSpacing = this.contents.letterSpacing;
	if (letterSpacing > 0) {
		text = this.applySpacing(text, letterSpacing);
	}
    return TLB.GTE.Window_Base_textWidth.call(this, text);
};