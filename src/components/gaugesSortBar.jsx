//Styles
import styles from "./gaugesSortBar.module.scss"

export default function GaugesSortBar({ setSortedBy }) {

    function handleChange(e) {
        setSortedBy(e.target.value)
    }
    return (
        <div className={`${styles['sort-options__container']}`}>
            <h3>Sort By</h3>
            <select onChange={handleChange}>
                <option value="curLevel">Current Level</option>
                <option value="riverName">Name</option>
                <option value="changePerHr">Trend</option>
                <option value="difficulty">Difficulty</option>
                <option value="quality">Quality</option>
                <option value="location">Location</option>
            </select>
        </div>
    )

}