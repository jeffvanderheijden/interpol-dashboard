// This is the fifth tutorial component.
// It explains to the user how to use a command to display IP addresses connected to the server network

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Explanation from "./../Explanation/Explanation";
import Button from "./../Button/Button";

import { nextStep, pushStep, nextTutorial, tutorialSelector, stepSelector } from "../../state/tutorial";

const TutorialFive = () => {
    const dispatch = useDispatch();
    const totalSteps = 3;
    const tutorial = useSelector(tutorialSelector) === "tutorialFive";
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
                                Door het "help" commando uit te voeren, zien we een lijst met commando's die we kunnen gebruiken in de terminal met een korte uitleg over wat ze doen.
                            </p>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Het commando "arp -a" geeft ons een lijst van alle apparaten die verbonden zijn met hetzelfde netwerk als onze server. De GLR apparaten hebben allemaal een soort gelijk IP adres. Leer <a target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=8zEVA-Bxs-0&ab_channel=Cisco">hier</a> meer over wat een IP adres is.
                            </p>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Omdat alle apparaten van het GLR een soortgelijk IP-adres hebben, kunnen we waarschijnlijk de hacker identificeren aan de hand van het IP-adres. Voer nu het commando "arp -a" uit in de terminal om een lijst van alle apparaten die verbonden zijn met hetzelfde netwerk als onze server te zien. Typ daarna het IP-adres (dat afwijkt van de andere) in de terminal.
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

export default TutorialFive;