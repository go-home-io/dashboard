import Reflux from "reflux";

const vacuumActions = Reflux.createActions([
    "setInitialState",
    "on",
    "off",
    "pause",
    "dock",
    "findMe",
    "setFanSpeed",
    "toggle",
    "do",
    "visible",
    "message",
    "status",
    "setLoading",
]);

export default vacuumActions;