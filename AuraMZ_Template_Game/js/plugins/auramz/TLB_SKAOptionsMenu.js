// Trilobytes - Star Knightess Aura Options Menu/
// TLB_SKAOptionsMenu.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAOptionsMenu = true;

window.TLB = TLB || {};
TLB.SKAOptionsMenu = TLB.SKAOptionsMenu || {};

/*:
 * @target MZ
 * @plugindesc This plugin modifies the options menu of Star Knightess
 * Aura to reflect the prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the current Scene_Options to match a
 * prototype specified by the client. It will not be compatible with any other
 * project and may not be used by anyone besides the client of the commission.
 *
 * COMMAND ORDER
 * The order in which commands will be listed in the controls category is
 * determined by the "Key Codes" parameter. They will be listed in the exact
 * order of the code numbers there.
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
 * @param categoryWindow
 * @text Category Window
 *
 * @param catWinX
 * @parent categoryWindow
 * @text X Position
 * @desc X coordinate of the window.
 * @type number
 * @min -9999
 * @max 9999
 * @default 34
 *
 * @param catWinY
 * @parent categoryWindow
 * @text Y Position
 * @desc Y coordinate of the window.
 * @type number
 * @min -9999
 * @max 9999
 * @default 78
 *
 * @param catWinWidth
 * @parent categoryWindow
 * @text Width
 * @desc Width of the window.
 * @type number
 * @min 1
 * @max 9999
 * @default 329
 *
 * @param catWinHeight
 * @parent categoryWindow
 * @text Height
 * @desc Height of the window.
 * @type number
 * @min 1
 * @max 9999
 * @default 360
 *
 * @param helpWindow
 * @text Help Window
 *
 * @param helpWinX
 * @parent helpWindow
 * @text X
 * @desc X coordinate of the window.
 * @type number
 * @min -9999
 * @max 9999
 * @default -6
 *
 * @param helpWinY
 * @parent helpWindow
 * @text Y Offset
 * @desc Y coordinate offset from the bottom of the options list
 * @type number
 * @min -9999
 * @max 9999
 * @default 4
 *
 * @param helpWinWidth
 * @parent helpWindow
 * @text Width
 * @desc Width of the window.
 * @type number
 * @min 1
 * @max 9999
 * @default 794
 *
 * @param helpWinHeight
 * @parent helpWindow
 * @text Height
 * @desc Height of the window.
 * @type number
 * @min 1
 * @max 9999
 * @default 121
 *
 * @param optionsWindow
 * @text Options Window
 *
 * @param optWinX
 * @parent optionsWindow
 * @text X
 * @desc X coordinate of the window.
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param optWinY
 * @parent optionsWindow
 * @text Y
 * @desc Y coordinate of the window.
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param optWinWidth
 * @parent optionsWindow
 * @text Width
 * @desc Width of the window.
 * @type number
 * @min 1
 * @max 9999
 * @default 424
 *
 * @param optWinHeight
 * @parent optionsWindow
 * @text Height
 * @desc Height of the window.
 * @type number
 * @min 1
 * @max 9999
 * @default 453
 *
 * @param keyCodes
 * @text Key Codes
 * @desc A list of key codes that can be remapped.
 * @type number[]
 * @default ["33","34","67","72","73","74","75","76","79","117","120"]
 *
 * @param codeBlacklist
 * @text Code Blacklist
 * @desc A list of key codes that *can't* be remapped.
 * @type number[]
 * @default ["9","13","16","17","18","27","32","37","38","39","40","45","115","116","20","91","144"]
 *
 * @param symToString
 * @text Symbol to String
 * @desc A mapper to convert symbol text into the desired string.
 * @type struct<sTS>[]
 * @default ["{\"symbol\":\"pageup\",\"string\":\"Page Up\"}","{\"symbol\":\"pagedown\",\"string\":\"Page Down\"}","{\"symbol\":\"item\",\"string\":\"Inventory Menu\"}","{\"symbol\":\"quest\",\"string\":\"Quest Menu\"}","{\"symbol\":\"status\",\"string\":\"Status Menu\"}","{\"symbol\":\"skill\",\"string\":\"Skill Menu\"}","{\"symbol\":\"options\",\"string\":\"Options Menu\"}","{\"symbol\":\"save\",\"string\":\"Save Menu\"}","{\"symbol\":\"load\",\"string\":\"Load Menu\"}","{\"symbol\":\"compendium\",\"string\":\"Compendium\"}","{\"symbol\":\"hide\",\"string\":\"Hide\"}"]
 *
 * @param codeToString
 * @text Code to String
 * @desc A mapper to convert specific codes into a desired string.
 * @type struct<cTS>[]
 * @default ["{\"code\":\"16\",\"string\":\"SHIFT\"}","{\"code\":\"17\",\"string\":\"CTRL\"}","{\"code\":\"27\",\"string\":\"ESC\"}","{\"code\":\"33\",\"string\":\"PGUP\"}","{\"code\":\"34\",\"string\":\"PGDN\"}","{\"code\":\"117\",\"string\":\"F6\"}","{\"code\":\"120\",\"string\":\"F9\"}","{\"code\":\"32\",\"string\":\"ENTER\"}","{\"code\":\"37\",\"string\":\"LEFT\"}","{\"code\":\"38\",\"string\":\"UP\"}","{\"code\":\"39\",\"string\":\"RIGHT\"}","{\"code\":\"40\",\"string\":\"DOWN\"}","{\"code\":\"112\",\"string\":\"F1\"}","{\"code\":\"113\",\"string\":\"F2\"}","{\"code\":\"114\",\"string\":\"F3\"}","{\"code\":\"115\",\"string\":\"F4\"}","{\"code\":\"118\",\"string\":\"F7\"}","{\"code\":\"119\",\"string\":\"F8\"}","{\"code\":\"121\",\"string\":\"F10\"}","{\"code\":\"122\",\"string\":\"F11\"}","{\"code\":\"123\",\"string\":\"F12\"}","{\"code\":\"223\",\"string\":\"`\"}","{\"code\":\"189\",\"string\":\"-\"}","{\"code\":\"187\",\"string\":\"=\"}","{\"code\":\"46\",\"string\":\"DEL\"}","{\"code\":\"36\",\"string\":\"HOME\"}","{\"code\":\"35\",\"string\":\"END\"}","{\"code\":\"219\",\"string\":\"[\"}","{\"code\":\"221\",\"string\":\"]\"}","{\"code\":\"222\",\"string\":\"#\"}","{\"code\":\"106\",\"string\":\";\"}","{\"code\":\"192\",\"string\":\"'\"}","{\"code\":\"188\",\"string\":\",\"}","{\"code\":\"190\",\"string\":\".\"}","{\"code\":\"191\",\"string\":\"/\"}","{\"code\":\"220\",\"string\":\"\\\\\"}","{\"code\":\"111\",\"string\":\"NUM /\"}","{\"code\":\"106\",\"string\":\"NUM *\"}","{\"code\":\"109\",\"string\":\"NUM -\"}","{\"code\":\"103\",\"string\":\"NUM7\"}","{\"code\":\"104\",\"string\":\"NUM8\"}","{\"code\":\"105\",\"string\":\"NUM9\"}","{\"code\":\"100\",\"string\":\"NUM4\"}","{\"code\":\"101\",\"string\":\"NUM5\"}","{\"code\":\"102\",\"string\":\"NUM6\"}","{\"code\":\"97\",\"string\":\"NUM1\"}","{\"code\":\"98\",\"string\":\"NUM2\"}","{\"code\":\"99\",\"string\":\"NUM3\"}","{\"code\":\"96\",\"string\":\"NUM0\"}","{\"code\":\"110\",\"string\":\"NUM .\"}","{\"code\":\"107\",\"string\":\"NUM +\"}"]
 *
 * @param helpText
 * @text Help Text
 * @desc The descriptions to display for options.
 * @type struct<helpText>[]
 * @default ["{\"symbol\":\"alwaysDash\",\"helpText\":\"\\\"When on, the player will move at dash speed by default and will hold the\\\\ndash button to walk.\\\"\"}","{\"symbol\":\"commandRemember\",\"helpText\":\"\\\"When on, memorise positions in the actor command window.\\\"\"}","{\"symbol\":\"touchUI\",\"helpText\":\"\\\"When on, on-screen buttons will show for the menu, cancelling,\\\\nand setting buy/sell quantities in shops.\\\"\"}","{\"symbol\":\"bgmVolume\",\"helpText\":\"\\\"The volume of the background music.\\\"\"}","{\"symbol\":\"bgsVolume\",\"helpText\":\"\\\"The volume of the background sound effects.\\\"\"}","{\"symbol\":\"meVolume\",\"helpText\":\"\\\"The volume of musical effects (victory, game over etc).\\\"\"}","{\"symbol\":\"seVolume\",\"helpText\":\"\\\"The volume of sound effects.\\\"\"}"]
 *
 * @param difficultyCE
 * @text Difficulty Common Event
 * @desc The common event to call when selecting the difficulty option
 * @type common_event
 * @default 27
 *
 * @param interfaceOptions
 * @text Interface Options
 * @desc The list of options that will be in the interface category.
 * @type string[]
 * @default ["commandRemember", "touchUI", "instantText", "hudsize", "doubleTap"]
 *
 */
