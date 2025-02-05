//=============================================================================
// RPG Maker MZ - Pathfinding
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
 * @plugindesc Optimized pathfinding algorithm
 * @author aura-dev
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help pathfinding.js
 *
 * Improves the standard pathfinding algorithm.
 *
 */

(() => {
	Game_Character.prototype.findDirectionTo = function(goalX, goalY) {
		const searchLimit = this.searchLimit();
		const mapWidth = $gameMap.width();
		const nodeList = [];
		const openList = [];
		// Use a list instead of a set for the closed list
		// This makes the check if a node is in the closed list
		// O(log n) instead of O(n) when using a regular list 
		const closedList = new Set();
		const start = {};
		let best = start;

		if (this.x === goalX && this.y === goalY) {
			return 0;
		}

		start.parent = null;
		start.x = this.x;
		start.y = this.y;
		start.g = 0;
		start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
		nodeList.push(start);
		openList.push(start.y * mapWidth + start.x);

		while (nodeList.length > 0) {
			let bestIndex = 0;
			for (let i = 0; i < nodeList.length; i++) {
				if (nodeList[i].f < nodeList[bestIndex].f) {
					bestIndex = i;
				}
			}

			const current = nodeList[bestIndex];
			const x1 = current.x;
			const y1 = current.y;
			const pos1 = y1 * mapWidth + x1;
			const g1 = current.g;

			nodeList.splice(bestIndex, 1);
			openList.splice(openList.indexOf(pos1), 1);
			closedList.add(pos1);

			if (current.x === goalX && current.y === goalY) {
				best = current;
				break;
			}

			if (g1 >= searchLimit) {
				continue;
			}

			for (let j = 0; j < 4; j++) {
				const direction = 2 + j * 2;
				const x2 = $gameMap.roundXWithDirection(x1, direction);
				const y2 = $gameMap.roundYWithDirection(y1, direction);
				const pos2 = y2 * mapWidth + x2;

				if (closedList.has(pos2)) {
					continue;
				}
				if (!this.canPass(x1, y1, direction)) {
					continue;
				}

				const g2 = g1 + 1;
				const index2 = openList.indexOf(pos2);

				if (index2 < 0 || g2 < nodeList[index2].g) {
					let neighbor = {};
					if (index2 >= 0) {
						neighbor = nodeList[index2];
					} else {
						nodeList.push(neighbor);
						openList.push(pos2);
					}
					neighbor.parent = current;
					neighbor.x = x2;
					neighbor.y = y2;
					neighbor.g = g2;
					neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
					if (!best || neighbor.f - neighbor.g < best.f - best.g) {
						best = neighbor;
					}
				}
			}
		}

		let node = best;
		while (node.parent && node.parent !== start) {
			node = node.parent;
		}

		const deltaX1 = $gameMap.deltaX(node.x, start.x);
		const deltaY1 = $gameMap.deltaY(node.y, start.y);
		if (deltaY1 > 0) {
			return 2;
		} else if (deltaX1 < 0) {
			return 4;
		} else if (deltaX1 > 0) {
			return 6;
		} else if (deltaY1 < 0) {
			return 8;
		}

		const deltaX2 = this.deltaXFrom(goalX);
		const deltaY2 = this.deltaYFrom(goalY);
		if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
			return deltaX2 > 0 ? 4 : 6;
		} else if (deltaY2 !== 0) {
			return deltaY2 > 0 ? 8 : 2;
		}

		return 0;
	};

})();