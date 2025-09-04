import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import NoSSR from '../components/NoSSR/NoSSR';
import Window from "../components/Window/Window";
import { checkSession, getStudentData, getAdditionalStudentData, logout } from "./../helpers/data/dataLayer";
import Globe from "../components/Globe/GlobeComp";
import CreateTeam from "../components/Team/CreateTeam";
import ScoreBoard from "../components/Score/ScoreBoard";
import Layout from "../components/Layout";
import StudentInfo from '../components/Student/StudentInfo';

const DashboardPage = () => {
    const [windows, setWindows] = useState([]);
    const [student, setStudent] = useState({});

    // Check if user is logged in as student or teacher 
    useEffect(() => {
        checkSession("STUDENT").then(hasSession => {
            // if not logged in, go to login page
            !hasSession && navigate('/login');
            // If logged in as student, get data
            hasSession && getStudentData().then(data => {
                if (!data) {
                    console.error("Error getting student data");
                } else {
                    // get additional data from our own database based on studentnumber
                    getAdditionalStudentData(data[0].samaccountname[0]).then(additionalData => {
                        if (!additionalData) {
                            console.warn('No additional data, student does not exist in interpol database.');
                            setStudent({
                                name: data[0].name[0],
                                class: data[0].description[0],
                                studentNumber: data[0].samaccountname[0]
                            });
                            setWindows([
                                { name: "CreateTeam", open: false, invisible: false, selected: false, left: 20, top: 20 }  
                                // + 100px per new window
                            ]);
                        } else {
                            setStudent({
                                name: data[0].name[0],
                                class: data[0].description[0],
                                studentNumber: data[0].samaccountname[0],
                                team: additionalData.name,
                                teamImage: additionalData.image_url
                            });
                            setWindows([
                                { name: "LeaderBoard", open: false, invisible: false, selected: false, left: 20, top: 20 },
                                { name: "ScoreBoard", open: false, invisible: false, selected: false, left: 120, top: 120 },
                            ]);
                        }
                    });
                }
            });
        });
        checkSession("DOCENT").then(hasSession => {
            // if teacher, go to admin panel
            hasSession && window.location.replace("https://admin.interpol.sd-lab.nl");
        });
    }, []);

    return (
        <NoSSR>
            <Layout
                windows={windows}
                setWindows={setWindows}
            >
                {windows.map((window, i) => (
                    <div key={`window${i}`}>
                        {window.open && (
                            <Window
                                window={window}
                                windows={windows}
                                setWindows={setWindows}
                            >
                            {window.name === "LeaderBoard" && (
                                // <Globe />
                                <iframe
                                    src="https://leaderboard.interpol.sd-lab.nl"
                                    title="Leaderboard"
                                    style={{
                                        width: "100%",
                                        height: "100vh",
                                        border: "none",
                                    }}
                                />
                            )}
                            {window.name === "CreateTeam" && (
                                <CreateTeam 
                                    windows={windows}
                                    setWindows={setWindows}
                                    studentData={student}
                                />
                            )}
                            {window.name === "ScoreBoard" && (
                                <ScoreBoard />
                            )}
                            </Window>
                        )}
                    </div>
                ))}
                {student && (
                    <StudentInfo 
                        student={student}
                        logout={logout}
                    />
                )}
            </Layout>
        </NoSSR>
    );
}

export default DashboardPage;

export const Head = () => <title>Interpol - Dashboard</title>