//Components
import Loader from "./loader";
//Hooks
import { useState, useEffect } from "react";
//Styles
import styles from "./camContainer.module.scss";

function ImageContainer({ overlayURL, overlayOpacity, imgURL }) {
    return (
        <div className={`${styles["image__container"]}`}>
            <div className={`${styles["image-overlay"]}`} style={{ opacity: overlayOpacity, backgroundImage: `url(${overlayURL})` }}></div>
            <a href={imgURL} target="blank">
                <img className={`${styles["cam-image"]}`} width={'100%'} src={imgURL} />
            </a>
        </div>
    )
}

//!!handle failure state
export default function CamContainer({ camName, camsInfo }) {
    const [status, setStatus] = useState('pending') //pending, success, failure
    const [camInfo, setCamInfo] = useState(null)
    const [imageURLS, setImageURLS] = useState([])
    const [overlayOpacity, setOverlayOpacity] = useState(.5);
    const [overlayURL, setOverlayURL] = useState('')

    console.log(camName, camInfo)

    useEffect(() => {
        let matchedCam = camsInfo.find(cam => cam.riverName === camName)
        if (matchedCam) {
            setCamInfo(matchedCam)
            setStatus('success')
        }
        else {
            setStatus('failure')
        }
    }, [])

    useEffect(() => {
        async function fetchImageURLS() {
            try {
                let url = `${process.env.REACT_APP_SERVER}/creekvt_Cams/photos?riverName=${camInfo.apiEndpoint}&quantity=1000`;
                let response = await fetch(url)
                if (response.status < 200 || response.status > 299) throw new Error(`There was an error fetching from ${url}`)
                let data = await response.json()
                setImageURLS(data)
            } catch (error) {
                console.error(error)
                setStatus('failure')
            }
        }
        if (camInfo) fetchImageURLS();
    }, [camInfo])

    return (
        <div className={`${styles["component__container"]}`}>
            {status === 'pending' &&
                <Loader type={'spinner'} />
            }
            {(status === 'success' && camInfo) &&
                <>
                    <h4>{camInfo.riverName}</h4>
                    <h5>{camInfo.location}</h5>
                    <div className={`${styles["overlay-controls__container"]}`}>
                        <h6>Overlay Reference Images</h6>
                        <div className={`${styles["overlay-radios"]}`}>
                            {camInfo.refImgMin &&
                                <div className={`${styles["radio-group"]}`}>
                                    <label htmlFor="refImgMin">Min</label>
                                    <input onClick={(e) => { setOverlayURL(camInfo[e.target.value]) }} type="radio" id="refImgMin" name="refImageRadio" value="refImgMin" />
                                </div>
                            }
                            {camInfo.refImgLow &&
                                <div className={`${styles["radio-group"]}`}>
                                    <label htmlFor="refImgLow">Low</label>
                                    <input onClick={(e) => { setOverlayURL(camInfo[e.target.value]) }} type="radio" id="refImgLow" name="refImageRadio" value="refImgLow" />
                                </div>
                            }
                            {camInfo.refImgMed &&
                                <div className={`${styles["radio-group"]}`}>
                                    <label htmlFor="refImgMed">Med</label>
                                    <input onClick={(e) => { setOverlayURL(camInfo[e.target.value]) }} type="radio" id="refImgMed" name="refImageRadio" value="refImgMed" />
                                </div>
                            }
                            {camInfo.refImgHigh &&
                                <div className={`${styles["radio-group"]}`}>
                                    <label htmlFor="refImgHigh">High</label>
                                    <input onClick={(e) => { setOverlayURL(camInfo[e.target.value]) }} type="radio" id="refImgHigh" name="refImageRadio" value="refImgHigh" />
                                </div>
                            }
                            {camInfo.refImgMax &&
                                <div className={`${styles["radio-group"]}`}>
                                    <label htmlFor="refImgMax">Max</label>
                                    <input onClick={(e) => { setOverlayURL(camInfo[e.target.value]) }} type="radio" id="refImgMax" name="refImageRadio" value="refImgMax" />
                                </div>
                            }
                        </div>
                        {overlayURL && 
                        <div className={`${styles["slider__container"]}`}>
                            <label htmlFor="opacitySlider">Current</label>
                            <input className={`${styles["opacity-slider"]}`} name="opacitySlider" id="opacitySlider" onChange={(e) => setOverlayOpacity(e.target.value)} value={overlayOpacity} type="range" min={0} max={1} step={.02} />
                            <label htmlFor="opacitySlider">Reference</label>
                        </div>
                        }
                    </div>
                    {imageURLS &&
                        <div className={`${styles["live-images__container"]}`}>
                            <ImageContainer overlayURL={overlayURL} overlayOpacity={overlayOpacity} imgURL={imageURLS[imageURLS.length - 1]} />
                            <ImageContainer overlayURL={overlayURL} overlayOpacity={overlayOpacity} imgURL={imageURLS[imageURLS.length - 2]} />
                        </div>
                    }
                </>
            }
            <hr/>
        </div>
    )
}