//Components
import ForecastQPF from "../components/forecastsQPF"
import ForecastText from "../components/forecastsText"
//Contexts
import { RiverContext } from "../pages/innerLayout"
//Hooks
import { useState, useEffect, useContext, useRef } from "react"
//Styles
import styles from "./forecasts.module.scss"

export default function Forecasts() {
    const [status, setStatus] = useState('pending') //pending, success, failure
    const riverData = useContext(RiverContext).riverData
    const [selectedRiver, setSelectedRiver] = useState(null)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const riverSelectRef = useRef();

    useEffect(() => {
        function scrollAction() {
            if (!isScrolled && riverSelectRef.current.getBoundingClientRect().y < 10) {
                setIsScrolled(true)
                window.removeEventListener('scroll', scrollAction)
            }
            if(isScrolled && riverSelectRef.current.getBoundingClientRect().y > 10){
                setIsScrolled(false)
                window.removeEventListener('scroll', scrollAction)
            }
        }
        window.addEventListener('scroll', scrollAction)
        return (()=>{
            window.removeEventListener('scroll', scrollAction)
        })
}, [isScrolled])


useEffect(() => {
    if (riverData && selectedRiver) {
        setSelectedLocation([selectedRiver.putinLat, selectedRiver.putinLon])
    }
    if (riverData && !selectedRiver) {
        setSelectedRiver(riverData.find(river => river.name.toLowerCase() === "mad river (lower)"))
    }

}, [riverData, selectedRiver])

function handleRiverChange(e) {
    setStatus('pending')
    setSelectedRiver(riverData.find(river => river.name.toLowerCase() == e.target.value.toLocaleLowerCase()))
}

return (
    <div className={`${styles["page__container"]}`}>
        <div ref={riverSelectRef} className={`${styles["river-select__container"]} ${isScrolled ? styles["full-width"] : ""}`}>
            <label htmlFor="river-select">Selected River &nbsp;</label>
            <br className={`mobile-show`}/>
            {selectedRiver &&
                <select value={selectedRiver.name} id="river-select" onChange={handleRiverChange}>
                    {riverData &&
                        riverData.map(river => <option key={river.id} value={river.name}>{river.name}</option>)
                    }
                </select>
            }
        </div>
        <div className={`${styles["inner__container"]}`}>
            <ForecastText selectedLocation={selectedLocation} status={status} setStatus={setStatus} />
            <ForecastQPF selectedLocation={selectedLocation} />
        </div>
    </div>
)
}