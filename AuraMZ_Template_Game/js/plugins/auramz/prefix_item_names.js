//=============================================================================
// RPG Maker MZ - Prefix Item Names
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
 * @plugindesc Prefix Item Names
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help prefix_item_names.js
 *
 * Enables the customization of item names by overwriting the newly defined itemName function.
 *
 */

// Inject the extended drawing logic into the existing logic
(() => {
	// By default the name of an item is just the regular name in the database
	Window_Base.prototype.itemName = function(item, _actor) {
		return item.name;
	}

	// Overwrite the old draw item name function
	Window_Base.prototype.drawItemName = function(item, x, y, width) {
		if (item) {
			const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
			const textMargin = ImageManager.iconWidth + 4;
			const itemWidth = Math.max(0, width - textMargin);
			this.resetTextColor();
			this.drawIcon(item.iconIndex, x, iconY);

			const itemName = this.itemName(item, this._actor);
			this.drawText(itemName, x + textMargin, y, itemWidth);
		}
	}
})();
