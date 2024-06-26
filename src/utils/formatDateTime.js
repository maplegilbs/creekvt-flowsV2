//formattingTime for display with Current Conditions section

export function formatDateTime(inputTime) {
    inputTime = new Date(inputTime)
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    let dow = weekdays[inputTime.getDay()];
    let monthString = months[inputTime.getMonth()]
    let day = inputTime.getDate();
    let unPadDay = day;
    if (day < 10) { day = "0" + day.toString() }
    let month = inputTime.getMonth();
    month++
    let unPadMonth = month;
    if (month < 10) { month = "0" + month.toString() }
    let year = inputTime.getFullYear();
    let hour24 = inputTime.getHours() > 9 ? inputTime.getHours() : inputTime.getHours().toString().padStart(2, '0');
    let hour = inputTime.getHours();
    let amPM = "am";
    if (hour24 == 12) { amPM = "pm" }
    if (hour24 > 12) { hour = hour24 - 12; amPM = "pm" }
    let minute = inputTime.getMinutes();
    if (minute < 10) { minute = "0" + minute.toString() }
    return (
        {
            dow: dow,
            month: month,
            monthString: monthString,
            day: day,
            year: year,
            date: `${month}/${day}`,
            time: `${hour}:${minute}`,
            time24Hr: `${hour24}:${minute}`,
            amPm: amPM,
            numericDate: `${unPadMonth}/${unPadDay}/${year.toString().slice(2)}`,
            fullDate: `${monthString} ${day}, ${year}`,
            htmlDateTime: `${year}-${month}-${day}T${hour24}:${minute}`,
            htmlDate: `${year}-${month}-${day}`,
            inputTime: inputTime
        }
    )
}

export function convertTime(inputTime) {
    let date = new Date();
    date.setHours(inputTime.slice(0, 2))
    date.setMinutes(inputTime.slice(3, 5))
    let outputTime = `${formatDateTime(date).time} ${formatDateTime(date).amPm}`
    return outputTime;
}

export function convertTimeToCompare(inputTime) {
    let date = new Date();
    date.setHours(inputTime.slice(0, 2))
    date.setMinutes(inputTime.slice(3, 5))
    return date;
}

export function stringTimeToSeconds(timeString) {
    let timeArray = timeString.split(":").reverse()
    let timeInSeconds = timeArray.reduce((accum, value, index) => {
        let curValInSeconds = Number(value) * 60 ** index
        accum += curValInSeconds
        return accum
    }, 0)
    return timeInSeconds
}

export function formatUSGSDateTimeQueryString(dateTime = new Date()) {
    let today = formatDateTime(dateTime);
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
    return (`&startDT=${today.year}-${startMonth}-${startDay}&endDT=${today.year}-${today.month}-${today.day}`);
}

//Adjusting UTC time to EDT time - note this is only good for March through November (local times change at 2:00 a.m. EST to 3:00 a.m. EDT on the second Sunday in March, and return from 2:00 a.m. EDT to 1:00 a.m. EST on the first Sunday in November)
export function adjUTCtoEDT(timeToConvert){
    timeToConvert = new Date(timeToConvert)
    let currentHours = timeToConvert.getUTCHours();
    let hourDiff = 4;
    timeToConvert.setUTCHours(currentHours-hourDiff);
    return timeToConvert;
    }
    
    export function adjEDTtoUTC(timeToConvert){
    timeToConvert = new Date(timeToConvert)
    let currentHours = timeToConvert.getUTCHours();
    let hourDiff = 4;
    timeToConvert.setUTCHours(currentHours+hourDiff);
    return timeToConvert;
}