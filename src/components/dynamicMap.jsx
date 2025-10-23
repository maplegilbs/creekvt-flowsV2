//Compontents
import Loader from "./loader";
import renderInfoWindow from "./mapInfoWindow";
//Contexts
import { RiverDataWithGaugeInfoContext } from "../pages/innerLayout";
//Google maps
import { Wrapper } from "@googlemaps/react-wrapper";
//Hooks
import { useContext, useState, useEffect, useRef } from "react";
//Libraries
import { primaryMapStyles } from "../utils/mapStylingOptions";
import { fetchGaugeDataForMapGauges } from "../utils/levelFetchingFunctions";
//Styles
import styles from "./dynamicMap.module.scss"




function MapComponent({ featureOpts }) {
    const { gaugeFetchAndMergeStatus, mergedRiverData } = useContext(RiverDataWithGaugeInfoContext);
    const [myMap, setMyMap] = useState(null);
    const [dataLayers, setDataLayers] = useState({ baseRivers: null, overlayRivers: null, cams: null, gauges: null })
    const mapRef = useRef();


    //setting up basemap and displaying to page
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
            const southWest = { lat: 42.72283693380878, lng: -73.31855248696228 }
            const northEast = { lat: 45.02480931272919, lng: -71.65120773372199 }
            const bounds = new window.google.maps.LatLngBounds(southWest, northEast)
            newMap.fitBounds(bounds)
            setMyMap(newMap)
        }
        if (mapRef.current && !myMap) buildMap()
    }, [mapRef.current]);

    //use effect to add a rivers data layer and set it in the dataLayers state variable
    useEffect(() => {
        if (myMap && mergedRiverData) {
            async function displayRivers() {
                let riverResponse = await fetch("https://creekvt.com/FlowsPageAssets/all_rivers_colorless.geojson")
                let riverJSON = await riverResponse.json();
                let baseRiversDataLayer = new window.google.maps.Data();
                baseRiversDataLayer.addGeoJson(riverJSON)
                console.log(baseRiversDataLayer)
                baseRiversDataLayer.forEach(river => {
                    let foundRiver = mergedRiverData.find(compareRiver => compareRiver.name === river.getProperty("Name"))
                    if (foundRiver) { river.setProperty("Level status", foundRiver.levelStatus) }
                })
                baseRiversDataLayer.setStyle(function (feature) {
                    if (["running", "too high"].includes(feature.Dg["Level status"])) {
                        return { strokeColor: '#000000', strokeWeight: 7.5, zIndex: 0 }
                    }
                    if ((feature.Dg["Level status"] === "too low" || !feature.Dg["Level status"])) {
                        return { strokeColor: '#000000', strokeWeight: 4.5, zIndex: 0 }
                    }
                })
                let openInfoWindow;
                baseRiversDataLayer.addListener('click', (event) => {
                    let river = event.feature.getProperty("Name");
                    let foundRiver = mergedRiverData.find(compareRiver => compareRiver.name.toLowerCase() === river.toLowerCase());
                    openInfoWindow = new window.google.maps.InfoWindow({
                        position: event.latLng,
                        headerDisabled: true
                    })
                    openInfoWindow.setContent(renderInfoWindow(foundRiver, openInfoWindow));
                    openInfoWindow.open(myMap)
                })
                let overlayRiversDataLayer = new window.google.maps.Data();
                overlayRiversDataLayer.addGeoJson(riverJSON)
                overlayRiversDataLayer.forEach(river => {
                    let foundRiver = mergedRiverData.find(compareRiver => compareRiver.name === river.getProperty("Name"))
                    if (foundRiver) { river.setProperty("Level status", foundRiver.levelStatus) }
                })
                overlayRiversDataLayer.setStyle(function (feature) {
                    if (feature.Dg["Level status"] === "running") {
                        return { strokeColor: '#00bb33', strokeWeight: 4.5, zIndex: 2 }
                    }
                    else if (feature.Dg["Level status"] === "too high") {
                        return { strokeColor: '#ff0033', strokeWeight: 3.5, zIndex: 2 }
                    }
                    else if (feature.Dg["Level status"] === "too low") {
                        return { strokeColor: '#cc8855', strokeWeight: 1.5, zIndex: 2 }
                    }
                    else {
                        return { strokeColor: '#888888', strokeWeight: 1.5, zIndex: 2 }
                    }
                })
                // let openInfoWindow;
                overlayRiversDataLayer.addListener('click', (event) => {
                    let river = event.feature.getProperty("Name");
                    let foundRiver = mergedRiverData.find(compareRiver => compareRiver.name.toLowerCase() === river.toLowerCase());
                    openInfoWindow = new window.google.maps.InfoWindow({
                        position: event.latLng,
                        headerDisabled: true
                    })
                    openInfoWindow.setContent(renderInfoWindow(foundRiver, openInfoWindow));
                    openInfoWindow.open(myMap)
                })
                setDataLayers(prev => { return { ...prev, baseRivers: baseRiversDataLayer, overlayRivers: overlayRiversDataLayer } })
            }
            displayRivers()
        }
    }, [mergedRiverData, myMap])


    //use effect to add a cameras data layer and set it in the dataLayers state variable
    useEffect(() => {
        if (myMap) {
            async function displayCams() {
                let camsResponse = await fetch("https://creekvt.com/FlowsPageAssets/cams.geojson")
                let camsJSON = await camsResponse.json();
                let camsDataLayer = new window.google.maps.Data();
                camsDataLayer.addGeoJson(camsJSON)

                camsDataLayer.setStyle(feature => {
                    if (feature.Dg.type === 'cam') {
                        return {
                            icon: {
                                url: "https://creekvt.com/FlowsPageAssets/Images/Icons/CameraCircleIconBlue100x100.png",
                                scaledSize: new window.google.maps.Size(25, 25)
                            }
                        }
                    }
                })
                camsDataLayer.addListener('click', event => {
                    let openInfoWindow;
                    openInfoWindow = new window.google.maps.InfoWindow({
                        position: event.latLng,
                        headerDisabled: true
                    })
                    let camName = event.feature.getProperty("Name");
                    let camApiEndpoint = event.feature.getProperty("api-endpoint");
                    let type = "cam";
                    openInfoWindow.setContent(renderInfoWindow({ camName, camApiEndpoint, type }, openInfoWindow))
                    openInfoWindow.open(myMap)
                })
                setDataLayers(prev => { return { ...prev, cams: camsDataLayer } })
            }
            displayCams()
        }
    }, [myMap])


    //use effect to add a gauges data layer and set it in the dataLayers state variable
    useEffect(() => {
        if (myMap) {
            async function displayGauges() {
                let gaugesDataLayer = new window.google.maps.Data();
                let gaugeGeoJSONInfo = null;
                try {
                    let gaugeGeoJsonResponse = await fetch(`${process.env.REACT_APP_SERVER}/creekvt_flows/gauges/geoJSON`)
                    gaugeGeoJSONInfo = await gaugeGeoJsonResponse.json()
                } catch (error) {
                    console.error(error)
                    gaugeGeoJSONInfo = null
                }
                if (gaugeGeoJSONInfo) {
                    gaugesDataLayer.addGeoJson(gaugeGeoJSONInfo)
                    gaugesDataLayer.setStyle(feature => {
                        return {
                            icon: {
                                path: window.google.maps.SymbolPath.CIRCLE,
                                scale: 4,
                                fillColor: '#335533',
                                fillOpacity: 1,
                                strokeColor: '#000000',
                                strokeWeight: 1
                            }

                        }
                    })
                    let gaugeInfo;
                    try {
                        let gaugeResponse = await fetch(`${process.env.REACT_APP_SERVER}/creekvt_flows/gauges/gaugesInclRivers`)
                        let gaugeList = await gaugeResponse.json()
                        gaugeInfo = await fetchGaugeDataForMapGauges(gaugeList.map(gauge => gauge.usgsID))
                        for (let gaugeID in gaugeInfo) {
                            let riversList = gaugeList.find(gauge => gauge.usgsID === gaugeID).rivers? gaugeList.find(gauge => gauge.usgsID === gaugeID).rivers.split(",") : null;
                            gaugeInfo[gaugeID].rivers = riversList
                        }
                    } catch (error) {
                        console.error(error)
                    }

                    gaugesDataLayer.addListener('click', event => {
                        let openInfoWindow;
                        openInfoWindow = new window.google.maps.InfoWindow({
                            position: event.latLng,
                            headerDisabled: true
                        })
                        let gaugeName = event.feature.getProperty("name");
                        let gaugeID = event.feature.getProperty("ID")
                        let type = "gauge";
                        openInfoWindow.setContent(renderInfoWindow({ gaugeID, gaugeName, type, gaugeInfo, mergedRiverData }, openInfoWindow))
                        openInfoWindow.open(myMap)
                    })
                    setDataLayers(prev => { return { ...prev, gauges: gaugesDataLayer } })
                }
            }
            displayGauges()
        }
    }, [myMap, mergedRiverData])


    //use effect to handle the updating of displayed layers based on the featureOpts property set by the parent home map component (in this file)
    useEffect(() => {
        async function updateDataLayersShown() {
            if (featureOpts.rivers && dataLayers.baseRivers && dataLayers.overlayRivers && !dataLayers.baseRivers.getMap()) {
                dataLayers.baseRivers.setMap(myMap);
                dataLayers.overlayRivers.setMap(myMap);
            }
            if (!featureOpts.rivers && dataLayers.baseRivers) {
                dataLayers.baseRivers.setMap(null);
                dataLayers.overlayRivers.setMap(null);
            }
            if (featureOpts.cams && dataLayers.cams && !dataLayers.cams.getMap()) {
                dataLayers.cams.setMap(myMap);
            }
            if (!featureOpts.cams && dataLayers.cams) {
                dataLayers.cams.setMap(null);
            }
            if (featureOpts.gauges && dataLayers.gauges && !dataLayers.gauges.getMap()) {
                dataLayers.gauges.setMap(myMap);
            }
            if (!featureOpts.gauges && dataLayers.gauges) {
                dataLayers.gauges.setMap(null);
            }
        }
        updateDataLayersShown()
    }, [featureOpts, dataLayers])

    return (
        <>
            {gaugeFetchAndMergeStatus !== "error" &&
                <div className={`${styles["map__container"]}`}>
                    {!mergedRiverData && <Loader type="spinner" loader_text="Loading Map & Gauge Info" />}
                    {/* {mergedRiverData && */}
                    <div style={{ display: `${mergedRiverData ? 'block' : 'none'}` }}>
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
                    </div>
                    {/* } */}
                </div>
            }
            {gaugeFetchAndMergeStatus === "error" &&
                <p>Error Building Map</p>
            }
        </>
    )
}


