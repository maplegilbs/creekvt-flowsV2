//Components
import Loader from "../components/loader"
//Hooks
import { useState } from "react";
//Styles
import styles from "./visuals.module.scss";
import VisualForm from "../components/visualForm";


export default function Visuals() {
    const [status, setStatus] = useState('success'); //pending, success, error
    return (
        <>
            {status === "pending" &&
                < Loader bottom_text={"Loading Visuals"} />
            }
            {status === "success" &&
                <VisualForm />
            }
        </>
    )
}