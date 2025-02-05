//=============================================================================
// RPG Maker MZ - Conditional Goods
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
 * @plugindesc Conditional Goods Customizations
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 * 
 * @help conditional_goods.js
 *
 * This plugin allows to customize the goods in a shop menu.
 *
 * Added tags:
 * <dynamic_prince:FORMULA>
 * - Evaluates FORMULA and returns the value when calling item.price
 *
 * @command setUnlockCondition
 * @text Set Unlock Condition
 * @desc Sets a condition that needs to evaluate to true in order for the good to be listed in a shop
 *
 * @arg goodID
 * @type number
 * @text goodID
 * @desc The ID of the good
 *
 * @arg unlockCondition
 * @type string
 * @text unlockCondition
 * @desc The unlock condition
 *
 * @command setDiscount
 * @text Set Discount
 * @desc Sets the discount
 *
 * @arg discount
 * @type Number
 * @text discount
 * @desc The discount
 */

(() => {
	const PLUGIN_NAME = "conditional_goods";

	// Inject custom logic to register dynamic prices
	const _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		_Scene_Boot_start.call(this);
		DataManager.processDynamicPrices();
	};

	// Create a price property for all items with dynamic prices
	DataManager.processDynamicPrices = function() {
		for (const item of $dataItems) {
			if (item && item.meta.dynamic_price) {
				const formula = item.meta.dynamic_price;
				item.basePrice = item.price;
				Object.defineProperty(item, 'price', {
					get: function() { return eval(formula) }
				});
			}
		}
	};

	// Registers the unlock conditions property in the game temp
	const _Game_Temp_Initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_Game_Temp_Initialize.call(this);
		this._unlockConditions = [];
	}

	// Registers a good unlock condition in the game temp data structure
	PluginManager.registerCommand(PLUGIN_NAME, "setUnlockCondition", args => {
		const goodID = parseInt(args.goodID);
		const unlockCondition = args.unlockCondition;
		$gameTemp._unlockConditions[goodID] = unlockCondition;
	});

	// Sets a global shopping discount for the next time the shop window is opened
	PluginManager.registerCommand(PLUGIN_NAME, "setDiscount", args => {
		const discount = eval(args.discount);
		$gameTemp._discount = discount;
	});

	// Clears the current unlock conditions when the shop is closed
	const _Scene_Shop_Stop = Scene_Shop.prototype.stop;
	Scene_Shop.prototype.stop = function() {
		_Scene_Shop_Stop.call(this);
		$gameTemp._unlockConditions = [];
		$gameTemp._discount = undefined;
	}

	// Checks if a given good is unlocked
	Scene_Shop.prototype.isGoodUnlocked = function(goodID) {
		const condition = $gameTemp._unlockConditions[goodID];
		return !condition || eval(condition);
	}

	// Takes a list of goods and returns the one that are unlocked
	Scene_Shop.prototype.filterUnlockedGoods = function(goods) {
		// The goodID is the entry with ID 1 in te good array
		return goods.filter(good => this.isGoodUnlocked(good[1]));
	}

	// Preprocess goods to filter out goods that not have been unlocked
	const _Scene_Shop_Prepare = Scene_Shop.prototype.prepare;
	Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
		const unlockedGoods = this.filterUnlockedGoods(goods);

		// Apply the discount to the goods, if a discount is set
		if ($gameTemp._discount != undefined) {
			for (const good of unlockedGoods) {
				const originalPrice = good[2] ? good[3] : $dataItems[good[1]].price;
				// Mark the good as having a custom price due to the discount
				good[2] = 1;
				good[3] = parseInt((originalPrice * ((100 - $gameTemp._discount))) / 100);
			}
		}

		_Scene_Shop_Prepare.call(this, unlockedGoods, purchaseOnly);
	};

})();