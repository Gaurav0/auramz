// Trilobytes - Star Knightess Aura Controller Buttons/
// TLB_SKAControllerButtons.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAControllerButtons = true;

window.TLB = TLB || {};
TLB.SKAControllerButtons = TLB.SKAControllerButtons || {};

/*:
 * @target MZ
 * @plugindesc This plugin adds contextual button icons to certain
 * control help areas when a controller is plugged in.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which adds button icons for controllers.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * All parameeters are explained in their respective help sections.
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
 * @param iconMapper
 * @text Icon Mapper
 * 
 * @param im_a
 * @parent iconMapper
 * @text A
 * @desc The icon to use for the controller's A button.
 * @default 324
 * 
 * @param im_b
 * @parent iconMapper
 * @text B
 * @desc The icon to use for the controller's B button.
 * @default 325
 * 
 * @param im_x
 * @parent iconMapper
 * @text X
 * @desc The icon to use for the controller's X button.
 * @default 326
 * 
 * @param im_y
 * @parent iconMapper
 * @text Y
 * @desc The icon to use for the controller's Y button.
 * @default 327
 * 
 * @param im_lb
 * @parent iconMapper
 * @text LB
 * @desc The icon to use for the controller's LB button.
 * @default 328
 * 
 * @param im_rb
 * @parent iconMapper
 * @text RB
 * @desc The icon to use for the controller's RB button.
 * @default 329
 * 
 * @param im_up
 * @parent iconMapper
 * @text Up
 * @desc The icon to use for the controller's D-pad up button.
 * @default 320
 * 
 * @param im_down
 * @parent iconMapper
 * @text Down
 * @desc The icon to use for the controller's D-pad down button.
 * @default 321
 * 
 * @param im_left
 * @parent iconMapper
 * @text Left
 * @desc The icon to use for the controller's D-pad left button.
 * @default 322
 * 
 * @param im_right
 * @parent iconMapper
 * @text Right
 * @desc The icon to use for the controller's D-pad right button.
 * @default 323
 * 
 * @param code_blacklist
 * @text Code Blacklist
 * @desc A list of key codes that won't be used in the text API.
 * @type number[]
 * @default ["98","100","102","104"]
 *
 */

window.parameters = PluginManager.parameters('TLB_SKAControllerButtons');
TLB.Param = TLB.Param || {};
TLB.Param.SKACB = TLB.Param.SKACB || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKACB);

Input.iconMapper = {
    "ok": TLB.Param.SKACB.im_a,
    "cancel": TLB.Param.SKACB.im_b,
    "shift": TLB.Param.SKACB.im_x,
    "menu": TLB.Param.SKACB.im_y,
    "pageup": TLB.Param.SKACB.im_lb,
    "pagedown": TLB.Param.SKACB.im_rb,
    "up": TLB.Param.SKACB.im_up,
    "down": TLB.Param.SKACB.im_down,
    "left": TLB.Param.SKACB.im_left,
    "right": TLB.Param.SKACB.im_right,
};

Input.isControllerConnected = function() {
    return navigator.getGamepads && navigator.getGamepads()[0] !== null;
};

Input.getIconOrText = function(buttonName) {
    if (Input.isControllerConnected() && Input.iconMapper[buttonName]) {
        return `i[${Input.iconMapper[buttonName]}]`;
    } else {    
        let codes = Object.keys(Input.keyMapper).filter(key => Input.keyMapper[key] === buttonName).reverse();
        for (const code of codes) {
            if (TLB.Param.SKACB.code_blacklist.contains(Number(code))) continue;
            const codeToString = TLB.Param.SKAOM.codeToString.find(obj => obj.code === Number(code))?.string;
            if (codeToString) return codeToString;
            const stringFromCode = String.fromCharCode(code);
            if (stringFromCode) return stringFromCode;    
        }
        return `${buttonName} (no mapping)`;
    }
};

TLB.SKAControllerButtons.Scene_Map_createMenuButton = Scene_Map.prototype.createMenuButton;
Scene_Map.prototype.createMenuButton = function() {
    if (Input.isControllerConnected()) {
        this._menuButton = new Sprite_ControllerButton("menu");
        this._menuButton.x = Graphics.boxWidth - this._menuButton.width - 4;
        this._menuButton.y = this.buttonY();
        this._menuButton.visible = false;
        this.addWindow(this._menuButton);
    } else {
        TLB.SKAControllerButtons.Scene_Map_createMenuButton.call(this);
    }    
};

class Sprite_ControllerButton extends Sprite_Button {
    constructor(buttonType) {
        super(buttonType);
    }

    setupFrames() {
        const iconIndex = Input.iconMapper[this._buttonType];
        const width = this.blockWidth();
        const height = this.blockHeight();
        const x = (iconIndex % 16) * width;
        const y = Math.floor(iconIndex / 16) * height;
        this.loadButtonImage();
        this.setColdFrame(x, y, width, height);
        this.setHotFrame(x, y, width, height);
        this.updateFrame();
        this.updateOpacity();
    }

    blockWidth() {
        return 32;
    }

    blockHeight() {
        return 32;
    }

    loadButtonImage() {
        this.bitmap = ImageManager.loadSystem("IconSet");
    }

    checkBitmap() {
        //
    }
}