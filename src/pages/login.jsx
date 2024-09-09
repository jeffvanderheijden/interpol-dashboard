import React, { useEffect } from 'react';
import { navigate } from "@reach/router";
import NoSSR from '../components/NoSSR/NoSSR';
import { checkSession } from "./../helpers/data/dataLayer";
import Login from "../components/Login/Login";
import SEO from "../components/SEO";

const LoginPage = () => {

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
            <SEO title="Login" />
            <Login />
        </NoSSR>
    );
}

export default LoginPage;

export const Head = () => <title>Interpol - Login</title>