/*~struct~sTS:
* @param symbol
* @text Symbol
* @desc The text for the symbol to convert.
*
* @param string
* @text String
* @desc What will appear in the window in the symbol's place.
*
*/
/*~struct~cTS:
* @param code
* @text Code
* @desc The code to convert.
* @type number
*
* @param string
* @text String
* @desc What will appear in the window.
*/
/*~struct~helpText:
* @param symbol
* @text Symbol
* @desc The symbol corresponding to the option.
*
* @param helpText
* @text Help Text
* @desc The text that will be displayed in the window.
*/

window.parameters = PluginManager.parameters('TLB_SKAOptionsMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKAOM = TLB.Param.SKAOM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAOM);

Input.keyMapper[49] = "one";
Input.keyMapper[50] = "two";
Input.keyMapper[51] = "three";
Input.keyMapper[52] = "four";

Input.originalKeyMapper = { ...Input.keyMapper };

ConfigManager.keyMapper = { ...Input.keyMapper };
ConfigManager.alwaysDash = true;
ConfigManager.showNewMarker = false;

TLB.SKAOptionsMenu.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = TLB.SKAOptionsMenu.ConfigManager_makeData.call(this);
	config.keyMapper = { ...Input.keyMapper };
	return config;
};

ConfigManager.readKeyMapper = function(config, name) {
	if (name in config) {
		return config[name];
	} else {
		return Input.originalKeyMapper;
	}
};

