// Trilobytes - Star Knightess Aura Select Skill/
// TLB_SKASelectSkill.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKASelectSkill = true;

window.TLB = window.TLB || {};
TLB.SKASelectSkill = TLB.SKASelectSkill || {};

/*:
 * @target MZ
 * @plugindesc This plugin provides a plugin command that works the
 * same way as the "Select Item" command, but for skills.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which adds a "Select Skill" window which works the
 * same way as the Select Item command does. The selected skill's ID will be
 * stored in a variable and can be processed from there as you would an item
 * choice.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * None
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * None
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 *
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
 * Copyright 2023 Auradev
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
 * @command selectSkill
 * @text Select Skill
 * @desc Opens the skill selection window.
 *
 * @arg filter
 * @text Filter
 * @desc The filter to use for whether a skill is included (Javascript).
 *
 * @arg labelMod
 * @text Label Modifier
 * @desc The function to apply to the skill's name when displaying it.
 *
 * @arg skillIdVariable
 * @text Skill ID Variable
 * @desc The ID of the variable that holds the selected skill's ID.
 * @type variable
 * @default 0
 *
 * @arg actorId
 * @text Actor ID
 * @desc The ID of the actor to use for skill selection.
 * @type actor
 * @default 1
 *
 */

 //----------------------------------------------------------------------------
 //
 // Parameter conversion
 //
 //----------------------------------------------------------------------------

 window.parameters = PluginManager.parameters('TLB_SKASelectSkill');
 TLB.Param = TLB.Param || {};
 TLB.Param.SKASS = TLB.Param.SKASS || {};

 TLB.SKABase.parseParameters(parameters, TLB.Param.SKASS);

PluginManager.registerCommand("TLB_SKASelectSkill", "selectSkill", args => {
    const variableId = parseInt(args.skillIdVariable);
    const labelMod = args.labelMod;
	const filter = args.filter;
	const actorId = parseInt(args.actorId);
	$gameParty.setMenuActor($gameActors.actor(actorId));
	$gameMessage.setSkillChoice(variableId, labelMod, filter);
	if ($gameMap._interpreter._childInterpreter) {
		$gameMap._interpreter._childInterpreter.setWaitMode("message");
	} else {
		$gameMap._interpreter.setWaitMode("message");
	}
});

TLB.SKASelectSkill.Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function () {
    TLB.SKASelectSkill.Game_Message_clear.call(this);
    this._skillChoiceVariableId = 0;
    this._skillChoiceLabelMod = "";
    this._skillChoiceFilter = "";
};

Game_Message.prototype.skillChoiceVariableId = function() {
    return this._skillChoiceVariableId;
};

Game_Message.prototype.skillChoiceLabelMod = function() {
    return this._skillChoiceLabelMod || "";
}

Game_Message.prototype.skillChoiceFilter = function() {
    return this._skillChoiceFilter || "";
};

Game_Message.prototype.setSkillChoice = function(variableId, labelMod, filter) {
    this._skillChoiceVariableId = variableId;
    this._skillChoiceLabelMod = labelMod;
    this._skillChoiceFilter = filter;
};

Game_Message.prototype.isSkillChoice = function() {
    return this._skillChoiceVariableId > 0;
};

TLB.SKASelectSkill.Game_Message_isBusy = Game_Message.prototype.isBusy;
Game_Message.prototype.isBusy = function () {
    return TLB.SKASelectSkill.Game_Message_isBusy.call(this) || this.isSkillChoice();
};

TLB.SKASelectSkill.Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function (params) {
	const result = TLB.SKASelectSkill.Game_Interpreter_command101.call(this, params);
	if (result && this.nextEventCode() === 357 && this._list[this._index + 1].parameters[0] === 'auramz/TLB_SKASelectSkill') {
		this._index++;
		PluginManager.callCommand(this, 'TLB_SKASelectSkill', 'selectSkill', this.currentCommand().parameters[3]);
		this.setWaitMode("message");
		return true;
	}
	return result;
};

TLB.SKASelectSkill.Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
Scene_Message.prototype.createAllWindows = function() {
    TLB.SKASelectSkill.Scene_Message_createAllWindows.call(this);
    this.createEventSkillWindow();
    const messageWindow = this._messageWindow;
    messageWindow.setEventSkillWindow(this._eventSkillWindow);
    this._eventSkillWindow.setMessageWindow(messageWindow);
}

