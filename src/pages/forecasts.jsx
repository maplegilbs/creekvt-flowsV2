//Components
import Loader from "../components/loader"
import ForecastQPF from "../components/forecastsQPF"
//Hooks

//Styles
import styles from "./forecasts.module.scss"

export default function Forecasts() {
    return (
        <div className={`${styles["page__container"]}`}>
            {/* <Loader bottom_text={"Loading Forecasts"} type={"rain"}/> */}
            <ForecastQPF />
        </div>
    )
}