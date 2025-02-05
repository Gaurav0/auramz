// Trilobytes - Star Knightess Aura UI Skill Menu/
// TLB_SKAUISkillMenu.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAUISkillMenu = true;

window.TLB = TLB || {};
TLB.SKAUISkillMenu = TLB.SKAUISkillMenu || {};

/*:
 * @target MZ
 * @plugindesc This plugin modifies the skill menu of Star Knightess
 * Aura to reflect the prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the base Scene_Skill to match a
 * prototype specified by the client. It will not be compatible with any other
 * project and may not be used by anyone besides the client of the commission.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * SKILL TYPES
 * Types have the following parameters:
 * - Name: The name of the skill type, as defined in the database.
 * - Icon ID: Index of the icon shown for the type in the list.
 *
 * For description tags, use format <description tags:tags>.
 * It is assumed that each line will have an icon using \\i[id]. Please also
 * use double slashes for any other text codes.
 *
 * For cooldown conditions, use format <cooldown:condition>.
 *
 * All other parameters are explained in their respective description field.
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
 * @param skillTypes
 * @text Skill Types
 * @type struct<skillType>[]
 * @default ["{\"name\":\"Magic\",\"iconID\":\"79\"}"]
 *
 * @param skillmenu
 * @text Skill Menu Settings
 *
 * @param skillTypeWindow
 * @parent skillmenu
 * @text Skill Type Window
 *
 * @param skillTypeWindowX
 * @parent skillTypeWindow
 * @text X
 * @desc X coordinate of the skill type window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -121
 *
 * @param skillTypeWindowY
 * @parent skillTypeWindow
 * @text Y
 * @desc Y coordinate of the skill type window rect.
 * @type number
 * @result 24
 *
 * @param skillTypeWindowWidth
 * @parent skillTypeWindow
 * @text Width
 * @desc Width of the skill type window rect.
 * @type number
 * @default 329
 *
 * @param skillmenu_statuswindow
 * @parent skillmenu
 * @text Status Window
 *
 * @param skillmenu_statuswindow_bgimage
 * @parent skillmenu_statuswindow
 * @text BG Image
 * @desc Filename of image to use for the status window background.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_STATUS_WINDOW_BG
 *
 * @param skillmenu_statuswindow_addonimage
 * @parent skillmenu_statuswindow
 * @text Addon Image
 * @desc Filename of image to use for the addon (Q/W) section.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_STATUS_ADDON
 *
 * @param skillmenu_statuswindow_qwimage
 * @parent skillmenu_statuswindow
 * @text QW Image
 * @desc Filename of image to use for the QW image.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_STATUS_QW
 *
 * @param skillmenu_statuswindow_previmage_inactive
 * @parent skillmenu_statuswindow
 * @text Previous Actor Image (inactive)
 * @desc Filename of image to use for the inactive Previous Actor button.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_STATUS_INACTIVE_ARROW_LEFT
 *
 * @param skillmenu_statuswindow_nextimage_inactive
 * @parent skillmenu_statuswindow
 * @text Next Actor Image (inactive)
 * @desc Filename of image to use for the inactive Next Actor button.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_STATUS_INACTIVE_ARROW_RIGHT
 *
 * @param skillmenu_statuswindow_previmage_active
 * @parent skillmenu_statuswindow
 * @text Previous Actor Image (active)
 * @desc Filename of image to use for the active Previous Actor button.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_STATUS_ACTIVE_ARROW_LEFT
 *
 * @param skillmenu_statuswindow_nextimage_active
 * @parent skillmenu_statuswindow
 * @text Next Actor Image (active)
 * @desc Filename of image to use for the active Next Actor button.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_STATUS_ACTIVE_ARROW_RIGHT
 *
 * @param skillmenu_statuswindow_x_offset
 * @parent skillmenu_statuswindow
 * @text X Offset
 * @desc X offset from the right of the skill type window.
 * @type number
 * @default 3
 *
 * @param skillmenu_statuswindow_width
 * @parent skillmenu_statuswindow
 * @text Width
 * @desc Width of the status window rect.
 * @type number
 * @default 574
 *
 * @param skillmenu_statuswindow_height
 * @parent skillmenu_statuswindow
 * @text Height
 * @desc Height of the status window rect.
 * @type number
 * @default 185
 *
 * @param skillmenu_skillwindow
 * @parent skillmenu
 * @text Item Window
 *
 * @param skillmenu_skillwindow_bgimage
 * @parent skillmenu_skillwindow
 * @text BG Image
 * @desc Filename of image to use for the skill window.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_SKILL_WINDOW
 *
 * @param skillmenu_skillwindow_content
 * @parent skillmenu_skillwindow
 * @text Content Image
 * @desc Filename of image to use for the skill window content.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_CONTENT_BG
 *
 * @param skillmenu_skillwindow_dailyimage_full
 * @parent skillmenu_skillwindow
 * @text Daily Skill Full Image
 * @desc Filename of image to use for a daily skill that's not on cooldown.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_DAILY_FULL
 *
 * @param skillmenu_skillwindow_dailyimage_empty
 * @parent skillmenu_skillwindow
 * @text Daily Skill Empty Image
 * @desc Filename of image to use for a daily skill that's on cooldown.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_DAILY_EMPTY
 *
 * @param skillmenu_skillwindow_x_offset
 * @parent skillmenu_skillwindow
 * @text X Offset
 * @desc X offset from the left of the status window.
 * @type number
 * @default 236
 *
 * @param skillmenu_skillwindow_y_offset
 * @parent skillmenu_skillwindow
 * @text Y Offset
 * @desc Y offset from the bottom of the status window.
 * @type number
 * @default 6
 *
 * @param skillmenu_skillwindow_width
 * @parent skillmenu_skillwindow
 * @text Width
 * @desc Width of the skill window rect.
 * @type number
 * @default 817
 *
 * @param skillmenu_skillwindow_height
 * @parent skillmenu_skillwindow
 * @text Height
 * @desc Height of the skill window rect.
 * @type number
 * @default 308
 *
 * @param skillmenu_helpwindow
 * @parent skillmenu
 * @text Help Window
 *
 * @param skillmenu_helpwindow_bgimage
 * @parent skillmenu_helpwindow
 * @text BG Image
 * @desc Filename of image to use for the help window.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_HELP_WINDOW
 *
 * @param skillmenu_helpwindow_x_offset
 * @parent skillmenu_helpwindow
 * @text X Offset
 * @desc X offset from the left of the skill window.
 * @type number
 * @min -9999
 * @max 9999
 * @default -236
 *
 * @param skillmenu_helpwindow_y_offset
 * @parent skillmenu_helpwindow
 * @text Y Offset
 * @desc Y offset from the bottom of the skill window.
 * @type number
 * @default 3
 *
 * @param skillmenu_helpwindow_width
 * @parent skillmenu_helpwindow
 * @text Width
 * @desc Width of the help window rect.
 * @type number
 * @default 817
 *
 * @param skillmenu_helpwindow_height
 * @parent skillmenu_helpwindow
 * @text Height
 * @desc Height of the help window rect.
 * @type number
 * @default 186
 *
 * @param sortWindow
 * @parent skillmenu
 * @text Sort Window
 *
 * @param skillmenu_sortwindow_bgimage
 * @parent sortWindow
 * @text BG
 * @desc Filename of image to use for the sort window background.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_BONUS_WINDOW
 *
 * @param skillmenu_sortwindow_cursorimage
 * @parent sortWindow
 * @text Cursor image
 * @desc Filename of image to use for the sort window cursor.
 * @type file
 * @dir img/menu/
 * @default Skill_Menu/SKILL_MENU_SORT_SELECT
 *
 * @param skillmenu_sortwindow_x
 * @parent sortWindow
 * @text X
 * @desc X coordinate of the sort window rect.
 * @type number
 * @default 239
 *
 * @param skillmenu_sortwindow_y
 * @parent sortWindow
 * @text Y
 * @desc Y coordinate of the sort window rect.
 * @type number
 * @default 185
 *
 * @param skillmenu_sortwindow_width
 * @parent sortWindow
 * @text Width
 * @desc Width of the sort window rect.
 * @type number
 * @default 0
 *
 * @param skillmenu_sortwindow_height
 * @parent sortWindow
 * @text Height
 * @desc Height of the sort window rect.
 * @type number
 * @default 0
 *
 */
