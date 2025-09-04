const LocalStorage = {
    get: (key) => {
        return (typeof window !== 'undefined') && localStorage.getItem(key);
    },
    set: (key, value) => {
        (typeof window !== 'undefined') && localStorage.setItem(key, value);
    },
    delete: (key) => {
        (typeof window !== 'undefined') && localStorage.removeItem(key);
    }
}

export default LocalStorage;