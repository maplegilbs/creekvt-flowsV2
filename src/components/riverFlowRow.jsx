//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./riverFlowRow.module.scss"

export default function RiverFlowRow({ river, index }) {

    console.log(index)

    if (!river.gauge1ID || river.gauge1ID === 'error') {
        return (
            <tr className={`${styles["flow__table-row"]}`}>
                <td className={`${styles["river-stats"]}`}><a href={`https://creekvt.com/riverguide/${river.url}`}>{river.name}</a>
                    <p className={`${styles["stats"]}`}>Class: {river.difficultyChar}</p>
                    <p className={`${styles["stats"]}`}>Quality: {river.quality}</p>
                </td>
                <td className={`${styles["level"]}`}>
                    {!river.gauge1ID ? "" : "Gauge Error"}
                </td>
                <td className={`${styles["mobile-hide"]}`}> - <hr /> -</td>
                <td className={`${styles["gaugeName"]} ${styles["mobile-hide"]}`}>{!river.gauge1ID ? "No gauge" : river.gauge1Name}</td>
                <td className={`${styles["updateTime"]} ${styles["mobile-hide"]}`}></td>
                <td className={`${styles["gaugeName"]} ${styles["mobile-show"]}`}></td>
            </tr>
        )
    }
    else {
        let gauge1FormattedTime = `${formatDateTime(new Date(river.gauge1DateTime)).dow}, ${formatDateTime(new Date(river.gauge1DateTime)).date} @ ${formatDateTime(new Date(river.gauge1DateTime)).time} ${formatDateTime(new Date(river.gauge1DateTime)).amPm}`;
        return (
            <>
                <tr className={`${styles["flow__table-row"]}`} style={{ background: `linear-gradient(90deg, ${river.flowBarColor} ${river.flowBarPercent}%, ${index%2 === 1? "rgba(188,188,188,.25)" : "white"} ${river.flowBarPercent + 5}%` }}>
                    <td className={`${styles["river-stats"]}`} >
                        <a className={`${styles["river__heading"]}`} href={`https://creekvt.com/riverguide/${river.url}`}>{river.name}</a>
                        <p className={`${styles["stats"]}`}>Quality: {river.quality}</p>
                        <p className={`${styles["stats"]}`}>Class: {river.difficultyChar}</p>
                    </td>
                    <td className={`${styles["level"]}`}>
                        <div className={`${styles["levelContainer"]}` } style={{justifyContent: `${!river.gauge1Max ? "flex-start" : "space-between"}`}}>
                            <div className={`${styles["levelInfo"]}`}>{river.gauge1Reading}<span className={`${styles["mobile-show"]}`}><br /><br />{river.gauge1Max ? river.gauge1Max : "-"} <hr /> {river.gauge1Min ? river.gauge1Min : "-"}</span>
                            </div>
                            {river.gauge1Max &&
                                <div className={`${styles["flowBar"]}`} style={{ backgroundImage: `linear-gradient(0deg, ${river.flowBarColor ? river.flowBarColor : "grey"} ${river.flowBarPercent ? river.flowBarPercent + "%" : "0%"}, white 1%` }}>
                                    <span className={`${styles["curLvl"]}`}><div className={`${styles["top"]} ${styles["arrow"]} ${river.gauge1Trend ? styles[river.gauge1Trend] : ""}`}></div>{typeof river.gauge1ChangePerHr == 'number' ? river.gauge1ChangePerHr : ""}/hr<br /><div className={`${styles["bottom"]} ${styles["arrow"]} ${river.gauge1Trend ? styles[river.gauge1Trend] : ""}`}></div></span>
                                </div>
                            }

                        </div>
                    </td>
                    <td className={`${styles["mobile-hide"]}`}>{river.gauge1Max ? river.gauge1Max : "-"} <hr /> {river.gauge1Min ? river.gauge1Min : "-"}</td>
                    <td className={`${styles["gaugeName"]} ${styles["mobile-hide"]}`}><a href={`https://waterdata.usgs.gov/monitoring-location/${river.gauge1ID}`}>{river.gauge1Name}</a></td>
                    <td className={`${styles["updateTime"]} ${styles["mobile-hide"]}`}>{gauge1FormattedTime}</td>
                    <td className={`${styles["gaugeName"]} ${styles["mobile-show"]}`}>{river.gauge1Name}<br /><br />{gauge1FormattedTime}</td>
                </tr>
            </>
        )
    }
}

