import React, { useState, useEffect } from "react";
import "./ScoreBoard.css";
import { getGroupsByClass } from "../../helpers/data/dataLayer";

const ScoreBoard = () => {
    const [klassen] = useState(["d1a", "d1b", "d1c", "d1d", "d1e", "d1f"]);
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
                    <li className={klasje === klas ? "active" : ""} onClick={() => { setKlas(klasje) }}>{klasje.toUpperCase()}</li>
                ))}
            </ul>
            {groups && groups.length > 0 && (
                <div className="list">
                    {groups.map(group => (
                        <div>
                            <span>{group.name}</span>
                            <span>{group.points}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ScoreBoard;