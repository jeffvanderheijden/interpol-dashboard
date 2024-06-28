import React, { useRef } from "react";
import "./Login.css";

const Login = () => {
    const userRef = useRef(null);
    const passRef = useRef(null);

    const submitForm = (e) => {
        e.preventDefault();
        fetch('https://api.interpol.sd-lab.nl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: userRef.current.value, password: passRef.current.value }),
            credentials: 'include'  // This is important for sending cookies
        })
        .then(response => response)
        .then(data => {
            if (data.success) {
                // Handle successful login
                console.log(data);
            } else {
                // Handle login error
                console.log(data);
            }
        });
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