//=============================================================================
// RPG Maker MZ - Detector Tags
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/08/02
// 1.0.1 2021/10/10 Added detection range bonus variable
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Detector Tags
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help detectors.js
 *
 * This plugin introduces the Detector tag. The tag is used to make NPCs react
 * upon the play entering their line of sight. Upon doing so, they will chase after the player.
 *
 * [detector speed condition]
 * detector		: Declares that this is a detector tag
 * speed		: Defines the chase speed
 * condition	: Optional, only chase if the condition is met
 *
 * @param Detection Range
 * @desc Number of tiles that an enemy can see
 * @default 4
 *
 * @param Chase Frequency
 * @desc When detecting the player, the enemy will chase his movement frequency to this value
 * @default 5
 *
 * @param Detection Balloon ID
 * @desc When detecting the player, the enemy will display a balloon of the given ID
 * @default 1
 *
 * @param Stun Balloon ID
 * @desc When being stunned, the enemy will display a balloon of the given ID
 * @default 1
 *
 * @command stunDetector
 * @text Stun Detector
 * @desc Stuns a detector for a set amount of time, making it unable to move or perform any detection
 *
 * @arg eventID
 * @type Number
 * @text eventID
 * @desc The ID of the detector event who will be stunned
 *
 * @arg duration
 * @type Number
 * @text duration
 * @desc The stun duration
 *
 */

// Processes the note information of tags
class DetectorTagFactory {

	static get TAG_TYPE_DETECTOR() { return "detector"; }
	static get SPEED_TOKEN_INDEX() { return 0; }
	static get CONDITION_TOKEN_INDEX() { return 1; }

	// Creates the appropriate cost tag object from a list of tokens
	static createDetectorTagFromTokens(tokens) {
		const speed = tokens[DetectorTagFactory.SPEED_TOKEN_INDEX];
		const condition = tokens[DetectorTagFactory.CONDITION_TOKEN_INDEX];
		return new DetectorTag(speed, condition);
	}

	// Creates all cost tags from a note
	static createDetectorTagsFromNote(note) {
		return TagFactory.createTagsFromNote(
			DetectorTagFactory.TAG_TYPE_DETECTOR, this.createDetectorTagFromTokens, note
		);
	}
}

// Holds the data of a detector tag
class DetectorTag {
	constructor(speed, condition) {
		this._speed = parseInt(speed);
		this._condition = condition;
	}
}

window.AuraMZ = window.AuraMZ || {};

