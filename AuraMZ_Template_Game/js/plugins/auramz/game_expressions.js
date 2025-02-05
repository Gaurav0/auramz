//=============================================================================
// RPG Maker MZ - Game Expressions
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2024/02/13
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Game Expressions
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help game_expressions.js
 *
 * Provides a global object $gameExpressions which functions similar to $gameVariables,
 * but for read-only expressions. Expression have a shortcut idenfitier to access  variables via "v".
 *
 * @param gameExpressions
 * @type struct<GameExpression>[]
 * @text Game Expressions
 * @desc List of javascript expressions
 */

/*~struct~GameExpression:
 *
 * @param expressionName
 * @type string
 * @text Expression Name
 * @desc Name of the expression
 *
 * @param expression
 * @type string
 * @text Expression
 * @desc The javascript expression
 */

class Game_Expressions {
	constructor(jsonExpressions) {
		this._expressions = [];

		for (const jsonExpression of jsonExpressions) {
			const { name, expression } = JSON.parse(jsonExpression);
			this._expressions.push({name, expression});
		}
	}

	name(expressionId) {
		return this._expressions[expressionId].name;
	}

	value(expressionId) {
		return eval(this._expressions[expressionId].expression);
	}
}

(() => {
	const PLUGIN_ID = "game_expressions";
	const PARAMS = PluginManager.parameters(PLUGIN_ID);

	// Initialize the game expressions object
	const _DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = () => {
		_DataManager_createGameObjects();
		window.$gameExpressions = new Game_Expressions(JSON.parse(PARAMS["gameExpressions"]));
	};
})();