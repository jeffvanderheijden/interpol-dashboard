import React, { useEffect } from 'react';
import Link from 'gatsby-link';
import { navigate } from "@reach/router";
import NoSSR from '../components/NoSSR/NoSSR';
import { checkSession } from "./../helpers/data/dataLayer";
import SEO from "../components/SEO";
import InterpolLogo from "./../assets/icons/InterpolLogo";

const IndexPage = () => {

    // Check if user is logged in as student or teacher
    useEffect(() => {
        checkSession("STUDENT").then(hasSession => {
            // if student, go to dashboard
            hasSession && navigate('/dashboard');
        });
        checkSession("DOCENT").then(hasSession => {
            // if teacher, go to admin panel
            hasSession && window.location.replace("https://admin.interpol.sd-lab.nl");
        });
    }, []);

    return (
        <NoSSR>
            <SEO title="Welcome, student." />
            <div id="index">
                <InterpolLogo />
                <h1>Welcome to Interpol</h1>
                <button className="btn"><span><Link to="/intro">Start training</Link></span></button>
                <button className="btn"><span><Link to="/login">Go to dashboard</Link></span></button>
                <button className="btn"><span><a href="https://admin.interpol.sd-lab.nl">Admin panel</a></span></button>
            </div>
        </NoSSR>
    );
}

export default IndexPage;

export const Head = () => <title>Interpol</title>