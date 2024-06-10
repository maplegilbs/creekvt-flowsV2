
let radarInfo = document.getElementById('radarInfo');
let playPause = document.getElementById('playPause');
let radarControls = document.getElementById('radarControls');
let back = document.getElementById('back');
let forward = document.getElementById('forward');
let timestampArray = [];
let totalTilesPast = 0;
let tilesArray = [];

function initMap() {
	let map = new google.maps.Map(document.getElementById("weatherMap"), {
	center: {lat: 44, lng: -72.75}, 
	zoom: 7,
	mapTypeId: "terrain",
	streetViewControl: false,
	mapTypeControl: false
	})

	//Setting UP KML Layers
	let riversKml = new google.maps.KmlLayer({
		url: "https://creekvt.com/FlowsPageAssets/all_rivers_colorless.kml",
		suppressInfoWindows: false,
		preserveViewport: true
	});
	riversKml.setMap(map);

	
	//Getting radar data from rainviewer
	async function getRadarData () {
		let radarData = await fetch ("https://api.rainviewer.com/public/weather-maps.json");
		let radarJSON = await radarData.json()
		return radarJSON;
	}

	//set up functions for play pause forward and back
	let paused = true;
	let i = 0;
	forward.addEventListener('click', () => fwdArrowControl ())
	back.addEventListener('click', () => bckArrowControl ())
	playPause.addEventListener('click', () => {
		if (playPause.innerHTML == 'Play'){
			playPause.innerHTML = 'Pause';
			back.style.display = 'none';
			forward.style.display = 'none';
			paused = false;
			animateRadar(i);
		}
		else {
			playPause.innerHTML = 'Play';
			back.style.display = 'initial';
			forward.style.display = 'initial';
			paused = true;
		}
	})
	
	//fill map.overlayMapTypes array with tiles and display first tile by setting opacity to 1
	let fetchedRadarData = getRadarData ();
	fetchedRadarData.then( radarJSON => {
		let currentTime;
		radarControls.style.display = 'flex';
		totalTilesPast = Object.keys(radarJSON['radar']['past']).length
		let j=0;
		while (j < totalTilesPast){
			let currentData = radarJSON['radar']['past'][j]['path'];
			currentTime = new Date(1000*radarJSON['radar']['past'][j]['time']);
			let radarTile = new google.maps.ImageMapType({
			getTileUrl: function (coord, zoom) {
				return ["https://tilecache.rainviewer.com", currentData, "256",
							zoom , coord.x, coord.y, "4", "1_0.png"].join('/');
			},
			tileSize: new google.maps.Size(256, 256),
			opacity: 0
			});
			map.overlayMapTypes.push(radarTile);
			timestampArray.push(currentTime);
			j++
		} 
		radarInfo.innerHTML = formatDate(timestampArray[j-1]);
		radarInfo.style.display = "initial";
		console.log(map.overlayMapTypes)
		tilesArray = map.overlayMapTypes[Object.keys(map.overlayMapTypes)[0]];
		tilesArray[j-1].setOpacity(1);
	})


	function animateRadar () {
		if(i!=totalTilesPast-1){
			tilesArray[totalTilesPast-1].setOpacity(0);
		}	
		setTimeout( () => {
			if(paused == true) {
				return;
			}
			else {
				if(i< totalTilesPast-1) {
					console.log(i)
					tilesArray[i+1].setOpacity(1)
					tilesArray[i].setOpacity(0);
					radarInfo.innerHTML = formatDate(timestampArray[i+1]);
					i++;
					animateRadar()
				}
				else {
					i = 1;
					if (playPause.innerHTML == 'Play'){
						playPause.innerHTML = 'Pause';
						paused = false;
					}
					else {
						playPause.innerHTML = 'Play';
						back.style.display = 'initial';
						forward.style.display = 'initial';
						paused = true;
					}
				}
			}
		}, 1000)
	}

	function fwdArrowControl () {
		if(i!=totalTilesPast-1){
			tilesArray[totalTilesPast-1].setOpacity(0);
		}	
		if(i<totalTilesPast-1){
			tilesArray[i+1].setOpacity(1)
			tilesArray[i].setOpacity(.075);
			radarInfo.innerHTML = formatDate(timestampArray[i+1]);
			i++;
		}
		else {
			map.overlayMapTypes.forEach(tile => {tile.setOpacity(0)})
			tilesArray[0].setOpacity(1)
			tilesArray[i].setOpacity(0);
			radarInfo.innerHTML = formatDate(timestampArray[0]);
			i=0;
		}
	}

	function bckArrowControl () {
		if(i!=totalTilesPast-1){
			tilesArray[totalTilesPast-1].setOpacity(0);
		}	
		if(i>0){
			tilesArray[i-1].setOpacity(1)
			tilesArray[i].setOpacity(0);
			radarInfo.innerHTML = formatDate(timestampArray[i-1]);
			i--;
		}
		else {
			map.overlayMapTypes.forEach(tile => {tile.setOpacity(0)})
			tilesArray[totalTilesPast-1].setOpacity(1)
			tilesArray[i].setOpacity(0);
			radarInfo.innerHTML = formatDate(timestampArray[totalTilesPast-1]);
			i=totalTilesPast-1;
		}
	}

}