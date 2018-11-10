const storage = {
    get:(key) => {
        return JSON.parse(localStorage.getItem(key));
    },
    set:(key, value) => {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    remove:(key) => {
        return localStorage.removeItem(key);
    },
    clear:() => {
        return localStorage.clear();
    },
    key:(index) => {
        return localStorage.key(index);
    },
    keys:() => {
        let k = [];
        let index = 0;
        while (localStorage.key(index)) {
            k.push(localStorage.key(index));
            index = index + 1;
        }
        return k;
    },

};

export default storage;