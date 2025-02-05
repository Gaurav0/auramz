// ==================================================
// Cae_MapEvents.js
// ==================================================

/**
 * @file Cae_MapEvents.js (RMMZ)
 * Event interaction options: disable/freeze, fast-forward, etc.
 * @author Caethyril
 * @version 1.0
 */

//#region Plugin header
/*:
 * @target MZ
 * @plugindesc v1.0 - Event interaction options: disable/freeze, fast-forward, etc.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/index.php?threads/caethyrils-mz-plugins.125657/
 * 
 * @help Features:
 *   Each feature is optional!
 * 
 *    - Adjust the rate at which the map updates when in fast-forward mode.
 *      (This occurs when holding the "ok" button while an event is running.)
 *    - Trigger multiple valid events with a single press of the action button.
 *      E.g. below player and in front of player.
 *      Triggered events will run one after another, lowest event ID first.
 *    - Disable triggers and/or visually freeze events when a switch is on.
 *    - Save events with a <save> tag in their Note field.
 *      These events are saved as they were when the player left their map.
 *      All properties are restored when the player returns to that map.
 *      Example use: retain an event's position after leaving its map.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Terms of use:
 *   This plugin is free to use and/or modify, under these conditions:
 *     - None of the original plugin header is removed.
 *     - Credit is given to Caethyril for the original work.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Compatibility:
 *   Overrides: Scene_Map:
 *                updateMainMultiply
 *              Game_Player:
 *                startMapEvent, triggerButtonAction
 *   Aliases:   Scene_Map:
 *                create
 *              Game_Event:
 *                start, update, lock, forceMoveRoute, isMoveRouteForcing
 *              Game_Map:
 *                setup, setupStartingMapEvent
 *              DataManager:
 *                createGameObjects, makeSaveContents, extractSaveContents
 *   This plugin adds data to save files iff the <save> event notetag is used.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Changelog:
 *   v1.0 (2020-09-20): Initial release! Rewrite/extension of RMMV version.
 * 
 * @param Fast-Forward Multiplier
 * @type number
 * @min 1
 * @desc Map update rate when in fast-forward mode.
 * Default: 2
 * @default 2
 * 
 * @param Multi-Event Trigger
 * @type boolean
 * @desc If true, pressing the action button will trigger all valid events rather than just the first one.
 * @default false
 * 
 * @param --- Disable Events ---
 * @type select
 * @desc Options for disabling events, i.e. preventing them from being triggered.
 * 
 * @param Disable Events Switch
 * @parent --- Disable Events ---
 * @type switch
 * @desc When this switch is on, event-disable effects will be active.
 * @default 0
 * 
 * @param Bypass Disable Name
 * @parent --- Disable Events ---
 * @type string
 * @desc Events with this text in their name will not be disabled.
 * @default &&
 *
 * @param --- Freeze Events ---
 * @type select
 * @desc Options for freezing events, i.e. preventing visual updates.
 * 
 * @param Freeze Events Switch
 * @parent --- Freeze Events ---
 * @type switch
 * @desc When this switch is on, event-freeze effects will be active.
 * @default 0
 * 
 * @param Freeze Instantly
 * @parent --- Freeze Events ---
 * @type boolean
 * @desc If true, events will freeze where they are.
 * Otherwise freeze applies when the event stops moving.
 * @default false
 *
 * @param Ignore Frozen Move Routes
 * @parent --- Freeze Events ---
 * @type boolean
 * @desc If true, move routes for frozen events are ignored.
 * If false, moves process when the event unfreezes.
 * @default true
 * 
 * @param Bypass Freeze Name
 * @parent --- Freeze Events ---
 * @type string
 * @desc Events with this text in their name will not be frozen.
 * This text can be the same as Bypass Disable Name.
 * @default &&
 * 
 * @param --- Advanced ---
 * @type select
 * @desc Advanced internal configuration options.
 * 
 * @param Notetag: save
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the <save> event notetag.
 * @default save
 * 
 * @param Property: Save
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the property under which this plugin's data is saved.
 * @default Cae_MapEvents
 */
//#endregion

