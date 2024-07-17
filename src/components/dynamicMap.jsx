//Compontents
import Loader from "./loader";
//Contexts
import { RiverDataWithGaugeInfoContext } from "../pages/innerLayout";
//Google maps
import { Wrapper } from "@googlemaps/react-wrapper";
//Hooks
import { useContext, useState, useEffect, useRef } from "react";
//Libraries
import { primaryMapStyles } from "../utils/mapStylingOptions";
//Styles
import styles from "./dynamicMap.module.scss"
import renderInfoWindow from "./mapInfoWindow";

function MapComponent({ }) {
    const { gaugeFetchAndMergeStatus, mergedRiverData } = useContext(RiverDataWithGaugeInfoContext);
    const [myMap, setMyMap] = useState();
    const mapRef = useRef();

    console.log(mergedRiverData)

    useEffect(() => {
        const buildMap = async () => {
            const newMap = new window.google.maps.Map(mapRef.current, {
                zoom: 7.75,
                isFractionalZoomEnabled: true,
                mapTypeId: "terrain",
                streetViewControl: false,
                mapTypeControl: false,
                styles: primaryMapStyles
            });

            let riverResponse = await fetch("https://creekvt.com/FlowsPageAssets/all_rivers_colorless.geojson")
            let riverJSON = await riverResponse.json();
            await newMap.data.addGeoJson(riverJSON)
            newMap.data.forEach(river => { river.setProperty("z-index", 0) })
            const southWest = { lat: 42.72283693380878, lng: -73.31855248696228 }
            const northEast = { lat: 45.02480931272919, lng: -71.65120773372199 }
            const bounds = new window.google.maps.LatLngBounds(southWest, northEast)

            let riverResponse2 = await fetch("https://creekvt.com/FlowsPageAssets/all_rivers_colorless.geojson")
            let riverJSON2 = await riverResponse2.json();
            await newMap.data.addGeoJson(riverJSON2)
            newMap.data.forEach(river => {
                let foundRiver = mergedRiverData.find(compareRiver => {
                    return compareRiver.name === river.getProperty("Name")
                })
                if (foundRiver) {
                    let levelStatus = foundRiver.levelStatus
                    river.setProperty("Level status", levelStatus)
                }
            })
            let openInfoWindow;
            newMap.data.addListener('click', (event) => {
                let river = event.feature.getProperty("Name");
                let foundRiver = mergedRiverData.find(compareRiver => compareRiver.name.toLowerCase() === river.toLowerCase());
                openInfoWindow = new window.google.maps.InfoWindow({
                    position: event.latLng,
                    headerDisabled: true
                })
                openInfoWindow.setContent(renderInfoWindow(foundRiver, openInfoWindow));
                openInfoWindow.open(newMap)
            })
            // newMap.data.addListener('mouseout', (event)=>{openInfoWindow.close(newMap)})
            newMap.data.setStyle(function (feature) {
                // if (feature.Fg["Class"].match(/^V[\+\-]?$/)) {
                // if (feature.Fg["Class"].match(/^IV[\+\-]?$/)) {
                // if (feature.Fg["Class"].match(/^III[\+\-]?$/)) {
                if (["running", "too high"].includes(feature.Fg["Level status"]) && feature.Fg["z-index"] === 0) {
                    return {
                        strokeColor: '#000000',
                        strokeWeight: 6.5,
                        strokeOpacity: 1
                    }
                }
                if ((feature.Fg["Level status"] === "too low" || !feature.Fg["Level status"]) && feature.Fg["z-index"] === 0) {
                    return {
                        strokeColor: '#000000',
                        strokeWeight: 4.5,
                        strokeOpacity: 1
                    }
                }
                if (feature.Fg["Level status"] === "running" && feature.Fg["z-index"] !== 0) {
                    return {
                        strokeColor: '#00cc33',
                        strokeWeight: 4.5,
                        strokeOpacity: 1
                    }
                }
                else if (feature.Fg["Level status"] === "too high" && feature.Fg["z-index"] !== 0) {
                    return {
                        strokeColor: '#ff0033',
                        strokeWeight: 3.5,
                        strokeOpacity: .85
                    }
                }
                else if (feature.Fg["Level status"] === "too low") {
                    return {
                        strokeColor: '#cc8855',
                        strokeWeight: 1.5,
                        strokeOpacity: 1
                    }
                }
                else {
                    return {
                        strokeColor: '#888888',
                        strokeWeight: 1.5,
                        strokeOpacity: .85
                    }
                }
            })
            newMap.fitBounds(bounds)
            setMyMap(newMap)
        }
        if (mergedRiverData) { console.log('building map'); buildMap() }
    }, [mergedRiverData]);



    return (
        <>
            {gaugeFetchAndMergeStatus !== "error" &&
                <div className={`${styles["map__container"]}`}>
                    {!mergedRiverData && <Loader type="spinner" loader_text="Loading Map & Gauge Info" />}
                    {mergedRiverData &&
                        <>
                            <div className={`${styles["map"]}`} ref={mapRef} id="map">
                            </div>
                            <div className={`${styles["legend"]}`}>
                                <div className={`${styles["legend-item"]}`}>
                                    <div className={`${styles["running-line"]}`}></div>
                                    <p>Running</p>
                                </div>
                                <div className={`${styles["legend-item"]}`}>
                                    <div className={`${styles["high-line"]}`}></div>
                                    <p>Too High</p>
                                </div>
                                <div className={`${styles["legend-item"]}`}>
                                    <div className={`${styles["low-line"]}`}></div>
                                    <p>Too Low</p>
                                </div>
                            </div>
                        </>
                    }
                </div>
            }
            {gaugeFetchAndMergeStatus === "error" &&
                <p>Error Building Map</p>
            }
        </>
    )
}


export default function HomeMap() {

    return (
        <div className={`${styles["component__container"]}`}>
            <Wrapper apiKey={"AIzaSyBBtqHKDrsiMp-7ldVkI6QEMoxjzggJ-J8"}>
                <MapComponent />
            </Wrapper>
        </div>
    )
}