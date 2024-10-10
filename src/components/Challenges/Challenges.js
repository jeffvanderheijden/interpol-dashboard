import React, { useEffect, useState } from "react";
import "./Challenges.css";
import { getGroupChallenges } from "../../helpers/data/dataLayer";

const Challenges = ({
    groupId
}) => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        getGroupChallenges(groupId).then(data => {
            data.count > 1 ? setChallenges(data) : setChallenges([data]);
        });
    }, [groupId]);

    return (
        <div>
            {challenges.length > 0 && challenges.map(challenge => (
                <div>{challenge.name}</div>
            ))}
        </div>
    );
};

export default Challenges;