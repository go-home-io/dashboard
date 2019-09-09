import PropTypes from "prop-types";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import PropertyList from "./PropertyList";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction = "up" ref = { ref } { ...props } />;
});


const LogStateView = (props) => {
    const { open, handleClose, properties } = props;

    return (
        <div>
            <Dialog
                open = { open }
                TransitionComponent = { Transition }
                keepMounted
                onClose = { handleClose }
                aria-labelledby = "alert-dialog-slide-title"
                aria-describedby = "alert-dialog-slide-description"
            >
                <DialogTitle id = "alert-dialog-slide-title">
                    { "Device Properties" }
                </DialogTitle>
                <DialogContent>
                    <PropertyList properties = { properties }/>
                </DialogContent>
                <DialogActions>
                    <Button onClick = { handleClose } color = "primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};



LogStateView.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    properties: PropTypes.object.isRequired
};

export default LogStateView;