import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Explanation from "./../Explanation/Explanation";
import Button from "./../Button/Button";

import { nextStep, pushStep, nextTutorial, tutorialSelector, stepSelector } from "../../state/tutorial";

const TutorialFinal = () => {
    const dispatch = useDispatch();
    const totalSteps = 2;
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
                                Mooi werk, agent. Je hebt de introductie succesvol doorlopen. Dankzij het virus dat je hebt geupload weten we nu dat de hacker gebruik maakt van een <a href="https://www.youtube.com/watch?v=s0sgiY93w9c&ab_channel=ESET" rel="noreferrer" target="_blank">"BotNet".</a>
                            </p>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <h1>Agent X:</h1>
                            <p>
                                Je gaat nu in een groep van 4 studenten aan de slag om de hacker te ontmaskeren. Je zult per groep een "Node" van het BotNet gaan uitschakelen. Pas als we alle bots hebben kunnen vernietigen weten we waar de hacker zich exact bevindt. Begin met het maken van een team met 3 andere studenten door te klikken op: "CreateTeam".
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