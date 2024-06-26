//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTemperatureThreeQuarters, faDroplet } from "@fortawesome/free-solid-svg-icons"
//Styles
import styles from "./forecastRow.module.scss"

export default function ForecastRow({ periodData }) {
    return (
        <>
            <div className={`${styles["forecast-row"]}`}>
                <h3 className={`${styles["row__heading"]}`}>{periodData.name}</h3>
                <p className={`${styles["row__sub-heading"]}`}>{periodData.shortForecast}</p>
                <p className={`${styles["row__sub-heading"]}`}><FontAwesomeIcon icon={faTemperatureThreeQuarters} size="lg" /> {periodData.isDaytime ? "High" : "Low"} <span style={{fontWeight: "800"}}>{periodData.temperature}&deg;</span> &nbsp;&nbsp;<span className={`${styles["divider-hide"]}`}><br/><br/></span><span className={`${styles["divider-show"]}`}>|&nbsp;&nbsp;</span> <FontAwesomeIcon icon={faDroplet} /> Precip: <span style={Number(periodData.probabilityOfPrecipitation.value) > 50? {fontWeight:  "700", color: "rgb(50,125,140)"}: {}}>{periodData.probabilityOfPrecipitation.value ? periodData.probabilityOfPrecipitation.value : 0}%</span></p>
                <div className={`${styles["row-inner__container"]} ${styles["icon__container"]}`}>
                    <img src={periodData.icon.includes("https://api.weather.gov")? periodData.icon: `https://api.weather.gov/${periodData.icon}`} />
                </div>
                <div className={`${styles["row-inner__container"]} ${styles["text__container"]}`}>
                    <p>{periodData.detailedForecast}</p>
                </div>
            </div>
        </>
    )
}