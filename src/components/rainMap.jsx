//Google maps
import { Wrapper } from "@googlemaps/react-wrapper";
//Hooks
import { useState, useEffect, useRef } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForwardStep, faBackwardStep, faPause } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./rainMap.module.scss"

function MyMapComponent({ selectedMapLocation }) {
    const [myMap, setMyMap] = useState();
    const [tiles, setTiles] = useState(null);
    const [activeTile, setActiveTile] = useState(null)
    const [isAnimationActive, setIsAnimationActive] = useState(false)
    const mapRef = useRef();
    const intervalRef = useRef();
    const timeStampRef = useRef();

    
    function toggleAnimateRadar() {
        //first toggle the animation status - this is queued so the code below will run before this is updated
        setIsAnimationActive(prev => !prev)
        //find the index of the active tile or set it to 0;
        let activeTileIndex = activeTile? tiles.timeStampArray.indexOf(activeTile.timeStamp) : 0;
        //if the animation is NOT active (aka it is paused) play the animation
        if (!isAnimationActive) {
            intervalRef.current = setInterval(() => {
                tiles.tilesArray[activeTileIndex].setOpacity(0);
                //if the active tile is the last in the array, set the new activeTileIndex to 0, else increment by 1
                activeTileIndex = activeTileIndex === tiles.tilesArray.length - 1 ? 0 : activeTileIndex + 1;
                tiles.tilesArray[activeTileIndex].setOpacity(1);
                setActiveTile({tile: tiles.tilesArray[activeTileIndex], timeStamp: tiles.timeStampArray[activeTileIndex]})
            }, 1000)
        }
        //if the animation is active pause the animation
        else {
            clearInterval(intervalRef.current)
            setActiveTile({tile: tiles.tilesArray[activeTileIndex], timeStamp: tiles.timeStampArray[activeTileIndex]})
        }
    }

    function stepForwards(){
        let activeTileIndex = activeTile? tiles.timeStampArray.indexOf(activeTile.timeStamp) : 0;
        tiles.tilesArray[activeTileIndex].setOpacity(0);
        activeTileIndex = activeTileIndex === tiles.tilesArray.length - 1 ? 0 : activeTileIndex + 1;
        tiles.tilesArray[activeTileIndex].setOpacity(1);
        setActiveTile({tile: tiles.tilesArray[activeTileIndex], timeStamp: tiles.timeStampArray[activeTileIndex]})
    }
    
    function stepBackwards(){
        let activeTileIndex = activeTile? tiles.timeStampArray.indexOf(activeTile.timeStamp) : 0;
        tiles.tilesArray[activeTileIndex].setOpacity(0);
        activeTileIndex = activeTileIndex === 0 ? tiles.tilesArray.length - 1 : activeTileIndex - 1;
        tiles.tilesArray[activeTileIndex].setOpacity(1);
        setActiveTile({tile: tiles.tilesArray[activeTileIndex], timeStamp: tiles.timeStampArray[activeTileIndex]})
    }


    useEffect(() => {
        const buildMap = async () => {
            const newMap = new window.google.maps.Map(mapRef.current, {
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
            let timeStampArray = [];
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
                timeStampArray.push(currentTime);
                j++
            }
            tilesArray = newMap.overlayMapTypes[Object.keys(newMap.overlayMapTypes)[0]];
            tilesArray[j - 1].setOpacity(1);
            setTiles({ tilesArray, timeStampArray })
            setMyMap(newMap)
        }
        buildMap()
    }, []);

    useEffect(() => {
        if (tiles) {
            setActiveTile({ tile: tiles.tilesArray[tiles.tilesArray.length - 1], timeStamp: tiles.timeStampArray[tiles.timeStampArray.length - 1] })
        }
    }, [tiles])


    return (
        <div className={`${styles["map__container"]}`}>
            <div className={`${styles["map"]}`} ref={mapRef} id="map"></div>
            <div className={`${styles["radar-info"]}`}>
                {activeTile &&
                    <>{`${formatDateTime(activeTile.timeStamp).fullDate} ${formatDateTime(activeTile.timeStamp).time} ${formatDateTime(activeTile.timeStamp).amPm}`}</>
                }
            </div>
            <div className={`${styles["radar-controls"]}`}>
                {!isAnimationActive &&
                    <button onClick={stepBackwards}><FontAwesomeIcon icon={faBackwardStep} size="xl" /></button>
                }
                <button onClick={() => {
                    toggleAnimateRadar()
                }}>
                    {!isAnimationActive ?
                        <FontAwesomeIcon icon={faPlay} size="xl" />
                        :
                        <FontAwesomeIcon icon={faPause} size="xl" />

                    }
                </button>
                {!isAnimationActive &&
                    <button onClick={stepForwards}><FontAwesomeIcon icon={faForwardStep} size="xl" /></button>
                }
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