import React from "react";
import { useDrag } from 'react-dnd';
import Close from "./../../assets/icons/Close";
import './Window.css';

const Window = ({
    children,
    window,
    windows,
    setWindows
}) => {
    const closeWindow = (e) => {
        e.stopPropagation();
        Object.assign(
            // target object which will be mutated and also is the return value.
            windows.find((mutate) => mutate.name === window.name),
            // the source objects which properties will bee assigned to the target object.
            {
                open: false,
                selected: false
            }
        );
        // Find the next open window and set it to selected
        // TODO: Fix this mess.. make sure we know when which window was opened
        // So when we close one, we can revert to the one opened before that
        let newWindows = [];
        if(windows[windows.findIndex(findOpen => findOpen.open === true)]) {
            windows[windows.findIndex(findOpen => findOpen.open === true)].selected = true;
        }
        newWindows = [...windows];
        setWindows(newWindows);
    }

    // Draggable functionality
    const id = window.name;
    const left = window.left;
    const top = window.top;
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'window',
        item: { id, left, top },
    }), [window.left, window.top]);

    // Push window z-index on click
    const pushWindowFront = () => {
        windows.map((mutate => mutate.selected = false));
        Object.assign(
            // target object which will be mutated and also is the return value.
            windows.find((mutate) => mutate.name === window.name),
            // the source objects which properties will bee assigned to the target object.
            {
                selected: true
            }
        );
        const newWindows = [...windows];
        setWindows(newWindows);
    }

    return (
        <div 
            role="button" 
            tabIndex={0}
            className={`programWindow ${window.selected ? 'selected' : ''}`}
            onClick={() => { pushWindowFront() }}
            onKeyDown={() => { pushWindowFront() }}
            ref={drag}
            style={{
                opacity: isDragging ? 0 : 1,
                zIndex: isDragging ? 100 : 1,
                left: left,
                top: top,
                width: window.name === "CodeEditor" ? "600px" : window.name === "LeaderBoard" ? "600px" : "400px",
                height: window.name === "CodeEditor" ? "500px" : window.name === "ServerList" ? "450px" : window.name === "CreateTeam" ? "612px" : window.name === "LeaderBoard" ? "600px" : "400px"
            }}
        >
            <div className="programWindowTop">
                <div className="programName">{window.name}.exe</div>
                <div 
                    role="button" 
                    aria-label="Close window"
                    tabIndex={0}
                    onClick={(e) => { closeWindow(e) }}
                    onKeyDown={(e) => { closeWindow(e) }}
                >
                    <Close />
                </div>
            </div>
            { children }
        </div>
    )
}

export default Window;