/*~struct~skillType:
 * @param name
 * @text Name
 * @desc The name of the skill type.
 *
 * @param iconID
 * @text Icon ID
 * @desc The ID of the icon to use for this skill type.
 * @type Number
 * @default 76
 *
 */

window.parameters = PluginManager.parameters('TLB_SKAUISkillMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKAUISM = TLB.Param.SKAUISM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAUISM);

//-----------------------------------------------------------------------------
//
// Game_System (existing class)
//
// New function: setSkillSort(option)
// New function: getSkillSort
// Alias: initialize
//
//-----------------------------------------------------------------------------

Game_System.prototype.setSkillSort = function(option) {
	this._skillSortOption = option;
};

Game_System.prototype.getSkillSort = function() {
	return this._skillSortOption || 2;
};

TLB.SKAUISkillMenu.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	TLB.SKAUISkillMenu.Game_System_initialize.call(this);
	this._skillSortOption = 2;
};

class Sprite_PageButton extends Sprite_Clickable {
	constructor(parentWindow, parentSprite, inactiveImage, activeImage, handler) {
		super();
		this._parentWindow = parentWindow;
		this._parentSprite = parentSprite;
		this._inactiveImage = inactiveImage;
		this._activeImage = activeImage;
		this._handler = handler;
		this._active = true;
	}

	activate() {
		this._active = true;
	}

	deactivate() {
		this._active = false;
	}

	loadButtonImage() {
		this.bitmap = ImageManager.loadMenu(this._inactiveImage);
	}

	update() {
		Sprite.prototype.update.call(this);
		this.updateFrame();
		this.processTouch();
	}

	updateFrame() {
		this.bitmap = ImageManager.loadMenu((this._active && (this.isPressed() || Input.isPressed(this._handler))) ? this._activeImage : this._inactiveImage);
		if (this._parentSprite.getChildByName(this._handler)?.style) this._parentSprite.getChildByName(this._handler).style.fill = (this._active && (this.isPressed() || Input.isPressed(this._handler))) ? ['#dbba81'] : ['#cdc3d0', '#a79aaa'];
	}

	onClick() {
		this._parentWindow.callHandler(this._handler);
	}
}

//-----------------------------------------------------------------------------
//
// Window_SKASkillHelp (new class)
// Inherits from Window_Help
//
// Override: initialize(rect)
// Override: setItem(item)
// Override: refresh
// Override: lineHeight (from Window_Base)
//
//-----------------------------------------------------------------------------

class Window_SKASkillHelp extends Window_Help {
	constructor(rect) {
		super(rect);
		this._backSprite = new Sprite();
		const image = TLB.Param.SKAUISM.skillmenu_helpwindow_bgimage;
		this._backSprite.bitmap = ImageManager.loadMenu(image);
		this._backSprite.position.y -= 10;
		this.addChildAt(this._backSprite, 0);
		this.opacity = 0;
	}

	setItem(item) {
		super.setItem(item);
		if (item) {
			const tags = item.meta["description tags"];
			if (tags) {
				const parsedTags = JSON.parse(tags);
				let x = 3;
				for (const tag of parsedTags) {
					this.changeTextColor(ColorManager.textColor(8));
					this.contents.fontFace = 'franklin-gothic-demi-cond';
					this.contents.fontSize = 18;
					const baseTag = tag.replace(/\\\w+(\[\d+\])/, "");
					const width = this.textWidth(baseTag);
					this.drawTextEx(tag, x, 116, width, true);
					x += width + 24 + ImageManager.iconWidth;
				}
				this.changePaintOpacity(1);
			}
		}
	}

	refresh() {
		this.contents.clear();
		this.contents.fontFace = "franklin-gothic-med";
		this.contents.fontSize = 22;
		this.drawTextEx(this._text, 10, 0, 784, true);
	}

	lineHeight() {
		return 40;
	}
}

