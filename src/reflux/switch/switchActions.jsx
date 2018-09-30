import Reflux from "reflux";

const switchActions = Reflux.createActions([
    "doCommand",
    "on",
    "off",
    "toggle",
    "visible",
    "message",
    "status",
    "setLoading",
]);

export default switchActions;