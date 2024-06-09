//Styles
import styles from "./rainRow.module.scss";

export default function RainRow({ rainRecord }) {

    return (
        <tr className={`${styles["rain__row"]}`}>
            <td className={`${styles["station-info"]}`} >
                <div className={`mobile-show ${styles["station__heading"]}`}>{rainRecord.metadata.stationName.slice(0, rainRecord.metadata.stationName.toLowerCase().search(/\bnear\b|\bat\b|@|\bbelow\b|\babove\b/))}<br/>{rainRecord.metadata.stationName.slice(rainRecord.metadata.stationName.toLowerCase().search(/\bnear\b|\bat\b|@|\bbelow\b|\babove\b/))}</div>
                <div className={`mobile-hide ${styles["station__heading"]}`}>{rainRecord.metadata.stationName}</div>
                {/* <br className="mobile-show" /> */}
                <p className={`${styles["station-stats"]}`}>{rainRecord.readingDateTime}</p>
            </td>
            <td className={`${styles["source-icon__img"]}`}><img src={rainRecord.metadata.icon}/></td>
            <td className={`mobile-hide ${styles["rain-info"]}`}>{rainRecord.data["1hr"] ? rainRecord.data["1hr"] : "-"}</td>
            <td className={`${styles["rain-info"]}`}>{rainRecord.data["3hr"] ? rainRecord.data["3hr"] : "-"}</td>
            <td className={`${styles["rain-info"]}`}>{rainRecord.data["6hr"] ? rainRecord.data["6hr"] : "-"}</td>
            <td className={`${styles["rain-info"]}`}>{rainRecord.data["12hr"] ? rainRecord.data["12hr"] : "-"}</td>
            <td className={`mobile-hide ${styles["rain-info"]}`}>{rainRecord.data["24hr"] ? rainRecord.data["24hr"] : "-"}</td>

        </tr>
    )
}