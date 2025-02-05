window.Imported = window.Imported || {};
window.Imported.GBC_SKAMessageWindow = true;

window.GBC = window.GBC || {};
GBC.SKAMessage = GBC.SKAMessage || {};

/*:
@author coffeenahc

@target MZ
@plugindesc This plugin modifies the message window and adds visual
novel command elements. Commissioned work by coffeenahc for Star Knightness
Aura.
@url https://gitgud.io/auragamedev/auramz

@help
Help ======================================================================

- Use left and right / mouse to navigate the message command bar.

- Add to the struct parameter to change name box text color to a gradient one.
Specify the name, start, and end colors.

License ======================================================================

Copyright 2022 Auradev

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

@param fontSettings
@text Font Settings

@param maxSizeThreshold
@parent fontSettings
@text Maximum Size Threshold
@desc The maximum size at which font size no longer increases.
@type number
@default 96

@param minSizeThreshold
@parent fontSettings
@text Minimum Size Threshold
@desc The minimum size at which font size no longer decreases.
@type number
@default 22

@param minSize
@parent fontSettings
@text Minimum Menu Size
@desc The minimum size the font can be in the menu.
@type number
@default 12

@param minMessageSize
@parent fontSettings
@text Minimum Message Size
@desc The minimum size the font can be in the message window.
@type number
@default 14

@param sizeChange
@parent fontSettings
@text Size Change
@desc The number of points to increase/decrease font size per text code.
@type number
@default 12

@param Name Gradient Color
@type struct<NameColorAssociation>[]
@desc Association for a name with a color

@param Images

@param Message Window Background
@parent Images
@desc The background image to use for the message window.
@type file
@dir img/menu/
@default Message_Window/MESSAGE_WINDOW_BG

@param Windowskin Image
@parent Images
@desc The image to use for the message windwskin.
@type file
@dir img/system/
@default Window2

@param Command Window
@parent Images

@param Command Window Background
@parent Command Window
@desc The background image to use for the message command window.
@type file
@dir img/menu/
@default Message_Window/MESSAGE_COMMAND_BG

@param Command Window Right Arrow
@parent Command Window
@desc The image to use for the command window's right arrow.
@type file
@dir img/menu/
@default Message_Window/MESSAGE_COMMAND_R

@param Command Window Right Arrow Selected
@parent Command Window
@desc The selected image to use for the command window's right arrow.
@type file
@dir img/menu/
@default Message_Window/MESSAGE_COMMAND_RA

@param Command Window Left Arrow
@parent Command Window
@desc The image to use for the command window's left arrow.
@type file
@dir img/menu/
@default Message_Window/MESSAGE_COMMAND_L

@param Command Window Left Arrow Selected
@parent Command Window
@desc The selected image to use for the command window's left arrow.
@type file
@dir img/menu/
@default Message_Window/MESSAGE_COMMAND_LA

@param Name Box Background Image
@parent Images
@desc The background image to use for the name window.
@type file
@dir img/menu/
@default Message_Window/MESSAGE_MENU_NAME_WINDOW_BG_BIG

@param Choice Window
@parent Images

@param Choice Window Cursor Image
@parent Choice Window
@desc The image to use for the choice window cursor.
@type file
@dir img/menu/
@default Message_Window/MESSAGE_MENU_CHOICE_WINDOW_TINY_SELECT

@param Choice Window Background Image
@parent Choice Window
@desc The image to use for the choice window background.
@type file
@dir img/menu/
@default Message_Window/MESSAGE_MENU_CHOICE_WINDOW_HUGE_6_BG
*/

/*~struct~NameColorAssociation:
 *
 * @param name
 * @type string
 * @text Name
 * @desc A message box name
 *
 * @param startColor
 * @type string
 * @text Start Color
 *
 * @param endColor
 * @type string
 * @text End Color

 */

const GBC_SKAMW = PluginManager.parameters("GBC_SKAMessageWindow");

GBC.SKAMessage.Input_isSkipButtonPressed = Input.isSkipButtonPressed;
Input.isSkipButtonPressed = function() {
	return GBC.SKAMessage.Input_isSkipButtonPressed.call(this) || $gameMessage?._shouldFastForward;
};

GBC.SKAMessage.BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
	GBC.SKAMessage.BattleManager_setup.call(this, troopId, canEscape, canLose);
	$gameMessage._shouldFastForward = false;
};

