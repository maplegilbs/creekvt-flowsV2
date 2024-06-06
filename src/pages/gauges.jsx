//Components
import Loader from "../components/loader";
import RiverFlowRow from "../components/riverFlowRow";
import GaugesSortBar from "../components/gaugesSortBar";
//Contexts
import { RiverContext } from "./innerLayout";
//Hooks
import { useContext, useEffect, useState } from "react";
//Libraries
import {formatUSGSDateTimeQueryString } from "../utils/formatDateTime";
import { sortByChange, sortByDifficulty, sortByLevel, sortByLocation, sortByQuality } from "../utils/sortingFunctions";
import { updateRiverGaugeObj } from "../utils/updateRiverGaugeObj";
//Styles
import styles from "./gauges.module.scss";

export default function Gauges() {
    const [status, setStatus] = useState('pending'); //pending, success, error
    const [gaugeData, setGaugeData] = useState(null);
    const riverData = useContext(RiverContext).riverData;
    const [updatedRiverData, setUpdatedRiverData] = useState(null);
    const [sortedBy, setSortedBy] = useState('riverName'); //riverName, curLevel, difficulty, location, quality
    const [sortedRiverData, setSortedRiverData] = useState(null);

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
                setStatus('error')
            }
        }
        fetchGauges();
    }, [])

    useEffect(() => {
        if (riverData && gaugeData) {
            let updatedData = updateRiverGaugeObj(riverData, gaugeData);
            setUpdatedRiverData(updatedData);
            setTimeout(() => setStatus('success'), 2000);
        }
    }, [riverData, gaugeData])

    useEffect(() => {
        if (updatedRiverData) {
            let tempSort = [...updatedRiverData];
            if (sortedBy === 'riverName') { tempSort.sort((a, b) => a.name > b.name ? 1 : -1) }
            if (sortedBy === 'curLevel') {sortByLevel(tempSort)}
            if (sortedBy === 'difficulty') {sortByDifficulty(tempSort)}
            if (sortedBy === 'location') {sortByLocation(tempSort)}
            if (sortedBy === 'quality') {sortByQuality(tempSort)}
            if (sortedBy === 'changePerHr') {sortByChange(tempSort)}
            setSortedRiverData(tempSort)
        }

    }, [updatedRiverData, sortedBy])






    return (
        <>
            {status === "success" &&
                <div className={`${styles["info__container"]}`}>
                    <GaugesSortBar setSortedBy={setSortedBy} />
                    <table className={`${styles["flows__table"]}`}>
                        <thead>
                            <tr>
                                <th>River</th>
                                <th>Discharge (CFS)
                                    <span className={`${styles["mobile-show"]}`}>
                                        <br />
                                        Max <hr />
                                        Min
                                    </span>
                                </th>
                                <th className={`${styles["mobile-hide"]} ${styles["header--small"]}`}>Maximum <hr /> Minimum</th>
                                <th className={`${styles["mobile-hide"]}`}>Gauge(s)</th>
                                <th className={`${styles["mobile-hide"]}`}>Gauge Updated</th>
                                <th className={`${styles["mobile-show"]} ${styles["gaugeInfo"]}`}>Gauge Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedRiverData && sortedRiverData.map((river, index) => {
                                return (
                                    Object.keys(river).includes("text") ?
                                        <tr className={`${styles["sort-header"]}`} style={{ background: `${river.color}` }}><td colSpan={"100%"}>{river.text}</td></tr> :
                                        <RiverFlowRow river={river} index={index} />
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                status === "pending" &&
                <div>
                    <Loader type={'rain'} bottom_text={"Loading Gauges"} />
                </div>
            }
            {
                status === "error" &&
                <div>
                    <Loader type={'rain'} bottom_text={"Loading Gauges ERROR"} />
                </div>
            }
        </>
    )
}