const EventEmitter = {
    events: {},
    dispatch: (event, data) => {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data));
    },
    subscribe: (event, callback) => {
        alert("Event emitter");

        console.log("events", this);
        console.log(event, callback);
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }
};

export default EventEmitter;