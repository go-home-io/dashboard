import Reflux from "reflux";

const deviceActions = Reflux.createActions([
    "toggle",
    "visible",
    "message",
    "status",
    "setLoading",
    "command",
    "setInitialState"
]);

export default deviceActions;