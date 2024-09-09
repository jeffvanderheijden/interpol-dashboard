import React, { useEffect } from 'react';
import NoSSR from '../components/NoSSR/NoSSR';
import { checkSession } from "./../helpers/data/dataLayer";
import Login from "../components/Login/Login";
import Layout from "../components/Layout";
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
            hasSession && navigate('/admin-panel');
        });
    }, []);

    return (
        <NoSSR>
            <Layout>
                <SEO title="Login" />
                <Login />
            </Layout>
        </NoSSR>
    );
}

export default LoginPage;

export const Head = () => <title>Interpol - Login</title>