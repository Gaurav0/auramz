// Trilobytes - Star Knightess Aura Single Tap/
// TLB_SKASingleTap.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKASingleTap = true;

window.TLB = TLB || {};
TLB.SKASingleTap = TLB.SKASingleTap || {};

/*:
 * @target MZ
 * @plugindesc This plugin adds an option to eliminate the requirement
 * of selecting an item before executing it. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which adds a command to the options menu for
 * bypassing the need to tap to select and tap again to execute.
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
 */

Input.isTouchEnabled = function() {
    return ( 'ontouchstart' in window ) ||
    ( navigator.maxTouchPoints > 0 ) ||
    ( navigator.msMaxTouchPoints > 0 );   
}

ConfigManager.doubleTap = false;

TLB.SKASingleTap.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = TLB.SKASingleTap.ConfigManager_makeData.call(this);
	config.doubleTap = this.doubleTap;
	return config;
};

TLB.SKASingleTap.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	TLB.SKASingleTap.ConfigManager_applyData.call(this, config);
	this.doubleTap = this.readFlag(config, "doubleTap", false);
};

TLB.SKASingleTap.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	TLB.SKASingleTap.Window_Options_addGeneralOptions.call(this);
	if (Input.isTouchEnabled()) this.addCommand("Tap to Confirm", "doubleTap");
};

Window_Selectable.prototype.isTouchOkEnabled = function() {
    return (
        this.isOkEnabled() &&
        (this._cursorFixed || this._cursorAll || this._doubleTouch || !ConfigManager.doubleTap)
    );
};