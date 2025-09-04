import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import { useDispatch, useSelector } from 'react-redux';
import { illegalActivitySelector } from '../state/illegalActivity';
import { fileVisibleContent, setFileStateContent, fileVisibleSelector } from '../state/fileState';
import { checkSession } from "./../helpers/data/dataLayer";
import NoSSR from '../components/NoSSR/NoSSR';
import Window from "../components/Window/Window";
import ServerList from "../components/ServerList/ServerList";
import Globe from "../components/Globe/GlobeComp";
import Editor from "../components/Editor/Editor";
import FTPClient from "../components/FTPClient/FTPClient";
import CustomTerminal from "../components/Terminal/Terminal";
import TutorialOne from "../components/Tutorial/TutorialOne";
import TutorialTwo from "../components/Tutorial/TutorialTwo";
import TutorialThree from "../components/Tutorial/TutorialThree";
import TutorialFour from "../components/Tutorial/TutorialFour";
import TutorialFive from "../components/Tutorial/TutorialFive";
import TutorialSix from "../components/Tutorial/TutorialSix";
import TutorialSeven from "../components/Tutorial/TutorialSeven";
import TutorialEight from "../components/Tutorial/TutorialEight";
import TutorialNine from "../components/Tutorial/TutorialNine";
import TutorialFinal from "../components/Tutorial/TutorialFinal";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import IllegalActivity from "../components/IllegalActivity/IllegalActivity";

const IntroPage = () => {
  const dispatch = useDispatch();
  const hasIllegalActivity = useSelector(illegalActivitySelector);
  const initialValue = useSelector(fileVisibleContent);
  const fileVisible = useSelector(fileVisibleSelector);

  const [editorState, setEditorState] = useState(initialValue);
  const [windows, setWindows] = useState([
    { name: "ServerList", open: false, invisible: false, selected: false, left: 20, top: 20 },
    { name: "Terminal", open: false, invisible: false, selected: false, left: 60, top: 60 },
    { name: "CodeEditor", open: false, invisible: true, selected: false, left: 100, top: 100 },
    { name: "FTPClient", open: false, invisible: false, selected: false, left: 140, top: 140 },
    { name: "SateliteView", open: false, invisible: true, selected: false, left: 180, top: 180 }
  ]);

  // Check if user is logged in as student or teacher
  useEffect(() => {
    checkSession("STUDENT").then(hasSession => {
        // if student, go to dashboard
        hasSession && navigate('/dashboard');
    });
    checkSession("DOCENT").then(hasSession => {
        // if teacher, go to admin panel
        hasSession && window.location.replace("https://admin.interpol.sd-lab.nl");
    });
  }, []);

  useEffect(() => {
    dispatch(setFileStateContent(editorState));
  }, [editorState, dispatch]);

  const hideEditor = () => {
    if (window.name === "CodeEditor" && !fileVisible) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <NoSSR>
      {hasIllegalActivity ? (
        <IllegalActivity />
      ) : (
        <Layout
          windows={windows}
          setWindows={setWindows}
        >
          <SEO title="Home" />
          {windows.map((window, i) => (
            <div key={`window${i}`}>
              {window.open && hideEditor() && (
                <Window
                  window={window}
                  windows={windows}
                  setWindows={setWindows}
                >
                  {window.name === "ServerList" && (
                    <ServerList />
                  )}
                  {window.name === "Terminal" && (
                    <CustomTerminal />
                  )}
                  {window.name === "SateliteView" && (
                    <Globe />
                  )}
                  {window.name === "CodeEditor" && (
                    <Editor 
                      editorState={editorState}
                      setEditorState={setEditorState}
                      windows={windows}
                      setWindows={setWindows}
                    />
                  )}                  
                  {window.name === "FTPClient" && (
                    <FTPClient />
                  )}
                </Window>
              )}
            </div>
          ))}    
          {/* all tutorial components are loaded here. */ }
          <TutorialOne />
          <TutorialTwo />
          <TutorialThree />
          <TutorialFour />
          <TutorialFive />
          <TutorialSix />
          <TutorialSeven />
          <TutorialEight />
          <TutorialNine />
          <TutorialFinal />
        </Layout>
      )}
    </NoSSR>
  );
}

export default IntroPage;

export const Head = () => <title>Hacker training</title>