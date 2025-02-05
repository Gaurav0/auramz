//=============================================================================
// RPG Maker MZ - Conditional Item Usage
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/08/02
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Conditional Item Usage
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help conditional_use_item.js
 *
 * This allows to introduce rules for constricting item usage.
 * It also changes the rule that an item in the menu is always used by the the consumer
 * and not by the member with the highest pharmacy value (default rule).
 *
 * NOTE TAGS:
 * <meetsUsableItemCondition:condition>
 *
 * EXAMPLE:
 * <meetsUsableItemCondition:this.name=="Reid">
 *
 */

(() => {
	// Inject logic that the one applying the item is always the consumer
	Scene_Item.prototype.user = function() {
		const memberId = Math.max(0, this._actorWindow.index());
		return $gameParty.members()[memberId];
	};

	// Inject custom usable item rule defined by meetsUsableitemCondition notetag
	const _Game_Actor_meetsUsableItemConditions = Game_Actor.prototype.meetsUsableItemConditions;
	Game_Actor.prototype.meetsUsableItemConditions = function(item) {
		if (!_Game_Actor_meetsUsableItemConditions.call(this, item)) {
			return false;
		}

		return !item.meta.meetsUsableItemCondition || eval(item.meta.meetsUsableItemCondition);
	}
})();