//Contexts
import { RiverContext } from "../pages/innerLayout";
//Hooks
import {useContext, useState } from "react";
//Styles
import styles from "./visualForm.module.scss";

export default function VisualForm() {
    const riverData = useContext(RiverContext).riverData;
    const [formData, setFormData] = useState({})
    console.log(riverData)

    return (
        <div className={`${styles["form__container"]}`}>
            <form className={`${styles["visual__form"]}`}>
                <div className={`${styles["form-item"]}`}>
                    <label htmlFor="riverName">Run</label>
                    <span class="req">*</span>
                    <hr />
                    <select id="riverName">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div className={`${styles["form-item"]}`}>
                    <label> Level Type </label>
                    <span class="req">*</span>
                    <hr />
                    <input type="radio" id="subjective" value="subjective" name="levelType" />
                    <label htmlFor="subjective">Hi / Med / Lo</label>
                    <input type="radio" id="objective" value="objective" name="levelType" />
                    <label htmlFor="Painted">Painted Gague Reading</label>
                </div>
                <div className={`${styles["form-item"]}`}>
                    <label htmlFor="level"></label>
                    <input type="number" step=".05" />
                </div>
                <div className={`${styles["form-item"]}`}>
                    <label htmlFor=""></label>
                    <input type="" />
                </div>
            </form>
        </div>

    )
}