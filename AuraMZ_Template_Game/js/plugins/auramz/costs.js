//=============================================================================
// RPG Maker MZ - Cost Tags
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
 * @plugindesc Cost Tags
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help costs.js
 *
 * This plugin parses introduces the cost tag. When applied to skills, the costs
 * will be deducted from the player. When applied to items, the costs are interpreted as stock limitations.
 *
 * [costs costType cost value]
 * costs		: Declares that this is a cost tag
 * costType		: Defines the type of cost. Possible values are
 *					- switches 
 *					- variables
 *					- stats
 * costTarget	: The parameter from which the costs need to be payed.
 * costValue	: Defines the expected value. If the action is executed, the value will be deducted.
 *			  	  In the case of switches, the value will be flipped.
 *
 * Supported tag visualisations:
 *
 * Skill HP Costs: HP Costs for skills are rendered in the skill selection window.
 * Stocks: Shows a Stock label in the shop menu
 */

// Class that processes cost tags
class CostTagFactory {

	static get TAG_TYPE_COSTS() { return "costs"; }

	static get COST_TYPE_SWITCH() { return "switch"; }
	static get COST_TYPE_VARIABLE() { return "variable"; }
	static get COST_TYPE_STAT() { return "stat"; }

	static get COST_TYPE_TOKEN_INDEX() { return 0; }
	static get COST_TARGET_TOKEN_INDEX() { return 1; }
	static get COST_VALUE_STAT() { return 2; }

	// Creates the appropriate cost tag object from a list of tokens
	static createCostTagFromTokens(tokens) {
		const costType = tokens[CostTagFactory.COST_TYPE_TOKEN_INDEX];
		const costTarget = tokens[CostTagFactory.COST_TARGET_TOKEN_INDEX];
		const costValue = tokens[CostTagFactory.COST_VALUE_STAT];

		switch (costType) {
			case CostTagFactory.COST_TYPE_SWITCH:
				return new CostTagSwitch(costTarget, costValue);
			case CostTagFactory.COST_TYPE_VARIABLE:
				return new CostTagVariable(costTarget, costValue);
			case CostTagFactory.COST_TYPE_STAT:
				return new CostTagStat(costTarget, costValue);
		}
	}

	// Creates all cost tags from a note
	static createCostTagsFromNote(note) {
		return TagFactory.createTagsFromNote(
			CostTagFactory.TAG_TYPE_COSTS, CostTagFactory.createCostTagFromTokens, note
		);
	}
}

// Base class representing some sort of cost
class CostTag {
	constructor(costTarget, costValue) {
		this._costTarget = costTarget;
		this._costValue = costValue;
	}

	costValue(battlerBase) {
		return eval(this._costValue);
	}
}

// Cost tag that requires a switch to have a certain value and switches it as payment
class CostTagSwitch extends CostTag {
	constructor(costTarget, costValue) {
		super(costTarget, costValue);
	}

	canPay(battlerBase) {
		const switchID = $dataSystem.switches.indexOf(this._costTarget);
		return this.costValue(battlerBase) == $gameSwitches.value(switchID);
	}

	pay(battlerBase) {
		const switchID = $dataSystem.switches.indexOf(this._costTarget);
		$gameSwitches.setValue(switchID, !this.costValue(battlerBase));
	}
}

// Cost tag that requires a variable to have at least a certain value
// and deducts the price from the variable as payment
class CostTagVariable extends CostTag {
	constructor(costTarget, costValue) {
		super(costTarget, costValue);
	}

	canPay(battlerBase) {
		const variableID = $dataSystem.variables.indexOf(this._costTarget);
		const currentValue = $gameVariables.value(variableID);
		return currentValue >= this.costValue(battlerBase);
	}

	pay(battlerBase) {
		const variableID = $dataSystem.variables.indexOf(this._costTarget);
		const currentValue = $gameVariables.value(variableID);
		const newValue = currentValue - this.costValue(battlerBase);
		$gameVariables.setValue(variableID, newValue);
	}
}

// Cost tag that requires a stat to have at least a certain value and
// deducts from the stat as payment
class CostTagStat extends CostTag {
	constructor(costTarget, costValue) {
		super(costTarget, costValue);
	}

	costValue(battlerBase) {
		return eval(this._costValue) * (this._costTarget === "mp" ? battlerBase.mcr : 1);
	}

	canPay(battlerBase) {
		if (this._costTarget === "hp") {
			return battlerBase[this._costTarget] > this.costValue(battlerBase);
		} else {
			return battlerBase[this._costTarget] >= this.costValue(battlerBase);
		}
	}

	pay(battlerBase) {
		const currentValue = battlerBase[this._costTarget];
		const costValue = this.costValue(battlerBase);
		switch (this._costTarget) {
			case "hp":
				battlerBase.setHp(currentValue - costValue);
				break;
			case "mp":
				battlerBase.setMp(currentValue - costValue);
				break;
			case "mhp":
				battlerBase.addParam(0, -costValue);
				break;
			case "mmp":
				battlerBase.addParam(1, -costValue);
				break;
			case "atk":
				battlerBase.addParam(2, -costValue);
				break;
			case "def":
				battlerBase.addParam(3, -costValue);
				break;
			case "mat":
				battlerBase.addParam(4, -costValue);
				break;
			case "mdf":
				battlerBase.addParam(5, -costValue);
				break;
			case "agi":
				battlerBase.addParam(6, -costValue);
				break;
			case "luk":
				battlerBase.addParam(7, -costValue);
				break;
			default: // Further cases arent implemented yet
		}
	}
}

