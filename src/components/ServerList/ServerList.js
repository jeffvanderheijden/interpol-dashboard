import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Netherlands from "@svg-maps/netherlands";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./ServerList.css";
import Button from "../Button/Button";
import ConnectingLoader from "./../Loader/ConnectingLoader";
import ConnectionSpeed from "./../Gauge/ConnectionSpeed";

import { serverListSelector, setConnection } from "../../state/serverList";
import { pushTutorial } from "../../state/tutorial";

const ServerList = () => {
    const connection = useSelector(serverListSelector);

    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(connection ? connection : null);

    const dispatch = useDispatch();

    const IPAddresses = {
        "Zuid-Holland": "146.124.69.121",
        "Noord-Holland": "83.14.218.124",
        "Utrecht": "52.105.37.215",
        "Noord-Brabant": "124.1.167.72",
        "Zeeland": "229.254.188.133",
        "Flevoland": "164.20.189.251",
        "Friesland": "121.129.70.177",
        "Groningen": "206.184.12.86",
        "Overijssel": "174.22.247.164",
        "Drenthe": "73.94.202.209",
        "Gelderland": "196.11.53.65",
        "Limburg": "210.89.44.243",
    }

    const selectProvince = (value) => {
        setSelected(value.target.attributes.name.value);
    }

    const nextStep = (province, IPAddress) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setConnected({ province, IPAddress });
            dispatch(setConnection({ province, IPAddress }));
            province === "Zuid-Holland" && dispatch(pushTutorial("tutorialThree"));
        }, 4000);
    }

    const disconnect = () => {
        setConnected(false);
        dispatch(setConnection(false));
    }

    return (
        <div id="serverList">
            {!connected && (
                <>
                    <SVGMap
                        map={Netherlands}
                        onLocationFocus={(value) => selectProvince(value)}
                    />
                    {selected && (
                        <div id="selectedProvince">
                            <div className="info">
                                <span>Provincie:</span> <span>{selected}</span>
                                <span>IP Adres:</span> <span>{IPAddresses[selected]}</span>
                            </div>
                            <Button onClick={() => { nextStep(selected, IPAddresses[selected]) }}>Connect</Button>
                        </div>
                    )}
                </>
            )}
            {loading && (
                <div className="connecting">
                    <ConnectingLoader />
                    <span>Connecting</span>
                </div>
            )}
            {connected && (
                <div id="connectedScreen">
                    <ul>
                        <li>Status:</li> 
                        <li>
                            <div className="ring-container">
                                <div className="ringring"></div>
                                <div className="circle"></div>
                            </div>
                            <span className="connectedDot">Connected</span>
                        </li>
                        <li>{connected.province}:</li> 
                        <li>{connected.IPAddress}</li>
                    </ul>
                    <ConnectionSpeed />
                    <Button onClick={() => { disconnect() }}>Disconnect</Button>
                </div>
            )}
        </div>
    )
}

export default ServerList;