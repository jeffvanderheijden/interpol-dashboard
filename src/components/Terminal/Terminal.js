import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Terminal from 'terminal-in-react';
import { setIsIllegal, setHasVirus } from "../../state/illegalActivity";
import "./Terminal.css";
import Button from "./../Button/Button";

import { serverListSelector } from "../../state/serverList";
import { pushTutorial } from "../../state/tutorial";
import { setFileVisibleContent } from "../../state/fileState";

const CustomTerminal = () => {
    const dispatch = useDispatch();
    const isConnected = useSelector(serverListSelector);

    return (
        <>
            { !isConnected ? (
                <div className="terminalWarning">
                    <p>CONNECTION ERROR</p>
                    <p>Please connect to a server using the ServerList.</p>
                </div>
            ) : isConnected.province === "Zuid-Holland" ? (
                <Terminal
                    hideTopBar={true}
                    allowTabs={false}
                    color="green"
                    backgroundColor="black"
                    barColor="black"
                    style={{ fontWeight: 'bold', fontSize: '1em' }}
                    commands={{
                        'information': () => { window.open("https://www.youtube.com/watch?v=FfT8OfMpARM&ab_channel=Howfinity", "_blank") },
                        'help': () => { dispatch(pushTutorial('tutorialFive')); return `• information: shows a video about terminals. \n\n• clear: clear the terminal. \n\n• node run <filename>: runs a file through the terminal \n\n• arp -a: shows IP-addresses of all the devices connected to your network` },
                        'arp': (arg) => { return `CONNECTED DEVICES: \n\n140.120.0.0 \n140.120.17.10b \n140.120.33.46 \n140.120.4a.155 \n140.120.66.90 \n140.120.82.7 \n140.120.99.116 \n140.120.b5.51 \n140.120.110.160 \n140.120.128.97 \n192.168.211.194 \n140.120.15b.121 \n140.120.177.58 \n140.120.192.167` },
                        '192.168.211.194': () => { dispatch(pushTutorial('tutorialSix')); },
                        'echo': (arg) => { if(arg[1] !== "'virus'" || arg[2] !== ">" || arg[3] !== "definitely_not_a_virus.txt") { return "Invalid command."} else { dispatch(pushTutorial('tutorialSeven')); dispatch(setFileVisibleContent(true)); return "definitely_not_a_virus.txt created." }},
                        'node': (arg) => { if(arg[1] === "run" && arg[2] === "definitely_not_a_virus.txt") { dispatch(setHasVirus(true)); return "\n\n\n-------WARNING-------\nVirus detected... \nSystem compromised...\n---------------------" } else { return "Invalid command." } }
                    }}
                    msg={`A terminal is a text-based interface that allows you to interact with your computer's operating system by typing commands. It provides a way to run programs, manage files, and execute other tasks without using a graphical user interface (GUI). Think of it as a powerful way to communicate directly with your computer by typing instructions. \n \nFor more info: type 'information' and hit enter. After watching the video type 'help' for more commands.`}
                />
            ) : (
                <div className="terminalWarning">
                    <p>WARNING</p>
                    <p>Trying to connect to servers that you have no rights to is illegal!</p>
                    <br />
                    <p>Please click on the button below if you want to connect anyway.</p>
                    <br /><br />
                    <Button onClick={() => { dispatch(setIsIllegal(true)) }}>I understand the risks</Button>
                </div>
            )}
        </>
    )
}

export default CustomTerminal;