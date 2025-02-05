// Trilobytes - Star Knightess Aura UI Save Menu
// TLB_SKAUISaveMenu.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAUISaveMenu = true;

window.TLB = TLB || {};
TLB.SKAUISaveMenu = TLB.SKAUISaveMenu || {};

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
 * @param difficultyVar
 * @text Difficulty Variable
 * @desc The variable ID that stores the difficulty setting.
 * @type variable
 * @default 624
 *
 * @param listWindow
 * @text List Window
 *
 * @param listWindowX
 * @text X
 * @desc X coordinate of the list window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -200
 *
 * @param listWindowY
 * @text Y
 * @desc Y coordinate of the list window rect.
 * @type number
 * @default 70
 *
 * @param listWindowWidth
 * @text Width
 * @desc Width of the list window rect.
 * @type number
 * @default 746
 *
 * @param listWindowHeight
 * @text Height
 * @desc Height of the list window rect.
 * @type number
 * @default 602
 *
 * @param statusWindow
 * @text Status Window
 *
 * @param statusWindowXOffset
 * @text X Offset
 * @desc X offset from the right of the list window.
 * @type number
 * @default 2
 *
 * @param statusWindowWidth
 * @text Width
 * @desc Width of the status window rect.
 * @type number
 * @default 462
 *
 * @param statusWindowHeight
 * @text Height
 * @desc Height of the status window rect.
 * @type number
 * @default 602
 *
 * @param defaultMapName
 * @text Default Map name
 * @desc Default string to use if no map display name is set.
 * @default ???
 *
 * @param autosaveThumbnailDelay
 * @text Autosave Thumbnail Delay
 * @desc Number of ms to wait before taking an autosave screenshot.
 * @type number
 * @default 3000
 *
 * @param savemenu_switch_lefter_arrow_active
 * @text Leftmost Arrow - Active
 * @desc Image to use for leftmost arrow when active.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SWITCH_LEFTER_ARROW_ACTIVE
 *
 * @param savemenu_switch_lefter_arrow_inactive
 * @text Leftmost Arrow - Inactive
 * @desc Image to use for leftmost arrow when inactive.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SWITCH_LEFTER_ARROW_INACTIVE
 *
 * @param savemenu_switch_left_arrow_active
 * @text Left Arrow - Active
 * @desc Image to use for left arrow when active.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SWITCH_LEFT_ARROW_ACTIVE
 *
 * @param savemenu_switch_left_arrow_inactive
 * @text Left Arrow - Inactive
 * @desc Image to use for left arrow when inactive.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SWITCH_LEFT_ARROW_INACTIVE
 *
 * @param savemenu_switch_right_arrow_active
 * @text Right Arrow - Active
 * @desc Image to use for right arrow when active.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SWITCH_RIGHT_ARROW_ACTIVE
 *
 * @param savemenu_switch_right_arrow_inactive
 * @text Right Arrow - Inactive
 * @desc Image to use for right arrow when inactive.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SWITCH_RIGHT_ARROW_INACTIVE
 *
 * @param savemenu_switch_righter_arrow_active
 * @text Rightmost Arrow - Active
 * @desc Image to use for rightmost arrow when active.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SWITCH_RIGHTER_ARROW_ACTIVE
 *
 * @param savemenu_switch_righter_arrow_inactive
 * @text Rightmost Arrow - Inactive
 * @desc Image to use for rightmost arrow when inactive.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SWITCH_RIGHTER_ARROW_INACTIVE
 *
 * @param savemenu_savewindow_bg
 * @text Save Window Background
 * @desc Image to use for save window background.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SAVE_WINDOW_BG
 *
 * @param savemenu_informationwindow_bg
 * @text Information Window Background
 * @desc Image to use for information window background.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_INFORMATION_WINDOW_BG
 *
 * @param savemenu_screenshot_bg
 * @text Screenshot Background
 * @desc Image to use for the snapshot area if no thumbnail is present.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SCREENSHOT_BG
 *
 * @param savemenu_select
 * @text Cursor
 * @desc Image to use for save window cursor.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_SELECT
 *
 * @param savemenu_autosave_select
 * @text Autosave Cursor
 * @desc Image to use for autosave cursor.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_AUTOSAVE_SELECT
 *
 * @param savemenu_corruptionicon
 * @text Corruption Icon
 * @desc Image to use for corruption icon.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_CORRUPTION_ICON
 *
 * @param savemenu_lewdnessicon
 * @text Lewdness Icon
 * @desc Image to use for lewdness icon.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_LEWDNESS_ICON
 *
 * @param savemenu_viceicon
 * @text Vice Icon
 * @desc Image to use for vice icon.
 * @type file
 * @dir img/menu/
 * @default Save_Menu/SAVE_MENU_VICE_ICON
 *
 */

