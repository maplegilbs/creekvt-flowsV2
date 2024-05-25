import { formatUSGSDateTimeQueryString } from "./formatDateTime";
import { trend } from "./updateRiverGaugeObj";


//getting current date time and turning it into an sql formatted date time
export function jsDatToSQLDate() {
    let date = new Date();
    date = date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2) + 'T' + ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2);
    return date;
}


function findMatchedReadingIndex(gaugeReadings, reportTime) {
    console.log(gaugeReadings, reportTime)
    // binary search for nearest date
    let range = [0, gaugeReadings.length - 1];
    let midIndex = Math.round(gaugeReadings.length / 2);
    while (range[0] !== range[1]) {
        if ((new Date(gaugeReadings[midIndex].dateTime) - reportTime) == 0) {
            return midIndex;
        }
        //if the min and max are consecutive numbers or the same, find which of the two has the closer reading time and return that index
        if ((range[1] - range[0]) <= 1) {
            return Math.abs(new Date(gaugeReadings[range[0]].dateTime) - reportTime) >= Math.abs(new Date(gaugeReadings[range[1]].dateTime) - reportTime) ?
                range[1] :
                range[0];
        }
        //if the tripDateTime is greater (more recent) than the midIndex move the minIndex (range[0]) to be the midIndex and search again
        if (new Date(gaugeReadings[midIndex].dateTime) < reportTime) {
            range[0] = midIndex;
            midIndex = Math.floor((range[0] + range[1]) / 2)
        }
        //if the tripDateTime is less (older) than the midIndex move the maxIndex (range[1]) to be the midIndex and search again
        else if (new Date(gaugeReadings[midIndex].dateTime) > reportTime) {
            range[1] = midIndex;
            midIndex = Math.ceil((range[0] + range[1]) / 2)
        }
        else { return null }
    }


}

// input array of gaugeIds ordered by gauge1, gauge2
// return gauge1Name, gauge1ReadingTime, gauge1Level, gauge1HourlyChange, gauge1Trend (repeat for gauge2)
// export async function fetchGaugeDataForLevelReport(gauge1ID=null, gauge2ID=null){
export async function fetchGaugeDataForLevelReport(gaugeList, tripDateTime, riverData) {
    console.log(riverData)
    let gaugeData = {};
    if (gaugeList.length > 0) {
        try {
            let usgsDate = formatUSGSDateTimeQueryString(new Date(tripDateTime));
            let usgsURL = `https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&sites=${gaugeList.join(",")}&parameterCd=00060` + usgsDate;
            let usgsResponse = await fetch(usgsURL);
            if (usgsResponse.status < 200 || usgsResponse.status > 299) { throw new Error(`Gauge data fetch error to url: ${usgsURL}`) }
            let usgsData = await usgsResponse.json();
            gaugeList.forEach((gauge, index) => {
                let matchedGauge = usgsData.value.timeSeries.find(usgsGauge => usgsGauge.sourceInfo.siteCode[0].value == gauge);
                let gaugeNum = gauge == riverData['gauge1ID'] ? 'gauge1' : 'gauge2';
                if (matchedGauge) {
                    let gaugeReadings = matchedGauge.values[0].value;
                    let matchedIndex = findMatchedReadingIndex(gaugeReadings, new Date(tripDateTime));
                    if (matchedIndex !== null) {
                        let currentReadingTime = gaugeReadings[matchedIndex].dateTime;
                        let currentLevel = gaugeReadings[matchedIndex].value;
                        gaugeData[`${gaugeNum}Name`] = matchedGauge.sourceInfo.siteName;
                        gaugeData[`${gaugeNum}ReadingTime`] = currentReadingTime;
                        gaugeData[`${gaugeNum}Level`] = currentLevel;
                        if (gaugeReadings.length > 0) {
                            // let valueCount = gaugeReadings.length - 1;
                            let currentTime = new Date(currentReadingTime);
                            for (let j = 0; j < 20; j++) {
                                let priorTime = new Date(gaugeReadings[matchedIndex - j].dateTime);
                                let elapsed = currentTime - priorTime;
                                if (elapsed >= 3600000) {
                                    let priorLevel = gaugeReadings[matchedIndex - j].value;
                                    gaugeData[`${gaugeNum}HourlyChange`] = Math.round((currentLevel - priorLevel) / (elapsed / 3600000));
                                    gaugeData[`${gaugeNum}Trend`] = trend(currentLevel, priorLevel);
                                    j = 20;
                                }
                            }
                        }
                    }
                }
                else {
                    throw new Error(`A matching gauge could not be found for gaugeID ${gauge}`)
                }
                console.log(gaugeData)
            });
        } catch (error) {
            console.error(`There was an error fetching gauge data: ${error}`)
            return gaugeData;
        }
    }
    return gaugeData;
}