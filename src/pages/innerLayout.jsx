//Components
import { NavLink, Outlet, useLocation } from "react-router-dom"
//Hooks
import { createContext, useEffect, useState } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { formatUSGSDateTimeQueryString } from "../utils/formatDateTime";
import { updateRiverGaugeObj } from "../utils/updateRiverGaugeObj";
//Styles
import styles from "../styles/innerLayout.module.scss"
//Contexts
export const RiverContext = createContext();
export const RiverDataWithGaugeInfoContext = createContext();

//Inner layout controls the data fetched from the rivers database, as well as the gauge data fetched from USGS
//Additionally it combines these into one object correlating the gauge data to the rivers
//If any of the above steps fail, set the gaugeFetchAndMergeStatus to error
export default function InnerLayout() {
    const [riverData, setRiverData] = useState(null);
    const [riverDataStatus, setRiverDataStatus] = useState('pending') ///pending, success or error - for fetching of river data
    const [gaugeData, setGaugeData] = useState(null);
    const [mergedRiverData, setMergedRiverData] = useState(null);
    const [gaugeFetchAndMergeStatus, setGaugeFetchAndMergeStatus] = useState("pending") //pending, success or error - for fetching and merging of guage data
    let curPath = useLocation();

    useEffect(() => {
        async function fetchRiverInfo() {
            try {
                let riverInfoURL = `${process.env.REACT_APP_SERVER}/creekvt_flows/levels/riverData`
                let riversDBResponse = await fetch(riverInfoURL)
                if (riversDBResponse.status < 200 || riversDBResponse.status > 299) {
                    throw new Error(`River data fetch error to url: ${riverInfoURL}`)
                }
                let riversDBData = await riversDBResponse.json();
                setRiverData(riversDBData);
            } catch (error) {
                console.log(`There was an error fetching gauge data: ${error}`)
                setGaugeFetchAndMergeStatus('error')
                setRiverDataStatus('error')
            }
        }
        fetchRiverInfo();
    }, [])


    useEffect(() => {
        async function fetchGauges() {
            try {
                let formattedToday = formatUSGSDateTimeQueryString();
                let usgsURL = 'https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&sites=01142500,04296280,04296000,01153000,04296500,01138500,04287000,04283500,01133000,01139800,01140817,01170100,04292810,04294500,04294620,04295500,04292500,04292000,04282795,04282780,04282650,04288295,04289000,04288000,04292750,04294000,04293500,04293000,01134500,04282525,04285800,04285500,01151500,01150900,04282000,04282500,04282576,01135500,04294300,01135150,04280000,04288230,04294140,01154000,01135300,04288225,01334000,04288500,01139000,01155500,01144000,01153550,04284751,04286000,04290500,04285000&parameterCd=00060' + formattedToday;
                let usgsResponse = await fetch(usgsURL);
                if (usgsResponse.status < 200 || usgsResponse.status > 299) {
                    throw new Error(`Gauge data fetch error to url: ${usgsURL}`)
                }
                let usgsData = await usgsResponse.json();
                setGaugeData(usgsData.value.timeSeries)
            } catch (error) {
                console.log(`There was an error fetching gauge data: ${error}`)
                setGaugeFetchAndMergeStatus('error')
            }
        }
        fetchGauges();
    }, [])

    useEffect(() => {
        if (riverData) { setRiverDataStatus("success") }
        if (riverData && gaugeData && !mergedRiverData) {setMergedRiverData(updateRiverGaugeObj(riverData, gaugeData)) }
        if (mergedRiverData) {setTimeout(() => setGaugeFetchAndMergeStatus('success'), 2000); }
    }, [riverData, gaugeData, mergedRiverData])

    return (
        <div className={`${styles['page-wrapper']}`}>
            <div className={`${styles['nav-container']}`}>
                <nav>
                    <ul>
                        <li className={curPath.pathname.slice(-1) === "/" ? `${styles['active']}` : ""}>
                            <NavLink to="./"><FontAwesomeIcon icon={faHouse} /></NavLink>
                        </li>
                        <li className={curPath.pathname.includes('gauges') ? `${styles['active']}` : ""}>
                            <NavLink to="./gauges">Gauges</NavLink>
                            {/* <NavLink to="./gauges"><FontAwesomeIcon icon={faRulerVertical} /></NavLink> */}
                        </li>
                        <li className={curPath.pathname.includes('visuals') ? `${styles['active']}` : ""}>
                            <NavLink to="./visuals">Visuals</NavLink>
                        </li>
                        <li className={curPath.pathname.includes('cams') ? `${styles['active']}` : ""}>
                            <NavLink to="./cams">Cams</NavLink>
                        </li>
                        {/* <li className={curPath.pathname.includes('rain') ? `${styles['active']}` : ""}>
                            <NavLink to="./rain">Rain</NavLink>
                        </li> */}
                        <li className={curPath.pathname.includes('forecasts') ? `${styles['active']}` : ""}>
                            <NavLink to="./forecasts">Forecasts</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <RiverDataWithGaugeInfoContext.Provider value={{ mergedRiverData, gaugeFetchAndMergeStatus }}>
                <RiverContext.Provider value={{ riverData, riverDataStatus }}>
                    <div className={`${styles['content-container']}`}>
                        <Outlet />
                    </div>
                </RiverContext.Provider>
            </RiverDataWithGaugeInfoContext.Provider>
        </div>
    )
}