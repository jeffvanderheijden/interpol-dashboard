import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Explanation from "./../Explanation/Explanation";
import Button from "./../Button/Button";

import { nextStep, pushStep, nextTutorial, tutorialSelector, stepSelector } from "../../state/tutorial";

const TutorialNine = () => {
    const dispatch = useDispatch();
    const totalSteps = 4;
    const tutorial = useSelector(tutorialSelector) === "tutorialNine";
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
                                Awesome! Het bestand is nu klaar om naar de hacker gestuurd te worden. Let's give him a taste of his or her own medicine. We willen het bestand op de server van de hacker uploaden. Dat gaan we als volgt doen..
                            </p>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Om het bestand te uploaden naar de server kunnen we wederom gebruik maken van de Terminal. Maar er is software ontwikkeld dat dit makkelijker voor ons maakt, een zogehete FTP-client. Leer <a href="https://www.youtube.com/watch?v=wig1szO7en8&ab_channel=ExaVault" target="_blank" rel="noreferrer">hier</a> meer over FTP (File Transfer Protocol). 
                            </p>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Nu we weten wat FTP (File Transfer Protocol) is en hoe het communiceerd met een server, gaan we ons eigen FTP-client gebruiken om het virus bestand te uploaden naar de server van de hacker (We hebben zijn IP-adres namelijk!).
                            </p>
                        </>
                    )}
                    {currentStep === 4 && (
                        <>
                            <h1>EE-AY:</h1>
                            <p>
                                Open als eerst het FTP-client programma onderin de task bar. <i>(<b style={{ fontWeight: "700" }}>WAARSCHUWING:</b> Wat je ook doet, voer niet het bestand uit via de terminal! Anders wordt het virus geactiveerd op jouw computer).</i>
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

export default TutorialNine;