window.parameters = PluginManager.parameters('TLB_SKAUISaveMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKAUISaM = TLB.Param.SKAUISaM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAUISaM);

DataManager._snapUrls = {};

DataManager.processThumbnail = function(savefileId) {
	const bitmap = this.makeSavefileBitmap();
	if (bitmap) {
		const snapUrl = bitmap.toDataURL();
		this.saveThumbnail(savefileId, snapUrl);
	}
};

TLB.SKAUISaveMenu.DataManager_saveGame = DataManager.saveGame;
DataManager.saveGame = function(savefileId) {
	const result = TLB.SKAUISaveMenu.DataManager_saveGame.call(this, savefileId);
	if (savefileId > 0) {
		this.processThumbnail(savefileId);
	}
	return result;
};

TLB.SKAUISaveMenu.Scene_Base_onAutosaveSuccess = Scene_Base.prototype.onAutosaveSuccess;
Scene_Base.prototype.onAutosaveSuccess = function() {
	TLB.SKAUISaveMenu.Scene_Base_onAutosaveSuccess.call(this);
	setTimeout(() => {
		DataManager.processThumbnail(0);
	}, TLB.Param.SKAUISaM.autosaveThumbnailDelay);
};

DataManager.getThumbnail = function(savefileId) {
	return this._snapUrls[savefileId];
};

TLB.SKAUISaveMenu.DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function() {
	const params = TLB.Param.SKAB;
	const info = TLB.SKAUISaveMenu.DataManager_makeSavefileInfo.call(this);
	info.day = $gameVariables.value(params.dayVar);
	info.corruption = $gameVariables.value(params.currentCorruptionVar);
	info.maxCorruption = $gameVariables.value(params.maxCorruptionVar);
	info.lewdness = $gameVariables.value(params.currentLewdnessVar);
	info.maxLewdness = params.maxLewdness;
	info.vice = $gameVariables.value(params.currentViceVar);
	info.maxVice = params.maxVice;

	const savetime = new Date();
	const year = savetime.getFullYear();
	const month = String(savetime.getMonth() + 1).padStart(2, '0');
	const day = String(savetime.getDate()).padStart(2, '0');
	const date = [year, month, day].join('/');
	const hour = String(savetime.getHours()).padStart(2, '0');
	const minute = String(savetime.getMinutes()).padStart(2, '0');
	const time = [hour, minute].join(':');
	const dateTime = date + "  " + time;
	info.savetime = dateTime;

	const difficultyMap = {
		'-2': 'Story',
		'-1': 'Explorer',
		'0': 'Normal',
		'1': 'Hard',
		'2': 'Nightmare'
	};

	info.difficulty = difficultyMap[$gameVariables.value(TLB.Param.SKAUISaM.difficultyVar)];

	info.location = $dataMap.displayName !== "" ? $dataMap.displayName : TLB.Param.SKAUISaM.defaultMapName;
	info.gold = $gameParty.gold();

	info.levels = $gameParty.allMembers().map(member => member.level);

	return info;
};

DataManager.makeSavefileBitmap = function() {
	const bitmap = $gameTemp.getSavefileBitmap();
	if (!bitmap) return null;
	const scale = 26 / 100;
	const newBitmap = new Bitmap(bitmap.width * scale, bitmap.height * scale);
	newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, newBitmap.width, newBitmap.height);
	return newBitmap;
};

DataManager.makeThumbnailFilename = function(id) {
	return "thumb%1".format(id);
};

DataManager.loadThumbnail = function(id) {
	if (this._snapUrls[id]) {
		return Promise.resolve(this._snapUrls[id]);
	}

	const filename = this.makeThumbnailFilename(id);
	return StorageManager.exists(filename)
		.then(() => StorageManager.loadObject(filename))
		.then(url => {
			this._snapUrls[id] = url;
			return 0;
		});
};

DataManager.saveThumbnail = function(id, url) {
	if (this._snapUrls[id] !== url) {
		this._snapUrls[id] = url;
		const filename = this.makeThumbnailFilename(id);
		StorageManager.saveObject(filename, url);
	}
};

TLB.SKAUISaveMenu.Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	TLB.SKAUISaveMenu.Game_Temp_initialize.call(this);
	this._savefileBitmap = null;
};

Game_Temp.prototype.setSavefileBitmap = function(bitmap) {
	this._savefileBitmap = bitmap;
};

Game_Temp.prototype.getSavefileBitmap = function() {
	if (this._savefileBitmap) return this._savefileBitmap;
	else return SceneManager.backgroundBitmap();
};

TLB.SKAUISaveMenu.SceneManager_goto = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
	if (this._scene && this._scene instanceof Scene_Map && sceneClass instanceof Scene_MenuBase) {
		$gameTemp.setSavefileBitmap(SceneManager.snap());
	}
	TLB.SKAUISaveMenu.SceneManager_goto.call(this, sceneClass);
}

Window_SavefileList.prototype.createPageText = function() {
	const textOptions = {
		fill: ['#cdc3d0', '#a79aaa'],
		fontFamily: 'franklin-gothic-demi',
		fontSize: 30,
		stroke: "#000000",
		strokeThickness: 2,
		bold: true
	}
	const pageup = TLB.SKABase.getKey("pageup");
	const pagedown = TLB.SKABase.getKey("pagedown");
	this._puText = new PIXI.Text(String.fromCharCode(pageup), textOptions);
	this._pdText = new PIXI.Text(String.fromCharCode(pagedown), textOptions);
	this._puText.position.x = 574;
	this._puText.position.y = 36;
	this._pdText.position.x = 609;
	this._pdText.position.y = 36;
	this.addChild(this._puText);
	this.addChild(this._pdText);
};

