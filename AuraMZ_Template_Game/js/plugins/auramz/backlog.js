window.Imported = window.Imported || {};
window.Imported.Backlog = true;

window.Backlog = window.Backlog || {};

/*:
@author coffeenahc / Trihan

@target MZ
@plugindesc This plugin adds message backlog functionality.
@url https://gitgud.io/auragamedev/auramz

@help
Help ======================================================================

License ======================================================================

Copyright 2023 Auradev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@param Backlog limit
@type Number
@default 100
@desc Only the x latest entries will be added to backlog

@param Backlog page scroll
@type Number
@default 60
@desc Scroll backlog by x amount

*/

Backlog.Param = PluginManager.parameters("backlog");

//GAME SYSTEM
Backlog.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Backlog.Game_System_initialize.call(this);
	this._maxStorableLogs = this.getMaxLogs();
	this._shouldLog = true;
	this._passedLabelIndexes = [];
	this._backlogs = [];
};

Game_System.prototype.convertEscapeCharacters = function(text) {
	text = Window_Base.prototype.convertEscapeCharacters(text);
	text = PluginManagerEx.convertEscapeCharactersEx(text);
	return text;
};

Game_System.prototype.getMaxLogs = function () {
	const maxLogs = this._maxStorableLogs || Backlog.Param["Backlog limit"];
	return maxLogs || 100;
};

Game_System.prototype.addBackLogs = function(t) {
	this._backlogs = this._backlogs || [];
	const logs = this._backlogs;
	if (this._lastSpeaker !== t.speaker) this.addNewSpeaker(t.speaker);
	const text = this.convertEscapeCharacters("\\c[0]" + t.texts.join("\n"));
	logs.push(text);
	const maxLogs = this.getMaxLogs();
	this._backlogs = logs.slice(-maxLogs);
};

Game_System.prototype.addNewSpeaker = function(speaker) {
	this._lastSpeaker = speaker;
	const text = this.convertEscapeCharacters(`\\c[14]${speaker}:`);
	this._backlogs.push(text);
};

//GAME MESSAGE
Game_Message.prototype.textsForBackLog = function() {
	let log = {
		speaker: this._speakerName ? this._speakerName : "System",
		texts: this._texts
	}
	log.texts[log.texts.length - 1] += "\\l";
	return log;
};

Game_Message.prototype.addWithLog = function (text) {
	let log = {
		speaker: this._speakerName ? this._speakerName : "System",
		texts: [text]
	}
	$gameMessage.add(text);
	$gameSystem.addBackLogs(log);
};

//GAME INTERPRETER
Backlog.Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function(params) {
	const success = Backlog.Game_Interpreter_command101.call(this, params);
	if (success && !this._skipLog) $gameSystem.addBackLogs($gameMessage.textsForBackLog());
	this._skipLog = false;
	return success;
};

Backlog.Game_Interpreter_command105 = Game_Interpreter.prototype.command105;
Game_Interpreter.prototype.command105 = function(params) {
	const success = Backlog.Game_Interpreter_command105.call(this, params);
	if (success && !this._skipLog) $gameSystem.addBackLogs($gameMessage.textsForBackLog());
	this._skipLog = false;
	return success;
};

Scene_Message.prototype.onMessageCommandBacklog = function() {
	SceneManager.push(Scene_BackLog);
};

Scene_Menu.prototype.commandBacklog = function() {
	SceneManager.push(Scene_BackLog);
};

Backlog.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	Backlog.Scene_Menu_createCommandWindow.call(this);
	this._commandWindow.setHandler("backlog", this.commandBacklog.bind(this));
};

Backlog.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	Backlog.Window_MenuCommand_addOriginalCommands.call(this);
	this.addCommand("Backlog", "backlog");
};

//SCENE BACKLOG
class Scene_BackLog extends Scene_MenuBase {
	constructor() {
		super();
		this._scrollAmount = parseInt(Backlog.Param["Backlog page scroll"]);
	}

	create() {
		super.create();
		this.createBacklogWindow();
	}

	needsPageButtons() {
		return true;
	}

	pageUp() {
		this._backlogWindow.scrollBy(0, -this._scrollAmount);
	}

	pageDown() {
		this._backlogWindow.scrollBy(0, this._scrollAmount);
	}

