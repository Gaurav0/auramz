//=============================================================================
// RPG Maker MZ - Advantage Battle Mechanic
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
 * @plugindesc Advantage Battle Mechanic
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help advantages.js
 *
 * When successfully applying damage to a target with an elemental weakness to the attacking element,
 * the attacker gains the advantage state. The state cannot be gained again while having an advantage.
 *
 * Also ensures that always a minimum of 1 damage is dealt.
 *
 * Visualizes if the player hit a weakness or a resistance with his attack.
 *
 * @param Advantage State ID
 * @desc ID of the state that's applies when hitting a weakness
 *
 */

window.AuraMZ = window.AuraMZ || {};

(() => {
	AuraMZ.Advantages = {};

	const params = PluginManager.parameters("advantages");
	AuraMZ.Advantages.ADVANTAGE_STATE_ID = parseInt(params["Advantage State ID"]);

	// Checks if a hit was resisted or if the target is weak to the attack
	// If the target is weak to the attack, an advantage is registered
	const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function(target, value) {
		const elementRate = this.calcElementRate(target);
		_Game_Action_executeDamage.call(this, target, value);

		target._weak = false;
		target._resist = false;

		if (elementRate > 1.0) {
			// Hit weakness
			this.subject()._tacticalAdvantage = true;
			target._weak = true;
		} else if (elementRate < 1.0) {
			// Hit Resits
			target._resist = true;
		}
	}

	// Lose the tactical advantage state when being restricted
	const _Game_Battler_addNewState = Game_Battler.prototype.addNewState;
	Game_Battler.prototype.addNewState = function(stateId) {
		_Game_Battler_addNewState.call(this, stateId);
		if (this.isRestricted()) {
			this._tacticalAdvantage = false;
		}
	};

	// Lose the tactical advantage state at the end of the upcoming turn
	const _BattleManager_endBattlerActions = BattleManager.endBattlerActions;
	BattleManager.endBattlerActions = function(battler) {
		if (battler._tacticalAdvantage) {
			if (!battler.isStateAffected(AuraMZ.Advantages.ADVANTAGE_STATE_ID)) {
				battler._tacticalAdvantage = false;
				battler.addState(AuraMZ.Advantages.ADVANTAGE_STATE_ID);
				const lw = SceneManager._scene._logWindow;
				const state = $dataStates[AuraMZ.Advantages.ADVANTAGE_STATE_ID];
				const stateText = state.message1;
				lw._methods.unshift({ name: "addText", params: [stateText.format(battler.name())] });
				if ($gameTroop._turnCount == 0) {
					// Reduce advantage turn count for compatibility wiht autoskill plugin
					battler._stateTurns[AuraMZ.Advantages.ADVANTAGE_STATE_ID]--;
				}
			}
		}

		_BattleManager_endBattlerActions.call(this, battler);
	};

	// Set the tactical advantage flag to false when starting the action of a battler
	const _BattleManager_startAction = BattleManager.startAction;
	BattleManager.startAction = function() {
		const subject = this._subject;
		subject._tacticalAdvantage = false;
		_BattleManager_startAction.call(this);
	};

	// Displays if a target was weak or resistant to an attack
	const _Sprite_Damage_setup = Sprite_Damage.prototype.setup
	Sprite_Damage.prototype.setup = function(target) {
		_Sprite_Damage_setup.call(this, target);

		if (target._weak) {
			this.createDamageLabel("Weak!", -2, 2);
		} else if (target._resist) {
			this.createDamageLabel("Resist!", -2, 2);
		}

		if (target.result().critical) {
			this.createDamageLabel("CRITICAL!", 2, 0);
		}

		target._weak = false;
		target._resist = false;
	};
	
	// Creates an accompanying label to the damage popup
	Sprite_Damage.prototype.createDamageLabel = function(text, dy, anchorY) {
		const h = this.fontSize();
		const w = Math.floor(h * 3.0);
		const sprite = this.createChildSprite(w, h);
		sprite.bitmap.drawText(text, 0, 0, w, h, "center");
		sprite.dy = dy;
		sprite.anchor.y = anchorY;
	}

	// Prolong flash duration for critical
	Sprite_Damage.prototype.setupCriticalEffect = function() {
		this._flashColor = [255, 0, 0, 160];
		this._flashDuration = 120;
	};

	// Remove displaying critical hits in the log
	Window_BattleLog.prototype.displayCritical = function() { };
})();

