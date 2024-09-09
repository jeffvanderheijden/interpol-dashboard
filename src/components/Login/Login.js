import React from "react";
import "./Login.css";

const Login = () => {
    // LDAP login form
    async function submitForm(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', e.target.elements.username.value);
        formData.append('password', e.target.elements.password.value);
        
        try {
            // Make the POST request to the API
            const response = await fetch('https://api.interpol.sd-lab.nl/api/create-session', {
                method: 'POST',
                body: formData,
            });

            // Check if the response is OK (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const login = await response.json();

            // Check if the login was successful
            if (login.message === 'Docent ingelogd' && login.session) {
                sessionStorage.setItem('dashboard', { ...login.session });
            } else if(login.message === 'Student ingelogd' && login.session) {
                sessionStorage.setItem('dashboard', { ...login.session });
            } else {
                console.error('Er ging iets fout met inloggen:', login.message);
                sessionStorage.clear();
            }
        } catch (error) {
            console.error('Error creating team:', error);
            sessionStorage.clear();
        }
    }

    return (
        <form id="loginForm" onSubmit={(e) => { submitForm(e) }}>
            <input type="text" id="username" placeholder="Studentnummer" />
            <input type="password" id="password" placeholder="Wachtwoord" />
            <button type="submit" className="btn">Inloggen</button>
        </form>
    );
}

export default Login;