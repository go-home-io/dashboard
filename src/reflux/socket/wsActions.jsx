import Reflux from "reflux";

const wsActions = Reflux.createActions([
    "doCommand",
    "reconnect",
    "clear",
]);

export default wsActions;