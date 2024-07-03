import React, { useState, useEffect, useRef } from "react";
import TakePhoto from "./../../assets/images/take-photo.png";
import "./CreateTeam.css";

const CreateTeam = () => {
    const [camera, setCamera] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [image, setImage] = useState(null);
    const cameraRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const takePhotoRef = useRef(null);
    const finalImageRef = useRef(null);

    const getVideoStream = async () => {
        try {
            clearPicture();
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            if (videoRef && videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.addEventListener("loadedmetadata", () => {
                    videoRef.current.play();
                });
            } else {
                return;
            }
        } catch (err) {
            console.error(err)
        }
        
        if (videoRef && videoRef.current) {
            videoRef.current.addEventListener("canplay", () => {
                if (!streaming) {
                    setHeight(videoRef.current.videoHeight / (videoRef.current.videoWidth / width));

                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.

                    if (isNaN(height)) {
                        setHeight(width / (4 / 3));
                    }

                    videoRef.current.setAttribute("width", width);
                    videoRef.current.setAttribute("height", height);
                    canvasRef.current.setAttribute("width", width);
                    canvasRef.current.setAttribute("height", height);
                    setStreaming(true);
                }
            }, false);
        }
    }

    function clearPicture() {
        if (canvasRef && canvasRef.current && photoRef && photoRef.current) {
            const context = canvasRef.current.getContext("2d");
            context.fillStyle = "#000";
            context.fillRect(0, 0, canvasRef.current.offsetHeight, canvasRef.current.offsetWidth);

            const data = canvasRef.current.toDataURL("image/png");
            photoRef.current.setAttribute("src", data);
        }
    }

    const takePicture = (e) => {
        if (canvasRef && canvasRef.current && photoRef && photoRef.current && videoRef && videoRef.current && finalImageRef && finalImageRef.current) {
            const context = canvasRef.current.getContext("2d");
            if (width && height) {
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                context.drawImage(videoRef.current, 0, 0, width, height);

                const data = canvasRef.current.toDataURL("image/png");
                setImage(data);
                photoRef.current.setAttribute("src", data);
                finalImageRef.current.setAttribute("src", data);
            } else {
                clearPicture();
            }
        }
        e.preventDefault();
    }

    const uploadPicture = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('https://api.jeffvanerheijden.nl/api/upload-team-image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('Error uploading the image:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading the image:', error);
        }
    };

    useEffect(() => {
        camera && getVideoStream();
    }, [camera]);

    useEffect(() => {
        setWidth(200);
    }, []);

    return (
        <div id="createTeam">
            <h1>Create Team</h1>
            <p>
                You are now going to work in a group of 4 students to unmask the hacker.
            </p>
            <div className="teamImage" onClick={(e) => { setCamera(true) }} onKeyDown={(e) => { setCamera(true) }}>
                <img src={TakePhoto} ref={finalImageRef} alt="Team" />
            </div>
            <form action="/api/new-team">
                <input type="hidden" id="image" name="image" />
                <input type="text" id="teamName" placeholder="Team naam" />
                <input type="text" id="klas" name="klas" placeholder="Klas" />
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
                <div className="buttonWrapper">
                    <button onClick={() => { uploadPicture() }} type="button" className="btn"><span>Create team</span></button>
                </div>
            </form>
            {camera && (
                <div className="camera" ref={cameraRef}>
                    <video ref={videoRef} id="video">Video stream not available.</video>
                    <div className="buttonWrapper">
                        <button onClick={(e) => { takePicture(e) }} ref={takePhotoRef} type="button" id="startbutton" className="btn"><span>Take photo</span></button>
                        <button onClick={() => { setCamera(false) }} type="button" id="savebutton" className="btn"><span>Save photo</span></button>
                    </div>
                    <div className="output">
                        <div className="imgWrapper">
                            <img ref={photoRef} id="photo" alt="Team image" />
                        </div>
                        <canvas id="canvas" ref={canvasRef} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateTeam;