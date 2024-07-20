//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./riverFlowRow.module.scss"

export default function RiverFlowRow({ river, index }) {

    if (!river.gauge1ID || river.gauge1ID === 'error') {
        return (
            <tr className={`${styles["flow__table-row"]}`}>
                <td className={`${styles["river-stats"]}`} >
                    <div className={`${styles["river__heading"]}`}><a href={`https://creekvt.com/riverguide/${river.url}`}>{river.name}</a></div>
                    <br className="mobile-show" />
                    <p className={`${styles["stats"]}`}>{<>{river.location}<br />Class {river.difficultyChar}</>}</p>
                </td>

                <td className={`${styles["level"]}`}>{!river.gauge1ID ? "" : "Gauge Error"}</td>
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
                <tr className={`${styles["flow__table-row"]}`} >
                    <td className={`${styles["river-stats"]}`} >
                        <div className={`${styles["river__heading"]}`}><a href={`https://creekvt.com/riverguide/${river.url}`}>{river.name}</a></div>
                        <span style={{ background: `linear-gradient(90deg, ${river.flowBarColor} 50%, ${index % 2 === 1 ? "rgba(188,188,188,.0)" : "transparent"} 80%` }}>{`${river.levelStatus ? river.levelStatus.toUpperCase() : "\u00A0"}`}</span>
                        <div className={`${styles["gauge-reading"]} mobile-show`}>{river.gauge1Reading}</div>
                        <p className={`${styles["stats"]}`}>{<>{river.location}<br />Class {river.difficultyChar}</>}</p>
                    </td>
                    <td className={`${styles["level"]}`}>
                        {/* <div className={`${styles["levelContainer"]}`} style={{ justifyContent: `${!river.gauge1Max ? "space-between" : "space-between"}` }}> */}
                        <div className={`${styles["levelContainer"]}`} >
                            {/* <div className={`${styles["levelInfo"]}`}></div> */}
                            <div className={`${styles["levelInfo"]} ${styles["mobile-hide"]}`}>{river.gauge1Reading}</div>
                            {river.gauge1Max &&
                                <div className={`${styles["flowBar"]}`} style={{ backgroundImage: `linear-gradient(0deg, ${river.flowBarColor ? river.flowBarColor : "grey"} ${river.flowBarPercent ? river.flowBarPercent + "%" : "0%"}, white 1%` }}>
                                    <span className={`${styles["curLvl"]}`}><div className={`${styles["top"]} ${styles["arrow"]} ${river.gauge1Trend ? styles[river.gauge1Trend] : ""}`}></div>
                                        <span style={{ display: 'inline-block', width: 'max-content' }}>
                                            {`${typeof river.gauge1ChangePerHr == 'number' ? river.gauge1ChangePerHr > 0 ? `+${river.gauge1ChangePerHr}` : river.gauge1ChangePerHr : ""}/hr`}<br />
                                        </span>
                                        <div className={`${styles["bottom"]} ${styles["arrow"]} ${river.gauge1Trend ? styles[river.gauge1Trend] : ""}`}></div>
                                    </span>
                                </div>
                            }
                            {river.gauge1Max && <div className={`${styles["mobile-show"]}`}>{river.gauge1Max ? river.gauge1Max : "-"} <hr /> {river.gauge1Min ? river.gauge1Min : "-"}</div>}
                            {!river.gauge1Max && <div style={{ display: 'inline-block', width: 'max-content' }}>{`${typeof river.gauge1ChangePerHr == 'number' ? river.gauge1ChangePerHr > 0 ? `+${river.gauge1ChangePerHr}` : river.gauge1ChangePerHr : ""}/hr`}</div>}
                        </div>
                    </td>
                    <td className={`${styles["mobile-hide"]}`}>{river.gauge1Max ? river.gauge1Max : "-"} <hr /> {river.gauge1Min ? river.gauge1Min : "-"}</td>
                    <td className={`${styles["gaugeName"]} ${styles["mobile-hide"]}`}><a href={`https://waterdata.usgs.gov/monitoring-location/${river.gauge1ID}`}>{river.gauge1Name}</a></td>
                    <td className={`${styles["updateTime"]} ${styles["mobile-hide"]}`}>{gauge1FormattedTime}</td>
                    <td className={`${styles["gaugeName"]} ${styles["mobile-show"]}`}>{river.gauge1Name.slice(0, river.gauge1Name.toLowerCase().search(/\bnear\b|\bat\b|@|\bbelow\b|\babove\b/))}<br /><br />{gauge1FormattedTime}</td>
                </tr>
            </>
        )
    }
}

