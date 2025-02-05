// Trilobytes - Star Knightess Aura Reload Fix/
// TLB_SKAReloadFix.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAReloadFix = true;

window.TLB = window.TLB || {};
TLB.SKAReloadFix = TLB.SKAReloadFix || {};

/*:
 * @target MZ
 * @plugindesc This plugin fixes maps reloading if the version changes, which
 * in SKA can mess up cutscenes since you can save while they're running.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * In SKA since we allow saving during cutscenes, the function that reloads the
 * map if the game version changes causes events to reset their positions,
 * meaning freezes if an event tries to move somewhere it can't go.
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
 */
 
Scene_Load.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId && (!$gameMap.isEventRunning() || this.savefileId() === 0)) {
        const mapId = $gameMap.mapId();
        const x = $gamePlayer.x;
        const y = $gamePlayer.y;
        const d = $gamePlayer.direction();
        $gamePlayer.reserveTransfer(mapId, x, y, d, 0);
        $gamePlayer.requestMapReload();
    }
};