export default function HomeMap() {
    const [featureOpts, setFeatureOpts] = useState({ rivers: true, cams: false, gauges: false })
    const componentContainerRef = useRef()

    useEffect(() => { setTimeout(() => componentContainerRef.current.scrollIntoView({ block: "end", behavior: "smooth" }), 500) }, [componentContainerRef])

    function handleOptsChange(event) {
        setFeatureOpts(prev => {
            let updatedOpts = { ...prev, [event.target.name]: event.target.checked }
            return updatedOpts
        })
    }
    return (
        <div ref={componentContainerRef} className={`${styles["component__container"]}`}>
            <div className={`${styles["features-options"]}`}>
                <h4>Data Layers</h4>
                <div className={`${styles["input-group__container"]}`}>
                    <div className={`${styles["input-group"]}`}>
                        <label htmlFor="rivers">Rivers</label>
                        <input className={`${styles["checkbox"]}`} type="checkbox" id="rivers" name="rivers" checked={featureOpts.rivers} onChange={handleOptsChange} />
                    </div>
                    <div className={`${styles["input-group"]}`}>
                        <label htmlFor="cams">Cameras</label>
                        <input className={`${styles["checkbox"]}`} type="checkbox" id="cams" name="cams" checked={featureOpts.cams} onChange={handleOptsChange} />
                    </div>
                    <div className={`${styles["input-group"]}`}>
                        <label htmlFor="gauges">Gauges </label>
                        <input className={`${styles["checkbox"]}`} type="checkbox" id="gaugess" name="gauges" onChange={handleOptsChange} />
                    </div>
                </div>
            </div>
            <Wrapper apiKey={"AIzaSyBBtqHKDrsiMp-7ldVkI6QEMoxjzggJ-J8"}>
                <MapComponent featureOpts={featureOpts} />
            </Wrapper>
        </div>
    )
}