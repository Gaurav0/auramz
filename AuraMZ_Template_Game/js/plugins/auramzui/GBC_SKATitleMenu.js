window.Imported = window.Imported || {};
window.Imported.GBC_SKATitleMenu = true;

window.GBC = window.GBC || {};
GBC.SKATitle = GBC.SKATitle || {};

/*:
 * @author coffeenahc
 *
 * @target MZ
 * @plugindesc This plugin modifies the title scene of the game. 
 * Commissioned work by coffeenahc for Star Knightness Aura.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
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
 * @param icon_links
 * @text Icon Links
 * @type struct<IconLinks>[]
 * @default ["{\"filename\":\"Title_Menu/TITLE_LINK_ITCH\",\"linkTo\":\"https://aura-dev.itch.io/star-knightess-aura\"}","{\"filename\":\"Title_Menu/TITLE_LINK_PATREON\",\"linkTo\":\"https://www.patreon.com/auragamedev\"}","{\"filename\":\"Title_Menu/TITLE_LINK_TWITTER\",\"linkTo\":\"https://twitter.com/AuraGamedev\"}","{\"filename\":\"Title_Menu/TITLE_LINK_STEAM\",\"linkTo\":\"https://store.steampowered.com/app/1827650/Star_Knightess_Aura/\"}"]
 *
 * @param display_icon_links
 * @text Display Icon Links
 * @type boolean
 * @default true 
 *
 * @param title_graphic
 * @text Title Graphic
 * @desc The title graphic to use.
 * @type file
 * @dir img/menu/
 * @default Title_Menu/TITLE_GRAPHIC
 * 
 * @param title_shadow
 * @text Title Shadow
 * @desc The image to use for the title shadow.
 * @type file
 * @dir img/menu/
 * @default Title_Menu/TITLE_SHADOW
 * 
 * @param title_logo
 * @text Title Logo
 * @desc The image to use for the title logo.
 * @type file
 * @dir img/menu/
 * @default Title_Menu/TITLE_LOGO
 * 
 * @param title_menu_frame
 * @text Title Menu Frame
 * @desc The image to use for the title menu frame.
 * @type file
 * @dir img/menu/
 * @default Title_Menu/TITLE_MENU_FRAME
 * 
 */
/*~struct~IconLinks:
 *
 * @param filename
 * @type file
 * @dir img/menu/
 * 
 * @param linkTo
 * @type string
 */

window.parameters = PluginManager.parameters('GBC_SKATitleMenu');
GBC.Param = GBC.Param || {};
GBC.Param.Title = GBC.Param.Title || {};

TLB.SKABase.parseParameters(parameters, GBC.Param.Title);

GBC.SKATitle.Scene_Title_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	this.updateSprites();
	GBC.SKATitle.Scene_Title_update.call(this);
};

Scene_Title.prototype.updateSprites = function() {
	if (this._gameLogoSprite) {
		this._gameLogoSprite.x = Graphics.width / 2 - (this._gameLogoSprite.width / 2);
		this._gameLogoSprite.y = Graphics.height - this._gameLogoSprite.height - 100;
	}

	if (this._menuFrame) {
		this._menuFrame.y = Graphics.boxHeight - 110;
	}

	if (this._linkSprites) {
		const x = Graphics.width;
		let y = 0;
		for (const linkSprite of this._linkSprites) {
			linkSprite.x = x - linkSprite.bitmap.width;
			linkSprite.y = y;
			y += linkSprite.bitmap.height;
		}
	}
};

Scene_Title.prototype.createBackground = function() {
	const params = GBC.Param.Title;
	let bg = $dataSystem.title1Name;
	this._backSprite1 = new Sprite(
		ImageManager.loadTitle1(bg)
	);
	this._backSprite2 = new Sprite(
		ImageManager.loadMenu(params.title_graphic)
	);

	const versionTxt = AuraMZ.gameVersion;
	this._versionTxt = new PIXI.Text(versionTxt, {
		fontSize: 15,
		fill: ['#e4bd79', '#b2925b'],
		dropShadow: true,
		dropShadowDistance: 2,
		dropShadowAngle: 90,
		dropShadowBlur: 2,
		strokeThickness: 1,
		fontFamily: "rmmz-windowcommand, " + $dataSystem.advanced.fallbackFonts
	});
	this._versionTxt.anchor.set(1, 0, 0.5);
	this._versionTxt.x = Graphics.width;
	this._versionTxt.y = Graphics.boxHeight - 15;

	this._backSprite3 = new Sprite(
		ImageManager.loadMenu(params.title_shadow)
	);

	this.addChild(this._backSprite1);
	this.addChild(this._backSprite2);
	this.addChild(this._backSprite3);
	this.addChild(this._versionTxt);
};

Scene_Title.prototype.createForeground = function() {
	const params = GBC.Param.Title;
	if (params.display_icon_links) {
		this.createLinkSprites();
	}

	this._gameLogoSprite = new Sprite(
		ImageManager.loadMenu(params.title_logo)
	);
	this.addChild(this._gameLogoSprite);

	this._menuFrame = new Sprite(
		ImageManager.loadMenu(params.title_menu_frame)
	);
	this._menuFrame.opacity = 0;
	this.addChild(this._menuFrame);
};

