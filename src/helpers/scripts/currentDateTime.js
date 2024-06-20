// Function to update the current dateTime
export const updateDateTime = () => {
    const currentdate = new Date();
    return currentdate.toLocaleDateString('nl-NL', { weekday: 'short' }) + " "
        + currentdate.getDate() + "   "
        + currentdate.toLocaleString('nl-NL', { month: 'long' }) + " "
        + currentdate.getHours() + ":"
        + (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes();
}