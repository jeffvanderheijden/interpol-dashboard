import React from "react";
import "./StudentInfo.css";

const StudentInfo = ({
    student,
    logout
}) => {
    return (
        <div class="studentInfo">
            <div>{student.name}</div>
            <div id="studentNumber">{student.studentNumber}</div>
            <div id="class">{student.class}</div>      
            {student.team && (
                <div>
                    <h2>Team: {student.team}</h2>
                    <img src={`https://api.interpol.sd-lab.nl/${student.teamImage}`} alt="Team" />
                </div>
            )}
            <button onClick={() => { logout() }}>Log out</button>
        </div>
    )
}

export default StudentInfo;