	setBackgroundOpacity(opacity) {
		this._backgroundSprite.opacity = opacity;
	}

	createBacklogWindow() {
		const rect = this.logWindowRect();
		this._backlogWindow = new Window_BackLog(rect);
		this._backlogWindow.setTexts(this.makeTexts())
		this.truncateLogs();
		this._backlogWindow.setHandler("cancel", this.onBacklogCancel.bind(this));
		this._backlogWindow.activate();
		this.addWindow(this._backlogWindow);
	}

	createPageButtons() {
		super.createPageButtons();
		this._pageupButton.setClickHandler(this.pageUp.bind(this));
		this._pagedownButton.setClickHandler(this.pageDown.bind(this));
	}

	onBacklogCancel() {
		SceneManager.pop();
	}

	truncateLogs() {
		if (!$gameSystem._backlogs) {
			return;
		}
		const maxLogs = $gameSystem.getMaxLogs();
		$gameSystem._backlogs = $gameSystem._backlogs.slice(-maxLogs);
	}

	makeTexts() {
		if (!$gameSystem._backlogs) {
			return "";
		}
		return $gameSystem._backlogs.join("\n");
	}

	logWindowRect() {
		const ww = Graphics.boxWidth;
		const wh = Graphics.boxHeight - (this._cancelButton?.height || 0);
		const wx = 0;
		const wy = 5 + (this._cancelButton?.height || 0);
		return new Rectangle(wx, wy, ww, wh);
	}
}

//WINDOW LOGS
class Window_BackLog extends Window_Selectable {
	constructor(rect) {
		super(rect);
		this.clearText();
		this.setBackgroundType(1);
	}

	clearScrollStatus() {
		super.clearScrollStatus();
		this._inputCount = 0;
	}

	setTexts(texts) {
		this._text = texts;
		this.refresh();
	}

	clearText() {
		this._text = "";
	}

	refresh() {
		this.clearScrollStatus();
		this._allTextHeight = this.textSizeEx(this._text).height;
		let updateMaxLogs = false;
		const maxTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
		if (this._allTextHeight > maxTexSize) updateMaxLogs = true;
		while (this._allTextHeight > maxTexSize) {
			this._text = this._text.slice(this._text.indexOf("\n") + 1);
			this._allTextHeight = this.textSizeEx(this._text).height;
		}
		if (updateMaxLogs) $gameSystem._maxStorableLogs = this._text.split("\n").length;
		this.createContents();
		this.scrollTo(0, this.maxScrollY());
		const rect = this.baseTextRect();
		this.drawTextEx(this._text, rect.x, rect.y, rect.width);
	}

	contentsHeight() {
		return Math.max(this._allTextHeight, 1);
	}

	overallHeight() {
		return this.contentsHeight();
	}

	isScrollEnabled() {
		return true;
	}

	updateOrigin() {
		this.origin.x = this._scrollX;
		this.origin.y = this._scrollY;
	}

	processWheelScroll() {
		if (this.isWheelScrollEnabled() && this.isTouchedInsideFrame()) {
			const threshold = 20;
			const wheelY = TouchInput.wheelY;
			if (Math.abs(wheelY) >= threshold) this.smoothScrollBy(0, wheelY);
		}
	}

	processCursorMove() {
		if (this.isScrollEnabled()) {
			if (Input.isPressed("pagedown")) {
				this.smoothScrollBy(0, this.innerHeight);
				return;
			}
			if (Input.isPressed("pageup")) {
				this.smoothScrollBy(0, -this.innerHeight);
				return;
			}
			const lastInput = this._lastInput;
			let sign;
			if (Input.isPressed("down")) {
				this._lastInput = "down";
				sign = 1;
			}
			if (Input.isPressed("up")) {
				this._lastInput = "up";
				sign = -1;
			}
			if (sign) {
				this._inputCount = (this._lastInput === lastInput) ? this._inputCount + 1 : 0;
				this.smoothScrollBy(0, sign * (this._inputCount + 1) * 10);
			} else if (!Input.isPressed(lastInput)) {
				this._lastInput = "";
			}
		}
	}

	processEscapeCharacter(code, textState) {
		if (code == "L") this.resetFontSettings();
		super.processEscapeCharacter(code, textState);
	}
}
