import Reflux from "reflux";

const weatherActions = Reflux.createActions([
    "visible",
    "message",
    "setInitialState"
]);

export default weatherActions;