TLB.SKAOptionsMenu.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	TLB.SKAOptionsMenu.ConfigManager_applyData.call(this, config);
	this.keyMapper = this.readKeyMapper(config, "keyMapper");
	this.alwaysDash = this.readFlag(config, "alwaysDash", true);
};

TLB.SKAOptionsMenu.Window_Options_initialize = Window_Options.prototype.initialize;
Window_Options.prototype.initialize = function(rect) {
	TLB.SKAOptionsMenu.Window_Options_initialize.call(this, rect);
	this._category = null;
	this._remapKey = null;
	this.deactivate();
};

Input._onKeyDown = function(event) {
	if (this._shouldPreventDefault(event.keyCode)) {
		event.preventDefault();
	}
	if (event.keyCode === 144) {
		// Numlock
		this.clear();
	}
	if (SceneManager._scene instanceof Scene_Options && SceneManager._scene._optionsWindow._remapKey) {
		const blacklist = TLB.Param.SKAOM.codeBlacklist;
		if (!blacklist.includes(event.keyCode)) {
			const win = SceneManager._scene._optionsWindow;
			const index = win.index();
			const symbol = win.commandSymbol(index);
			const code = symbol.replace("mapper", "");
			const buttonName = this.originalKeyMapper[code];
			const matches = Object.keys(this.keyMapper).filter(key => this.keyMapper[key] === this.originalKeyMapper[code]);
			const value = Number(matches[matches.length - 1]);
			if (!blacklist.includes(value)) delete this.keyMapper[value];
			this.keyMapper[event.keyCode] = buttonName;
			win.redrawItem(win.findSymbol(symbol));
			win._remapKey = null;
		} else {
			this.registerKey(event.keyCode);
		}
	} else {
		this.registerKey(event.keyCode);
	}
};

Input.registerKey = function(code) {
	const buttonName = this.keyMapper[code];
	if (buttonName) {
		this._currentState[buttonName] = true;
	}
};

Window_Options.prototype.makeCommandList = function() {
	switch (this._category) {
		case "general":
			this.addGeneralOptions();
			break;
		case "interface":
			this.addInterfaceOptions();
			break;
		case "audio":
			this.addVolumeOptions();
			break;
		case "controls":
			this.addControlOptions();
			break;
		default:
			break;
	}
};

TLB.SKAOptionsMenu.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol.includes("reset")) {
		Input.keyMapper = { ...Input.originalKeyMapper };
		this.playOkSound();
	} else if (symbol.includes("mapper")) {
		if (this._remapKey) this._remapKey = null;
		else this._remapKey = Number(symbol.replace("mapper", ""));
		this.redrawItem(this.findSymbol(symbol));
		this.playOkSound();
	} else if (symbol === "difficulty") {
		if (this.isCommandEnabled(index)) {
			$gameTemp.reserveCommonEvent(parseInt(TLB.Param.SKAOM.difficultyCE));
			SceneManager.goto(Scene_Map);
		}
	} else if (!this.isCommandEnabled(index)) {
		this.playBuzzerSound();
	} else {
		TLB.SKAOptionsMenu.Window_Options_processOk.call(this);
	}
};