GBC.SKAMessage.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
	const contents = GBC.SKAMessage.DataManager_makeSaveContents.call(this);
	if ($gameMessage._choiceCallback) $gameMessage._choiceCallbackStr = $gameMessage._choiceCallback.toString();

	if ($gameMessage.callbacks) {
		$gameMessage._callbacksStr = [];
		$gameMessage._callbacksStr = $gameMessage.callbacks.map(callback => callback.toString());
	}
	contents.messages = $gameMessage;
	return contents;
};

GBC.SKAMessage.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
	GBC.SKAMessage.DataManager_extractSaveContents.call(this, contents);
	$gameMessage = contents.messages || new Game_Message();
	if ($gameMessage._choiceCallbackStr) {
		const callback = function (str) {
			return eval(str);
		}.call(contents.map._interpreter._childInterpreter || contents.map._interpreter, $gameMessage._choiceCallbackStr);
		$gameMessage.setChoiceCallback(callback);
		delete $gameMessage._choiceCallbackStr;
	}
	if ($gameMessage._callbacksStr) {
		$gameMessage.callbacks = [];
		for (const callbackStr of $gameMessage._callbacksStr) {
			const callback = function (str) {
				return eval(str);
			}.call(contents.map._interpreter, callbackStr);
			$gameMessage.callbacks.push(callback);
		}
		delete $gameMessage._callbacksStr;
	}
};

GBC.SKAMessage.Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function() {
	GBC.SKAMessage.Scene_Boot_loadGameFonts.call(this);
	FontManager.load("rmmz-windowmessage", "FRADMCN-Mod.ttf");
};

Scene_Message.prototype.processWheelScroll = function() {
	if (this._messageWindow.isTouchedInsideFrame()) {
		const threshold = 20;
		if (this.shouldShowBacklog(threshold)) SceneManager.push(Scene_BackLog);
	}
};

Scene_Message.prototype.shouldShowBacklog = function(threshold) {
	const posCondition = TouchInput.wheelY >= threshold && !$gameParty.inBattle();
	const negCondition = TouchInput.wheelY <= -threshold && !$gameParty.inBattle();
	return posCondition || negCondition;
};

Window_Message.prototype.isTouchedInsideFrame = Window_Scrollable.prototype.isTouchedInsideFrame;

GBC.SKAMessage.Scene_Message_update = Scene_Message.prototype.update;
Scene_Message.prototype.update = function() {
	GBC.SKAMessage.Scene_Message_update.call(this);
	this.messageCommandWindowListener();
	this.processWheelScroll();
};

GBC.SKAMessage.Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
Scene_Message.prototype.createAllWindows = function() {
	this.createMessageCommandWindow();
	GBC.SKAMessage.Scene_Message_createAllWindows.call(this);
};

GBC.SKAMessage.Scene_Message_messageWindowRect = Scene_Message.prototype.messageWindowRect;
Scene_Message.prototype.messageWindowRect = function() {
	const rect = GBC.SKAMessage.Scene_Message_messageWindowRect.call(this);
	rect.height = this.calcWindowHeight(3, false) + 8;
	return rect;
};

GBC.SKAMessage.Scene_Message_associateWindows = Scene_Message.prototype.associateWindows;
Scene_Message.prototype.associateWindows = function() {
	const win = this._messageCommandWindow;
	GBC.SKAMessage.Scene_Message_associateWindows.call(this);
	this._messageWindow.setMessageCommandWindow(win);
	this._messageCommandWindow.setMessageWindow(this._messageWindow);
	this._choiceListWindow.setMessageCommandWindow(win);
	this._eventItemWindow.setMessageCommandWindow(win);
	this._numberInputWindow.setMessageCommandWindow(win);
};

Scene_Message.prototype.createMessageCommandWindow = function() {
	const rect = this.messageCommandWindowRect();
	this._messageCommandWindow = new Window_MessageCommand(rect);
	this.addWindow(this._messageCommandWindow);
};

