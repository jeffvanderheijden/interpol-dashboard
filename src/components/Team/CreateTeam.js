import React, { useState, useEffect, useRef } from "react";
import "./CreateTeam.css";

const CreateTeam = () => {
    const [camera, setCamera] = useState(false);
    const cameraRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const takePhotoRef = useRef(null);

    const showCamera = (e) => {
        e.preventDefault();
        setCamera(true);
    }

    const getVideoStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef && videoRef.current) {
                let video = videoRef.current;
                video.srcObject = stream;
                video.addEventListener("loadedmetadata", () => {
                    video.play();
                });
            } else {
                return;
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getVideoStream();
    }, [])

        return (
            <div id="createTeam">
                <h1>Create Team</h1>
                <p>
                    You are now going to work in a group of 3 students to unmask the hacker.
                </p>
                <div className="teamImage" onClick={(e) => { showCamera(e) }} onKeyDown={(e) => { showCamera(e) }}>
                    <img src="https://via.placeholder.com/150" alt="Team" />
                </div>
                <form action="/api/new-team">
                    <input type="hidden" id="image" name="image" />
                    <input type="text" placeholder="Team naam" />
                    <div>
                        <label>
                            <span>Student 1</span>
                            <input className="half" type="text" id="student1" name="student1" placeholder="Student voornaam" />
                        </label>
                        <input className="half" type="text" placeholder="Student nummer" />
                    </div>
                    <div>
                        <label>
                            <span>Student 2</span>
                            <input className="half" type="text" id="student2" name="student2" placeholder="Student voornaam" />
                        </label>
                        <input className="half" type="text" placeholder="Student nummer" />
                    </div>
                    <div>
                        <label>
                            <span>Student 3</span>
                            <input className="half" type="text" id="student3" name="student3" placeholder="Student voornaam" />
                        </label>
                        <input className="half" type="text" placeholder="Student nummer" />
                    </div>
                    <label>
                        <span>Klas</span>
                        <input type="text" id="klas" name="klas" placeholder="Studenten klas" />
                    </label>
                    <input type="submit" value="Create Team" />
                </form>
                {camera && (
                    <div>
                        <canvas id="canvas" ref={canvasRef} />
                        <div className="output">
                            <img id="photo" alt="The screen capture will appear in this box." />
                        </div>

                        <div className="camera" ref={cameraRef}>
                            <video ref={videoRef} id="video">Video stream not available.</video>
                            <button ref={takePhotoRef} type="button" id="startbutton" className="btn">Take photo</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    export default CreateTeam;