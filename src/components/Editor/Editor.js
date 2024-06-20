import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { pushTutorial } from '../../state/tutorial';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/theme/dracula.css';
import './Editor.css';
import { Controlled as ControlledEditorComponent } from 'react-codemirror2';


const Editor = ({ 
    editorState, 
    setEditorState,
    windows,
    setWindows
}) => {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const editorErrorRef = useRef(null);

    const handleChange = (editor, data, value) => {
        setEditorState(value);
    }

    const checkCode = () => {
        // Close the codeEditor window
        Object.assign(
            // target object which will be mutated and also is the return value.
            windows.find((mutate) => mutate.name === "CodeEditor"),
            // the source objects which properties will be assigned to the target object.
            {
                open: false,
                invisible: false,
                selected: false
            }
        );
        const newWindows = [...windows]; // Because we return a mutated object, we need to create a new array
        setWindows(newWindows);
        dispatch(pushTutorial('tutorialNine'));
    }

    useEffect(() => {
        let timerId = null;
        window && window.addEventListener("keydown", (e) => {
            if ((window.navigator.userAgent.includes('Mac') !== false ? (e.metaKey && e.key === "s") : (e.key === "s" && e.ctrlKey))) {
                e.preventDefault();
                // Checking if code exists in editor
                if (!editorRef.current) return;
                const codeToCheck = editorRef.current.props.value;
                const checkOne = codeToCheck.includes('function getLocation(res) {');
                const checkTwo = codeToCheck.includes('function showPosition(position, res) {');
                const checkThree = codeToCheck.includes('const location = getLocation("https://127.0.0.1:8000");');
                const checkFour = codeToCheck.includes('showPosition(location, "https://127.0.0.1:8000");');
                const finalCheck = (checkOne && checkTwo && checkThree && checkFour);
                if (finalCheck) {
                    checkCode();
                } else {
                    if (editorErrorRef && editorErrorRef.current.className !== "editorError show") {
                        editorErrorRef.current.className = "editorError show";
                    }
                    if (timerId === null && editorErrorRef && editorErrorRef.current && editorErrorRef.current.className === "editorError show") {
                        timerId = setTimeout(() => {
                            editorErrorRef.current.className = "editorError";
                            timerId = null;
                        }, 4000);
                    }
                }
            }
        }, false);
        return () => { clearTimeout(timerId) };
    }, []);

    return (
        <div className="editorContainer">
            <ControlledEditorComponent
                ref={editorRef}
                onBeforeChange={handleChange}
                value={editorState}
                className="codeMirrorWrapper"
                options={{
                    readOnly: false,
                    lineWrapping: false,
                    lint: true,
                    mode: "javascript",
                    lineNumbers: true,
                    theme: "dracula"
                }}
            />
            <div className="editorError" ref={editorErrorRef}>
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 9V13" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17.0195V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <b style={{fontWeight: "700"}}>Compile error:</b> Code is not correct <i>(or as expected.)</i>
            </div>
        </div>
    )
}
export default Editor