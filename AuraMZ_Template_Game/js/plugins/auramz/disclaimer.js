//=============================================================================
// RPG Maker MZ - Disclaimer Message
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
 * @plugindesc Disclaimer Message
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help disclaimer.js
 *
 * This plugin displays a legal disclaimer message before showing the title menu.
 *
 * @param Disclaimer
 * @desc Disclaimer text
 * @type string
 *
 */

window.AuraMZ = window.AuraMZ || {};

// Scene that shows a disclaimer message
class Scene_Disclaimer extends Scene_Base {

	// Inject creation of Disclaimer
	create() {
		super.create();
		this.createDisclaimer();
	}

	// Creates the bitmap to draw on
	createDisclaimer() {
		this._disclaimerSprite = new Sprite(
			new Bitmap(Graphics.width, Graphics.height)
		);
		this.addChild(this._disclaimerSprite);
		this.drawDisclaimer();
	}

	// Draws the disclaimer text
	drawDisclaimer() {
		const bitmap = this._disclaimerSprite.bitmap;
		bitmap.fontFace = $gameSystem.mainFontFace();
		bitmap.outlineColor = "black";
		bitmap.outlineWidth = 8;
		bitmap.fontSize = 56;

		const x = 20;
		let y = Graphics.height / 2 - 3 * bitmap.fontSize / 2;
		const maxWidth = Graphics.width - x * 2;

		const lines = AuraMZ.disclaimer_text.split("\\n");
		for (let i = 0; i < lines.length; ++i) {
			bitmap.drawText(lines[i], x, y, maxWidth, 48, "center");
			y += bitmap.fontSize;
		}
	}

	// Inject fading the disclaimer text in
	start() {
		super.start();
		this.startFadeIn(this.fadeSpeed(), false);
	}

	// Inject update logic
	update() {
		// When the user presses "ok" then just skip to fading out
		if ((Input.isPressed("ok") || TouchInput.isPressed()) && this._fadeSign != -1) {
			this.startFadeOut(this.fadeSpeed(), false);
		}

		// fadeSign == 0 => show the message for some time
		if (this._fadeSign == 0) {
			this._fadeDuration--;

			if (this._fadeDuration <= 0) {
				// When the show time is done, fade the disclaimer out
				this.startFadeOut(this.fadeSpeed(), false);
			}
		} else {
			// Use the fadeIn/Out logic of the Scene_Base class
			super.update();

			if (this._fadeSign == 1 && this._fadeOpacity <= 0) {
				// When fadeIn is done, show the text on 0 opacity for some time
				this._fadeSign = 0;
				this._fadeDuration = 180;
			} else if (this._fadeSign == -1 && this._fadeOpacity >= 255) {
				this.gotoTitle();
			}
		}
	}
	
	gotoTitle() {
		SceneManager.goto(Scene_Title);
	}

	// Inject logic for destroying the disclaimer sprite on scene termination
	terminate() {
		super.terminate();
		SceneManager.snapForBackground();
		this._disclaimerSprite.bitmap.destroy();
	}
}

(() => {
	const params = PluginManager.parameters("disclaimer");
	AuraMZ.disclaimer_text = params["Disclaimer"];

	// Inject the disclaimer scene
	const _Scene_Boot_startNormalGame = Scene_Boot.prototype.startNormalGame;
	Scene_Boot.prototype.startNormalGame = function() {
		_Scene_Boot_startNormalGame.call(this);
		SceneManager.goto(Scene_Disclaimer);
	}
})();