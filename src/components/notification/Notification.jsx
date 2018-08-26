import React from "react";
import Reflux from 'reflux';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import notificationStore from '../../reflux/notificationStore';
import notificationActions from '../../reflux/notificationActions';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4
    }
});

class Notification extends Reflux.Component {
   constructor(props) {
       super(props);

       this.store = notificationStore;
   }

    handleClose = (event, reason) => {
        if (reason !== "clickaway") {
            notificationActions.close();
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[

                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}

Notification.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notification);
