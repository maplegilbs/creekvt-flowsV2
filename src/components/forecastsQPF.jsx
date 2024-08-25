//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
//Styles
import styles from "./forecastsQPF.module.scss"


let origin = [49.04158309692921, -80.76598887821596]
let range = [9.07210460887345, 16.35092424172126]

export default function ForecastQPF({ selectedLocation }) {
    let offset, offsetPercentage;
    if (selectedLocation) {
        offset = [origin[0] - selectedLocation[0], Math.abs(origin[1] - selectedLocation[1])]
        offsetPercentage = [offset[0] / range[0], offset[1] / range[1]]
    }
    return (
        <div className={`${styles["component__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <h2 className={`${styles["section__header"]}`}>Forecasted QPF</h2>
                <hr />
                <div id="initialQPF">
                    <h5>Three Day Quantitative Precipitation Forecast</h5>
                    <div className={`${styles["primary__img"]}`}>
                        {selectedLocation &&
                            <div className={`${styles["map-marker"]}`} style={{ top: `calc(${Math.round(offsetPercentage[0] * 100)}% - 14px)`, left: `calc(${Math.round(offsetPercentage[1] * 100)}% - 12px)` }}>&nbsp;<FontAwesomeIcon icon={faLocationDot} style={{ color: "#ffffff", }} />&nbsp;</div>
                        }

                    </div>
                </div>
                <h5>Six Hour Quantitative Precipitation Forecasts</h5>
                <div className={`${styles["sixhr-imgs__container"]}`}>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_006a.png" target="blank"><div className={`${styles["sixhr__img"]}`}>                        {selectedLocation &&
                        <div className={`${styles["map-marker"]}`} style={{ top: `calc(${Math.round(offsetPercentage[0] * 100)}% - 14px)`, left: `calc(${Math.round(offsetPercentage[1] * 100)}% - 12px)` }}>&nbsp;<FontAwesomeIcon icon={faLocationDot} style={{ color: "#ffffff", }} />&nbsp;</div>
                    }
                    </div></a>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_006a.png" target="blank"><div className={`${styles["sixhr__img"]}`}>                        {selectedLocation &&
                        <div className={`${styles["map-marker"]}`} style={{ top: `calc(${Math.round(offsetPercentage[0] * 100)}% - 14px)`, left: `calc(${Math.round(offsetPercentage[1] * 100)}% - 12px)` }}>&nbsp;<FontAwesomeIcon icon={faLocationDot} style={{ color: "#ffffff", }} />&nbsp;</div>
                    }
                    </div></a>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_006a.png" target="blank"><div className={`${styles["sixhr__img"]}`}>                        {selectedLocation &&
                        <div className={`${styles["map-marker"]}`} style={{ top: `calc(${Math.round(offsetPercentage[0] * 100)}% - 14px)`, left: `calc(${Math.round(offsetPercentage[1] * 100)}% - 12px)` }}>&nbsp;<FontAwesomeIcon icon={faLocationDot} style={{ color: "#ffffff", }} />&nbsp;</div>
                    }
                    </div></a>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_006a.png" target="blank"><div className={`${styles["sixhr__img"]}`}>                        {selectedLocation &&
                        <div className={`${styles["map-marker"]}`} style={{ top: `calc(${Math.round(offsetPercentage[0] * 100)}% - 14px)`, left: `calc(${Math.round(offsetPercentage[1] * 100)}% - 12px)` }}>&nbsp;<FontAwesomeIcon icon={faLocationDot} style={{ color: "#ffffff", }} />&nbsp;</div>
                    }
                    </div></a>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_006a.png" target="blank"><div className={`${styles["sixhr__img"]}`}>                        {selectedLocation &&
                        <div className={`${styles["map-marker"]}`} style={{ top: `calc(${Math.round(offsetPercentage[0] * 100)}% - 14px)`, left: `calc(${Math.round(offsetPercentage[1] * 100)}% - 12px)` }}>&nbsp;<FontAwesomeIcon icon={faLocationDot} style={{ color: "#ffffff", }} />&nbsp;</div>
                    }
                    </div></a>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_036a.png" target="blank"><div className={`${styles["sixhr__img"]}`}>                        {selectedLocation &&
                        <div className={`${styles["map-marker"]}`} style={{ top: `calc(${Math.round(offsetPercentage[0] * 100)}% - 14px)`, left: `calc(${Math.round(offsetPercentage[1] * 100)}% - 12px)` }}>&nbsp;<FontAwesomeIcon icon={faLocationDot} style={{ color: "#ffffff", }} />&nbsp;</div>
                    }
                    </div></a>
                </div>
                <br />
                <br />
            </div>
        </div>
    );
}