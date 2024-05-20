//

//take in the rivers object (target) that was pulled from the database and merge with each river's corresponding gauge information
//return a copy of the object with the updated information
function setCurMinMax(riverObj) {
    if (riverObj.gauge1Trend === 'rising') {
        riverObj.gauge1Max = riverObj.gauge1RisingMax;
        riverObj.gauge1Min = riverObj.gauge1RisingMin;
    }
    else if (riverObj.gauge1Trend === 'falling') {
        riverObj.gauge1Max = riverObj.gauge1FallingMax;
        riverObj.gauge1Min = riverObj.gauge1FallingMin;
    }
    else {
        riverObj.gauge1Max = riverObj.gauge1SteadyMax;
        riverObj.gauge1Min = riverObj.gauge1SteadyMin;
    }
}

function setLevelInfo(riverObj) {
    if (!riverObj.gauge1Max || !riverObj.gauge1Min) {
        riverObj.levelStatus = null;
        riverObj.flowBarColor = null;
        riverObj.flowBarPercent = null;
    }
    else if (riverObj.gauge1Reading > riverObj.gauge1Max) {
        riverObj.levelStatus = "too high";
        riverObj.flowBarColor = 'red';
        riverObj.flowBarPercent = 100;
    }
    else if (riverObj.gauge1Reading > riverObj.gauge1Min) {
        riverObj.levelStatus = "running"
        // riverObj.flowBarColor = 'green';
        riverObj.flowBarColor = 'rgba(100,155,100,.75)';
        riverObj.flowBarPercent = Math.round((riverObj.gauge1Reading - riverObj.gauge1Min) / (riverObj.gauge1Max - riverObj.gauge1Min) * 100);
    }
    else if (riverObj.gauge1Reading < riverObj.gauge1Min) {
        riverObj.levelStatus = "too low"
        // riverObj.flowBarColor = '#ffa500';
        riverObj.flowBarColor = 'rgba(225,170,35,.6)';
        riverObj.flowBarPercent = Math.round((riverObj.gauge1Reading / riverObj.gauge1Min) * 100);
    }
}

//input current and prior levels as numeric values-> return "rising, falling or steady"
function trend(current, prior) {
    let currentTrend;
    let trendPercent = (current - prior) / prior;
    switch (true) {
        case trendPercent > .05:
            currentTrend = "rising";
            break;
        case trendPercent < -.05:
            currentTrend = "falling";
            break;
        default:
            currentTrend = "steady";
            break;
    }
    return currentTrend;
};

export function updateRiverGaugeObj(riverInfo, gaugesInfo) {
    //using the spread syntax on the riverData to allow us to copy it and update
    let updatedData = [...riverInfo].map(river => {
        let riverCopy = { ...river }
        if (riverCopy.gauge1ID) { //if the river has a primary gauge proceed - no need to handle if it doesn't this is handled in the riverFlowRow component
            let gauge1 = gaugesInfo.find(gauge => gauge.sourceInfo.siteCode[0].value == riverCopy.gauge1ID);
            //if there is not a corresponding gauge found in the USGS data set, set gauge1ID to null for error handling in riverFlowRow component
            if (!gauge1) { console.log(riverCopy.name); riverCopy.gauge1ID = "error" }
            else {
                let gauge1Values = gauge1.values[0].value;
                //if the usgs data has values for the gauge proceed
                if (gauge1Values && gauge1Values.length > 1) {
                    let valueCount = gauge1Values.length - 1;
                    riverCopy.gauge1Reading = gauge1Values[valueCount].value;
                    riverCopy.gauge1DateTime = gauge1Values[valueCount].dateTime;
                    let currentTime = new Date(riverCopy.gauge1DateTime);
                    for (let j = 0; j < 20; j++) {
                        let priorTime = new Date(gauge1Values[valueCount - j].dateTime);
                        let elapsed = currentTime - priorTime;
                        if (elapsed >= 3600000) {
                            let priorLevel = gauge1Values[valueCount - j].value;
                            riverCopy.gauge1ChangePerHr = Math.round((riverCopy.gauge1Reading - priorLevel) / (elapsed / 3600000));;
                            riverCopy.gauge1Trend = trend(riverCopy.gauge1Reading, priorLevel);
                            j = 20;
                        }
                    }
                    setCurMinMax(riverCopy)
                    setLevelInfo(riverCopy)
                }
                else {
                    riverCopy.gauge1Reading = null;
                    riverCopy.gauge1DateTime = null;
                    riverCopy.gauge1ChangePerHr = null;
                    riverCopy.gauge1Trend = null;
                }
            }
        }
        console.log(riverCopy)
        return riverCopy;
    });
    return updatedData;
}