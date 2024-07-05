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
                center: { lat: 44, lng: -72.55 },
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
            setMyMap(newMap)
        }
        if (mergedRiverData) { console.log('building map'); buildMap() }
    }, [mergedRiverData]);



    return (
        <div className={`${styles["inner__container"]}`}>
            <h2 className={`${styles["section__header"]}`}>Test Map</h2>
            <hr />
            {gaugeFetchAndMergeStatus !== "error" &&
                <div className={`${styles["map__container"]}`}>
                    {!mergedRiverData && <Loader type="spinner" />}
                    {mergedRiverData &&
                        <div className={`${styles["map"]}`} ref={mapRef} id="map"></div>
                    }
                </div>
            }
            {gaugeFetchAndMergeStatus === "error" &&
                <p>Error Building Map</p>
            }
        </div>
    )
}


export default function TestMap() {

    return (
        <>
            <div className={`${styles["component__container"]}`}>
                <Wrapper apiKey={"AIzaSyBBtqHKDrsiMp-7ldVkI6QEMoxjzggJ-J8"}>
                    <MapComponent />
                </Wrapper>
            </div>
        </>
    )
}