Window_SavefileList.prototype.setFirstButtonFunctions = function(firstButton) {
	const maxPage = this.maxPage();
	firstButton.update = function() {
		Sprite.prototype.update.call(this);
		this.updateFrame();
		this.processTouch();
	};
	firstButton.updateFrame = function() {
		this.bitmap = ImageManager.loadMenu(maxPage > 0 ? TLB.Param.SKAUISaM.savemenu_switch_lefter_arrow_active : TLB.Param.SKAUISaM.savemenu_switch_lefter_arrow_inactive);
		this.opacity = this.isPressed() ? 192 : 255;
	};
	firstButton.onClick = function() {
		this._scrollY = 0;
		this.select(0);
	}.bind(this);
};

Window_SavefileList.prototype.setPrevButtonFunctions = function(prevButton, puText) {
	const maxPage = this.maxPage();
	prevButton.update = function() {
		Sprite.prototype.update.call(this);
		this.updateFrame();
		this.processTouch();
	};
	prevButton.updateFrame = function() {
		this.bitmap = ImageManager.loadMenu(maxPage > 0 ? TLB.Param.SKAUISaM.savemenu_switch_left_arrow_active : TLB.Param.SKAUISaM.savemenu_switch_left_arrow_inactive);
		this.opacity = this.isPressed() ? 192 : 255;
		if (puText) puText.style.fill = maxPage === 0 ? ['#4b4b60', '#2f2f3e'] : ['#bf9e78', '#583346'];
	};
	prevButton.onClick = function() {
		this.cursorPageup();
	}.bind(this);
};

Window_SavefileList.prototype.setNextButtonFunctions = function(nextButton, pdText) {
	const maxPage = this.maxPage();
	nextButton.update = function() {
		Sprite.prototype.update.call(this);
		this.updateFrame();
		this.processTouch();
	};
	nextButton.updateFrame = function() {
		this.bitmap = ImageManager.loadMenu(maxPage > 0 ? TLB.Param.SKAUISaM.savemenu_switch_right_arrow_active : TLB.Param.SKAUISaM.savemenu_switch_right_arrow_inactive);
		this.opacity = this.isPressed() ? 192 : 255;
		if (pdText) pdText.style.fill = maxPage === 0 ? ['#4b4b60', '#2f2f3e'] : ['#bf9e78', '#583346'];
	};
	nextButton.onClick = function() {
		this.cursorPagedown();
	}.bind(this);
};

Window_SavefileList.prototype.setLastButtonFunctions = function(lastButton) {
	const maxPage = this.maxPage();
	lastButton.update = function() {
		Sprite.prototype.update.call(this);
		this.updateFrame();
		this.processTouch();
	};
	lastButton.updateFrame = function() {
		this.bitmap = ImageManager.loadMenu(maxPage > 0 ? TLB.Param.SKAUISaM.savemenu_switch_righter_arrow_active : TLB.Param.SKAUISaM.savemenu_switch_righter_arrow_inactive);
		this.opacity = this.isPressed() ? 192 : 255;
	};
	lastButton.onClick = function() {
		this._scrollY = this.maxPage() * 3 * 132;
		this.select(DataManager.maxSavefiles() - 1);
	}.bind(this);
}

TLB.SKAUISaveMenu.Window_SavefileList_initialize = Window_SavefileList.prototype.initialize;
Window_SavefileList.prototype.initialize = function(rect) {
	TLB.SKAUISaveMenu.Window_SavefileList_initialize.call(this, rect);
	this._canScroll = true;
	this._backgroundSprite = new Sprite();
	let image = TLB.Param.SKAUISaM.savemenu_savewindow_bg;
	const bmp = ImageManager.loadMenu(image);
	this._backgroundSprite.bitmap = bmp;
	this.addChildAt(this._backgroundSprite, 0);

	const firstButton = new Sprite_Clickable();
	firstButton.move(496, 38);
	const prevButton = new Sprite_Clickable();
	prevButton.move(528, 34);
	prevButton.width = this._upArrowSprite.width;
	prevButton.height = this._upArrowSprite.height;
	const nextButton = new Sprite_Clickable();
	nextButton.move(634, 34);
	nextButton.width = this._downArrowSprite.width;
	nextButton.height = this._downArrowSprite.height;
	const lastButton = new Sprite_Clickable();
	lastButton.move(687, 38);

	this.addChild(firstButton);
	this.addChild(prevButton);
	this.addChild(nextButton);
	this.addChild(lastButton);

	if (Input.isControllerConnected()) {
		const btnUp = new Sprite_ControllerButton("pageup");
		const btnDown = new Sprite_ControllerButton("pagedown");
		btnUp.position.x = 606;
		btnUp.position.y = 36;
		btnDown.position.x = 631;
		btnDown.position.y = 36;
		firstButton.hide();
		lastButton.hide();
		prevButton.x += 32;
		nextButton.x += 32;
		this.addChild(btnUp);
		this.addChild(btnDown);
	} else if (!Utils.isMobileDevice()) {
		this.createPageText();
	}

	this.setFirstButtonFunctions(firstButton);
	this.setPrevButtonFunctions(prevButton, this._puText);
	this.setNextButtonFunctions(nextButton, this._pdText);
	this.setLastButtonFunctions(lastButton);

	this.opacity = 0;
	this._contentsSprite.x += 11;
	this._contentsSprite.y += 22;
	this.refresh();
};

Window_SavefileList.prototype.maxPage = function() {
	return Math.ceil(DataManager.maxSavefiles() / 6) - 1;
};