Scene_Title.prototype.createLinkSprites = function() {
	const buttons = GBC.Param.Title.icon_links;
	this._linkSprites = [];
	for (let button of buttons) {
		const buttonSprite = new Sprite_Clickable();
		buttonSprite.bitmap = ImageManager.loadMenu(button.filename);
		buttonSprite.onClick = () => {
			SoundManager.playCursor();
			if (Utils.isNwjs() && nw && nw.Shell) {
				nw.Shell.openExternal(button.linkTo.toString());
			} else {
				window.open(button.linkTo.toString());
			}
		};
		buttonSprite.update = function() {
			Sprite_Clickable.prototype.update.call(this);
			this.updateFrame();
		};
		buttonSprite.updateFrame = function() {
			this.opacity = this.isPressed() ? 150 : 255;
		};
		this.addChild(buttonSprite);
		this._linkSprites.push(buttonSprite);
	}
};

Scene_Title.prototype.adjustBackground = function() {
	this.scaleSprite(this._backSprite1);
	this.centerSprite(this._backSprite1);
	this.centerSprite(this._backSprite2);
};

Scene_Title.prototype.createCommandWindow = function() {
	const background = $dataSystem.titleCommandWindow.background;
	const rect = this.commandWindowRect();
	this._commandWindow = new Window_TitleCommand(rect);
	this._commandWindow.setParentScene(this);
	this._commandWindow.setBackgroundType(background);
	this._commandWindow.setHandler("newGame", this.commandNewGame.bind(this));
	this._commandWindow.setHandler("continue", this.commandContinue.bind(this));
	this._commandWindow.setHandler("options", this.commandOptions.bind(this));
	this._commandWindow.setHandler("exit", this.commandExit.bind(this));
	this.addWindow(this._commandWindow);
};

Scene_Title.prototype.commandWindowRect = function() {
	const ww = Graphics.boxWidth;
	const wh = this.calcWindowHeight(1, true);
	const wx = 50;
	const wy = Graphics.boxHeight - wh - 25;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Title.prototype.commandExit = function() {
	SceneManager.terminate();
}

//WINDOW TITLE COMMAND
Window_TitleCommand.prototype.setParentScene = function(parent) {
	this._parentScene = parent;
}

Window_TitleCommand.prototype.updateClose = function() {
	if (this._closing) {
		this._parentScene._menuFrame.opacity -= 32;
		this.openness -= 32;
		if (this.isClosed()) {
			this._closing = false;
		}
	}
};

Window_TitleCommand.prototype.updateOpen = function() {
	if (this._opening) {
		this._parentScene._menuFrame.opacity += 32;
		this.openness += 32;
		if (this.isOpen()) {
			this._opening = false;
		}
	}
};

GBC.Window_TitleCommand_itemRect = Window_TitleCommand.prototype.itemRect;
Window_TitleCommand.prototype.itemRect = function(index) {
	const rect = GBC.Window_TitleCommand_itemRect.call(this, index);
	rect.y += 3;

	if (this.maxItems() > 3) {
		if (index == 1) {
			rect.x += 12;
		} else if (index == 3) {
			rect.x -= 25;
			rect.width -= 50;
		}
	} else {
		rect.x -= 50;
	}

	return rect;
};

Window_TitleCommand.prototype.makeCommandList = function() {
	const continueEnabled = this.isContinueEnabled();
	this.addCommand("NEW GAME", "newGame");
	this.addCommand("CONTINUE", "continue", continueEnabled);
	this.addCommand("OPTIONS", "options");
	if (Utils.isNwjs()) {
		this.addCommand("EXIT", "exit");
	}
};

Window_TitleCommand.prototype.maxCols = Window_TitleCommand.prototype.maxItems;

Window_TitleCommand.prototype.drawItem = function(index) {
	const rect = this.itemRect(index);
	const activeGradient = ["#e7bf7a", "#886f45"];
	const inactiveGradient = ["#a295a5", "#8d7f90"];
	const disabledInactive = ["#595866", "#3b3846"];
	const disabledActive = ["#98826b", "#7b6955"];
	const options = {
		outlineThickness: 1,
		outlineGradient: ["#ffffff", "#000000"],
		dropShadow: true,
		dropShadowY: 2,
	};

	let gradient;
	if (this._hoveredIndex == index) {
		gradient = this.isCommandEnabled(index) ? activeGradient : disabledActive;
	} else {
		if (this.isCommandEnabled(index)) {
			gradient = inactiveGradient;
			options.outlineGradient = ["#828189", "#000000"];
		} else {
			gradient = disabledInactive;
		}
	}

	this.drawGradientText(this.commandName(index), gradient, rect.x, rect.y, rect.width, "center", options);
};

Window_TitleCommand.prototype.select = function(index) {
	this._hoveredIndex = index;
	this._index = index;
	this.refresh();
	this.callUpdateHelp();
};

Window_TitleCommand.prototype.drawItemBackground = function(index) { };

Window_TitleCommand.prototype.resetFontSettings = function() {
	this.contents.fontFace = 'franklin-gothic-demi-cond';
	this.contents.fontSize = 36;
	this.resetTextColor();
};

Window_TitleCommand.prototype._refreshAllParts = function() {
	this._refreshCursor();
	this._refreshArrows();
	this._refreshPauseSign();
};