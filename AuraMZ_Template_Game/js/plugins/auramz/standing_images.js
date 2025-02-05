//=============================================================================
// RPG Maker MZ - Standing Images
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/08/02
// 1.1.0 2022/02/19 - Added offset parameter
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Standing Images
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help standing_images.js
 *
 * This plugin provides services for displaying standing images of characters.
 *
 * Dependencies:
 * - event_utils
 * 
 *
 * @command show
 * @text Show Standing Image
 * @desc Shows a standing image
 *
 * @arg parts
 * @type struct<Part>[]
 * @text body
 * @desc The name of the body / pose image
 *
 * @arg side
 * @type text
 * @text side
 * @desc The side (0 = left, 1 = right, 2 = middle) where the standing image will appear.
 * @default 0
 *
 * @arg fadeIn
 * @type text
 * @text fadeIn
 * @desc The number of fade in frames
 * @default 10
 *
 * @arg scale
 * @type text
 * @text scale
 * @desc How much the standing image will be scaled
 * @default 50
 *
 * @arg xOffset
 * @type text
 * @text xOffset
 * @desc How much the standimg image will be offset in the x axis
 * @default 0
 *
 * @arg yOffset
 * @type text
 * @text yOffset
 * @desc How much the standimg image will be offset in the y axis
 * @default 0
 *
 * @command hide
 * @text Hide Standing Image
 * @desc Hide a standing image
 *
 * @arg side
 * @type text
 * @text side
 * @desc The side (0 = left, 1 = right) which standing image will disappear.
 * @default 0
 *
 * @arg fadeOut
 * @type text
 * @text fadeOut
 * @desc The number of fade out frames
 * @default 5
 *
 * @command setNameMap
 * @text Set Name Map
 * @desc Sets a name map
 *
 * @arg nameMap
 * @type struct<NameMap>[]
 * @text Name Map
 * @desc Re-Maps the names for identifying assets
 *
 * @param Name Mappings
 * @type struct<NameMap>[]
 * @desc Maps a name to another name for associating a speaker with an asset
 *
 * @command lockDim
 * @text Lock Dim
 * @desc Locks the dimming on the specified side
 *
 * @arg side
 * @type text
 * @text side
 * @desc The side (0 = left, 1 = right) which standing image will disappear.
 * @default 0
 *
 */

/*~struct~Part:
 *
 * @param imageName
 * @type string
 * @text imageName
 * @desc The name of the image of this part
 *
 * @param condition
 * @type string
 * @text condition
 * @desc The condition for the part to be shown
 *
 */

/*~struct~NameMap:
 *
 * @param name
 * @type string
 * @text Name
 * @desc A message box name
 *
 * @param mappedName
 * @type string
 * @text Mapped Name
 * @desc The name the message box name will be mapped to
 */


class StandingImageUtil {
	static getX(side) {
		if (side < 20) {
			return 0;
		} else {
			return Graphics.width;
		}
	}
}

window.AuraMZ = window.AuraMZ || {};

