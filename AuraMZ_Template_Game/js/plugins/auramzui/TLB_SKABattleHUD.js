// Trilobytes - Star Knightess Aura Battle HUD
// TLB_SKABattleHUD.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKABattleHUD = true;

window.TLB = TLB || {};
TLB.SKABattleHUD = TLB.SKABattleHUD || {};

/*:
 * @target MZ
 * @plugindesc This plugin modifies the battle scene of Star Knightess
 * Aura to reflect the HUD prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the current Scene_Battle to match a
 * prototype specified by the client.
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
 * ============================================================================
 *
 * @param y_offset
 * @text Battler Y Offset
 * @desc The amount by which to lower the battlers on the battle screen.
 * @type number
 * @min -720
 * @max 720
 * @default 105
 *
 * @param helpWindow
 * @text Help Window
 *
 * @param helpWindowX
 * @parent helpWindow
 * @text X
 * @desc X coordinate of the help window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -60
 *
 * @param helpWindowYOffset
 * @parent helpWindow
 * @text Y Offset
 * @desc Y offset from the help area top.
 * @type number
 * @min -9999
 * @max 9999
 * @default -3
 *
 * @param helpWindowWidthIncrease
 * @parent helpWindow
 * @text Width Increase
 * @desc How much larger than the screen the width of the rect should be.
 * @type number
 * @default 60
 *
 * @param helpWindowHeightIncrease
 * @parent helpWindow
 * @text Height Increase
 * @desc How much larger than the help area height the height of the rect should be.
 * @type number
 * @default 10
 *
 * @param logWindow
 * @text Log Window
 *
 * @param logWindowX
 * @parent logWindow
 * @text X
 * @desc X coordinate of the log window rect.
 * @type number
 * @default 0
 *
 * @param logWindowY
 * @parent logWindow
 * @text Y
 * @desc Y coordinate of the log window rect.
 * @type number
 * @min -9999
 * @max 9999
 * @default -4
 *
 * @param logWindowLines
 * @parent logWindow
 * @text Max Lines
 * @desc The number of lines the window height supports.
 * @type number
 * @default 10
 *
 * @param actorCommandWindow
 * @text Actor Command Window
 *
 * @param actorCommandWindowWidth
 * @parent actorCommandWindow
 * @text Width
 * @desc Width of the actor command window rect.
 * @type number
 * @default 323
 *
 * @param actorCommandWindowHeight
 * @parent actorCommandWindow
 * @text Height
 * @desc Height of the actor command window rect.
 * @type number
 * @default 323
 *
 * @param battlerWindow
 * @text Battler Window
 *
 * @param battlerWindowXOffset
 * @parent battlerWindow
 * @text X Offset
 * @desc X offset from the left of the status window.
 * @type number
 * @default 399
 *
 * @param battlerWindowYOffset
 * @parent battlerWindow
 * @text Y Offset
 * @desc Y offset from the bottom of the screen.
 * @type number
 * @min -9999
 * @max 9999
 * @default -8
 *
 * @param battlerWindowWidth
 * @parent battlerWindow
 * @text Width
 * @desc Width of the battler window rect.
 * @type number
 * @default 425
 *
 * @param battlerWindowHeight
 * @parent battlerWindow
 * @text Height
 * @desc Height of the battler window rect.
 * @type number
 * @default 556
 *
 * @param skillWindow
 * @text Skill Window
 *
 * @param skillWindowXOffset
 * @parent skillWindow
 * @text X Offset
 * @desc X offset from the left of the status window.
 * @type number
 * @default 399
 *
 * @param skillWindowYOffset
 * @parent skillWindow
 * @text Y Offset
 * @desc Y offset from the bottom of the screen.
 * @type number
 * @min -9999
 * @max 9999
 * @default -8
 *
 * @param skillWindowWidth
 * @parent skillWindow
 * @text Width
 * @desc Width of the skill window rect.
 * @type number
 * @default 425
 *
 * @param skillWindowHeight
 * @parent skillWindow
 * @text Height
 * @desc Height of the skill window rect.
 * @type number
 * @default 579
 *
 * @param hudWindow
 * @text HUD Window
 *
 * @param hudWindowXOffset
 * @parent hudWindow
 * @text X Offset
 * @desc X offset from the right of the screen.
 * @type number
 * @default 17
 *
 * @param hudWindowY
 * @parent hudWindow
 * @text Y
 * @desc Y coordinate of the HUD window rect.
 * @type number
 * @default 0
 *
 * @param hudWindowWidth
 * @parent hudWindow
 * @text Width
 * @desc Width of the HUD window rect.
 * @type number
 * @default 360
 *
 * @param battlehud_hudwindow_leader
 * @text Leader Settings
 *
 * @param battlehud_hudwindow_leader_innermostframe
 * @parent battlehud_hudwindow_leader
 * @text Leader Innermost Frame Image
 * @desc The image to use for the leader's innermost frame.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_LEADER_INNERMOST_FRAME
 *
 * @param battlehud_hudwindow_leader_innerframe
 * @parent battlehud_hudwindow_leader
 * @text Leader Inner Frame Image
 * @desc The image to use for the leader's inner frame.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_LEADER_INNER_FRAME
 *
 * @param battlehud_hudwindow_leader_overlay
 * @parent battlehud_hudwindow_leader
 * @text Leader Overlay Image
 * @desc The image to use for the leader's overlay.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_LEADER_OVERLAY
 *
 * @param battlehud_hudwindow_leader_outerframe
 * @parent battlehud_hudwindow_leader
 * @text Leader Outer Frame Image
 * @desc The image to use for the leader's outer frame.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_LEADER_OUTER_FRAME
 *
 * @param battlehud_hudwindow_leader_corruptionicon
 * @parent battlehud_hudwindow_leader
 * @text Corruption Icon
 * @desc The image to use for the corruption icon.
 * @type file
 * @dir img/menu
 * @default Battle_HUD/BATTLE_HUD_CORRUPTION_ICON
 *
 * @param battlehud_hudwindow_leader_lewdnessicon
 * @parent battlehud_hudwindow_leader
 * @text Lewdness Icon
 * @desc The image to use for the lewdness icon.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_LEWDNESS_ICON
 *
 * @param battlehud_hudwindow_leader_viceicon
 * @parent battlehud_hudwindow_leader
 * @text Vice Icon
 * @desc The image to use for the vice icon.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_VICE_ICON
 *
 * @param battlehud_settings
 * @text Settings
 * @type struct<layoutsettings>
 * @default {"background":"Battle_HUD/BATTLE_HUD_OVERLAY","partyframes":"","party_innermostframe":"Battle_HUD/BATTLE_HUD_PARTY_MEMBER_INNERMOST_FRAME","party_innerframe":"Battle_HUD/BATTLE_HUD_PARTY_MEMBER_INNER_FRAME","party_overlay":"Battle_HUD/BATTLE_HUD_PARTY_MEMBER_OVERLAY","party_outerframe":"Battle_HUD/BATTLE_HUD_PARTY_MEMBER_OUTER_FRAME","slot1position":"{\"x\":\"115\",\"y\":\"191\"}","slot2position":"{\"x\":\"115\",\"y\":\"323\"}","slot3position":"{\"x\":\"115\",\"y\":\"455\"}"}
 *
 * @param backarrow_image
 * @text Back Arrow Image
 * @desc Image to use for the back arrow.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_BACK_ARROW
 *
 * @param prevarrow_image
 * @text Prev Arrow Image
 * @desc Image to use for the prev arrow.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_PREV_ACTION_ARROW
 *
 * @param nextarrow_image
 * @text Next Arrow Image
 * @desc Image to use for the next arrow.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_NEXT_ACTION_ARROW
 *
 * @param topstripe
 * @text Top Stripe
 * @desc Image to use for the top of the item and skill windows.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/STRIPE_TOP
 *
 * @param img_actionswap
 * @text Action swap
 * @desc Image to use for the bottom of the item and skill windows.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_ACTION_SWAP
 *
 * @param evenstripe
 * @text Even Stripe
 * @desc Image to use for even-numbered stripes in the item and skill windows.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/STRIPE_B
 *
 * @param oddstripe
 * @text Odd Stripe
 * @desc Image to use for odd-numbered stripes in the item and skill windows.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/STRIPE_A
 *
 * @param log_evenstripe
 * @text Even Log Stripe
 * @desc Image to use for even-numbered stripes in the log and help windows.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/LOGSTRIPE_A
 *
 * @param log_oddstripe
 * @text Odd Log Stripe
 * @desc Image to use for odd-numbered stripes in the log and help windows.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/LOGSTRIPE_B
 *
 * @param back_select
 * @text Back Selection Image
 * @desc Image to use when highlighting the back section on a window.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_BACK_SELECT
 *
 * @param enemywindow
 * @text Enemy Window
 *
 * @param enemywindow_background
 * @parent enemywindow
 * @text Background
 * @desc The image to use for the background in the enemy window.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_ENEMY_SELECT_BG
 *
 * @param enemywindow_selection_image
 * @parent enemywindow
 * @text Selection Image
 * @desc The image to use for the selection cursor.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_SELECT
 *
 * @param actorwindow
 * @text Actor Window
 *
 * @param actorwindow_background
 * @parent actorwindow
 * @text Background
 * @desc The image to use for the background in the actor window.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_PARTY_SELECT_BG
 *
 * @param commands
 * @text Commands
 *
 * @param commands_activeimage
 * @parent commands
 * @text Active Image
 * @desc The image to use for an active command.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_COMMAND_ACTIVE_BLANK
 *
 * @param commands_normalimage
 * @parent commands
 * @text Disabled Image
 * @desc The image to use for an enabled or disabled command.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_COMMAND_ENABLED_BLANK
 *
 * @param commands_centerimage
 * @parent commands
 * @text Center Image
 * @desc The image to use for the command in the center.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_COMMAND_CENTER_EMPTY
 *
 * @param commands_normalhover
 * @parent commands
 * @text Hovered Image
 * @desc The image to use when hovering over a hex.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_COMMAND_SELECTED_BLANK
 *
 * @param commands_centerhover
 * @parent commands
 * @text Center Hovered Image
 * @desc The image to use when hovering over the center hex.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_COMMAND_CENTER_SELECTED_BLANK
 *
 * @param commands_activeopacity
 * @parent commands
 * @text Active Opacity
 * @desc Opacity of active commands.
 * @default 255
 * @max 255
 *
 * @param commands_normalopacity
 * @parent commands
 * @text Normal Opacity
 * @desc Opacity of normal commands.
 * @default 204
 * @max 255
 *
 * @param commands_disabledopacity
 * @parent commands
 * @text Disabled Opacity
 * @desc Opacity of disabled commands.
 * @default 153
 * @max 255
 *
 * @param commands_topleft
 * @parent commands
 * @text Top Left Hex
 * @desc Settings for top left hex.
 * @type struct<command>
 * @default {"text":"MAGIC","symbol":"skill","buttonName":"pageup","stypeid":"1","hexposition":"{\"x\":\"12\",\"y\":\"63\"}","commandy":"30","icon":"Battle_HUD/BATTLE_HUD_BUTTON_PAGEDOWN","icony":"30"}
 *
 * @param commands_top
 * @parent commands
 * @text Top Hex
 * @desc Settings for top hex.
 * @type struct<command>
 * @default {"text":"SPECIAL","symbol":"skill","buttonName":"up","stypeid":"3","hexposition":"{\"x\":\"102\",\"y\":\"12\"}","commandy":"30","icon":"Battle_HUD/BATTLE_HUD_BUTTON_UP","icony":"28"}
 *
 * @param commands_topright
 * @parent commands
 * @text Top Right Hex
 * @desc Settings for top right hex.
 * @type struct<command>
 * @default {"text":"MARTIAL","symbol":"skill","buttonName":"pagedown","stypeid":"2","hexposition":"{\"x\":\"192\",\"y\":\"63\"}","commandy":"30","icon":"Battle_HUD/BATTLE_HUD_BUTTON_PAGEUP","icony":"30"}
 *
 * @param commands_center
 * @parent commands
 * @text Center Hex
 * @desc Settings for center hex.
 * @type struct<command>
 * @default {"text":"BACK","symbol":"cancel","buttonName":"escape","stypeid":"","hexposition":"{\"x\":\"102\",\"y\":\"117\"}","commandy":"-3","icon":"Battle_HUD/BATTLE_HUD_BUTTON_CANCEL","icony":"-3"}
 *
 * @param commands_bottomleft
 * @parent commands
 * @text Bottom Left Hex
 * @desc Settings for bottom left hex.
 * @type struct<command>
 * @default {"text":"ATTACK","symbol":"attack","buttonName":"left","stypeid":"","hexposition":"{\"x\":\"12\",\"y\":\"168\"}","commandy":"30","icon":"Battle_HUD/BATTLE_HUD_BUTTON_LEFT","icony":"30"}
 *
 * @param commands_bottom
 * @parent commands
 * @text Bottom Hex
 * @desc Settings for bottom hex.
 * @type struct<command>
 * @default {"text":"ITEM","symbol":"item","buttonName":"down","stypeid":"","hexposition":"{\"x\":\"102\",\"y\":\"222\"}","commandy":"30","icon":"Battle_HUD/BATTLE_HUD_BUTTON_DOWN","icony":"30"}
 *
 * @param commands_bottomright
 * @parent commands
 * @text Bottom Right Hex
 * @desc Settings for bottom right hex.
 * @type struct<command>
 * @default {"text":"GUARD","symbol":"guard","buttonName":"right","stypeid":"","hexposition":"{\"x\":\"192\",\"y\":\"168\"}","commandy":"30","icon":"Battle_HUD/BATTLE_HUD_BUTTON_RIGHT","icony":"30"}
 *
 */
