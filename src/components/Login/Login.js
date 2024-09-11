import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import { checkSession, login } from "./../../helpers/data/dataLayer";
import InterpolLogo from "./../../assets/icons/InterpolLogo";
import "./Login.css";

const Login = () => {
    // LDAP login form
    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', e.target.elements.username.value);
        formData.append('password', e.target.elements.password.value);
        
        login(formData);
    }

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
        <div id="loginWrapper">            
            <form id="loginForm" onSubmit={(e) => { submitForm(e) }}>
                <InterpolLogo />
                <input type="text" id="username" placeholder="Studentennummer" />
                <input type="password" id="password" placeholder="Wachtwoord" />
                <button type="submit" className="btn"><span>Inloggen</span></button>
            </form>
        </div>
    );
}

export default Login;