//-----------------------------------------------------------------------------
//
// Window_SkillType (existing class)
//
// Overwrite: initialize(rect)
// Override: drawItem(index) (from Window_Command)
// Override: itemHeight (from Window_Selectable)
// Override: select(index) (from Window_Selectable)
// Override: drawAllItems (from Window_Selectable)
// Override: drawItemBackground(index) (from Window_Selectable)
// Override: refreshCursor (from Window_Selectable)
// Override: _createCursorSprite (from Window)
// Override: _refreshCursor (from Window)
//
//-----------------------------------------------------------------------------

Window_SkillType.prototype.initialize = function(rect) {
	this._categoryBackSprites = [];
	Window_Command.prototype.initialize.call(this, rect);
	this.opacity = 0;
	this.cursorVisible = false;
	this._canRepeat = false;
	this.refresh();
	this.select(0);
};

Window_SkillType.prototype.drawItem = function(index) {
	const sprite = this._categoryBackSprites[index];
	if (sprite) {
		const rect = this.itemRect(index);
		rect.y -= 1;
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		const skillTypes = TLB.Param.SKAUISM.skillTypes;
		const stypeIndex = skillTypes.findIndex(stype => stype.name === this.commandName(index));
		const stype = skillTypes[stypeIndex];
		if (stype) {
			const iconID = stype.iconID;
			this.drawIcon(iconID, rect.x + 5, rect.y + -9 * (index - 2));
		}
		this.contents.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = 30;
		this.drawGradientText(this.commandName(index), ["#d9c4de", "#eee5f1", "#d9c5dd"], rect.x + 49, rect.y - 4 + -9 * (index - 2), 180, "left", { outlineThickness: 3});
	}
};

Window_SkillType.prototype.itemHeight = function() {
	return 79;
};

Window_SkillType.prototype.drawAllItems = function() {
	for (const sprite of this._categoryBackSprites) {
		this.removeChild(sprite);
	}
	this._categoryBackSprites = [];
    const topIndex = this.topIndex();
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItemBackground(index);
            this.drawItem(index);
        }
    }
};

Window_SkillType.prototype.drawItemBackground = function(index) {
	const rect = this.itemRect(index);
	if (index > 1) rect.y -= 9 * (index - 1);
	this._categoryBackSprites.push(new Sprite());
	const image = index === 0 ?
		TLB.Param.SKAUIB.categorywindow_topbgimage : TLB.Param.SKAUIB.categorywindow_bgimage;
	this._categoryBackSprites[index].bitmap = ImageManager.loadMenu(image);
	this._categoryBackSprites[index].y = rect.y;
	this.addChildAt(this._categoryBackSprites[index], index);
};

Window_SkillType.prototype.refreshCursor = function() {
	const index = this.index();
	if (index >= 0) {
		const rect = this.itemRect(index);
		rect.y += 13 - (9 * index);
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		this.setCursorRect(0, 0, 0, 0);
		this.cursorVisible = false;
	}
};

Window_SkillType.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKAUIB.categorywindow_cursorimage;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_SkillType.prototype._refreshCursor = function() {
	//
};

//-----------------------------------------------------------------------------
//
// Window_SkillStatus (existing class)
//
// New function: placeSKAGauge(actor, type, x, y)
// Overwrite: initialize(rect)
// Overwrite: refresh
// Override: placeBasicGauges(actor, x, y) (from Window_StatusBase)
// Override: drawActorFace (from Window_StatusBase)
// Override: drawActorName(actor) (from Window_StatusBase)
// Override: drawActorClass(actor) (from Window_StatusBase)
// Override: drawActorLevel(actor, x, y) (from Window_StatusBase)
// Override: drawActorSimpleStatus(actor) (from Window_StatusBase)
// Override: drawFace(faceName, faceIndex, x, y, width, height) (from Window_Base)
//
//-----------------------------------------------------------------------------

Window_SkillStatus.prototype.placeSKAGauge = function(actor, type, x, y) {
    const key = "actor%1-gauge-%2".format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_SKAItemGauge, type);
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
};

