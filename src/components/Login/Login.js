import React, { useRef } from "react";
import "./Login.css";

const Login = () => {
    const userRef = useRef(null);
    const passRef = useRef(null);

    // Example function to handle login
    async function submitForm(event) {
        event.preventDefault();
        const response = await fetch('https://api.interpol.sd-lab.nl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',  // This is important for sending/receiving cookies
            body: JSON.stringify({ username: userRef.current.value, password: passRef.current.value }),
        });

        const data = await response.json();
        if (data.success) {
            console.log('Login successful');
            // Handle success (e.g., redirect to another page)
        } else {
            console.log('Login failed');
            // Handle failure (e.g., show an error message)
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