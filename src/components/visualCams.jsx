//Components
import Loader from './loader'
//Context
import { useContext } from 'react'
//Hooks
import { useState, useEffect } from 'react'
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Styles
import styles from './visualCams.module.scss'

export default function VisualCams() {

    return (
        <div className={`${styles["component__container"]}`}>
            <p>These images are gathered from cell-enabled trail cams set to take images every 2hrs between 7am and 5pm
                **NOTE** during off-season (mid December - early March) these may be put to sleep or set to take images once per day to preserve battery life.
                <br /><br />
                Issues with these images? Contact us at <a href="mailto:gopaddling@creekvt.com">gopaddling@creekvt.com</a>
            </p>

        </div>
    )

}