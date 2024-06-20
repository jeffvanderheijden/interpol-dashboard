import React from "react";
import "./Explanation.css";
import Agent from "./../../assets/images/agent.jpg";
import AI from "./../../assets/images/ai.jpg";

const Explanation = ({
    children,
    explainer
}) => {
    return (
        <div id="explanation">
            <div id="explanationInner" className="programWindow">
                <div id="explanationContent"> 
                    <div id="agent">
                        <img src={explainer === 'AI' ? AI : Agent} alt="Interpol agent" />
                    </div>
                    <div className="text">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explanation;