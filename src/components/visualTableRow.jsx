//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
//Libraries
import { formatDateTime, adj, adjEDTtoUTC } from "../utils/formatDateTime"
//Styles
import styles from './visualTableRow.module.scss'


export default function VisualTableRow({ levelReport }) {
const isRecent = (new Date() - new Date(levelReport.tripDateTime)) < (24 * 60 * 60 * 1000);

    return (
        <tr className={`${styles["visuals-row"]}`}>
            <td className={`${styles["date-cell"]}`} style={isRecent ? {display: 'flex', alignItems: 'center'} : {textAlign: 'center'}}>
                { isRecent?
                    <span className={`${styles["alert-icon"]}`}><FontAwesomeIcon icon={faBell} size="sm" color=" rgb(43, 62, 73)"/></span>
                    :
                    <></>
                }
                {formatDateTime(adjEDTtoUTC(levelReport.tripDateTime)).dow}<br />{formatDateTime(adjEDTtoUTC(levelReport.tripDateTime)).numericDate}<br />{formatDateTime(adjEDTtoUTC(levelReport.tripDateTime)).time}&nbsp;{formatDateTime(adjEDTtoUTC(levelReport.tripDateTime)).amPm}</td>
            <td >{levelReport.riverName}</td>
            <td className={`mobile-show`}>{levelReport.levelType.toLowerCase() == 'subjective opinion' ? levelReport.translatedTextLevel : levelReport.level}</td>
            <td className={`mobile-show`}>{levelReport.levelType}</td>
            <td className={`mobile-hide`}>{levelReport.levelType}</td>
            <td className={`mobile-hide`}>{!levelReport.levelType.toLowerCase().includes('subjective') ? levelReport.level : ''}</td>
            <td className={`mobile-hide`}>{levelReport.translatedTextLevel}</td>
            <td className={`mobile-hide ${styles["gauge-cell"]}`}>{levelReport.gauge1Name}</td>
            <td className={`mobile-hide ${styles["gauge-cell"]}`}>{levelReport.gauge1ReadingTime ? `${formatDateTime(adjEDTtoUTC(levelReport.gauge1ReadingTime)).numericDate} ${formatDateTime(adjEDTtoUTC(levelReport.gauge1ReadingTime)).time}${formatDateTime(adjEDTtoUTC(levelReport.gauge1ReadingTime)).amPm}`:''}</td>
            <td className={`mobile-hide ${styles["gauge-cell"]}`}>{levelReport.gauge1Level ? Math.round(levelReport.gauge1Level) : ''}</td>
            <td className={`mobile-hide ${styles["gauge-cell"]}`}>{levelReport.gauge1HourlyChange? Math.round(levelReport.gauge1HourlyChange):''}</td>
            <td className={`mobile-hide ${styles["gauge-cell"]}`}>{levelReport.gauge1Trend? levelReport.gauge1Trend[0].toUpperCase().concat(levelReport.gauge1Trend.slice(1)): ''}</td>
            <td className={`mobile-hide ${styles["gauge-cell"]}`}>{levelReport.gauge2Name ? levelReport.gauge2Name : ''}</td>
            <td className={`mobile-hide ${styles["gauge-cell"]}`}>{levelReport.gauge2ReadingTime? `${formatDateTime(adjEDTtoUTC(levelReport.gauge2ReadingTime)).numericDate} ${formatDateTime(adjEDTtoUTC(levelReport.gauge1ReadingTime)).time} ${formatDateTime(adjEDTtoUTC(levelReport.gauge1ReadingTime)).amPm}` : '' }</td>
            <td className={`mobile-hide ${styles["gauge-cell"]}`}>{levelReport.gauge2Level? Math.round(levelReport.gauge2Level): ''}</td>
            <td className={`mobile-hide ${styles["gauge-cell"]}`}>{levelReport.gauge2HourlyChange? Math.round(levelReport.gauge2HourlyChange): ''}</td>
            <td className={`mobile-hide ${styles["gauge-cell"]}`}>{levelReport.gauge2Trend? `${levelReport.gauge2Trend[0].toUpperCase().concat(levelReport.gauge2Trend.slice(1))}` : ''}</td>

        </tr>
    )
}