//Contexts
import { RiverDataWithGaugeInfoContext } from "../pages/innerLayout";
//Google maps
import { Wrapper } from "@googlemaps/react-wrapper";
//Hooks
import { useContext, useState, useEffect, useRef } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Libraries
import { primaryMapStyles } from "../utils/mapStylingOptions";
//Styles
import styles from "./dynamicMap.module.scss"
import { updateRiverGaugeObj } from "../utils/updateRiverGaugeObj";

function MyMapComponent({ selectedMapLocation }) {
    const riverDataWithGaugeInfo = useContext(RiverDataWithGaugeInfoContext).updatedRiverData;
    const [myMap, setMyMap] = useState();
    const mapRef = useRef();

    console.log(riverDataWithGaugeInfo)


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
                let foundRiver = riverDataWithGaugeInfo.find(compareRiver => {
                    console.log(river.getProperty("Name"), compareRiver.name)
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
        if (riverDataWithGaugeInfo) { buildMap() }
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