Scene_Message.prototype.messageCommandWindowRect = function() {
	const ww = Graphics.boxWidth;
	const wh = this.calcWindowHeight(1, false);
	const wx = 0;
	const wy = 0;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Message.prototype.messageCommandWindowListener = function() {
	const okCondition = Input.isTriggered("ok") || TouchInput.isClicked();

	if ((TouchInput.isCancelled() || okCondition) && this._tempHide) {
		this._messageCommandWindow.playOkSound();
		this.onMessageCommandShow();
		return;
	}
	if ((okCondition || Input.dir4 || Input.isTriggered("escape")) && $gameMessage._shouldFastForward) {
		this._messageCommandWindow.playOkSound();
		$gameMessage._shouldFastForward = false;
		this._messageCommandWindow.select(-1);
		this._messageCommandWindow._isHighlighted = false;
		this._messageCommandWindow.refresh();
	} else if (okCondition) {
		if (this._messageCommandWindow.isHighlighted()) {
			this._messageCommandWindow.playOkSound();
			switch (this._messageCommandWindow.index()) {
				case 0: this.onMessageCommandSkip(); break;
				case 1: this.onMessageCommandBacklog(); break;
				case 2: this.onMessageCommandHide(); break;
				case 3: this.onMessageCommandOptions(); break;
				case 4: this.onMessageCommandSave(); break;
				case 5: this.onMessageCommandLoad(); break;
				case 6: this.onMessageCommandEnd(); break;
			}
		}
	} else if (Input.isTriggered("cancel")) {
		this._messageCommandWindow.processCancel();
	}
};

Scene_Message.prototype.onMessageCommandSkip = function() {
	$gameMessage._shouldFastForward = !$gameMessage._shouldFastForward;
	this._messageCommandWindow.refresh();
}

Scene_Message.prototype.onMessageCommandBacklog = function() {
	SceneManager.push(Scene_BackLog);
};

Scene_Message.prototype.onMessageCommandHide = function() {
	this._messageWindow.hide();
	this._nameBoxWindow.hide();
	this._choiceListWindow.hide();
	this._messageCommandWindow.hide();
	this._tempHide = true;
};

Scene_Message.prototype.onMessageCommandShow = function() {
	this._messageWindow.show();
	this._nameBoxWindow.show();
	this._choiceListWindow.show();
	this._messageCommandWindow.show();
	this._tempHide = false;
};

Scene_Message.prototype.onMessageCommandOptions = function() {
	SceneManager.push(Scene_Options);
};

Scene_Message.prototype.onMessageCommandSave = function() {
	SceneManager.push(Scene_Save);
};

Scene_Message.prototype.onMessageCommandLoad = function() {
	SceneManager.push(Scene_Load);
};

Scene_Message.prototype.onMessageCommandEnd = function() {
	SceneManager.push(Scene_GameEnd);
};

//WINDOW MESSAGE
GBC.SKAMessage.Window_Message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function(rect) {
	GBC.SKAMessage.Window_Message_initialize.call(this, rect);
	this.updatePlacement();
};

GBC.SKAMessage.Window_Message_updateInput = Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
	if (this._messageCommandWindow.isHighlighted() && !$gameMessage._shouldFastForward) {
		return true;
	}
	if (this.isAnySubWindowActive()) {
		if (this._choiceListWindow._shouldReactivate) this._choiceListWindow._shouldReactivate = false;
		if (this._eventItemWindow._shouldReactivate) this._eventItemWindow._shouldReactivate = false;
		if (this._numberInputWindow._shouldReactivate) this._numberInputWindow._shouldReactivate = false;
		this.resetCommandWindow();
		return true;
	} else if ($gameMessage._shouldFastForward && (this._choiceListWindow.isOpen())) {
		this.resetCommandWindow();
	}

	return GBC.SKAMessage.Window_Message_updateInput.call(this);
};

Window_Message.prototype.resetCommandWindow = function() {
	$gameMessage._shouldFastForward = false;
	this._messageCommandWindow.select(-1);
	this._messageCommandWindow._isHighlighted = false;
	this._messageCommandWindow.refresh();
};

GBC.SKAMessage.Window_Message_synchronizeVisibility = Window_Message.prototype.synchronizeVisibility;
Window_Message.prototype.synchronizeVisibility = function() {
	GBC.SKAMessage.Window_Message_synchronizeVisibility.call(this);
	this._nameBoxWindow.visible = this.visible;
	this._messageCommandWindow.visible = this._positionType !== 1 && !$gameParty.inBattle() ? this.visible : false;
}

GBC.SKAMessage.Window_Message_canStart = Window_Message.prototype.canStart;
Window_Message.prototype.canStart = function() {
	return !(this._choiceListWindow._shouldReactivate || this._eventItemWindow._shouldReactivate || this._numberInputWindow._shouldReactivate) && GBC.SKAMessage.Window_Message_canStart.call(this);
};

GBC.SKAMessage.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	GBC.SKAMessage.Window_Message_startMessage.call(this);
	this._messageCommandWindow.start(this._positionType);
};

GBC.SKAMessage.Window_Message_newLineX = Window_Message.prototype.newLineX;
Window_Message.prototype.newLineX = function(textState) {
	const xAdjustment = 10;
	return GBC.SKAMessage.Window_Message_newLineX.call(this, textState) + xAdjustment;
};

