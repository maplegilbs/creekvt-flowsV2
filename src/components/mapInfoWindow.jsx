import ReactDOM from 'react-dom/client'
//Hooks
import { useState, useEffect } from 'react'
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
//Styles
import styles from "./mapInfoWindow.module.scss"

function RiverInfoWindow({ riverData, infoWindow }) {
    return (
        <div className={`${styles["info-window__container"]}`}>
            <button onClick={() => infoWindow.close()} className={`${styles["button--close"]}`}><FontAwesomeIcon icon={faCircleXmark} size="xl"/></button>
            <h4>{riverData.name}</h4>
            <span className={`${styles["level-status"]}`} style={{ background: `linear-gradient(90deg, transparent 10%, ${riverData.flowBarColor} 20% 80%,  transparent 90%` }}>{`${riverData.levelStatus ? riverData.levelStatus.toUpperCase() : "\u00A0"}`}</span>
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

function CamInfoWindow({ camData, infoWindow }) {
    const [imageUrl, setImageURL] = useState(null)

    console.log(imageUrl)
    useEffect(() => {
        async function fetchImageURLS() {
            try {
                let url = `${process.env.REACT_APP_SERVER}/creekvt_Cams/photos?riverName=${camData.camApiEndpoint}&quantity=1000`;
                let response = await fetch(url)
                if (response.status < 200 || response.status > 299) throw new Error(`There was an error fetching from ${url}`)
                let data = await response.json()
                setImageURL(data[data.length - 1])
            } catch (error) {
                console.error(error)
            }
        }
        if (camData.camApiEndpoint) fetchImageURLS();
    }, [camData])

    return (
        <div className={`${styles["info-window__container"]}`}>
            <button onClick={() => infoWindow.close()} className={`${styles["button--close"]}`}><FontAwesomeIcon icon={faCircleXmark} size="xl"/></button>
            <h4>{camData.camName}</h4>
            {/* {imageUrl && */}
            <figure>
                <figcaption>Most recent image</figcaption>
                <a target="_blank" href={imageUrl}>
                    <img style={{opacity: `${imageUrl? 1 : 0}`}} src={imageUrl} alt={`Most recent cam image of ${camData.camName}`} />
                </a>
                <figcaption>Click for full size, more detail including reference imges on the
                    <a href={"./cams"}> cams page</a></figcaption>
            </figure>
            {/* } */}

        </div>
    )
}


function GaugeInfoWindow({ gaugeData, infoWindow }) {

    return (
        <div className={`${styles["info-window__container"]}`}>
            <button onClick={() => infoWindow.close()} className={`${styles["button--close"]}`}><FontAwesomeIcon icon={faCircleXmark} size="xl"/></button>
            {gaugeData.name}
        </div>
    )
}

export default function renderInfoWindow(data, infoWindow) {
    let targetDiv = document.createElement('div');
    const root = ReactDOM.createRoot(targetDiv);
    console.log(data)
    if (data.type === "cam") {
        console.log("camera");
        root.render(<CamInfoWindow camData={data} infoWindow={infoWindow} />)
    }
    else if(data.type == "gauge"){
        root.render(<GaugeInfoWindow gaugeData={data} infoWindow={infoWindow} />)
    }
    else {
        root.render(<RiverInfoWindow riverData={data} infoWindow={infoWindow} />)
    }
    return targetDiv;
}