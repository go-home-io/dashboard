import Reflux from "reflux";

const notificationActions = Reflux.createActions([
    "notification",
    "close",
    "processQueue",
]);

export default notificationActions;