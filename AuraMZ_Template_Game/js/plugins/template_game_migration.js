//=============================================================================
// RPG Maker MZ - Template Game Migration
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Template Game Migration
 * @author aura-dev
 * @url https://gitgud.io/aura-dev/star_knightess_aura
 *
 * @help template_game_migration.js
 *
 * Provides a sample for performing data migration.
 * Replace plugin name and everything with name/acronym of own game.
 *
 */

class Migrator1To2 {
	migrate() {
		// Insert Migration code here
	}
}


(() => {
	// Update version here
	AuraMZ.Migration.version = 1;
	// Add migrators here
	AuraMZ.Migration.migrators = [
		new Migrator1To2(),
	];
})();
