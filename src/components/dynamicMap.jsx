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

function MapComponent({ }) {
    const { gaugeFetchAndMergeStatus, mergedRiverData } = useContext(RiverDataWithGaugeInfoContext);
    const [myMap, setMyMap] = useState();
    const mapRef = useRef();



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

            let riverResposne = await fetch("https://creekvt.com/FlowsPageAssets/all_rivers_colorless.geojson")
            let riverJSON = await riverResposne.json();
            await newMap.data.addGeoJson(riverJSON)
            newMap.data.forEach(river => {
                let foundRiver = mergedRiverData.find(compareRiver => {
                    return compareRiver.name === river.getProperty("Name")
                })
                if (foundRiver) {
                    let levelStatus = foundRiver.levelStatus
                    river.setProperty("Level status", levelStatus)
                }
            })
            newMap.data.setStyle(function (feature) {
                // if (feature.Fg["Class"].match(/^V[\+\-]?$/)) {
                // if (feature.Fg["Class"].match(/^IV[\+\-]?$/)) {
                // if (feature.Fg["Class"].match(/^III[\+\-]?$/)) {
                if (feature.Fg["Level status"] === "running") {
                    return {
                        strokeColor: '#008822',
                        strokeWeight: 5,
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
            const southWest = { lat: 42.72283693380878, lng: -73.31855248696228 }
            const northEast = { lat: 45.02480931272919, lng: -71.65120773372199 }
            const bounds = new window.google.maps.LatLngBounds(southWest, northEast)
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
                        <div className={`${styles["map"]}`} ref={mapRef} id="map"></div>
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