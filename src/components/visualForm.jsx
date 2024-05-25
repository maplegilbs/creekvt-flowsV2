//Contexts
import { RiverContext } from "../pages/innerLayout";
//Hooks
import { useContext, useEffect, useState } from "react";
//Libraries
import { fetchGaugeDataForLevelReport } from "../utils/levelFetchingFunctions";
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./visualForm.module.scss";
import Loader from "./loader";


const levelOpts = ['Too Low', 'Minimum', 'Low', 'Medium Low', 'Medium', 'Medium High', 'High', 'Too High'];
function calcFeetIn(decimalInput = 0) {
    let feet = Math.floor(Number(decimalInput));
    let inches = Math.round((Number(decimalInput) - feet) * 12)
    return `${feet}' ${inches}"`
}

export default function VisualForm() {
    const riverData = useContext(RiverContext).riverData;
    const [formData, setFormData] = useState({})
    const [status, setStatus] = useState('pending') //pending, fetching, success, error

    async function handleChange(e) {
        let updatedForm = { ...formData, [e.target.name]: e.target.value }
        if (updatedForm.level && updatedForm.riverName && updatedForm.tripDateTime && updatedForm.levelType) {
            setStatus('fetching')
            updatedForm.gaugeReadings = null;
            let correlationGauges = [];
            riverData.forEach(river => {
                if (river.name.toLowerCase() === updatedForm.riverName.toLowerCase()) {
                    if (river.gauge1ID) { correlationGauges.push(river.gauge1ID) }
                    if (river.gauge2ID) { correlationGauges.push(river.gauge2ID) }
                }
            })
            let fetchedGaugeData = await fetchGaugeDataForLevelReport(correlationGauges, updatedForm.tripDateTime, riverData.find(river => river.name === updatedForm.riverName))
            //updated form has riverName, levelType, level, tripDateTime
            //gaugeReadings has empty object or {gauge1Name, gauge1ReadingTime, gauge1Level, gauge1HourlyChange, gauge1Trend}
            updatedForm = { ...updatedForm, gaugeReadings: fetchedGaugeData }
        }
        setFormData(updatedForm)
    }

    async function handleNotes(e) {
        setFormData(prev => { return { ...prev, userInputNotes: e.target.value } })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let response = await fetch(`http://localhost:3001/creekvt_flows/levelsubmit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })


        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <div className={`${styles["form__container"]}`}>
            {riverData &&
                <form className={`${styles["visual__form"]}`}>
                    <div className={`${styles["form-item"]}`}>
                        <label htmlFor="riverName">Run</label>
                        <span className={`${styles["req"]}`}>*</span>
                        <hr />
                        <select id="riverName" name="riverName" onChange={handleChange} required>
                            <option disabled selected></option>
                            {riverData.map(river => <option key={river.name} value={river.name}>{river.name}</option>)}
                        </select>
                        <p className={`${styles["form-item__footer"]}`}>Select a run from the list</p>
                    </div>
                    <div className={`${styles["form-item"]}`}>
                        <label> Level Type </label>
                        <span className={`${styles["req"]}`}>*</span>
                        <hr />
                        <input type="radio" onChange={handleChange} id="subjective" value="subjective" name="levelType" />
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
                            <input name="level" id="level" onChange={handleChange} type="number" step=".05" required />
                            <p className={`${styles["form-item__footer"]}`}>Equivalent if gauge is measured in ft & in: <span>{calcFeetIn(formData.level ? formData.level : 0)}</span> </p>
                        </div>
                    }
                    {formData.levelType === 'subjective' &&
                        <div className={`${styles["form-item"]}`}>
                            <label htmlFor="level">Level</label>
                            <span className={`${styles["req"]}`}>*</span>
                            <hr />
                            <select name="level" id="level" onChange={handleChange} required>
                                <option disabled selected></option>
                                {levelOpts.map((opt, index) => <option key={opt} value={index + 1}>{opt}</option>)}
                            </select>
                        </div>
                    }
                    <div className={`${styles["form-item"]}`}>
                        <label htmlFor="tripDateTime">Date of trip</label>
                        <span className={`${styles["req"]}`}>*</span>
                        <hr />
                        <input onChange={handleChange} type="datetime-local" id="tripDateTime" name="tripDateTime" required />
                        <p className={`${styles["form-item__footer"]}`}>Date and time to which this level report applies</p>
                    </div>
                </form>
            }
            {status === 'fetching' &&
                <div className={`${styles["fetch-gauges__container"]}`}>
                    <Loader />
                </div>
            }
            {Object.keys(formData).includes('gaugeReadings') && Object.keys(formData.gaugeReadings).length > 0 &&
                <div className={`${styles["fetch-gauges__container"]}`}>
                    <h3>Corresponding Gauge(s) Info</h3><hr />
                    <p>Gauge 1: <br /><span>{formData.gaugeReadings.gauge1Name}</span></p>
                    <p>Date &amp; time of closest reading: <br /><span>{`${formatDateTime(new Date(formData.gaugeReadings.gauge1ReadingTime)).fullDate} @ ${formatDateTime(new Date(formData.gaugeReadings.gauge1ReadingTime)).time} ${formatDateTime(new Date(formData.gaugeReadings.gauge1ReadingTime)).amPm}`}</span></p>
                    <p>Level: <br /><span>{formData.gaugeReadings.gauge1Level}</span></p>
                    <p>Trend: <br /><span>{formData.gaugeReadings.gauge1Trend[0].toUpperCase() + formData.gaugeReadings.gauge1Trend.slice(1)}</span></p><br />
                    {formData.gaugeReadings.gauge2Name &&
                        <>
                            <p>Gauge 2: <br /><span>{formData.gaugeReadings.gauge2Name}</span></p>
                            <p>Date &amp; time of closest reading: <br /><span>{`${formatDateTime(new Date(formData.gaugeReadings.gauge2ReadingTime)).fullDate} @ ${formatDateTime(new Date(formData.gaugeReadings.gauge2ReadingTime)).time} ${formatDateTime(new Date(formData.gaugeReadings.gauge2ReadingTime)).amPm}`}</span></p>
                            <p>Level: <br /><span>{formData.gaugeReadings.gauge2Level}</span></p>
                            <p>Trend: <br /><span>{formData.gaugeReadings.gauge2Trend[0].toUpperCase() + formData.gaugeReadings.gauge2Trend.slice(1)}</span></p><br />
                        </>
                    }
                    <label htmlFor="userInputNotes">Notes </label>
                    <hr />
                    <textarea onChange={handleNotes} id="userInputNotes" name="userInputNotes" rows="3" placeholder="Any relevant additional information?"></textarea><br />
                    <br />
                    <button onClick={handleSubmit} className={`${styles["form__button-submit"]}`}>Submit</button>
                </div>
            }
            {Object.keys(formData).includes('gaugeReadings') && Object.keys(formData.gaugeReadings).length == 0 &&
                <div className={`${styles["fetch-gauges__container"]}`}>
                    <h3>No gauge information could be fetched at this time, please submit anyway and gauge information retreival will be retryed later</h3>
                    <button onClick={handleSubmit} className={`${styles["form__button-submit"]}`}>Submit</button>
                </div>
            }
        </div>
    )
}