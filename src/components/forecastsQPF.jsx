//Styles
import styles from "./forecastsQPF.module.scss"

export default function ForecastQPF() {
    return (
        <div className={`${styles["component__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <h2 className={`${styles["section__header"]}`}>Forecasted QPF</h2>
                <hr />
                <div id="initialQPF">
                    <h5>Three Day Quantitative Precipitation Forecast</h5>
                    <div className={`${styles["primary__img"]}`}></div>
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