TLB.SKAOptionsMenu.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol === "difficulty" || symbol === "autosave_menu") this.playBuzzerSound();
	else TLB.SKAOptionsMenu.Window_Options_cursorRight.call(this);
};

TLB.SKAOptionsMenu.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
	const index = this.index();
    const symbol = this.commandSymbol(index);
	if (symbol === "difficulty" || symbol === "autosave_menu") this.playBuzzerSound();
	else TLB.SKAOptionsMenu.Window_Options_cursorLeft.call(this);
};

TLB.SKAOptionsMenu.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	this.addCommand("Difficulty", "difficulty", !SceneManager.isPreviousScene(Scene_Title) && !$gameMessage.isBusy());
	TLB.SKAOptionsMenu.Window_Options_addGeneralOptions.call(this);

	// Filter out all options that belong into the interface category
	const interfaceOptions = this.interfaceOptions();
	this._list = this._list.filter(command => !interfaceOptions.includes(command.symbol));
};

Window_Options.prototype.addInterfaceOptions = function() {
	TLB.SKAOptionsMenu.Window_Options_addGeneralOptions.call(this);
	const interfaceOptions = this.interfaceOptions();
	// Filter out all options that are not listed by the interfaceOptions
	this._list = this._list.filter(command => interfaceOptions.includes(command.symbol));

	// Customize touchUI command to be only enabled if the game is running using Nwjs
	this._list.remove(this._list.find(command => command.symbol === "touchUI"));
	const index = this._list.findIndex(command => command.symbol === "commandRemember");
	this._list.splice(index + 1, 0, { name: "Touch UI", symbol: "touchUI", enabled: Utils.isNwjs(), ext: null });
};

Window_Options.prototype.interfaceOptions = function() {
	return TLB.Param.SKAOM.interfaceOptions;
};

Window_Options.prototype.addControlOptions = function() {
	const keyCodes = TLB.Param.SKAOM.keyCodes;
	const strings = {};
	const symToString = TLB.Param.SKAOM.symToString;
	for (const obj of symToString) {
		strings[obj.symbol] = obj.string;
	}
	for (const code of keyCodes) {
		const mapping = Input.originalKeyMapper[code];
		const command = strings[mapping];
		this.addCommand(command, `${code}mapper`);
	}
	this.addCommand("Reset to defaults", "reset");
};

Window_Options.prototype.mapperText = function(symbol) {
	const code = Number(symbol.replace("mapper", ""));
	if (this._remapKey === code) return "PRESS A KEY";
	let matches = Object.keys(Input.keyMapper).filter(key => Input.keyMapper[key] === Input.originalKeyMapper[code] && String.fromCharCode(key) >= "A" && String.fromCharCode(key) <= "Z");
	if (matches.length === 0) matches = Object.keys(Input.keyMapper).filter(key => Input.keyMapper[key] === Input.originalKeyMapper[code]);
	const value = matches[matches.length - 1];
	if (!value) return "";
	const strings = {};
	const codeMapper = TLB.Param.SKAOM.codeToString;
	for (const obj of codeMapper) {
		strings[obj.code] = obj.string;
	}
	return strings[value] || String.fromCharCode(value);
};

TLB.SKAOptionsMenu.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
	const symbol = this.commandSymbol(index);
	if (symbol.includes("reset")) return "";
	else if (symbol.includes("mapper")) {
		return this.mapperText(symbol);
	} else if (symbol === "difficulty") {
		const difficulty = $gameVariables.value(624);
		switch (difficulty) {
			case -2:
				return "Story";
			case -1:
				return "Explorer";
			case 0:
				return "Normal";
			case 1:
				return "Hard";
			case 2:
				return "Nightmare";
		}
	} else {
		return TLB.SKAOptionsMenu.Window_Options_statusText.call(this, index);
	}
};

Window_Options.prototype.setCategory = function(category) {
	this._category = category;
	this.refresh();
};

TLB.SKAOptionsMenu.Window_Options_select = Window_Options.prototype.select;
Window_Options.prototype.select = function(index) {
	TLB.SKAOptionsMenu.Window_Options_select.call(this, index);
	if (this._helpWindow && this.currentData()) this._helpWindow.setOption(this.currentData().symbol);
};

class Window_OptionsCategory extends Window_Command {
	constructor(rect) {
		super(rect);
		this.activate();
		this.select(0);
	}

