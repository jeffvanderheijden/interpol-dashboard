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

            // Parse the response as JSON
            const login = await response.json();
            console.log('Login response:', login);

            // Handle the login response (e.g., save session data, navigate to another page)
            // Example: check if login was successful based on the response
            if (login.success) {
                console.log('Login successful!');
                // You could redirect or perform other actions here
            } else {
                console.error('Login failed:', login.message);
            }
        } catch (error) {
            console.error('Error creating team:', error);
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