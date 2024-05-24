//Contexts
import { RiverContext } from "../pages/innerLayout";
//Hooks
import { useContext, useState } from "react";
//Styles
import styles from "./visualForm.module.scss";

export default function VisualForm() {
    const riverData = useContext(RiverContext).riverData;
    const [formData, setFormData] = useState({})
    console.log(riverData)

    function handleChange(e) {
        let updatedForm = {
            ...formData,
            [e.target.name]: e.target.value
        }
        setFormData(updatedForm)
    }

    console.log(formData)

    return (
        <div className={`${styles["form__container"]}`}>
            {riverData &&
                <form className={`${styles["visual__form"]}`}>
                    <div className={`${styles["form-item"]}`}>
                        <label htmlFor="riverSection">Run</label>
                        <span className={`${styles["req"]}`}>*</span>
                        <hr />
                        <select id="riverSection" name="riverSection" onChange={handleChange}>
                            {riverData.map(river => <option value={river.name}>{river.name}</option>)}
                        </select>
                    </div>
                    <div className={`${styles["form-item"]}`}>
                        <label> Level Type </label>
                        <span className={`${styles["req"]}`}>*</span>
                        <hr />
                        <input type="radio" onChange={handleChange}  id="subjective" value="subjective" name="levelType" />
                        <label htmlFor="subjective">Subjective Opinion</label>
                        <br />
                        <input type="radio" onChange={handleChange} id="objective" value="objective" name="levelType" />
                        <label htmlFor="Painted">Painted Gauge</label>
                    </div>
                    {formData.levelType === 'objective' &&
                        <div className={`${styles["form-item"]}`}>
                            <label htmlFor="level">Level</label>
                            <span className={`${styles["req"]}`}>*</span>
                            <hr />
                            <input type="number" step=".05" />
                        </div>
                    }
                    {formData.levelType === 'subjective' &&
                        <div className={`${styles["form-item"]}`}>
                            <label htmlFor="level">Level</label>
                            <hr />
                            <input type="number" step=".05" />
                        </div>
                    }
                    <div className={`${styles["form-item"]}`}>
                        <label htmlFor=""></label>
                        <input type="" />
                    </div>
                </form>
            }
        </div>

    )
}