function getDeviceState(dev_id, dev_states) {
    return dev_states.find(function (dev) {
        return dev.id === dev_id
    });
}

export default getDeviceState