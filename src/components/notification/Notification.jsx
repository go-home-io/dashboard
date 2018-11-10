import React from "react";
import Reflux from "reflux";
import Snackbar from "@material-ui/core/Snackbar";
import NotificationStore from "../../reflux/notification/NotificationStore";
import notificationActions from "../../reflux/notification/notificationActions";
import SnackContent from "./SnackContent";

class Notification extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = NotificationStore;
    }
    static handleClose (event, reason) {
        if (reason !== "clickaway") {
            notificationActions.close();
        }
    }
    static handleExited ()  {
        notificationActions.processQueue();
    }

    render() {
        const { currentNotification, open } = this.state;
        const { message, type }  = currentNotification ? currentNotification : "";

        return (
            <Snackbar
                anchorOrigin = { {
                    vertical: "top",
                    horizontal: "right",
                } }
                open = { open }
                autoHideDuration = { 6000 }
                onClose = { Notification.handleClose }
                onExited = { Notification.handleExited }
            >
                <SnackContent
                    onClose = { Notification.handleClose }
                    variant = { type }
                    message = { message }
                />
            </Snackbar>
        );
    }
}

export default Notification;
