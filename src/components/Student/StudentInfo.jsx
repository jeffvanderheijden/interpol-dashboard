import React from "react";
import "./StudentInfo.css";

const StudentInfo = ({
    student,
    logout
}) => {
    return (
        <div class="studentInfo">
            {student.team && (
                <div id="team">
                    <h2>Team: {student.team}</h2>
                    <img src={`https://api.interpol.sd-lab.nl/${student.teamImage}`} alt="Team" />
                </div>
            )}
            {student && student.name && (
                <div id="student">
                    <div>{student.name}</div>
                    <div id="studentNumber">{student.studentNumber}</div>
                    <div id="class">{student.class.substring(0, 3)}</div>      
                    <button onClick={() => { logout() }}>Log out</button>
                </div>
            )}
        </div>
    )
}

export default StudentInfo;