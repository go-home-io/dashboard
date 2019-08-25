import Reflux from "reflux";

const appActions = Reflux.createActions([
    "setLocation",
    "toggleMenu",
    "setUOM",
    "workerSuccessfullyLoaded",
    "statusSuccessfullyLoaded",
    "setActiveGroup",
    "setActiveGroupOn"
]);

export default appActions;