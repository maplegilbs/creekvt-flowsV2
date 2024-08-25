//Components
import Loader from './loader'
import VisualTableRow from './visualTableRow'
//Context
import { useContext } from 'react'
import { RiverContext } from '../pages/innerLayout'
//Hooks
import { useState, useEffect } from 'react'
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
//Styles
import styles from './visualTable.module.scss'

export default function VisualTable({ reportSubmitted }) {
    const [status, setStatus] = useState('pending') //pending, success, failure
    const [filters, setFilters] = useState({ limit: 5 }) //riverName, limit
    const [levelReports, setLevelReports] = useState(null)
    const riverData = useContext(RiverContext).riverData;

    function buildQueryString() {
        if (Object.keys(filters).length < 1) return null;
        let queryStrings = [];
        for (let key in filters) {
            queryStrings.push(`${key}=${filters[key]}`)
        }
        return ("?").concat(queryStrings.join("&"))
    }

    async function getFlows() {
        try {
            let queryString = buildQueryString();
            let response = await fetch(`${process.env.REACT_APP_SERVER}/creekvt_flows/levels/flowReports${queryString ? queryString : ''}`)
            if (response.status > 199 && response.status < 300) {
                let flowInfo = await response.json();
                setTimeout(() => setStatus('success'), 150)
                setLevelReports(flowInfo)
            }
            else setStatus('failure')
        }
        catch (error) {
            setStatus('failure')
            console.log(error)
        }
    }

    useEffect(() => {
        getFlows();
    }, [reportSubmitted])

    function updateFilters(e) {
        if (e.target.value.toLowerCase() === 'all') {
            setFilters(prev => {
                delete prev[e.target.name]
                return prev;
            })
        }
        else {
            setFilters(prev => { return { ...prev, [e.target.name]: e.target.value } })
        }
    }

    return (
        <div className={`${styles["component__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <h2 className={`${styles["section__header"]}`}>Recent Reports</h2>
                <hr />
                {(status === 'pending') &&
                    <div style={{overflowX: "hidden", maxWidth: "initial" }} className={`${styles["visual-table__container"]}`}>
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
                                <select onChange={updateFilters} id="riverName" name="riverName">
                                    <option value={'all'}>All</option>
                                    {riverData ?
                                        riverData.map(river => <option key={river.name} value={river.name}>{river.name}</option>)
                                        :
                                        <></>
                                    }
                                </select>
                            </div>
                            <div className={`${styles["filter__row"]}`}>
                                <label htmlFor='limit'>Limit To</label>
                                <select onChange={(e) => updateFilters(e)} id="limit" name="limit">
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={'all'}>All</option>
                                </select>
                            </div>
                            <button onClick={getFlows} className={`${styles["update-filters__button"]}`}>Update</button>
                            <hr />
                        </div>
                        <div className={`${styles["visual-table__container"]}`}>
                            <h3 className={`${styles["table-title"]}`}>Level Reports</h3>
                            <p className={`${styles["table-legend"]}`}><FontAwesomeIcon icon={faBell} /> = recent report</p>
                            <table>
                                <thead>
                                    <tr className={`mobile-hide`}>
                                        <th colSpan={3}></th>
                                        <th colSpan={2}>Level Type</th>
                                        <th colSpan={5}>Gauge 1</th>
                                        <th colSpan={5}>Gauge 2</th>
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
                                    {(levelReports && levelReports.length > 0) ?
                                        levelReports.map(levelReport => <VisualTableRow key={levelReport.id} levelReport={levelReport} />)
                                        :
                                        <tr>
                                            <td colSpan={15}>No results available for selected filters.  Please update and try again.</td>
                                        </tr>
                                    }
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
        </div>
    )

}