import React, { useRef } from "react";
import "./Login.css";

const Login = () => {
    const userRef = useRef(null);
    const passRef = useRef(null);

    // Example function to handle login
    async function submitForm(event) {
        event.preventDefault();
        try {
            const response = await fetch('https://api.interpol.sd-lab.nl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: userRef.current.value,
                    password: passRef.current.value
                }),
                credentials: 'include' // This ensures cookies are included in requests
            });
    
            const data = await response.json();
    
            if (data.status === 'success') {
                // Login successful, the cookie will be set by the server
                console.log('Login successful');
            } else {
                // Login failed
                console.log('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <form id="loginForm" onSubmit={(e) => { submitForm(e) }}>
            <input type="text" ref={userRef} placeholder="Studentnummer" />
            <input type="password" ref={passRef} placeholder="Wachtwoord" />
            <button type="submit" className="btn">Inloggen</button>
        </form>
    );
}

export default Login;