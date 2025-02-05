// Trilobytes - Star Knightess Aura Event Movement/
// TLB_SKAEventMovement.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAEventMovement = true;

window.TLB = window.TLB || {};
TLB.SKAEventMovement = TLB.SKAEventMovement || {};

/*:
 * @target MZ
 * @plugindesc This plugin adds a notetag for events which updates
 * their movement no matter how far the player is from them.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which adds a new event notetag for updating
 * movement. Its intended purpose is to fix an issue with synced events where
 * they can fall out of sync if the player is too far away from one but not
 * the other.
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
 * Add the <always update> notetag to an event and it will update its movement
 * even if it's off-screen.
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

 Game_Event.prototype.updateSelfMovement = function() {
    if (
        !this._locked &&
        (this.isNearTheScreen() || this.event().meta?.["always update"]) &&
        this.checkStop(this.stopCountThreshold())
    ) {
        switch (this._moveType) {
            case 1:
                this.moveTypeRandom();
                break;
            case 2:
                this.moveTypeTowardPlayer();
                break;
            case 3:
                this.moveTypeCustom();
                break;
        }
    }
};