Window_Message.prototype.setMessageCommandWindow = function(w) {
	this._messageCommandWindow = w;
}

GBC.SKAMessage.Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
Window_Message.prototype.updatePlacement = function() {
	GBC.SKAMessage.Window_Message_updatePlacement.call(this);
	const numLines = this.calculateNumLines();
	this.height = this.fittingHeight(numLines, false) + 8;
	if (this._positionType == 0) {
		const yAdjustment = 35;
		this.y += yAdjustment;
	} else {
		const baseY = (this._positionType * (Graphics.boxHeight - this.height)) / 2;
		const yAdjustment = 33;
		this.y = !$gameParty.inBattle() ? baseY - yAdjustment : baseY;
	}
	this._backSprite.setFrame(0, 0, this.width, this.height);
};

Window_Message.prototype.calculateNumLines = function() {
	return this.positionType === 1 ? 4 : 3;
};

Window_Message.prototype.refreshDimmerBitmap = function() {
	if (this._dimmerSprite) {
		this._dimmerSprite.filters = [new PIXI.filters.BlurFilter()];
		const bitmap = this._dimmerSprite.bitmap;
		const widthAdjustment = 8;
		const w = this.width > 0 ? this.width + widthAdjustment : 0;
		const h = this.height;
		const m = this.padding;
		const c1 = "#1d1721";
		const c2 = "#1d1721";
		bitmap.resize(w, h);
		bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
		bitmap.fillRect(0, m, w, h - m * 2, c1);
		bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
		this._dimmerSprite.setFrame(0, 0, w, h);
	}
};

Window_Message.prototype.updateBackgroundDimmer = function() {
	if (this._dimmerSprite) {
		this._dimmerSprite.opacity = this.openness - 10;
	}
};

GBC.SKAMessage.Window_Message_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
	GBC.SKAMessage.Window_Message_newPage.call(this, textState);
	textState.y = 5;
	textState.height = this.calcTextHeight(textState);
};

Window_Message.prototype.resetFontSettings = function() {
	this.contents.fontFace = "rmmz-windowmessage, " + $dataSystem.advanced.fallbackFonts;
	this.contents.fontSize = 24;
	this.resetTextColor();
};

Window_Message.prototype._createBackSprite = function() {
	this._backSprite = new Sprite();
	const image = GBC_SKAMW["Message Window Background"];
	this._backSprite.bitmap = ImageManager.loadMenu(image);
	this._container.addChild(this._backSprite);
};

Window_Message.prototype.updateBackOpacity = function() {
	this.backOpacity = 255;
};

Window_Message.prototype.loadWindowskin = function() {
	const image = GBC_SKAMW["Windowskin Image"];
	this.windowskin = ImageManager.loadSystem(image);
};

Window_Message.prototype._refreshBack = function() { };

GBC.SKAMessage.Window_Message_synchronizeNameBox = Window_Message.prototype.synchronizeNameBox;
Window_Message.prototype.synchronizeNameBox = function() {
	this._messageCommandWindow.updateContentsAlpha(this.openness);
	if (this._positionType !== 1) {
		GBC.SKAMessage.Window_Message_synchronizeNameBox.call(this);
	}
};

//WINDOW COMMAND BOX
class Window_MessageCommand extends Window_Selectable {
	constructor(rect) {
		super(rect);
		this._data = ["Skip", "Backlog", "Hide", "Options", "Save", "Load", "End"];
		this._isHighlighted = false;
		this.openness = 0;
		this.createCommandContents();
	}

	start(position) {
		if (position === 1 || $gameParty.inBattle()) {
			this.deactivate();
			this.hide();
		} else {
			this._isHighlighted = false;
			this._position = position;
			this.activate();
			this.updatePlacement();
			this.refresh();
			this.show();
		}
	}

	processTouch() {
		if (this.isOpenAndActive()) {
			if (this._mouseHasEntered && !this.withinBounds()) {
				this.select(-1);
				this._isHighlighted = false;
				this.refresh();
			}
			this._mouseHasEntered = this.withinBounds();
			super.processTouch();
		} else if (this._mouseHasEntered && this.withinBounds() && !TouchInput.isPressed()) {
			this.select(-1);
			this._isHighlighted = false;
			this._mouseHasEntered = false;
			this.refresh();
		}
	}

	withinBounds() {
		const xBoundary = 260;
		return TouchInput.x > xBoundary && TouchInput.x < this.width + xBoundary &&
		TouchInput.y > this.y && TouchInput.y < this.height + this.y;
	}

