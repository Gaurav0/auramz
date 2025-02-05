// Trilobytes - Star Knightess Aura Extra Windows/
// TLB_SKAExtraWindows.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAExtraWindows = true;

window.TLB = TLB || {};
TLB.SKAExtraWindows = TLB.SKAExtraWindows || {};

/*:
 * @target MZ
 * @plugindesc This plugin adds extra information windows to the battle
 * and map scenes.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which creates a number of extra information windows
 * used in battle and on the map in SKA for various temporary mechanics.
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
 * There shouldn't be any compatibility issues.
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
 * @param background_image
 * @text Background Image
 * @desc The image to use as the window background.
 * @type file
 * @dir img/menu/
 * @default Battle_HUD/BATTLE_HUD_PERIKA_BG
 *
 * @param party_position
 * @text Party Position
 * @type struct<coordinate>
 * @default {"x":"868","y":"628"}
 *
 * @param enemy_position
 * @text Enemy Position
 * @type struct<coordinate>
 * @default {"x":"-223","y":"628"}
 *
 * @param font_face
 * @text Font Face
 * @desc The font to use in the windows.
 * @default franklin-gothic-demi-cond
 *
 * @param font_size
 * @text Font Size
 * @desc The size of font to use.
 * @type number
 * @min 1
 * @max 99
 * @default 24
 *
 * @param heading_gradient
 * @text Heading Gradient
 * @desc The gradient to use for the heading text.
 * @default ["#e4d594", "#e0a65b"]
 *
 * @param value_gradient
 * @text Value Gradient
 * @desc The gradient to use for the value text.
 * @default ["#d9c5dd", "#eee5f1", "#d9c4de"]
 *
 * @param outline_gradient
 * @text Outline Gradient
 * @desc The gradient to use for the text outline.
 * @default ["#4f4f4f", "#000000"]
 *
 * @param window_settings
 * @text Window Settings
 * @type struct<windowSettings>[]
 * @default ["{\"position\":\"0\",\"occasion\":\"0\",\"heading\":\"PARTY PERIKA\",\"switch\":\"507\",\"variable\":\"504\"}","{\"position\":\"1\",\"occasion\":\"0\",\"heading\":\"ENEMY PERIKA\",\"switch\":\"509\",\"variable\":\"505\"}","{\"position\":\"0\",\"occasion\":\"0\",\"heading\":\"Resistance\",\"switch\":\"169\",\"variable\":\"222\"}","{\"position\":\"0\",\"occasion\":\"0\",\"heading\":\"Wind\",\"switch\":\"170\",\"variable\":\"745\"}","{\"position\":\"0\",\"occasion\":\"0\",\"heading\":\"Air\",\"switch\":\"68\",\"variable\":\"603\"}","{\"position\":\"0\",\"occasion\":\"2\",\"heading\":\"Trust\",\"switch\":\"604\",\"variable\":\"220\"}"]
 *
 */
/*~struct~windowSettings:
 *
 * @param position
 * @text Position
 * @type select
 * @option Party
 * @value 0
 * @option Enemy
 * @value 1
 * @default 0
 *
 * @param occasion
 * @text Occasion
 * @type select
 * @option Both
 * @value 0
 * @option Battle
 * @value 1
 * @option Map
 * @value 2
 * @default 0
 *
 * @param heading
 * @text Heading
 *
 * @param switch
 * @text Activation Switch ID
 * @type switch
 *
 * @param variable
 * @text Variable ID
 * @type variable
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

window.parameters = PluginManager.parameters('TLB_SKAExtraWindows');
TLB.Param = TLB.Param || {};
TLB.Param.SKAEW = TLB.Param.SKAEW || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAEW);

Scene_Message.prototype.createExtraWindows = function() {
    ImageManager.loadMenu(TLB.Param.SKAEW.background_image);
    this._extraWindows = TLB.Param.SKAEW.window_settings.filter(extraWindow => {
        const occasion = extraWindow.occasion;
        return occasion === 0 || (this instanceof Scene_Battle && occasion === 1) || (this instanceof Scene_Map && occasion === 2)
    }).map(windowSettings => {
        const position = windowSettings.position;
        const rect = position === 0 ? this.extraPartyWindowRect() : this.extraEnemyWindowRect();
        return new Window_ExtraInfo(rect, windowSettings);
    });
};

TLB.SKAExtraWindows.Scene_Message_start = Scene_Message.prototype.start;
Scene_Message.prototype.start = function() {
    TLB.SKAExtraWindows.Scene_Message_start.call(this);
    for (const window of (this._extraWindows || [])) {
        this.addWindow(window);
    }
};

Scene_Message.prototype.extraPartyWindowRect = function() {
    const params = TLB.Param.SKAEW;
    const wx = params.party_position.x;
    const wy = params.party_position.y;
    const ww = 165;
    const wh = 85;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Message.prototype.extraEnemyWindowRect = function() {
    const params = TLB.Param.SKAEW;
    const wx = params.enemy_position.x;
    const wy = params.enemy_position.y;
    const ww = 165;
    const wh = 85;
    return new Rectangle(wx, wy, ww, wh);
};

TLB.SKAExtraWindows.Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    TLB.SKAExtraWindows.Scene_Map_create.call(this);
    this.createExtraWindows();
};

TLB.SKAExtraWindows.Scene_Battle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
    TLB.SKAExtraWindows.Scene_Battle_create.call(this);
    this.createExtraWindows();
};

class Window_ExtraInfo extends Window_Base {
    constructor(rect, windowSettings) {
		super(rect);
		const params = TLB.Param.SKAEW;
        this.openness = 0;
        this._backgroundSprite = new Sprite();
        const image = params.background_image;
        const bmp = ImageManager.loadMenu(image);
        this._backgroundSprite.bitmap = bmp;
        this.addChildAt(this._backgroundSprite, 0);
        this.contents.fontFace = params.font_face;
        this.contents.fontSize = params.font_size;
        this._headingGradient = params.heading_gradient;
        this._valueGradient = params.value_gradient;
        this._textOptions = {
            outlineThickness: 2,
            outlineGradient: params.outline_gradient,
            dropShadow: true,
            dropShadowX: 0,
            dropShadowY: 2,
            shadowOpacity: 0.75
        }
        this._contentsSprite.y -= 5;
        this.opacity = 0;
        this._heading = windowSettings.heading;
        this._switch = windowSettings.switch;
        this._valueVar = windowSettings.variable;
    }

    refresh() {
        const value = $gameVariables.value(this._valueVar);
        if (value !== this._value) {
            this.contents.clear();
            this.drawGradientText(this._heading, this._headingGradient, 0, 0, this.textWidth(this._heading), "left", this._textOptions);
            this._value = value;
            this.drawGradientText(this.valueAsString(value), this._valueGradient, 0, 24, this.textWidth(this._value), "left", this._textOptions);
        }
    }

    valueAsString = function(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    update() {
        if ($gameSwitches.value(this._switch)) {
            this.open();
        } else {
            this.close();
        }
        if (this.openness < 255) this._backgroundSprite.hide();
        else this._backgroundSprite.show();
        super.update();
        this.refresh();
    }
}