Window_SavefileList.prototype.maxCols = function() {
	return 2;
};

TLB.SKAUISaveMenu.Window_SavefileList_callUpdateHelp = Window_SavefileList.prototype.callUpdateHelp;
Window_SavefileList.prototype.callUpdateHelp = function() {
	TLB.SKAUISaveMenu.Window_SavefileList_callUpdateHelp.call(this);
	if (this.active && this._statusWindow) {
		this._statusWindow.setId(this.indexToSavefileId(this.index()));
	}
};

Window_SavefileList.prototype.indexToSavefileId = function(index) {
	return index + 1;
};

Window_SavefileList.prototype.savefileIdToIndex = function(savefileId) {
	return savefileId - 1;
};

Window_SavefileList.prototype.drawItemBackground = function(index) {
	//
};

Window_SavefileList.prototype.updateArrows = function() {
	this.downArrowVisible = false;
	this.upArrowVisible = false;
};

Window_SavefileList.prototype._refreshArrows = function() {
	//
};

Window_SavefileList.prototype.itemWidth = function() {
	return 346;
};

Window_SavefileList.prototype.itemHeight = function() {
	return 132;
};

Window_SavefileList.prototype.maxVisibleItems = function() {
	return 6;
};

Window_SavefileList.prototype.drawAllItems = function() {
	this.contents.fontFace = 'franklin-gothic-demi-cond';
	this.contents.fontSize = 36;
	const page = this.page();
	const maxPage = this.maxPage() + 1;
	const gradient = ["#4a4a60", "#2f2f3e"];
	const textOptions = {
		bold: true,
		dropShadow: true,
		dropShadowX: 1,
		dropShadowY: 1,
		shadowOpacity: 0.75
	};
	this.drawGradientText(`PAGE`, gradient, 6, 1, 340, "left", textOptions);
	let textWidth = this.textWidth("PAGE");
	this.contents.fontFace = 'franklin-gothic-heavy';
	this.contents.fontSize = 24;
	this.drawGradientText("•", gradient, 6 + textWidth + 4, 4, 40, "left", textOptions);
	textWidth += this.textWidth("•");
	this.contents.fontFace = 'franklin-gothic-demi-cond';
	this.contents.fontSize = 36;
	this.drawGradientText(` ${page}`, gradient, 6 + textWidth, 1, 340, "left", textOptions);
	textWidth += this.textWidth(` ${page} `);
	this.contents.fontFace = 'fuckboi-sans';
	this.contents.fontSize = 34;
	this.drawGradientText("/", gradient, 6 + textWidth, 1, 340, "left", textOptions);
	textWidth += this.textWidth("/");
	this.contents.fontFace = 'franklin-gothic-demi-cond';
	this.contents.fontSize = 36;
	this.drawGradientText(`${maxPage}`, gradient, 6 + textWidth, 1, 340, "left", textOptions);
	Window_Selectable.prototype.drawAllItems.call(this);
	const gradient1 = ["#d9c5de", "#efe6f1", "#d9c5de"];
	const gradient2 = ["#acb2e1", "#616caa"];
	this.contents.fontFace = 'franklin-gothic-demi';
	this.contents.fontSize = 18;
	this.contents.fontItalic = true;
	let x = 0;
	const text1 = "Which file would you like to ";
	textWidth = this.textWidth(text1);
	this.drawGradientText(text1, gradient1, x, 511, 340, "left", { bold: true });
	x += textWidth;
	const text2 = this._mode === "save" ? "SAVE" : "LOAD";
	textWidth = this.textWidth(text2);
	this.drawGradientText(text2, gradient2, x, 511, 340, "left", { bold: true });
	x += textWidth;
	const text3 = this._mode === "save" ? " to?" : " from?";
	this.drawGradientText(text3, gradient1, x, 511, 340, "left", { bold: true });
	this.contents.fontItalic = false;
	let rect = new Rectangle(5, 452, 695, 56);
	const info = DataManager.savefileInfo(0);
	this.drawTitle(0, rect.x, rect.y, true);
	this.drawPlaytime(info?.playtime || "00:00:00", rect.x + 607, rect.y);
	this.drawLocation(info?.location || "<None>", rect.x - 2, rect.y + 27);
};

Window_SavefileList.prototype.drawItem = function(index) {
	this.contents.fontFace = 'franklin-gothic-med';
	const savefileId = this.indexToSavefileId(index);
	const info = DataManager.savefileInfo(savefileId);
	const rect = this.itemRect(index);
	this.resetTextColor();
	this.changePaintOpacity(this.isEnabled(savefileId));
	this.drawTitle(savefileId, rect.x, rect.y, info !== null);
	this.drawPlaytime(info?.playtime || "00:00:00", rect.x + 259, rect.y);
	this.drawLocation(info?.location || "<None>", rect.x, rect.y + 27);
	this.drawParty(info?.characters, rect.x + 28, rect.y + 117);
};

