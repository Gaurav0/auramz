//=============================================================================
// RPG Maker MZ - New Game Plus Mechanic
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2022/01/01
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Show list of options for skills in new game plus
 * @author Gaurav Munjal
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help newgame_plus_skills.js
 *
 * This plugin allows to show a dialog with a list of options for
 * whether to use skills in a new game plus.
 *
 * Dependencies:
 * - auramz/newgame_plus.js
 *
 * @param spentScoreVar
 * @text Spent Score Variable
 * @desc ID of variable to use for the spent score.
 * @type variable
 * @default 410
 *
 * @param totalScoreVar
 * @text Total Score Variable
 * @desc ID of variable to use for the total score.
 * @type variable
 * @default 406
 *
 * @command showOptionsForSkills
 * @text Show Options For Skills
 * @desc Show Options For Skills
 *
 * @command carryOverSkill
 * @arg skillID
 * @type number
 * @text skillID
 * @desc ID of skill that should be carried over
 *
 * @command initCarryOverSkills
 * @text initialize carried over skills
 * @desc initialize carried over skills
 */

class Game_Variable {
	id = null;

	constructor(id) {
		this.id = id;
	}

	get value() {
		return $gameVariables.value(this.id);
	}

	set value(newValue) {
		$gameVariables.setValue(this.id, newValue);
	}
}

window.AuraMZ = window.AuraMZ || {};
AuraMZ.carryOverSkills = [];
AuraMZ.learnedSkills = AuraMZ.learnedSkills || new Set();
AuraMZ.selectedCarryOverSkills = AuraMZ.selectedCarryOverSkills || new Set();