/*~struct~layoutsettings:
 *
 * @param background
 * @text Background
 * @type file
 * @dir img/menu/
 *
 * @param partyframes
 * @text Party Frames
 *
 * @param party_innermostframe
 * @parent partyframes
 * @text Innermost Frame
 * @desc The image to use for a party member's innermost frame.
 * @type file
 * @dir img/menu/
 *
 * @param party_innerframe
 * @parent partyframes
 * @text Inner Frame
 * @desc The image to use for a party member's inner frame.
 * @type file
 * @dir img/menu/
 *
 * @param party_overlay
 * @parent partyframes
 * @text Overlay
 * @desc The image to use for a party member's overlay.
 * @type file
 * @dir img/menu/
 *
 * @param party_outerframe
 * @parent partyframes
 * @text Outer Frame
 * @desc The image to use for a party member's outer frame.
 * @type file
 * @dir img/menu/
 *
 * @param slot1position
 * @text Slot 1 Position
 * @type struct<coordinate>
 *
 * @param slot2position
 * @text Slot 2 Position
 * @type struct<coordinate>
 *
 * @param slot3position
 * @text Slot 3 Position
 * @type struct<coordinate>
 *
 */
/*~struct~coordinate:
 *
 * @param x
 * @type number
 * @default 0
 *
 * @param y
 * @type number
 * @default 0
 *
 */
/*~struct~command:
 *
 * @param text
 * @text Text
 * @desc The text for the command.
 *
 * @param symbol
 * @text Symbol
 * @desc The symbol the command represents.
 *
 * @param buttonName
 * @text Button Name
 * @desc The name of the button that maps to the hex.
 *
 * @param stypeid
 * @text Skill Type ID
 * @desc The skill type ID (only applicable to skill types)
 *
 * @param hexposition
 * @text Hex Position
 * @desc The position of the hex in the command window.
 * @type struct<coordinate>
 *
 * @param commandy
 * @text Command Y
 * @desc The Y position of the command in the hex.
 * @type number
 *
 * @param icon
 * @text Icon
 * @desc The icon to display for the command.
 * @type file
 * @dir img/menu/
 *
 * @param icony
 * @text Icon Y
 * @desc The Y position of the icon in the hex.
 * @type number
 *
 */

window.parameters = PluginManager.parameters('TLB_SKABattleHUD');
TLB.Param = TLB.Param || {};
TLB.Param.SKABH = TLB.Param.SKABH || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKABH);

TLB.SKABattleHUD.displayImage = function(image, x, y, dest, errorMsg) {
	TLB.SKAUIBase.displayImage(image, x, y, dest, "TLB_SKABattleHUD", errorMsg);
}

TLB.SKABattleHUD.preloadFaces = function(actorList) {
	for (const actor of actorList) {
		ImageManager.loadFace(actor.faceName());
	}
};

TLB.SKABattleHUD.Game_Actor_initialize = Game_Actor.prototype.initialize;
Game_Actor.prototype.initialize = function(actorId) {
	TLB.SKABattleHUD.Game_Actor_initialize.call(this, actorId);
	this._skillUses = {};
};

TLB.SKABattleHUD.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
	TLB.SKABattleHUD.Game_Party_initialize.call(this);
	this._itemUses = {};
};

TLB.SKABattleHUD.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	TLB.SKABattleHUD.Game_Enemy_setup.call(this, enemyId, x, y + TLB.Param.SKABH.y_offset);
};

TLB.SKABattleHUD.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
	if (this._subject?.isActor()) {
		let uses;
		if (this._action.isSkill()) {
			this._subject._skillUses = this._subject._skillUses || {};
			uses = this._subject._skillUses;
		} else if (this._action.isItem()) {
			$gameParty._itemUses = $gameParty._itemUses || {};
			uses = $gameParty._itemUses;
		}
		uses[this._action.item().id] = uses[this._action.item().id] + 1 || 1;
	}
	TLB.SKABattleHUD.BattleManager_endAction.call(this);
};

TLB.SKABattleHUD.Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function() {
	TLB.SKABattleHUD.Scene_Boot_loadGameFonts.call(this);
	FontManager.load('good-times', 'good times rg.otf');
};

TLB.SKABattleHUD.Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
	const params = TLB.Param.SKABH;
	TLB.SKABattleHUD.Scene_Battle_createDisplayObjects.call(this);
	this._bgSprite = new Sprite();
	const image = params.battlehud_settings.background;
	if (image) {
		const bitmap = ImageManager.loadMenu(image);
		this._bgSprite.bitmap = bitmap;
		bitmap.addLoadListener(() => this._bgSprite.x = Graphics.width - this._bgSprite.width);
	} else {
		TLB.SKABase.displayError("TLB_SKABattleHUD", "HUD background parameter not set.");
	}
	this.addChildAt(this._bgSprite, 1);
};

TLB.SKABattleHUD.Scene_Battle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
	const params = TLB.Param.SKABH;
	TLB.SKABattleHUD.Scene_Battle_create.call(this);
	const images = [
		params.battlehud_hudwindow_leader_innermostframe,
		params.battlehud_hudwindow_leader_innerframe,
		params.battlehud_hudwindow_leader_overlay,
		params.battlehud_hudwindow_leader_outerframe,
		params.battlehud_hudwindow_leader_corruptionicon,
		params.battlehud_hudwindow_leader_lewdnessicon,
		params.battlehud_hudwindow_leader_viceicon,
		params.battlehud_settings.background,
		params.battlehud_settings.party_innermostframe,
		params.battlehud_settings.party_innerframe,
		params.battlehud_settings.party_overlay,
		params.battlehud_settings.party_outerframe,
		params.backarrow_image,
		params.prevarrow_image,
		params.nextarrow_image,
		params.topstripe,
		params.img_actionswap,
		params.evenstripe,
		params.oddstripe,
		params.log_evenstripe,
		params.log_oddstripe,
		params.enemywindow_background,
		params.enemywindow_selection_image,
		params.actorwindow_background,
		params.commands_activeimage,
		params.commands_normalimage,
		params.commands_centerimage,
		params.commands_topleft.icon,
		params.commands_top.icon,
		params.commands_topright.icon,
		params.commands_center.icon,
		params.commands_bottomleft.icon,
		params.commands_bottom.icon,
		params.commands_bottomright.icon
	];
	for (const image of images) {
		ImageManager.loadMenu(image);
	}
};

TLB.SKABattleHUD.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	TLB.SKABattleHUD.Scene_Battle_createAllWindows.call(this);
	this.createHUDWindow();
	this._statusWindow.alpha = 0;
	this._actorCommandWindow.opacity = 0;
};

Scene_Battle.prototype.createHelpWindow = function() {
	const rect = this.helpWindowRect();
	this._helpWindow = new Window_BattleHelp(rect);
	this._helpWindow.hide();
	this.addWindow(this._helpWindow);
};

