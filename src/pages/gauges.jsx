//Components
import Loader from "../components/loader";
//Hooks
import { useEffect, useState } from "react";
//Libraries
import { formatDateTime } from "../utils/formatDateTime";

export default function Gauges() {
    const [status, setStatus] = useState('pending'); //pending, success, error

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
                let formattedToday = `&startDT=${today.year}-${startMonth}-${startDay}&endDT=${today.year}-${today.month}-${today.day - 1}`
                let url = 'https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&sites=01142500,04296280,04296000,01153000,04296500,01138500,04287000,04283500,01133000,01139800,01140817,01170100,04292810,04294500,04294620,04295500,04292500,04292000,04282795,04282780,04282650,04288295,04289000,04288000,04292750,04294000,04293500,04293000,01134500,04282525,04285800,04285500,01151500,01150900,04282000,04282500,04282576,01135500,04294300,01135150,04280000,04288230,04294140,01154000,01135300,04288225,01334000,04288500,01139000,01155500,01144000,01153550,04284751,04286000,04290500,04285000&parameterCd=00060' + formattedToday;
                let guageResponse = await fetch(url);
                let gaugeData = await guageResponse.json();
                console.log(formattedToday, gaugeData)

            } catch (error) {
                console.log(`There was an error fetching gauge data: ${error}`)
                setStatus('error')
            }
        }
        fetchGauges();
    }, [])

    return (
        <div>
            <Loader bottom_text={"Loading Gauges"} />
        </div>
    )
}