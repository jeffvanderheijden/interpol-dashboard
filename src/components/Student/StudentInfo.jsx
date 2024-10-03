import React from "react";
import "./StudentInfo.css";
import { api } from "./../../helpers/data/dataLayer"

const StudentInfo = ({
    student,
    logout
}) => {
    return (
        <div class="studentInfo">
            <div>Welkom agent: {student.name} - {student.studentNumber}</div>
            <div>{student.class}</div>
            <button onClick={() => { logout() }}>Log out</button>
            {student.team && (
                <div>
                    <h2>Team: {student.team}</h2>
                    <img src={`${api}/${student.teamImage}`} alt="Team" />
                </div>
            )}
        </div>
    )
}

export default StudentInfo;