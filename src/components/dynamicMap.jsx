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
    const mapRef = useRef();

    console.log(myMap)


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

            let riverResposne = await fetch("https://creekvt.com/FlowsPageAssets/all_rivers_colorless.geojson")
            let riverJSON = await riverResposne.json();
            await newMap.data.addGeoJson(riverJSON)
            newMap.data.forEach(river => river.setProperty("Cool?", "yes"))
            newMap.data.setStyle(function (feature) {
                if (feature.Fg["Class"] === "IV") {
                    return {
                        strokeColor: 'blue',
                        strokeWeight: 3
                    }
                }
                else {
                    return {
                        strokeColor: 'black',
                        strokeWeight: 1,
                        strokeOpacity: .65
                    }
                }
            })
            newMap.data.forEach(river => console.log(river))
            setMyMap(newMap)
        }
        buildMap()
    }, []);



    return (
        <div className={`${styles["inner__container"]}`}>
            <h2 className={`${styles["section__header"]}`}>Test Map</h2>
            <hr />
            <div className={`${styles["map__container"]}`}>

                <div className={`${styles["map"]}`} ref={mapRef} id="map"></div>
            </div>
        </div>
    )
}


export default function TestMap() {

    return (
        <div className={`${styles["component__container"]}`}>
            <Wrapper apiKey={"AIzaSyBBtqHKDrsiMp-7ldVkI6QEMoxjzggJ-J8"}>
                <MyMapComponent />
            </Wrapper>
        </div>
    )
}