Window_SavefileList.prototype.drawTitle = function(savefileId, x, y, slotUsed) {
	const usedGradient = ["#e2ba8c", "#b27896"];
	const unusedGradient = ['#baac9c', '#7a6b72'];
	if (savefileId === 0) {
		this.contents.fontSize = 24;
		this.drawGradientText(TextManager.autosave.toUpperCase(), (slotUsed && this._mode === "load") ? usedGradient : unusedGradient, x + 9, y + 4, 135, "left", { bold: true, outlineGradient: ["#4f4f4f", "#000000"], dropShadow: true, dropShadowX: 0, dropShadowY: 2, shadowOpacity: 0.75 });
	} else {
		this.contents.fontSize = 24;
		this.drawGradientText("SAVE #" + savefileId, (slotUsed || this._mode === "save") ? usedGradient : unusedGradient, x + 13, y + 4, 135, "left", { bold: true, outlineGradient: ["#4f4f4f", "#000000"], dropShadow: true, dropShadowX: 0, dropShadowY: 2, shadowOpacity: 0.75 });
	}
};

Window_SavefileList.prototype.drawPlaytime = function(text, x, y) {
	this.contents.fontFace = 'franklin-gothic-med-cond';
	this.contents.fontSize = 20;
	const gradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
	this.drawGradientText(text, gradient, x, y + 3, 135, "left", { outlineGradient: ["#4f4f4f", "#000000"], dropShadow: true, dropShadowX: 0, dropShadowY: 2, shadowOpacity: 0.75 });
};

Window_SavefileList.prototype.drawLocation = function(text, x, y) {
	this.contents.fontFace = 'franklin-gothic-med-cond';
	this.contents.fontSize = 18;
	const gradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
	this.drawGradientText(text, gradient, x + 13, y, 340, "left", { dropShadow: true, dropShadowX: 0, dropShadowY: 2, shadowOpacity: 0.75 });
};

Window_SavefileList.prototype.drawParty = function(partyData, x, y) {
	if (partyData) {
		let characterX = x;
		let characterY = y;
		for (const data of partyData) {
			this.drawCharacter(data[0], data[1], characterX, characterY);
			characterX += 40;
		}
	}
};

Window_SavefileList.prototype.selectAutosave = function() {
	this._index = -1;
	this._autosaveSelected = true;
	let rect = new Rectangle(12, 477, 695, 56);
	let image = TLB.Param.SKAUISaM.savemenu_autosave_select;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this.setCursorRect(rect.x + 1, rect.y + 1, rect.width, rect.height);
	if (this.active && this._statusWindow) {
		this._statusWindow.setId(this.indexToSavefileId(this.index()));
	}
};

Window_SavefileList.prototype.hitIndex = function() {
	const touchPos = new Point(TouchInput.x, TouchInput.y);
	const localPos = this.worldTransform.applyInverse(touchPos);
	return this.hitTest(localPos.x - 11, localPos.y - 22);
};

Window_SavefileList.prototype.itemRect = function(index) {
	const maxCols = this.maxCols();
	const itemWidth = this.itemWidth();
	const itemHeight = this.itemHeight();
	const colSpacing = this.colSpacing();
	const col = index % maxCols;
	const row = Math.floor(index / maxCols);
	const x = col * itemWidth + (colSpacing * col);
	const y = 51 + row * itemHeight - this.scrollBaseY();
	const width = itemWidth;
	const height = itemHeight;
	return new Rectangle(x, y, width, height);
};

Window_SavefileList.prototype.maxScrollY = function() {
	return this.maxPage() * 3 * 132;
};

Window_SavefileList.prototype.cursorUp = function(wrap) {
	const index = this.index();
	const maxItems = Math.min(this.maxItems(), this.topIndex() + 6);
	const maxCols = this.maxCols();
	if (this.index() === -1) this.smoothSelect(this.topIndex() + 4);
	else if (this.row() === this.topRow()) this.selectAutosave();
	else if (index >= maxCols || (wrap && maxCols === 1)) {
		this.smoothSelect((index - maxCols + maxItems) % maxItems);
	}
};

Window_SavefileList.prototype.cursorDown = function(wrap) {
	const index = this.index();
	const maxItems = Math.min(this.maxItems(), this.topIndex() + 6);
	const maxCols = this.maxCols();
	if (this.row() === this.topRow() + 2) this.selectAutosave();
	else if (index === -1) this.smoothSelect(this.topIndex());
	else if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
		this.smoothSelect((index + maxCols) % maxItems);
	}
};

Window_SavefileList.prototype.cursorLeft = function(wrap) {
	const index = this.index();
	const maxItems = Math.min(this.maxItems(), this.topIndex() + 6);
	const maxCols = this.maxCols();
	const horizontal = this.isHorizontal();
	if (index % 6 === 0) this.selectAutosave();
	else if (index === -1) this.smoothSelect(this.topIndex() + 5);
	else if (maxCols >= 2 && (index > 0 || (wrap && horizontal))) {
		this.smoothSelect((index - 1 + maxItems) % maxItems);
	}
};

Window_SavefileList.prototype.cursorRight = function(wrap) {
	const index = this.index();
	const maxItems = Math.min(this.maxItems(), this.topIndex() + 6);
	const maxCols = this.maxCols();
	const horizontal = this.isHorizontal();
	if (index === this.topIndex() + 5) this.selectAutosave();
	else if (index === -1) this.smoothSelect(this.topIndex());
	else if (maxCols >= 2 && (index < maxItems - 1 || (wrap && horizontal))) {
		this.smoothSelect((index + 1) % maxItems);
	}
};

