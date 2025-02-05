// ==================================================
// Cae_OnUseEffects.js
// ==================================================

/**
 * @file Cae_OnUseEffects.js (RMMZ)
 * Subskills, target restriction, action formulae, hide/disable/consume conditions, etc.
 * @author Caethyril
 * @version 1.6
 */

//#region Plugin header
/*:
 * @target MZ
 * @plugindesc v1.6 - On-use effects for items & skills.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/index.php?threads/125657/
 * 
 * @help Features:
 *   Each feature is optional~
 * 
 *    - Hide numerical popups based on a scripted condition.
 *    - Change the "Miss" text that shows on miss/evade.
 *    - Show extra, customisable popups under specific conditions, e.g. crit.
 *    - Customise various action-related formulae, e.g. hit and evasion rates.
 *    - Use notetags to give skills a list of subskills.
 *      - A subskill can be selected for use instead of the main skill.
 *    - Restrict valid targets for items/skills using scripted notetags.
 *    - Hide and/or disable skills/items using scripted notetags.
 *    - Enable/disable skill/item effects using scripted notetags.
 *    - Specify per-item conditions for items to be consumed when used.
 *    - Set an item/skill's common event to insert into current event if apt.
 *      - E.g. run an item's common event mid-event via the Open Menu command.
 * 
 * Experimental features:
 *    - Process counter-hit/reflection after the original action.
 *    - Change the action order for counter-hits and magic reflection.
 *   Note that damage popups may behave strangely with these options enabled!
 * 
 * Custom popups:
 *   The default "Custom Popups" parameter value offers some premade examples:
 *          Crit - when a critical hit lands
 *       Reflect - when an action is reflected
 *     Effective - when target is weak to action element
 *      Resisted - when target is resistant to action element
 *        Immune - when target is immune to action element
 * 
 * Skill Notetag:
 *        <subskills: X, X, X>
 *   e.g. <subskills: 12, 13, 14>
 *    - Replace the Xs with skill IDs.
 *    - When selected for use, a list of these skills will be shown.
 *      Select one of these to use, or cancel to return to skill selection.
 *    - Alternatively you can use script to determine the skill IDs...
 * 
 *        <subskills: SCRIPT>
 *   e.g. <subskills: return 5 < subject.level ? [21,22,23] : [11,12,13];>
 *    - Replace SCRIPT with valid JavaScript.
 *      The return value should be an array of integers: subskill IDs.
 *      Local var: subject (a.k.a. user).
 * 
 * Skill/Item Notetags:
 *        <target filter: SCRIPT>
 *   e.g. <target filter: return target.isStateAffected(10);>
 *   e.g. <target filter: return target.agi < subject.agi;>
 *    - Replace SCRIPT with valid JavaScript.
 *      This will be checked for each target candidate...
 *      If the return value is falsy, that target will be unselectable.
 *      Local vars: item, subject (a.k.a. user), target.
 * 
 *        <enable condition: SCRIPT>
 *   e.g. <enable condition: return 100 <= subject.mat;>
 *    - Replace SCRIPT with valid JavaScript.
 *      If this returns falsy, the skill/item will be disabled in-game.
 *      Local vars: item, subject (a.k.a. user).
 * 
 *        <show condition: SCRIPT>
 *   e.g. <show condition: return $gameSwitches.value(9);>
 *    - Replace SCRIPT with valid JavaScript.
 *      If this returns falsy, the skill/item will not be shown in-game.
 *      Local vars: item, subject (a.k.a. user).
 * 
 *        <effect conditions: SCRIPT>
 *   e.g. <effect conditions: return [true, target.isStateAffected(5)];>
 *    - Replace SCRIPT with valid JavaScript.
 *      Returns an array of true or false values corresponding to the effects
 *         on the item/skill, in the order they are listed.
 *      If an effect's value is false, that effect will not be applied.
 *      Undefined values are treated as true (i.e. effect will apply).
 *      So for the example above:
 *       - Effect 2 will apply only if the target is affected by state 5;
 *       - All other effects will apply unconditionally.
 *      Local vars: item, subject (a.k.a. user), target.
 * 
 *        <instant CE>
 *    - Items/skills with this tag will insert any Common Event effects into
 *        the currently-running event, if applicable.
 *      (Default is to run the event after the current one has finished.)
 * 
 * Item Notetag:
 *        <consumable: SCRIPT>
 *   e.g. <consumable: return subject.actorId() !== 7;>
 *   e.g. <consumable: return target.level < 20 || Math.random() < 0.5;>
 *    - Replace SCRIPT with valid JavaScript.
 *      If the return value is falsy, the item will not be consumed when used.
 *      Local vars: item, subject = user, targets, target.
 * 
 *   Do not use the ">" character in any script notetags!
 *    - Flip expressions and use "<" instead where necessary.
 *   Note that all these notetags can span multiple lines, e.g.
 *        <effect conditions: return [
 *          true,
 *          target.isStateAffected(5),
 *          50 < subject.luk
 *        ];>
 * 
 * Custom formulae:
 *   You can define your own hit, evade, and crit formulae in the parameters.
 *   These formulae all execute in the appropriate Game_Action context.
 *   For reference, these represent the default formulae:
 * 
 *    - Hit:
 *       return 0.01 * successRate * (this.isPhysical() ? subject.hit : 1);
 * 
 *    - Evasion:
 *       if (this.isPhysical()) return target.eva;
 *       if (this.isMagical()) return target.mev;
 *       return 0;
 * 
 *    - Crit Rate:
 *       return doesCrit ? subject.cri * (1 - target.cev) : 0;
 * 
 *    - Counter:
 *       return this.isPhysical() && target.canMove() ? target.cnt : 0;
 * 
 *    - Reflection:
 *       return this.isMagical() ? target.mrf : 0;
 * 
 *    - Crit Damage:
 *       return damage * 3;
 * 
 *    - Guard Damage:
 *       return damage / (damage > 0 && target.isGuard() ? 2 * target.grd : 1);
 * 
 *    - Can Substitute:
 *       return target.isDying() && !this.isCertainHit();
 * 
 *    - Get Substitute:
 *       return allies.find(m => m.isSubstitute());
 * 
 *   To use a default formula, simply leave the corresponding parameter blank.
 *   For Get Substitute I suggest this formula instead of the default one:
 * 
 *    - Get Substitute:
 *       const a = allies.filter(m => m.isSubstitute() && m !== target);
 *       return a[Math.randomInt(a.length)];
 * 
 *   This says:  "pick a random non-target ally who can substitute";
 *   vs default: "pick the first ally who can substitute".
 *   This is the plugin's default "Get Sub Formula" parameter value.
 *
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Terms of use:
 *   This plugin is free to use and/or modify, under these conditions:
 *     - None of the original plugin header is removed.
 *     - Credit is given to Caethyril for the original work.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Compatibility:
 *   Overrides: Game_Action:     (blank overrides are skipped)
 *                itemHit, itemEva, itemCri, itemCnt, itemMrf,
 *                applyCritical, applyGuard
 *              BattleManager:   (skipped if "Can Sub Formula" param is blank)
 *                checkSubstitute
 *              Game_Unit:       (skipped if "Get Sub Formula" param is blank)
 *                substituteBattler
 *              Sprite_Damage:   (fontSize is skipped if the param is 0)
 *                createMiss, fontSize
 *   Aliases:   BattleManager:
 *                invokeCounterAttack, invokeMagicReflection
 *              Scene_Boot:
 *                start
 *              Scene_Battle:
 *                isAnyInputWindowActive
 *              Sprite_Damage:
 *                createDigits
 *              Sprite_Battler:
 *                createDamageSprite
 *              Sprite_Actor:
 *                onMouseEnter, onPress
 *              Window_ItemList:
 *                includes
 *              Window_SkillList:
 *                callOkHandler, item, hide, show, includes
 *              Window_BattleEnemy:
 *                refresh
 *              Window_BattleActor:
 *                show, select, cursorLeft, cursorRight
 *              Window_BattleItem:
 *                includes
 *              Game_Action:
 *                testApply, itemTargetCandidates, makeTargets, applyGlobal,
 *                executeDamage, apply, applyItemEffect, setAttack, setGuard
 *              Game_BattlerBase:
 *                meetsUsableItemConditions
 *              Game_Enemy:
 *                isActionValid
 *              Game_Unit:
 *                randomTarget, randomDeadTarget
 *              Game_Party:
 *                canUse, consumeItem
 *              Game_Temp:
 *                reserveCommonEvent
 *   Defines:   Window_Subskill  (name customisable)
 *   This plugin does not add data to save files.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Changelog:
 *   v1.6 (2022-09-14): Fixed - A typo in forceShowPopups (Counter/Reflect).
 *   v1.5 (2021-09-05): Fixed - Enemies now won't select skills with 0 targets.
 *                      Fixed - Attack/Guard subskills should work now!
 *                      Fixed - Rare freeze when selecting previous actor.
 *                    Changed - Effect conditions eval after damage formula.
 *                      Added - "Filter Random Targets" parameter.
 *   v1.4 (2021-03-12): Fixed - Target filter now skips untargetable actors.
 *   v1.3 (2020-10-27): Fixed - Should now see correct targets out of battle.
 *                              (Affected Consumable, Crit Dmg, and Get Sub.)
 *                      Fixed - Check Reflect First shouldn't allow 2 counters.
 *                    Changed - Counter/Reflect order options are experimental.
 *                    Changed - <target filter> tag is now action context.
 *                    Removed - "Hide Zero Damage Popups" parameter.
 *                      Added - "JS: Hide Popup Formula" parameter.
 *                      Added - <effect conditions> notetag!
 *                      Added - more popup customisation plugin parameters:
 *                                "Custom Popups",
 *                                "Popup Width Mult",
 *                                "Popup Font Size".
 *   v1.2 (2020-10-21): Fixed - "Show Unusable Items" now checks item occasion.
 *   v1.1 (2020-10-20): Extended plugin help and code comments.
 *                    Changed - multi-target items: <consumable> var "target"
 *                                now references last target, not first.
 *                      Added - The following plugin parameters:
 *                                "Show Unusable Battle Items",
 *                                "'Miss' Popup Text",
 *                                "Counter After Hit",
 *                                "Reflect After Hit",
 *                                "Allow Counter + Reflect",
 *                                "Check Reflect First",
 *                                "JS: Crit Rate Formula",
 *                                "JS: Counter-Hit Formula",
 *                                "JS: Reflect Formula",
 *                                "JS: Crit Damage Formula",
 *                                "JS: Guard Damage Formula",
 *                                "JS: Can Substitute Formula",
 *                                "JS: Get Substitute Formula".
 *   v1.0 (2020-10-19): Initial release! Merge/extension of my RMMV plugins.
 * 
 * @param Filter Random Targets
 * @type boolean
 * @desc If true, <target filter> also restricts random targets, including default enemy AI.
 * @default true
 * 
 * @param Show Unusable Battle Items
 * @type boolean
 * @desc If true, items that cannot be used will be disabled but visible in battle.
 * @default false
 * 
 * @param --- Subskill Window ---
 * @type select
 * @desc Configuration options for the subskill window.
 * 
 * @param Battle Subskill Width
 * @parent --- Subskill Window ---
 * @type number
 * @min 0
 * @desc Width (px) of the subskill window in battle.
 * Use 0 to match the width of the selected item.
 * @default 0
 * 
 * @param Battle Subskill Max Rows
 * @parent --- Subskill Window ---
 * @type number
 * @min 1
 * @desc Maximum number of subskills visible at once without scrolling. Applies in battle.
 * @default 5
 * 
 * @param --- Action Popups ---
 * @type select
 * @desc Options for configuring damage popups during battle.
 * 
 * @param JS: Hide Popup Formula
 * @parent --- Action Popups ---
 * @type multiline_string
 * @desc Returns true iff popup should be hidden. Local vars: item, subject, target, value. Leave blank for default.
 * @default
 * 
 * @param "Miss" Popup Text
 * @parent --- Action Popups ---
 * @type string
 * @desc Displayed when an action misses or is evaded. Use | to list multiple random values. Default: Miss.
 * @default Miss
 * 
 * @param Custom Popups
 * @parent --- Action Popups ---
 * @type struct<CustomPopupType>[]
 * @desc Definitions for custom popups: what to display and when to display it.
 * @default ["{\"Text\":\"Crit!\",\"Colour\":\"#FFFF00\",\"JS: Condition\":\"return result.critical;\"}","{\"Text\":\"Reflect!\",\"JS: Condition\":\"return this._reflectionTarget;\",\"Colour\":\"#FFFF00\"}","{\"Text\":\"Effective!\",\"JS: Condition\":\"const rate = this.calcElementRate(target);\\nreturn rate > 1;\",\"Colour\":\"#00FFFF\"}","{\"Text\":\"Resisted!\",\"JS: Condition\":\"const rate = this.calcElementRate(target);\\nreturn 0 < rate && rate < 1;\",\"Colour\":\"#00FFFF\"}","{\"Text\":\"Immune!\",\"JS: Condition\":\"const rate = this.calcElementRate(target);\\nreturn rate <= 0;\",\"Colour\":\"#00FFFF\"}"]
 * 
 * @param Popup Width Mult
 * @parent --- Action Popups ---
 * @type number
 * @min 1
 * @desc Determines width of "Miss" and Custom popups. Increase if text is too compressed. Default: 3.
 * @default 6
 * 
 * @param Popup Font Size
 * @parent --- Action Popups ---
 * @type number
 * @min 0
 * @desc The font size of all battle popups.
 * Use 0 for default (normal font size + 4).
 * @default 0
 * 
 * @param --- Custom Formulae ---
 * @type select
 * @desc Configuration options for various action-related formulae: hit, evasion, crit, counter, etc.
 * 
 * @param JS: Hit Formula
 * @parent --- Custom Formulae ---
 * @type multiline_string
 * @desc Returns hit rate in [0, 1]. Local vars: item, subject, target, successRate. Leave blank for default.
 * @default
 * 
 * @param JS: Evasion Formula
 * @parent --- Custom Formulae ---
 * @type multiline_string
 * @desc Returns evasion rate in [0, 1]. Local vars: item, subject, target, successRate. Leave blank for default.
 * @default
 * 
 * @param JS: Crit Rate Formula
 * @parent --- Custom Formulae ---
 * @type multiline_string
 * @desc Returns crit rate in [0, 1]. Local vars: item, subject, target, doesCrit. Leave blank for default.
 * @default
 * 
 * @param JS: Counter-Hit Formula
 * @parent --- Custom Formulae ---
 * @type multiline_string
 * @desc Returns counter-hit rate in [0, 1]. Local vars: item, subject, target. Leave blank for default.
 * @default
 * 
 * @param JS: Magic Reflect Formula
 * @parent --- Custom Formulae ---
 * @type multiline_string
 * @desc Returns reflect rate in [0, 1]. Local vars: item, subject, target. Leave blank for default.
 * @default
 * 
 * @param JS: Crit Damage Formula
 * @parent --- Custom Formulae ---
 * @type multiline_string
 * @desc Returns critical damage. Local vars: item, subject, target, damage. Leave blank for default.
 * @default
 * 
 * @param JS: Guard Damage Formula
 * @parent --- Custom Formulae ---
 * @type multiline_string
 * @desc Returns damage after guarding. Local vars: item, subject, target, damage. Leave blank for default.
 * @default
 * 
 * @param JS: Can Sub Formula
 * @parent --- Custom Formulae ---
 * @type multiline_string
 * @desc Returns true iff substitution can occur. Local vars: item, subject, target. Leave blank for default.
 * @default
 * 
 * @param JS: Get Sub Formula
 * @parent --- Custom Formulae ---
 * @type multiline_string
 * @desc Returns substitute battler. Local vars: item, subject, target, allies. Leave blank for default.
 * @default const a = allies.filter(m => 
 * m.isSubstitute() && m !== target);
 * return a[Math.randomInt(a.length)];
 * 
 * @param --- Counter/Reflect ---
 * @type select
 * @desc Options for counter-hit and magic reflection.
 * May result in glitchy damage popups if used.
 * 
 * @param Counter After Hit
 * @parent --- Counter/Reflect ---
 * @type boolean
 * @desc If true, counter attacks will not automatically negate the attack they are countering.
 * @default false
 * 
 * @param Reflect After Hit
 * @parent --- Counter/Reflect ---
 * @type boolean
 * @desc If true, magic reflection will process the hit on both the subject and the target.
 * @default false
 * 
 * @param Allow Counter + Reflect
 * @parent --- Counter/Reflect ---
 * @type boolean
 * @desc If true, counter-hit and reflection checks can both pass for a single action.
 * @default false
 * 
 * @param Check Reflect First
 * @parent --- Counter/Reflect ---
 * @type boolean
 * @desc If true, reflection will be checked before counter-hit.
 * @default false
 * 
 * @param --- Advanced ---
 * @type select
 * @desc Advanced internal configuration options.
 * 
 * @param Notetag: subskills
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the "subskills" Skill notetag. (Case-sensitive!)
 * @default subskills
 * 
 * @param Notetag: target filter
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the "target filter" Item/Skill notetag. (Case-sensitive!)
 * @default target filter
 * 
 * @param Notetag: enable condition
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the "enable condition" Item/Skill notetag. (Case-sensitive!)
 * @default enable condition
 * 
 * @param Notetag: show condition
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the "show condition" Item/Skill notetag. (Case-sensitive!)
 * @default show condition
 * 
 * @param Notetag: effect conditions
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the "effect conditons" Item/Skill notetag. (Case-sensitive!)
 * @default effect conditions
 * 
 * @param Notetag: instant CE
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the "instant CE" Item/Skill notetag. (Case-sensitive!)
 * @default instant CE
 * 
 * @param Notetag: consumable
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the "consume eval" Item notetag. (Case-sensitive!)
 * @default consumable
 * 
 * @param Property: _wSubskill
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the property added to instances of Window_SkillList that spawn a subskill window.
 * @default _wSubskill
 * 
 * @param Property: Window_Subskill
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the subskill window. (Global!)
 * Default: Window_Subskill
 * @default Window_Subskill
 */
