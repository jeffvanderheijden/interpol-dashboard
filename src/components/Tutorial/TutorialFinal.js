import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Explanation from "./../Explanation/Explanation";
import Button from "./../Button/Button";

import { nextStep, pushStep, nextTutorial, tutorialSelector, stepSelector } from "../../state/tutorial";

const TutorialFinal = () => {
    const dispatch = useDispatch();
    const totalSteps = 3;
    const tutorial = useSelector(tutorialSelector) === "tutorialFinal";
    const step = useSelector(stepSelector);

    const [currentStep, setCurrentStep] = useState(step);

    useEffect(() => {
        setCurrentStep(step);
    }, [tutorial, step]);

    const next = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            dispatch(nextStep());
        }
    }

    const close = () => {
        dispatch(pushStep(1));
        dispatch(nextTutorial());
    }

    return (
        <>
            {tutorial && (
                <Explanation explainer="agent">
                    {currentStep === 1 && (
                        <>
                            <h1>Agent X:</h1>
                            <p>
                                Mooi werk, agent. Je hebt de introductie succesvol doorlopen. Laat je docent weten dat je klaar bent.
                            </p>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <h1>Agent X:</h1>
                            <p>
                                Je gaat nu in een groep van 3 studenten aan de slag om de hacker te ontmaskeren. Wacht tot de volgende twee studenten klaar zijn met de introductie en klik vervolgens op "Create Team".
                            </p>
                        </>
                    )}
                    {currentStep < totalSteps && (
                        <Button className="tutorialButton" onClick={() => { next() }}>Volgende</Button>
                    )}
                    {currentStep === totalSteps && (
                        <Button className="tutorialButton" onClick={() => { close() }}>Sluiten</Button>
                    )}
                </Explanation>
            )}
        </>
    )
}

export default TutorialFinal;