TLB.SKAUISkillMenu.Window_SkillStatus_initialize = Window_SkillStatus.prototype.initialize;
Window_SkillStatus.prototype.initialize = function(rect) {
	Window_StatusBase.prototype.initialize.call(this, rect);
	this._actor = null;
	this._handlers = {};
	this._bgSprite = new Sprite();
	let image = TLB.Param.SKAUISM.skillmenu_statuswindow_bgimage;
	this._bgSprite.bitmap = ImageManager.loadMenu(image);
	this._actorContainer = new PIXI.Container;
	this._drawingLayer = new Sprite();
	this._drawingLayer.bitmap = new Bitmap(574, 185);
	this.addChildAt(this._drawingLayer, 1);
	this._bgSprite.addChild(this._actorContainer);
	image = TLB.Param.SKAUIB.actorwindow_actorbgimage_active;
	let bitmap = ImageManager.loadMenu(image);
	const actorFrame = new Sprite();
	actorFrame.bitmap = bitmap;
	actorFrame.move(10, 16);
	this._actorContainer.addChild(actorFrame);
	image = TLB.Param.SKAUIB.actorwindow_actornameframe_unlocked;
	bitmap = ImageManager.loadMenu(image);
	const actorNameFrame = new Sprite();
	actorNameFrame.bitmap = bitmap;
	actorNameFrame.move(130, 16);
	actorNameFrame.name = "actorNameFrame";
	image = TLB.Param.SKAUISM.skillmenu_statuswindow_addonimage;
	bitmap = ImageManager.loadMenu(image);
	const addonFrame = new Sprite();
	addonFrame.bitmap = bitmap;
	addonFrame.move(433, 29);
	addonFrame.name = "addonFrame";
	this._bgSprite.addChild(this._drawingLayer);
	this._bgSprite.addChild(actorNameFrame);
	if (SceneManager._scene.needsPageButtons()) {
		image = TLB.Param.SKAUISM.skillmenu_statuswindow_qwimage;
		bitmap = ImageManager.loadMenu(image);
		const qwLabel = new Sprite();
		qwLabel.bitmap = bitmap;
		qwLabel.move(20, 5);
		addonFrame.addChild(qwLabel);
		const textOptions = {
			fill: ['#cdc3d0', '#a79aaa'],
			fontFamily: 'franklin-gothic-heavy',
			fontSize: 24,
			stroke: "#000000",
			strokeThickness: 2
		}
		if (Input.isControllerConnected()) {
			qwLabel.bitmap = null;
			const prevButton = new Sprite_PageButton(this, qwLabel, TLB.Param.SKAUISM.skillmenu_statuswindow_previmage_inactive, TLB.Param.SKAUISM.skillmenu_statuswindow_previmage_active, "pageup");
			prevButton.x -= 5;
			qwLabel.addChild(prevButton);
			const nextButton = new Sprite_PageButton(this, qwLabel, TLB.Param.SKAUISM.skillmenu_statuswindow_nextimage_inactive, TLB.Param.SKAUISM.skillmenu_statuswindow_nextimage_active, "pagedown");
			nextButton.move(75, 0);
			qwLabel.addChild(nextButton);
			const leftButton = new Sprite_ControllerButton("pageup");
			leftButton.move(16, 0);
			qwLabel.addChild(leftButton);
			const rightButton = new Sprite_ControllerButton("pagedown");
			rightButton.move(46, 0);
			qwLabel.addChild(rightButton);
			this._prevButton = prevButton;
			this._nextButton = nextButton;
		} else {
			const pageup = TLB.SKABase.getKey("pageup");
			const pagedown = TLB.SKABase.getKey("pagedown");
			const puText = new PIXI.Text(String.fromCharCode(pageup), textOptions);
			puText.name = "pageup";
			const pdText = new PIXI.Text(String.fromCharCode(pagedown), textOptions);
			pdText.name = "pagedown";
			puText.position.x = 20;
			pdText.position.x = 55;
			qwLabel.addChild(puText);
			qwLabel.addChild(pdText);
			const prevButton = new Sprite_PageButton(this, qwLabel, TLB.Param.SKAUISM.skillmenu_statuswindow_previmage_inactive, TLB.Param.SKAUISM.skillmenu_statuswindow_previmage_active, "pageup");
			qwLabel.addChild(prevButton);
			const nextButton = new Sprite_PageButton(this, qwLabel, TLB.Param.SKAUISM.skillmenu_statuswindow_nextimage_inactive, TLB.Param.SKAUISM.skillmenu_statuswindow_nextimage_active, "pagedown");
			nextButton.move(70, 0);
			qwLabel.addChild(nextButton);
			this._prevButton = prevButton;
			this._nextButton = nextButton;
		}
	}
	this._bgSprite.addChild(addonFrame);
	this.addChildAt(this._bgSprite, 1);
};

Window_SkillStatus.prototype.refresh = function() {
    Window_StatusBase.prototype.refresh.call(this);
	this._drawingLayer.bitmap.clear();
    if (this._actor) {
        const x = this.colSpacing() / 2;
        const h = this.innerHeight;
        this.drawActorFace(this._actor, x + 12, 12, 144, h);
        this.drawActorSimpleStatus(this._actor);
		let lastX = x + 187;
		for (let i = 0; i < 3; ++i) {
			this.placeStateIcon(this._actor, lastX, 133, i);
			lastX += ImageManager.iconWidth;
		}
    }
};

Window_SkillStatus.prototype.placeBasicGauges = function(actor, x, y) {
	this.placeSKAGauge(actor, "hp", x, y);
	Window_MenuActor.prototype.drawValue.call(this, "HP", 99, actor.hp, actor.mhp, x + 4, y + 2);
	x += 113;
	this.placeSKAGauge(actor, "mp", x, y);
	Window_MenuActor.prototype.drawValue.call(this, "MP", 99, actor.mp, actor.mmp, x + 4, y + 2);
	if (actor.actorId() === 1 && eval(TLB.Param.SKAUIB.showWillpower)) {
		const currentVarId = TLB.Param.SKAB.currentWpVar;
		const maxVarId = TLB.Param.SKAB.maxWpVar;
		const currentValue = $gameVariables.value(currentVarId);
		const maxValue = $gameVariables.value(maxVarId);
		x += 114;
		this.placeSKAGauge(actor, "wp", x, y);
		Window_MenuActor.prototype.drawValue.call(this, "WP", 99, currentValue, maxValue, x + 4, y + 2);
	}
};

Window_SkillStatus.prototype.drawActorFace = function(
    actor, x, y, width, height
) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
};

Window_SkillStatus.prototype.drawActorName = function(actor) {
	this.changeTextColor("#c3a38f");
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 30;
	this.contents.fontBold = true;
	this.drawText(actor.name(), 184, 18, this.textWidth(actor.name()));
	this.contents.fontBold = false;
	this.resetFontSettings();
};

Window_SkillStatus.prototype.drawActorClass = function(actor) {
	this.changeTextColor("#eee5f1");
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 24;
	this.drawText(actor.currentClass().name, 174, 53, Math.min(190, this.textWidth(actor.currentClass().name)));
};

Window_SkillStatus.prototype.drawActorLevel = function(actor, x, y) {
	this.contents.fontFace = 'franklin-gothic-demi-cond';
	this.contents.fontSize = 18;
	this.contents.fontBold = true;
	this.drawGradientText("LVL", ["#9bfac1", "#707fba"], x, y, this.textWidth("LVL"), "left", { outlineThickness: 2 });
	this.changeTextColor("#eee5f1");
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 24;
	this.drawText(actor.level, x + 44, y, this.textWidth(actor.level), "right");
	this.contents.fontBold = false;
	this.resetFontSettings();
};

Window_SkillStatus.prototype.drawActorSimpleStatus = function(actor) {
    this.drawActorName(actor);
    this.drawActorLevel(actor, 371, 52);
    this.drawActorClass(actor);
    this.placeBasicGauges(actor, 175, 88);
};

Window_SkillStatus.prototype.drawFace = function(
    faceName, faceIndex, x, y, width, height
) {
    width = width || ImageManager.faceWidth;
    height = height || ImageManager.faceHeight;
    const bitmap = ImageManager.loadFace(faceName);
    const pw = ImageManager.faceWidth;
    const ph = ImageManager.faceHeight;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
    const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
    this._drawingLayer.bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy);
};

