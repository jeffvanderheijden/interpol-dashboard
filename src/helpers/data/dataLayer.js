import { navigate } from "@reach/router";
const api = "https://api.interpol.sd-lab.nl/api";

export const login = async (formData) => {
    try {
        const response = await fetch('https://api.interpol.sd-lab.nl/api/create-session', {
            method: 'POST',
            body: formData,
            credentials: 'include' // Ensure cookies are included with the request
        });

        const responseText = await response.text(); // Read the raw response body as text

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const loginResponse = JSON.parse(responseText); // Parse the response text as JSON

        // Do something with the login response, e.g., handle login success or error
        if (loginResponse && loginResponse.error) {
            console.error('Login error:', loginResponse.error);
            return loginResponse.error;
        } else {
            console.log('Login successful:', loginResponse.message);
            return true;
        }
    } catch (error) {
        console.error('Error creating session:', error);
    }
}

export const checkSession = async (type) => {
    try {
        const response = await fetch(`${api}/check-type`, {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();

        if (userData && userData.error) {
            console.error('Error checking session:', userData.error);
            return false;
        }

        // If user is logged in, check what type of user is logged in
        if (type === "STUDENT") {
            return userData === 'STUDENT' ? true : false;
        } else if (type === "DOCENT") {
            return userData === 'DOCENT' ? true : false;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking session:', error);
        return false;
    }
}

export const getStudentData = async () => {
    try {
        const response = await fetch(`${api}/student-data`, {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();

        if (userData && userData.error) {
            console.error('Error student data:', userData.error);
            return false;
        }

        if (userData) {
            return userData;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking student data:', error);
        return false;
    }
}

export const logout = async () => {
    try {
        const response = await fetch('https://api.interpol.sd-lab.nl/api/logout.php', {
            method: 'POST',
            credentials: 'include' // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Logout successful:', data);

        // Redirect to login page or perform other actions
        navigate('/login');

    } catch (error) {
        console.error('Error logging out:', error);
        // Handle error, e.g., display error message
    }
}

// TODO::::: Implement the following functions :::======
export const getTeamData = async () => {
    try {
        const response = await fetch(`${api}/team-data`, {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const teamData = await response.json();

        if (teamData && teamData.error) {
            console.error('Error getting team data:', teamData.error);
            return false;
        }

        if (teamData) {
            return teamData;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error getting team data:', error);
    }
}