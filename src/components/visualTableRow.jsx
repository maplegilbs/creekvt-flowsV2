//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
//Libraries
import { formatDateTime } from "../utils/formatDateTime"
//Styles
import styles from './visualTableRow.module.scss'


export default function VisualTableRow({ levelReport }) {
const isRecent = (new Date() - new Date(levelReport.tripDateTime)) < (24 * 60 * 60 * 1000);

    return (
        <tr className={`${styles["visuals-row"]}`}>
            <td className={`mobile-show ${styles["date-cell"]}`} style={isRecent ? {display: 'flex', alignItems: 'center'} : {textAlign: 'center'}}>
                { isRecent?
                    <span className={`${styles["alert-icon"]}`}><FontAwesomeIcon icon={faBell} size="sm" color=" rgb(43, 62, 73)"/></span>
                    :
                    <></>
                }
                {formatDateTime(levelReport.tripDateTime).dow}<br />{formatDateTime(levelReport.tripDateTime).numericDate}<br />{formatDateTime(levelReport.tripDateTime).time}&nbsp;{formatDateTime(levelReport.tripDateTime).amPm}</td>
            <td className={`mobile-show ${styles[""]}`}>{levelReport.riverName}</td>
            <td className={`mobile-show ${styles[""]}`}>{levelReport.levelType.toLowerCase() == 'subjective opinion' ? levelReport.translatedTextLevel : levelReport.level}</td>
            <td className={`mobile-show ${styles[""]}`}>{levelReport.levelType}</td>
        </tr>
    )
}