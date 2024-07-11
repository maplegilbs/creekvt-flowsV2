//Components
import Loader from "../components/loader";
import RiverFlowRow from "../components/riverFlowRow";
import GaugesSortBar from "../components/gaugesSortBar";
//Contexts
import { RiverDataWithGaugeInfoContext } from "../pages/innerLayout";
//Hooks
import { useContext, useEffect, useState } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
//Libraries
import { sortByRunning } from "../utils/sortingFunctions";
//Styles
import styles from "../pages/gauges.module.scss";

function GaugeInstructions({ setIsModalActive }) {
    return (
        <div className={`${styles["gauge-instructions__modal"]}`}>
            <h3 onClick={() => setIsModalActive(false)}>Close &nbsp;<FontAwesomeIcon icon={faCircleXmark} size="xl" /></h3>
            <a href="https://creekvt.com/FlowsPageAssets/Images/GaugePageRef.jpg"><img src="https://creekvt.com/FlowsPageAssets/Images/GaugePageRef.jpg" alt="Image showing how to read the flows table information" /></a>
        </div>
    )
}

function filterGauges(river, index) {
    return (
        Object.keys(river).includes("text") ?
            <tr className={`${styles["sort-header"]}`} style={{ background: `${river.color}` }}><td colSpan={"100%"}>{river.text}</td></tr> :
            <RiverFlowRow river={river} index={index} />
    )
}

export default function HomeGaugesTable() {
    const { mergedRiverData, gaugeFetchAndMergeStatus } = useContext(RiverDataWithGaugeInfoContext);
    const [isModalActive, setIsModalActive] = useState(false)


    return (
        <>
            {isModalActive &&
                <GaugeInstructions setIsModalActive={setIsModalActive} />
            }
            {gaugeFetchAndMergeStatus === "success" &&
                <div className={`${styles["info__container"]}`}>
                    <table className={`${styles["flows__table"]}`}>
                        <thead>
                            <tr>
                                <th>River</th>
                                <th>Discharge (CFS)
                                    <span className={`${styles["mobile-show"]}`}>
                                        <br />
                                        Max <hr />
                                        Min
                                    </span>
                                </th>
                                <th className={`${styles["mobile-hide"]} ${styles["header--small"]}`}>Maximum <hr /> Minimum</th>
                                <th className={`${styles["mobile-hide"]}`}>Gauge(s)</th>
                                <th className={`${styles["mobile-hide"]}`}>Gauge Updated</th>
                                <th className={`${styles["mobile-show"]} ${styles["gaugeInfo"]}`}>Gauge Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mergedRiverData &&
                                sortByRunning(mergedRiverData).map(filterGauges)
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                gaugeFetchAndMergeStatus === "pending" &&
                <div>
                    <Loader type={'rain'} bottom_text={"Loading Gauges"} />
                </div>
            }
            {
                gaugeFetchAndMergeStatus === "error" &&
                <div>
                    <Loader type={'rain'} bottom_text={"Loading Gauges ERROR"} />
                </div>
            }
        </>
    )
}