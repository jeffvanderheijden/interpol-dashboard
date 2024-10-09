import React, { useState, useEffect } from "react";
import "./ScoreBoard.css";
import { getGroupsByClass } from "../../helpers/data/dataLayer";

const ScoreBoard = () => {
    const [klassen, setKlassen] = useState(["d1a", "d1b", "d1c", "d1d", "d1e", "d1f"]);
    const [klas, setKlas] = useState("d1a");
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getGroupsByClass(klas).then(data => {
            data.count > 1 ? setGroups(data) : setGroups([data]);
        });
    }, [klas]);
    return (
        <div id="scoreBoard">
            <ul className={"classSwitch"}>
                {klassen.map(klasje => (
                    <li className={klasje === klas ? "active" : ""} onClick={() => { setKlas(klasje) }}>{klasje}</li>
                ))}
            </ul>
            <div className="list">
                {groups && groups.map(group => (
                    <div>{group.name}</div>
                ))}
            </div>
        </div>
    )
}

export default ScoreBoard;