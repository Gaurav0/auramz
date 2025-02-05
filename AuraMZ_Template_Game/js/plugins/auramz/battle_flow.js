//=============================================================================
// RPG Maker MZ - Battle Flow
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
 * @plugindesc Battle Flow
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help battle_flow.js
 *
 * Contains a series of modifications to speedup the flow of battle.
 * - Skipping the fight or flight menu on battle start.
 * - Removal of redundance battle log messages
 * - Making multi hit/multi target animations start in parallel (with some delay) instead of waiting for them to fully finish
 *
 */

window.AuraMZ = window.AuraMZ || {};

(() => {
	// Removes the initial menu showing fight / flee
	Scene_Battle.prototype.startPartyCommandSelection = function() {
		this.commandFight();
	};

	// Skip waiting on the last animation to play this animation if the corresponding flag is set
	const _Spriteset_Base_createAnimation = Spriteset_Base.prototype.createAnimation;
	Spriteset_Base.prototype.createAnimation = function(request) {
		_Spriteset_Base_createAnimation.call(this, request);
		if (request._noWait) {
			this.lastAnimationSprite()._noWait = true;
		}
	}

	// Checks if an animation is currently playing
	Spriteset_Base.prototype.isAnimationPlaying = function() {
		return this._animationSprites.some(animation => !animation._noWait);
	};

	// Remember the element of the damage in the result
	// Show animation along with effect for quicker flow
	const _Game_Action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		if (SceneManager._scene instanceof Scene_Battle) {
			const animationId = this.item().animationId;
			if (target.hp > 0 && ((animationId > 0 && $dataAnimations[animationId].displayType === 0) || animationId === -1)) {
				SceneManager._scene._logWindow.showAnimation(this.subject(), [target], animationId);
			}
		}
		_Game_Action_apply.call(this, target);
	};

	// Inject logic to skip animation waiting for every target except for the last
	const _Window_BattleLog_showAnimation = Window_BattleLog.prototype.showAnimation;
	Window_BattleLog.prototype.showAnimation = function(subject, targets, animationId) {
		_Window_BattleLog_showAnimation.call(this, subject, targets, animationId);
		const newAnimation = $gameTemp._animationQueue[0];
		// Skip animation waits if we have a per-target animation and multiple targets left in the queue
		if (newAnimation && BattleManager._targets.length > 0 && ((animationId > 0 && $dataAnimations[animationId].displayType === 0) || animationId === -1)) {
			newAnimation._noWait = true;
		}
	};

	// Only show animation for all targets if display type isn't "for each target"
	Window_BattleLog.prototype.startAction = function(subject, action, targets) {
		const item = action.item();
		this.push("performActionStart", subject, action);
		this.push("waitForMovement");
		this.push("performAction", subject, action);
		if (item.animationId > 0 && $dataAnimations[item.animationId].displayType > 0) {
			this.push("showAnimation", subject, targets.clone(), item.animationId);
		}
		this.displayAction(subject, item);
	};

	// Customize battle start message by removing the display of enemy names
	BattleManager.displayStartMessages = function() {
		if (this._preemptive) {
			$gameMessage.add(TextManager.preemptive.format($gameParty.name()));
		} else if (this._surprise) {
			$gameMessage.add(TextManager.surprise.format($gameParty.name()));
		}
	};
	
	// Customize battle log by removing miss/evade messages
	Window_BattleLog.prototype.displayDamage = function(target) {
		this.displayHpDamage(target);
		this.displayMpDamage(target);
		this.displayTpDamage(target);
	};

	// Customize battle log by removing HP damage messages
	Window_BattleLog.prototype.displayHpDamage = function(target) {
		if (target.result().hpAffected) {
			if (target.result().hpDamage > 0 && !target.result().drain) {
				this.push("performDamage", target);
			}
			if (target.result().hpDamage < 0) {
				this.push("performRecovery", target);
			}
		}
	};
	
	// Customize battle log by removing MP damage messages
	Window_BattleLog.prototype.displayMpDamage = function(target) {
		if (target.isAlive() && target.result().mpDamage !== 0) {
			if (target.result().mpDamage < 0) {
				this.push("performRecovery", target);
			}
		}
	};

	// Customize battle log by removing TP damage messages
	Window_BattleLog.prototype.displayTpDamage = function(target) {
		if (target.isAlive() && target.result().tpDamage !== 0) {
			if (target.result().tpDamage < 0) {
				this.push("performRecovery", target);
			}
		}
	};
	
	// Customize battle log by removing reflection messages
	Window_BattleLog.prototype.displayReflection = function(target) {
		this.push("performReflection", target);
	};

	// Returns true iff a damage popup message is currently causing a wait
	Sprite_Battler.prototype.isDamagePopupActive = function() {
		return (BattleManager._action !== $gameTemp._lastAction || BattleManager._action?.isDrain()) && SceneManager._scene._spriteset.battlerSprites().some(sprite => sprite._damages.length > 0);
	};

	// Returns true iff a damage popup message exists on this battler
	Sprite_Battler.prototype.isDamagePopupActiveOnSelf = function() {
		return this._damages.length > 0;
	};

	// Inject logic to not skip to the collapse effect until the damage popups are done
	Sprite_Enemy.prototype.updateCollapse = function() {
		if (!this.isDamagePopupActiveOnSelf()) {
			this.blendMode = 1;
			this.setBlendColor([255, 128, 128, 128]);
			this.opacity *= this._effectDuration / (this._effectDuration + 1);
		} else {
			this._effectDuration++;
		}
	};
	
	// Set this here instead of the popup update so it isn't called every frame, which was interfering with sprite creation
	const _BattleManager_invokeAction = BattleManager.invokeAction;
	BattleManager.invokeAction = function(subject, target) {
		$gameTemp._lastAction = BattleManager._action;
		_BattleManager_invokeAction.call(this, subject, target);
	}
})();

