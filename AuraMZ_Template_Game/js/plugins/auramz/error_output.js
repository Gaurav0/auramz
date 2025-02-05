//=============================================================================
// RPG Maker MZ - Error Output
// ----------------------------------------------------------------------------
// (C)2021 aura-dev
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/12/13
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Error Output
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help error_output.js
 *
 * Improves the error output by also printing a stack trace.
 *
 */

(() => {
	// Injects an HTML element for printing the stack trace
	const _Graphics__makeErrorHtml = Graphics._makeErrorHtml;
	Graphics._makeErrorHtml = function(name, message, error) {
		const errorHtml = _Graphics__makeErrorHtml.call(name, message, error);

		const stackPre = document.createElement("pre");
		stackPre.id = "errorStack";
		stackPre.style = "font-size:10px;text-align:left;";
		const stackTrace = error ? error.stack.split("\n") : "";
		for (const element of stackTrace) {
			// Shorten URLs of javascript sources to start in the /js folder to save screen space
			stackPre.innerHTML += Utils.escapeHtml(element.replace(/\(.*?js\//g, "(")) + "\n";
		}
		return errorHtml + stackPre.outerHTML;
	};
})();