Scene_Message.prototype.createEventSkillWindow = function() {
    const rect = this.eventItemWindowRect();
	this._eventSkillWindow = new Window_EventSkill(rect);
	this._eventSkillWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._eventSkillWindow);
};

TLB.SKASelectSkill.Window_Message_startInput = Window_Message.prototype.startInput;
Window_Message.prototype.startInput = function () {
    if ($gameMessage.isSkillChoice()) {
        this._eventSkillWindow.start();
        return true;
    } else {
        return TLB.SKASelectSkill.Window_Message_startInput.call(this);
    }
};

Window_Message.prototype.setEventSkillWindow = function(eventSkillWindow) {
    this._eventSkillWindow = eventSkillWindow;
};

TLB.SKASelectSkill.Window_Message_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
Window_Message.prototype.isAnySubWindowActive = function() {
    return TLB.SKASelectSkill.Window_Message_isAnySubWindowActive.call(this) || this._eventSkillWindow.active;
};

class Window_EventSkill extends Window_SkillList {
    constructor(rect) {
        super(rect);
        this.createCancelButton();
        this.openness = 0;
        this.deactivate();
        this.setHandler("ok", this.onOk.bind(this));
        this.setHandler("cancel", this.onCancel.bind(this));
    }

    setMessageWindow(messageWindow) {
        this._messageWindow = messageWindow;
    }

    createCancelButton() {
        if (ConfigManager.touchUI) {
            this._cancelButton = new Sprite_Button("cancel");
            this._cancelButton.visible = false;
            this.addChild(this._cancelButton);
        }
    }

	start() {
		this.setActor($gameActors.actor($gameParty._menuActorId));
        this.refresh();
        this.updatePlacement();
        this.placeCancelButton();
        this.forceSelect(0);
        this.open();
        this.activate();
	}

	open() {
		super.open();
		this.showHelpWindow();
	}

	close() {
		super.close();
		this.hideHelpWindow();
	}

	updateHelp() {
		this.setHelpWindowItem(this.item());
	};

    update() {
        Window_Selectable.prototype.update.call(this);
        this.updateCancelButton();
    }

    updateCancelButton() {
        if (this._cancelButton) {
            this._cancelButton.visible = this.isOpen();
        }
    }

    updatePlacement() {
        if (this._messageWindow.y >= Graphics.boxHeight / 2) {
            this.y = 0;
        } else {
            this.y = Graphics.boxHeight - this.height;
        }
    }

    placeCancelButton() {
        if (this._cancelButton) {
            const spacing = 8;
            const button = this._cancelButton;
            if (this.y === 0) {
                button.y = this.height + spacing;
            } else if (this._messageWindow.y >= Graphics.boxHeight / 4) {
                const distance = this.y - this._messageWindow.y;
                button.y = -button.height - spacing - distance;
            } else {
                button.y = -button.height - spacing;
            }
            button.x = this.width - button.width - spacing;
        }
    }

    includes(item) {
        return $gameMessage.skillChoiceFilter().length > 0 ? eval($gameMessage.skillChoiceFilter()) : true;
    }

    isEnabled(item) {
        return item;
    }

    drawItem(index) {
        const skill = this.itemAt(index);
        if (skill) {
            const rect = this.itemLineRect(index);
            this.changePaintOpacity(this.isEnabled(skill));
            this.drawItemName(skill, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    }

    itemName(item, actor) {
        let name = Window_Base.prototype.itemName.call(this, item, actor);
        if ($gameMessage.skillChoiceLabelMod().length > 0) {
            name = eval($gameMessage.skillChoiceLabelMod());
        }
        return name;
    }

    onOk() {
        const item = this.item();
        const itemId = item ? item.id : 0;
        $gameVariables.setValue($gameMessage.skillChoiceVariableId(), itemId);
        this._messageWindow.terminateMessage();
        this.close();
    }

    onCancel() {
        $gameVariables.setValue($gameMessage.skillChoiceVariableId(), 0);
        this._messageWindow.terminateMessage();
        this.close();
    }
}
