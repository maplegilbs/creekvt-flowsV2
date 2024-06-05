//Components
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
//Hooks
import { createContext, useEffect, useState } from "react";
//Styles
import styles from "../styles/innerLayout.module.scss"

export const RiverContext = createContext();

export default function InnerLayout() {
    const [riverData, setRiverData] = useState(null);
    const [status, setStatus] = useState("success") //success or error
    let curPath = useLocation();
    console.log(curPath)

    useEffect(() => {
        async function fetchRiverInfo() {
            try {
                let riverInfoURL = `${process.env.REACT_APP_SERVER}/creekvt_flows/riverData`
                let riversDBResponse = await fetch(riverInfoURL)
                if (riversDBResponse.status < 200 || riversDBResponse.status > 299) {
                    throw new Error(`River data fetch error to url: ${riverInfoURL}`)
                }
                let riversDBData = await riversDBResponse.json();
                setRiverData(riversDBData);
            } catch (error) {
                console.log(`There was an error fetching gauge data: ${error}`)
                setStatus('error')
            }
        }
        fetchRiverInfo();
    }, [])


    return (
        <div className={`${styles['page-wrapper']}`}>
            <div className={`${styles['nav-container']}`}>
                <nav>
                    <ul>
                        <li className={curPath.pathname.includes('gauges') ? `${styles['active']}` : ""}>
                            <NavLink to="./gauges">Gauges</NavLink>
                        </li>
                        <li className={curPath.pathname.includes('visuals') ? `${styles['active']}` : ""}>
                            <NavLink to="./visuals">Visuals</NavLink>
                        </li>
                        <li className={curPath.pathname.includes('rain') ? `${styles['active']}` : ""}>
                            <NavLink to="./rain">Rainfall</NavLink>
                        </li>
                        <li className={curPath.pathname.includes('forecasts') ? `${styles['active']}` : ""}>
                            <NavLink to="./forecasts">Forecasts</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <RiverContext.Provider value={{riverData, status}}>
                <div className={`${styles['content-container']}`}>
                    <Outlet />
                </div>
            </RiverContext.Provider>
        </div>
    )
}