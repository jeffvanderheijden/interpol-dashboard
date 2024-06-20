const LocalStorage = {
    get: (key) => {
        return (typeof window !== 'undefined') && localStorage.getItem(key);
    },
    set: (key, value) => {
        (typeof window !== 'undefined') && localStorage.setItem(key, value);
    }
}

export default LocalStorage;