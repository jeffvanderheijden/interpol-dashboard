import React from "react";
import "./StudentInfo.css";

const StudentInfo = ({
    student,
    logout
}) => {
    return (
        <div class="studentInfo">
            <div>Welkom agent: {student.name} - {student.studentNumber}</div>
            <div>{student.class}</div>
            <button onClick={() => { logout() }}>Log out</button>
        </div>
    )
}

export default StudentInfo;