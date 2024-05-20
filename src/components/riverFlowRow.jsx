//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./riverFlowRow.module.scss"

export default function RiverFlowRow({ river }) {

    // console.log(river)
    console.log(river.name, river.gauge1Min, river.gauge1Reading, river.gauge1ID)

    if (!river.gauge1ID || river.gauge1ID === 'error') {
        console.log(river.gauge1ID)
        return (
            <tr>
                <td className={`${styles["river-stats"]}`}><a href={`https://creekvt.com/riverguide/${river.url}`}>{river.name}</a>
                    <p className={`${styles["diff"]}`}>Class: {river.difficultyChar}</p>
                    <p className={`${styles["diff"]}`}>Quality: {river.quality}</p>
                </td>
                <td className={`${styles["level"]}`}>
                   {!river.gauge1ID ? "No gauge" : "Gauge Error"}
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
            <tr>
                <td className={`${styles["river-stats"]}`}><a href={`https://creekvt.com/riverguide/${river.url}`}>{river.name}</a>
                    <p className={`${styles["diff"]}`}>Class: {river.difficultyChar}</p>
                    <p className={`${styles["diff"]}`}>Quality: {river.quality}</p>
                </td>
                <td className={`${styles["level"]}`}>
                    <div className={`${styles["levelContainer"]}`}>
                        <div className={`${styles["levelInfo"]}`}>{river.gauge1Reading}<span className={`${styles["mobile-show"]}`}><br /><br />{river.gauge1Max? river.gauge1Max : "-"} <hr /> {river.gauge1Min ? river.gauge1Min : "-"}</span>
                        </div>
                        {river.gauge1Max &&
                            <div className={`${styles["flowBar"]}`} style={{ backgroundImage: `linear-gradient(0deg, ${"green"} ${"90%"}, white 1%` }}>
                                <span className={`${styles["curLvl"]}`}><div className={`${styles["top"]} ${styles["arrow"]} ${river.gauge1Trend ? styles[river.gauge1Trend] : ""}`}></div>{river.gauge1ChangePerHr? river.gauge1ChangePerHr: ""}/hr<br /><div className={`${styles["bottom"]} ${styles["arrow"]} ${river.gauge1Trend ? styles[river.gauge1Trend] : ""}}`}></div></span>
                            </div>
                        }

                    </div>
                </td>
                {/* <td className={`${styles["mobile-hide"]}`}>{river.gauge1Max} <hr /> {river.gauge1Min}</td> */}
                {/* <td className={`${styles["gaugeName"]} ${styles["mobile-hide"]}`}><a href={`https://waterdata.usgs.gov/monitoring-location/${river.gauge1ID}`}>{river.gauge1Name}</a></td> */}
                <td className={`${styles["updateTime"]} ${styles["mobile-hide"]}`}>{gauge1FormattedTime}</td>
                {/* <td className={`${styles["gaugeName"]} ${styles["mobile-show"]}`}>{river.guage1Name}<br /><br />{gauge1FormattedTime}</td> */}
            </tr>
        )
    }
}

