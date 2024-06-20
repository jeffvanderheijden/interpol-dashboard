// This is the fourth tutorial component.
// It explains to the user what the terminal / console is

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Explanation from "./../Explanation/Explanation";
import Button from "./../Button/Button";

import { nextStep, pushStep, nextTutorial, tutorialSelector, stepSelector } from "../../state/tutorial";

const TutorialThree = () => {
    const dispatch = useDispatch();
    const totalSteps = 3;
    const tutorial = useSelector(tutorialSelector) === "tutorialFour";
    const step = useSelector(stepSelector);

    const [currentStep, setCurrentStep] = useState(step);

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
                                Nu we verbonden zijn met de servers van de school, kunnen we met deze servers communiceren. Dit doen we met behulp van "de terminal" (ook wel console of command line genoemd).
                            </p>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Een terminal (console / command line) is een programma waarmee je tekstcommando's kunt invoeren die door het besturingssysteem (of softwareprogramma's) worden uitgevoerd. Het is een manier om de computer opdrachten te geven zonder gebruik te maken van een grafische gebruikersinterface (GUI), zoals vensters, knoppen en muisklikken.
                            </p>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Open de terminal door onderin op de knop te klikken. Volg de instructies die in de terminal worden gegeven. 
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

export default TutorialThree;