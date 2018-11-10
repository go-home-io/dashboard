import Reflux from "reflux";

const notificationActions = Reflux.createActions([
    "message",
    "notification",
    "close",
    "processQueue",
    "seen",
    "dismiss"
]);

export default notificationActions;