	processCursorMove() {
		if (this.isCursorMovable()) {
			const lastIndex = this.index();

			if (Input.isRepeated("pageup")) {
				this.cursorPageup(Input.isTriggered("pageup"));
			}
			if (Input.isRepeated("pagedown")) {
				this.cursorPagedown(Input.isTriggered("pagedown"));
			}

			if (this.index() !== lastIndex) {
				this.playCursorSound();
			}
		}
	}

	cursorPageup(wrap) {
		let maxItems = this.maxItems();
		if (this._shouldConsumeFocus) {
			this._isHighlighted = true;
			this._shouldConsumeFocus = false;
			this.smoothSelect(maxItems);
			return;
		}

		const index = Math.max(0, this.index());
		if (this.isHighlighted() && index == 0) {
			this._isHighlighted = false;
			this.select(-1);
			this.refresh();
		} else {
			this.smoothSelect((index - 1 + maxItems) % maxItems);
		}
	}

	cursorPagedown(wrap) {
		if (this._shouldConsumeFocus) {
			this._isHighlighted = true;
			this._shouldConsumeFocus = false;
			this.smoothSelect(0);
			return;
		}

		const index = this.index();
		const maxItems = this.maxItems();
		if (this.isHighlighted() && index == maxItems - 1) {
			this._isHighlighted = false;
			this._shouldConsumeFocus = true;
			this.select(maxItems - 1);
			this.refresh();
		} else {
			this.smoothSelect((index + 1) % maxItems);
		}
	}

	processCancel() {
		SoundManager.playCancel();
		this._isHighlighted = false;
		this._shouldConsumeFocus = true;
		this.select(-1);
		this.refresh();
	}

	select(index) {
		if ((this._shouldConsumeFocus && !this.withinBounds()) || $gameMessage?._shouldFastForward) return;
		Input._msgSelection = index;
		this._index = index;
		this._isHighlighted = index >= 0 && index < this._data.length;
		this.refresh();
	}

	maxRows() {
		return 1;
	}

	maxCols() {
		return 7;
	}

	maxItems() {
		return this._data ? this._data.length : 0;
	}

	item() {
		return this._data[this._index];
	}

	createCommandContents() {
		this._background = new Sprite();
		this._background.x = 6;
		let image = GBC_SKAMW["Command Window Background"];
		this._background.bitmap = ImageManager.loadMenu(image);
		this.addChild(this._background);

		this._rightArrow = new Sprite();
		this._rightArrow.x = 780;
		this._rightArrow.y -= 1;
		image = GBC_SKAMW["Command Window Right Arrow"];
		this._rightArrow.bitmap = ImageManager.loadMenu(image);
		this.addChild(this._rightArrow);

		this._leftArrow = new Sprite();
		this._leftArrow.x = -4;
		this._leftArrow.y -= 1;
		image = GBC_SKAMW["Command Window Left Arrow"];
		this._leftArrow.bitmap = ImageManager.loadMenu(image);
		this.addChild(this._leftArrow);

		this._inactiveTextStyleNavigation = new PIXI.TextStyle({
			dropShadow: true,
			dropShadowAlpha: 0.75,
			dropShadowAngle: 1,
			strokeThickness: 1,
			fontSize: 24,
			fontFamily: "franklin-gothic-heavy, " + $dataSystem.advanced.fallbackFonts,
			dropShadowDistance: 2,
			bold: true,
			fill: ["#2f2f3e", "#4a4a60"],
		});

		this._activeTextStyleNavigation = new PIXI.TextStyle({
			dropShadow: true,
			dropShadowAlpha: 0.75,
			dropShadowAngle: 1,
			strokeThickness: 1,
			fontSize: 24,
			fontFamily: "franklin-gothic-heavy, " + $dataSystem.advanced.fallbackFonts,
			dropShadowDistance: 2,
			fill: ["#bbabbd", "#9b879f"],
		});

		this._inactiveTextStyle = new PIXI.TextStyle({
			dropShadow: true,
			dropShadowAlpha: 0.4,
			dropShadowAngle: 1,
			strokeThickness: 1,
			fontSize: 16,
			fontFamily: "franklin-gothic-med-cond, " + $dataSystem.advanced.fallbackFonts,
			dropShadowDistance: 1,
			fill: ["#dab3a2", "#7f586a"],
		});

		this._activeTextStyle = new PIXI.TextStyle({
			dropShadow: true,
			dropShadowAlpha: 0.4,
			dropShadowAngle: 1,
			strokeThickness: 1,
			fontSize: 16,
			fontFamily: "franklin-gothic-med-cond, " + $dataSystem.advanced.fallbackFonts,
			dropShadowDistance: 1,
			fill: ["#e1ced5", "#c2aab3"],
		});

		this._persistentTextStyle = new PIXI.TextStyle({
			dropShadow: true,
			dropShadowAlpha: 0.4,
			dropShadowAngle: 1,
			strokeThickness: 1,
			fontSize: 16,
			fontFamily: "franklin-gothic-med-cond, " + $dataSystem.advanced.fallbackFonts,
			dropShadowDistance: 1,
			fill: ["#f89009", "#cd882e"],
		});

		const pageup = TLB.SKABase.getKey("pageup");
		const pagedown = TLB.SKABase.getKey("pagedown");

		this._rightKey = new PIXI.Text(String.fromCharCode(pagedown));
		this.addChild(this._rightKey);

		this._leftKey = new PIXI.Text(String.fromCharCode(pageup));
		this.addChild(this._leftKey);

		this._textSprites = [];
		for (let i = 0; i < this._data.length; i++) {
			this._textSprites[i] = new PIXI.Text(this._data[i].toUpperCase());
			this.addChild(this._textSprites[i]);
		}
	}

