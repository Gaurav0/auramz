let maxMessageBoxLines = 4;

function checkMessageBoxesMap(mapJson, mapId) {
	return new Promise((resolve, _reject) => {
		mapJson.events.forEach(event => {
			if (event) {
				event.pages.forEach(page => {
					let messageBoxLines = 0;
					let countLines = false;
					page.list.forEach(listItem => {
						if (listItem.code === 101) {
							// Do not count middle text boxes
							countLines = listItem.parameters[2] != 1;
						} if (listItem.code === 401 && countLines) {
							messageBoxLines++;
							if (messageBoxLines == maxMessageBoxLines) {
								console.log(`Map ${mapId} ${mapJson.displayName} has too long messsage box.`)
								console.log(event)
								console.log(listItem.parameters[0])
								console.log("");
							}
						} else {
							messageBoxLines = 0;
						}
					})
				})
			}
		})
		resolve()
	})
}
function checkMessageBoxesCommonEvents(commonEventsJson) {
	return new Promise((resolve, _reject) => {
		commonEventsJson.forEach(event => {
			if (event) {
				event.pages.forEach(page => {
					let messageBoxLines = 0;
					let countLines = false;
					page.list.forEach(listItem => {
						if (listItem.code === 101) {
							// Do not count middle text boxes
							countLines = listItem.parameters[2] != 1;
						} else if (listItem.code === 401 && countLines) {
							messageBoxLines++;
							if (messageBoxLines == maxMessageBoxLines) {
								console.log(`CommonEvents has ${commontEventsWordCount} too long message box.`)
								console.log(event)
								console.log(listItem.parameters[0])
								console.log("");
							}
						} else {
							messageBoxLines = 0;
						}
					})
				})
			}
		})
		resolve()
	})
}
async function printTooLongMessageBoxes() {
	const mapInfosPromise = await fetch('data/MapInfos.json')
	const mapInfosJson = await mapInfosPromise.json()
	const mapPromises = mapInfosJson.map(async info => {
		if (info) {
			const mapPromise = await fetch(`data/Map${info.id.toString().padStart(3, '0')}.json`).catch(function() {
				null;
			});
			if (mapPromise) {
				const mapJson = await mapPromise.json()
				return checkMessageBoxesMap(mapJson, info.id)
			}

		}
	})
	await Promise.all(mapPromises)

	const commonEventsPromise = await fetch(`data/CommonEvents.json`)
	const commonEventsJson = await commonEventsPromise.json()
	checkMessageBoxesCommonEvents(commonEventsJson)
}
printTooLongMessageBoxes()