//=============================================================================
// RPG Maker MZ - Mobile
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2023/12/19
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Mobile
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help mobile.js
 *
 * Bundle plugin for functionality that only serves mobile deployments.
 *
 * @param stretchHeightRate
 * @text Stretch Height Rate
 * @type Number
 * @default 1
 * @desc Multiplier rate by which the height of the canvas is stretched by. By default set to 1 here,
 * which assumes that there are no elements in the height orientation that can overlap with the canvas.
 * If there are, adjust the rate accordingly.
 *
 */

window.AuraMZ = window.AuraMZ || {};

(() => {
	AuraMZ.Mobile = {};
	AuraMZ.Mobile.callbacks = {};

	const PLUGIN_ID = "mobile";
	const PARAMS = PluginManager.parameters(PLUGIN_ID);
	const STRETCH_HEIGHT_RATE = parseFloat(PARAMS["stretchHeightRate"]);

	if (Utils.isMobileDevice()) {
		// Fixes issue of "black" gaps between tiles
		// https://forums.rpgmakerweb.com/index.php?threads/tileset-gaps-on-android.140779/#post-1362589
		PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH
	}


	// Inject custom logic to not adjust the height on mobile devices for additional element.
	// if the game runs in fullscreen, then this will otherwise just create empty space
	const _Graphics_stretchHeight = Graphics._stretchHeight;
	Graphics._stretchHeight = function() {
		if (Utils.isMobileDevice()) {
			return document.documentElement.clientHeight * STRETCH_HEIGHT_RATE;
		}

		return _Graphics_stretchHeight.call();
	};

	AuraMZ.Mobile.generateCallbackId = function() {
		while (true) {
			const dateString = Date.now().toString(36);
			const randomness = Math.random().toString(36).substr(2);
			const callbackId = "callback_" + dateString + randomness;
			if (!AuraMZ.Mobile.callbacks[callbackId]) {
				return callbackId;
			}
		}
	}

	AuraMZ.Mobile.call = function(call) {
		const promise = new Promise((resolve, reject) => {
			const callbackId = AuraMZ.Mobile.generateCallbackId();
			AuraMZ.Mobile.callbacks[callbackId] = (result) => {
				resolve(result);
				delete AuraMZ.Mobile.callbacks[callbackId];
			};
			setTimeout(() => {
				try {
					call(callbackId);
				} catch (e) {
					reject(e);
					delete AuraMZ.Mobile.callbacks[callbackId];
				}
			0});
		});
		return promise;
	}

	// Decodes a base64 string back into its original string
	// Default function for this is supposed to be atob but its broken
	// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
	AuraMZ.Mobile.decodeBase64 = function(base64) {
		const text = atob(base64);
		const length = text.length;
		const bytes = new Uint8Array(length);
		for (let i = 0; i < length; i++) {
			bytes[i] = text.charCodeAt(i);
		}
		const decoder = new TextDecoder(); // default is utf-8
		return decoder.decode(bytes);
	}
})();

