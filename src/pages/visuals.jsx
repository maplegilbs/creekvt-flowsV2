//Components
import Loader from "../components/loader"
import VisualForm from "../components/visualForm";
import VisualTable from "../components/visualTable";
//Hooks
import { useEffect, useState } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowRight, faArrowRightToBracket, faCamera, faPlay, faRulerVertical, faTable } from "@fortawesome/free-solid-svg-icons";
//Styles
import styles from "./visuals.module.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";


export default function Visuals() {
    const [status, setStatus] = useState('success'); //pending, success, error
    const [formVisible, setFormVisible] = useState(true);
    const [tableVisible, setTableVisible] = useState(false);
    const [camsVisible, setCamsVisible] = useState(false);
    const [reportSubmitted, setReportSubmitted] = useState(false)

    useEffect(() => {
        if (reportSubmitted) {
            setTableVisible(true)
        }
    }, [reportSubmitted])

    return (
        <div className={`${styles["visuals-page"]}`}>
            {status === "pending" &&
                < Loader bottom_text={"Loading Visuals"} />
            }
            <button onClick={() => setFormVisible(prev => !prev)}><FontAwesomeIcon icon={faChevronRight} rotation={formVisible? 90 : 0} />&nbsp;Report a Level&nbsp; <FontAwesomeIcon icon={faRulerVertical} /></button>
            {status === "success" &&
                <div className={`${styles["visual-form__container"]} ${formVisible? styles["visible"] : ""}`}>
                    <VisualForm reportSubmitted={reportSubmitted} setReportSubmitted={setReportSubmitted} />
                </div>
            }
            <button onClick={() => setTableVisible(prev => !prev)}><FontAwesomeIcon icon={faChevronRight} rotation={tableVisible? 90 : 0} />&nbsp;View Level Reports&nbsp; <FontAwesomeIcon icon={faTable} /></button>
            {status === "success" &&
                <div className={`${styles["visual-table__container"]} ${tableVisible? styles["table-visible"] : ""}`} >
                    <VisualTable reportSubmitted={reportSubmitted}/>
                </div>
            }
            <button onClick={() => setCamsVisible(prev => !prev )}><FontAwesomeIcon icon={faChevronRight} rotation={camsVisible? 90 : 0} />&nbsp;View River Cams&nbsp; <FontAwesomeIcon icon={faCamera} /></button>
        </div>
    )
}