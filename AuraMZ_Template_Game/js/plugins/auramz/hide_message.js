//=============================================================================
// RPG Maker MZ - Hide Message
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/08/02
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Hide Message
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help hide_message.js
 *
 * This plugin allows hiding the message box.
 *
 */

(() => {
	// Toggle visibility on shift or cancel
	Window_Message.prototype.isToggleVisibility = function() {
		return Input.isTriggered("hide")
			|| TouchInput.isCancelled()
			|| (!this.visible && (Input.isTriggered("cancel") || Input.isTriggered("control") || TouchInput.isClicked()));
	}

	// Synchronize visibility state of peripheral windows
	Window_Message.prototype.synchronizeVisibility = function() {
		if ($gameMessage.isChoice()) {
			this._choiceListWindow.visible = this.visible;
		} else if ($gameMessage.isNumberInput()) {
			this._numberInputWindow.visible = this.visible;
		} else if ($gameMessage.isItemChoice()) {
			this._eventItemWindow.visible = this.visible;
			if (this._eventItemWindow.isOpen() || !this.visible) {
				if (this._eventItemWindow._helpWindow) {
					this._eventItemWindow._helpWindow.visible = this.visible;
				}
			}
		}
	}

	const Window_Message_update = Window_Message.prototype.update;
	Window_Message.prototype.update = function() {
		// Toggle visibility
		const toggleVisibility = this.isToggleVisibility();
		if (toggleVisibility) {
			this.visible = !this.visible;
		} else {
			// Don't synchronize in the same turn as toggling visibility
			// to prevent the preripheral windows from taking the visibility toggle as an input
			this.synchronizeVisibility();
		}

		// Original update call
		Window_Message_update.call(this);

		// Pressing ok restores visibility
		if (Input.isTriggered("ok")) {
			this.visible = true;
		}
	};

	// Synchronize visibility of name box and message box
	const Window_Message_synchronizeNameBox = Window_Message.prototype.synchronizeNameBox
	Window_Message.prototype.synchronizeNameBox = function() {
		this._nameBoxWindow.visible = this.visible;
		Window_Message_synchronizeNameBox.call(this);
	};

	// Show window again when the new page is opened
	const Window_Message_newPage = Window_Message.prototype.newPage;
	Window_Message.prototype.newPage = function(textState) {
		this.visible = true;
		Window_Message_newPage.call(this, textState);
	}

	// Trigger message box when invisible
	const Window_Message_isTriggered = Window_Message.prototype.isTriggered;
	Window_Message.prototype.isTriggered = function() {
		return this.visible && Window_Message_isTriggered.call(this);
	};

	// Cannot cancel a message box while it is invisible (will instead restore visibility)
	const Window_ChoiceList_isCancelEnabled = Window_ChoiceList.prototype.isCancelEnabled
	Window_ChoiceList.prototype.isCancelEnabled = function() {
		return this.visible && Window_ChoiceList_isCancelEnabled.call(this);
	}
})();