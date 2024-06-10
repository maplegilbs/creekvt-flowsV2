//Components
import Loader from "../components/loader"
import RainTable from "../components/rainTable";
import RainMap from "../components/rainMap";
//Hooks
import { useState } from "react";
//Styles
import styles from "./rain.module.scss"

export default function Rainfall() {
    const [status, setStatus] = useState('success'); //pending, success, error

    return (
        <div className={`${styles["page__container"]}`}>
            {status === 'pending' &&
                <Loader type={"rain"} bottom_text={"Loading Rain Data"} />
            }
            {status === 'success' &&
                <RainTable />
            }
            <RainMap />
        </div>
    )
}