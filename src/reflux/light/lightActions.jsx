import Reflux from "reflux";

const lightActions = Reflux.createActions([
    "setColor",
    "on",
    "off",
    "toggle",
    "setBrightness",
    "setScene",
    "visible",
    "message",
    "status",
    "setLoading",
    "command"
]);

export default lightActions;