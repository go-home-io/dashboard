import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import NotificationTable from "./NotificationTable";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Transition from "../common/Transition";
import PropTypes from "prop-types";
import notificationActions from "../../reflux/notification/notificationActions";


class NotificationsListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show_all: false };

        this.toggleShow = this.toggleShow.bind(this);
        this.dismissAll = this.dismissAll.bind(this);
        this.beforeClose = this.beforeClose.bind(this);
    }
    beforeClose () {
        const { onClose } = this.props;
        this.setState({ show_all: false });
        notificationActions.seen();
        onClose();
    }
    toggleShow () {
        this.setState( prevState => ( { show_all: ! prevState.show_all } ));
    }
    dismissAll () {
        notificationActions.dismiss();
        this.beforeClose();
    }
    render() {
        const { open } = this.props;
        const { show_all } = this.state;
        return (
            <div>
                <Dialog
                    open = { open }
                    scroll = "body"
                    TransitionComponent = { Transition }
                    keepMounted
                    onClose = { this.beforeClose }
                    aria-labelledby = "alert-dialog-slide-title"
                    aria-describedby = "alert-dialog-slide-description"
                >
                    <DialogTitle id = "simple-dialog-title">
                        { "Notifications" }
                    </DialogTitle>
                    <DialogContent>
                        <NotificationTable
                            id = "alert-dialog-slide-description"
                            show_all = { show_all }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = { this.beforeClose } color = "primary" size = "small">
                            Close
                        </Button>
                        <Button onClick = { this.toggleShow } color = "primary" size = "small">
                            { show_all ?
                                <div>{ "Show new" }</div>
                                :
                                <div>{ "Show all" }</div>
                            }
                        </Button>
                        { show_all ?
                            <Button onClick = { this.dismissAll } color = "primary" size = "small">
                                Dismiss all
                            </Button> : null
                        }
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

NotificationsListView.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default NotificationsListView;
