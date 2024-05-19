//Components
import Loader from "../components/loader";
//Hooks
import { useEffect, useState } from "react";
//Libraries
import { formatDateTime } from "../utils/formatDateTime";
import { trend, trendIcon } from "../utils/trendFunctions";

export default function Gauges() {
    const [status, setStatus] = useState('pending'); //pending, success, error
    const [gaugeData, setGaugeData] = useState(null);
    const [riverData, setRiverData] = useState(null);

    useEffect(() => {
        async function fetchGauges() {
            try {
                let today = formatDateTime(new Date());
                let startMonth = today.month;
                let startDay = today.day - 1;
                if (startDay === 0) {
                    if (startMonth === 3) {
                        startDay = 28;
                        startMonth = today.month - 1;
                    }
                    else {
                        startDay = 30;
                        startMonth = today.month - 1;
                    }
                }
                let formattedToday = `&startDT=${today.year}-${startMonth}-${startDay}&endDT=${today.year}-${today.month}-${today.day}`
                let usgsURL = 'https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&sites=01142500,04296280,04296000,01153000,04296500,01138500,04287000,04283500,01133000,01139800,01140817,01170100,04292810,04294500,04294620,04295500,04292500,04292000,04282795,04282780,04282650,04288295,04289000,04288000,04292750,04294000,04293500,04293000,01134500,04282525,04285800,04285500,01151500,01150900,04282000,04282500,04282576,01135500,04294300,01135150,04280000,04288230,04294140,01154000,01135300,04288225,01334000,04288500,01139000,01155500,01144000,01153550,04284751,04286000,04290500,04285000&parameterCd=00060' + formattedToday;
                let usgsResponse = await fetch(usgsURL);
                if (usgsResponse.status < 200 || usgsResponse.status > 299) {
                    throw new Error(`Gauge data fetch error to url: ${usgsURL}`)
                }
                let usgsData = await usgsResponse.json();
                console.log(formattedToday, usgsData)
                let riverInfoURL = 'http://localhost:3001/creekvt_flows/riverData'
                let riversDBResponse = await fetch(riverInfoURL)
                if (riversDBResponse.status < 200 || riversDBResponse.status > 299) {
                    throw new Error(`River data fetch error to url: ${riverInfoURL}`)
                }
                let riversDBData = await riversDBResponse.json();
                setRiverData(riversDBData);
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
            setRiverData(prev => {
                let updatedData = prev;
                console.log(updatedData)
                updatedData.forEach(river => {
                    if (river.gauge1ID) {
                        let gauge1 = gaugeData.find(gauge => gauge.sourceInfo.siteCode[0].value == river.gauge1ID);
                        let gauge1Values = gauge1.values[0].value;
                        if (gauge1Values && gauge1Values.length > 1) {
                            let valueCount = gauge1Values.length - 1;
                            river.gauge1Reading = gauge1Values[valueCount].value;
                            river.gauge1DateTime = gauge1Values[valueCount].dateTime;
                            let currentTime = new Date(river.gauge1DateTime);
                            let priorLevel
                            let changePerHr;
                            for (let j = 0; j < 20; j++) {
                                let priorTime = gauge1Values[valueCount - j].dateTime;
                                priorTime = new Date(priorTime);
                                let elapsed = currentTime - priorTime;
                                if (elapsed >= 3600000) {
                                    priorLevel = gauge1Values[valueCount - j].value;
                                    changePerHr = (river.gauge1Reading - priorLevel) / (elapsed / 3600000);
                                    changePerHr = Math.round(changePerHr);
                                    river.gauge1ChangePerHr = changePerHr;
                                    river.gauge1Trend = trend(river.gauge1Reading, priorLevel);
                                    j = 20;
                                }
                            }
                        }
                        else {
                            river.gauge1Reading = null;
                            river.gauge1DateTime = null;
                            river.gauge1ChangePerHr = null;
                            river.gauge1Trend = null;
                        }
                    }
                    if (river.gauge2ID) {
                        let gauge2 = gaugeData.find(gauge => gauge.sourceInfo.siteCode[0].value == river.gauge2ID);
                        let gauge2Values = gauge2.values[0].value;
                        if (gauge2Values && gauge2Values.length > 1) {
                            let valueCount = gauge2Values.length - 1;
                            river.gauge2Reading = gauge2Values[valueCount].value;
                            river.gauge2DateTime = gauge2Values[valueCount].dateTime;
                            let currentTime = new Date(river.gauge2DateTime);
                            let priorLevel
                            let changePerHr;
                            for (let j = 0; j < 20; j++) {
                                let priorTime = gauge2Values[valueCount - j].dateTime;
                                priorTime = new Date(priorTime);
                                let elapsed = currentTime - priorTime;
                                if (elapsed >= 3600000) {
                                    priorLevel = gauge2Values[valueCount - j].value;
                                    changePerHr = (river.gauge2Reading - priorLevel) / (elapsed / 3600000);
                                    changePerHr = Math.round(changePerHr);
                                    river.gauge2ChangePerHr = changePerHr;
                                    river.gauge2Trend = trend(river.gauge2Reading, priorLevel);
                                    j = 20;
                                }
                            }
                        }
                        else {
                            river.gauge2Reading = null;
                            river.gauge2DateTime = null;
                            river.gauge2ChangePerHr = null;
                            river.gauge2Trend = null;
                        }
                    }
                })
                return updatedData;
            })
        }

        setTimeout(() => setStatus('success'), 2000);
    }, [riverData, gaugeData])

    return (
        <>
            {status === "success" &&
                <div>
                    {riverData.length > 0 ? riverData.map(river => <p>{river.name}</p>) : "No rivers"}
                </div>
            }
            {status === "pending" &&
                <div>
                    <Loader bottom_text={"Loading Gauges"} />
                </div>
            }
            {status === "error" &&
                <div>
                    <Loader bottom_text={"Loading Gauges ERROR"} />
                </div>
            }
        </>
    )
}