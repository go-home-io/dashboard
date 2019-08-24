import Reflux from "reflux";

const appActions = Reflux.createActions([
    "setLocation",
    "toggleMenu",
    "setUOM",
    "workerSuccessfullyLoaded",
    "statusSuccessfullyLoaded",
]);

export default appActions;