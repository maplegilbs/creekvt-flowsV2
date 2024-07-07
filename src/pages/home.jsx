//Components
import Slider_Toggler from "../components/toggler";
import HomeMap from "../components/dynamicMap";
//Contexts
import { RiverDataWithGaugeInfoContext } from "../pages/innerLayout";
//Hooks
import { useContext, useState, useEffect, useRef } from "react";
//Styles
import styles from "./home.module.scss"
import HomeGaugesTable from "../components/homeGaugeTable";


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
                    <div className={`${styles["card__container"]}`}>
                        <div className={`${styles["inner__container-card"]} ${styles["map__container"]} ${!isMapToggled ? styles["map-flipped"] : ""}`}>
                            <HomeMap />
                        </div>
                        <div className={`${styles["inner__container-card"]} ${styles["table__container"]} ${!isMapToggled ? styles["table-flipped"] : ""}`}>
                            <HomeGaugesTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}