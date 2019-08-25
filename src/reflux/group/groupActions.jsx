import Reflux from "reflux";

const groupActions = Reflux.createActions([
    "toggle",
    "visible",
    "message",
    "toggleWindow",
    "status",
    "command",
    "setMinimized",
    "expandWindow"
]);

export default groupActions;