(() => {
	const PLUGIN_NAME = "newgame_plus_skills";
	AuraMZ.NewGamePlus = {};

	const PARAMS = PluginManager.parameters(PLUGIN_NAME);
	AuraMZ.NewGamePlus.spentScoreVariable = new Game_Variable(parseInt(PARAMS["spentScoreVar"]));
	AuraMZ.NewGamePlus.totalScoreVariable = new Game_Variable(parseInt(PARAMS["totalScoreVar"]));

	// Inject logic for processing which skills can be carried over into NG+
	const _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		_Scene_Boot_start.call(this);
		DataManager.processCarryOverSkills();
	};

	// Processing of Carry Over Skills
	DataManager.processCarryOverSkills = function() {
		for (const skill of $dataSkills) {
			if (skill && skill.meta && skill.meta.score_cost) {
				skill.carryOverScoreCost = parseInt(skill.meta.score_cost);
				AuraMZ.carryOverSkills.push(skill);
			}
		}
	};

	// Create a clean slate for tracking skills when starting a new game
	const setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function() {
		setupNewGame.call(this);
		AuraMZ.learnedSkills = new Set();
		AuraMZ.selectedCarryOverSkills = new Set();
	};

	// Save the learned skills and the skills selected for carry over
	const makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = function() {
		const contents = makeSaveContents();
		contents.learnedSkills = Array.from(AuraMZ.learnedSkills);
		contents.carryOverSkills = Array.from(AuraMZ.selectedCarryOverSkills);
		return contents;
	};

	// Load the learned skills and the skills selected for carry over
	const extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = (contents) => {
		extractSaveContents(contents);
		AuraMZ.learnedSkills = new Set(contents.learnedSkills);
		AuraMZ.selectedCarryOverSkills = new Set(contents.carryOverSkills);

		// migrate skills learned this run
		for (const skillID of $gameActors.actor(1)._skills) {
			AuraMZ.learnedSkills.add(skillID);
		}
	};

	// Protect learned and carry over skills from getting erased in an NG+
	const startNewGamePlus = AuraMZ.startNewGamePlus;
	AuraMZ.startNewGamePlus = function() {
		const learnedSkills = AuraMZ.learnedSkills;
		const selectedCarryOverSkills = AuraMZ.selectedCarryOverSkills;

		startNewGamePlus();

		AuraMZ.learnedSkills = learnedSkills;
		AuraMZ.selectedCarryOverSkills = selectedCarryOverSkills;
	}

	// Inject logic for recording new skills as learned skill
	const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
	Game_Actor.prototype.learnSkill = function(skillID) {
		_Game_Actor_learnSkill.call(this, skillID);
		if (this.actorId() == 1) {
			AuraMZ.learnedSkills.add(skillID);
		}
	};

	// Extend the default help window to show the currently available score
	class Window_Help_Extended extends Window_Help {
		_scoreHelp = "";

		constructor(rect) {
			super(rect);
			this._backSprite = new Sprite();
			this._backSprite.position.y -= 10;
			const image = TLB.Param.SKAUISM.skillmenu_helpwindow_bgimage;
			this._backSprite.bitmap = ImageManager.loadMenu(image);
			this.addChildAt(this._backSprite, 0);
			this.opacity = 0;
		}

		setScore() {
			this._scoreHelp = `Spend \\c[2]Score\\c[0] on New Game+ skills? (Score: ${AuraMZ.NewGamePlus.spentScoreVariable.value}/${AuraMZ.NewGamePlus.totalScoreVariable.value})`;
			this.updateHelpText();
		}

		setItem(item) {
			this._item = item;

			this.updateHelpText();
		}

		updateHelpText() {
			if (AuraMZ.learnedSkills.has(this._item?.id)) {
				this.setText(this._scoreHelp + "\n" + (this._item ? this._item.description : ""));

				if (this._item) {
					const tags = this._item.meta["description tags"];
					if (tags) {
						const parsedTags = JSON.parse(tags);
						let x = 3;
						for (const tag of parsedTags) {
							this.changeTextColor(ColorManager.textColor(8));
							this.contents.fontFace = 'franklin-gothic-demi-cond';
							this.contents.fontSize = 18;
							const baseTag = tag.replace(/\\\w+(\[\d+\])/, "");
							const width = this.textWidth(baseTag);
							this.drawTextEx(tag, x, 116, width, true);
							x += width + 24 + ImageManager.iconWidth;
						}
						this.changePaintOpacity(1);
					}
				}
			} else {
				this.setText(this._scoreHelp + "\n???");
			}
		}

		refresh() {
			this.contents.clear();
			this.contents.fontFace = "franklin-gothic-med";
			this.contents.fontSize = 22;
			this.drawTextEx(this._text, 10, 0, 784, true);
		}

		lineHeight() {
			return 40;
		}
	}

	class Scene_ScoreSkill extends Scene_Skill {

		// Only show help window and the skill list
		create() {
			Scene_ItemBase.prototype.create.call(this);
			this.createItemWindow();
			this.createHelpWindow();
		}

		// Inject using the custom help window
		createHelpWindow() {
			const rect = this.helpWindowRect();
			rect.y += 10;
			this._helpWindow = new Window_Help_Extended(rect);
			this.addWindow(this._helpWindow);
			this._itemWindow.setHelpWindow(this._helpWindow);
			this._itemWindow.activate();
			this._itemWindow.refresh();
			this._itemWindow.forceSelect(0);
		}

		// Make help window have 3 rows (1 extra row for current score display)
		helpAreaHeight() {
			return this.calcWindowHeight(5, false);
		}

		helpWindowRect = Scene_MenuBase.prototype.helpWindowRect;

		// Inject the custom score skill list
		createItemWindow() {
			const rect = this.itemWindowRect();
			this._itemWindow = new Window_ScoreSkillList(rect);
			this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
			this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
			this.addWindow(this._itemWindow);
		}

		// Adjust the skill list rect size
		itemWindowRect() {
			const wx = 0;
			const wy = this.mainAreaTop() - 30;
			const ww = Graphics.boxWidth;
			const wh = this.mainAreaHeight();
			return new Rectangle(wx, wy, ww, wh);
		}

		// Inject a dummy actor since the default implementation needs one
		refreshActor = function() {
			const actor = $gameParty.leader();
			this._itemWindow.setActor(actor);
		}

		// Don't show page buttons
		needsPageButtons() {
			return false;
		}

		// Close the scene when cancelling
		onItemCancel() {
			SceneManager.pop();
		}

		// Toggle the carry over into NG+ state for the selected skill
		onItemOk() {
			this._itemWindow.activate();
			const skill = this._itemWindow.item();
			if (AuraMZ.selectedCarryOverSkills.has(skill.id)) {
				AuraMZ.selectedCarryOverSkills.delete(skill.id);
				AuraMZ.NewGamePlus.spentScoreVariable.value -= skill.carryOverScoreCost;
			} else {
				AuraMZ.selectedCarryOverSkills.add(skill.id);
				AuraMZ.NewGamePlus.spentScoreVariable.value += skill.carryOverScoreCost;
			}
			this._itemWindow.refresh();
			this._helpWindow.setScore();
		}
	}

	class Window_ScoreSkillList extends Window_SkillList {
		constructor(rect) {
			super(rect);
			this._backgroundSprite = new Sprite();
			let image = TLB.Param.SKAUIB.itemwindow_bgimage;
			const bmp = ImageManager.loadMenu(image);
			this._backgroundSprite.bitmap = bmp;
			this.addChildAt(this._backgroundSprite, 0);
			this._contentBg = new Sprite();
			image = TLB.Param.SKAUIB.itemwindow_contentimage;
			let bitmap = ImageManager.loadMenu(image);
			this._contentBg.bitmap = bitmap;
			this._contentBg.move(5, -73);
			this._clientArea.addChildAt(this._contentBg, 0);
			image = TLB.Param.SKAUIB.arrowimage;
			bitmap = ImageManager.loadMenu(image);
			this._downArrowSprite.bitmap = bitmap;
			this._downArrowSprite.anchor.x = 0.5;
			this._downArrowSprite.anchor.y = 0.5;
			this._downArrowSprite.move(816 / 2, 480);
			this._upArrowSprite.bitmap = bitmap;
			this._upArrowSprite.anchor.x = 0.5;
			this._upArrowSprite.anchor.y = 0.5;
			this._upArrowSprite.scale.y = -1;
			this._upArrowSprite.move(816 / 2, 5);
			this.opacity = 0;
			this.cursorVisible = false;
			this._contentsSprite.y += 15;
		}

		// Display the carry over skills
		makeItemList() {
			this._data = AuraMZ.carryOverSkills;
			this._helpWindow.setScore();
		}

		// A skill can be carried over if it was learned and there is enough score
		isEnabled(skill) {
			return AuraMZ.learnedSkills.has(skill.id) &&
				(skill.carryOverScoreCost + AuraMZ.NewGamePlus.spentScoreVariable.value <= AuraMZ.NewGamePlus.totalScoreVariable.value || AuraMZ.selectedCarryOverSkills.has(skill.id));
		}

		// Inject custom labeling logic
		drawItemName(item, x, y, width) {
			if (item) {
				const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
				const textMargin = ImageManager.iconWidth + 4;
				const itemWidth = Math.max(0, width - textMargin);
				this.resetTextColor();
				this.drawIcon(item.iconIndex, x, iconY);
				this.drawText(this.calcItemText(item), x + textMargin, y, itemWidth);
			}
		}

		drawItemBackground(_) {
			//
		}

		hitIndex() {
			const touchPos = new Point(TouchInput.x, TouchInput.y);
			const localPos = this.worldTransform.applyInverse(touchPos);
			return this.hitTest(localPos.x, localPos.y - 15);
		}

		refreshCursor() {
			if (this.index() >= 0) {
				const rect = this.itemRect(this.index());
				rect.y += 15;
				this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
				this.cursorVisible = true;
			} else {
				this.setCursorRect(0, 0, 0, 0);
				this.cursorVisible = false;
			}
		}

		updateScrollBase(baseX, baseY) {
			const deltaX = baseX - this._scrollBaseX;
			const deltaY = baseY - this._scrollBaseY;
			this._contentBg.x -= deltaX;
			this._contentBg.y -= deltaY;
			if (deltaY > 44) { // scrolling more than 1 row, select last item
				this._contentBg.y = this.row() % 2 === 0 ? -117 : -73;
			} else {
				if (this._contentBg.y <= -161 || this._contentBg.y >= 15) this._contentBg.y = -73;
			}
			super.updateScrollBase(baseX, baseY);
		}

		itemPadding() {
			return 5;
		}

		_createCursorSprite() {
			this._cursorSprite = new Sprite();
			let image = TLB.Param.SKAUIB.itemwindow_cursorimage;
			let bmp = ImageManager.loadMenu(image);
			this._cursorSprite.bitmap = bmp;
			this._clientArea.addChild(this._cursorSprite);
		}

		_refreshCursor() {
			//
		}

		_refreshArrows() {
			//
		}

		_updateFilterArea() {
			const pos = this._clientArea.worldTransform.apply(new Point(0, 15));
			const filterArea = this._clientArea.filterArea;
			filterArea.x = pos.x + this.origin.x;
			filterArea.y = pos.y + this.origin.y;
			filterArea.width = this.innerWidth;
			filterArea.height = 440;
		}

		// Extend the label of a skill depending on carry over state / learned state
		calcItemText(item) {
			if (AuraMZ.learnedSkills.has(item.id)) {
				if (AuraMZ.selectedCarryOverSkills.has(item.id)) {
					return "ON: " + item.name;
				} else {
					return item.name;
				}
			} else {
				return "???";
			}
		}

		// Inject custom logic for using score cost as skill cost
		drawSkillCost(skill, x, y, width) {
			this.changeTextColor(ColorManager.hpGaugeColor1());
			this.drawText(skill.carryOverScoreCost, x, y, width, "right");
		}
	}

	Object.defineProperty(Window_ScoreSkillList.prototype, "innerHeight", {
		get: function() {
			return 440;
		},
		configurable: true
	});

	Object.defineProperty(Window_ScoreSkillList.prototype, "innerRect", {
		get: function() {
			return new Rectangle(
				17,
				27,
				this.innerWidth,
				440
			);
		},
		configurable: true
	});

	// Opens the menu for selecting carry over skills
	PluginManager.registerCommand(PLUGIN_NAME, "showOptionsForSkills", _ => {
		SceneManager.push(Scene_ScoreSkill);
	})

	// Command to add a skill that may be carried over
	PluginManager.registerCommand(PLUGIN_NAME, "carryOverSkill", args => {
		AuraMZ.selectedCarryOverSkills.add(args.skillID);
	})
	
	// Adds all carry over skills to party leader
	PluginManager.registerCommand(PLUGIN_NAME, "initCarryOverSkills", _ => {
		// Turn on carried over skills
		for (const skillID of AuraMZ.selectedCarryOverSkills) {
			$gameActors.actor(1).learnSkill(skillID);
		}
	})
})();
