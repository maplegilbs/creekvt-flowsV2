//Styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./forecastsQPF.module.scss"

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function ForecastQPF() {
    return (
        <div className={`${styles["component__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <h2 className={`${styles["section__header"]}`}>Forecasted QPF</h2>
                <hr />
                <div id="initialQPF">
                    <h5>Three Day Quantitative Precipitation Forecast</h5>
                    <div style={{position: "relative"}} className={`${styles["primary__img"]}`}>
                    {/* !todo later add icon of position of selected river */}
                    {/* <div style={{position: "absolute", top: "calc(67% - .52rem)", left: "46%", filter: "drop-shadow(1px 1px black)", borderRadius: "5px", width: "max-content", fontWeight: "800", fontSize: "1.05rem"}}>&nbsp;<FontAwesomeIcon icon={faLocationDot} style={{color: "#ffffff",}} />&nbsp;</div> */}

                    </div>
                </div>
                <h5>Six Hour Quantitative Precipitation Forecasts</h5>
                <div className={`${styles["sixhr-imgs__container"]}`}>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_006a.png" target="blank"><div className={`${styles["sixhr__img"]}`}></div></a>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_006a.png" target="blank"><div className={`${styles["sixhr__img"]}`}></div></a>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_006a.png" target="blank"><div className={`${styles["sixhr__img"]}`}></div></a>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_006a.png" target="blank"><div className={`${styles["sixhr__img"]}`}></div></a>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_006a.png" target="blank"><div className={`${styles["sixhr__img"]}`}></div></a>
                    <a href="https://www.weather.gov/images/nerfc/ops/qpf_036a.png" target="blank"><div className={`${styles["sixhr__img"]}`}></div></a>
                </div>
                <br />
                <br />
            </div>
        </div>
    );
}