// =========================
/*~struct~CustomPopupType:
 * @param Text
 * @type string
 * @desc Text to display. Use | to list multiple random values.
 * @default
 * 
 * @param Colour
 * @type string
 * @desc Text colour (CSS format) for this popup.
 * Leave blank for default.
 * @default
 * 
 * @param JS: Condition
 * @type multiline_string
 * @desc A JS function; popup displays iff this returns truthy.
 * Local vars: item, subject (a.k.a. user), target, result, value.
 * @default return true;
 */
//#endregion

(function() {
'use strict';

    const NAMESPACE   = 'OnUseEffects';
    const PLUGIN_NAME = 'Cae_' + NAMESPACE;
    const ERR_PRE     = PLUGIN_NAME + '.js ';
    const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin file is named correctly and try again.';
    const ERR_USERFCT = ERR_PRE + 'notetag function error!'
    const WARN_BADVAL = ERR_PRE + 'could not use %1 value "%2". Reverting to default: "%3".';

    const FUNCSPACE = 'CAE.' + NAMESPACE;       // Modularity for function constructors

    window.CAE = window.CAE || {};      // Author namespace

    (($, U) => {

        Object.defineProperty($, 'VERSION', { value: 1.5 });    // Version declaration
        window.Imported = window.Imported || {};                // Import namespace
        Imported[PLUGIN_NAME] = $.VERSION;                      // Import declaration

    // ======== Utility (share) ======== //
    // ======== Parameter stuff ======== //

        void (p => {

            if (!p) { SceneManager.showDevTools(); throw new Error(ERR_NOPARAM); };

            // Functions for making functions
            $.mkFct = {
                /**
                 * @param {String} body - Function body
                 * @returns {String} Function body wrapped in a try-catch statement.
                 */
                wrapTry: function(body = '') {
                    body = 'try {\n\t' + body.replace(/\n/g, '\n\t');
                    body += '\n} catch (ex) {\n\tSceneManager.showDevTools();\n\tconsole.error("' + ERR_USERFCT + '\\n");\n\tthrow ex;\n}';
                    return body;
                },
                /**
                 * @param {String} body - Function body
                 * @param {String} type - Function type: determines function args & local vars
                 * @returns {Function} Corresponding function with try-catch error capture.
                 */
                core: function(body, type) {
                    if (!body) return;
                    const [argL, argF] = this.args.b(type);
                    return new Function(...argF, this.wrapTry(this.localArgs(argL) + body));
                },
                /**
                 * @param {Object} o - Local argument object, from mkFct.args.l
                 * @returns {String} Function body text defining the relevant local variables.
                 */
                localArgs: function(o) {
                    return Object.keys(o).reduce((a, k) => a += 'const ' + k + ' = ' + o[k] + ';\n', '');
                },
                // Function arguments
                args: {
                    /**
                     * @param {String} type - Lookup value determining which arguments to retrieve
                     * @returns {[Object,String[]]} Relevant internal and external argument data.
                     */
                    b: function(type) { return [this.l(type), this.f(type)]; },
                    /**
                     * @param {String} type - Lookup value determining which arguments to retrieve
                     * @returns {Object} Relevant internal argument data.
                     */
                    l: function(type) {
                        switch (type) {
                            case 'canSub':
                                return {
                                    item:    'this.item()',
                                    subject: 'this.subject()',
                                    user:    'subject',
                                    targets: FUNCSPACE + '.getItemTargets()'   /*no-doc*/
                                };
                            case 'consume':
                                return {
                                    subject: FUNCSPACE + '.getItemUser()',
                                    user:    'subject',
                                    targets: FUNCSPACE + '.getItemTargets()',
                                    target:  FUNCSPACE + '.getCurrentTarget(targets)'
                                };
                            case 'counter':
                                return {
                                    item:    'this.item()',
                                    subject: 'this.subject()',
                                    user:    'subject',
                                    targets: FUNCSPACE + '.getItemTargets()',   /*no-doc*/
                                };
                            case 'critRate':
                                return {
                                    item:     'this.item()',
                                    doesCrit: 'item.critical',
                                    subject:  'this.subject()',
                                    user:     'subject',
                                    targets:  FUNCSPACE + '.getItemTargets()'   /*no-doc*/
                                };
                            case 'critDmg':
                                return {
                                    item:    'this.item()',
                                    subject: 'this.subject()',
                                    user:    'subject',
                                    targets: FUNCSPACE + '.getItemTargets()',   /*no-doc*/
                                    target:  FUNCSPACE + '.getCurrentTarget(targets)'
                                };
                            case 'customPopup':
                                return {
                                    item:    'this.item()',
                                    subject: 'this.subject()',
                                    user:    'subject',
                                    targets: FUNCSPACE + '.getItemTargets()',   /*no-doc*/
                                    result:  'target.result()'
                                };
                            case 'doEffect':
                                return {
                                    item:    'this.item()',
                                    subject: 'this.subject()',
                                    user:    'subject',
                                    targets: FUNCSPACE + '.getItemTargets()'   /*no-doc*/
                                };
                            case 'enableItem':
                                return { user: 'subject' };
                            case 'getSub':
                                return {
                                    item:    'this.item()',
                                    allies:  'unit.members()',
                                    subject: 'this.subject()',
                                    user:    'subject',
                                    targets: FUNCSPACE + '.getItemTargets',   /*no-doc*/
                                    target:  FUNCSPACE + '.getCurrentTarget(targets)'
                                };
                            case 'guardDmg':
                                return {
                                    item:    'this.item()',
                                    subject: 'this.subject()',
                                    user:    'subject',
                                    targets: FUNCSPACE + '.getItemTargets()'   /*no-doc*/
                                }
                            case 'hidePopup':
                                return {
                                    item:    'this.item()',
                                    subject: 'this.subject()',
                                    user:    'subject',
                                    targets: FUNCSPACE + '.getItemTargets()'   /*no-doc*/
                                };
                            case 'hitEva':
                                return {
                                    item:        'this.item()',
                                    successRate: 'item.successRate',
                                    subject:     'this.subject()',
                                    user:        'subject',
                                    targets:     FUNCSPACE + '.getItemTargets()',   /*no-doc*/
                                };
                            case 'reflect':
                                return {
                                    item:    'this.item()',
                                    subject: 'this.subject()',
                                    user:    'subject',
                                    targets: FUNCSPACE + '.getItemTargets()',   /*no-doc*/
                                };
                            case 'showItem':
                                return { user: 'subject' };
                            case 'subskill':
                                return { user: 'subject' };
                            case 'tgtFilter':
                                return { user: 'subject' };
                            default:
                                return {};
                        }
                    },
                    /**
                     * @param {String} type - Lookup value determining which arguments to retrieve
                     * @returns {String[]} Function argument names
                     */
                    f: function(type) {
                        switch (type) {
                            case 'canSub':
                                return ['target'];
                            case 'consume':
                                return ['item'];
                            case 'counter':
                                return ['target'];
                            case 'critRate':
                                return ['target'];
                            case 'critDmg':
                                return ['damage'];
                            case 'customPopup':
                                return ['target', 'value'];
                            case 'doEffect':
                                return ['target'];
                            case 'enableItem':
                                return ['item', 'subject'];
                            case 'getSub':
                                return ['unit'];   /*no-doc*/
                            case 'guardDmg':
                                return ['damage', 'target'];
                            case 'hidePopup':
                                return ['target', 'value'];
                            case 'hitEva':
                                return ['target'];
                            case 'reflect':
                                return ['target'];
                            case 'showItem':
                                return ['item', 'subject'];
                            case 'subskill':
                                return ['subject'];
                            case 'tgtFilter':
                                return ['item', 'subject', 'target'];
                            default:
                                return [];
                        }
                    }
                },
                // Macro methods for generating functions for specific notetags
                fromTag: {
                    subskill: function(tag) {
                        const s = /^(\s*[\+\-]?\d+\s*\,?)+$/.test(tag) ? 'return [' + tag + '];' : tag;
                        return $.mkFct.core(s, 'subskill');
                    },
                    tgtFilter:  function(tag) { return $.mkFct.core(tag, 'tgtFilter'); },
                    enableItem: function(tag) { return $.mkFct.core(tag, 'enableItem'); },
                    showItem:   function(tag) { return $.mkFct.core(tag, 'showItem'); },
                    consume:    function(tag) { return $.mkFct.core(tag, 'consume'); },
                    doEffect:   function(tag) { return $.mkFct.core(tag, 'doEffect'); }
                },
                /**
                 * @param {String} paramName - Identifies which plugin parameter to reference
                 * @param {String} type - Determines local variables & function arguments
                 * @returns {Function} Corresponding function, ready for use.
                 */
                fromParam: function(paramName, type) {
                    return $.mkFct.core(p['JS: ' + paramName + ' Formula'], type);
                }
            };

            // Plugin parameter parsers
            $.parse = {
                selRef: {},
                sel:  function(name) { return this.selRef[name]?.indexOf(p[name]); },
                bool: function(name) { return p[name] === 'true'; },
                int:  function(name) { return parseInt(p[name], 10) || 0; },
                prop: function(name, parent) {
                    const dFault = name;
                    const prop = p['Property: ' + name];
                    if (!prop || parent[prop]) {
                        console.warn(WARN_BADVAL.format('property', prop, dFault));
                        return dFault;
                    }
                    return prop;
                },
                tag: function(name) {
                    const dFault = name;
                    const tag = p['Notetag: ' + name];
                    if (!tag || ['>',':'].some(c => tag.includes(c))) {
                        console.warn(WARN_BADVAL.format('notetag', tag, dFault));
                        return dFault;
                    }
                    return tag;
                }
            };

            $.filterRandomTargets     = $.parse.bool('Filter Random Targets');
            $.showDisabledBattleItems = $.parse.bool('Show Unusable Battle Items');

            // Action popups
            $.popups = {
            //  hide0Dmg:  $.parse.bool('Hide Zero Damage Popups'),
                hide:      $.mkFct.fromParam('Hide Popup', 'hidePopup'),
                missText:  String(p['"Miss" Popup Text'] || '').trim(),
                widthMult: $.parse.int('Popup Width Mult'),
                fontSize:  $.parse.int('Popup Font Size'),
                custom:    JSON.parse(p['Custom Popups']).map(JSON.parse).map(o => {
                    return {
                        c: o.Colour,
                        l: o.Text,
                        t: 2,   // ['Before','Replace','After'].indexOf(o.Timing),  // all "After"
                        f: $.mkFct.core(o['JS: Condition'], 'customPopup')
                    };
                })
            };

            // Subskill window position/size
            $.wSubskills = {
                battle: {
                    r: $.parse.int('Battle Subskill Max Rows'),
                    w: $.parse.int('Battle Subskill Width')
                }
            };

            // Counter/reflect rules
            $.postCnt  = $.parse.bool('Counter After Hit');
            $.postMrf  = $.parse.bool('Reflect After Hit');
            $.bCntMrf  = $.parse.bool('Allow Counter + Reflect');
            $.mrfFirst = $.parse.bool('Check Reflect First');

            // Custom formulae
            $.itemHit    = $.mkFct.fromParam('Hit', 'hitEva');
            $.itemEva    = $.mkFct.fromParam('Evasion', 'hitEva');
            $.itemCri    = $.mkFct.fromParam('Crit Rate', 'critRate');
            $.itemCnt    = $.mkFct.fromParam('Counter-Hit', 'counter');
            $.itemMrf    = $.mkFct.fromParam('Magic Reflect', 'reflect');
            $.itemCriDmg = $.mkFct.fromParam('Crit Damage', 'critDmg');
            $.itemGrdDmg = $.mkFct.fromParam('Guard Damage', 'guardDmg');
            $.itemCanSub = $.mkFct.fromParam('Can Sub', 'canSub');
            $.itemGetSub = $.mkFct.fromParam('Get Sub', 'getSub');

            // Notetag names
            $.tags = {
                subskill:   $.parse.tag('subskills'),
                tgtFilter:  $.parse.tag('target filter'),
                enableItem: $.parse.tag('enable condition'),
                showItem:   $.parse.tag('show condition'),
                consume:    $.parse.tag('consumable'),
                insertCE:   $.parse.tag('instant CE'),
                doEffect:   $.parse.tag('effect conditions')
            };

            Object.defineProperty($, 'P_SUBSKILL', { value: $.parse.prop('_wSubskill', Window_SkillList.prototype) });
            Object.defineProperty($, 'W_SUBSKILL', { value: $.parse.prop('Window_Subskill', window) });

        })($.params = PluginManager.parameters(PLUGIN_NAME));

    // ========= Init Routines ========= //

        // References for the initialisation functions.
        $._initRef = {
            /** @returns {Object} Key-value pairs: function tag name & relevant database objects. */
            tags: function() {
                return {
                    consume:    'i',
                    doEffect:   'is',
                    enableItem: 'is',
                    showItem:   'is',
                    subskill:   's',
                    tgtFilter:  'is'
                }
            },
            /** @returns {Object} Key-value pairs: database tables & relevant function tag names. */
            data: function() {
                const t = this.tags();
                const [i, s] = ['i','s'].map(k => Object.keys(t).reduce((a, c) => {
                    if (t[c].includes(k)) a.push(c); return a;
                }, []));
                return { $dataItems: i, $dataSkills: s };
            }
        };

        // Property name under which parsed notetag functions are stored.
        Object.defineProperty($, 'TAGFCT', { value: 'TagFct' });

        // This plugin's initialisation functions.
        $._init = {
            /** Creates and stores functions based on all this plugin's script notetags. */
            tags: function() {
                const DATA = $._initRef.data();
                Object.keys(DATA).forEach(k => {    // "$dataItems" &c
                    const L = (k === '$dataItems' ? 'i' : 's') + $.TAGFCT;
                    $[L] = {};
                    const arr = window[k];          // $dataItems &c
                    DATA[k].forEach(p => {          // "consume" &c
                        $[L][p] = {};
                        for (let n = arr.length; --n;) {
                            const tag = $.getTag[p]?.(arr[n]);
                            if (tag) $[L][p][n] = $.mkFct.fromTag[p]?.(tag);
                        }
                    });
                });
            }
        };

        /** Initialises this plugin's database-dependent data. */
        $._initAll = function() {
            const I = $._init;
            Object.keys(I).forEach(k => I[k]());
        };

    // ======== Utility (local) ======== //

        /**
         * Retrieves a specified function parsed from one of this plugin's notetags.
         * @param {String} type - 'i' for item, 's' for skill
         * @param {String} tagName - Internal notetag label, e.g. 'consume'
         * @param {Number} index - Item/skill ID
         * @returns {Function} Relevant function, if it exists.
         */
        $._getTagFct = function(type, tagName, index) { return $[type + $.TAGFCT]?.[tagName]?.[index]; };

        /**
         * @param {Object} item - Database object entry from $dataItems or $dataSkills
         * @returns {String} 'i' for items, 's' for skills.
         */
        $._getTagFctType = function(item) { return DataManager.isItem(item) ? 'i' : 's'; };

        /**
         * @param {Object} obj - Database object (meta property expected)
         * @param {String} name - Internal notetag name
         * @returns {String|Boolean} Notetag value.
         */
        $._getTag = function(obj, name) { return obj.meta?.[$.tags[name]] || ''; };

        // Macro functions for retrieving specific notetag values.
        $.getTag = {
            subskill:   function(o) { return $._getTag(o, 'subskill'); },
            tgtFilter:  function(o) { return $._getTag(o, 'tgtFilter'); },
            showItem:   function(o) { return $._getTag(o, 'showItem'); },
            enableItem: function(o) { return $._getTag(o, 'enableItem'); },
            consume:    function(o) { return $._getTag(o, 'consume'); },
            insertCE:   function(o) { return $._getTag(o, 'insertCE'); },
            doEffect:   function(o) { return $._getTag(o, 'doEffect'); }
        };

        // Subskill stuff
        $.subskill = {
            /**
             * @param {Number} skillId - Database ID of the parent skill
             * @param {Game_Battler} subject - Game_Battler object corresponding to user of skill
             * @returns {Number[]} Array of subskill IDs.
             */
            get: function(skillId, subject) {
                return ($._getTagFct('s', 'subskill', skillId)?.(subject) || []).map(n => $dataSkills[n]).filter(s => s);
            },
            /**
             * @param {Window_SkillList} win - Window_SkillList instance
             * @returns {Boolean} True iff the selected item has subskills.
             */
            check: function(win) { return this.get(this.parentId(win, win._actor) || 0, win._actor).length; },
            /**
             * Gets ID of parent skill.
             * Created for compatibility with Window_ActorCommand.
             * @param {Window_Selectable} win - parent window instance, expected Window_SkillList or Window_ActorCommand
             * @param {Game_Battler} user - action subject
             * @returns {Number} ID of parent skill.
             */
            parentId: function(win, user) {
                if (win.item) {
                    return win.item().id;
                } else if (user) {
                    switch (win.currentSymbol?.()) {
                        case 'attack': return user.attackSkillId();
                        case 'guard':  return user.guardSkillId();
                    }
                }
                return 0;
            },
            /**
             * Sets up a subskill window for a given skill window.
             * @param {Window_SkillList} win - Window_SkillList instance
             */
            show: function(win) {
                // n.b. PIXI Container addChild checks/replaces existing reference
                const subject = win._actor;
                const skillId = $.subskill.parentId(win, subject);
                if (!skillId) return;
                delete win[$.P_SUBSKILL];
                const w = new window[$.W_SUBSKILL](new Rectangle(0,0,0,0));
                w.setActor(subject), w.setSkillId(skillId);
                win[$.P_SUBSKILL] = w;
                SceneManager._scene.addWindow(w);
                w.setHandler('ok',     this.ok.bind(win));
                w.setHandler('cancel', this.cancel.bind(win));
                win.deactivate();
                if (win._helpWindow) w.setHelpWindow(win._helpWindow);
                w.start(win);
            },
            /** Processes when a subskill is selected. Bound to parent window. */
            ok: function() {
                const skillId = this[$.P_SUBSKILL].item().id;
                switch (this.currentSymbol?.()) {
                    case 'attack':
                        $._subskillIdAttack = skillId;
                        this.callHandler('attack');
                        break;
                    case 'guard':
                        $._subskillIdGuard  = skillId;
                        this.callHandler('guard');
                        break;
                    default:
                        this.callHandler('ok');
                }
                this[$.P_SUBSKILL].deactivate();
                this[$.P_SUBSKILL].close();
                delete this[$.P_SUBSKILL];
            },
            /** Processes when the player cancels subskill selection. Bound to parent window. */
            cancel: function() {
                this.activate();
                this[$.P_SUBSKILL].deactivate();
                this[$.P_SUBSKILL].close();
                delete this[$.P_SUBSKILL];
                this.callUpdateHelp();
            }
        };

        /** @returns {Game_Interpreter} Game_Interpreter instance corresponding to current scene. */
        $.getInterpreter = function() {
            const sc = SceneManager._scene;
            if ([Scene_Map, Scene_MenuBase].some(s => sc instanceof s)) {
                return $gameMap._interpreter;
            } else if (sc instanceof Scene_Battle) {
                return $gameTroop._interpreter;
            }
            return;
        };

        /** @returns {Game_Battler} Item/skill user. Used for consume check. */
        $.getItemUser = function() {
            const sc = SceneManager._scene;
            if (sc instanceof Scene_Battle) {
                return $._subject;
            } else if (sc instanceof Scene_ItemBase) {
                return sc.user();               // consume occurs before apply
            }
            return;     // unknown
        };

        /** @returns {Game_Battler[]} Item/skill targets. Used for consume check. */
        $.getItemTargets = function() {
            const sc = SceneManager._scene;
            if (sc instanceof Scene_Battle) {
                return $._targets;
            } else if (sc instanceof Scene_ItemBase) {
                return sc.itemTargetActors();   // consume occurs before apply
            }
            return [];  // unknown
        };

        /**
         * @param {Game_Battler[]} targets - The current action's full complement of targets
         * @returns {Game_Battler} Target currently being processed.
         */
        $.getCurrentTarget = function(targets = $.getItemTargets()) {
            // Targets are shifted out of the BattleManager target list as they are processed.
            const adj = BattleManager._targets?.length || 0;
            return targets[targets.length - adj - 1];
        };

        /**
         * @param {Object} item - $dataItems entry for this item
         * @returns {Boolean} Eval result.
         */
        $.doesConsume = function(item) {
            const f = $._getTagFct('i', 'consume', item?.id);
            if (!f) return true;
            return f(item);
        };

        /**
         * @param {Game_Action} action - Game_Action instance, the action being performed
         * @param {Game_Battler} target - Game_Battler instance, a potential target
         * @returns {Boolean} True iff the target is valid.
         */
        $.canTarget = function(action, target) {
            const item    = action.item();
            const subject = action.subject();
            const type    = $._getTagFctType(item);
            const f = $._getTagFct(type, 'tgtFilter', item?.id);
            if (!f) return true;
            return f.call(action, item, subject, target);
        };

        /**
         * @param {Object} item - Database record, item/skill being used
         * @param {Game_Battler} subject - Game_Battler instance, potential user of item
         * @returns {Boolean} True iff at least one valid target exists.
         */
        $.hasTargets = function(item, subject) {
            const id = item?.id;
            if (!id) return false;
            const a = new Game_Action(subject, true);       // force to pre-empt loop via canUse
            if (DataManager.isItem(item)) a.setItem(id);
            else                         a.setSkill(id);
            return a.itemTargetCandidates().length > 0;
        };

        /** @returns {Boolean} True iff target filtering should apply to random targets. */
        $.shouldFilterRandomTargets = function() { return $.filterRandomTargets; };

        /**
         * @param {Object} item - Database record, item/skill
         * @param {Game_Battler} subject - Game_Battler instance, potential user of item
         * @returns {Boolean} True iff the item/skill is enabled for use.
         */
        $.isEnabled = function(item, subject) {
            const type = $._getTagFctType(item);
            const f = $._getTagFct(type, 'enableItem', item?.id);
            if (!f) return true;
            return f(item, subject);
        };

        /**
         * @param {Object} item - Database record, item/skill
         * @param {Game_Battler} subject - Game_Battler instance, potential user of item
         * @returns {Boolean} True iff the item/skill should be included in player-facing lists.
         */
        $.isShowing = function(item, subject) {
            const type = $._getTagFctType(item);
            const f = $._getTagFct(type, 'showItem', item?.id);
            if (!f) return true;
            return f(item, subject);
        };

        /**
         * Updates common event run type flag.
         * See reserveCommonEvent alias for details.
         * @param {Object} item - Database item entry
         */
        $.updateInsertCE = function(item) {
            $.insertCE = item ? $.getTag.insertCE(item) : null;
        };

        /** @returns {Boolean} True iff should splice in the next common event rather than queue it. */
        $.shouldInsertCE = function() { return !!$.insertCE; };

        /**
         * Runs the specified common event as a child of the specified interpreter.
         * @param {Game_Intepreter} ptr - Target Game_Interpreter instance
         * @param {Number} eventId - Common event ID
         */
        $.applyInsertCE = function(ptr, eventId) {
            const ev = $dataCommonEvents[eventId];
            const ch = ptr._childInterpreter;
            if (ch) ch._list = ch._list.concat(ev.list);
            else ptr.setupChild(ev.list, ptr.isOnCurrentMap() ? ptr.eventId() : 0);
            $.insertedCE = true;
        };

        /** 
         * Returns to map after using an instant CE item.
         * This is for safety because $gameTemp is not included in save data.
         */
        $.checkCELeaveScene = function() {
            if ($.insertedCE && (SceneManager._scene instanceof Scene_ItemBase)) {
                delete $.insertedCE;
                SceneManager.goto(Scene_Map);
            }
        };

        /**
         * @param {Game_Action} action - Reference action
         * @returns {Boolean} True iff should process the counter-hit after original hit lands.
         */
        $.isCounterAfter      = function(action) { return !!($.postCnt || $._postCnt);  };

        /**
         * @param {Game_Action} action - Reference action
         * @returns {Boolean} True iff should process the reflection after original hit lands.
         */
        $.isReflectAfter      = function(action) { return !!($.postMrf || $._postMrf);  };

        /**
         * @param {Game_Action} action - Reference action
         * @returns {Boolean} True iff should allow one action to proc both counter-hit and reflection responses.
         */
        $.allowCounterReflect = function(action) { return !!($.bCntMrf || $._bCntMrf);  };

        /**
         * @param {Game_Action} action - Reference action
         * @returns {Boolean} True iff should check reflection before counter-hit.
         */
        $.checkReflectFirst   = function(action) { return !!($.mrfFirst|| $._mrfFirst); };

        /** @returns {Boolean} True iff popup should be hidden. This value is precalculated via evaluateCustomPopupData. */
        $.isHidePopup = function() { return !!$.popups._hide; };

        // Splitter for random selection of popup text or whatever.
        $.randomSplitter = '|';

        /**
         * @param {String} text - Input text
         * @param {String} splitter - Character on which to split input; default "|"
         * @returns {String} Random entry from input, as split by splitter.
         */
        $.getRandomText = function(text, splitter = $.randomSplitter) {
            const arr = String(text || '').split(splitter);
            return arr[Math.randomInt(arr.length)];
        }

        /** @returns Text for the "Miss" popup in battle. */
        $.getMissText = function() {
            return $.getRandomText($.popups.missText);
        };

        /** Evaluates and stores all custom popup data for this action. */
        $.evaluateCustomPopupData = function(...args) {
            $.popups._hide = $.popups.hide?.apply(this, args) || false;
            $.popups._data = $.popups.custom.map(function(o) {
                return {
                    culr: o.c,
                    text: $.getRandomText(o.l),
                    time: o.t,
                    show: o.f.apply(this, args)
                };
            }, this) || [];
        };

        /** @returns {Object[]} Array of relevant pre-calculated popup data objects. */
        $.getCustomPopups = function(timing) {
            return $.popups._data?.filter(o => o.time === timing && o.show && o.text) || [];
        };

        /** Clears this plugin's popup data for the current action. */
        $.clearCustomPopupData = function() { delete $.popups._data; };

        /**
         * Custom rendition of Sprite_Damage > setup method, used for custom popups.
         * (Based on Sprite_Damage.prototype.createMiss.)
         * @param {Object} data - Custom popup data from this plugin
         */
        $.setupCustomPopup = function(data) {
            const { text, culr } = data;
            const h = this.fontSize();
            const w = Math.floor(h * $.popups.widthMult);
            const sprite = this.createChildSprite(w, h);
            if (culr) sprite.bitmap.textColor = culr;
            sprite.bitmap.drawText(text, 0, 0, w, h, 'center');
            sprite.dy = 0, sprite.ry = sprite.y = -40;
        };

        /**
         * Creates custom popups according to user-specified rules.
         * (Based on Sprite_Battler.prototype.createDamageSprite.)
         * @param {Number} timing - Numerical value indicating the popup timing relative to the default popup(s)
         */
        $.createCustomPopups = function(timing) {
            const target = this._battler;
            $.getCustomPopups(timing).forEach(function(o) {
                const dmg = this._damages;
                const pre = dmg[dmg.length - 1];
                const spr = new Sprite_Damage();
                const dy  = Sprite_Damage.prototype.fontSize();
                if (pre) spr.x = pre.x + 8, spr.y = pre.y - dy;
                else spr.x = this.x + this.damageOffsetX(), spr.y = this.y + this.damageOffsetY();
                $.setupCustomPopup.call(spr, o);
                dmg.push(spr);
                this.parent.addChild(spr);
            }, this);
        };

        /** Processes pre-standard action popups. */
        $.createCustomPopupsPre = function() { $.createCustomPopups.call(this, 0); };

        /** Processes post-standard action popups. */
        $.createCustomPopupsPost = function() { $.createCustomPopups.call(this, 2); };

        /**
         * Forces display of damage popup rather than waiting for next frame update.
         * Kinda hacky though.
         * @param {Game_Battler} target - Game_Battler instance from which to force a popup.
         */
        $.forceShowPopups = function() {
            [$.getItemUser()].concat($.getItemTargets()).forEach(batt => {
                if (!batt) return;
                batt?.startDamagePopup();
                SceneManager._scene._spriteset.findTargetSprite(batt)?.updateDamagePopup();
            });
        };

        /**
         * Evaluates the effect conditions, if any, for the specified action and target.
         * @param {Game_Action} action - Reference action
         * @param {Game_Battler} target - Current target instance
         */
        $.calcEffectConditions = function(action, target) {
            const item = action?.item();
            const f = $._getTagFct($._getTagFctType(item), 'doEffect', item?.id);
            $.effectConditions = f?.call(action, target) || [];
        };

        /**
         * @param {Number} effectIndex - Position of the effect in the item/skill's effect list.
         * - First effect is index 0.
         * @returns {Boolean} True iff the effect should be applied.
         */
        $.checkEffectCondition = function(effectIndex) {
            const res = $.effectConditions[effectIndex];
            if (res === undefined) return true;
            return !!res;
        };

    // ======== Plugin Commands ======== //
    // ============ Extends ============ //

        // Subskill window~
        void (() => {

            const base = window[$.W_SUBSKILL] = function() { this.initialize(...arguments); };

            const parent = Window_SkillList.prototype;
            const proto = base.prototype = Object.create(parent);
            proto.constructor = base;

            proto.initialize = function(rect) {
                parent.initialize.apply(this, arguments);
                this.openness = 0;
            };

            /** @returns {Number} Default window row count (based on screen height).  */
            proto.dFaultPosR = function() {
                return Math.floor(Graphics.boxHeight / this.itemHeight());
            };

            /**
             * @param {Number} r - Window row count
             * @returns {Number} Default window height, based on provided row count.
             */
            proto.dFaultPosH = function(r = this.dFaultPosR()) {
                return this.fittingHeight(this.maxItems().clamp(1, r));
            }

            /**
             * Determines position/size of subskill window on the battle scene.
             * @param {Window_SkillList} wParent - Parent window instance (Window_SkillList)
             * @returns {[x:Number,y:Number,w:Number,h:Number,r:Number]} X, Y, width, height, and rows of window.
             */
            proto.getPosBattle = function(wParent) {
               const R = wParent.itemRect(wParent.index());
               let h = this.dFaultPosH($.wSubskills.battle.r || undefined);
               let x = 0;
               let y = wParent.y + R.y - h - 3;
               let w = $.wSubskills.battle.w;
               return [x, y, w, h];
            };

            /**
             * Determines position/size of subskill window on the skill scene.
             * @param {Window_SkillList} wParent - Parent window instance (Window_SkillList)
             * @returns {[x:Number,y:Number,w:Number,h:Number,r:Number]} X, Y, width, height, and rows of window.
             */
            proto.getPosMenuSkill = function(wParent) {
                const C = wParent.width / wParent.maxCols();
                const R = wParent.itemRect(wParent.index());
                let w = C;
                let x = wParent.padding + wParent.itemPadding() + R.x + C;          // next col
                if (x >= Graphics.boxWidth) x = wParent.x + wParent.width - C - w;  // penult col
                let y = wParent.y;
                let h = wParent.height;
                return [x, y, w, h];
            };

            /** Gets subskill window positioning method appropriate to current scene. */
            proto.getPosMethod = function() {
                return SceneManager._scene instanceof Scene_Battle ? this.getPosBattle : this.getPosMenuSkill;
            };

            /**
             * Gets and validates position/size of subskill window.
             * @param {Window_SkillList} wParent - Parent window instance (Window_SkillList)
             * @returns {[x:Number,y:Number,w:Number,h:Number]} X, Y, width, and height of window.
             */
            proto.getPos = function(wParent) {
                let [x, y, w, h, r] = this.getPosMethod().call(this, wParent) || [0,0,0,0,0];
                r = r || this.dFaultPosR();
                h = h || this.dFaultPosH(r);
                w = w || (wParent.width / wParent.maxCols());
                y = y.clamp(0, Graphics.boxHeight - h);
                x = x.clamp(0, Graphics.boxWidth - w);
                return [x, y, w, h];
            };

            /**
             * Updates position/size of subskill window.
             * @param {Window_SkillList} wParent - Parent window instance (Window_SkillList)
             */
            proto.updatePlacement = function(wParent) {
                this.move(...this.getPos(wParent));
            };

            /**
             * Called to open the subskill window for input.
             * @param {Window_SkillList} wParent - Parent window instance (Window_Subskill)
             */
            proto.start = function(wParent) {
                this.updatePlacement(wParent);
                this.createContents();
                this.refresh();
                this.select(0);
                this.open();
                this.activate();
            };

            /**
             * Sets parent skill ID and refreshes window.
             * See also: Window_SkillList > setActor.
             * @param {Number} skillId - ID of parent skill
             */
            proto.setSkillId = function(skillId) {
                if (this._skillId !== skillId) {
                    this._skillId = skillId;
                    this.refresh();
                    this.scrollTo(0, 0);
                }
            };

            /** Populates the window's data. */
            proto.makeItemList = function() {
                if (this._actor && this._skillId) {
                    this._data = $.subskill.get(this._skillId, this._actor);
                } else {
                    this._data = [];
                }
            };

            /** @returns {Number} Column count. */
            proto.maxCols = function() { return 1; };

            /**
             * @param {Window} win - Window instance to check
             * @returns {Boolean} True iff this window is a subskill window.
             */
            $.isWSubskill = function(win) { return win instanceof base; };

        })();

    // ========== Alterations ========== //

        // Override! Use user-defined hit formula.
        void (() => { if (!$.itemHit) return;
            Game_Action.prototype.itemHit = function(target) {
                return $.itemHit.apply(this, arguments);
            };
        })();

        // Override! Use user-defined evasion formula.
        void (() => { if (!$.itemEva) return;
            Game_Action.prototype.itemEva = function(target) {
                return $.itemEva.apply(this, arguments);
            };
        })();

        // Override! Use user-defined crit formula.
        void (() => { if (!$.itemCri) return;
            Game_Action.prototype.itemCri = function(target) {
                return $.itemCri.apply(this, arguments);
            };
        })();

        // Override! Use user-defined counter formula.
        void (() => { if (!$.itemCnt) return;
            Game_Action.prototype.itemCnt = function(target) {
                return $.itemCnt.apply(this, arguments);
            };
        })();

        // Override! Use user-defined reflection formula.
        void (() => { if (!$.itemMrf) return;
            Game_Action.prototype.itemMrf = function(target) {
                return $.itemMrf.apply(this, arguments);
            };
        })();

        // Override! Use user-defined applyCrit formula.
        void (() => { if (!$.itemCriDmg) return;
            Game_Action.prototype.applyCritical = function(damage) {
                return $.itemCriDmg.apply(this, arguments);
            };
        })();

        // Override! Use user-defined applyGuard formula.
        void (() => { if (!$.itemGrdDmg) return;
            Game_Action.prototype.applyGuard = function(damage, target) {
                return $.itemGrdDmg.apply(this, arguments);
            };
        })();

        // Override! Replace target substitute condition with user-defined formula.
        void (() => { if (!$.itemCanSub) return;
            BattleManager.checkSubstitute = function(target) {
                return $.itemCanSub.call(this._action, target);
            };
        })();

        // Override! Select substitute battler using user-defined formula.
        void (() => { if (!$.itemGetSub) return;
            Game_Unit.prototype.substituteBattler = function() {
                return $.itemGetSub.call(BattleManager._action, this);
            };
        })();

        // Override! Redefine the popup text seen when an action is missed/evaded.
        void (() => { // unconditional bcuz multiple shared aspects here
            Sprite_Damage.prototype.createMiss = function() {
                const txt = $.getMissText();
                if (!txt) return;
                const h = this.fontSize();
                const w = Math.floor(h * $.popups.widthMult);
                const sprite = this.createChildSprite(w, h);
                sprite.bitmap.drawText(txt, 0, 0, w, h, "center");
                sprite.dy = 0;
            };
        })();

        // Override! Change battle popup font size.
        void (() => { if (!$.popups.fontSize) return;
            Sprite_Damage.prototype.fontSize = function() { return $.popups.fontSize; };
        })();

        $.alias = $.alias || {};        // This plugin's alias namespace

        // Alias! Parse plugin notetags after database has loaded.
        void (alias => {
            Scene_Boot.prototype.start = function() {
                $._initAll();
                alias.apply(this, arguments);
            };
        })($.alias.Scene_Boot_start = Scene_Boot.prototype.start);

    // +Battle popups //

        // Alias! Hide zero damage values if appropriate.
        void (alias => {
            Sprite_Damage.prototype.createDigits = function(value) {
                if (!$.isHidePopup()) alias.apply(this, arguments);
            };
        })($.alias.Sprite_Damage_createDigits = Sprite_Damage.prototype.createDigits);

        // Alias! Evaluate custom popup data just before dealing damage.
        void (alias => {
            Game_Action.prototype.executeDamage = function(target, value) {
                $.evaluateCustomPopupData.apply(this, arguments);
                alias.apply(this, arguments);
            };
        })($.alias.Game_Action_executeDamage = Game_Action.prototype.executeDamage);

        // Alias! Create custom popups according to plugin parameters.
        void (alias => {
            Sprite_Battler.prototype.createDamageSprite = function() {
                $.createCustomPopupsPre.apply(this, arguments);
                alias.apply(this, arguments);
                $.createCustomPopupsPost.apply(this, arguments);
                $.clearCustomPopupData();
            };
        })($.alias.Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite);

    // +Subskills //

        // Alias! Open subskill menu if appropriate when selecting a skill to use.
        void (alias => {
            Window_SkillList.prototype.callOkHandler = function() {
                if (!$.isWSubskill(this) && $.subskill.check(this)) {
                    $.subskill.show(this);
                } else alias.apply(this, arguments);
            };
        })($.alias.Window_SkillList_callOkHandler = Window_SkillList.prototype.callOkHandler);

        void (alias => {
            Window_ActorCommand.prototype.callOkHandler = function() {
                if ($.subskill.check(this)) {
                    $.subskill.show(this);
                } else alias.apply(this, arguments);
            };
        })($.alias.Window_ActorCommand_callOkHandler = Window_ActorCommand.prototype.callOkHandler);

        // Alias! Get item from subskill window if present.
        void (alias => {
            Window_SkillList.prototype.item = function() {
                return alias.apply(this[$.P_SUBSKILL] || this, arguments);
            };
        })($.alias.Window_SkillList_item = Window_SkillList.prototype.item);

        // Alias! Hide subskill window with parent.
        void (alias => {
            Window_SkillList.prototype.hide = function() {
                alias.apply(this, arguments);
                const w = this[$.P_SUBSKILL];
                if (w) w.hide();
            };
        })($.alias.Window_SkillList_hide = Window_SkillList.prototype.hide);

        // Alias! Show subskill window with parent.
        void (alias => {
            Window_SkillList.prototype.show = function() {
                alias.apply(this, arguments);
                const w = this[$.P_SUBSKILL];
                if (w) w.show();
            };
        })($.alias.Window_SkillList_show = Window_SkillList.prototype.show);

        // Alias! Ugly workaround for Attack subskills (see subskill ok method above).
        void (alias => {
            Game_Action.prototype.setAttack = function() {
                if ($._subskillIdAttack) {
                    this.setSkill($._subskillIdAttack);
                    delete $._subskillIdAttack;
                } else alias.apply(this, arguments);
            };
        })($.alias.Game_Action_setAttack = Game_Action.prototype.setAttack);

        // Alias! Ugly workaround for Guard subskills (see subskill ok method above).
        void (alias => {
            Game_Action.prototype.setGuard = function() {
                if ($._subskillIdGuard) {
                    this.setSkill($._subskillIdGuard);
                    delete $._subskillIdGuard;
                } else alias.apply(this, arguments);
            };
        })($.alias.Game_Action_setGuard = Game_Action.prototype.setGuard);

        // Alias! Stay in input mode while selecting a subskill in battle.
        void (alias => {
            Scene_Battle.prototype.isAnyInputWindowActive = function() {
                return alias.apply(this, arguments) ||
                        this._skillWindow[$.P_SUBSKILL]?.active ||
                        this._actorCommandWindow[$.P_SUBSKILL]?.active;
            };
        })($.alias.Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive);

    // +Target restrictions //

        // Alias! Restrict target actors as appropriate.
        void (alias => {
            Game_Action.prototype.testApply = function(target) {
                return alias.apply(this, arguments) && $.canTarget(this, target);
            };
        })($.alias.Game_Action_testApply = Game_Action.prototype.testApply);

        // Alias! Only consider restricted target set.
        void (alias => {
            Game_Action.prototype.itemTargetCandidates = function() {
                return alias.apply(this, arguments)?.filter(target => $.canTarget(this, target));
            };
        })($.alias.Game_Action_itemTargetCandidates = Game_Action.prototype.itemTargetCandidates);

        // Alias! Restrict actions for enemy AI selection.
        void (alias => {
            Game_Enemy.prototype.isActionValid = function(actionData) {
                const action = $dataSkills[actionData?.skillId || 0];
                return alias.apply(this, arguments) && $.hasTargets(action, this);
            };
        })($.alias.Game_Enemy_isActionValid = Game_Enemy.prototype.isActionValid);

        (() => {
            let f = null;   // local function storage

            // Alias! If appropriate, store canTarget function for random target filtering.
            // Also grab user/targets for reference elsewhere (cf user fct local params).
            void (alias => {
                Game_Action.prototype.makeTargets = function() {
                    f = $.shouldFilterRandomTargets() ? $.canTarget.bind($, this) : null;
                    const t = alias.apply(this, arguments);
                    $._targets = t.slice();
                    $._subject = this.subject();
                    return t;
                };
            })($.alias.Game_Action_makeTargets = Game_Action.prototype.makeTargets);

            // Alias! Filter random living targets if appropriate (includes default TGR bias).
            void (alias => {
                Game_Unit.prototype.randomTarget = function() {
                    if (!f) return alias.apply(this, arguments);
                    const members = this.aliveMembers().filter(m => f(m));
                    const tgrSum = members.reduce((a, c) => a + c.tgr, 0);
                    let tgrRand = Math.random() * tgrSum;
                    let target = null;
                    members.some(m => {
                        tgrRand -= m.tgr;
                        if (tgrRand <= 0) target = m;
                        return !!target;
                    });
                    return target;
                };
            })($.alias.Game_Unit_randomTarget = Game_Unit.prototype.randomTarget);

            // Alias! Filter random dead targets if appropriate.
            void (alias => {
                Game_Unit.prototype.randomDeadTarget = function() {
                    if (!f) return alias.apply(this, arguments);
                    const members = this.deadMembers().filter(m => f(m));
                    return members[Math.randomInt(members.length)] || null;
                };
            })($.alias.Game_Unit_randomDeadTarget = Game_Unit.prototype.randomDeadTarget);

        })();

        // Alias! Restrict enemies available for selection.
        void (alias => {
            Window_BattleEnemy.prototype.refresh = function() {
                alias.apply(this, arguments);   // compatibility
                const a = BattleManager.inputtingAction();
                if (a) {
                    this._enemies = this._enemies.filter(nme => $.canTarget(a, nme));
                    Window_Selectable.prototype.refresh.apply(this, arguments);
                }
            };
        })($.alias.Window_BattleEnemy_refresh = Window_BattleEnemy.prototype.refresh);

        // Alias! Ensure battle auto-select doesn't select an invalid target.
        void (alias => {
            Window_BattleActor.prototype.show = function() {
                alias.apply(this, arguments);
                const a = BattleManager.inputtingAction();                
                if (a) {
                    if (!$gameParty.battleMembers().some(m => {
                        const t = $.canTarget(a, m);
                        if (t) this.select(m.index());
                        return t;
                    }, this)) this.select(-1);
                }
            };
        })($.alias.Window_BattleActor_show = Window_BattleActor.prototype.show);

        (() => {
            let selDir = 0;     // private selection direction tracker for skipping purposes

            // Alias! Track direction of selection change.
            void (alias => {
                Window_BattleActor.prototype.cursorLeft = function() {
                    selDir = 4; alias.apply(this, arguments);
                };
            })($.alias.Window_BattleActor_cursorLeft = Window_BattleActor.prototype.cursorLeft);
            void (alias => {
                Window_BattleActor.prototype.cursorRight = function() {
                    selDir = 6; alias.apply(this, arguments);
                };
            })($.alias.Window_BattleActor_cursorRight = Window_BattleActor.prototype.cursorRight);

            // Alias! Prevent selection of invalid actor targets.
            void (alias => {
                Window_BattleActor.prototype.select = function(index) {
                    const a = BattleManager.inputtingAction();
                    const M = $gameParty.battleMembers();
                    const L = M.length;
                    if (!a) alias.apply(this, arguments);
                    else {
                        const d = selDir === 4 ? -1 : 1;
                        for (let i = index, n = 0; n < L; i = (i += d).mod(L), n++) {
                            if (M[i] && $.canTarget(a, M[i])) {
                                alias.call(this, i);
                                break;
                            }
                        }
                    }
                };
            })($.alias.Window_BattleActor_select = Window_BattleActor.prototype.select);

        })();

        // Alias! Prevent battle selection of actors who aren't valid targets via touch.
        void (alias => {
            Sprite_Actor.prototype.onMouseEnter = function() {
                const a = BattleManager.inputtingAction();
                if (!a || $.canTarget(a, this._battler)) alias.apply(this, arguments);
            };
        })($.alias.Sprite_Actor_onMouseEnter = Sprite_Actor.prototype.onMouseEnter);

        // Alias! Prevent battle selection of actors who aren't valid targets via touch.
        void (alias => {
            Sprite_Actor.prototype.onPress = function() {
                const a = BattleManager.inputtingAction();
                if (!a || $.canTarget(a, this._battler)) alias.apply(this, arguments);
            };
        })($.alias.Sprite_Actor_onPress = Sprite_Actor.prototype.onPress);

    // +Disable skills //

        // Alias! Disallow use of disabled items or items with no valid targets.
        void (alias => {
            Game_BattlerBase.prototype.meetsUsableItemConditions = function(item) {
                return alias.apply(this, arguments) && $.isEnabled(item, this) && $.hasTargets(item, this);
            };
        })($.alias.Game_BattlerBase_meetsUsableItemConditions = Game_BattlerBase.prototype.meetsUsableItemConditions);

        // Alias! Restrict "can use" in battle to current actor's turn.
        void (alias => {
            Game_Party.prototype.canUse = function(item) {
                const a = BattleManager._currentActor;
                if (a && !a.canUse(item)) return false;
                return alias.apply(this, arguments);
            };
        })($.alias.Game_Party_canUse = Game_Party.prototype.canUse);

        // Alias! See all items in battle item selection, not just usable ones.
        void (alias => {
            Window_BattleItem.prototype.includes = function(item) {
                return $.isShowing(item) && (alias.apply(this, arguments)
                        || ($.showDisabledBattleItems
                            && DataManager.isItem(item)
                            && Game_BattlerBase.prototype.isOccasionOk(item)));
            };
        })($.alias.Window_BattleItem_includes = Window_BattleItem.prototype.includes);

    // +Hide skills/items //

        // Alias! Restrict which skills are displayed.
        void (alias => {
            Window_SkillList.prototype.includes = function(item) {
                return alias.apply(this, arguments) && $.isShowing(item, this._actor);
            };
        })($.alias.Window_SkillList_includes = Window_SkillList.prototype.includes);

        // Alias! Restrict which items are displayed.
        void (alias => {
            Window_ItemList.prototype.includes = function(item) {
                return alias.apply(this, arguments) && $.isShowing(item, this._actor);
            };
        })($.alias.Window_ItemList_includes = Window_ItemList.prototype.includes);

    // +Consume conditions //

        /*// Alias! Grab user/targets for reference later (consume check).
        // Moved to target filter section for additional functionality.
        void (alias => {
            Game_Action.prototype.makeTargets = function() {
                const t = alias.apply(this, arguments);
                $._targets = t.slice();
                $._subject = this.subject();
                return t;
            };
        })($.alias.Game_Action_makeTargets = Game_Action.prototype.makeTargets);*/

        // Alias! Check tag before consuming item.
        void (alias => {
            Game_Party.prototype.consumeItem = function(item) {
                if ($.doesConsume(item)) alias.apply(this, arguments);
            };
        })($.alias.Game_Party_consumeItem = Game_Party.prototype.consumeItem);

    // +Instant common event //

        // Alias! Determine common event run type - standard or splice into current event.
        void (alias => {
            Game_Action.prototype.applyGlobal = function() {
                $.updateInsertCE(this.item());
                alias.apply(this, arguments);
                $.updateInsertCE();
                $.checkCELeaveScene();
            };
        })($.alias.Game_Action_applyGlobal = Game_Action.prototype.applyGlobal);

        // Alias! Allow for reserved events to be inserted as appropriate.
        void (alias => {
            Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
                const pt = $.getInterpreter();
                let done = false;
                if ($.shouldInsertCE() && pt && pt.isRunning()) {
                    try {
                        $.applyInsertCE(pt, commonEventId);
                        done = true;
                    } catch (ex) { console.error(ex); }
                }
                if (!done) alias.apply(this, arguments);
            };
        })($.alias.Game_Temp_reserveCommonEvent = Game_Temp.prototype.reserveCommonEvent);

    // +Conditional effects //

        (() => {
            let fxCalcDone = false;   // private flag for tracking effect condition evaluation

            // Alias! Reset flag so that effect conditions will be recalculated.
            void (alias => {
                Game_Action.prototype.apply = function(target) {
                    fxCalcDone = false;
                    alias.apply(this, arguments);
                };
            })($.alias.Game_Action_apply = Game_Action.prototype.apply);

            // Alias! Relevant condition must pass in order to apply each effect.
            // Also calculate effects (once) here because:
            //  - it's after the result is determined (target.result().critical, etc)
            //  - executeDamage will not necessarily occur beforehand
            void (alias => {
                Game_Action.prototype.applyItemEffect = function(target, effect) {
                    if (!fxCalcDone) {
                        $.calcEffectConditions(this, target);
                        fxCalcDone = true;
                    }
                    const effectIndex = this.item().effects?.indexOf(effect);
                    if ($.checkEffectCondition(effectIndex)) {
                        alias.apply(this, arguments);
                    }
                };
            })($.alias.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect);

        })();

        /*// Alias! Pre-calculate effect apply conditions for this item.
        void (alias => {
            Game_Action.prototype.apply = function(target) {
                $.calcEffectConditions(this, target);
                alias.apply(this, arguments);
            };
        })($.alias.Game_Action_apply = Game_Action.prototype.apply);

        // Alias! Relevant effect apply condition must pass to apply the effect.
        void (alias => {
            Game_Action.prototype.applyItemEffect = function(target, effect) {
                const effectIndex = this.item().effects?.indexOf(effect);
                if ($.checkEffectCondition(effectIndex)) {
                    alias.apply(this, arguments);
                }
            };
        })($.alias.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect);*/

    // +Counter/Reflect after hit //
    /* can't seem to get the popup timing right here with just aliases...
     * why are counters/reflects handled so privately? Y-Y */

        // Alias! Reflect after hit (cnt/mrf order is handled in counter-hit).
        void (alias => {
            BattleManager.invokeMagicReflection = function(subject, target) {
                if ($.isReflectAfter(this._action)) {
                    this.invokeNormalAction(...arguments);
                    $.forceShowPopups();
                }
                alias.apply(this, arguments);
            };
        })($.alias.BattleManager_invokeMagicReflection = BattleManager.invokeMagicReflection);

        // Alias! Check reflection before/after & hit then counter.
        void (alias => {
            BattleManager.invokeCounterAttack = function(subject, target) {
                const a = this._action;
                let acted = false, reflected = false;
                // reflect first, then counter
                if ( $.checkReflectFirst(a)) {
                    if (Math.random() < a.itemMrf(target)) {
                        this.invokeMagicReflection(...arguments);
                        acted = true, reflected = true;
                    }
                }
                // counter
                if (!reflected || $.allowCounterReflect(a)) {
                    if ($.isCounterAfter(a)) {
                        if (acted) $.forceShowPopups(); else acted = true;
                        this.invokeNormalAction(...arguments);
                    }
                    if (acted) $.forceShowPopups(); else acted = true;
                    alias.apply(this, arguments);
                }
                // counter first, then reflect
                if (!$.checkReflectFirst(a) && $.allowCounterReflect(a)) {
                    if (Math.random() < a.itemMrf(target)) {
                        if (acted) $.forceShowPopups();
                        this.invokeMagicReflection(...arguments);
                        this._logWindow.push('popBaseLine');
                    }
                }
            };
        })($.alias.BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack);

    })(CAE[NAMESPACE] = CAE[NAMESPACE] || {}, CAE.Utils = CAE.Utils || {});

})();