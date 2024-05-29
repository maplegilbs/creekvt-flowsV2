import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"


export function sortByLevel(sortArray) {
    sortArray.sort((a, b) => {
        //Sort rivers without a level status to the bottom
        if (!a.levelStatus && b.levelStatus) return 1
        else if (a.levelStatus && !b.levelStatus) return -1
        //Sort rivers with a level status of running to the top
        else if (a.levelStatus === "running" && b.levelStatus !== "running") return -1
        //Sort rivers with a level status of too high below those with a level status of "running" and above anything else
        else if (a.levelStatus === "too high" && b.levelStatus !== "too high" && b.levelStatus == "running") return 1
        else if (a.levelStatus === "too high" && b.levelStatus !== "too high" && b.levelStatus !== "running") return -1
        //Sort rivers with a level status of too low below everything else
        else if (a.levelStatus === "too low" && b.levelStatus !== 'too low') return 1
        //Then sort by name
        if (a.name > b.name) return 1
        else if (a.name < b.name) return -1
        return 0
    })
    if (sortArray.findIndex(riv => riv.levelStatus === "running") !== -1) {
        sortArray.unshift({ text: "Running", color: "linear-gradient(45deg, rgb(100,155,100) 70%, rgb(80,130,80))" });
    }
    if (sortArray.findIndex(riv => riv.levelStatus === "too high") !== -1) {
        sortArray.splice([sortArray.findIndex(riv => riv.levelStatus === "too high")], 0, { text: "Too High", color: "linear-gradient(45deg, rgb(160,45,45) 70%, rgba(150,35,35))" });
    }
    if (sortArray.findIndex(riv => riv.levelStatus === "too low") !== -1) {
        sortArray.splice([sortArray.findIndex(riv => riv.levelStatus === "too low")], 0, { text: "Too Low", color: "linear-gradient(45deg, rgb(225,170,35) 70%, rgb(205,150,15))" });
    }
    sortArray.splice([sortArray.findIndex(riv => riv.levelStatus === null)], 0, { text: "No Min/Max Established", color: "linear-gradient(45deg, rgb(170,170,170) 70%, rgb(120,120,120))" });
}

export function sortByChange(sortArray) {
    sortArray.sort((a, b) => {
        if(!a.gauge1ChangePerHr) return 1
        if (a.gauge1ChangePerHr > b.gauge1ChangePerHr) return -1
        else if (a.gauge1ChangePerHr < b.gauge1ChangePerHr) return 1
        else return 0;
    })
    console.log(sortArray[0].gauge1Trend)
    if (sortArray.findIndex(riv => riv.gauge1Trend === "rising") !== -1) {
        sortArray.unshift({ text: "Rising", color: "linear-gradient(315deg, #4e647b, #293b46)" });
    }
    if (sortArray.findIndex(riv => riv.gauge1Trend === "steady") !== -1) {
        sortArray.splice([sortArray.findIndex(riv => riv.gauge1Trend === "steady")], 0, { text: "Steady", color: "linear-gradient(315deg, #4e647b, #293b46)" });
    }
    if (sortArray.findIndex(riv => riv.gauge1Trend === "falling") !== -1) {
        sortArray.splice([sortArray.findIndex(riv => riv.gauge1Trend === "falling")], 0, { text: "Falling", color: "linear-gradient(315deg, #4e647b, #293b46)" });
    }
}

export function sortByDifficulty(sortArray) {
    sortArray.sort((a, b) => {
        if (a.difficultyNum > b.difficultyNum) return 1
        else if (a.difficultyNum < b.difficultyNum) return -1
        if (a.name > b.name) return 1
        else if (a.name < b.name) return -1
        return 0
    })
    sortArray.unshift({ text: "Class III", color: "linear-gradient(315deg, #4e647b, #293b46)" });
    sortArray.splice([sortArray.findIndex(riv => riv.difficultyNum > 8)], 0, { text: "Class IV", color: "linear-gradient(315deg, #4e647b, #293b46)" });
    sortArray.splice([sortArray.findIndex(riv => riv.difficultyNum > 11)], 0, { text: "Class V", color: "linear-gradient(315deg, #4e647b, #293b46)" });
}

export function sortByLocation(sortArray) {
    sortArray.sort((a, b) => {
        if (a.location.toLowerCase() === "northwest" && b.location.toLowerCase() !== "northwest") return -1
        else if (a.location.toLowerCase() === "northeast" && b.location.toLowerCase() !== "northeast") return -1
        else if (a.location.toLowerCase() === "central" && b.location.toLowerCase() !== "central") return -1
        else if (a.location.toLowerCase() === "south") return 1
        if (a.name > b.name) return 1
        else if (a.name < b.name) return -1
        return 0
    })
    console.log(sortArray)
    sortArray.splice([sortArray.findIndex(riv => riv.location === "Northwest")], 0, { text: "Northwest", color: "linear-gradient(315deg, #4e647b, #293b46)" });
    sortArray.splice([sortArray.findIndex(riv => riv.location === "Northeast")], 0, { text: "Northeast", color: "linear-gradient(315deg, #4e647b, #293b46)" });
    sortArray.splice([sortArray.findIndex(riv => riv.location === "Central")], 0, { text: "Central", color: "linear-gradient(315deg, #4e647b, #293b46)" });
    sortArray.splice([sortArray.findIndex(riv => riv.location === "South")], 0, { text: "South", color: "linear-gradient(315deg, #4e647b, #293b46)" });
}

export function sortByQuality(sortArray) {
    sortArray.sort((a, b) => {
        console.log(a.quality, b.quality)
        let qualityRef = { "A+": 10, "A": 9, "A-": 8, "B+": 7, "B": 6, "B-": 5, "C+": 4, "C": 3, "C-": 2 }
        if (qualityRef[a.quality] < qualityRef[b.quality]) { return 1 }
        else if (qualityRef[a.quality] > qualityRef[b.quality]) return -1;
        if (a.name > b.name) return 1
        else if (a.name < b.name) return -1
        return 0
    })
    sortArray.splice([sortArray.findIndex(riv => ["A+"].includes(riv.quality))], 0, { text: <><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} /></>, color: "linear-gradient(315deg, #4e647b, #293b46)" });
    sortArray.splice([sortArray.findIndex(riv => ["A", "A-", "B+"].includes(riv.quality))], 0, { text: <><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "rgba(200,200,200,.5)" }} /></>, color: "linear-gradient(315deg, #4e647b, #293b46)" });
    sortArray.splice([sortArray.findIndex(riv => ["B", "B-"].includes(riv.quality))], 0, { text: <><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "rgba(200,200,200,.5)", }} /><FontAwesomeIcon icon={faStar} style={{ color: "rgba(200,200,200,.5)" }} /></>, color: "linear-gradient(315deg, #4e647b, #293b46)" });
    sortArray.splice([sortArray.findIndex(riv => ["C+", "C", "C-"].includes(riv.quality))], 0, { text: <><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} /><FontAwesomeIcon icon={faStar} style={{ color: "rgba(200,200,200,.5)" }} /><FontAwesomeIcon icon={faStar} style={{ color: "rgba(200,200,200,.5)" }} /><FontAwesomeIcon icon={faStar} style={{ color: "rgba(200,200,200,.5)" }} /></>, color: "linear-gradient(315deg, #4e647b, #293b46)" });
}

