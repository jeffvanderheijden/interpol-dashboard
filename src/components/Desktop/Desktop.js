import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from 'react-dnd';
import File from "./../../assets/images/text.png";
import InterpolLogo from "./../../assets/icons/InterpolLogo";
import { fileVisibleSelector } from "../../state/fileState";
import { pushTutorial } from "../../state/tutorial";

const Desktop = ({
    children,
    tabClick,
    windows,
    setWindows,
    onDrop
}) => {
    const dispatch = useDispatch();
    const fileVisible = useSelector(fileVisibleSelector);
    const iconRef = useRef(null);

    const [, drop] = useDrop(() => ({
        accept: 'window',
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            onDrop(item.id, left, top);
        },
        end: (item, monitor) => {
            if(!monitor.didDrop()) {
                console.log('Did not drop');
            }
        }
    }));

    useEffect(() => {
        const openFile = () => {
            tabClick({ name: "CodeEditor" });
            Object.assign(
                // target object which will be mutated and also is the return value.
                windows.find((mutate) => mutate.name === "CodeEditor"),
                // the source objects which properties will be assigned to the target object.
                {
                    open: true,
                    invisible: false,
                    selected: true
                }
            );
            const newWindows = [...windows]; // Because we return a mutated object, we need to create a new array
            setWindows(newWindows);
            dispatch(pushTutorial('tutorialEight'));
        };

        iconRef.current && iconRef.current.addEventListener("dblclick", openFile);        
    }, [fileVisible]); // TODO: fix dependency warning, for now leave this. Otherwise openFile will be bound to iconRef multiple times

    return (
        <div
            id="desktop"
            ref={drop}
        >
            <InterpolLogo />
            {fileVisible && (
                <div className="fileIconContainer" ref={iconRef}>
                    <img className="fileIcon" src={File} alt="file" />
                    definitely_not_a_virus.txt
                </div>
            )}
            {children}
        </div>
    );
};

export default Desktop;