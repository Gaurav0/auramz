// Trilobytes - Star Knightess Aura Element Drain/
// TLB_SKAElementDrain.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAElementDrain = true;

window.TLB = TLB || {};
TLB.SKAElementDrain = TLB.SKAElementDrain || {};

/*:
 * @target MZ
 * @plugindesc This plugin adds a notetag for draining elements.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which adds an element drain notetag.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * None
 *
 * ============================================================================
 * How to use
 * ============================================================================
 *
 * Add the following notetag to an enemy:
 *
 * <drain:id>
 * <drain:elementname>
 *
 * You can use either ID or name, it doesn't matter which.
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

TLB.SKAElementDrain.getDrainElement = function (enemyData) {
    let elementId = null;
    if (enemyData.meta.drain) {
        const drain = enemyData.meta.drain;
        if (Number(drain)) {
            elementId = Number(drain);
        } else {
            elementId = TLB.SKAElementDrain.elementNameToId(drain);
        }
    }
    return elementId;
}

TLB.SKAElementDrain.elementNameToId = function (elementName) {
    const element = $dataSystem.elements.findIndex(ele => ele.toLowerCase() === elementName.toLowerCase());
    if (element > -1) return element;
    else {
        console.error(`TLB_SKAElementDrain ERROR: No element named ${elementName} found in the database.`);
        return null;
    }
};

TLB.SKAElementDrain.Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function (target, critical) {
    let value = TLB.SKAElementDrain.Game_Action_makeDamageValue.call(this, target, critical);
    if (target.isEnemy()) {
        const elementId = TLB.SKAElementDrain.getDrainElement(target.enemy());
        if (elementId && this.item().damage.elementId === elementId) {
            value = -value;
        }
    }
    return value;
};
