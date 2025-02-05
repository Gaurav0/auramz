//=============================================================================
// RPG Maker MZ - Event Utils
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2023/11/24
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Event Utils
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help event_utils.js
 *
 * Provides general utility extensions related to running/displaying events. 
 *
 * @command callLocalEvent
 * @text Call Local Event
 * @desc Inserts the event code of the called event into the currently running event. The event has to be a local event on the map.
 *
 * @arg eventID
 * @type number
 * @text eventID
 * @desc The ID of the event to call
 *
 * @arg pageID
 * @type number
 * @text pageID
 * @desc The ID of the page to call. -1 will call the currently active page as determined by the event conditions.
 * @default -1
 * 
 * @command setEventImageToActorImage
 * @text Set Event Image to Actor Image
 * @desc Sets the character index/image to that of an actor
 *
 * @arg eventID
 * @type number
 * @text eventID
 * @desc The ID of the event to call
 *
 * @arg actorID
 * @type actor
 * @text actorID
 * @desc The actor whose image will be used.
 * 
 * @command setActorDamageImage
 * @text Set Actor Damage Image
 * @desc Sets the character index/image to that of an actor
 *
 * @arg actorID
 * @type actor
 * @text actorID
 * @desc The actor whose image will be used.
 * 
 * @arg damageName
 * @type file
 * @text damageName
 * @dir img/characters/
 * @desc The actor whose image will be used.
 * 
 * @arg damageIndex
 * @type number
 * @text damageIndex
 * @desc The character index in the character sheet.
 * 
 * @arg damageDirection
 * @type number
 * @text damageDirection
 * @desc The character direction of the character.
 * 
 * @command setEventImageToActorDamageImage
 * @text Set Event Image to Actor Damage Image
 * @desc Sets the character index/image to that of the actor damage image
 *
 * @arg eventID
 * @type number
 * @text eventID
 * @desc The ID of the event to call
 *
 * @arg actorID
 * @type actor
 * @text actorID
 * @desc The actor whose image will be used.
 * 
 * @arg damagePatternID
 * @type number
 * @text damagePatternID
 * @desc The ID (0, 1, 2) for the damage pattern.
 */

(() => {
	const PLUGIN_ID = "event_utils";

	// Gets the currently running interpreter on the map
	Game_Map.prototype.getCurrentInterpreter = function() {
		let interpreter = this._interpreter;
		while (interpreter._childInterpreter != null) {
			interpreter = interpreter._childInterpreter;
		}
		
		return interpreter;
	}

	// Calls a local event on the map like a common event
	Game_Interpreter.prototype.callLocalEvent = function(eventId, pageId) {
		const event = $gameMap.event(eventId);
		const parentEventId = this._eventId;
		const pageIndex = pageId == -1 ? event.getPageIndex() : pageId;
		this.setupChild(event.event().pages[pageIndex].list, parentEventId);
	};

	// Registers a choice alternate text condition in the message data
	PluginManager.registerCommand(PLUGIN_ID, "callLocalEvent", args => {
		const eventId = JSON.parse(args.eventID);
		const pageId = JSON.parse(args.pageID);
		const interpreter = $gameMap.getCurrentInterpreter();
		interpreter.callLocalEvent(eventId, pageId);
	});
	
	// Synchronizes the image of an event to the walking graphic of an actor 
	PluginManager.registerCommand(PLUGIN_ID, "setEventImageToActorImage", args => {
		const eventId = JSON.parse(args.eventID);
		const actorId = JSON.parse(args.actorID);
		const actor = $gameActors.actor(actorId);
		const event = $gameMap.event(eventId);
		event.refresh();
		event.setImage(actor.characterName(), actor.characterIndex());
	});
	
	Game_Actor.prototype.setDamageImage = function(damageName, damageIndex, damageDirection) {
		this._damageName = damageName;
		this._damageIndex = damageIndex;
		this._damageDirection = damageDirection;
	}
	
	Game_Actor.prototype.damageName = function() {
		return this._damageName;
	}
	
	Game_Actor.prototype.damageIndex = function() {
		return this._damageIndex;
	}
	
	Game_Actor.prototype.damageDirection = function() {
		return this._damageDirection;
	}
	
	// Associates an actor with a damage image
	PluginManager.registerCommand(PLUGIN_ID, "setActorDamageImage", args => {
		const actorId = JSON.parse(args.actorID);
		const damageName = args.damageName;
		const damageIndex = JSON.parse(args.damageIndex);
		const damageDirection = JSON.parse(args.damageDirection);
		const actor = $gameActors.actor(actorId);
		actor.setDamageImage(damageName, damageIndex, damageDirection);
	});
	
	// Synchronizes an event with the damage image of an actor
	PluginManager.registerCommand(PLUGIN_ID, "setEventImageToActorDamageImage", args => {
		const eventId = JSON.parse(args.eventID);
		const actorId = JSON.parse(args.actorID);
		const damagePatternId = JSON.parse(args.damagePatternID);
		const actor = $gameActors.actor(actorId);
		const event = $gameMap.event(eventId);
		event.refresh();
		event.setImage(actor.damageName(), actor.damageIndex());
		event.setDirection(actor.damageDirection());
		event._originalPattern = damagePatternId;
		event.setDirectionFix(false);
		event._originalDirection = actor.damageDirection();
		event.setDirection(event._originalDirection);
		event.setDirectionFix(true);
		event.setPattern(damagePatternId);
	});
})();