//-----------------------------------------------------------------------------
//
// Window_SKASkillList (new class)
// Inherits from Window_SkillList
//
// Overwrite: initialize(rect)
// New function: hideHeartSprites
// New function: createInnerSprite
// Overwrite: makeItemList
// Overwrite: drawItem(index)
// Overwrite: colSpacing
// Overwrite: refresh
// Override: itemWidth (from Window_Selectable)
// Override: hitIndex (from Window_Selectable)
// Override: drawItemBackground(index) (from Window_Selectable)
// Override: refreshCursor (from Window_Selectable)
// Override: updateArrows (from Window_Scrollable)
// Override: updateScrollBase(baseX, baseY) (from Window_Scrollable)
// Override: itemPadding (from Window_Base)
// Override: _createCursorSprite (from Window)
// Override: _refreshCursor (from Window)
// Override: _refreshArrows (from Window)
// Override: _updateFilterArea (from Window)
// Property redefinition: innerHeight
// Property redefinition: innerRect

class Window_SKASkillList extends Window_SkillList {
	constructor(rect) {
		const params = TLB.Param.SKAUISM;
		super(rect);
		this._heartSprites = {};
		this._backgroundSprite = new Sprite();
		let image = params.skillmenu_skillwindow_bgimage;
		const bmp = ImageManager.loadMenu(image);
		this._backgroundSprite.bitmap = bmp;
		this.addChildAt(this._backgroundSprite, 0);
		this._contentBg = new Sprite();
		image = params.skillmenu_skillwindow_content;
		let bitmap = ImageManager.loadMenu(image);
		this._contentBg.bitmap = bitmap;
		this._contentBg.move(5, -84);
		this._clientArea.addChildAt(this._contentBg, 0);
		image = TLB.Param.SKAUIB.arrowimage;
		bitmap = ImageManager.loadMenu(image);
		const arrowAnchor = { x: 0.5, y: 0.5 };
		this._downArrowSprite.bitmap = bitmap;
		this._downArrowSprite.anchor = arrowAnchor;
		this._downArrowSprite.move(817 / 2, 293);
		this._upArrowSprite.bitmap = bitmap;
		this._upArrowSprite.anchor = arrowAnchor;
		this._upArrowSprite.scale.y = -1;
		this._upArrowSprite.move(817 / 2, 5);
		this.opacity = 0;
		this.cursorVisible = false;
		this._contentsSprite.y += 4;
		this._additionalSprites = {};
		this.refresh();
	}

	createInnerSprite(key, spriteClass) {
		const dict = this._additionalSprites;
		if (dict[key]) {
			return dict[key];
		} else {
			const sprite = new spriteClass();
			dict[key] = sprite;
			this.addInnerChild(sprite);
			return sprite;
		}
	};

	removeInnerSprite(key) {
		const dict = this._additionalSprites;
		const sprite = dict[key];
		this._clientArea.removeChild(sprite);
		this._innerChildren.remove(sprite);
		delete dict[key];
		if (sprite) sprite.destroy();
	}

	hideHeartSprites() {
		if (this._heartSprites) {
			for (const sprite of Object.values(this._heartSprites)) {
				sprite.hide();
			}
		}
	}

	createHeartSprite(key) {
		const dict = this._heartSprites;
		if (dict[key]) {
			return dict[key];
		} else {
			const sprite = new Sprite();
			dict[key] = sprite;
			this.addInnerChild(sprite);
			return sprite;
		}
	}

	includes(item) {
		return super.includes(item) && item.stypeId > 0;
	}

	sortByName() {
		this._data.sort((a, b) => a.name.localeCompare(b.name));
	}

	sortById() {
		this._data.sort((a, b) => a.id - b.id);
	}

	sortByRank() {
		this._data.sort((a, b) => {
			const numeralToDec = {"I": 1, "II": 2, "III": 3};
			const aNum = a.name.substr(a.name.lastIndexOf(" ") + 1, a.name.length);
			const bNum = b.name.substr(b.name.lastIndexOf(" ") + 1, b.name.length);
			if (numeralToDec[aNum] === undefined) return -1;
			return numeralToDec[aNum] - numeralToDec[bNum];
		});
	}

	sortByUsable() {
		this._data.sort((a, b) => {
			if (this.isEnabled(a)) return -1;
			return 1;
		});
	}

	makeItemList() {
		if (this._additionalSprites) {
			for (const key of Object.keys(this._additionalSprites)) {
				this.removeInnerSprite(key);
			}
		}
		super.makeItemList();
		if ($gameSystem.getSkillSort() === 1) {
			this.sortByName();
		} else if ($gameSystem.getSkillSort() === 2) {
			this.sortById();
		} else if ($gameSystem.getSkillSort() === 3) {
			this.sortByRank();
		} else if ($gameSystem.getSkillSort() === 4) {
			this.sortByUsable();
		}
	}

	drawItem(index) {
		const item = this.itemAt(index);
		if (item) {
			const rect = this.itemLineRect(index);
			const iconX = rect.x + 7;
			const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
			this.changePaintOpacity(this.isEnabled(item));
			this.drawIcon(item.iconIndex, iconX, iconY);
			this.contents.fontFace = "franklin-gothic-med";
			this.contents.fontSize = 18;
			this.resetTextColor();
			const name = this.itemName(item, this._actor);
			this.drawText(name, iconX + 39, rect.y, 278, this.lineHeight());
			this._actor._recordedSkills = this._actor._recordedSkills || [];
			if (ConfigManager.showNewMarker && !this._actor._recordedSkills.includes(item.id)) {
				const key = "skill%1-newmarker".format(item.id);
				const sprite = this.createInnerSprite(key, Sprite_NewMarker);
				sprite.move(rect.x + 8, rect.y + 15);
				sprite.show();
			}
			const cooldown = item.meta.cooldown;
			if (cooldown) {
				const disabled = eval(cooldown);
				const key = "skill%1-cooldown".format(item.id);
				const sprite = this.createHeartSprite(key);
				const image = disabled ? TLB.Param.SKAUISM.skillmenu_skillwindow_dailyimage_empty : TLB.Param.SKAUISM.skillmenu_skillwindow_dailyimage_full;
				const bitmap = ImageManager.loadMenu(image);
				sprite.bitmap = bitmap;
				sprite.move(rect.x + 298, rect.y + 15);
				sprite.show();
			}
			this.drawSkillCost(item, rect.x + 5, rect.y, rect.width);
		}
	}