Scene_Battle.prototype.helpWindowRect = function() {
	const params = TLB.Param.SKABH;
	const wx = params.helpWindowX;
	const wy = this.helpAreaTop() + params.helpWindowYOffset;
	const ww = Graphics.boxWidth + params.helpWindowWidthIncrease;
	const wh = this.helpAreaHeight() + params.helpWindowHeightIncrease;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.logWindowRect = function() {
	const params = TLB.Param.SKABH;
	const wx = params.logWindowX;
	const wy = params.logWindowY;
	const ww = Graphics.boxWidth;
	const wh = this.calcWindowHeight(params.logWindowLines, false);
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createActorCommandWindow = function() {
	const rect = this.actorCommandWindowRect();
	const commandWindow = new Window_ActorCommand(rect);
	commandWindow.y = Graphics.boxHeight - commandWindow.height;
	commandWindow.setHandler("attack", this.commandAttack.bind(this));
	commandWindow.setHandler("skill", this.commandSkill.bind(this));
	commandWindow.setHandler("guard", this.commandGuard.bind(this));
	commandWindow.setHandler("item", this.commandItem.bind(this));
	commandWindow.setHandler("cancel", this.commandCancel.bind(this));
	commandWindow.setHandler("up", this.processHex.bind(this));
	commandWindow.setHandler("down", this.processHex.bind(this));
	commandWindow.setHandler("left", this.processHex.bind(this));
	commandWindow.setHandler("right", this.processHex.bind(this));
	commandWindow.setHandler("pagedown", this.processHex.bind(this));
	commandWindow.setHandler("pageup", this.processHex.bind(this));
	this.addWindow(commandWindow);
	this._actorCommandWindow = commandWindow;
};

Scene_Battle.prototype.processHex = function() {
	// Handled by window, just need a handler function
};
Scene_Battle.prototype.actorCommandWindowRect = function() {
	const params = TLB.Param.SKABH;
	const ww = params.actorCommandWindowWidth;
	const wh = params.actorCommandWindowHeight;
	const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.battlerWindowRect = function() {
	const params = TLB.Param.SKABH;
	const wx = this._statusWindow.x + params.battlerWindowXOffset;
	const ww = params.battlerWindowWidth;
	const wh = params.battlerWindowHeight;
	const wy = Graphics.boxHeight - wh + params.battlerWindowYOffset;
	return new Rectangle(wx, wy, ww, wh);
};


Scene_Battle.prototype.actorWindowRect = function() {
	return this.battlerWindowRect();
}

Scene_Battle.prototype.enemyWindowRect = function() {
	return this.battlerWindowRect();
};

Scene_Battle.prototype.skillWindowRect = function() {
	const params = TLB.Param.SKABH;
	const wx = this._statusWindow.x + params.skillWindowXOffset;
	const ww = params.skillWindowWidth;
	const wh = params.skillWindowHeight;
	const wy = Graphics.boxHeight - wh + params.skillWindowYOffset;
	return new Rectangle(wx, wy, ww, wh);
};

TLB.SKABattleHUD.Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
	TLB.SKABattleHUD.Scene_Battle_startActorCommandSelection.call(this);
	const index = BattleManager.actor().index();
	const sprite = this._spriteset._actorSprites[index];
	if (sprite.x === sprite._homeX) {
		this._actorCommandWindow.x = sprite.x - this._actorCommandWindow.width / 2 - 50;
		this._actorCommandWindow.y = sprite.y - this._actorCommandWindow.height / 2 - 70;
	}
	this._actorCommandWindow.setup(BattleManager.actor());
};

Scene_Battle.prototype.onSelectAction = function() {
	const action = BattleManager.inputtingAction();
	if (!action.needsSelection()) {
		this.selectNextCommand();
	} else if (action.isForOpponent()) {
		this._actorCommandWindow.hide();
		this.startEnemySelection();
	} else {
		this._actorCommandWindow.hide();
		this.startActorSelection();
	}
};

TLB.SKABattleHUD.Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
Scene_Battle.prototype.startEnemySelection = function() {
	TLB.SKABattleHUD.Scene_Battle_startEnemySelection.call(this);
	this._skillWindow.hide();
};

TLB.SKABattleHUD.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
	TLB.SKABattleHUD.Scene_Battle_onEnemyCancel.call(this);
	this._enemyWindow.deactivate();
	this._enemyWindow.select(-1);
	this._enemyWindow.hide();
	if (this._actorCommandWindow.currentSymbol() === "attack") this._actorCommandWindow.show();
};

Scene_Battle.prototype.createHUDWindow = function() {
	const rect = this.hudWindowRect();
	this._hudWindow = new Window_BattleHUD(rect);
	this.addChild(this._hudWindow);
}

Scene_Battle.prototype.hudWindowRect = function() {
	const params = TLB.Param.SKABH;
	const ww = params.hudWindowWidth;
	const wh = Graphics.height;
	const wx = Graphics.width - ww + params.hudWindowXOffset;
	const wy = params.hudWindowY;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createCancelButton = function() {
	//
};

Scene_Battle.prototype.selectNextCommand = function() {
	if (this._actorCommandWindow._actor && ConfigManager.commandRemember) {
		this._actorCommandWindow._actor.setLastCommandSymbol(this._actorCommandWindow.currentSymbol());
	}
	BattleManager.selectNextCommand();
	this.changeInputWindow();
};

Sprite_Actor.prototype.setActorHome = function(index) {
	this.setHome(600 + index * 32, 280 + TLB.Param.SKABH.y_offset + index * 48);
};

TLB.SKABattleHUD.Sprite_StateIcon_setup = Sprite_StateIcon.prototype.setup;
Sprite_StateIcon.prototype.setup = function(battler) {
	TLB.SKABattleHUD.Sprite_StateIcon_setup.call(this, battler);
	if (SceneManager._scene instanceof Scene_Battle && !this._durationLayer) {
		this._durationLayer = new Sprite();
		this._durationLayer.bitmap = new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight);
		this._durationLayer.position.set(-16, -12);
		this._durationLayer.bitmap.fontFace = 'franklin-gothic-demi';
		this._durationLayer.bitmap.bold = true;
		this._durationLayer.bitmap.fontSize = 18;
		this._drawDuration = false;
		this.addChild(this._durationLayer);
	}
};

TLB.SKABattleHUD.Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
Sprite_StateIcon.prototype.update = function() {
	TLB.SKABattleHUD.Sprite_StateIcon_update.call(this);
	if (this._durationLayer) this._durationLayer.bitmap.clear();
	if (this._drawDuration && this._durationLayer && this._battler.allIcons().length > this._animationIndex) {
		const battler = this._battler;
		const numStates = battler.stateIcons().length;
		const width = 32;
		const height = 24;
		const align = "center";
		if (numStates > this._animationIndex) {
			const state = battler.states().filter(state => state.iconIndex)[this._animationIndex];
			if (state.autoRemovalTiming > 0) {
				const turns = battler._stateTurns[state.id];
				this._durationLayer.bitmap.drawText(turns, 0, 0, width, height, align);
			}
		} else if (battler.buffIcons().length > this._animationIndex - numStates) {
			const turns = battler._buffTurns.filter((buff, index) => battler._buffs[index] !== 0)[this._animationIndex - numStates];
			this._durationLayer.bitmap.drawText(turns + 1, 0, 0, width, height, align);
		}
	}
};

TLB.SKABattleHUD.Sprite_StateIcon_updateIcon = Sprite_StateIcon.prototype.updateIcon;
Sprite_StateIcon.prototype.updateIcon = function() {
	if (this._iconId < this._battler.allIcons().length) {
		TLB.SKABattleHUD.Sprite_StateIcon_updateIcon.call(this);
	} else {
		this._animationIndex = 0;
		this._iconIndex = 0;
	}
};

TLB.SKABattleHUD.Sprite_StateIcon_updateFrame = Sprite_StateIcon.prototype.updateFrame;
Sprite_StateIcon.prototype.updateFrame = function() {
	TLB.SKABattleHUD.Sprite_StateIcon_updateFrame.call(this);
	if (this._iconIndex) this._drawDuration = true;
};

class Window_BattleHelp extends Window_Help {
	constructor(rect) {
		super(rect);
		this.opacity = 0;
	}

	_createAllParts() {
		this.createSprites();
		Window.prototype._createAllParts.call(this);
	}

	createSprites() {
		this._backSprite1 = new Sprite();
		let image = TLB.Param.SKABH.log_evenstripe;
		let bitmap = ImageManager.loadMenu(image);
		this._backSprite1.bitmap = bitmap;
		this._backSprite1.y = 11;
		this.addChild(this._backSprite1);
		this._backSprite2 = new Sprite();
		image = TLB.Param.SKABH.log_oddstripe;
		bitmap = ImageManager.loadMenu(image);
		this._backSprite2.bitmap = bitmap;
		this._backSprite2.y = 55;
		this.addChild(this._backSprite2);
	}

	processDrawIcon(iconIndex, textState) {
		if (textState.drawing) {
			this.drawIcon(iconIndex, textState.x + 2, textState.y + 6);
		}
		textState.x += ImageManager.iconWidth + 4;
	}

	lineHeight() {
		return 42;
	}

	refresh() {
		const rect = this.baseTextRect();
		this.contents.clear();
		this.drawTextEx(this._text, rect.x + 82, rect.y, rect.width);
		if (this._text.split("\n").filter(line => line.length > 0).length === 1) this._backSprite2.hide();
		else this._backSprite2.show();
	};
}

TLB.SKABattleHUD.Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function(rect) {
	TLB.SKABattleHUD.Window_ActorCommand_initialize.call(this, rect);
	const params = this._params = TLB.Param.SKABH;
	this._commandDataList = [params.commands_topleft, params.commands_top, params.commands_topright, params.commands_center, params.commands_bottomleft, params.commands_bottom, params.commands_bottomright];
};

Window_ActorCommand.prototype.processOk = function() {
	let hex = this.getIndexOfFocusedHex();
	let symbol;
	if (hex > -1) {
		const commandData = this.getCommandData(hex);
		const stypeId = commandData.stypeid;
		symbol = commandData.symbol;
		const command = this.findCommand(stypeId, symbol);
		this.select(command);
	} else if (this._actor?.lastCommandSymbol()) {
		symbol = this._actor.lastCommandSymbol();
		this.selectSymbol(symbol);
		if (symbol === "skill") {
			const skill = this._actor.lastBattleSkill();
			if (skill) {
				this.selectExt(skill.stypeId);
			}
		}
	} else {
		this.select(0);
	}
	Window_Command.prototype.processOk.call(this);
};

Window_ActorCommand.prototype.findCommand = function(stypeId, symbol) {
	if (stypeId) {
		return this._list.findIndex(cmd => cmd.symbol === symbol && cmd.ext === stypeId);
	} else {
		return this._list.findIndex(cmd => cmd.symbol === symbol);
	}
};

Window_ActorCommand.prototype.drawAllItems = function() {
	this.children = [];
	this._hexes = [];
	const params = TLB.Param.SKABH;
	const normalImage = params.commands_normalimage;
	this.drawHex(normalImage, params.commands_topleft);
	this.drawHex(normalImage, params.commands_top);
	this.drawHex(normalImage, params.commands_topright);
	this.drawHex(TLB.Param.SKABH.commands_centerimage, params.commands_center);
	this.drawHex(normalImage, params.commands_bottomleft);
	this.drawHex(normalImage, params.commands_bottom);
	this.drawHex(normalImage, params.commands_bottomright);
};

Window_ActorCommand.prototype.processCursorMove = function() {
	if (this.isCursorMovable()) {
		if (Input.isRepeated("skill")) {  // L
			this.cursorRight();
		}
		if (Input.isRepeated("quest")) {  // J
			this.cursorLeft();
		}
	}
};

Window_ActorCommand.prototype.processHandling = function() {
	if (this.isOpenAndActive()) {
		if (this.isOkEnabled() && this.isOkTriggered()) {
			return this.processOk();
		}
		if (this.isCancelEnabled() && this.isCancelTriggered()) {
			return this.processCancel();
		}
		const buttons = ["pagedown", "pageup", "up", "down", "left", "right"];
		for (const button of buttons) {
			this.checkButton(button);
		}
	}
};

Window_ActorCommand.prototype.checkButton = function(buttonName) {
	if (this.isHandled(buttonName) && Input.isRepeated(buttonName)) {
		return this.processHex(buttonName);
	}
};


Window_ActorCommand.prototype.processTouch = function() {
	if (this.isOpenAndActive()) {
		if (TouchInput.isCancelled()) {
			this.onTouchCancel();
		}
	}
};

Window_ActorCommand.prototype.isHexEnabled = function(commandData) {
	const actor = this._actor;
	let enabled = this._list.some(cmd => cmd.name.toLowerCase() === commandData.text.toLowerCase()) || commandData.text === "BACK";
	const skills = (actor?.skills() || []).filter(item => (item.occasion != 2 || item.enhance) && item.occasion != 3 && item.stypeId === commandData.stypeid);
	const skillType = commandData.stypeid;
	if (skillType) enabled = actor?.skillTypes().includes(skillType) && !actor?.isSkillTypeSealed(skillType) && skills.length > 0;
	if ((commandData.symbol === "attack" && !actor?.canAttack()) || (commandData.symbol === "guard" && !actor?.canGuard())) enabled = false;
	if (commandData.symbol === "item" && ($gameParty.allItems().length === 0 || actor?.isItemsSealed())) enabled = false;
	return enabled;
};

Window_ActorCommand.prototype.processHex = function(buttonName) {
	this.playOkSound();
	this.updateInputData();
	this.deactivate();
	const commandList = this._commandDataList;
	const commandData = commandList.find(command => command.buttonName === buttonName);
	if (commandData) {
		const enabled = this.isHexEnabled(commandData);
		if (enabled) {
			this.confirmHex(commandData);
		} else {
			this.playBuzzerSound();
		}
	}
};

Window_ActorCommand.prototype.confirmHex = function(commandData) {
	this.playOkSound();
	const skillType = commandData.stypeid;
	if (skillType) {
		this.select(this._list.findIndex(cmd => cmd.symbol === commandData.symbol && cmd.ext === skillType));
	} else {
		this.select(this._list.findIndex(cmd => cmd.symbol === commandData.symbol));
	}
	if (commandData.buttonName === "escape") {
		this.processCancel();
	} else {
		this.deactivate();
		this.callHandler(commandData.symbol);
	}
};

Window_ActorCommand.prototype.onHexClick = function(commandData) {
	const enabled = this.isHexEnabled(commandData) && this.isOpenAndActive();
	if (enabled) {
		this.playOkSound();
		const skillType = commandData.stypeid;
		this.select(this.findCommand(skillType, commandData.symbol));
		TouchInput._clicked = false;
		this.deactivate();
		this.callHandler(commandData.symbol);
	} else {
		this.playBuzzerSound();
	}
};

class HexOrder {
	order = [];

	constructor(order) {
		this.order = order;
	}

	// version of % to handle negative numbers correctly
	static mod(n, m) {
		return (n % m + m) % m;
	}

	numHexes() {
		return this.order.length;
	}

	toHex(index) {
		return this.order[index];
	}

	fromHex(hex) {
		return this.order.indexOf(hex);
	}

	process(hex, increment) {
		const index = this.fromHex(hex);
		const result = HexOrder.mod(index + increment, this.numHexes());
		return this.toHex(result);
	}

	increment(hex) {
		return this.process(hex, 1);
	}

	decrement(hex) {
		return this.process(hex, -1);
	}
}

Window_ActorCommand.prototype.getCommandData = function(hex) {
	return this._hexes[hex]._commandData;
};

Window_ActorCommand.prototype.getIndexOfFocusedHex = function() {
	return this._hexes.findIndex(hex => hex.isFocused());
};

Window_ActorCommand.prototype.getIndexOfCurrentHex = function() {
	return this._hexes.findIndex(hex => {
		if (hex._commandData.symbol === 'skill') {
			return hex._commandData.symbol === this.currentSymbol() && hex._commandData.stypeid === this.currentExt();
		} else {
			return hex._commandData.symbol === this.currentSymbol();
		}
	});
};

Window_ActorCommand.prototype.focus = function(hex) {
	this._hexes.forEach(hex => hex.unfocus());
	this._hexes[hex].focus();
};

Window_ActorCommand.prototype.canFocus = function(hex) {
	return hex >= 0 && this.isHexEnabled(this.getCommandData(hex));
}

const cursorHexOrder = new HexOrder([0, 1, 2, 6, 5, 4]);

Window_ActorCommand.prototype.cursorLeft = function() {
	this.moveCursorHex('decrement', 4);
};

Window_ActorCommand.prototype.cursorRight = function() {
	this.moveCursorHex('increment', 6)
};

Window_ActorCommand.prototype.moveCursorHex = function(methodName, start) {
	let hex = this.focusedHex(start);
	do {
		hex = cursorHexOrder[methodName](hex);
	} while (!this.canFocus(hex));
	this.focus(hex);
}

Window_ActorCommand.prototype.focusedHex = function(start) {
	const focusedHex = this.getIndexOfFocusedHex();
	const currentHex = this.getIndexOfCurrentHex();
	if (focusedHex > -1) return focusedHex;
	return currentHex > -1 ? currentHex : start;
}

Window_ActorCommand.prototype.currentHex = function(start) {
	const currentHex = this.getIndexOfCurrentHex();
	return currentHex > -1 ? currentHex : start;
}

const submenuHexOrder = new HexOrder([0, 1, 2, 5, 4]);

function processSubmenuCursorMove(context, method, start) {
	context.processCancel();
	const actorCommandWindow = SceneManager._scene._actorCommandWindow;
	let hex = actorCommandWindow.currentHex(start);
	do {
		hex = submenuHexOrder[method](hex);
	} while (!actorCommandWindow.canFocus(hex));
	actorCommandWindow.focus(hex);
	actorCommandWindow.processOk();
}

function submenuCursorLeft(context, start) {
	processSubmenuCursorMove(context, 'decrement', start);
}

function submenuCursorRight(context, start) {
	processSubmenuCursorMove(context, 'increment', start);
}

Window_BattleSkill.prototype.cursorLeft = function() {
	submenuCursorLeft(this, 1);
};

Window_BattleSkill.prototype.cursorRight = function() {
	submenuCursorRight(this, 1);
};

Window_BattleItem.prototype.cursorLeft = function() {
	submenuCursorLeft(this, 5);
};

Window_BattleItem.prototype.cursorRight = function() {
	submenuCursorRight(this, 5);
};

Window_BattleEnemy.prototype.cursorLeft = function() {
	if (this.selectedHex() === 4) {
		submenuCursorLeft(this, 4);
	}
};

Window_BattleEnemy.prototype.cursorRight = function() {
	if (this.selectedHex() === 4) {
		submenuCursorRight(this, 4);
	}
};

Window_BattleEnemy.prototype.selectedHex = function() {
	return SceneManager._scene._actorCommandWindow.currentHex(4);
}

TLB.SKABattleHUD.Window_BattleItem_processHandling = Window_BattleItem.prototype.processHandling;
Window_BattleItem.prototype.processHandling = function() {
	TLB.SKABattleHUD.Window_BattleItem_processHandling.call(this);
	if (this.isOpenAndActive()) {
		if (Input.isTriggered("left")) {
			this.cursorLeft();
		}
		if (Input.isTriggered("right")) {
			this.cursorRight();
		}
	}
};

class Sprite_Hex extends Sprite_Clickable {
	constructor(normalImage, commandData) {
		super();
		this._normalImage = normalImage;
		this._commandData = commandData;
		this.bitmap = ImageManager.loadMenu(normalImage);
		this._upperLayer = new Sprite();
		this._upperLayer.bitmap = new Bitmap(119, 103);
		this.addChild(this._upperLayer);
		this.move(commandData.hexposition.x, commandData.hexposition.y);
		this._upperLayer.bitmap.fontFace = 'good-times';
		this._upperLayer.bitmap.fontSize = 12;
		this._upperLayer.bitmap.fontItalic = true;
		this._focused = false;
	}

	hitTest(x, y) {
		const q2x = Math.abs(x - 59);
		const q2y = Math.abs(y - 51);
		const horz = 30;
		const vert = 50;
		if (q2x > horz * 2 || q2y > vert) return false;
		return vert * 2 * horz - vert * q2x - 2 * horz * q2y >= 0;
	}

	onMouseEnter() {
		this.bitmap = ImageManager.loadMenu(this._normalImage === TLB.Param.SKABH.commands_centerimage ? TLB.Param.SKABH.commands_centerhover : TLB.Param.SKABH.commands_normalhover);
	}

	onMouseExit() {
		this.bitmap = ImageManager.loadMenu(this._normalImage);
	}

	isFocused() {
		return this._focused;
	}

	focus() {
		this.onMouseEnter();
		this._focused = true;
	}

	unfocus() {
		this.onMouseExit();
		this._focused = false;
	}
}

Window_ActorCommand.prototype.drawButtonIcon = function(iconIndex, sprite, icony) {
	if (iconIndex) {
		const bitmap = ImageManager.loadSystem("IconSet");
		const pw = ImageManager.iconWidth;
		const ph = ImageManager.iconHeight;
		const sx = (iconIndex % 16) * pw;
		const sy = Math.floor(iconIndex / 16) * ph;
		sprite._upperLayer.bitmap.blt(bitmap, sx, sy, pw, ph, sprite.width / 2 - pw / 2, icony + 27);
	}
};

Window_ActorCommand.prototype.drawHex = function(normalImage, commandData) {
	const actor = this._actor;
	const skills = (actor?.skills() || []).filter(item => (item.occasion != 2 || item.enhance) && item.occasion != 3 && item.stypeId === commandData.stypeid);
	const sprite = new Sprite_Hex(normalImage, commandData);
	this._hexes.push(sprite);
	sprite.onClick = () => this.onHexClick(commandData, skills);
	this.contents.fontFace = 'good-times';
	this.contents.fontSize = 12;
	const commandGradient = ["#eac472", "#bb695c"];
	const keyGradient = ["#e1d2fa", "#9581c1"];
	const textOptions = {
		bold: true,
		outlineThickness: 2,
		outlineGradient: ["#4f4f4f", "#000000"],
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 2,
		shadowOpacity: 0.75
	};
	const enabled = this.isHexEnabled(commandData);
	if (enabled) {
		if (Input.isControllerConnected()) {
			this.drawHexController(sprite, commandData, commandGradient, textOptions);
		} else {
			this.drawHexNoController(sprite, commandData, commandGradient, keyGradient, textOptions);
		}
	} else {
		sprite.alpha = 0.6;
		sprite._upperLayer.bitmap.drawGradientText(commandData.text, keyGradient, 0, commandData.commandy, 119, 42, "center", textOptions);
	}
	this.addChild(sprite);
};

Window_ActorCommand.prototype.drawHexController = function(sprite, commandData, commandGradient, textOptions) {
	let y = commandData.commandy;
	let icony = commandData.icony;
	if (commandData.text !== "BACK") {
		y -= 9;
		icony -= 9;
	}
	sprite._upperLayer.bitmap.drawGradientText(commandData.text, commandGradient, -1, y, 119, 40, "center", textOptions);
	sprite._upperLayer.bitmap.fontItalic = false;
	const iconIndex = Input.iconMapper[commandData.buttonName] || Input.iconMapper.cancel;
	this.drawButtonIcon(iconIndex, sprite, icony);
}

Window_ActorCommand.prototype.drawHexNoController = function(sprite, commandData, commandGradient, keyGradient, textOptions) {
	sprite._upperLayer.bitmap.drawGradientText(commandData.text, commandGradient, 0, commandData.commandy, 119, 40, "center", textOptions);
	sprite._upperLayer.bitmap.fontItalic = false;
	if (Imported.TLB_SKAOptionsMenu) {
		const codes = Object.keys(Input.keyMapper).filter(key => Input.keyMapper[key] === commandData.buttonName);
		const keyText = this.getKeyText(codes);
		TLB.SKABattleHUD.displayImage(commandData.icon, 60 - this.textWidth(keyText || commandData.keytext) / 2 - 8, commandData.icony + 27, sprite._upperLayer.bitmap, "Unable to display battle command icon");
		sprite._upperLayer.bitmap.drawGradientText(keyText || commandData.keytext, keyGradient, 7, commandData.commandy + 14, 119, 40, "center", textOptions);

		if ((commandData.symbol === "attack" && !this._actor?.lastCommandSymbol()) || (commandData.symbol === this._actor?.lastCommandSymbol() && (!commandData.stypeid || this._actor?.lastBattleSkill()?.stypeId === commandData.stypeid))) {
			const okCodes = Object.keys(Input.keyMapper).filter(key => Input.keyMapper[key] === "ok");
			const keyText = this.getKeyText(okCodes);
			TLB.SKABattleHUD.displayImage("Battle_HUD/BATTLE_HUD_BUTTON_OK", 60 - this.textWidth(keyText) / 2 - 8, commandData.icony - (commandData.buttonName === "up" ? 0 : 2), sprite._upperLayer.bitmap, "Unable to display battle command icon");
			sprite._upperLayer.bitmap.drawGradientText(keyText, keyGradient, 7, commandData.commandy - 14, 119, 40, "center", textOptions);
		}
	}
}

Window_ActorCommand.prototype.getKeyText = function(codes) {
	let keyText = null;
	for (const code of codes) {
		const text = Window_Options.prototype.mapperText(code);
		if (text.length > 0) keyText = text;
	}
	return keyText;
};

Window_BattleActor.prototype = Object.create(Window_Selectable.prototype);

Window_BattleActor.prototype._createAllParts = function() {
	this.createSprites();
	Window.prototype._createAllParts.call(this);
};

Window_BattleActor.prototype.createSprites = function() {
	this._backSprite = new Sprite();
	let image = TLB.Param.SKABH.actorwindow_background;
	let bitmap = ImageManager.loadMenu(image);
	this._backSprite.bitmap = bitmap;
	this.addChild(this._backSprite);
	this._backSelect = new Sprite();
	this._backSelect.bitmap = ImageManager.loadMenu(TLB.Param.SKABH.back_select);
	this._backSelect.y = 5;
	this._backSelect.alpha = 0;
	this.addChild(this._backSelect);
	this._backArrow = new Sprite();
	this._backArrow.bitmap = ImageManager.loadMenu(TLB.Param.SKABH.backarrow_image);
	this._backArrow.move(93, 15);
	this.addChild(this._backArrow);
	this._clickableArea = new Sprite_Clickable();
	this._clickableArea.bitmap = new Bitmap(372, 40);
	this._clickableArea.onMouseEnter = () => this._backSelect.alpha = 1;
	this._clickableArea.onMouseExit = () => this._backSelect.alpha = 0;
	this._clickableArea.onClick = () => SceneManager._scene.onActorCancel();
	this.addChild(this._clickableArea);
};

TLB.SKABattleHUD.Window_BattleActor_initialize = Window_BattleActor.prototype.initialize;
Window_BattleActor.prototype.initialize = function(rect) {
	this._actors = $gameParty.battleMembers();
	TLB.SKABattleHUD.Window_BattleActor_initialize.call(this, rect);
	this.opacity = 0;
};

Window_BattleActor.prototype.maxCols = function() {
	return 1;
};

Window_BattleActor.prototype.maxItems = function() {
	return this._actors.length;
};

Window_BattleActor.prototype.lineHeight = function() {
	return 36;
};

Window_BattleActor.prototype.drawItem = function(index) {
	this.resetTextColor();
	const actor = this._actors[index];
	const name = actor.name();
	const rect = this.itemLineRect(index);
	rect.x += 54;
	rect.y += 40;
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 18;
	const textOptions = {
		outlineGradient: ["#4f4f4f", "#000000"],
		outlineThickness: 2,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75
	};
	const gradient = actor.isAlive() ? ["#d9c5dd", "#eee5f1", "#d9c4de"] : ["#994961", "#c4735d", "#994962"];
	this.drawGradientText(name, gradient, rect.x, rect.y, rect.width, "left", textOptions);
};

Window_BattleActor.prototype.show = function() {
	this.refresh();
	this.forceSelect(0);
	$gameTemp.clearTouchState();
	Window_Selectable.prototype.show.call(this);
};

Window_BattleActor.prototype.drawAllItems = function() {
	this._backSelect.alpha = 0;
	this.contents.fontFace = 'good-times';
	this.contents.fontSize = 30;
	const textOptions = {
		outlineGradient: ["#4f4f4f", "#000000"],
		outlineThickness: 2,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75
	};
	this.contents.fontBold = true;
	const gradient = ["#eac472", "#bb695c"];
	this.contents.fontItalic = true;
	this.drawGradientText("PARTY", gradient, 118, -3, 144, "left", textOptions);
	this.contents.fontItalic = false;
	this.contents.fontBold = false;
	const topIndex = this.topIndex();
	for (let i = 0; i < this.maxVisibleItems(); i++) {
		const index = topIndex + i;
		if (index < this.maxItems()) {
			this.drawItem(index);
		}
	}
	const item = BattleManager.inputtingAction()?.item();
	if (item) {
		this.drawIcon(item.iconIndex, 63, 490);
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 18;
		const textGradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
		this.drawGradientText(item.name, textGradient, 103, 490, 128, "left", textOptions);
		this._actor = BattleManager._currentActor;
		Window_SkillList.prototype.drawSkillCost.call(this, item, 100, 488, 240);
	}
};

Window_BattleActor.prototype.drawItemBackground = function(index) {
	const rect = this.itemRect(index);
	this.drawBackgroundRect(rect);
};

Window_BattleActor.prototype.hitTest = function(x, y) {
	if (this.innerRect.contains(x, y)) {
		const cx = this.origin.x + x - this.padding;
		const cy = this.origin.y + y - this.padding - 40;
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
	return -1;
};

Window_BattleActor.prototype.refreshCursor = function() {
	const index = this.index();
	if (index >= 0) {
		const rect = this.itemRect(index);
		rect.y += 40;
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		this.setCursorRect(0, 0, 0, 0);
		this.cursorVisible = false;
	}
};

Window_BattleActor.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKABH.enemywindow_selection_image;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_BattleActor.prototype._refreshCursor = function() {
	//
};

Window_BattleSkill.prototype._createAllParts = function() {
	Window.prototype._createAllParts.call(this);
	this.createSprites();
	this._clientArea.y += 103;
	this._topSprite.y += 40;
	this._contentsSprite.y += 80;
	this._contentsBackSprite.y += 78;
};

TLB.SKABattleHUD.createArrow = function(image, clickCallback) {
	const arrow = new Sprite_Clickable();
	arrow.bitmap = ImageManager.loadMenu(image);
	arrow.onClick = clickCallback;
	return arrow;
};

Window_BattleSkill.prototype.createSprites = function() {
	const params = TLB.Param.SKABH;
	this._topSprite = new Sprite();
	const bitmap = ImageManager.loadMenu(params.topstripe);
	this._topSprite.bitmap = bitmap;
	this.addChild(this._topSprite);
	this._backSelect = new Sprite();
	this._backSelect.bitmap = ImageManager.loadMenu(params.back_select);
	this._backSelect.y = 5;
	this._backSelect.alpha = 0;
	this._topSprite.addChild(this._backSelect);
	this._topContents = new Sprite();
	this._topContents.bitmap = new Bitmap(389, 52);
	this._topSprite.addChild(this._topContents);
	this._backArrow = new Sprite();
	this._backArrow.bitmap = ImageManager.loadMenu(params.backarrow_image);
	this._backArrow.move(110, 15);
	this._topContents.addChild(this._backArrow);
	this._clickableArea = new Sprite_Clickable();
	this._clickableArea.bitmap = new Bitmap(372, 40);
	this._clickableArea.onMouseEnter = () => this._backSelect.alpha = 1;
	this._clickableArea.onMouseExit = () => this._backSelect.alpha = 0;
	this._clickableArea.onClick = () => SceneManager._scene.onSkillCancel();
	this._topContents.addChild(this._clickableArea);
	this._actionSwap = new Sprite();
	this._actionSwap.bitmap = ImageManager.loadMenu(params.img_actionswap);
	this.addChild(this._actionSwap);
	this._actionSwapContents = new Sprite();
	this._actionSwapContents.bitmap = new Bitmap(389, 25);
	this._actionSwap.addChild(this._actionSwapContents);
	this._prevArrow = TLB.SKABattleHUD.createArrow(params.prevarrow_image, () => this.cursorLeft());
	this._prevArrow.move(110, 4);
	this._actionSwapContents.addChild(this._prevArrow);
	this._nextArrow = TLB.SKABattleHUD.createArrow(params.nextarrow_image, () => this.cursorRight());
	this._nextArrow.move(240, 4);
	this._actionSwapContents.addChild(this._nextArrow);
};

TLB.SKABattleHUD.Window_BattleSkill_initialize = Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function(rect) {
	TLB.SKABattleHUD.Window_BattleSkill_initialize.call(this, rect);
	const image = TLB.Param.SKAUIB.arrowimage;
	const bitmap = ImageManager.loadMenu(image);
	const arrowAnchor = { x: 0.5, y: 0.5 };
	this._downArrowSprite.bitmap = bitmap;
	this._downArrowSprite.anchor = arrowAnchor;
	this._downArrowSprite.move(409 / 2, 546);
	this._upArrowSprite.bitmap = bitmap;
	this._upArrowSprite.anchor = arrowAnchor;
	this._upArrowSprite.scale.y = -1;
	this._upArrowSprite.move(409 / 2, 5);
	this.opacity = 0;
};

TLB.SKABattleHUD.Window_BattleSkill_show = Window_BattleSkill.prototype.show;
Window_BattleSkill.prototype.show = function() {
	TLB.SKABattleHUD.Window_BattleSkill_show.call(this);
	this.scrollTo(0, 0);
};

Window_BattleSkill.prototype.rowSpacing = function() {
	return 0;
};

Window_BattleSkill.prototype.maxCols = function() {
	return 1;
};

Window_BattleSkill.prototype.lineHeight = function() {
	return 36;
};

TLB.SKABattleHUD.Window_BattleSkill_itemRect = Window_BattleSkill.prototype.itemRect;
Window_BattleSkill.prototype.itemRect = function(index) {
	const rect = TLB.SKABattleHUD.Window_BattleSkill_itemRect.call(this, index);
	rect.y += this.innerRect.y;
	return rect;
};



// Filter out skills that cannot be used during battle and sort by usage
// Allow menu only enhance spells to be shown in order to give the player
// access to the cancel enhance action
TLB.SKABattleHUD.Window_BattleSkill_makeItemList = Window_BattleSkill.prototype.makeItemList;
Window_BattleSkill.prototype.makeItemList = function() {
	TLB.SKABattleHUD.Window_BattleSkill_makeItemList.call(this);
	this._data = this._data.filter(item => (item.occasion != 2 || item.enhance) && item.occasion != 3);
	this._data.sort((a, b) => {
		if ((this._actor._skillUses?.[a.id] || 0) > (this._actor._skillUses?.[b.id] || 0)) return -1;
		if ((this._actor._skillUses?.[b.id] || 0) > (this._actor._skillUses?.[a.id] || 0)) return 1;
		return a.name.localeCompare(b.name)
	})
};

Window_BattleSkill.prototype.drawItem = function(index) {
	this.resetTextColor();
	const rect = this.itemLineRect(index);
	rect.x += 47;
	rect.width = 277;
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 18;
	const skill = this.itemAt(index);
	if (skill) {
		const costWidth = this.costWidth();
		this.changePaintOpacity(this.isEnabled(skill));
		this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
		this.drawSkillCost(skill, rect.x, rect.y, rect.width);
		this.changePaintOpacity(1);
	}
};

Window_BattleSkill.prototype.drawItemName = function(item, x, y, width) {
	if (item) {
		const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
		const textMargin = ImageManager.iconWidth + 4;
		const itemWidth = Math.max(0, width - textMargin);
		this.resetTextColor();
		this.drawIcon(item.iconIndex, x, iconY);
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 18;
		const textOptions = {
			outlineGradient: ["#4f4f4f", "#000000"],
			outlineThickness: 2,
			dropShadow: true,
			dropShadowX: 0,
			dropShadowY: 1,
			shadowOpacity: 0.75
		};
		const gradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
		const disabledGradient = ["#887a8c", "#a397a7", "#7e7281"];
		const itemName = this.itemName(item, this._actor);
		this.drawGradientText(itemName, this.isEnabled(item) ? gradient : disabledGradient, x + textMargin, y, itemWidth, "left", textOptions);
	}
}

Window_BattleSkill.prototype.drawAllItems = function() {
	this._backSelect.alpha = 0;
	this.drawTopContents();
	const topIndex = Math.max(this.topIndex() - 1, 0);
	for (let i = 0; i < this.maxVisibleItems(); i++) {
		const index = topIndex + i;
		if (index < Math.max(this.maxItems(), this.maxVisibleItems())) {
			this.drawItemBackground(index);
			if (index <= this.maxItems()) this.drawItem(index);
		}
	}
	this.drawActionSwap();
};

Window_BattleSkill.prototype.drawTopContents = function() {
	this._topContents.bitmap.fontFace = 'good-times';
	this._topContents.bitmap.fontSize = 30;
	this._topContents.bitmap.clear();
	const textOptions = {
		outlineGradient: ["#4f4f4f", "#000000"],
		outlineThickness: 2,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75,
		bitmap: this._topContents.bitmap
	};
	this._topContents.bitmap.fontBold = true;
	const gradient = ["#eac472", "#bb695c"];
	this._topContents.bitmap.fontItalic = true;
	this.drawGradientText($dataSystem.skillTypes[this._stypeId].toUpperCase(), gradient, 145, 7, 144, "left", textOptions);
	this._topContents.bitmap.fontItalic = false;
	this._topContents.bitmap.fontBold = false;
};

Window_BattleSkill.prototype.drawActionSwap = function() {
	this._actionSwap.y = this.height - 93;
	this._actionSwapContents.bitmap.fontFace = 'good-times';
	this._actionSwapContents.bitmap.fontSize = 18;
	this._actionSwapContents.bitmap.clear();
	const textOptions = {
		outlineGradient: ["#4f4f4f", "#000000"],
		outlineThickness: 2,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75,
		bitmap: this._actionSwapContents.bitmap
	};
	this._actionSwapContents.bitmap.fontBold = true;
	const gradient = ["#eac472", "#bb695c"];
	this._actionSwapContents.bitmap.fontItalic = true;
	this.drawGradientText("Action", gradient, 145, -4, 144, "left", textOptions);
};

Window_BattleSkill.prototype.drawItemBackground = function(index) {
	const rect = this.itemRect(index);
	rect.x -= 19;
	const even = index % 2 === 0;
	this.drawBackgroundRect(rect, even);
};

Window_BattleSkill.prototype.drawBackgroundRect = function(rect, even) {
	const params = TLB.Param.SKABH;
	let image;
	if (even) image = params.evenstripe;
	else image = params.oddstripe;
	const bitmap = ImageManager.loadMenu(image);
	this.contentsBack.context.globalAlpha = 0.75;
	this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y);
	this.contentsBack.context.globalAlpha = 1;
};

Window_BattleSkill.prototype.hitTest = function(x, y) {
	const rect = this.innerRect;
	rect.y += this._contentsSprite.y;
	if (rect.contains(x, y)) {
		const cx = this.origin.x + x - this.padding;
		const cy = this.origin.y + y - this.padding - this._contentsSprite.y;
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
	return -1;
};

Window_BattleSkill.prototype.refreshCursor = function() {
	const index = this.index();
	if (index >= 0) {
		const rect = this.itemRect(index);
		rect.y += 80;
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		this.setCursorRect(0, 0, 0, 0);
		this.cursorVisible = false;
	}
};

Window_BattleSkill.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKABH.enemywindow_selection_image;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_BattleSkill.prototype._refreshCursor = function() {
	//
};

Window_BattleSkill.prototype._refreshArrows = function() {
	//
}

Window_BattleSkill.prototype._updateFilterArea = function() {
	const pos = this._clientArea.worldTransform.apply(new Point(0, 0));
	const filterArea = this._clientArea.filterArea;
	filterArea.x = pos.x + this.origin.x;
	filterArea.y = pos.y + this.origin.y + this.innerRect.y + 44;
	filterArea.width = this.innerWidth;
	filterArea.height = 396;
};

Object.defineProperty(Window_BattleSkill.prototype, "innerHeight", {
	get: function() {
		return 360;
	},
	configurable: true
});

Object.defineProperty(Window_BattleSkill.prototype, "innerRect", {
    get: function() {
        return new Rectangle(
            this._padding,
            36,
            this.innerWidth,
            this.innerHeight + 88
        );
    },
    configurable: true
});

Window_BattleSkill.prototype.contentsHeight = function() {
	return Window_Selectable.prototype.contentsHeight.call(this) + this.innerRect.y;
};

// Replacement for Number.prototype.clamp from rmmz_core
// Reverse order so max compared with first, then min
function clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
};

// Scrolling does not respect innerRect!
Window_BattleSkill.prototype.scrollTo = function(x, y) {
    const scrollX = clamp(x, this.minScrollX(), this.maxScrollX());
    const scrollY = clamp(y, this.minScrollY(), this.maxScrollY());
    if (this._scrollX !== scrollX || this._scrollY !== scrollY) {
        this._scrollX = scrollX;
        this._scrollY = scrollY;
        this.updateOrigin();
    }
};

Window_BattleSkill.prototype.smoothScrollTo = function(x, y) {
    this._scrollTargetX = clamp(x, this.minScrollX(), this.maxScrollX());
    this._scrollTargetY = clamp(y, this.minScrollY(), this.maxScrollY());
    this._scrollDuration = Input.keyRepeatInterval;
};

Window_BattleSkill.prototype.updateArrows = function() {
    this.downArrowVisible = this._scrollY < this.maxScrollY();
    this.upArrowVisible = this._scrollY > this.minScrollY();
};

Window_BattleSkill.prototype.minScrollX = function() { return 0; };
Window_BattleSkill.prototype.minScrollY = function() {
	return this.innerRect.y;
};

Window_BattleItem.prototype._createAllParts = function() {
	Window.prototype._createAllParts.call(this);
	this.createSprites();
	this._clientArea.y += 103;
	this._topSprite.y += 40;
	this._contentsSprite.y += 80;
	this._contentsBackSprite.y += 78;
};

Window_BattleItem.prototype.createSprites = function() {
	const params = TLB.Param.SKABH;
	this._topSprite = new Sprite();
	const bitmap = ImageManager.loadMenu(params.topstripe);
	this._topSprite.bitmap = bitmap;
	this.addChild(this._topSprite);
	this._backSelect = new Sprite();
	this._backSelect.bitmap = ImageManager.loadMenu(params.back_select);
	this._backSelect.y = 5;
	this._backSelect.alpha = 0;
	this._topSprite.addChild(this._backSelect);
	this._topContents = new Sprite();
	this._topContents.bitmap = new Bitmap(389, 52);
	this._topSprite.addChild(this._topContents);
	this._backArrow = new Sprite();
	this._backArrow.bitmap = ImageManager.loadMenu(params.backarrow_image);
	this._backArrow.move(119, 15);
	this._topContents.addChild(this._backArrow);
	this._clickableArea = new Sprite_Clickable();
	this._clickableArea.bitmap = new Bitmap(372, 40);
	this._clickableArea.onMouseEnter = () => this._backSelect.alpha = 1;
	this._clickableArea.onMouseExit = () => this._backSelect.alpha = 0;
	this._clickableArea.onClick = () => SceneManager._scene.onItemCancel();
	this._topContents.addChild(this._clickableArea);
	this._actionSwap = new Sprite();
	this._actionSwap.bitmap = ImageManager.loadMenu(params.img_actionswap);
	this.addChild(this._actionSwap);
	this._actionSwapContents = new Sprite();
	this._actionSwapContents.bitmap = new Bitmap(389, 25);
	this._actionSwap.addChild(this._actionSwapContents);
	this._prevArrow = TLB.SKABattleHUD.createArrow(params.prevarrow_image, () => this.cursorLeft());
	this._prevArrow.x = 110;
	this._prevArrow.y = 4;
	this._actionSwapContents.addChild(this._prevArrow);
	this._nextArrow = TLB.SKABattleHUD.createArrow(params.nextarrow_image, () => this.cursorRight());
	this._nextArrow.x = 240;
	this._nextArrow.y = 4;
	this._actionSwapContents.addChild(this._nextArrow);
};

TLB.SKABattleHUD.Window_BattleItem_initialize = Window_BattleItem.prototype.initialize;
Window_BattleItem.prototype.initialize = function(rect) {
	TLB.SKABattleHUD.Window_BattleItem_initialize.call(this, rect);
	const image = TLB.Param.SKAUIB.arrowimage;
	const bitmap = ImageManager.loadMenu(image);
	const arrowAnchor = { x: 0.5, y: 0.5 };
	this._downArrowSprite.bitmap = bitmap;
	this._downArrowSprite.anchor = arrowAnchor;
	this._downArrowSprite.move(409 / 2, 546);
	this._upArrowSprite.bitmap = bitmap;
	this._upArrowSprite.anchor = arrowAnchor;
	this._upArrowSprite.scale.y = -1;
	this._upArrowSprite.move(409 / 2, 5);
	this.opacity = 0;
};

TLB.SKABattleHUD.Window_BattleItem_show = Window_BattleItem.prototype.show;
Window_BattleItem.prototype.show = function() {
	TLB.SKABattleHUD.Window_BattleItem_show.call(this);
	this.scrollTo(0, 0);
};

Window_BattleSkill.prototype.rowSpacing = function() {
	return 0;
};

Window_BattleItem.prototype.maxCols = function() {
	return 1;
};

Window_BattleItem.prototype.lineHeight = function() {
	return 36;
};

TLB.SKABattleHUD.Window_BattleItem_itemRect = Window_BattleItem.prototype.itemRect;
Window_BattleItem.prototype.itemRect = function(index) {
	const rect = TLB.SKABattleHUD.Window_BattleItem_itemRect.call(this, index);
	rect.y += this.innerRect.y;
	return rect;
};

TLB.SKABattleHUD.Window_BattleItem_makeItemList = Window_BattleItem.prototype.makeItemList;
Window_BattleItem.prototype.makeItemList = function() {
	TLB.SKABattleHUD.Window_BattleItem_makeItemList.call(this);
	this._data.sort((a, b) => {
		if (($gameParty._itemUses?.[a.id] || 0) > ($gameParty._itemUses?.[b.id] || 0)) return -1;
		if (($gameParty._itemUses?.[b.id] || 0) > ($gameParty._itemUses?.[a.id] || 0)) return 1;
		return a.name.localeCompare(b.name);
	})
};

Window_BattleItem.prototype.drawItem = function(index) {
	this.resetTextColor();
	const rect = this.itemLineRect(index);
	rect.x += 47;
	rect.width = 277;
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 18;
	const skill = this.itemAt(index);
	if (skill) {
		const numberWidth = this.numberWidth();
		this.changePaintOpacity(this.isEnabled(skill));
		this.drawItemName(skill, rect.x, rect.y, rect.width - numberWidth);
		this.drawItemNumber(skill, rect.x, rect.y, rect.width);
		this.changePaintOpacity(1);
	}
};

Window_BattleItem.prototype.drawItemName = function(item, x, y, width) {
	if (item) {
		const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
		const textMargin = ImageManager.iconWidth + 4;
		const itemWidth = Math.max(0, width - textMargin);
		this.resetTextColor();
		this.drawIcon(item.iconIndex, x, iconY);
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 18;
		const textOptions = {
			outlineGradient: ["#4f4f4f", "#000000"],
			outlineThickness: 2,
			dropShadow: true,
			dropShadowX: 0,
			dropShadowY: 1,
			shadowOpacity: 0.75
		};
		const gradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
		const disabledGradient = ["#887a8c", "#a397a7", "#7e7281"];
		const itemName = this.itemName(item, this._actor);
		this.drawGradientText(itemName, this.isEnabled(item) ? gradient : disabledGradient, x + textMargin, y, itemWidth, "left", textOptions);
	}
}

Window_BattleItem.prototype.drawItemNumber = function(item, x, y, width) {
	if (this.needsNumber()) {
		this.contents.fontFace = 'franklin-gothic-demi';
		this.contents.fontSize = 14;
		const textOptions = {
			outlineGradient: ["#4f4f4f", "#000000"],
			outlineThickness: 2,
			dropShadow: true,
			dropShadowX: 0,
			dropShadowY: 1,
			shadowOpacity: 0.75
		};
		const gradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
		this.drawGradientText("x", gradient, x - 17, y - 1, width - this.textWidth("00"), "right", textOptions);
		this.contents.fontFace = 'franklin-gothic-med';
		this.contents.fontSize = 18;
		this.drawGradientText($gameParty.numItems(item), gradient, x - 7, y, width, "right", textOptions);
	}
};

Window_BattleItem.prototype.drawAllItems = function() {
	this._backSelect.alpha = 0;
	this.drawTopContents();
	const topIndex = Math.max(this.topIndex() - 1, 0);
	for (let i = 0; i < this.maxVisibleItems(); i++) {
		const index = topIndex + i;
		if (index < Math.max(this.maxItems(), this.maxVisibleItems())) {
			this.drawItemBackground(index);
			if (index <= this.maxItems()) this.drawItem(index);
		}
	}
	this.drawActionSwap();
};

Window_BattleItem.prototype.drawTopContents = function() {
	this._topContents.bitmap.fontFace = 'good-times';
	this._topContents.bitmap.fontSize = 30;
	const textOptions = {
		outlineGradient: ["#4f4f4f", "#000000"],
		outlineThickness: 2,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75,
		bitmap: this._topContents.bitmap
	};
	this._topContents.bitmap.fontBold = true;
	const gradient = ["#eac472", "#bb695c"];
	this._topContents.bitmap.fontItalic = true;
	this.drawGradientText("ITEM", gradient, 154, 7, 144, "left", textOptions);
	this._topContents.bitmap.fontItalic = false;
	this._topContents.bitmap.fontBold = false;
};

Window_BattleItem.prototype.drawActionSwap = function() {
	this._actionSwap.y = this.height - 93;
	this._actionSwapContents.bitmap.fontFace = 'good-times';
	this._actionSwapContents.bitmap.fontSize = 18;
	this._actionSwapContents.bitmap.clear();
	const textOptions = {
		outlineGradient: ["#4f4f4f", "#000000"],
		outlineThickness: 2,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75,
		bitmap: this._actionSwapContents.bitmap
	};
	this._actionSwapContents.bitmap.fontBold = true;
	const gradient = ["#eac472", "#bb695c"];
	this._actionSwapContents.bitmap.fontItalic = true;
	this.drawGradientText("Action", gradient, 145, -4, 144, "left", textOptions);
};

Window_BattleItem.prototype.drawItemBackground = function(index) {
	const rect = this.itemRect(index);
	rect.x -= 19;
	const even = index % 2 === 0;
	this.drawBackgroundRect(rect, even);
};

Window_BattleItem.prototype.drawBackgroundRect = function(rect, even) {
	const params = TLB.Param.SKABH;
	let image;
	if (even) image = params.evenstripe;
	else image = params.oddstripe;
	const bitmap = ImageManager.loadMenu(image);
	this.contentsBack.context.globalAlpha = 0.75;
	this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y);
	this.contentsBack.context.globalAlpha = 1;
};

