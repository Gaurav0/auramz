//=============================================================================
// RPG Maker MZ - Large Sprite Fix
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2024/03/13
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Fixes a bug where events appear under ☆ passability tiles.
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help large_sprite_fix.js
 *
 * Alternative implementation to Neon Black's CP_Large_Sprite_Fix plugin.
 * Renders characters which have an overlap with ☆ tiles that have the terrain Tag
 * configured in the param of this plugin on the ABOVE CHARACTERS layer.
 *
 * @param terrainTag
 * @text Terrain Tag
 * @desc Tiles with this Tag will check their surroundings for events that might need to be rendered on a higher layer.
 * @default 7
 *
 */

window.AuraMZ = window.AuraMZ || {};

(() => {
	const PLUGIN_ID = "large_sprite_fix";
	const PARAMS = PluginManager.parameters(PLUGIN_ID);
	const terrainTag = parseInt(PARAMS["terrainTag"]);

	// Inject logic to update the z position of this character if it overlaps
	// with a tile with terrainTag
	const _Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
	Sprite_Character.prototype.updatePosition = function() {
		_Sprite_Character_updatePosition.apply(this, arguments);
		if (this.isGroundLargeSprite() && this.checkOverlapWithTaggedStarTerrain()) {
			this.z = 5; // Above Characters Layer
		}
	}

	// True if this sprite requires checking for nearby tiles with the terrain tag
	Sprite_Character.prototype.isGroundLargeSprite = function() {
		return this.visible
			&& !this.isTile()
			&& !this.isEmptyCharacter()
			&& this._character.screenZ() < 5 // The event is already on a higher z coordinate
			&& this._character.isNearTheScreen(); // The event is out of screen
	}

	// Gets the bounding box of all tiles this sprite overlaps with
	Sprite_Character.prototype.getBoundingTileRect = function() {
		const tileWidth = $gameMap.tileWidth();
		const tileHeight = $gameMap.tileHeight();
		const tileSizeX = this.width / tileWidth;
		const tileSizeY = this.height / tileHeight;
		const tileShiftY = this._character.shiftY() / tileHeight;

		const x = Math.floor(this._character._realX);
		const y = Math.floor(this._character._realY + 1 - tileSizeY - tileShiftY);
		const width = Math.ceil(this._character._realX + tileSizeX) - x;
		const height = Math.ceil(this._character._realY + 1 - tileShiftY) - y;
		return new Rectangle(x, y, width, height);
	}

	// Checks for overlap with star terrain with the terrainTag
	Sprite_Character.prototype.checkOverlapWithTaggedStarTerrain = function() {
		const tileRect = this.getBoundingTileRect();

		for (let x = tileRect.x; x < tileRect.right; ++x) {
			for (let y = tileRect.y; y < tileRect.bottom - 1; ++y) {
				if ($gameMap.terrainTag(x, y) == terrainTag) {
					return true;
				}
			}
		}

		return false;
	}
})();