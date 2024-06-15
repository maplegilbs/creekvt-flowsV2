//Components
import Loader from "../components/loader"
import ForecastQPF from "../components/forecastsQPF"
//Hooks

//Styles
import styles from "./forecasts.module.scss"
import ForecastText from "../components/forecastsText"

export default function Forecasts() {
    return (
        <div className={`${styles["page__container"]}`}>
            {/* <Loader bottom_text={"Loading Forecasts"} type={"rain"}/> */}
            <ForecastText />
            <ForecastQPF />
        </div>
    )
}