import Reflux from "reflux";

const wsActions = Reflux.createActions([
    "doCommand",
    "reconnect",
    "clear",
    "setOneWay",
    "clearOneWay"
]);

export default wsActions;