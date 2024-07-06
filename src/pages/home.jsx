//Components
import Slider_Toggler from "../components/toggler";
import HomeMap from "../components/dynamicMap";
//Contexts
import { RiverDataWithGaugeInfoContext } from "../pages/innerLayout";
//Hooks
import { useContext, useState, useEffect, useRef } from "react";
//Styles
import styles from "./home.module.scss"


export default function Home() {
    const [isMapToggled, setIsMapToggled] = useState(true)

    return (
        <>
            <div className={`${styles["page__container"]}`}>
                <div className={`${styles["inner__container"]}`}>
                    <header className={`${styles["section__header"]}`}>
                        <h2>What's Running?</h2>
                        <div className={`${styles["toggler__container"]}`}>
                            <label>Map</label>
                            <Slider_Toggler istoggled={!isMapToggled} setIsToggled={setIsMapToggled} />
                            <label>Table</label>
                        </div>
                    </header>
                    <hr />
                    <div className={`${styles["legend"]}`}>
                        <div className={`${styles["legend-item"]}`}>
                            <div className={`${styles["running-line"]}`}></div>
                            <p>Running</p>
                        </div>
                        <div className={`${styles["legend-item"]}`}>
                            <div className={`${styles["high-line"]}`}></div>
                            <p>Too High</p>
                        </div>
                        <div className={`${styles["legend-item"]}`}>
                            <div className={`${styles["low-line"]}`}></div>
                            <p>Too Low</p>
                        </div>
                    </div>
                    <div className={`${styles["inner__container-card"]} ${!isMapToggled ? styles["map-flipped"] : ""}`}>
                        <HomeMap />
                    </div>
                </div>
            </div>
        </>
    )
}