// Inject the tag checks into the existing logic
(() => {
	// Extends the default canPaySkillCost check to include custom skill costs
	const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
	Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
		return (
			_Game_BattlerBase_canPaySkillCost.call(this, skill) &&
			this.canPayCustomSkillCost(skill)
		);
	};

	// In order to be able to pay for the costs of a skill
	// all custom costs must be satisfied
	Game_BattlerBase.prototype.canPayCustomSkillCost = function(skill) {
		const costs = CostTagFactory.createCostTagsFromNote(skill.note);
		return costs.every(cost => cost.canPay(this));
	};

	// Extends the default paySkillCost method by 
	// paying the custom skill costs
	const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
	Game_BattlerBase.prototype.paySkillCost = function(skill) {
		_Game_BattlerBase_paySkillCost.call(this, skill);
		this.payCustomSkillCost(skill);
	};

	// All custom costs are deducated
	Game_BattlerBase.prototype.payCustomSkillCost = function(skill) {
		const costs = CostTagFactory.createCostTagsFromNote(skill.note);
		costs.forEach(cost => cost.pay(this));
	};

	Game_BattlerBase.prototype.actorSkillCost = function(skill) {
		const costs = CostTagFactory.createCostTagsFromNote(skill.note);
		const statCost = costs.find(cost => cost instanceof CostTagStat);
		
		const skillCost = { currency: "mp", value: 0 };
		if (statCost == undefined) {
			const variableCost = costs.find(cost => cost instanceof CostTagVariable);
			if (variableCost != undefined) {
				skillCost.currency = variableCost._costTarget;
				skillCost.value = variableCost.costValue(this);
			}
		} else {
			skillCost.value = statCost.costValue(this);
			skillCost.currency = statCost._costTarget;
		}
		
		return skillCost;
	};

	// Extends the doBuy method to update the current item stock
	const _Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
	Scene_Shop.prototype.doBuy = function(number) {
		_Scene_Shop_doBuy.call(this, number);
		const costs = CostTagFactory.createCostTagsFromNote(this._item.note);
		const variableCost = costs.find(cost => cost instanceof CostTagVariable);

		if (variableCost != undefined) {
			for (let i = 0; i < number; ++i) {
				variableCost.pay();
			}
		}
	};

	// Extends the maxBuy method to limit the maximum number of buyable items by the stock
	const _Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
	Scene_Shop.prototype.maxBuy = function() {
		let maxBuy = _Scene_Shop_maxBuy.call(this);

		const costs = CostTagFactory.createCostTagsFromNote(this._item.note);
		const variableCost = costs.find(cost => cost instanceof CostTagVariable);

		if (variableCost != undefined) {
			const variableID = $dataSystem.variables.indexOf(variableCost._costTarget);
			const stock = $gameVariables.value(variableID);
			maxBuy = Math.min(maxBuy, stock);
		}

		return maxBuy;
	};

	const _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
	Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
		if (this._actor.skillMpCost(skill) > 0) {
			_Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
		} else {
			const costs = CostTagFactory.createCostTagsFromNote(skill.note);
			const statCost = costs.find(cost => cost instanceof CostTagStat);
			if (statCost == undefined) {
				const variableCost = costs.find(cost => cost instanceof CostTagVariable);
				if (variableCost != undefined) {
					this.changeTextColor(ColorManager.crisisColor());
					this.drawText(variableCost.costValue(this._actor), x, y, width, "right");
				}
			} else if (statCost._costTarget == "mp") {
				this.changeTextColor(ColorManager.mpGaugeColor2());
				this.drawText(statCost.costValue(this._actor), x, y, width, "right");
			} else {
				this.changeTextColor(ColorManager.hpGaugeColor1());
				this.drawText(statCost.costValue(this._actor), x, y, width, "right");
			}
		}
	};

	const NO_STOCK_LIMIT = -1;

	// Checks if there is a stock limitation on the item
	// Returns -1 if not and the stock limitation otherwise
	function getStock(item) {
		const costs = CostTagFactory.createCostTagsFromNote(item.note);
		const variableCost = costs.find(cost => cost instanceof CostTagVariable);

		if (variableCost != undefined) {
			const variableID = $dataSystem.variables.indexOf(variableCost._costTarget);
			return $gameVariables.value(variableID);
		}

		return NO_STOCK_LIMIT;
	}

	// Draws the global vendor stock of an item
	Window_ShopStatus.prototype.drawStock = function(stock, x, y) {
		const width = this.innerWidth - this.itemPadding() - x;
		const stockWidth = this.textWidth("0000");
		this.changeTextColor(ColorManager.systemColor());
		this.drawText("Stock", x, y, width - stockWidth);
		this.resetTextColor();
		this.drawText(stock, x, y, width, "right");
	};

	// Extends the refresh function to also update the global vendor stock label
	const _Window_ShopStatus_refresh = Window_ShopStatus.prototype.refresh;
	Window_ShopStatus.prototype.refresh = function() {
		_Window_ShopStatus_refresh.call(this);
		if (this._item) {
			const stock = getStock(this._item);
			if (stock != NO_STOCK_LIMIT) {
				// Put the stock information at the bottom of the item window
				const x = this.itemPadding();
				const y = this.innerHeight - this.itemPadding() - this.lineHeight();
				this.drawStock(stock, x, y);
			}
		}
	}

	// Disables buying a good if there is a stock limitation
	// and the current stock is 0
	const _Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
	Window_ShopBuy.prototype.isEnabled = function(item) {
		return (
			_Window_ShopBuy_isEnabled.call(this, item) &&
			getStock(item) != 0
		);
	}
})();