(() => {
	AuraMZ.Detectors = {};

	AuraMZ.Detectors.CHASE_HERO_MOVE_TYPE = 2;
	AuraMZ.Detectors.ALIVE_PRIORITY = 1;

	const PLUGIN_NAME = "detectors";
	const params = PluginManager.parameters(PLUGIN_NAME);
	const DETECTION_RANGE = parseInt(params["Detection Range"]);
	AuraMZ.Detectors.DETECTION_RANGE_BONUS_VARIABLE = parseInt(params["Detection Range Bonus Variable"]);
	const CHASE_FREQUENCY = parseInt(params["Chase Frequency"]);
	const ON_DETECTION_BALLOON_ID = parseInt(params["Detection Balloon ID"]);
	const ON_STUN_BALLOON_ID = parseInt(params["Stun Balloon ID"]);

	// Registers a good unlock condition in the game temp data structure
	PluginManager.registerCommand(PLUGIN_NAME, "stunDetector", args => {
		const eventID = eval(args.eventID);
		const event = $gameMap.event(eventID);
		if (event.isDetector()) {
			$gameTemp.requestBalloon(event, ON_STUN_BALLOON_ID);
			const duration = eval(args.duration);
			event._stun = duration;
		}
	});


	const _Game_Event_initialize = Game_Event.prototype.initialize;
	Game_Event.prototype.initialize = function(mapId, eventId) {
		_Game_Event_initialize.call(this, mapId, eventId);
		this._chase = false;
	}

	Game_Event.prototype.isDetector = function() {
		return this.getDetectorTag() != undefined;
	}

	// Only allow detection of the player iff
	// * A detection tag is defined
	// * There is currently no ongoing event
	// * The enemy has not already detected the player
	// * The enemy is marked as dead via the priority type "Below Player" = Dead
	Game_Event.prototype.canChase = function(detectorTag) {
		return detectorTag != undefined
			&& !$gameMap.isEventRunning()
			&& !this._chase
			&& this._priorityType == AuraMZ.Detectors.ALIVE_PRIORITY
			&& (detectorTag._condition == undefined || eval(detectorTag._condition));
	}

	Game_Event.prototype.detectPlayer = function(detectorTag) {
		this._chase = true;
		this._moveType = AuraMZ.Detectors.CHASE_HERO_MOVE_TYPE;
		this.setMoveFrequency(CHASE_FREQUENCY);
		this.setMoveSpeed(detectorTag._speed);

		$gameTemp.requestBalloon(this, ON_DETECTION_BALLOON_ID);
	}

	Game_Event.prototype.undetectPlayer = function() {
		this._chase = false;
		const page = this.page();
		this._moveType = page.moveType;
		this.setMoveFrequency(page.moveFrequency);
		this.setMoveSpeed(page.moveSpeed);
	}

	Game_BattlerBase.prototype.detectionRangeBonus = function() {
		const detectionRangeTraitObjects = this.traitObjects().filter(traitObject => traitObject.meta.detection_range_bonus);
		return detectionRangeTraitObjects.reduce((r, traitObject) => r + eval(traitObject.meta.detection_range_bonus), 0);
	}
	
	Game_Party.prototype.detectionRangeBonus = function() {
		return $gameParty.members()
			.map(member => member.detectionRangeBonus())
			.reduce((r, bonus) => r + bonus, 0);
	}

	Game_Event.prototype.getDetectionRange = function() {
		const detectionRangeBonus = $gameParty.detectionRangeBonus();
		return DETECTION_RANGE + detectionRangeBonus;
	}

	const _Game_Event_update = Game_Event.prototype.update;
	Game_Event.prototype.update = function() {
		if (this._stun != undefined && this._stun > 0 && this._priorityType == AuraMZ.Detectors.ALIVE_PRIORITY) {
			this.updateStun();
			return;
		}

		const detectorTag = this.getDetectorTag();
		if (this.canChase(detectorTag)) {
			this.updateChase(detectorTag);
		}

		_Game_Event_update.call(this);
	}

	Game_Event.prototype.getDetectorTag = function() {
		const detectorTags = DetectorTagFactory.createDetectorTagsFromNote(this.event().note);
		const detectorTag = detectorTags.find(tag => tag instanceof DetectorTag);
		return detectorTag;
	}

	Game_Event.prototype.updateStun = function() {
		this._stun--;
		if (!this._balloonPlaying) {
			$gameTemp.requestBalloon(this, ON_STUN_BALLOON_ID);
		}
		if (this._stun == 0) {
			const detectorTag = this.getDetectorTag();
			if (this.canChase(detectorTag)) {
				this.detectPlayer(detectorTag);
			}
		}
	}

	Game_Event.prototype.updateChase = function(detectorTag) {
		let detected = false;
		let x = this.x;
		let y = this.y

		// Check if the player is within detection range
		const detectionRange = this.getDetectionRange();
		for (let i = 0; i < detectionRange; ++i) {
			if (!this.canPass(x, y, this.direction())) {
				if (this.isMapPassable(x, y, this.direction())) {
					x = $gameMap.roundXWithDirection(x, this.direction());
					y = $gameMap.roundYWithDirection(y, this.direction());

					if ($gamePlayer.pos(x, y)) {
						detected = true;
					}
				}

				break;
			}

			x = $gameMap.roundXWithDirection(x, this.direction());
			y = $gameMap.roundYWithDirection(y, this.direction());
		}

		if (detected) {
			this.detectPlayer(detectorTag);
		}
	}
})();