(() => {
	AuraMZ.StandingImages = {};
	const PLUGIN_NAME = "standing_images";
	const PARTS_PER_SIDE = 10;
	const STANDING_IMAGE_PREFIX = "si/";
	const PARAMS = PluginManager.parameters(PLUGIN_NAME);
	const EASING_MODE = 0;

	let eraseSide = 0;
	let finishedShowCommand = false;
	let fadeIn = 0;
	let bitmaps = [];
	AuraMZ.StandingImages.nameMappings = [];

	// Command to show a standing image
	PluginManager.registerCommand(PLUGIN_NAME, "show", args => {
		const parts = JSON.parse(args.parts);
		fadeIn = eval(args.fadeIn);
		const side = (eval(args.side) + 1) * PARTS_PER_SIDE;

		finishedShowCommand = false;
		bitmaps = [];

		let processedParts = parts.map(part => {
			let { imageName, condition } = JSON.parse(part);
			imageName = eval(imageName);
			condition = eval(condition);
			return { imageName, condition };
		});

		Promise.all(processedParts.map(part => {
			return createBmpPromise(part);
		})).then(() => {
			showProcessedParts(processedParts, args.xOffset, args.yOffset, args.scale, side);

			// Erase old parts
			for (let i = parts.length; i < PARTS_PER_SIDE; ++i) {
				$gameScreen.erasePicture(side + i);
			}

			finishedShowCommand = true;
		});

		// Get the currently active interpreter
		const interpreter = $gameMap.getCurrentInterpreter();
		interpreter.setWaitMode("standing-image");
	});

	function createBmpPromise(part) {
		return new Promise(resolve => {
			const { imageName, condition } = part;
			if (condition) {
				const bmap = ImageManager.loadPicture(imageName);
				bitmaps.push(bmap);
				if (bmap) {
					bmap.addLoadListener(resolve);
				} else {
					resolve();
				}
			} else {
				resolve();
			}

		});
	}

	function showProcessedParts(processedParts, xOffsetArg, yOffsetArg, scaleArg, side) {
		const scale = eval(scaleArg);
		const xOffset = xOffsetArg ? eval(xOffsetArg) * scale / 100 : 0;
		const yOffset = yOffsetArg ? eval(yOffsetArg) * scale / 100 : 0;

		const blendMode = 0;

		const maxOpacity = 255;
		const initOpacity = fadeIn == 0 ? maxOpacity : 0;
		const directionScale = side >= PARTS_PER_SIDE * 2 ? -1 : 1;
		const origin = 0;

		const padding = 50 - scale;
		const x = directionScale * (padding + xOffset) + StandingImageUtil.getX(side);
		const y = padding + yOffset;

		for (let i = 0; i < processedParts.length; ++i) {
			const part = processedParts[i];
			const pictureID = side + i;
			if (part.condition) {
				const picture = $gameScreen.picture(pictureID);
				const pictureName = part.imageName;

				if (!picture) {
					$gameScreen.showPicture(
						pictureID, pictureName, origin, x, y, directionScale * scale, scale, initOpacity, blendMode
					);

					AuraMZ.StandingImages.markSpeakerPart(pictureID);

					if (fadeIn != 0) {
						$gameScreen.movePicture(
							pictureID, origin, x, y, directionScale * scale, scale, maxOpacity, blendMode, fadeIn, EASING_MODE
						);
					}
				} else {
					$gameScreen.showPicture(
						pictureID, pictureName, origin, x, y, directionScale * scale, scale, maxOpacity, blendMode
					);
				}
			} else {
				$gameScreen.erasePicture(pictureID);
			}
		}
	}

	const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
	Game_Interpreter.prototype.updateWaitMode = function() {
		if (this._waitMode == "standing-image") {
			const copyFinishedShowCommand = finishedShowCommand;
			if (copyFinishedShowCommand) {
				this.wait(fadeIn);
				this._waitMode = "";
			} else {
				// If we are still waiting for the bitmaps to finish loading
				// check if there were any loading errors and throw an exception
				// if that is the case. The isReady method of ImageManager does both
				for (const bitmap of bitmaps) {
					ImageManager.isReady(bitmap);
				}
			}

			return !copyFinishedShowCommand;
		} else {
			return _Game_Interpreter_updateWaitMode.call(this);
		}
	};

	// Command to hide a standing image
	PluginManager.registerCommand(PLUGIN_NAME, "hide", args => {
		const fadeOut = args.fadeOut;
		eraseSide = (eval(args.side) + 1) * PARTS_PER_SIDE;

		for (let i = 0; i < PARTS_PER_SIDE; ++i) {
			const pictureID = eraseSide + i;
			const picture = $gameScreen.picture(pictureID);

			if (picture) {
				$gameScreen.movePicture(
					pictureID, picture.origin(),
					picture.x(), picture.y(),
					picture.scaleX(), picture.scaleY(),
					0, picture.blendMode(),
					fadeOut, EASING_MODE
				);
			}
		}

		const interpreter = $gameMap.getCurrentInterpreter();
		// Wait until fadeout complete
		interpreter.wait(fadeOut);
		interpreter.setWaitMode("fadeOut");
	});

	// Inject logic to erase standing image after fadeout
	const _Game_Interpreter_updateWaitCount = Game_Interpreter.prototype.updateWaitCount;
	Game_Interpreter.prototype.updateWaitCount = function() {
		const res = _Game_Interpreter_updateWaitCount.call(this);
		if (!res && eraseSide != 0 && this._waitMode == "fadeOut") {
			for (let i = 0; i < PARTS_PER_SIDE; ++i) {
				$gameScreen.erasePicture(eraseSide + i);
			}

			for (let i = PARTS_PER_SIDE; i < PARTS_PER_SIDE * 3; ++i) {
				const picture = $gameScreen.picture(i);
				const pictureName = picture?.name();
				if (pictureName?.startsWith(STANDING_IMAGE_PREFIX)) {
					$gameScreen.tintPicture(
						i, SPEAKER_TINT, TINT_DURATION
					);
				}
			}

			this._waitMode = "";
			eraseSide = 0;
		}
		return res;
	}

	const TINT_DURATION = 30;
	const NON_SPEAKER_TINT = [-30, -30, -30, 120];
	const SPEAKER_TINT = [0, 0, 0, 0];
	const andRegex = /&/g;
	const _Game_Message_setSpeakerName = Game_Message.prototype.setSpeakerName;

	Game_Message.prototype.setSpeakerName = function(speakerName) {
		const speakerNameList = AuraMZ.StandingImages.getSpeakerNameList(speakerName);

		for (let i = PARTS_PER_SIDE; i < PARTS_PER_SIDE * 3; ++i) {
			if (AuraMZ.StandingImages.lockDim != undefined) {
				const side = Math.floor((i - PARTS_PER_SIDE) / PARTS_PER_SIDE);
				if (side == AuraMZ.StandingImages.lockDim) {
					continue;
				}
			}

			const picture = $gameScreen.picture(i);
			const pictureName = picture?.name();
			if (pictureName?.startsWith(STANDING_IMAGE_PREFIX)) {
				const isSpeaker = AuraMZ.StandingImages.isSpeaker(pictureName, speakerNameList);
				const onScreenSpeakers = AuraMZ.StandingImages.getOnScreenSpeakers();
				const isOffscreenSpeaker = onScreenSpeakers.filter(speaker => speakerNameList.contains(speaker)).length == 0;
				if (onScreenSpeakers.length >= 2 && !isSpeaker && !isOffscreenSpeaker) {
					AuraMZ.StandingImages.markNonSpeakerPart(i);
				} else {
					AuraMZ.StandingImages.markSpeakerPart(i);
				}
			}
		}

		AuraMZ.StandingImages.lockDim = undefined;
		_Game_Message_setSpeakerName.call(this, speakerName);
	};

	// Gets the collection of speaker names, applying all substitutions and
	// considering multi speakers separated by ","
	AuraMZ.StandingImages.getSpeakerNameList = function(speakerName) {
		return speakerName.toLowerCase().replace(andRegex, ",").split(",")
			.map(name => name.trim())
			.map(name => AuraMZ.StandingImages.nameMappings[name] ? AuraMZ.StandingImages.nameMappings[name] : name);
	}

	// Gets the speakers currently displayed on the screen through standing images
	AuraMZ.StandingImages.getOnScreenSpeakers = function() {
		let onScreenSpeakers = [];

		for (let i = 0; i < 2; ++i) {
			const start = PARTS_PER_SIDE * (i + 1);
			const end = start + PARTS_PER_SIDE;
			for (let j = start; j < end; ++j) {
				const picture = $gameScreen.picture(j);
				if (picture) {
					const pictureName = picture.name();
					if (pictureName.startsWith(STANDING_IMAGE_PREFIX)) {
						onScreenSpeakers.push(pictureName.split("/")[1]);
						break;
					}
				}
			}
		}

		return onScreenSpeakers;
	}

	// Checks if the given picture belongs to the speaker
	// It belongs to the speaker if any individual speaker 
	// is contained in the asset name of the picture
	AuraMZ.StandingImages.isSpeaker = function(pictureName, speakerNameList) {
		for (const speakerName of speakerNameList) {
			if (pictureName.contains(speakerName)) {
				return true;
			}
		}

		return false;
	}

	AuraMZ.StandingImages.markSpeakerPart = function(pictureID) {
		const picture = $gameScreen.picture(pictureID);
		if (picture) {
			$gameScreen.tintPicture(
				pictureID, SPEAKER_TINT, 0
			);
		}
	}

	AuraMZ.StandingImages.markNonSpeakerPart = function(pictureID) {
		const picture = $gameScreen.picture(pictureID);
		if (picture) {
			$gameScreen.tintPicture(
				pictureID, NON_SPEAKER_TINT, TINT_DURATION
			);
		}
	}

	AuraMZ.StandingImages.setNameMap = function(nameMapString) {
		const NAME_MAP = JSON.parse(nameMapString);

		for (const nameMappingString of NAME_MAP) {
			const nameMapping = JSON.parse(nameMappingString);
			const name = nameMapping["name"];
			const mappedName = nameMapping["mappedName"];
			AuraMZ.StandingImages.nameMappings[name] = mappedName;
		}
	}
	
	AuraMZ.StandingImages.setNameMap(PARAMS["Name Mappings"]);

	// Command to dim a standing image
	PluginManager.registerCommand(PLUGIN_NAME, "setNameMap", args => {
		AuraMZ.StandingImages.setNameMap(args.nameMap);
	});

	// Command to dim a standing image
	PluginManager.registerCommand(PLUGIN_NAME, "lockDim", args => {
		AuraMZ.StandingImages.lockDim = eval(args.side);
		const side = (eval(AuraMZ.StandingImages.lockDim) + 1) * PARTS_PER_SIDE;

		for (let i = 0; i < PARTS_PER_SIDE; ++i) {
			const pictureID = side + i;
			const picture = $gameScreen.picture(pictureID);
			if (picture) {
				AuraMZ.StandingImages.markNonSpeakerPart(pictureID);
			}
		}
	});
})();
