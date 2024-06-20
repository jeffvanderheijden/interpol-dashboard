import React, { useState } from "react";
import GaugeComponent from "react-gauge-component";
import { useInterval } from "./../../helpers/hooks/useInterval";

const ConnectionSpeed = () => {
    const [speed, setSpeed] = useState(900); // [kbit/s]

    const kbitsToMbits = (value) => {
        if (value >= 1000) {
            value = value / 1000;
            if (Number.isInteger(value)) {
                return value.toFixed(0) + ' mbit/s';
            } else {
                return value.toFixed(1) + ' mbit/s';
            }
        } else {
            return value.toFixed(0) + ' kbit/s';
        }
    }

    // Fake connection speed
    useInterval(
        () => {
            setSpeed(Math.floor(Math.random() * 3000));
        }, 2000
    );

    return (
        <>
            <GaugeComponent
                arc={{
                    nbSubArcs: 150,
                    colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
                    width: 0.3,
                    padding: 0.003
                }}
                labels={{
                    valueLabel: {
                        fontSize: 40,
                        formatTextValue: kbitsToMbits
                    },
                    tickLabels: {
                        type: "outer",
                        ticks: [
                            { value: 100 },
                            { value: 200 },
                            { value: 300 },
                            { value: 400 },
                            { value: 500 },
                            { value: 600 },
                            { value: 700 },
                            { value: 800 },
                            { value: 900 },
                            { value: 1000 },
                            { value: 1500 },
                            { value: 2000 },
                            { value: 2500 },
                            { value: 3000 },
                        ],
                        valueConfig: {
                            formatTextValue: kbitsToMbits
                        }
                    }
                }}
                value={speed}
                maxValue={3000}
            />
            <span>Connection speed</span>
        </>
    )
}

export default ConnectionSpeed;