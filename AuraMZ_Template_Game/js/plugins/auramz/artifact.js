//=============================================================================
// RPG Maker MZ - EnhanceSkill Tag
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/08/02
// 1.0.1 2021/10/10 Added on enhance/unenhance map
// 1.0.2 2022/02/06 Added tags for enhance/unenhance/onbattlestart effects
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Artifact Tag
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help artifact.js
 *
 * This plugin parses the artifact tag. An artifact gives all members of the party a passive trait.
 *
 * [artifact itemType itemId]
 *
 * itemType = armor or weapon
 * itemID = the armor/weapon id that will be applied while carrying the artifact
 *
 * Dependencies:
 * - tags.js
 */

window.AuraMZ = window.AuraMZ || {};

class ArtifactTagFactory {

	static get TAG_TYPE_ARTIFACT() { return "artifact"; }

	// Creates an artifact tag object from a list of tokens
	static createArtifactTagFromTokens(tokens) {
		return new ArtifactTag(tokens[0], tokens[1]);
	}

	// Creates all artifact tags from a note
	static createEnhanceSkillTagsFromNote(note) {
		return TagFactory.createTagsFromNote(
			ArtifactTagFactory.TAG_TYPE_ARTIFACT, ArtifactTagFactory.createArtifactTagFromTokens, note
		);
	}
}

// Holds the data of an artifact tag
class ArtifactTag {
	constructor(type, itemID) {
		this._type = type;
		this._itemID = parseInt(itemID);
	}
}

// Inject the tag checks into the existing logic
(() => {
	// Inject processing of Artifacts
	const _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		_Scene_Boot_start.call(this);
		DataManager.processArtifacts();
	};

	// Processing of Artifacts
	DataManager.processArtifacts = function() {
		for (const item of $dataItems) {
			if (!item) {
				continue;
			}

			const artifactTags = ArtifactTagFactory.createEnhanceSkillTagsFromNote(item.note);
			if (artifactTags.length > 0) {
				const artficatTag = artifactTags[0];
				if (artficatTag._type == "weapon") {
					item.artifact = new Game_Item($dataWeapons[artficatTag._itemID]);
				} else if (artficatTag._type == "armor") {
					item.artifact = new Game_Item($dataArmors[artficatTag._itemID]);
				}
			}
		}
	};

	// Gets all artifacts owned by the party
	Game_Party.prototype.artifacts = function() {
		if (!this._artifacts) {
			this._artifacts = Object.keys(this._items).filter(itemId => $dataItems[itemId].artifact);
		}
		return this._artifacts.map(itemId => $dataItems[itemId]).filter(item => item.artifact);
	}
	
	// Invalidate the cache listing the artifacts if an artifact is added / removed
	const _Game_Party_gainItem = Game_Party.prototype.gainItem;
	Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
		_Game_Party_gainItem.call(this, item, amount, includeEquip);
		if (item && item.artifact) {
			this._artifacts = undefined;
		}
	};
	
	const MULTIPLIER_NOTE_TAG = "multiply parameter changes";

	// Injects logic for applying artifacts changes to attributes
	const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
	Game_Actor.prototype.paramPlus = function(paramId) {
		let value = _Game_Actor_paramPlus.call(this, paramId);
		const artifacts = $gameParty.artifacts();
		for (const artifact of artifacts) {
			const object = artifact.artifact.object();
			const multiplier = object.meta[MULTIPLIER_NOTE_TAG] ? eval(object.meta[MULTIPLIER_NOTE_TAG]) : 1;
			value += object.params[paramId] * $gameParty.numItems(artifact) * multiplier;
		}

		return value;
	};

	// Injects logic for applying enhanceskill traits to traits
	const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
	Game_Actor.prototype.traitObjects = function() {
		const objects = _Game_Actor_traitObjects.call(this);
		const artifacts = $gameParty.artifacts();
		for (const artifact of artifacts) {
			objects.concat(artifact.artifact.object());
		}
		return objects;
	};
})();
