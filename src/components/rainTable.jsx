//Styles
import styles from "./rainTable.module.scss"

export default function RainTable() {

    return (
        <div className={`${styles["component__container"]}`}>
            <table className={`${styles[""]}`}>
                <thead>
                    <tr>
                        <th rowSpan={2}>Location<br /><span style={{fontSize: ".7rem" }}>Report Time</span></th>
                        <th rowSpan={2}>Source</th>
                        <th colSpan={5}>Rain Accumulation</th>
                    </tr>
                    <tr>
                        <th className={"mobile-hide"}>1hr</th>
                        <th>3hr</th>
                        <th>6hr</th>
                        <th>12hr</th>
                        <th className={"mobile-hide"}>24hr</th>
                    </tr>

                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    )
}