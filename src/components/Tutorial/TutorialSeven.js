// This is the fifth tutorial component.
// It explains to the user how to use a command to display IP addresses connected to the server network

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Explanation from "./../Explanation/Explanation";
import Button from "./../Button/Button";

import { nextStep, pushStep, nextTutorial, tutorialSelector, stepSelector } from "../../state/tutorial";

const TutorialSeven = () => {
    const dispatch = useDispatch();
    const totalSteps = 3;
    const tutorial = useSelector(tutorialSelector) === "tutorialSeven";
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
                <Explanation explainer="AI">
                    {currentStep === 1 && (
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Je ziet nu rechtsbovenin, op het bureaublad het bestand dat we net hebben aangemaakt. Uiteraard moeten we nog wel onze code toevoegen aan dit bestand. Dit kunnen we doen door het bestand te openen in een code editor.
                            </p>
                        </>
                    )}
                    {currentStep === 2 && ( 
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Je zult tijdens je studie grotendeels gebruik maken van de code editor genaamd Visual Studio Code. Dit is een programma waarin je code kunt schrijven en bewerken. Leer <a href="https://www.youtube.com/watch?v=B-s71n0dHUk&ab_channel=VisualStudioCode" target="_blank" rel="noreferrer">hier</a> meer over Visual Studio Code.
                            </p>
                        </>
                    )}
                    {currentStep === 3 && ( 
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Nu we weten hoe een code editor werkt, laten we het definitely_not_a_virus.txt bestand openen in de code editor. Dubbelklik op het bestand op het bureaublad om het te openen in een code editor.
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

export default TutorialSeven;