Window_SavefileList.prototype.cursorPagedown = function() {
	if (this.topIndex() + 6 < this.maxItems()) {
		this._scrollY += 396;
		if (this.index() === -1) this.selectAutosave();
		else this.select(Math.min(this.maxItems() - 1, this.index() + 6));
	} else {
		this._scrollY = 0;
		if (this.index() === -1) this.selectAutosave();
		else this.select(Math.max(0, this.index() - (6 * this.maxPage())));
	}
};

Window_SavefileList.prototype.cursorPageup = function() {
	if (this.topIndex() - 6 >= 0) {
		this._scrollY -= 396;
		if (this.index() === -1) this.selectAutosave();
		else this.select(Math.max(0, this.index() - 6));
	} else {
		this._scrollY = this.maxPage() * 3 * 132;
		if (this.index() === -1) this.selectAutosave();
		else this.select(Math.min(this.maxItems() - 1, 6 * this.maxPage() + this.index()));
	}
};

Window_SavefileList.prototype.processWheelScroll = function() {
	if (this.isWheelScrollEnabled() && this.isTouchedInsideFrame()) {
		const threshold = 20;
		if (TouchInput.wheelY >= threshold) {
			this.cursorPagedown();
		}
		if (TouchInput.wheelY <= -threshold) {
			this.cursorPageup();
		}
	}
};

Window_SavefileList.prototype.updateScrollBase = function(baseX, baseY) {
	const deltaX = baseX - this._scrollBaseX;
	const deltaY = baseY - this._scrollBaseY;
	this._scrollBaseX = baseX;
	this._scrollBaseY = baseY;
	if (this.index() !== -1) {
		this.moveCursorBy(-deltaX, -deltaY);
		this.moveInnerChildrenBy(-deltaX, -deltaY);
	}
};

Window_SavefileList.prototype.checkCoords = function(x, y) {
	const cx = this.origin.x + x - this.padding;
	const cy = this.origin.y + y - this.padding;
	let autosaveRect = new Rectangle(1, 455, 695, 56);
	if (autosaveRect.contains(cx, cy)) {
		this.selectAutosave();
		return -1;
	} else {
		const topIndex = this.topIndex();
		for (let i = 0; i < this.maxVisibleItems(); i++) {
			const index = topIndex + i;
			if (index < this.maxItems()) {
				const rect = this.itemRect(index);
				if (rect.contains(cx, cy)) {
					return index;
				}
			}
		}
	}
};

Window_SavefileList.prototype.hitTest = function(x, y) {
	if (this.innerRect.contains(x, y)) {
		return this.checkCoords(x, y);
	}
	this._autosaveSelected = false;
	return -1;
};

Window_SavefileList.prototype.isTouchOkEnabled = function() {
	return Window_Selectable.prototype.isTouchOkEnabled.call(this) || (this.isOkEnabled() && this._autosaveSelected);
};

Window_SavefileList.prototype.onTouchOk = function() {
	if (this.isTouchOkEnabled() && this._autosaveSelected) this.processOk();
	else Window_Selectable.prototype.onTouchOk.call(this);
};

Window_SavefileList.prototype.colSpacing = function() {
	return 6;
};

Window_SavefileList.prototype.rowSpacing = function() {
	return 0;
};

