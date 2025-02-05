/*:
 * @plugindesc Displays dynamic actor Faces
 * @author Gamedev Tutorials, aura-dev
 *
 * @param actorList
 * @text ActorList
 * @desc The list of actors for which the faceset will be used from the database if their base face is used.
 * @default []
 * @type struct<Actor>[]
 *
 */

/*~struct~Actor:
 *
 * @param actorId
 * @text ActorID
 * @desc The id of the actor whose faceset will be used
 *
 * @param faceName
 * @text FaceName
 * @desc The name of the faceset that will be matched
 *
 * @param faceIndex
 * @text FaceIndex
 * @desc The index of the face that will be matched
 */

(() => {

	const PARAMETERS = PluginManager.parameters("DynamicFaces");
	const ACTORS = JSON.parse(PARAMETERS["actorList"]);

	const _Window_Message_loadMessageFace = Window_Message.prototype.loadMessageFace;
	Window_Message.prototype.loadMessageFace = function() {
		for (const actorString of ACTORS) {
			const actor = JSON.parse(actorString);
			if (actor.faceName == $gameMessage.faceName() && actor.faceIndex == $gameMessage.faceIndex()) {
				faceName = $gameActors.actor(actor.actorId).faceName();
				faceIndex = $gameActors.actor(actor.actorId).faceIndex();
				$gameMessage.setFaceImage(faceName, faceIndex);
				break;
			}
		}
		
		_Window_Message_loadMessageFace.call(this);
	};
})();
