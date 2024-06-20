import React, { useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import "./../../assets/styles/Reset.css";
import "./../../assets/styles/App.css";
import "./../../assets/styles/Navigation.css";

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
  const [dateTime, setDateTime] = useState(updateDateTime());
  
  // Clock functionality
  useInterval(
    () => {
      setDateTime(updateDateTime())
    }, 10000
  )

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
  )
}

export default Layout
