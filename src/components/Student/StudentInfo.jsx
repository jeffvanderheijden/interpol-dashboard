import React from "react";
import Button from "./../Button/Button";
import "./StudentInfo.css";

const StudentInfo = ({
    student,
    logout
}) => {
    return (
        <div class="studentInfo">
            { console.log(student) }
            {student.team && (
                <div id="team">
                    <h2>{student.team}</h2>
                    <img src={`https://api.interpol.sd-lab.nl/${student.teamImage}`} alt="Team" />
                </div>
            )}
            {student && student.name && (
                <div id="student">
                    <div id="studentName">{student.name}</div>
                    <div id="studentNumber">{student.studentNumber}</div>
                    <div id="class">{student.class.substring(0, 3)}</div>     
                    <Button onClick={() => { logout() }}>Log out</Button> 
                </div>
            )}
        </div>
    )
}

export default StudentInfo;