//Google maps
import { Wrapper } from "@googlemaps/react-wrapper";
//Hooks
import { useState, useEffect, useRef } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForwardStep, faBackwardStep } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./rainMap.module.scss"

function MyMapComponent({ selectedMapLocation }) {
    const [myMap, setMyMap] = useState();
    const [tiles, setTiles] = useState(null);
    const ref = useRef();

    console.log(myMap)

    useEffect(() => {
        const buildMap = async () => {
            const newMap = new window.google.maps.Map(ref.current, {
                center: { lat: 44, lng: -72.75 },
                zoom: 7,
                mapTypeId: "terrain",
                streetViewControl: false,
                mapTypeControl: false,
                styles: [{
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }]
            });

            newMap.addListener('click', (e) => console.log(e.latLng.lat(), e.latLng.lng()))
            // let bounds = new window.google.maps.LatLngBounds()
            //Setting UP KML Layers
            let riversKml = new window.google.maps.KmlLayer({
                url: "https://creekvt.com/FlowsPageAssets/all_rivers_colorless.kml",
                suppressInfoWindows: false,
                preserveViewport: true
            });
            riversKml.setMap(newMap);

            //Getting radar data from rainviewer
            async function getRadarData() {
                let radarData = await fetch("https://api.rainviewer.com/public/weather-maps.json");
                let radarJSON = await radarData.json()
                return radarJSON;
            }

            //fill newMap.overlayMapTypes array with tiles and display first tile by setting opacity to 1
            let fetchedRadarData = await getRadarData();
            let timestampArray = [];
            let tilesArray = [];
            let totalTilesPast = Object.keys(fetchedRadarData['radar']['past']).length
            let j = 0;
            while (j < totalTilesPast) {
                let currentData = fetchedRadarData['radar']['past'][j]['path'];
                let currentTime = new Date(1000 * fetchedRadarData['radar']['past'][j]['time']);
                let radarTile = new window.google.maps.ImageMapType({
                    getTileUrl: function (coord, zoom) {
                        return ["https://tilecache.rainviewer.com", currentData, "256",
                            zoom, coord.x, coord.y, "4", "1_0.png"].join('/');
                    },
                    tileSize: new window.google.maps.Size(256, 256),
                    opacity: 0
                });
                newMap.overlayMapTypes.push(radarTile);
                timestampArray.push(currentTime);
                j++
            }
            // radarInfo.innerHTML = formatDate(timestampArray[j - 1]);
            // radarInfo.style.display = "initial";
            tilesArray = newMap.overlayMapTypes[Object.keys(newMap.overlayMapTypes)[0]];
            tilesArray[j - 1].setOpacity(1);
            setTiles({ tilesArray, timestampArray })
            setMyMap(newMap)
        }
        buildMap()
    }, []);


    return (
        <div className={`${styles["map__container"]}`}>
            <div className={`${styles["map"]}`} ref={ref} id="map"></div>
            <div className={`${styles["radar-info"]}`}>
                {tiles &&
                    <>{`${formatDateTime(tiles.timestampArray[tiles.timestampArray.length - 1]).fullDate} ${formatDateTime(tiles.timestampArray[tiles.timestampArray.length - 1]).time} ${formatDateTime(tiles.timestampArray[tiles.timestampArray.length - 1]).amPm}`}</>
                }
            </div>
            <div className={`${styles["radar-controls"]}`}>
                <button><FontAwesomeIcon icon={faBackwardStep}/></button>
                <button><FontAwesomeIcon icon={faPlay}/></button>
                <button><FontAwesomeIcon icon={faForwardStep}/></button>
            </div>
        </div>
    )
}


export default function RainMap() {

    return (
        <div className={`${styles["component__container"]}`}>
            <Wrapper apiKey={"AIzaSyBBtqHKDrsiMp-7ldVkI6QEMoxjzggJ-J8"}>
                <MyMapComponent
                // selectedMapLocation={selectedMapLocation}
                />
            </Wrapper>
        </div>
    )
}