	itemRect(index) {
		const padding = this._padding;
		this._padding = this._leftArrow.width + padding;
		const rect = Window_Selectable.prototype.itemRect.call(this, index);
		this._padding = padding;

		rect.x += this._leftArrow.width;
		rect.y -= 20;
		return rect;
	}

	drawAllItems() {
		if (this._leftArrow) {
			const image = GBC_SKAMW["Command Window Left Arrow"];
			const highlightedImage = GBC_SKAMW["Command Window Left Arrow Selected"];
			this._leftArrow.bitmap = this.isHighlighted() ? ImageManager.loadMenu(highlightedImage) : ImageManager.loadMenu(image);
		}
		if (this._rightArrow) {
			const image = GBC_SKAMW["Command Window Right Arrow"];
			const highlightedImage = GBC_SKAMW["Command Window Right Arrow Selected"];
			this._rightArrow.bitmap = this.isHighlighted() ? ImageManager.loadMenu(highlightedImage) : ImageManager.loadMenu(image);
		}

		if (this._leftKey) {
			const rect = this.itemRect(0);
			const textSprite = this._leftKey;
			textSprite._style = this.isHighlighted() ? this._activeTextStyleNavigation : this._inactiveTextStyleNavigation;
			textSprite.x = this._leftArrow.x + this._leftArrow.width;
			textSprite.y = rect.y + 19;
			textSprite.updateText();
		}

		if (this._rightKey) {
			const rect = this.itemRect(0);
			const textSprite = this._rightKey;
			textSprite._style = this.isHighlighted() ? this._activeTextStyleNavigation : this._inactiveTextStyleNavigation;
			textSprite.x = this._rightArrow.x;
			textSprite.y = rect.y + 19;
			textSprite.anchor.set(1, 0, 0.5);
			textSprite.updateText();
		}

		for (let i = 0; i < this.maxItems(); i++) {
			this.drawItem(i);
		}
	}

	drawItem(index) {
		const rect = this.itemRect(index);
		let textSprite = this._textSprites[index];
		textSprite._style = this.isHighlighted() && index == this._index ? this._activeTextStyle : this._inactiveTextStyle;
		if (index == 0 && $gameMessage._shouldFastForward) {
			textSprite._style = this._persistentTextStyle;
		}
		let textWidth = PIXI.TextMetrics.measureText(textSprite.text, textSprite._style);
		textSprite.x = (rect.x + rect.width / 2) - (textWidth.width / 2) + 13
		textSprite.y = rect.y + 25;
		textSprite.updateText();
	}

	isHighlighted() {
		return this._isHighlighted;
	}

	updateContentsAlpha(o) {
		this.openness = o;
		for (const sprite of this.children) {
			sprite.alpha = o / 255;
		}
	}

	setMessageWindow(w) {
		this._messageWindow = w;
	}

	updatePlacement() {
		const messageWindow = this._messageWindow;
		if (this._position == 2) {
			this.y = messageWindow.y + messageWindow.height + 1;
		} else if (this._position == 0) {
			this.y = messageWindow.y - 35;
		}
	}

	refreshCursor() { /* No content */ }

	_refreshAllParts() { /* No content */  }
}

//WINDOW NAME BOX
GBC.SKAMessage.Window_NameBox_initialize = Window_NameBox.prototype.initialize;
Window_NameBox.prototype.initialize = function() {
	GBC.SKAMessage.Window_NameBox_initialize.call(this);
	this.loadSKAMWParams();
};