(function() {
'use strict';

    const NAMESPACE   = 'MapEvents';
    const PLUGIN_NAME = 'Cae_' + NAMESPACE;
    const ERR_PRE     = PLUGIN_NAME + '.js ';
    const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin file is named correctly and try again.';
    const WARN_BADVAL = ERR_PRE + 'could not use value "%1" for %2 "%3". Reverting to default: "%4".';

    window.CAE = window.CAE || {};      // Author namespace

    (($, U) => {

        Object.defineProperty($, 'VERSION', { value: 1.0 });    // Version declaration
        window.Imported = window.Imported || {};                // Import namespace
        Imported[PLUGIN_NAME] = $.VERSION;                      // Import declaration

    // ======== Utility (share) ======== //
    // ======== Parameter stuff ======== //

        void (p => {

            if (!p) { SceneManager.showDevTools(); throw new Error(ERR_NOPARAM); };

            $.parse = {
                bool: function(name) { return p[name] === 'true'; },
                int:  function(name) { return parseInt(p[name], 10) || 0; },
                tag:  function(name) {
                    const FORBID = [':','>'];
                    const tag    = p['Notetag: ' + name];
                    const dFault = name;
                    if (!tag || FORBID.some(f => tag.includes(f))) {
                        console.warn(WARN_BADVAL.format(tag, 'notetag', name, dFault));
                        return dFault;
                    }
                    return tag;
                },
                prop: function(name, dFault = '_' + name) {
                    const prop = p['Property: ' + name];
                    if (!prop) {
                        console.warn(WARN_BADVAL.format(prop, 'property', name, dFault));
                        return dFault;
                    }
                    return prop;
                }
            };

            $.ffmult = $.parse.int('Fast-Forward Multiplier');

            $.disable = {
                sw: $.parse.int('Disable Events Switch'),
                ex: p['Bypass Disable Name']
            };

            $.freeze = {
                sw: $.parse.int('Freeze Events Switch'),
                ex: p['Bypass Freeze Name'],
                instant:      $.parse.bool('Freeze Instantly'),
                ignoreRoutes: $.parse.bool('Ignore Frozen Move Routes')
            };

            $.multiTrigger = $.parse.bool('Multi-Event Trigger');

            $.tags = {
                savEvts: $.parse.tag('save')
            };

            Object.defineProperty($, 'P_SAVE', { value: $.parse.prop('Save', PLUGIN_NAME) });

        })($.params = PluginManager.parameters(PLUGIN_NAME));

    // ========= Init Routines ========= //

        $._init = function() { $.savProps.forEach(p => $.s[p].init()); };

    // ======== Utility (local) ======== //

        /**
         * @param {Game_Event} event - Game_Event instance to check
         * @param {String} sub - Substring to seek
         * @return {Boolean} True iff specified string was present in the event's name.
         */
        $.checkName = function(event, sub) { return sub && String(event?.event?.().name || '').includes(sub); };

        $.checkSw = {
            /** @returns {Boolean} True iff "Disable Events" switch is on. */
            disable: function() { return $gameSwitches.value($.disable.sw); },
            /** @returns {Boolean} True iff "Freeze Events" switch is on. */
            freeze:  function() { return $gameSwitches.value($.freeze.sw);  }
        };

        /**
         * @param {Game_Event} event - Game_Event instance to check
         * @returns {Boolean} True iff the event should have its trigger disabled at the moment.
         */
        $.isDisabled = function(event) {
            if ($.checkName(event, $.disable.ex)) return false;
            return $.checkSw.disable();
        };

        /**
         * @param {Game_Event} event - Game_Event instance to check
         * @returns {Boolean} True iff the event should be visually frozen at the moment.
         */
        $.isFrozen = function(event) {
            if ($.checkName(event, $.freeze.ex)) return false;
            return $.checkSw.freeze() && ($.freeze.instant ? true : !event.isMoving());
        };

        $.s = {
            saveEvt: {
                /** Initialise saved events. */
                init:      function() { $.savEvts = {}; },
                /** @returns {Game_Event[]} Array of this map's events that should be saved.  */
                getEvents: function() {
                    return $gameMap.events().filter(ev => ev.event()?.meta[$.tags.savEvts]);
                },
                /** @returns Data to save for this map. */
                getData:   function() { return this.getEvents(); },
                /** Adds this map's data to the plugin's memory. */
                addData:   function() {
                    const mapId = $gameMap.mapId();
                    if (mapId) {
                        const data = this.getData();
                        if (data.length) $.savEvts[mapId] = data;
                    }
                },
                /**
                 * @param {Game_Event[]} data - Saved event data
                 * @returns {Number} Corresponding event ID.
                 */
                dataEvId:  function(data) { return data?._eventId || 0; },
                /** Applies relevant saved event data to this map. */
                applyData: function() {
                    const mapId = $gameMap.mapId();
                    const EVTS = $.savEvts[mapId];
                    if (EVTS) Object.keys(EVTS).forEach(k => {
                        const data = EVTS[k];
                        const id   = this.dataEvId(data);
                        const ev   = $gameMap.event(id);
                        if (ev && data) Object.keys(data).forEach(k => ev[k] = data[k]);
                    }, this);
                    delete $.savEvts[mapId];
                },
                /**
                 * @param {Object} acc - Aggregate plugin data to add to save
                 * @returns {Object} Plugin data to save, including saved events.
                 */
                mkSave:    function(acc) {
                    if (Object.keys($.savEvts).length) {
                        acc = acc || {};
                        acc.savEvts = $.savEvts;
                    }
                    return acc;
                }
            }
        };

        Object.defineProperty($, 'savProps', { get: () => Object.keys($.s) });
        $._init();

        /** Stuff to do before changing map. */
        $.beforeChangeMap = function() {
            if ($dataMap && Object.keys($dataMap).length > 0) $.s.saveEvt.addData();
        };

        /** Stuff to do after changing map. */
        $.afterChangeMap = function() {
            $.s.saveEvt.applyData();
        };

        /** @returns {{savEvts:Object}} This plugin's save data. */
        $.mkSaveData = function() {
            return $.savProps.reduce((a, c) => a = $.s[c].mkSave(a), undefined);
        };

        /**
         * @param {Object} contents - Aggregate save contents
         * @returns {Object} Save contents including plugin data, as appropriate.
         */
        $.mkSave = function(contents) {
            const data = $.mkSaveData();
            if (data) contents[$.P_SAVE] = data;
            return contents;
        };

        /**
         * Extracts plugin data from save file as appropriate.
         * @param {Object} contents - Save contents from file
         */
        $.exSave = function(contents) {
            const data = contents[$.P_SAVE];
            if (data) $.savEvts = data.savEvts;
        };

    // ======== Plugin Commands ======== //
    // ============ Extends ============ //
    // ========== Alterations ========== //

        // Override! Update map as many times as appropriate.
        void (mult => { if (mult === 2) return;
            Scene_Map.prototype.updateMainMultiply = function() {
                this.updateMain();
                if (this.isFastForward()) {
                    for (let n = mult; --n > 0;) this.updateMain();
                }
            };
        })($.ffmult);

        $.alias = $.alias || {};        // This plugin's alias namespace

        // Alias! Do not start disabled events.
        void (alias => {
            Game_Event.prototype.start = function() {
                if (!$.isDisabled(this)) alias.apply(this, arguments);
            };
        })($.alias.Game_Event_start = Game_Event.prototype.start);
        
        // Alias! Do not update frozen events.
        void (alias => {
            Game_Event.prototype.update = function() {
                if (!$.isFrozen(this)) alias.apply(this, arguments);
            };
        })($.alias.Game_Event_update = Game_Event.prototype.update);

        // Alias! Do not auto-face player when activated if frozen.
        void (alias => {
            Game_Event.prototype.lock = function() {
                if (!$.isFrozen(this)) alias.apply(this, arguments);
            };
        })($.alias.Game_Event_lock = Game_Event.prototype.lock);

        // Alias! Skip assigning move routes to frozen events if appropriate.
        void (alias => {
            Game_Event.prototype.forceMoveRoute = function(moveRoute) {
                if (!$.freeze.ignoreRoutes || !$.isFrozen(this)) alias.apply(this, arguments);
            };
        })($.alias.Game_Event_forceMoveRoute = Game_Event.prototype.forceMoveRoute);

        // Alias! Frozen events should not move.
        void (alias => {
            Game_Event.prototype.isMoveRouteForcing = function() {
                if ($.isFrozen(this)) return false;
                return alias.apply(this, arguments);
            };
        })($.alias.Game_Event_isMoveRouteForcing = Game_Event.prototype.isMoveRouteForcing);

        // Multi-event trigger stuff~
        void (() => { if (!$.multiTrigger) return;

            // Override! Return statements consolidated to allow multiple events to start.
            Game_Player.prototype.triggerButtonAction = function() {
                let result = false;
                if (Input.isTriggered('ok')) {
                    if (this.getOnOffVehicle())        result = true;
                    this.checkEventTriggerHere([0]);
                    if ($gameMap.setupStartingEvent()) result = true;
                    this.checkEventTriggerThere([0,1,2]);
                    if ($gameMap.setupStartingEvent()) result = true;
                }
                return result;
            };

            // Override! Removed "is event running" check.
            Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
                for (const event of $gameMap.eventsXy(x, y)) {
                    if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
                        event.start();
                    }
                }
            };

            // Alias! Move "running" check here to avoid multi-triggered events pushing others out of the queue.
            void (alias => {
                Game_Map.prototype.setupStartingMapEvent = function() {
                    if (!this._interpreter.isRunning()) alias.apply(this, arguments);
                };
            })($.alias.Game_Map_setupStartingMapEvent = Game_Map.prototype.setupStartingMapEvent);

        })();

        // Alias! Before change map triggers (because need to act before $dataMap is [re]loaded)
        void (alias => {
            Scene_Map.prototype.create = function() {
                $.beforeChangeMap();
                alias.apply(this, arguments);
            };
        })($.alias.Scene_Map_create = Scene_Map.prototype.create);

        // Alias! Map change triggers~
        void (alias => {
            Game_Map.prototype.setup = function(mapId) {
                alias.apply(this, arguments);
                $.afterChangeMap();
            };
        })($.alias.Game_Map_setup = Game_Map.prototype.setup);

        // Alias! Initialise plugin data on new game.
        void (alias => {
            DataManager.createGameObjects = function() {
                alias.apply(this, arguments);
                $._init();
            };
        })($.alias.DataManager_createGameObjects = DataManager.createGameObjects);

        // Alias! Include plugin data in saves.
        void (alias => {
            DataManager.makeSaveContents = function() {
                return $.mkSave(alias.apply(this, arguments));
            };
        })($.alias.DataManager_makeSaveContents = DataManager.makeSaveContents);

        // Alias! Extract plugin data from saves.
        void (alias => {
            DataManager.extractSaveContents = function(contents) {
                alias.apply(this, arguments);
                $._init();
                $.exSave(contents);
            };
        })($.alias.DataManager_extractSaveContents = DataManager.extractSaveContents);

    })(CAE[NAMESPACE] = CAE[NAMESPACE] || {}, CAE.Utils = CAE.Utils || {});

})();