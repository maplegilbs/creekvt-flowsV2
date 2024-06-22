//Components
import Loader from "./loader"
import ForecastRow from "./forecastRow"
//Contexts
import { RiverContext } from "../pages/innerLayout"
//Hooks
import { useState, useEffect } from "react"
//Libraries
import { formatDateTime } from "../utils/formatDateTime"
//Styles
import styles from "./forecastsText.module.scss"
//Testing Data
import { forecastPlaceHolder } from "../utils/placeholderData"
import pause from "../utils/pause"

function getTextDirection(degree) {
    const directions = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW'
    ];
    const index = Math.round(degree / 22.5) % 16;
    return directions[index];
}

export default function ForecastText({ status, setStatus, selectedLocation }) {
    const [forecastData, setForecastData] = useState(null);
    let currentData = null;

    if (forecastData && forecastData.current.data.properties) {
        currentData = forecastData.current.data.properties;
    }

    
    useEffect(() => {
        async function getWeatherData() {
            try {
                let pointResponse = await fetch(`https://api.weather.gov/points/${selectedLocation[0]},${selectedLocation[1]}`)
                let pointJSON = await pointResponse.json()
                let forecastURL = pointJSON.properties.forecast;
                let stationsURL = pointJSON.properties.observationStations;
                let forecastResponse = await fetch(forecastURL);
                if (forecastResponse.status < 199 || forecastResponse.status > 300) {
                    let i = 0;
                    while (i < 3) {
                        console.log('Retrying')
                        pause(1000)
                        forecastResponse = await fetch(forecastURL);
                        if (forecastResponse.status > 199 && forecastResponse.status < 300) i = 3;
                        i++
                    }
                    if (forecastResponse.status < 199 || forecastResponse.status > 300) {
                        throw new Error(`Fetch to ${forecastURL} failed.`)
                    }
                }
                let forecastJSON = await forecastResponse.json();
                let stationsResponse = await fetch(stationsURL)
                if (stationsResponse.status < 199 || stationsResponse.status > 300) {
                    throw new Error(`Fetch to ${stationsURL} failed.`)
                }
                let stationsJSON = await stationsResponse.json();
                let stationID = stationsJSON.features[0].properties.stationIdentifier;
                let obsURL = `https://api.weather.gov/stations/${stationID}/observations/latest`
                let currentObsResponse = await fetch(obsURL)
                if (currentObsResponse.status < 199 || currentObsResponse.status > 300) {
                    throw new Error(`Fetch to ${obsURL} failed.`)
                }
                let currentObsJSON = await currentObsResponse.json();
                let stationURL = `https://api.weather.gov/stations/${stationID}`
                let stationResponse = await fetch(stationURL)
                if (stationResponse.status < 199 || stationResponse.status > 300) {
                    throw new Error(`Fetch to ${stationURL} failed.`)
                }
                let currentStation = await stationResponse.json();
                setForecastData({ current: { station: currentStation.properties.name, data: currentObsJSON }, forecast: forecastJSON })
                setStatus('success')
            } catch (error) {
                console.error(error)
                setStatus('failure')
            }
        }
        if (selectedLocation) {
            setTimeout(() => getWeatherData(), 750);
        }
    }, [selectedLocation])

    return (
        <div className={`${styles["component__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <h2 className={`${styles["section__header"]}`}>Weather</h2>
                <hr />
                {status === 'pending' &&
                    <Loader bottom_text={"Getting forecast data"} type={"spinner"} />
                }
                {status === 'success' &&
                    <>
                        <div className={`${styles["current-weather__container"]}`}>
                            <h3 className={`${styles["weather__heading"]}`}>Current Conditions</h3>
                            <h3>Station: {forecastData.current.station}</h3>
                            <h3>{` ${formatDateTime(new Date(currentData.timestamp)).dow} ${formatDateTime(new Date(currentData.timestamp)).fullDate} @ ${formatDateTime(new Date(currentData.timestamp)).time} ${formatDateTime(new Date(currentData.timestamp)).amPm}`}</h3>
                            {currentData.icon &&
                                <img src={currentData.icon.includes("https://api.weather.gov/") ? currentData.icon : `https://api.weather.gov/${currentData.icon}`} />
                            }
                            <div className={`${styles["current-weather-details"]}`}>
                                <p>{currentData.textDescription}</p>
                                <p>{Math.round(Number(currentData.temperature.value) * 9 / 5 + 32)}&deg; F / {Math.round(Number(currentData.temperature.value))}&deg; C </p>
                                <p><span className={`${styles["detail-cat"]}`}>Winds:</span> {getTextDirection(currentData.windDirection.value) ? getTextDirection(currentData.windDirection.value) : ""} @ {Math.round(currentData.windSpeed.value / 1.6)} mph </p>
                                {currentData.barometricPressure.value &&
                                    <p><span className={`${styles["detail-cat"]}`}>Barometer:</span> {(Number(currentData.barometricPressure.value) * 0.00029530).toFixed(2)} in</p>
                                }
                            </div>
                        </div>
                        <div className={`${styles["forecast__container"]}`}>
                            <h3 className={`${styles["weather__heading"]}`}>Seven-Day Forecast</h3>
                            {forecastData.forecast.properties.periods.length > 0 &&
                                forecastData.forecast.properties.periods.map(periodData => <ForecastRow key={periodData.number} periodData={periodData} />)
                            }
                            <div className={`${styles["forecast-source"]}`}>
                                <img src={`https://creekvt.com/FlowsPageAssets/Images/NOAALogo1.png`} />
                                <p>All weather data courtesy of the National Weather Service / National Oceanic and Atmospheric Administration </p>
                            </div>
                        </div>
                    </>
                }
                {status === 'failure' &&
                    <>
                        <div>Error fetching forecast data, please try another river.</div>
                    </>
                }
            </div>
        </div>
    )
}