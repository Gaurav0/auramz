//=============================================================================
// RPG Maker MZ - Battle UX
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
 * @plugindesc Battle UX
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help battle_ux.js
 *
 * Adds a series of user experience (UX) improvements to the battle system.
 * - Extra icon slots. If more states affect a character, slots rotate.
 * - Damage-based blink colors
 * - More descriptive damage showing damage type via icon
 *
 * @param numStateIcons
 * @type number
 * @text Num State Icons
 * @desc The number of icon slots shown above a character
 * @default 3
 *
 * @param mapElementIdToIconId
 * @type string
 * @text ElementID to IconID
 * @desc Script to map the ID of an element to an icon
 * @default elementId > 1 ? 62 + elementId : 77
 * 
 * @param reflectionAnimation
 * @type animation
 * @text Reflection Animation
 * @desc Animation that's played when triggering a reflection
 * @default 40
 */

window.AuraMZ = window.AuraMZ || {};
AuraMZ.BattleUX = {};

(($) => {
	const PLUGIN_NAME = "battle_ux";
	const params = PluginManager.parameters(PLUGIN_NAME);
	$.numStateIcons = parseInt(params["numStateIcons"]);
	$.mapElementIdToIconId = params["mapElementIdToIconId"];
	$.reflectionAnimation = parseInt(params["reflectionAnimation"]);

	// Enemies with <50% HP blink yellow and enemies with <25% blink red
	Sprite_Battler.prototype.getBlinkColor = function() {
		const percentHp = this._battler.hp / this._battler.mhp;
		if (percentHp > 0.5) {
			// Normal blinking
			return [255, 255, 255, 64];
		} else if (percentHp > 0.25) {
			// Damaged blinking
			return [255, 255, 0, 64];
		} else {
			// Critical blinking
			return [255, 0, 0, 64];
		}
	}

	// Inject obtaining custom blink color into main logic
	Sprite_Battler.prototype.updateSelectionEffect = function() {
		const target = this.mainSprite();
		if (this._battler.isSelected()) {
			this._selectionEffectCount++;
			if (this._selectionEffectCount % 30 < 15) {
				target.setBlendColor(this.getBlinkColor());
			} else {
				target.setBlendColor([0, 0, 0, 0]);
			}
		} else if (this._selectionEffectCount > 0) {
			this._selectionEffectCount = 0;
			target.setBlendColor([0, 0, 0, 0]);
		}
	};

	// Place additional status icons on the battle ui
	Window_BattleStatus.prototype.drawItemStatus = function(index) {
		const actor = this.actor(index);
		const rect = this.itemRectWithPadding(index);
		const nameX = this.nameX(rect);
		const nameY = this.nameY(rect);
		const stateIconX = this.stateIconX(rect);
		const stateIconY = this.stateIconY(rect);
		const basicGaugesX = this.basicGaugesX(rect);
		const basicGaugesY = this.basicGaugesY(rect);
		this.placeTimeGauge(actor, nameX, nameY);
		this.placeActorName(actor, nameX, nameY);
		let lastX = stateIconX;
		for (let i = 0; i < $.numStateIcons; ++i) {
			this.placeStateIcon(actor, lastX, stateIconY, i);
			lastX += ImageManager.iconWidth;
		}

		this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
	};

	Window_BattleStatus.prototype.stateIconX = function(rect) {
		return rect.x + ImageManager.iconWidth / 2 - 4;
	};

	// Place additional status icons on the enemy
	Sprite_Enemy.prototype.createStateIconSprite = function() {
		this._stateIconSprite = [];
		for (let i = 0; i < $.numStateIcons; ++i) {
			this._stateIconSprite.push(new Sprite_StateIcon());
			const sprite = this._stateIconSprite[i];
			sprite._iconId = i;
			sprite._iconIndex = i;
			sprite._animationIndex = i;
			sprite._originalAnimationIndex = i;
			sprite._lastStateCount = 0;
			this.addChild(this._stateIconSprite[i]);
		}

	};

	// Link the new status icons
	Sprite_Enemy.prototype.setBattler = function(battler) {
		Sprite_Battler.prototype.setBattler.call(this, battler);
		this._enemy = battler;
		this.setHome(battler.screenX(), battler.screenY());
		for (let i = 0; i < $.numStateIcons; ++i) {
			this._stateIconSprite[i].setup(battler);
		}
	};

	// Position the new status icons
	Sprite_Enemy.prototype.updateStateSprite = function() {
		const icons = this._battler.allIcons()

		for (let i = 0; i < $.numStateIcons; ++i) {
			const left = -((icons.length - 1) * ImageManager.iconWidth) / 2;
			this._stateIconSprite[i].x = left + i * ImageManager.iconWidth;
			this._stateIconSprite[i].y = -Math.round((this.bitmap.height + 40) * 0.9);
			if (this._stateIconSprite[i].y < 20 - this.y) {
				this._stateIconSprite[i].y = 20 - this.y;
			}
		}
	};

	// Places a state icon of the given id
	Window_StatusBase.prototype.placeStateIcon = function(actor, x, y, iconId) {
		const key = "actor%1-stateIcon%2".format(actor.actorId(), iconId);
		const sprite = this.createInnerSprite(key, Sprite_StateIcon);
		sprite._iconId = iconId;
		sprite._iconIndex = iconId;
		sprite._animationIndex = iconId;
		sprite._originalAnimationIndex = iconId;
		sprite._lastStateCount = 0;
		sprite.setup(actor);
		sprite.move(x, y);
		sprite.show();
	};

	// Custom update logic of an icon, the animation plays through the maximum number of icons
	Sprite_StateIcon.prototype.updateIcon = function() {
		const icons = [];
		if (this.shouldDisplay()) {
			icons.push(...this._battler.allIcons());
		}
		if (this._lastStateCount !== icons.length) {
			this._animationIndex = this._originalAnimationIndex;
			this._iconIndex = icons[this._animationIndex];
			this._lastStateCount = icons.length;
		}
		else if (icons.length > this._iconId) {
			if (icons.length > $.numStateIcons) {
				this._animationIndex = (this._animationIndex + 1) % icons.length;
			} else {
				this._animationIndex = this._iconId;
			}

			this._iconIndex = icons[this._animationIndex];
		} else {
			this._animationIndex = this._iconId;
			this._iconIndex = 0;
		}
	};

	// Plays the reflection animation on the target that is reflecting a skill
	Game_Battler.prototype.performReflection = function() {
		$gameTemp.requestAnimation([this], $.reflectionAnimation);
		SoundManager.playReflection();
	};

	// Remember the element of the damage in the result
	const _Game_Action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		_Game_Action_apply.call(this, target);
		const result = target.result();
		// Put the 0 element to the end
		const attackElements = this.subject().attackElements().reverse();
		if (attackElements.length == 0 || this.item().damage.elementId >= 0) {
			result.elementId = this.item().damage.elementId;
		} else {
			const maxElementRate = this.elementsMaxRate(target, attackElements);
			result.elementId = attackElements.find(elementId => maxElementRate == target.elementRate(elementId));
		}
	};

	// Reset the element ID of an action
	const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
	Game_ActionResult.prototype.clear = function() {
		_Game_ActionResult_clear.call(this);
		this.elementId = 0;
	};

	const _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
	Sprite_Damage.prototype.initialize = function() {
		_Sprite_Damage_initialize.call(this);
		this._duration = 120;
		this._scaleDirection = 1;
		this.scale.x = 0;
		this.scale.y = 0;
	};

	const Sprite_Damage_setup = Sprite_Damage.prototype.setup;
	Sprite_Damage.prototype.setup = function(target) {
		const result = target.result();
		if (result.hpAffected) {
			this._elementId = result.elementId;
		}
		Sprite_Damage_setup.call(this, target);
	};

	const _Sprite_Damage_destroy = Sprite_Damage.prototype.destroy;
	Sprite_Damage.prototype.destroy = function(options) {
		_Sprite_Damage_destroy.call(this, options);
		delete $gameTemp._damageDelay;
	};

	Sprite_Damage.prototype.createDigits = function(value) {
		const string = Math.abs(value).toString();
		const h = this.fontSize();
		const w = Math.floor(h * 0.75);
		let xOffset = 0;
		if (this._elementId > 0) {
			const iconSprite = this.drawDamageTypeIcon();
			iconSprite.x = (0 - (string.length - 1) / 2) * w;
			iconSprite.dy = -0;
			xOffset = ImageManager.iconWidth;
		}
		for (let i = 0; i < string.length; i++) {
			const sprite = this.createChildSprite(w, h);
			sprite.bitmap.drawText(string[i], 0, 0, w, h, "center");
			sprite.x = (i - (string.length - 1) / 2) * w + xOffset;
			sprite.dy = -i;
		}
	};

	Sprite_Damage.prototype.drawDamageTypeIcon = function() {
		const elementId = this._elementId;
		const elementIconId = eval($.mapElementIdToIconId);
		const bitmap = ImageManager.loadSystem("IconSet");
		const pw = ImageManager.iconWidth;
		const ph = ImageManager.iconHeight;
		const sx = (elementIconId % 16) * pw;
		const sy = Math.floor(elementIconId / 16) * ph;
		const sprite = new Sprite();
		sprite.bitmap = new Bitmap(pw, ph);
		sprite.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 1;
		sprite.y = -40;
		sprite.ry = sprite.y;
		this.addChild(sprite);
		return sprite;
	};

	const _Sprite_Damage_update = Sprite_Damage.prototype.update;
	Sprite_Damage.prototype.update = function() {
		_Sprite_Damage_update.call(this);
		this.updateScale();
	};

	Sprite_Damage.prototype.updateScale = function() {
		if (this._scaleDirection === 1 && this.scale.x < 1.5) {
			this.scale.x += 0.05;
			this.scale.y += 0.05;
		} else if (this._scaleDirection === 0 && this.scale.x > 1) {
			this.scale.x -= 0.05;
			this.scale.y -= 0.05;
		} else if (this.scale.x >= 1.5) {
			this._scaleDirection = 0;
		}
	}

	// Custom HP Damage text which also shows the type of damage
	Window_BattleLog.prototype.makeHpDamageText = function(target) {
		const result = target.result();
		const damage = result.hpDamage;
		const isActor = target.isActor();
		if (damage > 0 && result.drain) {
			return makeDrainText(isActor, target, damage);
		} else if (damage > 0) {
			return makeDamageText(isActor, target, damage, result);
		} else if (damage < 0) {
			return makeRecoveryText(isActor, target, damage);
		} else {
			return makeNoDamageText(isActor, target);
		}
	};

	// Creates the damage text for the drain case
	function makeDrainText(isActor, target, damage) {
		const fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
		return fmt.format(target.name(), TextManager.hp, damage);
	}

	// Creates the damage text for the damage case
	function makeDamageText(isActor, target, damage, result) {
		const fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
		const elementId = result.elementId;
		if (elementId > 0) {
			const elementIconId = eval($.mapElementIdToIconId);
			const element = " \\I[" + elementIconId + "]" + $dataSystem.elements[elementId];
			return fmt.format(target.name(), damage, element);
		} else {
			return fmt.format(target.name(), damage, "");
		}
	}

	// Creates the damage text for the recovery case
	function makeRecoveryText(isActor, target, damage) {
		const fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
		return fmt.format(target.name(), TextManager.hp, -damage);
	}

	// Creates the damage text for the no damage case
	function makeNoDamageText(isActor, target) {
		const fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
		return fmt.format(target.name());
	}

	// Ensures that boss type enemies that can enter with the Appear command and died during a battle 
	// and therefore have 0 opacity after they collapse animation finishes displaying, are properly 
	// registered and re-appeared in case they get manually "resummoned".
	const _Game_BattlerBase_appear = Game_BattlerBase.prototype.appear;
	Game_BattlerBase.prototype.appear = function() {
		_Game_BattlerBase_appear.call(this);
		this.requestEffect("appear");
	};

	// Disable sealed skill types on the skill command level
	Window_ActorCommand.prototype.addSkillCommands = function() {
		const skillTypes = this._actor.skillTypes();
		for (const stypeId of skillTypes) {
			const name = $dataSystem.skillTypes[stypeId];
			const enabled = !this._actor.isSkillTypeSealed(stypeId);
			this.addCommand(name, "skill", enabled, stypeId);
		}
	};
})(AuraMZ.BattleUX);