Window_BattleItem.prototype.hitTest = function(x, y) {
	const rect = this.innerRect;
	rect.y += this._contentsSprite.y;
	if (rect.contains(x, y)) {
		const cx = this.origin.x + x - this.padding;
		const cy = this.origin.y + y - this.padding - this._contentsSprite.y;
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
	return -1;
};

Window_BattleItem.prototype.refreshCursor = function() {
	const index = this.index();
	if (index >= 0) {
		const rect = this.itemRect(index);
		rect.y += 80;
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		this.setCursorRect(0, 0, 0, 0);
		this.cursorVisible = false;
	}
};

Window_BattleItem.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKABH.enemywindow_selection_image;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_BattleItem.prototype._refreshCursor = function() {
	//
};

Window_BattleItem.prototype._refreshArrows = function() {
	//
}

Window_BattleItem.prototype._updateFilterArea = function() {
	const pos = this._clientArea.worldTransform.apply(new Point(0, 0));
	const filterArea = this._clientArea.filterArea;
	filterArea.x = pos.x + this.origin.x;
	filterArea.y = pos.y + this.origin.y + this.innerRect.y + 44;
	filterArea.width = this.innerWidth;
	filterArea.height = 396;
};

Window_BattleItem.prototype.contentsHeight = function() {
	return Window_Selectable.prototype.contentsHeight.call(this) + this.innerRect.y;
};

// Scrolling does not respect innerRect!
Window_BattleItem.prototype.scrollTo = function(x, y) {
    const scrollX = clamp(x, this.minScrollX(), this.maxScrollX());
    const scrollY = clamp(y, this.minScrollY(), this.maxScrollY());
    if (this._scrollX !== scrollX || this._scrollY !== scrollY) {
        this._scrollX = scrollX;
        this._scrollY = scrollY;
        this.updateOrigin();
    }
};

Window_BattleItem.prototype.smoothScrollTo = function(x, y) {
    this._scrollTargetX = clamp(x, this.minScrollX(), this.maxScrollX());
    this._scrollTargetY = clamp(y, this.minScrollY(), this.maxScrollY());
    this._scrollDuration = Input.keyRepeatInterval;
};

Window_BattleItem.prototype.updateArrows = function() {
    this.downArrowVisible = this._scrollY < this.maxScrollY();
    this.upArrowVisible = this._scrollY > this.minScrollY();
};

Window_BattleItem.prototype.minScrollX = function() { return 0; };
Window_BattleItem.prototype.minScrollY = function() {
	return this.innerRect.y;
};

Object.defineProperty(Window_BattleItem.prototype, "innerHeight", {
	get: function() {
		return 360;
	},
	configurable: true
});

Object.defineProperty(Window_BattleItem.prototype, "innerRect", {
    get: function() {
        return new Rectangle(
            this._padding,
            36,
            this.innerWidth,
            this.innerHeight + 88
        );
    },
    configurable: true
});

Window_BattleEnemy.prototype._createAllParts = function() {
	this.createSprites();
	Window.prototype._createAllParts.call(this);
};

Window_BattleEnemy.prototype.createSprites = function() {
	this._backSprite = new Sprite();
	let image = TLB.Param.SKABH.enemywindow_background;
	let bitmap = ImageManager.loadMenu(image);
	this._backSprite.bitmap = bitmap;
	this.addChild(this._backSprite);
	this._backSelect = new Sprite();
	this._backSelect.bitmap = ImageManager.loadMenu(TLB.Param.SKABH.back_select);
	this._backSelect.y = 5;
	this._backSelect.alpha = 0;
	this.addChild(this._backSelect);
	this._backArrow = new Sprite();
	this._backArrow.bitmap = ImageManager.loadMenu(TLB.Param.SKABH.backarrow_image);
	this._backArrow.move(93, 15);
	this.addChild(this._backArrow);
	this._clickableArea = new Sprite_Clickable();
	this._clickableArea.bitmap = new Bitmap(372, 40);
	this._clickableArea.onMouseEnter = () => this._backSelect.alpha = 1;
	this._clickableArea.onMouseExit = () => this._backSelect.alpha = 0;
	this._clickableArea.onClick = () => SceneManager._scene.onEnemyCancel();
	this.addChild(this._clickableArea);
};

TLB.SKABattleHUD.Window_BattleEnemy_initialize = Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(rect) {
	TLB.SKABattleHUD.Window_BattleEnemy_initialize.call(this, rect);
	this.opacity = 0;
};

Window_BattleEnemy.prototype.maxCols = function() {
	return 1;
};

Window_BattleEnemy.prototype.lineHeight = function() {
	return 36;
};

Window_BattleEnemy.prototype.drawItem = function(index) {
	this.resetTextColor();
	const enemy = this._enemies[index];
	const name = enemy.name();
	const rect = this.itemLineRect(index);
	rect.x += 54;
	rect.y += 40;
	this.contents.fontFace = 'franklin-gothic-med';
	this.contents.fontSize = 18;
	const textOptions = {
		outlineGradient: ["#4f4f4f", "#000000"],
		outlineThickness: 2,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75
	};
	const gradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
	this.drawGradientText(name, gradient, rect.x, rect.y, 150, "left", textOptions);
};

Window_BattleEnemy.prototype.drawAllItems = function() {
	this._backSelect.alpha = 0;
	this.contents.fontFace = 'good-times';
	this.contents.fontSize = 30;
	const textOptions = {
		outlineGradient: ["#4f4f4f", "#000000"],
		outlineThickness: 2,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 1,
		shadowOpacity: 0.75
	};
	this.contents.fontBold = true;
	const gradient = ["#eac472", "#bb695c"];
	this.contents.fontItalic = true;
	this.drawGradientText("ENEMY", gradient, 118, -3, 144, "left", textOptions);
	this.contents.fontItalic = false;
	this.contents.fontBold = false;
	const topIndex = this.topIndex();
	for (let i = 0; i < this.maxVisibleItems(); i++) {
		const index = topIndex + i;
		if (index < this.maxItems()) {
			this.drawItem(index);
		}
	}
	const item = BattleManager.inputtingAction()?.item();
	if (item) {
		this.drawIcon(item.iconIndex, 63, 490);
		const textGradient = ["#d9c5dd", "#eee5f1", "#d9c4de"];
		this.drawGradientText(item.name, textGradient, 103, 490, 128, "left", textOptions);
		this._actor = BattleManager._currentActor;
		Window_SkillList.prototype.drawSkillCost.call(this, item, 100, 488, 240);
	}
};

Window_BattleEnemy.prototype.hitTest = function(x, y) {
	if (this.innerRect.contains(x, y)) {
		const cx = this.origin.x + x - this.padding;
		const cy = this.origin.y + y - this.padding - 40;
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
	return -1;
};

Window_BattleEnemy.prototype.refreshCursor = function() {
	const index = this.index();
	if (index >= 0) {
		const rect = this.itemRect(index);
		rect.y += 40;
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		this.cursorVisible = true;
	} else {
		this.setCursorRect(0, 0, 0, 0);
		this.cursorVisible = false;
	}
};

Window_BattleEnemy.prototype._createCursorSprite = function() {
	this._cursorSprite = new Sprite();
	let image = TLB.Param.SKABH.enemywindow_selection_image;
	let bmp = ImageManager.loadMenu(image);
	this._cursorSprite.bitmap = bmp;
	this._clientArea.addChild(this._cursorSprite);
};

Window_BattleEnemy.prototype._refreshCursor = function() {
	//
};

Window_BattleLog.prototype.refresh = function() {
	this.contents.clear();
	this.contentsBack.clear();
	for (let i = 0; i < this._lines.length; i++) {
		this.drawItemBackground(i);
		this.drawLineText(i);
	}
};

Window_BattleLog.prototype.lineHeight = function() {
	return 44;
};

Window_BattleLog.prototype.drawLineText = function(index) {
	const rect = this.lineRect(index);
	this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
	const gap = rect.width - this.textWidth(this.convertEscapeCharacters(this._lines[index]));
	this.drawTextEx(this._lines[index], rect.x + (gap / 2), rect.y, rect.width);
};

Window_BattleLog.prototype.processDrawIcon = function(iconIndex, textState) {
	if (textState.drawing) {
		this.drawIcon(iconIndex, textState.x + 2, textState.y + 6);
	}
	textState.x += ImageManager.iconWidth + 4;
};

Window_BattleLog.prototype.drawItemBackground = function(index) {
	const rect = this.lineRect(index);
	const even = index % 2 === 0;
	this.drawBackgroundRect(rect, even);
};

Window_BattleLog.prototype.drawBackgroundRect = function(rect, even) {
	const params = TLB.Param.SKABH;
	let image;
	if (even) image = params.log_evenstripe;
	else image = params.log_oddstripe;
	const bitmap = ImageManager.loadMenu(image);
	this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y);
};

class Window_BattleHUD extends Window_StatusBase {
	constructor(rect) {
		super(rect);

		this._normalGradient = ["#d9c5de", "#efe6f1", "#d9c5de"];
		this._hpGradient = ["#fad162", "#e7955d"];
		this._mpGradient = ["#77daff", "#71a7db"];
		this._wpGradient = ["#e1e748", "#8ea644"];

		this._showWp = eval(TLB.Param.SKAUIB.showWillpower);
		this._showCorruption = eval(TLB.Param.SKAUIB.showCorruption);
		this._showLewdness = eval(TLB.Param.SKAUIB.showLewdness);
		this._showVice = eval(TLB.Param.SKAUIB.showVice);

		this.createSprites();
		this.createParty();

		this.opacity = 0;

		this.contents.letterSpacing = 1;
	}

	createSprites() {
		const settings = TLB.Param.SKABH.battlehud_settings;
		const leaderPosition = { x: 85, y: 32 };
		const spritePositions = [
			leaderPosition,
			settings.slot1position,
			settings.slot2position,
			settings.slot3position
		];

		this._partyFrames = [];
		for (let i = 0; i < spritePositions.length; ++i) {
			const pos = spritePositions[i];
			const slotSprite = this.createSlot(i);
			slotSprite.position.set(pos.x, pos.y);
			this.addChild(slotSprite);
			this._partyFrames.push(slotSprite);
		}
	}

	createSlot(slotIndex) {
		let bitmapSize;
		let maskPos;
		let maskRadius;

		if (slotIndex === 0) {
			bitmapSize = 150;
			maskPos = 75;
			maskRadius = 64;
		} else {
			bitmapSize = 123;
			maskPos = 61;
			maskRadius = 56;
		}

		const container = new PIXI.Container();
		container._baseLayer = new Sprite();
		container._baseLayer.bitmap = new Bitmap(bitmapSize, bitmapSize);
		container.addChild(container._baseLayer);
		container._gaugeContainer = new PIXI.Container();
		container.addChild(container._gaugeContainer);
		container._faceLayer = new Sprite();
		container._faceLayer.bitmap = new Bitmap(ImageManager.faceWidth, ImageManager.faceHeight);
		container.addChild(container._faceLayer);
		container._overlayLayer = new Sprite();
		container._overlayLayer.bitmap = new Bitmap(bitmapSize, bitmapSize);
		container.addChild(container._overlayLayer);
		container._attributeLayer = new Sprite();
		container._attributeLayer.bitmap = new Bitmap(250, 180);
		container._attributeLayer.y -= 16;
		container.addChild(container._attributeLayer);
		container._stateContainer = new PIXI.Container();
		container.addChild(container._stateContainer);
		container._textLayer = new Sprite();
		container._textLayer.bitmap = new Bitmap(250, 180);
		container._textLayer.y -= 16;
		container.addChild(container._textLayer);

		container._attributeLayer.bitmap.letterSpacing = container._textLayer.bitmap.letterSpacing = 1;

		const maskCircle = new PIXI.Graphics()
			.beginFill("#ffffff")
			.drawCircle(maskPos, maskPos, maskRadius)
			.endFill();

		container._faceLayer.addChild(maskCircle);
		container._faceLayer.mask = maskCircle;

		return container;
	}

	drawFace(faceName, faceIndex, x, y, width, height, destBmp, destWidth, destHeight) {
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
		bitmap.addLoadListener(() => destBmp.blt(bitmap, sx, sy, sw, sh, dx, dy, destWidth, destHeight));
	}

	placeSKAGauge(actor, type, x, y) {
		const key = `slot${actor.index()}-gauge-${type}`;
		const spriteClass = Sprite_SKAItemGauge;
		const sprite = this.createInnerSprite(key, spriteClass, type, actor.index());
		sprite.setup(actor, type);
		sprite.move(x, y);
		sprite.show();
	}

	drawAttributeValue(maxWidth, value, x, y) {
		const frame = this._partyFrames[0];
		const bitmap = frame._textLayer.bitmap;
		const textOptions = {
			outlineGradient: ["#4f4f4f", "#000000"],
			outlineThickness: 2,
			dropShadow: true,
			dropShadowX: 0,
			dropShadowY: 2,
			shadowOpacity: 0.75,
			bitmap: bitmap
		};
		this.contents.fontFace = bitmap.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = bitmap.fontSize = 18;
		this.drawGradientText(value, this._normalGradient, x, y, maxWidth, "center", textOptions);
	}

	drawValue(maxWidth, value, maxValue, x, y, gradient, slot) {
		const frame = this._partyFrames[slot];
		const bitmap = frame._textLayer.bitmap;
		const textOptions = {
			outlineGradient: ["#4f4f4f", "#000000"],
			outlineThickness: 2,
			dropShadow: true,
			dropShadowX: 0,
			dropShadowY: 2,
			shadowOpacity: 0.75,
			bitmap: bitmap,
			bold: true
		};
		this.contents.fontFace = bitmap.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = bitmap.fontSize = 18;
		this.drawGradientText(value, gradient, x, y, maxWidth, "left", textOptions);
		let textWidth = this.textWidth(value);
		this.contents.fontSize = bitmap.fontSize = 12;
		textWidth += this.textWidth(" ");
		this.contents.fontFace = bitmap.fontFace = 'fuckboi-sans';
		this.contents.fontSize = bitmap.fontSize = 17;
		this.drawGradientText("/", gradient, x + textWidth, y, maxWidth, "left", textOptions);
		textWidth += this.textWidth("/");
		this.contents.fontSize = bitmap.fontSize = 6;
		textWidth += this.textWidth(" ");
		this.contents.fontFace = bitmap.fontFace = 'franklin-gothic-demi-cond';
		this.contents.fontSize = bitmap.fontSize = 18;
		this.drawGradientText(maxValue, gradient, x + textWidth, y, maxWidth, "left", textOptions);
	}

	placeStateIcon(actor, x, y, iconId) {
		const key = `actor${actor.actorId()}-stateIcon${iconId}`;
		const sprite = this.createInnerSprite(key, Sprite_StateIcon, null, actor.index());
		sprite._iconId = iconId;
		sprite._iconIndex = iconId;
		sprite._animationIndex = iconId;
		sprite._originalAnimationIndex = iconId;
		sprite._lastStateCount = 0;
		sprite.setup(actor);
		sprite.move(x, y);
		sprite.show();
	};

	createInnerSprite(key, spriteClass, type, targetIndex) {
		const dict = this._additionalSprites;
		if (dict[key]) {
			return dict[key];
		} else {
			const sprite = new spriteClass(type);
			dict[key] = sprite;
			if (type) this.addInnerGaugeChild(sprite, targetIndex);
			else this.addInnerStateChild(sprite, targetIndex);
			return sprite;
		}
	}

	addInnerGaugeChild(child, targetIndex) {
		const frame = this._partyFrames[targetIndex];
		this._innerChildren.push(child);
		frame._gaugeContainer.addChild(child);
	}

	addInnerStateChild(child, targetIndex) {
		const frame = this._partyFrames[targetIndex];
		this._innerChildren.push(child);
		if (frame._stateContainer.children.length < 3) frame._stateContainer.addChild(child);
	}

	createParty() {
		const params = TLB.Param.SKABH;
		this._leadFaceSize = 150;
		this._leadHpX = 129;
		this._leadHpY = 28;
		this._leadMpX = 144;
		this._leadMpY = 65;
		this._wpX = 133;
		this._wpY = 102;
		const settings = params.battlehud_settings;
		let outerFrame;
		let innerFrame;
		let overlay;
		let innermostFrame;
		this._faceSize = 123;
		this._hpX = 112;
		this._hpY = 34;
		this._mpX = 114;
		this._mpY = 71;

		for (let i = 0; i < Math.min($gameParty.size(), 4); i++) {
			const frame = this._partyFrames[i];
			frame._baseLayer.bitmap.clear();
			frame._overlayLayer.bitmap.clear();
			const member = $gameParty.members()[i];
			if (i === 0) {
				outerFrame = params.battlehud_hudwindow_leader_outerframe;
				innerFrame = params.battlehud_hudwindow_leader_innerframe;
				overlay = params.battlehud_hudwindow_leader_overlay;
				innermostFrame = params.battlehud_hudwindow_leader_innermostframe;
				this.placeSKAGauge(member, "hp", this._leadHpX, this._leadHpY);
				this.placeSKAGauge(member, "mp", this._leadMpX, this._leadMpY);
				if (this._showWp) this.placeSKAGauge(member, "wp", this._wpX, this._wpY);
			} else {
				outerFrame = settings.party_outerframe;
				innerFrame = settings.party_innerframe;
				overlay = settings.party_overlay;
				innermostFrame = settings.party_innermostframe;
				this.placeSKAGauge(member, "hp", this._hpX, this._hpY);
				this.placeSKAGauge(member, "mp", this._mpX, this._mpY);
			}
			TLB.SKABattleHUD.displayImage(outerFrame, 0, 0, frame._baseLayer.bitmap, `Battle HUD slot ${i} outer frame not set.`);
			TLB.SKABattleHUD.displayImage(innerFrame, 0, 0, frame._baseLayer.bitmap, `Battle HUD slot ${i} inner frame not set.`);
			TLB.SKABattleHUD.displayImage(overlay, 0, 0, frame._overlayLayer.bitmap, `Battle HUD slot ${i} overlay not set.`);
			TLB.SKABattleHUD.displayImage(innermostFrame, 0, 0, frame._overlayLayer.bitmap, `Battle HUD slot ${i} innermost frame not set.`);
			if (i === 0 && member.actorId() === 1) {
				this.drawCorruption(params.battlehud_hudwindow_leader_corruptionicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
				this.drawLewdness(params.battlehud_hudwindow_leader_lewdnessicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
				this.drawVice(params.battlehud_hudwindow_leader_viceicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
			}

			const stateIconY = i === 0 ? 139 : 113;
			for (let j = 0; j < 3; ++j) {
				this.placeStateIcon($gameParty.members()[i], 0, stateIconY, j);
			}
		}
	}

	update() {
		this.contents.clear();
		this.updateParty();
	}

	drawCorruption(icon, frame, textFrame) {
		if (this._showCorruption) {
			TLB.SKABattleHUD.displayImage(icon, 51, 0, frame, `Battle HUD slot 0 corruption icon not set.`);
			const currentVar = TLB.Param.SKAB.currentCorruptionVar;
			const corruption = $gameVariables.value(currentVar);
			if (corruption !== frame._previousCorruption) {
				textFrame.clearRect(65, 3, 20, this.lineHeight());
				this.drawAttributeValue(20, corruption, 65, 3);
				frame._previousCorruption = corruption;
			}
		}
	}

	drawLewdness(icon, frame, textFrame) {
		if (this._showLewdness) {
			TLB.SKABattleHUD.displayImage(icon, 97, 13, frame, `Battle HUD slot 0 lewdness icon not set.`);
			const currentVar = TLB.Param.SKAB.currentLewdnessVar;
			const lewdness = $gameVariables.value(currentVar);
			if (lewdness !== frame._previousLewdness) {
				textFrame.clearRect(107, 14, 20, this.lineHeight());
				this.drawAttributeValue(20, lewdness, 107, 14);
				frame._previousLewdness = lewdness;
			}
		}
	}

	drawVice(icon, frame, textFrame) {
		if (this._showVice) {
			TLB.SKABattleHUD.displayImage(icon, 13, 15, frame, `Battle HUD slot 0 vice icon not set.`);
			const currentVar = TLB.Param.SKAB.currentViceVar;
			const vice = $gameVariables.value(currentVar);
			if (vice !== frame._previousVice) {
				textFrame.clearRect(23, 14, 20, this.lineHeight());
				this.drawAttributeValue(20, vice, 23, 14);
				frame._previousVice = vice;
			}
		}
	}

	updateParty() {
		const params = TLB.Param.SKABH;
		for (let i = 0; i < 4; i++) {
			if ($gameParty.battleMembers()[i]) this._partyFrames[i].visible = true;
			else this._partyFrames[i].visible = false;
		}
		for (const member of $gameParty.battleMembers()) {
			const frame = this._partyFrames[member.index()];
			if (member.index() === 0) {
				const hp = member.hp;
				const mhp = member.mhp;
				if (hp !== frame._lastHp || mhp !== frame._lastMhp) {
					frame._textLayer.bitmap.clearRect(this._leadHpX + 21, this._leadHpY + 20, 100, this.lineHeight());
					this.drawValue(100, member.hp, member.mhp, this._leadHpX + 21, this._leadHpY + 20, this._hpGradient, 0);
					frame._lastHp = hp;
					frame._lastMhp = mhp;
				}
				const mp = member.mp;
				const mmp = member.mmp;
				if (mp !== frame._lastMp || mmp !== frame._lastMmp) {
					frame._textLayer.bitmap.clearRect(this._leadMpX + 8, this._leadMpY + 20, 100, this.lineHeight());
					this.drawValue(100, member.mp, member.mmp, this._leadMpX + 8, this._leadMpY + 20, this._mpGradient, 0);
					frame._lastMp = mp;
					frame._lastMmp = mmp;
				}
				const faceName = member.faceName();
				const faceIndex = member.faceIndex();
				if (faceName !== frame._lastFace || faceIndex !== frame._lastFaceIndex) {
					frame._faceLayer.bitmap.clear();
					this.drawFace(faceName, faceIndex, 0 + (member.actor().statusFaceOffsetX || 0), 0 + (member.actor().statusFaceOffsetY || 0), ImageManager.faceWidth, ImageManager.faceHeight, frame._faceLayer.bitmap, this._leadFaceSize, this._leadFaceSize);
					frame._lastFace = faceName;
					frame._lastFaceIndex = faceIndex;
				}
				if (member.actorId() === 1) {
					this.drawCorruption(params.battlehud_hudwindow_leader_corruptionicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
					this.drawLewdness(params.battlehud_hudwindow_leader_lewdnessicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
					this.drawVice(params.battlehud_hudwindow_leader_viceicon, frame._attributeLayer.bitmap, frame._textLayer.bitmap);
				} else {
					frame._attributeLayer.bitmap.clear();
					frame._textLayer.bitmap.clearRect(65, 3, 20, this.lineHeight());
					frame._textLayer.bitmap.clearRect(107, 14, 20, this.lineHeight());
					frame._textLayer.bitmap.clearRect(23, 14, 20, this.lineHeight());
					delete frame._attributeLayer.bitmap._previousCorruption;
					delete frame._attributeLayer.bitmap._previousLewdness;
					delete frame._attributeLayer.bitmap._previousVice;
				}
			} else {
				const hp = member.hp;
				const mhp = member.mhp;
				if (hp !== frame._lastHp || mhp !== frame._lastMhp) {
					frame._textLayer.bitmap.clearRect(this._hpX + 13, this._hpY + 20, 100, this.lineHeight());
					this.drawValue(100, member.hp, member.mhp, this._hpX + 13, this._hpY + 20, this._hpGradient, member.index());
					frame._lastHp = hp;
					frame._lastMhp = mhp;
				}
				const mp = member.mp;
				const mmp = member.mmp;
				if (mp !== frame._lastMp || mmp !== frame._lastMmp) {
					frame._textLayer.bitmap.clearRect(this._mpX + 5, this._mpY + 20, 100, this.lineHeight());
					this.drawValue(100, member.mp, member.mmp, this._mpX + 5, this._mpY + 20, this._mpGradient, member.index());
					frame._lastMp = mp;
					frame._lastMmp = mmp;
				}
				const faceName = member.faceName();
				const faceIndex = member.faceIndex();
				if (faceName !== frame._lastFace || faceIndex !== frame._lastFaceIndex) {
					frame._faceLayer.bitmap.clear();
					this.drawFace(faceName, faceIndex, 0 + (member.actor().statusFaceOffsetX || 0), 0 + (member.actor().statusFaceOffsetY || 0), ImageManager.faceWidth, ImageManager.faceHeight, frame._faceLayer.bitmap, this._faceSize, this._faceSize);
					frame._lastFace = faceName;
					frame._lastFaceIndex = faceIndex;
				}
			}
			this.updateGauges(frame, member);
			this.updateStates(frame, member);
			this.updateStateIconPlacement(frame._stateContainer, member);
		}
		const wpGauge = this._additionalSprites[`slot0-gauge-wp`];
		if (wpGauge && $gameParty.leader().actorId() === 1 && this._showWp) {
			const frame = this._partyFrames[0];
			wpGauge.show();
			const currentVarId = TLB.Param.SKAB.currentWpVar;
			const maxVarId = TLB.Param.SKAB.maxWpVar;
			const currentValue = $gameVariables.value(currentVarId);
			const maxValue = $gameVariables.value(maxVarId);
			if (currentValue !== frame._lastWp || maxValue !== frame._lastMwp) {
				frame._textLayer.bitmap.clearRect(this._wpX + 5, this._wpY + 20, 100, this.lineHeight());
				this.drawValue(100, currentValue, maxValue, this._wpX + 5, this._wpY + 20, this._wpGradient, 0);
				frame._lastWp = currentValue;
				frame._lastMwp = maxValue;
			}
		} else if (wpGauge) {
			this._partyFrames[0]._textLayer.bitmap.clearRect(this._wpX + 5, this._wpY + 20, 100, this.lineHeight());
			wpGauge.hide();
		}
	}

	updateGauges(frame, member) {
		for (const child of frame._gaugeContainer.children) {
			if (child._battler !== member) {
				child.setup(member, child._statusType);
			}
			if (child.update) {
				child.update();
			}
		}
	}

	updateStates(frame, member) {
		for (const child of frame._stateContainer.children) {
			if (child._battler !== member) {
				child.setup(member);
			}
			if (child.update) {
				child.update();
			}
		}
	}

	updateStateIconPlacement(container, actor) {
		const numStates = actor.allIcons().length;
		const x = actor.index() === 0 ? 43 : 29;
		switch (numStates) {
			case 0:
			case 1:
				container.children[0].x = x + ImageManager.iconWidth + 1;
				break;
			case 2:
				container.children[0].x = x + ImageManager.iconWidth / 2;
				container.children[1].x = x + ImageManager.iconWidth * 1.5;
				break;
			default:
				container.children[0].x = x;
				container.children[1].x = x + ImageManager.iconWidth + 1;
				container.children[2].x = x + ImageManager.iconWidth * 2 + 2;
				break;
		}
	}

	initializeGauge(member, type, x, y) {
		if (!this._additionalSprites[`slot${member.index()}-gauge-${type}`]) this.placeSKAGauge(member, type, x, y);
	}
}

Window_BattleStatus.prototype.placeStateIcon = function(actor, x, y) {
	// Replace with blank function to avoid duplication of icons
}