Window_SavefileList.prototype.refreshCursor = function() {
	if (this.index() >= 0) {
		const rect = this.itemRect(this.index());
		rect.x += 11;
		rect.y += 22;
		let image = TLB.Param.SKAUISaM.savemenu_select;
		let bmp = ImageManager.loadMenu(image);
		this._cursorSprite.bitmap = bmp;
		this.setCursorRect(rect.x + 1, rect.y + 1, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		let image = TLB.Param.SKAUISaM.savemenu_autosave_select;
		let bmp = ImageManager.loadMenu(image);
		this._cursorSprite.bitmap = bmp;
		this.setCursorRect(12, 477, 695, 56);
		this.cursorVisible = false;
	}
};

Window_SavefileList.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKAUISaM.savemenu_select;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_SavefileList.prototype._refreshCursor = function() {
	//
};

Window_SavefileList.prototype.page = function() {
	return this.topIndex() / this.maxVisibleItems() + 1;
};

TLB.SKAUISaveMenu.Window_SavefileList_selectSavefile = Window_SavefileList.prototype.selectSavefile;
Window_SavefileList.prototype.selectSavefile = function(savefileId) {
	TLB.SKAUISaveMenu.Window_SavefileList_selectSavefile.call(this, savefileId);
	this._scrollY = Math.floor(this.index() / 6) * 3 * 132;
	this.updateScrollBase(this._scrollX, this._scrollY);
};

Window_SavefileList.prototype.onTouchScroll = function() {
	if (this._canScroll) {
		this._canScroll = false;
		const accelX = this._scrollLastTouchX - TouchInput.x;
		const accelY = this._scrollLastTouchY - TouchInput.y;
		if (accelX < -1 || accelY < -1) this.cursorPageup();
		if (accelX > 1 || accelY > 1) this.cursorPagedown();
	}
	this.refresh();
};

Window_SavefileList.prototype.onTouchScrollEnd = function() {
	this._scrollTouching = false;
	this._canScroll = true;
	this.cursorVisible = this._scrollLastCursorVisible;
};

TLB.SKAUISaveMenu.Scene_File_create = Scene_File.prototype.create;
Scene_File.prototype.create = function() {
	TLB.SKAUISaveMenu.Scene_File_create.call(this);
	this.createStatusWindow();
	this._listWindow._statusWindow = this._statusWindow;
	this._helpWindow.hide();
};

TLB.SKAUISaveMenu.Scene_File_start = Scene_File.prototype.start;
Scene_File.prototype.start = function() {
	TLB.SKAUISaveMenu.Scene_File_start.call(this);
	this._listWindow.callUpdateHelp();
};

Scene_File.prototype.listWindowRect = function() {
	const params = TLB.Param.SKAUISaM;
	const wx = params.listWindowX;
	const wy = params.listWindowY;
	const ww = params.listWindowWidth;
	const wh = params.listWindowHeight;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_File.prototype.createStatusWindow = function() {
	const rect = this.statusWindowRect();
	this._statusWindow = new Window_SavefileStatus(rect);
	this.addWindow(this._statusWindow);
};

Scene_File.prototype.statusWindowRect = function() {
	const params = TLB.Param.SKAUISaM;
	const wx = this._listWindow.x + this._listWindow.width + params.statusWindowXOffset;
	const wy = this._listWindow.y;
	const ww = params.statusWindowWidth;
	const wh = params.statusWindowHeight;
	return new Rectangle(wx, wy, ww, wh);
};

class Window_SavefileStatus extends Window_Base {
	constructor(rect) {
		super(rect);
		this._backgroundSprite = new Sprite();
		let image = TLB.Param.SKAUISaM.savemenu_informationwindow_bg;
		let bmp = ImageManager.loadMenu(image);
		this._backgroundSprite.bitmap = bmp;
		this.addChildAt(this._backgroundSprite, 0);
		const thumbnailBg = new Sprite();
		image = TLB.Param.SKAUISaM.savemenu_screenshot_bg;
		bmp = ImageManager.loadMenu(image);
		thumbnailBg.bitmap = bmp;
		thumbnailBg.move(23, 61);
		this.addChildAt(thumbnailBg, 1);
		this.opacity = 0;
		this.setId(1);
	}

	setId(id) {
		const oldId = this._id;
		this._id = id;
		if (oldId != id) {
			this.refresh();
		}
	}

	refresh() {
		const id = this._id;
		DataManager.savefileExists(id).then(() => this.drawSaveInfo(true), () => this.drawSaveInfo(false));
	}

	drawSaveInfo(valid) {
		this.contents.clear();
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 24;
		const id = this._id;
		const gradient = ["#d9c5de", "#efe6f1", "#d9c5de"];
		this.drawGradientText(id === 0 ? "AUTOSAVE" : "Save #" + id, gradient, 17, 10, 100, "left", { outlineGradient: ["#4f4f4f", "#000000"], dropShadow: true, dropShadowX: 0, dropShadowY: 2, shadowOpacity: 0.75 });

		const info = DataManager.savefileInfo(id);
		if (info) {
			this.loadSnapshot(id, valid);
			if (info.corruption) this.drawCorruption(info, valid);
			if (info.lewdness) this.drawLewdness(info, valid);
			if (info.vice) this.drawVice(info, valid);
			this.drawSaveTime(info, valid);
			this.drawDifficulty(info, valid);
			this.drawLocation(info, valid);
			this.drawPlayTime(info, valid);
			if (eval(TLB.Param.SKAUIB.showGold)) this.drawGold(info, valid);
			this.drawParty(info, valid);
		}
	}

	loadSnapshot(savefileId, valid) {
		DataManager.loadThumbnail(savefileId)
			.then(() => this.drawSnapshot(savefileId, valid))
			.catch(() => 0);
	}

	drawSnapshot(savefileId, valid) {
		const snapUrl = DataManager.getThumbnail(savefileId);
		if (valid && snapUrl) {
			const hasEncryptedImages = Utils._hasEncryptedImages;
			Utils._hasEncryptedImages = false;
			const bitmap = ImageManager.loadBitmapFromUrl(snapUrl);
			Utils._hasEncryptedImages = hasEncryptedImages;
			this.changePaintOpacity(true);
			bitmap.addLoadListener(() => {
				this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 13, 51);
			});
		}
	}

	drawValue(x, y, current, max) {
		this.contents.fontFace = 'franklin-gothic-med-cond';
		this.contents.fontSize = 14;
		const maxWidth = 50;
		const gradient = ["#d9c5de", "#efe6f1", "#d9c5de"];
		let valueWidth = this.textWidth(max);
		this.drawGradientText(max, gradient, x, y, maxWidth, "right", { bold: true });
		this.contents.fontFace = 'fuckboi-sans';
		this.contents.fontSize = 5;
		valueWidth += this.textWidth(" ");
		this.contents.fontSize = 13;
		this.drawGradientText("/", gradient, x, y, maxWidth - valueWidth, "right", { bold: true });
		valueWidth += this.textWidth("/");
		this.contents.fontFace = 'franklin-gothic-med-cond';
		this.contents.fontSize = 10;
		valueWidth += this.textWidth(" ");
		this.contents.fontSize = 14;
		this.drawGradientText(current, gradient, x, y, maxWidth - valueWidth, "right", { bold: true });
	}

	drawCorruption(info, valid) {
		const bitmap = ImageManager.loadMenu(TLB.Param.SKAUISaM.savemenu_corruptionicon);
		bitmap.addLoadListener(() => {
			this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 365, 68);
		});
		if (valid && info.corruption !== null) {
			this.drawValue(358, 42, info.corruption, info.maxCorruption);
		}
	}

	drawLewdness(info, valid) {
		const bitmap = ImageManager.loadMenu(TLB.Param.SKAUISaM.savemenu_lewdnessicon);
		bitmap.addLoadListener(() => {
			this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 369, 138);
		});
		if (valid && info.lewdness !== null) {
			this.drawValue(357, 112, info.lewdness, info.maxLewdness);
		}
	}

	drawVice(info, valid) {
		const bitmap = ImageManager.loadMenu(TLB.Param.SKAUISaM.savemenu_viceicon);
		bitmap.addLoadListener(() => {
			this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 369, 201);
		});
		if (valid && info.vice !== null) {
			this.drawValue(357, 175, info.vice, info.maxVice);
		}
	}

	drawSaveTime(info, valid) {
		if (valid && info.savetime) {
			this.contents.fontFace = 'franklin-gothic-med-cond';
			this.contents.fontSize = 18;
			const x = 18;
			const y = 241;
			const gradient1 = ["#b27996", "#e2bb8c"];
			const gradient2 = ["#d9c5de", "#efe6f1", "#d9c5de"];
			this.drawGradientText("TIME", gradient1, x, y, 40, "left", { bold: true });
			this.drawGradientText(info.savetime, gradient2, x + 20, y + 21, 160, "left", { bold: true });
		}
	}

	drawDifficulty(info, valid) {
		if (valid && info.difficulty) {
			this.contents.fontFace = 'franklin-gothic-med-cond';
			this.contents.fontSize = 18;
			const x = 222;
			const y = 241;
			const gradient1 = ["#b27996", "#e2bb8c"];
			const gradient2 = ["#d9c5de", "#efe6f1", "#d9c5de"];
			this.drawGradientText("DIFFICULTY", gradient1, x, y, 80, "left", { bold: true });
			this.drawGradientText(info.difficulty, gradient2, x + 20, y + 21, 160, "left", { bold: true });
		}
	}

	drawLocation(info, valid) {
		if (valid && info.location) {
			this.contents.fontFace = 'franklin-gothic-med-cond';
			this.contents.fontSize = 18;
			const x = 18;
			const y = 302;
			const gradient1 = ["#b27996", "#e2bb8c"];
			const gradient2 = ["#d9c5de", "#efe6f1", "#d9c5de"];
			this.drawGradientText("LOCATION", gradient1, x, y, 80, "left", { bold: true });
			this.drawGradientText(info.location, gradient2, x + 20, y + 21, 300, "left", { bold: true });
		}
	}

	drawPlayTime(info, valid) {
		if (valid && info.playtime) {
			this.contents.fontFace = 'franklin-gothic-med-cond';
			this.contents.fontSize = 18;
			const x = 18;
			const y = 364;
			const gradient1 = ["#b27996", "#e2bb8c"];
			const gradient2 = ["#d9c5de", "#efe6f1", "#d9c5de"];
			const text = info.day ? `DAY ${info.day}   ${info.playtime}` : info.playtime;
			this.drawGradientText("PLAYTIME", gradient1, x, y, 70, "left", { bold: true });
			this.drawGradientText(text, gradient2, x + 20, y + 21, info.day ? 130 : 70, "left", { bold: true });
		}
	}

	drawGold(info, valid) {
		if (valid && typeof info.gold === 'number') {
			this.contents.fontFace = 'franklin-gothic-med-cond';
			this.contents.fontSize = 18;
			const x = 222;
			const y = 364;
			const gradient1 = ["#b27996", "#e2bb8c"];
			const gradient2 = ["#d9c5de", "#efe6f1", "#d9c5de"];
			this.drawGradientText("GOLD", gradient1, x, y, 70, "left", { bold: true });
			this.drawGradientText(TLB.SKABase.goldAsString(info.gold), gradient2, x + 20, y + 21, 70, "left", { bold: true });
		}
	}

	drawParty(info, valid) {
		if (valid && info.characters) {
			this.contents.fontFace = 'franklin-gothic-med-cond';
			this.contents.fontSize = 18;
			const x = 18;
			const y = 424;
			const gradient1 = ["#b27996", "#e2bb8c"];
			const gradient2 = ["#d9c5de", "#efe6f1", "#d9c5de"];
			this.drawGradientText("PARTY", gradient1, x, y, 70, "left", { bold: true });
			let characterX = 33;
			let characterY = 506;
			this.contents.fontFace = 'franklin-gothic-med-cond';
			this.contents.fontSize = 14;
			let index = 0;
			for (const data of info.characters) {
				this.drawCharacter(data[0], data[1], characterX, characterY);
				this.drawGradientText("LVL", ["#9bfac1", "#707fba"], characterX + 20, characterY - 41, this.textWidth("LVL"), "left", { bold: true, outlineThickness: 2 });
				this.changeTextColor("#eee5f1");
				const level = info.levels?.[index] || "?";
				this.drawGradientText(level, gradient2, characterX + 20, characterY - 26, this.textWidth(level), "left", { bold: true });
				index++;
				if (index === 5) {
					characterX = 33;
					characterY += 59;
				} else {
					characterX += 84;
				}
			}
			this.resetFontSettings();
		}
	}
}
