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
                center: { lat: 44, lng: -72.55 },
                zoom: 7.75,
                isFractionalZoomEnabled: true,
                mapTypeId: "terrain",
                streetViewControl: false,
                mapTypeControl: false,
                styles: [{
                    "featureType": "poi",
                    // "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "weight": .35,
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    featureType: 'administrative.province',
                    elementType: 'geometry.stroke',
                    stylers: [
                        { color: '#333333' },
                        { weight: 2 }
                    ]
                },
                {
                    featureType: 'administrative.country',
                    elementType: 'geometry.stroke',
                    stylers: [
                        { color: '#333333' },
                        { weight: 2 }
                    ]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry.fill',
                    stylers: [
                    //   { color: '#0088ff' } // Set your desired water fill color
                      { color: '#4682b4' } // Set your desired water fill color
                    ]
                  }
                ]
            });

            let riverResposne = await fetch("https://creekvt.com/FlowsPageAssets/all_rivers_colorless.geojson")
            let riverJSON = await riverResposne.json();
            await newMap.data.addGeoJson(riverJSON)
            newMap.data.forEach(river => river.setProperty("Cool?", "yes"))
            newMap.data.setStyle(function (feature) {
                // if (feature.Fg["Class"].match(/^V[\+\-]?$/)) {
                // if (feature.Fg["Class"].match(/^IV[\+\-]?$/)) {
                if (feature.Fg["Class"].match(/^III[\+\-]?$/)) {
                    return {
                        // strokeColor: '#222299',
                        strokeColor: '#009922',
                        strokeWeight: 7,
                        strokeOpacity: 1
                    }
                }
                else {
                    return {
                        strokeColor: '#996633',
                        strokeWeight: 3.25,
                        strokeOpacity: .85
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