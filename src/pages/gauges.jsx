//Components
import Loader from "../components/loader";
import RiverFlowRow from "../components/riverFlowRow";
import GaugesSortBar from "../components/gaugesSortBar";
//Contexts
import { RiverContext } from "./innerLayout";
import { RiverDataWithGaugeInfoContext } from "./innerLayout";
//Hooks
import { useContext, useEffect, useState } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
//Libraries
import { formatUSGSDateTimeQueryString } from "../utils/formatDateTime";
import { sortByChange, sortByDifficulty, sortByLevel, sortByLocation, sortByQuality } from "../utils/sortingFunctions";
import { updateRiverGaugeObj } from "../utils/updateRiverGaugeObj";
//Styles
import styles from "./gauges.module.scss";

function GaugeInstructions({setIsModalActive}) {
    return (
        <div className={`${styles["gauge-instructions__modal"]}`}>
            <h3 onClick={()=>setIsModalActive(false)}>Close &nbsp;<FontAwesomeIcon icon={faCircleXmark} size="xl" /></h3>
            <a href="https://creekvt.com/FlowsPageAssets/Images/GaugePageRef.jpg"><img src="https://creekvt.com/FlowsPageAssets/Images/GaugePageRef.jpg" alt="Image showing how to read the flows table information" /></a>
        </div>
    )
}

export default function Gauges() {
    const riverData = useContext(RiverContext).riverData;
    const updatedRiverData = useContext(RiverDataWithGaugeInfoContext).updatedRiverData;
    const status = useContext(RiverDataWithGaugeInfoContext).status;
    const [sortedBy, setSortedBy] = useState('curLevel'); //riverName, curLevel, difficulty, location, quality
    const [sortedRiverData, setSortedRiverData] = useState(null);
    const [isModalActive, setIsModalActive] = useState(false)
    

    useEffect(() => {
        if (updatedRiverData) {
            let tempSort = [...updatedRiverData];
            if (sortedBy === 'riverName') { tempSort.sort((a, b) => a.name > b.name ? 1 : -1) }
            if (sortedBy === 'curLevel') { sortByLevel(tempSort) }
            if (sortedBy === 'difficulty') { sortByDifficulty(tempSort) }
            if (sortedBy === 'location') { sortByLocation(tempSort) }
            if (sortedBy === 'quality') { sortByQuality(tempSort) }
            if (sortedBy === 'changePerHr') { sortByChange(tempSort) }
            setSortedRiverData(tempSort)
        }

    }, [updatedRiverData, sortedBy])



    return (
        <>
            {isModalActive &&
                <GaugeInstructions setIsModalActive={setIsModalActive}/>
            }
            {status === "success" &&
                <div className={`${styles["info__container"]}`}>
                    <GaugesSortBar setSortedBy={setSortedBy} setIsModalActive={setIsModalActive} />
                    {sortedBy === 'changePerHr' &&
                        <p>Trend is determined by the % change over the past hour. A river whos gauge registers an <em>increase</em> in flow &gt; 5% is considered "rising", whereas a river whos gauge registers a <em>decrease</em> in flow of &gt; 5% will be considered "falling".  All others will be considered "steady"</p>
                    }
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
                            {sortedRiverData && sortedRiverData.map((river, index) => {
                                return (
                                    Object.keys(river).includes("text") ?
                                        <tr className={`${styles["sort-header"]}`} style={{ background: `${river.color}` }}><td colSpan={"100%"}>{river.text}</td></tr> :
                                        <RiverFlowRow river={river} index={index} />
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                status === "pending" &&
                <div>
                    <Loader type={'rain'} bottom_text={"Loading Gauges"} />
                </div>
            }
            {
                status === "error" &&
                <div>
                    <Loader type={'rain'} bottom_text={"Loading Gauges ERROR"} />
                </div>
            }
        </>
    )
}