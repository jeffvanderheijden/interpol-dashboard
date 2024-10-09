import React, { useState, useEffect } from "react";
import { getGroupsByClass } from "../../helpers/data/dataLayer";

const ScoreBoard = () => {
    const [klas, setKlas] = useState("d1a");
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getGroupsByClass(klas).then(data => {
            data.count > 1 ? setGroups(data) : setGroups([data]);
        });
    }, [klas]);
    return (
        <div>
            <ul>
                <li onClick={() => { setKlas("d1a") }}>D1A</li>
                <li onClick={() => { setKlas("d1b") }}>D1B</li>
                <li onClick={() => { setKlas("d1c") }}>D1C</li>
                <li onClick={() => { setKlas("d1d") }}>D1D</li>
                <li onClick={() => { setKlas("d1e") }}>D1E</li>
                <li onClick={() => { setKlas("d1f") }}>D1F</li>
            </ul>
            {groups && groups.map(group => (
                <div>{group.name}</div>
            ))}
        </div>
    )
}

export default ScoreBoard;