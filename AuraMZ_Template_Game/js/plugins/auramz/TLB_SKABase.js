// Trilobytes - Star Knightess Aura Base/
// TLB_SKABase.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKABase = true;

window.TLB = window.TLB || {};
TLB.SKABase = TLB.SKABase || {};

/*:
 * @target MZ
 * @plugindesc This plugin provides base functions shared by other SKA plugins.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a base plugin which provides utility and shared functions which will
 * be used by other SKA plugins.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * ITEM CATEGORIES
 * Categories have the following parameters:
 * - Name: The name of the category, as it will appear in the category window.
 * - Help name: The name of the category when shown in the item help window.
 * - Symbol: The internal symbol used for the category*
 * - Show in menu?: Boolean flag to determine whether to show the category in
 *   the menu or not.
 * - Icon ID: Index of the icon shown for the category in the list.
 * - Color: The hex code of the colour used for the category in a help entry.
 *
 * *: If you want to use existing default categories from the original item
 *    scene, use the symbols "item", "weapon", "armor" or "keyItem".
 *
 * In order to assign a category to an item, simply add a notetag to the item
 * with the appropriate symbol, for example <bomb>.
 *
 * All other parameters are explained in their respective description field.
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
 * @param itemcategories
 * @text Item Categories
 * @type struct<category>[]
 * @default ["{\"name\":\"Usables\",\"helpName\":\"Item\",\"symbol\":\"item\",\"showInMenu\":\"true\",\"iconID\":\"208\",\"color\":\"\"}","{\"name\":\"Key Items\",\"helpName\":\"Key Item\",\"symbol\":\"keyItem\",\"showInMenu\":\"true\",\"iconID\":\"195\",\"color\":\"\"}","{\"name\":\"Materials\",\"helpName\":\"Material\",\"symbol\":\"material\",\"showInMenu\":\"true\",\"iconID\":\"216\",\"color\":\"#a098ff\"}","{\"name\":\"Bombs\",\"helpName\":\"Bomb\",\"symbol\":\"bomb\",\"showInMenu\":\"false\",\"iconID\":\"162\",\"color\":\"#ff3810\"}","{\"name\":\"Books\",\"helpName\":\"Book\",\"symbol\":\"book\",\"showInMenu\":\"true\",\"iconID\":\"229\",\"color\":\"#51c4d2\"}","{\"name\":\"Recovery\",\"helpName\":\"Recovery\",\"symbol\":\"recovery\",\"showInMenu\":\"false\",\"iconID\":\"178\",\"color\":\"#66cc40\"}","{\"name\":\"Blessed\",\"helpName\":\"Blessed\",\"symbol\":\"blessed\",\"showInMenu\":\"false\",\"iconID\":\"221\",\"color\":\"#3e9ade\"}","{\"name\":\"Coatings\",\"helpName\":\"Coating\",\"symbol\":\"coating\",\"showInMenu\":\"false\",\"iconID\":\"176\",\"color\":\"#66cc40\"}","{\"name\":\"Drugs\",\"helpName\":\"Drug\",\"symbol\":\"drug\",\"showInMenu\":\"false\",\"iconID\":\"177\",\"color\":\"#d251be\"}","{\"name\":\"Valuables\",\"helpName\":\"Valuable\",\"symbol\":\"valuable\",\"showInMenu\":\"true\",\"iconID\":\"210\",\"color\":\"#f0c040\"}","{\"name\":\"Gourmet\",\"helpName\":\"Gourmet\",\"symbol\":\"gourmet\",\"showInMenu\":\"false\",\"iconID\":\"221\",\"color\":\"#A0522D\"}"]
 *
 * @param dayVar
 * @text Day Variable
 * @desc ID of variable to use for the current day.
 * @type number
 * @default 31
 *
 * @param corruption
 * @text Corruption Settings
 *
 * @param currentCorruptionVar
 * @parent corruption
 * @text Current Value Variable
 * @desc ID of variable to use for current corruption value.
 * @type variable
 * @default 2
 *
 * @param maxCorruptionVar
 * @parent corruption
 * @text Max Value Variable
 * @desc ID of variable to use for max corruption value.
 * @type variable
 * @default 14
 *
 * @param lewdness
 * @text Lewdness Settings
 *
 * @param currentLewdnessVar
 * @parent lewdness
 * @text Current Lewdness Variable
 * @desc Variable ID for current lewdness value.
 * @type variable
 * @default 3
 *
 * @param maxLewdness
 * @parent lewdness
 * @type number
 * @text Max Lewdness
 * @desc Maximum value for the lewdness stat.
 * @default 50
 *
 * @param vice
 * @text Vice Settings
 *
 * @param currentViceVar
 * @parent vice
 * @text Current Vice Variable
 * @desc Variable ID for current vice value.
 * @type variable
 * @default 19
 *
 * @param maxVice
 * @parent vice
 * @type number
 * @text Max Vice
 * @desc Maximum value for the vice stat.
 * @default 50
 *
 * @param willpower
 * @text Willpower Settings
 *
 * @param currentWpVar
 * @parent willpower
 * @text Current Value Variable
 * @desc ID of variable to use for current WP value.
 * @type variable
 * @default 10
 *
 * @param maxWpVar
 * @parent willpower
 * @text Max Value Variable
 * @desc ID of variable to use for max WP value.
 * @type variable
 * @default 11
 *
 */
