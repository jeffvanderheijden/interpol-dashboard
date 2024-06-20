// This is the first tutorial component.
// It explains to the user what this is and what they will be doing.

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Explanation from "./../Explanation/Explanation";
import Button from "./../Button/Button";

import { nextStep, pushStep, nextTutorial, tutorialSelector, stepSelector } from "../../state/tutorial";

const TutorialOne = () => {
    const dispatch = useDispatch();
    const totalSteps = 3;
    const tutorial = useSelector(tutorialSelector) === "tutorialOne";
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
                <Explanation explainer="agent">
                    {currentStep === 1 && (
                        <>
                            <h1>Agent X:</h1>
                            <p>
                                Gefeliciteerd, student. Je bent geselecteerd voor een geheime Interpol-missie binnen het GLR, genaamd "Operatie GreenLight." Een hacker gebruikt de schoolcomputers om bitcoins te minen en dit moet gestopt worden.
                            </p>
                            <br />
                            <p>
                                We gaan je stap voor stap opleiden tot een volwaardige "creative white hat" hacker. Dit zijn hackers die hun kennis gebruiken om systemen te beveiligen in plaats van te kraken.
                            </p>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <h1>Agent X:</h1>
                            <p>We vermoeden dat één van de docenten de voortvluchtige hacker is. Het is blijkbaar nogal een lolbroek. De hacker denkt overal mee weg te komen.</p>
                            <br />
                            <p>Er zijn namelijk puzzels, encrypties en slordige fouten achtergelaten die (wij denken) uiteindelijk zijn / haar identiteit zal doen ontrafelen.</p>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <h1>Agent X:</h1>
                            <p>Deze komende twee weken gaan jullie aan de slag om het kruimelspoor van de hacker te ontdekken, ontcijferen en oplossen. Hier staat een sappige beloning tegenover. Pas dus op: andere studenten zijn waarschijnlijk ook op die beloning uit!</p>
                        </>
                    )}
                    {currentStep === 4 && (
                        <>
                            <h1>Agent X:</h1>
                            <p>Denk goed na of je wel wilt samenwerken.. Het kan zomaar zijn dat zij er met de prijs vandoor gaan. En misschien probeert iemand je wel informatie te verstrekken, die niet 100% correct is..</p>
                            <br />
                            <p>Als laatste geef ik jullie deze tip mee: <strong>vertrouw niemand.</strong></p>
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

export default TutorialOne;