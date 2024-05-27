//Components
import Loader from './loader'
//Hooks
import { useState, useEffect } from 'react'
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
//Styles
import styles from './visualTable.module.scss'
import VisualTableRow from './visualTableRow'

export default function VisualTable({ reportSubmitted }) {
    const [status, setStatus] = useState('pending') //pending, success, failure
    const [filters, setFilters] = useState({ limit: 8 }) //riverName, limit
    const [levelReports, setLevelReports] = useState(null)

    console.log(levelReports)

    function buildQueryString() {
        if (Object.keys(filters).length < 1) return null;
        let queryStrings = [];
        for (let key in filters) {
            queryStrings.push(`${key}=${filters[key]}`)
        }
        return ("?").concat(queryStrings.join("&"))
    }

    useEffect(() => {
        async function getFlows() {
            let queryString = buildQueryString();
            let response = await fetch(`http://localhost:3001/creekvt_flows/flowReports${queryString ? queryString : ''}`)
            if (response.status > 199 && response.status < 300) {
                let flowInfo = await response.json();
                setTimeout(() => setStatus('success'), 150)
                setLevelReports(flowInfo)
            }
            else setStatus('failure')
        }
        try {
            getFlows()
        } catch (error) {
            setStatus('failure')
            console.log(error)
        }
    }, [filters, reportSubmitted])

    return (
        <div className={`${styles["component__container"]}`}>
            {(status === 'pending') &&
                <div className={`${styles["visual-table__container"]}`}>
                    <Loader type={'spinner'} text={'Loading flow reports...'} />
                </div>
            }
            {(status === 'success') &&
                <>
                    <div className={`${styles["filter__container"]}`}>
                        <div className={`${styles["filter__row"]}`}>
                            <h6>Filter Options</h6>
                        </div>
                        <div className={`${styles["filter__row"]}`}>
                        <label htmlFor='riverName'>River</label>
                        <select id="riverName" name="riverName">
                            <option>All</option>
                            <option>The Big Branch of Otter Creek</option>
                            <option>50</option>
                            <option>All</option>
                        </select>
                        </div>
                        <div className={`${styles["filter__row"]}`}>
                        <label htmlFor='limit'>Limit To</label>
                        <select id="limit" name="limit">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>All</option>
                        </select>
                        </div>

                    </div>
                    <div className={`${styles["visual-table__container"]}`}>
                        <h3 className={`${styles["table-title"]}`}>Level Reports</h3>
                        <p className={`${styles["table-legend"]}`}><FontAwesomeIcon icon={faBell} /> = recent report</p>
                        <table>
                            <thead>
                                <tr className={`mobile-hide`}>
                                    <th colspan={3}></th>
                                    <th colspan={2}>Level Type</th>
                                    <th colspan={5}>Gauge 1</th>
                                    <th colspan={5}>Gauge 2</th>
                                    <th colspan={1}></th>
                                </tr>
                                <tr>
                                    <th>Date of Report</th>
                                    <th>River</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Level Type</th>
                                    <th className={`mobile-show ${styles[""]}`}>Level</th>
                                    <th className={`mobile-show ${styles[""]}`}>Level Type</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Numeric</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Text</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Name</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Reading Time</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Level</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Change / Hr</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Trend</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Name</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Reading Time</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Level</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Change / Hr</th>
                                    <th className={`mobile-hide ${styles[""]}`}>Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {levelReports.map(levelReport => <VisualTableRow key={levelReport.id} levelReport={levelReport} />)}
                            </tbody>
                        </table>
                    </div>
                </>
            }
            {(status === 'failure') &&
                <div className={`${styles["visual-table__container"]}`}>
                </div>
            }
        </div>
    )

}