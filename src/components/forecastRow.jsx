//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTemperatureThreeQuarters, faDroplet } from "@fortawesome/free-solid-svg-icons"
//Styles
import styles from "./forecastRow.module.scss"

export default function ForecastRow({ periodData }) {
    console.log(Number(periodData.probabilityOfPrecipitation.value) > 10)
    return (
        <>
            <div className={`${styles["forecast-row"]}`}>
                <h3 className={`${styles["row__heading"]}`}>{periodData.name}</h3>
                <p className={`${styles["row__sub-heading"]}`}>{periodData.shortForecast}</p>
                <p className={`${styles["row__sub-heading"]}`}><FontAwesomeIcon icon={faTemperatureThreeQuarters} size="lg" /> {periodData.isDaytime ? "High" : "Low"} {periodData.temperature}&deg; &nbsp;&nbsp;|&nbsp;&nbsp; <FontAwesomeIcon icon={faDroplet} /> Precip: <span style={Number(periodData.probabilityOfPrecipitation.value) > 50? {fontWeight:  "700", color: "rgb(70,165,180)"}: {}}>{periodData.probabilityOfPrecipitation.value ? periodData.probabilityOfPrecipitation.value : 0}%</span></p>
                <div className={`${styles["row-inner__container"]} ${styles["icon__container"]}`}>
                    <img src={periodData.icon} />
                </div>
                <div className={`${styles["row-inner__container"]} ${styles["text__container"]}`}>
                    <p>{periodData.detailedForecast}</p>
                </div>
            </div>
        </>
    )
}