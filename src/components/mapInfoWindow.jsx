import ReactDOM from 'react-dom/client'
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
//Styles
import styles from "./mapInfoWindow.module.scss"

function CustomInfoWindow({ riverData, infoWindow }) {
    console.log(infoWindow)
    return (
        <div className={`${styles["info-window__container"]}`}>
            <button onClick={() => infoWindow.close()} className={`${styles["button--close"]}`}><FontAwesomeIcon icon={faCircleXmark} /></button>
            <h4>{riverData.name}</h4>
            <span className={`${styles["level-status"]}`} style={{ background: `linear-gradient(90deg, ${riverData.flowBarColor} 50%,  transparent 80%` }}>{`${riverData.levelStatus ? riverData.levelStatus.toUpperCase() : "\u00A0"}`}</span>
            <div className={`${styles["flow__container"]}`}>
                {riverData.gauge1Reading &&
                    <p className={`${styles["flow-info"]}`}><span><strong>{riverData.gauge1Reading}</strong> </span>&nbsp;cfs <span>{riverData.gauge1ChangePerHr > 0 ? `+${riverData.gauge1ChangePerHr}` : riverData.gauge1ChangePerHr}/hr</span></p>
                }
                <div className={`${styles["min-max__container"]}`}>
                    <p>Min: {riverData.gauge1Min}</p>
                    <p>Max: {riverData.gauge1Max}</p>
                </div>
            </div>
        </div>
    )
}

export default function renderInfoWindow(riverData, infoWindow) {
    let targetDiv = document.createElement('div');
    const root = ReactDOM.createRoot(targetDiv);
    root.render(<CustomInfoWindow riverData={riverData} infoWindow={infoWindow} />
    )
    return targetDiv;
}