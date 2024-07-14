//Components
import VisualCams from "../components/visualCams"
//Contexts
import { RiverContext } from "../pages/innerLayout"
//Hooks
import { useState, useContext } from "react"
//Styles
import styles from "./cams.module.scss"

export default function Cams() {
    const [status, setStatus] = useState('pending') //pending, success, failure
    const riverData = useContext(RiverContext).riverData


    return (
        <div className={`${styles["page__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <VisualCams />
            </div>
        </div>
    )
}