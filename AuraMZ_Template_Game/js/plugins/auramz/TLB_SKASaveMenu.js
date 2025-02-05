// Trilobytes - Star Knightess Aura Save Menu
// TLB_SKASaveMenu.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKASaveMenu = true;

window.TLB = TLB || {};
TLB.SKASaveMenu = TLB.SKASaveMenu || {};

/*:
 * @target MZ
 * @plugindesc This plugin modifies the save menu of Star Knightess
 * Aura to reflect the prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the current Scene_Files to match a
 * prototype specified by the client. It will not be compatible with any other
 * project and may not be used by anyone besides the client of the commission.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * savePagesMax - The maximum number of save pages.
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
 * ============================================================================
 *
 * @param savePageMax
 * @text Maximum number of save pages
 * @desc Maximum number of slot pages that can be saved.
 * @type number
 * @default 10
 *
 * @param defaultMapName
 * @text Default Map name
 * @desc Default string to use if no map display name is set.
 * @default ???
 *
 */

window.parameters = PluginManager.parameters('TLB_SKASaveMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKASaM = TLB.Param.SKASaM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKASaM);

DataManager.maxSavefiles = function() {
	return TLB.Param.SKASaM.savePageMax * 6;
};

Game_Party.prototype.charactersForSavefile = function() {
	return this.allMembers().map(actor => [
		actor.characterName(),
		actor.characterIndex()
	]);
};
