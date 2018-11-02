import Reflux from "reflux";

const deviceActions = Reflux.createActions([
    "toggle",
    "visible",
    "message",
    "status",
    "setLoading",
    "command"
]);

export default deviceActions;