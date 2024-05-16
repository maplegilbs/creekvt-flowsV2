//Components
import { NavLink, Outlet, useLocation } from "react-router-dom"
//Styles
import styles from "../styles/innerLayout.module.scss"

export default function InnerLayout() {
    let curPath = useLocation();
    console.log(curPath.pathname)
    return (
        <div className={`${styles['page-wrapper']}`}>
            <div className={`${styles['nav-container']}`}>
                <nav>
                    <ul>
                        <li className={curPath.pathname === '/gauges' ? `${styles['active']}` : ""}>
                            <NavLink to="/gauges">Gauges</NavLink>
                        </li>
                        <li className={curPath.pathname === '/visuals' ? `${styles['active']}` : ""}>
                            <NavLink to="/visuals">Visuals</NavLink>
                        </li>
                        <li className={curPath.pathname === '/rain' ? `${styles['active']}` : ""}>
                            <NavLink to="/rain">Rainfall</NavLink>
                        </li>
                        <li className={curPath.pathname === '/forecasts' ? `${styles['active']}` : ""}>
                            <NavLink to="/forecasts">Forecasts</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={`${styles['content-container']}`}>
                <Outlet />
            </div>
        </div>
    )
}