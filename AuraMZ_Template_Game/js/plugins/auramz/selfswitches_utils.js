//=============================================================================
// RPG Maker MZ - Selfswitches Utils
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
 * @plugindesc Selfswitch Utils
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help selfswitches_utils.js
 *
 * Contains various helper functions for working with selfswitches.
 *
 * @command setLocalSelfSwitch
 * @text Set local self switch
 * @desc Sets a selfswitch of an event on the current map 
 *
 * @arg eventID
 * @type Number
 * @text eventID
 * @desc The ID of the event whose selfswitch will be modified
 *
 * @arg selfswitch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @text selfswitch
 * @desc The selfswitch that will be modified
 *
 * @arg value
 * @type boolean
 * @text value
 * @desc The new selfswitch value
 *
 * @command setLocalSelfSwitchRange
 * @text Set local self switch range
 * @desc Sets all selfswitches of the events in the given range on the current map 
 *
 * @arg fromEventID
 * @type Number
 * @text fromEventID
 * @desc The first ID of the event whose selfswitch will be modified
 *
 * @arg toEventID
 * @type Number
 * @text toEventID
 * @desc The last ID of the event whose selfswitch will be modified
 *
 * @arg selfswitch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @text selfswitch
 * @desc The selfswitch that will be modified
 *
 * @arg value
 * @type boolean
 * @text value
 * @desc The new selfswitch value
 *
 * @command setExternalSelfSwitch
 * @text Set external self switch
 * @desc Sets a selfswitch of an event on the given map 
 *
 * @arg mapID
 * @type Number
 * @text mapID
 * @desc The ID of the map of the event
 *
 * @arg eventID
 * @type Number
 * @text eventID
 * @desc The ID of the event whose selfswitch will be modified
 *
 * @arg selfswitch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @text selfswitch
 * @desc The selfswitch that will be modified
 *
 * @arg value
 * @type boolean
 * @text value
 * @desc The new selfswitch value
 *
 * @command setExternalSelfSwitchRange
 * @text Set external self switch range
 * @desc Sets all selfswitches of the events in the given range on the given map 
 *
 * @arg mapID
 * @type Number
 * @text mapID
 * @desc The ID of the map of the events
 *
 * @arg fromEventID
 * @type Number
 * @text fromEventID
 * @desc The first ID of the event whose selfswitch will be modified
 *
 * @arg toEventID
 * @type Number
 * @text toEventID
 * @desc The last ID of the event whose selfswitch will be modified
 *
 * @arg selfswitch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @text selfswitch
 * @desc The selfswitch that will be modified
 *
 * @arg value
 * @type boolean
 * @text value
 * @desc The new selfswitch value
 *
 * @command synchronizeLocalSelfSwitches
 * @text Synchronize local self switches
 * @desc Sets the selfswitch value of the affected event to the selfswitch value of the observed event
 *
 * @arg affectedEventID
 * @type Number
 * @text affectedEventID
 * @desc The ID of the event whose selfswitch will be affected
 *
 * @arg observedEventID
 * @type Number
 * @text observedEventID
 * @desc The ID of the event whose selfswitch will be observed
 *
 * @arg selfswitch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @text selfswitch
 * @desc The selfswitch that will be modified
 */

(() => {
	const PLUGIN_ID = "selfswitches_utils";

	// Sets a selfswitch on the current map
	PluginManager.registerCommand(PLUGIN_ID, "setLocalSelfSwitch", args => {
		const mapID = $gameMap.mapId();
		const key = [mapID, args.eventID, args.selfswitch];
		const value = (args.value == "true");
		$gameSelfSwitches.setValue(key, value);
	});

	// Sets a range of selfswitches on the current map
	PluginManager.registerCommand(PLUGIN_ID, "setLocalSelfSwitchRange", args => {
		const mapID = $gameMap.mapId();
		const value = (args.value == "true");
		for (let i = args.fromEventID; i <= args.toEventID; ++i) {
			const key = [mapID, i, args.selfswitch];
			$gameSelfSwitches.setValue(key, value);
		}
	});
	
	// Sets a selfswitch on the given map
	PluginManager.registerCommand(PLUGIN_ID, "setExternalSelfSwitch", args => {
		const key = [args.mapID, args.eventID, args.selfswitch];
		const value = (args.value == "true");
		$gameSelfSwitches.setValue(key, value);
	});

	// Sets a range of selfswitches on the given map
	PluginManager.registerCommand(PLUGIN_ID, "setExternalSelfSwitchRange", args => {
		for (let i = args.fromEventID; i <= args.toEventID; ++i) {
			const key = [args.mapID, i, args.selfswitch];
			const value = (args.value == "true");
			$gameSelfSwitches.setValue(key, value);
		}
	});

	// Sets a range of selfswitches on the given map
	PluginManager.registerCommand(PLUGIN_ID, "synchronizeLocalSelfSwitches", args => {
		const mapID = $gameMap.mapId();
		const keyAffected = [mapID, args.affectedEventID, args.selfswitch];
		const keyObserved = [mapID, args.observedEventID, args.selfswitch];
		const valueObserved = $gameSelfSwitches.value(keyObserved);
		$gameSelfSwitches.setValue(keyAffected, valueObserved);
	});


})();