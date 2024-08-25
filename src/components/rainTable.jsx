//Hooks
import { useState, useEffect } from "react"
//Libraries
import { compile } from "../utils/rainFunctions.js"
//Styles
import styles from "./rainTable.module.scss"
import RainRow from "./rainRow.jsx";
import Loader from "./loader.jsx";

export default function RainTable() {
    const [rainData, setRainData] = useState(null);
    const [rainStations, setRainStations] = useState(null)
    const [status, setStatus] = useState('pending') //pending, success, failure

    useEffect(() => {
        async function getRainData() {
            try {
                let response = await fetch(`${process.env.REACT_APP_SERVER}/creekvt_flows/rain/rainStations`)
                if (response.status > 199 && response.status < 300) {
                    let rainStationsJson = await response.json();
                    setTimeout(() => setStatus('success'), 750)
                    setRainStations(rainStationsJson)
                }
                else setStatus('failure')
            }
            catch (error) {
                setStatus('failure')
                console.log(error)
            }
        }
        getRainData();
    }, [])

    useEffect(() => {
        async function fetchAndFormatRainData() {
            if (rainStations) {
                try {
                    let fetchedRainData = await compile(rainStations)
                    setRainData(fetchedRainData)
                } catch (error) {
                    console.error(`There was an error fetching rain data: ${error}`)
                    setRainData(null)
                }
            }
        }
        fetchAndFormatRainData();
    }, [rainStations])


    return (
        <div className={`${styles["component__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <h2 className={`${styles["section__header"]}`}>Rainfall Totals</h2>
                <hr />

                {status === "success" &&
                    <table>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Location<br /><span>Report Time</span></th>
                                <th rowSpan={2}>Source</th>
                                <th colSpan={5}>Rain Accumulation</th>
                            </tr>
                            <tr>
                                <th className={"mobile-hide"}>1hr</th>
                                <th>3hr</th>
                                <th>6hr</th>
                                <th>12hr</th>
                                <th className={"mobile-hide"}>24hr</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rainData &&
                                rainData.map((record, index) => <RainRow key={index} rainRecord={record} />)}
                        </tbody>
                    </table>
                }
                {status === "pending" &&
                    <Loader bottom_text={"Fetching rainfall totals"} type={"spinner"} />
                }
            </div>
        </div>
    )
}