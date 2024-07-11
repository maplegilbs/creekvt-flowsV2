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
    const containerRef = useRef();
    const tableRef = useRef();
    const mapRef = useRef();
    const [containerHeight, setContainerHeight] = useState(0);


    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (tableRef.current && !isMapToggled) setContainerHeight(tableRef.current.offsetHeight)
            if (mapRef.current && isMapToggled) setContainerHeight(mapRef.current.offsetHeight)
        });
        if (tableRef.current && !isMapToggled) resizeObserver.observe(tableRef.current)
        if (mapRef.current && isMapToggled) resizeObserver.observe(mapRef.current)
        return () => {
            if (tableRef.current) resizeObserver.unobserve(tableRef.current)
            if (mapRef.current) resizeObserver.unobserve(mapRef.current)
        }
    }, [isMapToggled])

    useEffect(() => {
        if (containerRef.current) { containerRef.current.style.height = `${containerHeight + 20}px` }

    }, [containerHeight])

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
                    <div ref={containerRef} className={`${styles["card__container"]}`}>
                        <div ref={mapRef} className={`${styles["inner__container-card"]} ${styles["map__container"]} ${!isMapToggled ? styles["map-flipped"] : ""}`}>
                            <HomeMap />
                        </div>
                        <div ref={tableRef} className={`${styles["inner__container-card"]} ${styles["table__container"]} ${!isMapToggled ? styles["table-flipped"] : ""}`}>
                            <HomeGaugesTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}