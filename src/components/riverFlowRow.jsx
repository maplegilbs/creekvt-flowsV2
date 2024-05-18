//Styles
import styles from "./riverFlowRow.module.scss"

export default function RiverFlowRow({ riverInfo }) {

    return (
        <div>FlowRow</div>
        // <tr>
        //     <td className="name"><a href={`https://creekvt.com/${flows.riverURL}`}>{flows.riverName}</a>
        //         <br /><br />
        //         <p className="diff">{flows.riverDifficulty}</p></td>
        //     <td className="level">
        //         <div className="levelContainer">

        //             <div className="levelInfo">{flows.gauge1.currentLvl }<span className="mobile-show"><br><br>{flows.gauge1upperLimit }} <hr> {{ this.gauges.gauge1.lowerLimit }}</span>
        //             </div>

        //                 <div className="flowBar" style="background-image:linear-gradient(0deg, {{this.gauges.gauge1.flowColor}} {{this.gauges.gauge1.percentile}}, white 1%">
        //                     <span className="curLvl"><div className="top arrow {{this.gauges.gauge1.trend}}"></div>{{ this.gauges.gauge1.lvlChng }}/hr<br /><div className="bottom arrow {{this.gauges.gauge1.trend}}"></div></span>
        //                 </div>

        //             </div>
        //             </td>
        //                 <td className="limits mobile-hide">{{ this.gauges.gauge1.upperLimit }} <hr> {{ this.gauges.gauge1.lowerLimit }}</td>
        //                 <td className="gaugeName mobile-hide">{{ this.gauges.gauge1.name }}</td>
        //                 <td className="updateTime mobile-hide">{{ this.gauges.gauge1.reportTime }}</td>
        //                 <td className="gaugeName mobile-show">{{ this.gauges.gauge1.name }}<br><br>{{ this.gauges.gauge1.reportTime }}</td>

        //                 </tr>

    )
}