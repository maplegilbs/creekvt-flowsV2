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
                // let forecastResponse = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
                // let forecastResponse = await fetch(`https://api.weather.gov/gridpoints/BTV/104,36/forecast/hourly`);
                let forecastResponse = await fetch(`https://api.weather.gov/gridpoints/BTV/104,36/forecast`);
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