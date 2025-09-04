import React, { useEffect } from 'react';
import NoSSR from '../components/NoSSR/NoSSR';
import SEO from "../components/SEO";
import LocalStorage from '../helpers/scripts/localStorage';

const IndexPage = () => {

    // Remove localstorage to restart the training
    useEffect(() => {
        LocalStorage.delete('interpolStart');
    }, []);

    return (
        <NoSSR>
            <SEO title="Training restart" />
            <div id="index">
                <h1>Training restarted</h1>
            </div>
        </NoSSR>
    );
}

export default IndexPage;

export const Head = () => <title>Training restart</title>