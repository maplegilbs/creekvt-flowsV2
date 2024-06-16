//Components
import Loader from "./loader"
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
        // getForecastData();
    }, [selectedLocation])

    return (
        <div className={`${styles["component__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <h2 className={`${styles["section__header"]}`}>Forecast</h2>
                <hr />
                {status === 'pending' &&
                <Loader bottom_text={"Getting forecast data"} type={"spinner"}/>
                }
                {status === 'success' &&
                    <div className={`${styles["current-weather__container"]}`}>
                    </div>
                }
                {status === 'failure' &&
                    <div>Error</div>
                }
            </div>
        </div>
    )
}