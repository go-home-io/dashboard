import Reflux from "reflux";

const appActions = Reflux.createActions([
    "setLocation",
    "toggleMenu",
    "setUOM",
    "workerSuccessfullyLoaded",
    "statusSuccessfullyLoaded",
    "setActiveGroup",
    "setActiveGroupOn",
    "setActivePage"
]);

export default appActions;