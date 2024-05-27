//Components
import Loader from "../components/loader"
import VisualForm from "../components/visualForm";
import VisualTable from "../components/visualTable";
//Hooks
import { useEffect, useState, useRef } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowRight, faArrowRightToBracket, faCamera, faPlay, faRulerVertical, faTable } from "@fortawesome/free-solid-svg-icons";
//Styles
import styles from "./visuals.module.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";


export default function Visuals({ initialState }) {
    console.log(initialState)
    const formRef = useRef();
    const tableRef = useRef();
    const camsRef = useRef();
    const [formVisible, setFormVisible] = useState(false);
    const [tableVisible, setTableVisible] = useState(false);
    const [camsVisible, setCamsVisible] = useState(false);
    const [reportSubmitted, setReportSubmitted] = useState(false)

    useEffect(() => {

        if(initialState === 'table'){
            setFormVisible(false);
            setTableVisible(true);
            tableRef.current.scrollIntoView({behavior: 'smooth'})
            setCamsVisible(false)
        }
        else if(initialState === 'cams'){
            setFormVisible(false);
            setTableVisible(false);
            setCamsVisible(true)
        }
        else{
            setFormVisible(true);
            formRef.current.scrollIntoView({behavior: 'smooth', block: 'center'})
            setTableVisible(false);
            setCamsVisible(false)
        }
    }, [])

    useEffect(() => {
        if (reportSubmitted) {
            setTableVisible(true)
        }
    }, [reportSubmitted])

    return (
        <div className={`${styles["visuals-page"]}`}>
            <button onClick={() => { if (!formVisible) { formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) }; setFormVisible(prev => !prev) }}><FontAwesomeIcon icon={faChevronRight} rotation={formVisible ? 90 : 0} />&nbsp;Report a Level&nbsp; <FontAwesomeIcon icon={faRulerVertical} /></button>
            <div ref={formRef} className={`${styles["visual-form__container"]} ${formVisible ? styles["visible"] : ""}`}>
                <VisualForm reportSubmitted={reportSubmitted} setReportSubmitted={setReportSubmitted} />
            </div>
            <button onClick={() => { if (!tableVisible) { tableRef.current.scrollIntoView({ behavior: 'smooth' }) }; setTableVisible(prev => !prev); }}><FontAwesomeIcon icon={faChevronRight} rotation={tableVisible ? 90 : 0} />&nbsp;View Level Reports&nbsp; <FontAwesomeIcon icon={faTable} /></button>
            <div ref={tableRef} className={`${styles["visual-table__container"]} ${tableVisible ? styles["table-visible"] : ""}`} >
                <VisualTable reportSubmitted={reportSubmitted} />
            </div>
            <button onClick={() => setCamsVisible(prev => !prev)}><FontAwesomeIcon icon={faChevronRight} rotation={camsVisible ? 90 : 0} />&nbsp;View River Cams&nbsp; <FontAwesomeIcon icon={faCamera} /></button>
        </div>
    )
}