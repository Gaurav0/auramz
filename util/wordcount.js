let totalWordCount = 0
function countWordsOnMap(mapJson, mapId) {
	return new Promise((resolve, _reject) => {
		let mapWordCount = 0
		mapJson.events.forEach(event => {
			if (event) {
				event.pages.forEach(page => {
					page.list.forEach(listItem => {
						if (listItem.code === 401) {
							mapWordCount += listItem.parameters[0].split(' ').length
						}
					})
				})
			}
		})
		console.log(`Map ${mapId} ${mapJson.displayName} has ${mapWordCount} words.`)
		totalWordCount += mapWordCount
		resolve()
	})
}
function countWordsOnCommonEvents(commonEventsJson) {
	return new Promise((resolve, _reject) => {
		let commontEventsWordCount = 0
		commonEventsJson.forEach(event => {
			if (event) {
				event.list.forEach(listItem => {
					if (listItem.code === 401) {
						commontEventsWordCount += listItem.parameters[0].split(' ').length
					}
				})
			}
		})
		console.log(`CommonEvents has ${commontEventsWordCount} words.`)
		totalWordCount += commontEventsWordCount
		resolve()
	})
}
async function countAllWords() {
	const mapInfosPromise = await fetch('data/MapInfos.json')
	const mapInfosJson = await mapInfosPromise.json()
	const mapPromises = mapInfosJson.map(async info => {
		if (info) {
			const mapPromise = await fetch(`data/Map${info.id.toString().padStart(3, '0')}.json`).catch(function() {
				null;
			});
			if (mapPromise) {
				const mapJson = await mapPromise.json()
				return countWordsOnMap(mapJson, info.id)
			}

		}
	})
	await Promise.all(mapPromises)

	const commonEventsPromise = await fetch(`data/CommonEvents.json`)
	const commonEventsJson = await commonEventsPromise.json()
	countWordsOnCommonEvents(commonEventsJson)

	console.log(`The total number of words is: ${totalWordCount}`)
}
countAllWords()