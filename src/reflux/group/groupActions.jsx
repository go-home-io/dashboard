import Reflux from "reflux";

const groupActions = Reflux.createActions([
    "setColor",
    "on",
    "off",
    "toggle",
    "visible",
    "message",
    "toggleWindow"
]);

export default groupActions;