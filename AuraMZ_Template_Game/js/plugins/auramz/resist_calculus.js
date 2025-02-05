//=============================================================================
// RPG Maker MZ - Resistance Calculus
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2022/09/09 (mod by Trihan)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Resistance Calculus
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help resist_calculus.js
 *
 * Computes the total resistance from a set of traits. Usually RPGM multiplies all rates together to obtain the
 * final rate. If the rates for WEAK and RESIST are inverse to each other, then they cancel each other out.
 * However, if they are not inverse, then this leads to WEAK * RESIST giving an unclear state.
 * Likewise WEAK * WEAK gives an even weaker state in the original implementation.
 *
 * This plugin turns the computation into a clearer calculus. Examples:
 * WEAK * WEAK = WEAK
 * RESIST * RESIST = RESIST
 * WEAK * RESIST = -
 * WEAK * WEAK * RESIT = WEAK
 *
 */

window.AuraMZ = window.AuraMZ || {};

(() => {
	
	const IMMUNE = 0;
	const WEAK = 1;
	const RESIST = 2;
	
	Game_BattlerBase.prototype.baseElementRate = function(elementId) {
		const baseElementRates = this.traitObjects().find(obj => obj.battlerName).traits.filter(trait => trait.code === Game_BattlerBase.TRAIT_ELEMENT_RATE && trait.dataId === elementId);
		return this.calcElementRate(baseElementRates);
    };
	
	Game_BattlerBase.prototype.elementRate = function(elementId) {
		const elementRates = this.traitsWithId(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId);
		return this.calcElementRate(elementRates);
    };

	// Inject custom calculus to compute the element rate
	Game_BattlerBase.prototype.calcElementRate = function(elementRates) {
		// Remember what weak/resist means in these variables
		const weak = 1.5, resist = 0.25;

		const occurrences = {};
		occurrences[IMMUNE] = elementRates.filter(rate => rate.value == 0).length;
		occurrences[WEAK] = elementRates.filter(rate => rate.value > 1).length;
		occurrences[RESIST] = elementRates.filter(rate => rate.value < 1).length;

		// If immune, return immune
		if ((occurrences[IMMUNE] || 0) > 0) return 0;
		if ((occurrences[WEAK] || 0) > (occurrences[RESIST] || 0)) return weak;
		if ((occurrences[RESIST] || 0) > (occurrences[WEAK] || 0)) return resist;
		
		// If weak and resist occur equally often, return neutral resistance 1
		return 1;
	};
})();

