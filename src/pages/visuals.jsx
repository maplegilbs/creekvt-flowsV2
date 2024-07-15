//Components
import Loader from "../components/loader"
import VisualForm from "../components/visualForm";
import VisualTable from "../components/visualTable";
//Hooks
import { useState } from "react";
//Styles
import styles from "./visuals.module.scss";


export default function Visuals({ initialState }) {
    const [reportSubmitted, setReportSubmitted] = useState(false)


    return (
        <div className={`${styles["page__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <VisualForm reportSubmitted={reportSubmitted} setReportSubmitted={setReportSubmitted} />
                <VisualTable reportSubmitted={reportSubmitted} />
            </div>
        </div>
    )
}