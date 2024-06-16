//Hooks
import { useState, useEffect } from "react"
//Styles
import styles from "./forecastsQPF.module.scss"

export default function ForecastText() {
    const [status, setStatus] = useState('pending') //pending, success, failure
    const [forecastData, setForecastData] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    console.log(forecastData, status);

    useEffect(() => {
        let latitude = 43.989191392924575;
        let longitude = -72.86118841260061;
        async function getForecastData() {
            try {
                let forecastResponse = await fetch(`${process.env.REACT_APP_SERVER}/weather/forecast?source=openWeather&lat=43.9951&long=-72.8708`);
                let forecastJSON = await forecastResponse.json();
                setForecastData(forecastJSON)
                setStatus('success')
            } catch (error) {
                console.error(error)
                setStatus('failure')
            }
        }
        getForecastData();
    }, [selectedLocation])

    return (
        <div className={`${styles["component__container"]}`}>

        </div>
    )
}