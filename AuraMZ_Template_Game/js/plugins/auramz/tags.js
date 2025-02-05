//=============================================================================
// RPG Maker MZ - Custom Data Tags
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
 * @plugindesc Custom Data Tags
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help tags.js
 *
 * This plugin parses various tags in notes of objects.
 * A tag has the form 
 * [tag parameter1 parameter2 ... parameter n]
 *
 */

// ---------------------------------------------------------------------------------
// OBJECTS
// ---------------------------------------------------------------------------------

// Generic tag factory
class TagFactory {

	// Creates a list of tags of the given type from a note string by calling the production function
	static createTagsFromNote(tagType, producer, note) {
		const tags = [];
		const quotationMarksRegex = /"/g;
		const tagTypeRegex = new RegExp("(?<=\\[" + tagType + " ).+?(?=\\])", "g");
		let match;
		while (null != (match = tagTypeRegex.exec(note))) {
			const tagData = match[0];
			const tokens = tagData.match(/('[^']*')|[^ ]+/g).map(match => match.replace(quotationMarksRegex, ""));
			const tag = producer(tokens);
			tags.push(tag);
		}

		return tags;
	}
}