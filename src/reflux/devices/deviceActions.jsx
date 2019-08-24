import Reflux from "reflux";

const deviceActions = Reflux.createActions([
    "toggle",
    "message",
    "status",
    "setLoading",
    "command",
]);

export default deviceActions;