	select(index) {
		const prevItem = this.item();
		if (prevItem) {
			this._actor._recordedSkills = this._actor._recordedSkills || [];
			if (!this._actor._recordedSkills.includes(prevItem.id)) this._actor._recordedSkills.push(prevItem.id);
			const key = "skill%1-newmarker".format(prevItem.id);
			this.removeInnerSprite(key);
		}
		super.select(index);
		this.refresh();
	}

	colSpacing() {
		return 4;
	}

	refresh() {
		this.hideHeartSprites();
		super.refresh();
	}

	itemWidth() {
		return 393;
	}

	hitIndex() {
		const touchPos = new Point(TouchInput.x, TouchInput.y);
		const localPos = this.worldTransform.applyInverse(touchPos);
		return this.hitTest(localPos.x, localPos.y - 4);
	}

	drawItemBackground(index) {
		//
	}

	refreshCursor() {
		if (this.index() >= 0) {
			const rect = this.itemRect(this.index());
			rect.x += 5;
			rect.y += 4;
			this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
			this.cursorVisible = true;
		} else {
			this.setCursorRect(0, 0, 0, 0);
			this.cursorVisible = false;
		}
	}

	updateScrollBase(baseX, baseY) {
		const deltaX = baseX - this._scrollBaseX;
		const deltaY = baseY - this._scrollBaseY;
		this._contentBg.x -= deltaX;
		this._contentBg.y -= deltaY;
		if (deltaY > 44) { // scrolling more than 1 row, select last item
			this._contentBg.y = this.row() % 2 === 0 ? -128 : -84;
		} else if (this._contentBg.y <= -172 || this._contentBg.y >= 4) this._contentBg.y = -84;
		super.updateScrollBase(baseX, baseY);
	}

	_createCursorSprite() {
		this._cursorSprite = new Sprite();
		let image = TLB.Param.SKAUIB.itemwindow_cursorimage;
		let bmp = ImageManager.loadMenu(image);
		this._cursorSprite.bitmap = bmp;
		this._clientArea.addChild(this._cursorSprite);
	}

	_refreshCursor() {
		//
	}

	_refreshArrows() {
		//
	}

	_updateFilterArea() {
		const pos = this._clientArea.worldTransform.apply(new Point(0, 4));
		const filterArea = this._clientArea.filterArea;
		filterArea.x = pos.x + this.origin.x;
		filterArea.y = pos.y + this.origin.y;
		filterArea.width = this.innerWidth;
		filterArea.height = 264;
	}
}

Object.defineProperty(Window_SKASkillList.prototype, "innerHeight", {
    get: function() {
        return 264;
    },
    configurable: true
});

Object.defineProperty(Window_SKASkillList.prototype, "innerRect", {
    get: function() {
        return new Rectangle(
            17,
            16,
            this.innerWidth,
            264
        );
    },
    configurable: true
});

//-----------------------------------------------------------------------------
//
// Window_SortOptions (new class)
// Inherits from Window_Selectable
//
// Overwrite: initialize(rect)
// New function: makeItemList
// New function: processOne
// New function: processTwo
// New function: processThree
// New function: processFour
// Overwite: itemHeight
// Overwrite: maxItems
// Overwrite: processHandling
// OVerwrite: processTouch
// Overwrite: drawItem(index)
// Overwrite: drawItemBackground(index)
// Overwrite: refresh
//
//-----------------------------------------------------------------------------

class Window_SortOptions extends Window_Selectable {
	constructor(rect) {
		super(rect);
		this._backSprite = new Sprite();
		let image = TLB.Param.SKAUISM.skillmenu_sortwindow_bgimage;
		const bmp = ImageManager.loadMenu(image);
		this._backSprite.bitmap = bmp;
		this._drawingLayer = new Sprite();
		this._drawingLayer.bitmap = new Bitmap(239, 185);
		this._backSprite.addChild(this._drawingLayer);
		image = TLB.Param.SKAUISM.skillmenu_sortwindow_cursorimage;
		const rect2 = this.itemLineRect(1);
		rect2.x += 5;
		rect2.y += 18;
		const cursor = new Sprite();
		cursor.bitmap = ImageManager.loadMenu(image);
		cursor.opacity = 120;
		cursor.move(rect2.x, rect2.y);
		this._backSprite.addChild(cursor);
		this.addChildAt(this._backSprite, 1);
		if (Input.isControllerConnected()) {
			const xSprite = new Sprite_ControllerButton("shift");
			xSprite.x = this.contentsWidth() - 26;
			xSprite.y = 18;
			this.addChild(xSprite);
		}
		this.refresh();
	}

	makeItemList() {
		this._data = [[246, "Sort by Name", "one"], [188, "Sort by ID", "two"], [190, "Sort by Rank", "three"], [208, "Sort by Usability", "four"]];
	}

	processOne() {
		this.callHandler("one");
	}

	processTwo() {
		this.callHandler("two");
	}

	processThree() {
		this.callHandler("three");
	}

	processFour() {
		this.callHandler("four");
	}

	itemHeight() {
		return Window_Scrollable.prototype.itemHeight.call(this);
	}

	maxItems() {
		return this._data ? this._data.length : 1;
	}

	processHandling() {
		super.processHandling();
		if (this.isOpen()) {
			if (this.isHandled("one") && Input.isTriggered("one")) {
				return this.processOne();
			}
			if (this.isHandled("two") && Input.isTriggered("two")) {
				return this.processTwo();
			}
			if (this.isHandled("three") && Input.isTriggered("three")) {
				return this.processThree();
			}
			if (this.isHandled("four") && Input.isTriggered("four")) {
				return this.processFour();
			}
		}
	}

	processTouch() {
		if (this.isOpen()) {
			if (TouchInput.isClicked()) {
				const hitIndex = this.hitIndex();
				if (hitIndex >= 0) this.callHandler("touch");
			}
		}
	}

