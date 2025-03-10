//Components
import Loader from "./loader";
//Hooks
import { useState, useEffect } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck, faCalendarXmark } from "@fortawesome/free-solid-svg-icons";
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
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [camInfo, setCamInfo] = useState(null)
    const [imageURLS, setImageURLS] = useState([])
    const [overlayOpacity, setOverlayOpacity] = useState(.5);
    const [overlayURL, setOverlayURL] = useState('')
    let isCurrent = false;

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

    if (imageURLS.length > 0) {
        let lastImgDateAdjustedToMidnight= new Date(`${imageURLS[imageURLS.length - 1].slice(-14, -4)}T00:00:00`)
        let now = new Date()
        let  nowAdjustedToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if ( nowAdjustedToMidnight - lastImgDateAdjustedToMidnight < 172800000) { isCurrent = true }
        else {isCurrent = false}

    }

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
                    <h4 onClick={() => setIsDisplayed(prev => !prev)}>{isCurrent? <FontAwesomeIcon icon={faCalendarCheck} size="xs" style={{color: "#227722", transform: "translateY(-40%)"}} /> : <FontAwesomeIcon icon={faCalendarXmark} size="xs" style={{color: "grey", transform: "translateY(-40%)"}} />}&nbsp;{camInfo.riverName}&nbsp;<FontAwesomeIcon icon={faChevronRight} rotation={isDisplayed ? 90 : 0} /></h4>
                    <div className={`${styles["cam__container"]} ${isDisplayed ? styles["displayed"] : ""}`}>
                        <h5>{camInfo.location}</h5>
                        <div className={`${styles["overlay-controls__container"]}`}>
                            <h6>Overlay Reference Images</h6>
                            <div className={`${styles["overlay-radios"]}`}>
                                {camInfo.refImgMin &&
                                    <div className={`${styles["radio-group"]}`}>
                                        <label htmlFor={`${camName}refImgMin`}>Min</label>
                                        <input onClick={(e) => { setOverlayURL(camInfo[e.target.value]) }} type="radio" id={`${camName}refImgMin`} name="refImageRadio" value={`refImgMin`} />
                                    </div>
                                }
                                {camInfo.refImgLow &&
                                    <div className={`${styles["radio-group"]}`}>
                                        <label htmlFor={`${camName}refImgLow`}>Low</label>
                                        <input onClick={(e) => { setOverlayURL(camInfo[e.target.value]) }} type="radio" id={`${camName}refImgLow`} name="refImageRadio" value={`refImgLow`} />
                                    </div>
                                }
                                {camInfo.refImgMed &&
                                    <div className={`${styles["radio-group"]}`}>
                                        <label htmlFor={`${camName}refImgMed`}>Med</label>
                                        <input onClick={(e) => { setOverlayURL(camInfo[e.target.value]) }} type="radio" id={`${camName}refImgMed`} name="refImageRadio" value={`refImgMed`} />
                                    </div>
                                }
                                {camInfo.refImgHigh &&
                                    <div className={`${styles["radio-group"]}`}>
                                        <label htmlFor={`${camName}refImgHigh`}>High</label>
                                        <input onClick={(e) => { setOverlayURL(camInfo[e.target.value]) }} type="radio" id={`${camName}refImgHigh`} name="refImageRadio" value={`refImgHigh`} />
                                    </div>
                                }
                                {camInfo.refImgMax &&
                                    <div className={`${styles["radio-group"]}`}>
                                        <label htmlFor={`${camName}refImgMax`}>Max</label>
                                        <input onClick={(e) => { setOverlayURL(camInfo[e.target.value]) }} type="radio" id={`${camName}refImgMax`} name="refImageRadio" value={`refImgMax`} />
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
                    </div>
                </>
            }
            <hr className={`${styles["cam__hr"]}`} />
        </div>
    )
}