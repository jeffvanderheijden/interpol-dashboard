// This is the third tutorial component.
// It explains to the user what servers are

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Explanation from "./../Explanation/Explanation";
import Button from "./../Button/Button";

import { nextStep, pushStep, nextTutorial, tutorialSelector, stepSelector } from "../../state/tutorial";

const TutorialThree = () => {
    const dispatch = useDispatch();
    const totalSteps = 1;
    const tutorial = useSelector(tutorialSelector) === "tutorialThree";
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
                                We zijn nu verbonden met de servers van de school! Deze servers zijn computers die informatie opslaan en delen. Ze zijn verbonden met het internet en kunnen informatie uitwisselen met andere computers.
                            </p>
                            <br />
                            <p>
                                <a href="https://www.youtube.com/watch?v=V9K1l3OL-Iw&ab_channel=BrimiTech" target="_blank" rel="noreferrer">Klik op deze link</a> om meer te leren over servers.
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