	drawItem(index) {
		const rect = this.itemRect(index);
		rect.x += 8;
		rect.y += 6;
		const data = this._data[index];
		this.drawIcon(data[0], rect.x, rect.y);
		this.changeTextColor(ColorManager.textColor(8));
		this.contents.fontFace = "franklin-gothic-demi-cond";
		this.contents.fontSize = 24;
		const symbol = data[2];
		const keyCode = TLB.SKABase.getKey(symbol, false);
		const keybind = String.fromCharCode(keyCode);
		if (Input.isControllerConnected()) {
			const icons = [Input.iconMapper.up, Input.iconMapper.down, Input.iconMapper.left, Input.iconMapper.right];
			this.drawIcon(icons[index], rect.x + 32, rect.y);
		} else {
			this.drawText(keybind, rect.x + 40, rect.y, 30, this.lineHeight());
		}
		this.contents.fontSize = 18;
		this.drawText(data[1], rect.x + (Input.isControllerConnected() ? 68 : 58), rect.y, 140, this.lineHeight());
	}

	drawItemBackground(index) {
		//
	}

	refresh() {
		this.makeItemList();
		const cursor = this._backSprite.children[1];
		const rect = this.itemLineRect($gameSystem.getSkillSort() - 1);
		rect.x += 5;
		rect.y += 18;
		cursor.move(rect.x, rect.y);
		super.refresh(this);
	}

	resetInputState() {
		Input._gamepadStates.fill(false);
		Input._currentState = [];
		Input._latestButton = null;
	}

	update() {
		if (Input.isPressed("shift")) {
			if (Input.isTriggered("up")) {
				this.processOne();
				this.resetInputState();
			} else if (Input.isTriggered("down")) {
				this.processTwo();
				this.resetInputState();
			} else if (Input.isTriggered("left")) {
				this.processThree();
				this.resetInputState();
			} else if (Input.isTriggered("right")) {
				this.processFour();
				this.resetInputState();
			} else {
				super.update();
			}
		} else {
			super.update();
		}
	}
}

TLB.SKAUISkillMenu.Window_BattleSkill_select = Window_BattleSkill.prototype.select;
Window_BattleSkill.prototype.select = function(index) {
	const prevItem = this.item();
	if (prevItem) {
		this._actor._recordedSkills = this._actor._recordedSkills || [];
		if (!this._actor._recordedSkills.includes(prevItem.id)) this._actor._recordedSkills.push(prevItem.id);
	}
	TLB.SKAUISkillMenu.Window_BattleSkill_select.call(this, index);
};

//-----------------------------------------------------------------------------
//
// Scene_Skill (existing class)
//
// New function: calcStypeWindowHeight(numLines, selectable)
// New function: createSortWindow
// New function: sortWindowRect
// New function: processSort
// New function: executeSort
// New function: sortByName
// New function: sortByID
// New function: sortByRank
// New function: sortByUsable
// Overwrite: create
// Overwrite: createSkillTypeWindow
// Overwrite: skillTypeWindowRect
// Overwrite: createStatusWindow
// Overwrite: statusWindowRect
// Overwrite: createItemWindow
// Overwrite: itemWindowRect
// Overwrite: needsPageButtons
// Overwrite: createPageButtons
// Overwrite: user
// Override: showActorWindow (from Scene_ItemBase)
// Override: hideActorWindow (from Scene_ItemBase)
// Override: createBackground (from Scene_MenuBase)
// Override: createHelpWindow (from Scene_MenuBase)
// Override: helpWindowRect (from Scene_MenuBase)

Scene_Skill.prototype.calcStypeWindowHeight = function(numLines, selectable) {
    if (selectable) {
        return Window_SkillType.prototype.fittingHeight(numLines);
    } else {
        return Window_Base.prototype.fittingHeight(numLines);
    }
};

Scene_Skill.prototype.createSortWindow = function() {
	const rect = this.sortWindowRect();
	this._sortWindow = new Window_SortOptions(rect);
	this._sortWindow.setHandler("touch", this.processSort.bind(this));
	this._sortWindow.setHandler("one", this.sortByName.bind(this));
	this._sortWindow.setHandler("two", this.sortByID.bind(this));
	this._sortWindow.setHandler("three", this.sortByRank.bind(this));
	this._sortWindow.setHandler("four", this.sortByUsable.bind(this));
	this.addWindow(this._sortWindow);
};

