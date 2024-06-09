//Libraries
import { formatDateTime } from "./formatDateTime";

//Global variables

//Fetching function
async function getRainFallJSON(url) {
    try {
        let data = await fetch(url);
        data = await data.json();
        return data;
    } catch (error) {
        console.log(`There was an error fetching data from ${url}.  Error: ${error}`)
        return null;
    }
}

//returning color for rainfall total - prior colors commented out
const rainColors = function (rainfallTotal) {
    let color = "#ffffff";
    switch (true) {
        case rainfallTotal < 0.25:
            // color = "#ddd"; //'#699fd0';
            color = "#888";
            break;
        case rainfallTotal < .5:
            // color = "#3cb447";
            color = "rgb(80,140, 85)";
            break;
        case rainfallTotal < 1:
            // color = "#3cb447";
            color = "rgb(70,120,75)";
            break;
        case rainfallTotal < 2:
            // color = "#f6f63d";
            color = "rgb(250,225, 80)";
            break;
        case rainfallTotal < 2.5:
            // color = "#fbde88";
            color = "red";
            break;
        case rainfallTotal < 3:
            // color = "#f7ac3c";
            color = "rgb(250,175,50)";
            break;
        case rainfallTotal >= 3:
            // color = "#f73c3c";
            color = "rgb(220,50,50)";
            break;
    }
    return color;
};


/*--------USGS Section--------*/
/*----------------------------*/

//Create object containing an object for each station's accumulated rainfall for the past 1,3,6,12,24 hrs
function addUSGSStationsToRainDataObj(stationData) {
    let rainData = [];
    let stations = stationData["value"]["timeSeries"]
    for(let station of stations) {
        if(station.values[0].qualifier.find(qualifier => qualifier.qualifierCode.toLowerCase() === 'ssn')) continue;
        let parentObj = {};
        let dataObj = {};
        let stationName = station["sourceInfo"]["siteName"];
        let rainAccum = 0;
        let observations = station.values[0].value;
        let observationCount = observations.length;
        let currentDateTime = new Date(observations[observationCount - 1]["dateTime"]);
        parentObj["readingDateTime"] = `${formatDateTime(currentDateTime).dow} ${formatDateTime(currentDateTime).numericDate}, ${formatDateTime(currentDateTime).time} ${formatDateTime(currentDateTime).amPm} `;
        observations.reverse().forEach(observation => {
            let obsvDateTime = new Date(observation.dateTime);
            rainAccum += Number(observation.value);
            let timeDiff = (currentDateTime - obsvDateTime) / 3600000;
            switch (true) {
                case timeDiff <= 1:
                    if (Math.round(rainAccum * 100) / 100 < 0.01) { dataObj["1hr"] = 0; }
                    else { dataObj["1hr"] = (Math.round(rainAccum * 100) / 100).toFixed(2); }
                    dataObj["1hrColor"] = rainColors(dataObj["1hr"]);
                    break;
                case timeDiff <= 3:
                    if (Math.round(rainAccum * 100) / 100 < 0.01) { dataObj["3hr"] = 0; }
                    else { dataObj["3hr"] = (Math.round(rainAccum * 100) / 100).toFixed(2); }
                    dataObj["3hrColor"] = rainColors(dataObj["3hr"]);
                    break;
                case timeDiff <= 6:
                    if (Math.round(rainAccum * 100) / 100 < 0.01) { dataObj["6hr"] = 0; }
                    else { dataObj["6hr"] = (Math.round(rainAccum * 100) / 100).toFixed(2); }
                    dataObj["6hrColor"] = rainColors(dataObj["6hr"]);
                    break;
                case timeDiff <= 12:
                    if (Math.round(rainAccum * 100) / 100 < 0.01) { dataObj["12hr"] = 0; }
                    else { dataObj["12hr"] = (Math.round(rainAccum * 100) / 100).toFixed(2); }
                    dataObj["12hrColor"] = rainColors(dataObj["12hr"]);
                    break;
                case timeDiff <= 24:
                    if (Math.round(rainAccum * 100) / 100 < 0.01) { dataObj["24hr"] = 0; }
                    else { dataObj["24hr"] = (Math.round(rainAccum * 100) / 100).toFixed(2); }
                    dataObj["24hrColor"] = rainColors(dataObj["24hr"]);
                    break;
            }
        })
        parentObj.metadata = {};
        parentObj.metadata.stationName = stationName;
        parentObj.metadata.source = "usgs";
        parentObj.metadata.icon = "https://creekvt.com/FlowsPageAssets/Images/usgsLogo.png";
        parentObj.data = dataObj;
        rainData.push(parentObj)
    }
    return rainData;
}

//Build URL for USGS API call (single call for multiple stations)
function usgsAPIURL(stations) {
    let usgsSiteIds = stations.filter(station => station.source.toLowerCase() === 'usgs').map(station => station.id).join(",");
    console.log(usgsSiteIds)
    let url = `https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&sites=${usgsSiteIds}&parameterCd=00045&period=P2D`;
    return url;
}

//Final function calling other functions to make api calls and pass resulting data into object building functions to compile rainfall data
//Last call of function will bo the to the makeTable function to display data to the DOM
export async function compile(stations) {
    let usgsUrl = usgsAPIURL(stations);
    let usgsData = await getRainFallJSON(usgsUrl);
    console.log(usgsData)
    let rainData = await addUSGSStationsToRainDataObj(usgsData);
    console.log(rainData)
    return (rainData)
}
