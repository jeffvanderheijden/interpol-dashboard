// This is the first tutorial component.
// It explains to the user what this is and what they will be doing.

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Explanation from "./../Explanation/Explanation";
import Button from "./../Button/Button";

import { pushStep, pushTutorial, tutorialSelector, stepSelector } from "../../state/tutorial";

const TutorialTwo = () => {
    const dispatch = useDispatch();
    const totalSteps = 1;
    const tutorial = useSelector(tutorialSelector) === "tutorialTwo";
    const step = useSelector(stepSelector);
    
    const [currentStep] = useState(step);

    const close = () => {
        dispatch(pushStep(1));
        dispatch(pushTutorial(undefined));
    }

    return (
        <>
            {tutorial && (
                <Explanation explainer="AI">
                    {currentStep === 1 && (
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Hallo, agent! Mijn naam is EE-AY. Ik ben een AI die je zal helpen met uitleg van het systeem. Om te beginnen moeten we connectie maken met de schoolservers.
                            </p>
                            <br />
                            <p>
                                Klik op de ServerList knop en selecteer de correcte provincie. Klik vervolgens op de Connect knop om verbinding te maken.
                            </p>
                        </>
                    )}
                    {currentStep === totalSteps && (
                        <Button className="tutorialButton" onClick={() => { close() }}>Sluiten</Button>
                    )}
                </Explanation>
            )}
        </>
    )
}

export default TutorialTwo;