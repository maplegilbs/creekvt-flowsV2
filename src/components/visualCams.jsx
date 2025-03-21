//Components
import Loader from './loader'
import CamContainer from './camContainer'
//Context
import { useContext } from 'react'
//Hooks
import { useState, useEffect } from 'react'
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faCalendarXmark } from "@fortawesome/free-solid-svg-icons";

//Styles
import styles from './visualCams.module.scss'

export default function VisualCams() {
    const [camsInfo, setCamsInfo] = useState(null)
    const [status, setStatus] = useState('pending') //pending, success, failure

    useEffect(() => {
        async function getCamsInfo() {
            let fetchUrl = `${process.env.REACT_APP_SERVER}/creekvt_cams/photos/camInfo`;
            let response = await fetch(fetchUrl);
            if (response.status > 299 || response.status < 200) throw new Error(`Fetch to ${fetchUrl} failed`)
            let camData = await response.json();
            setCamsInfo(camData)
        }
        try {
            getCamsInfo()
        } catch (error) {
            setStatus('failure')
        }
    }, [])


    return (
        <div className={`${styles["component__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <h2 className={`${styles["section__header"]}`}>River Cams</h2>
                <hr />
                <p>These images are gathered from cell-enabled trail cams set to take images every 2hrs between 7am and 5pm
                    **NOTE** during off-season (mid December - early March) these may be put to sleep or set to take images once per day to preserve battery life.
                    <br /><br />
                    Issues with these images? Contact us at <a href="mailto:gopaddling@creekvt.com">gopaddling@creekvt.com</a>
                </p>
                <div className={`${styles["icon-legend__container"]}`}>
                    <div className={`${styles["icon-legend"]}`}>
                        <FontAwesomeIcon icon={faCalendarCheck} style={{ color: "#227722" }} /> <p>: Camera images current (from within the past two days)</p>
                    </div>
                    <div className={`${styles["icon-legend"]}`}>
                        <FontAwesomeIcon icon={faCalendarXmark} style={{ color: "grey" }} /> <p>: Camera images stale (older than two days)</p>
                    </div>
                </div>
                {camsInfo &&
                    <>{camsInfo.sort((cam1, cam2) => cam1.riverName > cam2.riverName ? 1 : -1).map(cam => <CamContainer key={cam.riverName} camsInfo={camsInfo} camName={cam.riverName} />)}                </>
                }
            </div>
        </div>
    )

}