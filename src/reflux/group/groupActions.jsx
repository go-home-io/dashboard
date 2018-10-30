import Reflux from "reflux";

const groupActions = Reflux.createActions([
    "setColor",
    "on",
    "off",
    "toggle",
    "visible",
    "message",
    "toggleWindow",
    "status",
    "command"
]);

export default groupActions;