	makeCommandList() {
		this.addCommand("General", "general");
		this.addCommand("Interface", "interface");
		this.addCommand("Audio", "audio");
		this.addCommand("Controls", "controls", Utils.isNwjs());
	}

	update() {
		super.update();
		if (this._optionsWindow) {
			this._optionsWindow.setCategory(this.currentSymbol());
		}
	}

	setOptionsWindow(optionsWindow) {
		this._optionsWindow = optionsWindow;
	}
}

class Window_OptionsHelp extends Window_Help {
	setOption(symbol) {
		const text = TLB.Param.SKAOM.helpText.find(item => item.symbol === symbol)?.helpText;
		if (text) {
			this.setText(text);
		} else {
			this.setText("");
		}
	}
}

TLB.SKAOptionsMenu.Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	TLB.SKAOptionsMenu.Scene_Boot_start.call(this);
	Input.keyMapper = { ...ConfigManager.keyMapper } || { ...Input.originalKeyMapper };
};

TLB.SKAOptionsMenu.Scene_Options_create = Scene_Options.prototype.create;
Scene_Options.prototype.create = function() {
	TLB.SKAOptionsMenu.Scene_Options_create.call(this);
	this.createCategoryWindow();
	this.createHelpWindow();
};

Scene_Options.prototype.createCategoryWindow = function() {
	const rect = this.categoryWindowRect();
	this._categoryWindow = new Window_OptionsCategory(rect);
	this._categoryWindow.setOptionsWindow(this._optionsWindow);
	this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._categoryWindow);
	this._optionsWindow.x = rect.x + rect.width + 1;
	this._optionsWindow.y = rect.y + 2;
	this._optionsWindow.setHandler("cancel", this.onOptionCancel.bind(this));
};

Scene_Options.prototype.categoryWindowRect = function() {
	const params = TLB.Param.SKAOM;
	const wx = params.catWinX;
	const wy = params.catWinY;
	const ww = params.catWinWidth;
	const wh = params.catWinHeight;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Options.prototype.createHelpWindow = function() {
	const rect = this.helpWindowRect();
	this._helpWindow = new Window_OptionsHelp(rect);
	this.addWindow(this._helpWindow);
	this._optionsWindow.setHelpWindow(this._helpWindow);
};

Scene_Options.prototype.helpWindowRect = function() {
	const params = TLB.Param.SKAOM;
	const wx = params.helpWinX;
	const wy = this._optionsWindow.y + this._optionsWindow.height + params.helpWinY;
	const ww = params.helpWinWidth;
	const wh = params.helpWinHeight;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Options.prototype.optionsWindowRect = function() {
	const params = TLB.Param.SKAOM;
	const ww = params.optWinWidth;
	const wh = params.optWinHeight;
	const wx = params.optWinX;
	const wy = params.optWinY;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Options.prototype.onCategoryOk = function() {
	this._optionsWindow.activate();
	this._optionsWindow.select(0);
};

Scene_Options.prototype.onOptionCancel = function() {
	this._optionsWindow._remapKey = null;
	this._optionsWindow.select(0);
	this._optionsWindow.ensureCursorVisible();
	this._optionsWindow.deselect();
	this._categoryWindow.activate();
	this._helpWindow.setOption("");
};

// Inject custom volume offset of 10 steps
Window_Options.prototype.volumeOffset = function() {
	return 10;
};

if (PluginManagerEx.isExistPlugin("TLB_SKAUIItemMenu") || PluginManagerEx.isExistPlugin("TLB_SKAUISkillMenu")) {
	TLB.SKAOptionsMenu.ConfigManager_makeData2 = ConfigManager.makeData;
	ConfigManager.makeData = function() {
		const config = TLB.SKAOptionsMenu.ConfigManager_makeData2.call(this);
		config.showNewMarker = this.showNewMarker;
		return config;
	};

	TLB.SKAOptionsMenu.ConfigManager_applyData2 = ConfigManager.applyData;
	ConfigManager.applyData = function(config) {
		TLB.SKAOptionsMenu.ConfigManager_applyData2.call(this, config);
		this.showNewMarker = this.readFlag(config, "showNewMarker", true);
	};

	TLB.SKAOptionsMenu.Window_Options_addInterfaceOptions2 = Window_Options.prototype.addInterfaceOptions;
	Window_Options.prototype.addInterfaceOptions = function() {
		TLB.SKAOptionsMenu.Window_Options_addInterfaceOptions2.call(this);
		this.addCommand("Show NEW Marker", "showNewMarker");
	};
}
