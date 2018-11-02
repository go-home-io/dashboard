const getDeviceState = (dev_id, dev_states) => {
    return dev_states.find( (dev) => {
        return dev.id === dev_id;
    });
};

export default getDeviceState;