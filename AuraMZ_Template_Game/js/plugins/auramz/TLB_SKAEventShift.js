// Trilobytes - Star Knightess Aura Event Shift/
// TLB_SKAEventShift.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAEventShift = true;

window.TLB = window.TLB || {};
TLB.SKAEventShift = TLB.SKAEventShift || {};

/*:
 * @target MZ
 * @plugindesc This plugin adds a notetag for events which shifts their
 * position on map load by a defined number of tiles. Its primary intent is for
 * bridge lower railings.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which adds a new event notetag.
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
 * How to Use
 * ============================================================================
 * 
 * There are three notetags you can add to an event:
 * 
 * <shift:x,y>
 * <shift x:number>
 * <shift y:number>
 * 
 * The tag with both coordinates will take precedence over the other two in the
 * event that both are present on the same event for some reason.
 * 
 * Use a negative shift to move left or up, and a positive to move right or
 * down.
 *
 * If a shift value has a decimal value, this will offset the event's screen
 * position on its new tile by that value. For example <shift x:0.25> will
 * simply move the event half a tile to the right.
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
 */
 
 //----------------------------------------------------------------------------
 //
 // Parameter conversion
 //
 //----------------------------------------------------------------------------

TLB.SKAEventShift.Game_Event_locate = Game_Event.prototype.locate;
Game_Event.prototype.locate = function(x, y) {
    let xShift = 0;
    let yShift = 0;
    const shiftAll = this.event().meta?.["shift"];
    if (shiftAll) {
        const splitShift = shiftAll.split(",");
        xShift = parseInt(splitShift[0]);
        yShift = parseInt(splitShift[1]);
    } else {
        const shiftX = this.event().meta?.["shift x"];
        const shiftY = this.event().meta?.["shift y"];
        if (shiftX) xShift = parseInt(shiftX);
        if (shiftY) yShift = parseInt(shiftY);
    }
    TLB.SKAEventShift.Game_Event_locate.call(this, x + xShift, y + yShift);
};

TLB.SKAEventShift.Game_Event_screenX = Game_Event.prototype.screenX;
Game_Event.prototype.screenX = function() {
    let screenX = TLB.SKAEventShift.Game_Event_screenX.call(this);
    let xShift = 0;
    const shiftAll = this.event().meta?.shift;
    if (shiftAll) {
        const splitShift = shiftAll.split(",");
        xShift = splitShift[0];
    } else {
        const shiftX = this.event().meta?.["shift x"];
        if (shiftX) xShift = shiftX;
    }
    let xOffset = Number(xShift) - parseInt(xShift);
    if (xOffset !== 0) {
        screenX += $gameMap.tileWidth() * xOffset;
    }
    return screenX;
};

TLB.SKAEventShift.Game_Event_screenY = Game_Event.prototype.screenY;
Game_Event.prototype.screenY = function() {
    let screenY = TLB.SKAEventShift.Game_Event_screenY.call(this);
    let yShift = 0;
    const shiftAll = this.event().meta?.shift;
    if (shiftAll) {
        const splitShift = shiftAll.split(",");
        yShift = splitShift[1];
    } else {
        const shiftY = this.event().meta?.["shift y"];
        if (shiftY) yShift = shiftY;
    }
    let yOffset = Number(yShift) - parseInt(yShift);
    if (yOffset !== 0) {
        screenY += $gameMap.tileHeight() * yOffset;
    }
    return screenY;
};