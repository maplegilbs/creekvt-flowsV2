//Components
import Loader from "../components/loader"
import VisualForm from "../components/visualForm";
//Hooks
import { useState } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowRight, faArrowRightToBracket, faPlay, faRulerVertical } from "@fortawesome/free-solid-svg-icons";
//Styles
import styles from "./visuals.module.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";


export default function Visuals() {
    const [status, setStatus] = useState('success'); //pending, success, error
    const [visualFormVisible, setVisualFormVisible] = useState(false)

    function showVisualForm() {
        setVisualFormVisible(prev => !prev)
    }

    return (
        <div className={`${styles["visuals-page"]}`}>
            {status === "pending" &&
                < Loader bottom_text={"Loading Visuals"} />
            }
            <button onClick={showVisualForm}><FontAwesomeIcon icon={faRulerVertical} />&nbsp;Report a Level&nbsp; <FontAwesomeIcon icon={faChevronRight} rotation={visualFormVisible? 90 : 0}/></button>
            {status === "success" &&
                <div className={`${styles["visual-form__container"]} ${visualFormVisible ? styles["visible"] : ""}`}>
                    <VisualForm />
                </div>
            }
        </div>
    )
}