/*~struct~category:
 * @param name
 * @text Name
 * @desc The name of the category.
 *
 * @param helpName
 * @text Help name
 * @desc The name of the category in the help window.
 *
 * @param symbol
 * @text Symbol
 * @desc The symbol to use in the category window handlers.
 *
 * @param showInMenu
 * @text Show in menu?
 * @desc Determines whether to display this category as a selectable one.
 * @type boolean
 * @default false
 *
 * @param iconID
 * @text Icon ID
 * @desc The ID of the icon to use for this category.
 * @type Number
 * @default 208
 *
 * @param color
 * @text Color
 * @desc The color to display the category with in the help window.
 *
 */

TLB.SKABase.parseParameters = function(parameters, destination) {
	for (const param in parameters) {
		const value = parameters[param];
		if (value.length > 0 && !isNaN(value)) {
			if (Math.floor(value) === value) destination[param] = parseInt(value);
			else destination[param] = parseFloat(value);
		} else if (value.length > 0) {
			try {
				destination[param] = JSON.parse(value);
				TLB.SKABase.parseParameters(destination[param], destination[param]);
			} catch (e) {
				destination[param] = value;
			}
		}
	}
};

//----------------------------------------------------------------------------
//
// Parameters conversion
//
//----------------------------------------------------------------------------

window.parameters = PluginManager.parameters('TLB_SKABase');
TLB.Param = TLB.Param || {};
TLB.Param.SKAB = TLB.Param.SKAB || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAB);

TLB.SKABase.displayError = function(pluginName, msg) {
	console.error(`${pluginName} plugin error: ${msg}`);
};

// Use this to only change bitmaps if their URL has changed
TLB.SKABase.convertToFilename = function(string) {
	const index = string.lastIndexOf("/");
	const filenameWithExt = string.substring(index + 1);
	const filename = filenameWithExt.substr(0, filenameWithExt.length - 4);
	return filename;
};

TLB.SKABase.goldAsString = function(goldValue = $gameParty.gold()) {
	return goldValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

TLB.SKABase.priceAsString = function(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

TLB.SKABase.itemPriceAsString = function(item) {
	return TLB.SKABase.priceAsString(item.price);
};

TLB.SKABase.getKey = function(symbol, restrictToAlphanum = true) {
	const keys = Object.keys(Input.keyMapper);
	if (restrictToAlphanum) {
		return keys.filter(key => Input.keyMapper[key] === symbol && String.fromCharCode(key) >= "A" && String.fromCharCode(key) <= "Z")[0];
	} else {
		return keys.filter(key => Input.keyMapper[key] === symbol)[0];
	}
};

TLB.SKABase.Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
Scene_Menu.prototype.commandPersonal = function() {
	if ($gameParty.size() === 1) {
		$gameParty.setMenuActor($gameParty.leader());
		this.onPersonalOk();
	} else {
		TLB.SKABase.Scene_Menu_commandPersonal.call(this);
	}
};

Window_Base.prototype.drawTextEx = function(text, x, y, width, retainSettings = false) {
    if (!retainSettings) this.resetFontSettings();
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
	this.resetFontSettings();
    return textState.outputWidth;
};

// Not currently doing anything with this but leaving it here in case it's useful at some point.
Window_Base.prototype.drawTextExCenter = function(text, x, y, width) {
	this.resetFontSettings();
	const textState = this.createTextState(text, x, y, width);
	this.processAllTextCenter(textState);
	return textState.outputWidth;
};

Window_Base.prototype.processAllTextCenter = function(textState) {
	while (textState.index < textState.text.length) {
		this.processCharacterCenter(textState);
	}
	this.flushTextStateCenter(textState);
};

Window_Base.prototype.processCharacterCenter = function(textState) {
	const c = textState.text[textState.index++];
	if (c.charCodeAt(0) < 0x20) {
		this.flushTextStateCenter(textState);
		this.processControlCharacter(textState, c);
	} else {
		textState.buffer += c;
	}
};

Window_Base.prototype.flushTextStateCenter = function(textState) {
	const text = textState.buffer;
	const rtl = textState.rtl;
	const width = this.textWidth(text);
	const height = textState.height;
	const gap = textState.width - width;
	const x = rtl ? textState.x - width : textState.x + (gap / 2);
	const y = textState.y;
	if (textState.drawing) {
		this.contents.drawText(text, x, y, width, height);
	}
	textState.x += rtl ? -width : width;
	textState.buffer = this.createTextBuffer(rtl);
	const outputWidth = Math.abs(textState.x - textState.startX);
	if (textState.outputWidth < outputWidth) {
		textState.outputWidth = outputWidth;
	}
	textState.outputHeight = y - textState.startY + height;
};

//-----------------------------------------------------------------------------
//
// Window_Base (existing class)
//
// New function: getItemCategories(item)
// Gets an array of category "tags" for the item passed.
//
// This is in Window_Base because it's used by both Window_SKAHelp (for tags)
// and Window_SKAItemList (to determine whether an item is included in the
// current category).
//
//-----------------------------------------------------------------------------

Window_Base.prototype.getItemCategories = function(item) {
	if (item) {
		const categories = TLB.Param.SKAB.itemcategories || "[]";
		return categories.filter(category => item.meta[category.symbol]);
	}
	return [];
};
