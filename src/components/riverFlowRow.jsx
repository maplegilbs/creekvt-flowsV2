//Styles
import styles from "./riverFlowRow.module.scss"

export default function RiverFlowRow({ riverInfo }) {

    return (
        <tr>
            <td>{riverName}</td>
            <td>{discharge}</td>
            <td>{min-max}</td>
            <td>{gauge}</td>
            <td>{readingtime}</td>
        </tr>
    )
}