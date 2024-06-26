import React, { useState } from 'react';
import NoSSR from '../components/NoSSR/NoSSR';
import Window from "../components/Window/Window";
import Globe from "../components/Globe/GlobeComp";
import CreateTeam from "../components/Team/CreateTeam";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TutorialFinal from "../components/Tutorial/TutorialFinal";

const DashboardPage = () => {
    const [windows, setWindows] = useState([
        { name: "CreateTeam", open: false, invisible: false, selected: false, left: 20, top: 20 },
        { name: "SateliteView", open: false, invisible: false, selected: false, left: 60, top: 60 }
    ]);

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
                            {window.name === "SateliteView" && (
                                <Globe />
                            )}
                            {window.name === "CreateTeam" && (
                                <CreateTeam />
                            )}
                            </Window>
                        )}
                    </div>
                ))}    
                <SEO title="Dashboard" />
                <TutorialFinal />
            </Layout>
        </NoSSR>
    );
}

export default DashboardPage;

export const Head = () => <title>Interpol - Dashboard</title>