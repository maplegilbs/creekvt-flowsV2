//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons"
//Styles
import styles from "./gaugesSortBar.module.scss"

export default function GaugesSortBar({ setSortedBy, setIsModalActive }) {

    function handleChange(e) {
        setSortedBy(e.target.value)
    }
    return (
        <div className={`${styles['sort-options__container']}`}>
            <h3>Sort By</h3>
            <select onChange={handleChange}>
                <option value="curLevel">Level</option>
                <option value="riverName">River</option>
                <option value="changePerHr">Trend</option>
                <option value="difficulty">Difficulty</option>
                <option value="quality">Quality</option>
                <option value="location">Location</option>
            </select>
            <h5 onClick={()=>setIsModalActive(true)}>How to read this table &nbsp;<FontAwesomeIcon icon={faCircleQuestion} size="lg" /></h5>
        </div>
    )

}