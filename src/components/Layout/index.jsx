import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useGlitch } from 'react-powerglitch';

import "./../../assets/styles/Reset.css";
import "./../../assets/styles/App.css";
import "./../../assets/styles/Navigation.css";
import "./Layout.css";

import { virusSelector } from "./../../state/illegalActivity";

import { updateDateTime } from "./../../helpers/scripts/currentDateTime";
import { useInterval } from "./../../helpers/hooks/useInterval";

import Button from "./../Button/Button";
import Desktop from "./../Desktop/Desktop";

import Battery from "./../../assets/icons/Battery";
import Internet from "./../../assets/icons/Internet";
import Shield from "./../../assets/icons/Shield";
import SkullBones from "./../../assets/icons/SkullBones";

const Layout = ({
  children,
  windows,
  setWindows
}) => {
  const hasVirus = useSelector(virusSelector);
  const glitch = useGlitch();
  const [dateTime, setDateTime] = useState(updateDateTime());
  const [compMessage, setCompMessage] = useState(false);
  
  // Clock functionality
  useInterval(
    () => {
      setDateTime(updateDateTime())
    }, 10000
  )

  useEffect(() => {
    setTimeout(() => {
      hasVirus && setCompMessage(true);
    }, 8000);
  }, [hasVirus])

  const tabClick = (tab) => {
    windows.map((mutate => mutate.selected = false));
    Object.assign(
      // target object which will be mutated and also is the return value.
      windows.find((mutate) => mutate.name === tab.name),
      // the source objects which properties will be assigned to the target object.
      {
        open: true,
        selected: true
      }
    );
    const newWindows = [...windows]; // Because we return a mutated object, we need to create a new array
    setWindows(newWindows); // Otherwise React won't detect the change
  }

  const handleDrop = (name, left, top) => {
    setWindows((prevWindows) =>
      prevWindows.map((window) =>
        window.name === name ? { ...window, left, top, selected: true } : { ...window, selected: false }
      )
    );
  };

  return (
    <>
      {hasVirus ? (
        <div id="mainWindow" ref={glitch.ref}>
          <div id="topNav">
            <div className="container">
              <SkullBones />
            </div>
            <div className="container timeContainer">
              <div className="time">{dateTime}</div>
            </div>
            <div className="container">
              <Shield opacity={0.4} />
              <Battery />
              <Internet />
            </div>
          </div>
          <DndProvider backend={HTML5Backend}>
            <Desktop
              tabClick={tabClick}
              onDrop={handleDrop}
              windows={windows}
              setWindows={setWindows}
            >
              {children}
            </Desktop>
          </DndProvider>
          <div id="bottomNav">
            {windows.map((tab, i) => (
              <div key={`navitem-${i}`}>
                {!tab.invisible && (
                  <Button
                    key={`windowTab${i}`}
                    className={tab.selected ? 'selected' : ''}
                    onClick={() => { tabClick(tab) }}
                  >
                    {tab.name}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div id="mainWindow">
          <div id="topNav">
            <div className="container">
              <SkullBones />
            </div>
            <div className="container timeContainer">
              <div className="time">{dateTime}</div>
            </div>
            <div className="container">
              <Shield opacity={0.4} />
              <Battery />
              <Internet />
            </div>
          </div>
          <DndProvider backend={HTML5Backend}>
            <Desktop
              tabClick={tabClick}
              onDrop={handleDrop}
              windows={windows}
              setWindows={setWindows}
            >
              {children}
            </Desktop>
          </DndProvider>
          <div id="bottomNav">
            {windows.map((tab, i) => (
              <div key={`navitem-${i}`}>
                {!tab.invisible && (
                  <Button
                    key={`windowTab${i}`}
                    className={tab.selected ? 'selected' : ''}
                    onClick={() => { tabClick(tab) }}
                  >
                    {tab.name}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {compMessage && (
        <div className="systemCompromised">
          <h1>
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9V13" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17.0195V17" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            SYSTEM COMPROMISED...
          </h1>
        </div>  
      )}
    </>
  )
}

export default Layout
