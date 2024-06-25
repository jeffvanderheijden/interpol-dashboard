// This is the fifth tutorial component.
// It explains to the user how to use a command to display IP addresses connected to the server network

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Explanation from "./../Explanation/Explanation";
import Button from "./../Button/Button";

import { nextStep, pushStep, nextTutorial, tutorialSelector, stepSelector } from "../../state/tutorial";

const TutorialSix = () => {
    const dispatch = useDispatch();
    const totalSteps = 2;
    const tutorial = useSelector(tutorialSelector) === "tutorialSix";
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
                                Goed gedaan! Dit lijkt inderdaad op een IP adres dat niet van het GLR afkomstig is. Nu we dit IP adres weten kunnen we onze malafide bestanden naar de hacker toe sturen en zo zijn / haar identiteit achterhalen!
                            </p>
                        </>
                    )}
                    {currentStep === 2 && ( 
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Om dit te doen moeten we een bestand aanmaken met een virus erin. Dit kan met het commando <code>echo 'virus' > definitely_not_a_virus.txt</code>. Hiermee maken we een bestand aan met de naam definitely_not_a_virus.txt en de inhoud "virus".
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

export default TutorialSix;