import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { navigate } from "gatsby";
import "./FTPClient.css";
import ConnectingLoader from "./../Loader/ConnectingLoader";
import { pushTutorial } from "../../state/tutorial";
import { setFileVisibleContent } from "../../state/fileState";

const FTPClient = () => {
    const dispatch = useDispatch();
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const hostRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const ftpErrorRef = useRef(null);

    useEffect(() => {
        if (hostRef && hostRef.current && usernameRef && usernameRef.current && passwordRef && passwordRef.current) {
            // Check if the user has entered the correct credentials
            const checkOne = hostRef.current.value === "192.168.211.194";
            const checkTwo = usernameRef.current.value === "admin";
            const checkThree = passwordRef.current.value === "25#9ke!";        
            // For debugging
            // const checkOne = hostRef.current.value === "";
            // const checkTwo = usernameRef.current.value === "";
            // const checkThree = passwordRef.current.value === "";
            const fakeLogin = setTimeout(() => {
                if (checkOne && checkTwo && checkThree) {
                    setConnected(true);
                    if (ftpErrorRef && ftpErrorRef.current && ftpErrorRef.current.className === "ftpError show") {
                        ftpErrorRef.current.className = "ftpError";
                    }
                } else {
                    if (ftpErrorRef && ftpErrorRef.current.className !== "ftpError show") {
                        ftpErrorRef.current.className = "ftpError show";
                    }
                }
                setLoading(false);
            }, 4000);
            return () => { clearTimeout(fakeLogin) }
        }
    }, [loading]);

    useEffect(() => {
        if (uploading === false) return;

        dispatch(pushTutorial('tutorialFinal'));
        dispatch(setFileVisibleContent(false));
        const pushToDash = setTimeout(() => {
            setUploading(false);
            setUploaded(true);
        }, 3000);
        return () => { clearTimeout(pushToDash) }
    }, [uploading])

    return (
        <div id="ftpClient">
            {!connected ? (
                <div className="ftpLogin">
                    <input type="text" placeholder="Host" ref={hostRef} />
                    <input type="text" placeholder="Username" ref={usernameRef} />
                    <input type="password" placeholder="Password" ref={passwordRef} />
                    <button onClick={() => { setLoading(true) }}>Connect</button>
                </div>
            ) : (
                <div className="loggedIn">
                    <p>Connected to:</p>
                    <p>192.168.211.194</p>
                    <button onClick={() => { setConnected(false) }}>Disconnect</button>
                </div>
            )}
            {connected ? (
                <div className="ftpFiles">
                    <div className="local">
                        <div className="directory">User/Agent/Desktop/</div>
                        <div className="files">
                            <div className={`file ${!uploaded && selected ? 'selected' : ''}`} onClick={() => { setSelected(true) }}>
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="14px" height="14px">
                                    <path d="M 6 2 C 4.9057453 2 4 2.9057453 4 4 L 4 20 C 4 21.094255 4.9057453 22 6 22 L 18 22 C 19.094255 22 20 21.094255 20 20 L 20 8 L 14 2 L 6 2 z M 6 4 L 13 4 L 13 9 L 18 9 L 18 20 L 6 20 L 6 4 z"/>
                                </svg> 
                                definitely_not_a_virus.txt
                            </div>
                        </div>
                    </div>
                    <div className="server">
                        <div className="directory">/Server/httpdocs/</div>
                        <div className="files">
                            {uploaded && (
                                <div className={'file'} onClick={() => { setSelected(true) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="14px" height="14px">
                                        <path d="M 6 2 C 4.9057453 2 4 2.9057453 4 4 L 4 20 C 4 21.094255 4.9057453 22 6 22 L 18 22 C 19.094255 22 20 21.094255 20 20 L 20 8 L 14 2 L 6 2 z M 6 4 L 13 4 L 13 9 L 18 9 L 18 20 L 6 20 L 6 4 z"/>
                                    </svg> 
                                    definitely_not_a_virus.txt
                                </div>
                            )}
                        </div>
                    </div>
                    {!uploaded && (
                        <div className="ftpActions">
                            <button onClick={() => { setUploading(true) }} className={`${selected ? '' : 'disabled'}`}>Upload</button>
                        </div>
                    )}
                    {uploading && (
                        <div className="connecting">
                            <ConnectingLoader />
                            <span>Uploading</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="connectMessage">
                    {loading ? (
                        <div className="connecting">
                            <ConnectingLoader />
                            <span>Connecting</span>
                        </div>
                    ) : (
                        <p>Connect to the server to start uploading files.</p>
                    )}
                </div>
            )}
            <div className="ftpError" ref={ftpErrorRef}>
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 9V13" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17.0195V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <b style={{fontWeight: "700"}}>Auth error:</b> could not connect to host<i>(check username / password)</i>
            </div>
        </div>
    );
}

export default FTPClient;