Window_NameBox.prototype.loadSKAMWParams = function() {
	this._gradientChoices = [];
	try {
		const json = JSON.parse(GBC_SKAMW["Name Gradient Color"]);
		for (const gradientColorString of json) {
			const data = JSON.parse(gradientColorString);
			this._gradientChoices[data.name] = [
				data.startColor,
				data.endColor
			];
		}
	} catch (error) {
		console.error("Error parsing gradient colour JSON:", error);
	}
};

Window_NameBox.prototype.flushTextState = function(textState) {
	const text = textState.buffer;
	const rtl = textState.rtl;
	const width = this.textWidth(text);
	const height = textState.height;
	const x = rtl ? textState.x - width : textState.x;
	const y = textState.y;
	if (textState.drawing) {
		const gradient = this._gradientChoices?.[text] || ["#dac6df", "#efe6f1"];
		this.drawGradientText(text.toUpperCase(), gradient, x, y, this.width - 40, "center", { outlineThickness: 3 });
	}
	textState.x += rtl ? -width : width;
	textState.buffer = this.createTextBuffer(rtl);
	const outputWidth = Math.abs(textState.x - textState.startX);
	if (textState.outputWidth < outputWidth) {
		textState.outputWidth = outputWidth;
	}
	textState.outputHeight = y - textState.startY + height;
};

GBC.SKAMessage.Window_NameBox_windowWidth = Window_NameBox.prototype.windowWidth;
Window_NameBox.prototype.windowWidth = function() {
	return Math.min(GBC.SKAMessage.Window_NameBox_windowWidth.call(this), 270);
};

GBC.SKAMessage.Window_NameBox_textSizeEx = Window_NameBox.prototype.textSizeEx;
Window_NameBox.prototype.textSizeEx = function(text) {
	const widthAdjustment = 100;
	const obj = GBC.SKAMessage.Window_NameBox_textSizeEx.call(this, text);
	obj.width += widthAdjustment;
	return obj;
};

Window_NameBox.prototype._refreshBack = function() {
	const frameWidth = 397;
	const frameHeight = 50;
	const w = Math.max(0, this._width);
	const h = Math.max(0, this._height);
	const sprite = this._backSprite;
	const tilingSprite = sprite.children[0];
	sprite.setFrame(0, 0, w, frameHeight);
	const image = GBC_SKAMW["Name Box Background Image"];
	tilingSprite.bitmap = ImageManager.loadMenu(image);
	tilingSprite.setFrame(0, 0, frameWidth, frameHeight);
	tilingSprite.move(0, 0, w, h);
};

Window_NameBox.prototype.refreshDimmerBitmap = function() {
	if (this._dimmerSprite) {
		this._dimmerSprite.filters = [new PIXI.filters.BlurFilter()];
		const bitmap = this._dimmerSprite.bitmap;
		const widthAdjustment = 8;
		const w = this.width > 0 ? this.width + widthAdjustment : 0;
		const h = this.height;
		const m = this.padding;
		const color = "#15131d";
		bitmap.resize(w, h);
		bitmap.gradientFillRect(0, 0, w, m, color, color, true);
		bitmap.fillRect(0, m, w, h - m * 2, color);
		bitmap.gradientFillRect(0, h - m, w, m, color, color, true);
		this._dimmerSprite.setFrame(0, 0, w, h);
	}
};

Window_NameBox.prototype.updateBackgroundDimmer = function() {
	if (this._dimmerSprite) {
		this._dimmerSprite.opacity = this.openness - 10;
	}
};

Window_NameBox.prototype.updateBackOpacity = function() {
	this.backOpacity = 255;
};

Window_NameBox.prototype.loadWindowskin = function() {
	const image = GBC_SKAMW["Windowskin Image"];
	this.windowskin = ImageManager.loadSystem(image);
};

GBC.SKAMessage.Window_NameBox_updatePlacement = Window_NameBox.prototype.updatePlacement;
Window_NameBox.prototype.updatePlacement = function() {
	GBC.SKAMessage.Window_NameBox_updatePlacement.call(this);
	if (this._messageWindow._positionType === 0) {
		this.y = this._messageWindow.y + this._messageWindow.height;
	} else {
		this.y = this._messageWindow.y - this.height - 1;
	}
};

Window_NameBox.prototype.resetFontSettings = function() {
	this.contents.fontFace = "rmmz-windowmessage, " + $dataSystem.advanced.fallbackFonts;
	this.contents.fontSize = 26;
	this.resetTextColor();
};

//WINDOW SELECTABLE

GBC.SKAMessage.Window_Selectable_update = Window_Selectable.prototype.update;
Window_Selectable.prototype.update = function() {
	GBC.SKAMessage.Window_Selectable_update.call(this);

	if (this._messageCommandWindow) {
		if (this._messageCommandWindow.isHighlighted()) {
			if (this.active) {
				this._shouldReactivate = true;
				this.deactivate();
			}
		} else if (this._shouldReactivate) {
			this.activate();
		}
	}
};

Window_Selectable.prototype.setMessageCommandWindow = function(w) {
	this._messageCommandWindow = w;
}

//WINDOW EVENT ITEM

Window_EventItem.prototype.cursorPagedown = function(wrap) {
	return;
}

Window_EventItem.prototype.cursorPageup = function(wrap) {
	return;
}

//WINDOW NUMBER INPUT

Window_NumberInput.prototype.cursorPagedown = function(wrap) {
	return;
}

Window_NumberInput.prototype.cursorPageup = function(wrap) {
	return;
}

//WINDOW CHOICE

GBC.SKAMessage.Window_ChoiceList_maxChoiceWidth = Window_ChoiceList.prototype.maxChoiceWidth;
Window_ChoiceList.prototype.maxChoiceWidth = function() {
	return Math.min(GBC.SKAMessage.Window_ChoiceList_maxChoiceWidth.call(this), 500);
};

Window_ChoiceList.prototype.textWidth = function(text) {
	return Math.min(this.contents.measureTextWidth(text), 480);
}

Window_ChoiceList.prototype.resetFontSettings = function() {
	this.contents.fontFace = "rmmz-windowmessage, " + $dataSystem.advanced.fallbackFonts;
	this.contents.fontSize = 24;
	this.resetTextColor();
};

Window_ChoiceList.prototype.itemHeight = function() {
	const heightAdjustment = 6.2;
	return Window_Scrollable.prototype.itemHeight.call(this) + heightAdjustment;
};

Window_ChoiceList.prototype.loadWindowskin = function() {
	this.windowskin = ImageManager.loadSystem(GBC_SKAMW["Windowskin Image"]);
};

Window_ChoiceList.prototype._refreshCursor = function() {
	const drect = this._cursorRect.clone();
	const srect = { x: 0, y: 0, width: 161, height: 40 };
	const m = 4;
	const image = GBC_SKAMW["Choice Window Cursor Image"];
	const bitmap = ImageManager.loadMenu(image);
	for (const child of this._cursorSprite.children) {
		child.bitmap = bitmap;
	}
	this._setRectPartsGeometry(this._cursorSprite, srect, drect, m);
};

Window_ChoiceList.prototype._refreshBack = function() {
	const frameWidth = 607;
	const frameHeight = 278;
	const w = Math.max(0, this._width);
	const h = Math.max(0, this._height);
	const sprite = this._backSprite;
	const tilingSprite = sprite.children[0];
	sprite.setFrame(0, 0, Math.min(w, frameWidth), frameHeight);
	const image = GBC_SKAMW["Choice Window Background Image"];
	tilingSprite.bitmap = ImageManager.loadMenu(image);
	tilingSprite.setFrame(0, 0, frameWidth, frameHeight);
	tilingSprite.move(0, 0, w, h);
};

Window_ChoiceList.prototype.updateBackOpacity = function() {
	this.backOpacity = 255;
};

Window_ChoiceList.prototype.drawItemBackground = function(index) { };

Window_Base.prototype.makeFontBigger = function () {
	const maxThreshold = parseInt(GBC_SKAMW.maxSizeThreshold);
	const change = parseInt(GBC_SKAMW.sizeChange);
	if (this.contents.fontSize <= maxThreshold) {
        this.contents.fontSize += change;
    }
	if (this._sizeChange) {
		this.contents.fontSize -= this._sizeChange;
		delete this._sizeChange;
	}
};

Window_Base.prototype.makeFontSmaller = function () {
	const minThreshold = parseInt(GBC_SKAMW.minSizeThreshold);
	const minSize = parseInt(this instanceof Window_Message ? GBC_SKAMW.minMessageSize : GBC_SKAMW.minSize);
	const change = parseInt(GBC_SKAMW.sizeChange);
	if (this.contents.fontSize >= minThreshold) {
		const newSize = this.contents.fontSize - change;
		if (newSize < minSize) this._sizeChange = minSize - newSize;
		this.contents.fontSize = Math.max(newSize, minSize);
    }
};