Scene_Skill.prototype.sortWindowRect = function() {
	const params = TLB.Param.SKAUISM;
	const wx = params.skillmenu_sortwindow_x;
	const wy = params.skillmenu_sortwindow_y;
	const ww = params.skillmenu_sortwindow_width;
	const wh = params.skillmenu_sortwindow_height;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Skill.prototype.processSort = function() {
	switch(this._sortWindow.hitIndex()) {
		case 0: this.sortByName(); break;
		case 1: this.sortByID(); break;
		case 2: this.sortByRank(); break;
		case 3: this.sortByUsable(); break;
	}
};

Scene_Skill.prototype.executeSort = function(sortType) {
	$gameSystem.setSkillSort(sortType);
	this._itemWindow.refresh();
	this._sortWindow.refresh();
}

Scene_Skill.prototype.sortByName = function() {
	this.executeSort(1);
};

Scene_Skill.prototype.sortByID = function() {
	this.executeSort(2);
};

Scene_Skill.prototype.sortByRank = function() {
	this.executeSort(3);
};

Scene_Skill.prototype.sortByUsable = function() {
	this.executeSort(4);
};

Scene_Skill.prototype.create = function() {
	const params = TLB.Param.SKAUISM;
	Scene_ItemBase.prototype.create.call(this);
	const images = [params.skillmenu_statuswindow_bgimage, params.skillmenu_statuswindow_addonimage, params.skillmenu_statuswindow_qwimage, params.skillmenu_statuswindow_previmage_inactive, params.skillmenu_statuswindow_nextimage_inactive, params.skillmenu_statuswindow_previmage_active, params.skillmenu_statuswindow_nextimage_active, params.skillmenu_skillwindow_bgimage, params.skillmenu_skillwindow_dailyimage_full, params.skillmenu_skillwindow_dailyimage_empty, params.skillmenu_helpwindow_bgimage, params.skillmenu_sortwindow_bgimage, params.skillmenu_sortwindow_cursorimage];
	TLB.SKAUIBase.loadImages(images);
	this.createBackground();
	this.updateActor();
	this.createWindowLayer();
	this.createSortWindow();
	this.createSkillTypeWindow();
	this.createStatusWindow();
	this.createItemWindow();
	this.createHelpWindow();
	this._dimmerSprite = new Sprite();
	let image = TLB.Param.SKAUIB.dimmer_image;
	this._dimmerSprite.bitmap = ImageManager.loadMenu(image);
	this._dimmerSprite.opacity = 220;
	this._dimmerSprite.visible = false;
	this.addChild(this._dimmerSprite);
	this.createButtons();
	this.createActorWindow();
	this._sortWindow.x = this._statusWindow.x + this._statusWindow.width + 3;
	this._sortWindow.y = this._statusWindow.y;
};

TLB.SKAUISkillMenu.Scene_Skill_commandSkill = Scene_Skill.prototype.commandSkill;
Scene_Skill.prototype.commandSkill = function () {
	TLB.SKAUISkillMenu.Scene_Skill_commandSkill.call(this);
	this._statusWindow._prevButton?.deactivate();
	this._statusWindow._nextButton?.deactivate();
};

TLB.SKAUISkillMenu.Scene_Skill_onItemCancel = Scene_Skill.prototype.onItemCancel;
Scene_Skill.prototype.onItemCancel = function() {
	const iWin = this._itemWindow;
	const first = iWin.topIndex();
	const numItems = Math.min(iWin._data.length, iWin.maxVisibleItems() - 2);
	this._actor._recordedSkills = this._actor._recordedSkills || [];
	for (let i = 0; i <= numItems; i++) {
		const item = iWin._data[i + first];
		if (item && !this._actor._recordedSkills.contains(item.id)) this._actor._recordedSkills.push(item.id);
	}
	TLB.SKAUISkillMenu.Scene_Skill_onItemCancel.call(this);
	this._statusWindow._prevButton?.activate();
	this._statusWindow._nextButton?.activate();
};

Scene_Skill.prototype.createSkillTypeWindow = function() {
    const rect = this.skillTypeWindowRect();
    this._skillTypeWindow = new Window_SkillType(rect);
    this._skillTypeWindow.setHandler("skill", this.commandSkill.bind(this));
    this._skillTypeWindow.setHandler("cancel", this.popScene.bind(this));
    this._skillTypeWindow.setHandler("pagedown", this.nextActor.bind(this));
    this._skillTypeWindow.setHandler("pageup", this.previousActor.bind(this));
    this.addWindow(this._skillTypeWindow);
};

Scene_Skill.prototype.skillTypeWindowRect = function() {
	const params = TLB.Param.SKAUISM;
	const wx = params.skillTypeWindowX;
    const wy = params.skillTypeWindowY;
    const ww = params.skillTypeWindowWidth;
	const wh = this.calcStypeWindowHeight(Math.max(...$gameParty.members().map(member => member.skillTypes().length)), true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Skill.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_SkillStatus(rect);
	this._statusWindow.setHandler("pageup", this.previousActor.bind(this));
	this._statusWindow.setHandler("pagedown", this.nextActor.bind(this));
    this.addWindow(this._statusWindow);
};

Scene_Skill.prototype.statusWindowRect = function() {
	const params = TLB.Param.SKAUISM;
	const wx = this._skillTypeWindow.x + this._skillTypeWindow.width + params.skillmenu_statuswindow_x_offset;
    const wy = this._skillTypeWindow.y;
    const ww = params.skillmenu_statuswindow_width;
    const wh = params.skillmenu_statuswindow_height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Skill.prototype.createItemWindow = function() {
	const rect = this.itemWindowRect();
	this._itemWindow = new Window_SKASkillList(rect);
	this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
	this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
	this.addChild(this._itemWindow);
	this._skillTypeWindow.setSkillWindow(this._itemWindow);
};

Scene_Skill.prototype.itemWindowRect = function() {
	const params = TLB.Param.SKAUISM;
	const wx = this._statusWindow.x + params.skillmenu_skillwindow_x_offset;
	const wy = this._statusWindow.y + this._statusWindow.height + params.skillmenu_skillwindow_y_offset;
	const ww = params.skillmenu_skillwindow_width;
	const wh = params.skillmenu_skillwindow_height;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Skill.prototype.needsPageButtons = function() {
	return $gameParty.size() > 1;
};

Scene_Skill.prototype.createPageButtons = function() {
	// This is handled by the status window, overwrite is just to stop the originals from being drawn.
}

Scene_Skill.prototype.user = function() {
	const memberId = Math.max(0, this._actorWindow.index());
	return $gameParty.members()[memberId];
};

Scene_Skill.prototype.showActorWindow = function() {
	this._actorWindow.refresh();
    this._actorWindow.show();
    this._actorWindow.activate();
	this._dimmerSprite.visible = true;
};

Scene_Skill.prototype.hideActorWindow = function() {
	this._actorWindow.setItem(null);
    this._actorWindow.hide();
    this._actorWindow.deactivate();
	this._dimmerSprite.visible = false;
};

Scene_Skill.prototype.createHelpWindow = function() {
	const rect = this.helpWindowRect();
	this._helpWindow = new Window_SKASkillHelp(rect);
	this.addWindow(this._helpWindow);
	this._skillTypeWindow.setHelpWindow(this._helpWindow);
	this._itemWindow.setHelpWindow(this._helpWindow);
};

Scene_Skill.prototype.helpWindowRect = function() {
	const params = TLB.Param.SKAUISM;
	const wx = this._itemWindow.x + params.skillmenu_helpwindow_x_offset;
	const wy = this._itemWindow.y + this._itemWindow.height + params.skillmenu_helpwindow_y_offset;
	const ww = params.skillmenu_helpwindow_width;
	const wh = params.skillmenu_helpwindow_height;
	return new Rectangle(wx, wy, ww, wh);
};
