//=============================================================================
// RPG Maker MZ -  Migration Utils
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Migration Utils
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help migration_utils.js
 *
 * This plugin provides utility base functions to migrate existing saves to new a versions.
 * A version is this context does not directly correspond to the game version.
 * Whenever a save file would be incompatible with an old version, then a new migration version
 * needs to be defined.
 *
 * The migration is performed by sequentiallly executing all migrators until the newest version is reached.
 * Migration version 0 corresponds to version 0.3.x.
 * Migration of saves 0.2.0 or before is not supported.
 *
 */

// Migration service that executes all migrators starting from a specified version
class MigrationService {
	migrate(migrators, fromVersion) {
		// Undefined = version 0
		if (fromVersion == undefined) {
			fromVersion = 0;
		}

		// Execute the migrators
		for (let i = fromVersion; i < migrators.length; ++i) {
			migrators[i].migrate();
		}
	}
}

window.AuraMZ = window.AuraMZ || {};
AuraMZ.Migration = {};

(($) => {
	// Default base version number. Overwrite with correct version number
	$.version = 1;
	// Default migrator list. Overwrite with custom list of migrators.
	$.migrators = [];

	// Ensure that the save is marked with the correct version
	const _DataManager_makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = () => {
		const contents = _DataManager_makeSaveContents();
		contents.version = $.version;
		return contents;
	};

	// Check for migration and perform it if necessary
	const _DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = (contents) => {
		_DataManager_extractSaveContents(contents);
		const currentVersion = contents.version;

		// Check if migration is necessary
		// If no current version is defined or if the current version is older
		// then we need to execute the migrators
		if (currentVersion == undefined || currentVersion < $.version) {
			const migrationService = new MigrationService();
			migrationService.migrate($.migrators, currentVersion)
		}
	};
})(AuraMZ.Migration);
