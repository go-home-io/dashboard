import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import Popover from "@material-ui/core/Popover/Popover";
import Typography from "@material-ui/core/Typography/Typography";
import UnknownCommandDialog from "./UnknownCommandDialog";

const styles = () => ( {
    root: {
        width: "100%",
        marginTop: 5,
    },
    text: {
        fontSize:12,
        letterSpacing:1,
        cursor:"pointer",
    },
});

const beautifyCommand = (command) => {
    let commandCapitalized = command.charAt(0).toUpperCase() + command.slice(1);
    commandCapitalized = commandCapitalized.replace("-", " ");
    return commandCapitalized;
};

class UnknownCommandHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            anchorEl: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClick (event) {
        const { read_only } = this.props;
        if ( ! read_only ) {
            this.setState({
                anchorEl: event.currentTarget,
            });
        }
    }
    handleClose ()  {
        this.setState({
            anchorEl: null,
        });
    }
    render() {
        const { classes, dev_id, read_only, command, doCommand } = this.props;
        const { anchorEl } = this.state;
        const cursor = read_only ? "default" : "pointer";
        const commandName = (beautifyCommand(command));

        return (
            <Grid className = { classes.root } >
                <div
                    id = "label"
                    className = { classes.text }
                    onClick = { this.handleClick }
                    style = { {cursor:cursor} }
                >
                    <Typography variant = 'body1'>
                        { commandName }
                    </Typography>
                </div>
                <Popover
                    id = "unknown-cmd-popper"
                    open = { Boolean(anchorEl) }
                    anchorEl = { anchorEl }
                    onClose = { this.handleClose }
                    anchorOrigin = { {
                        vertical: "top",
                        horizontal: "left",
                    } }
                    transformOrigin = { {
                        vertical: "top",
                        horizontal: "left",
                    } }
                >
                    <UnknownCommandDialog
                        // level = { level }
                        close = { this.handleClose }
                        dev_id = { dev_id }
                        doCommand = { doCommand }
                        command = { command }
                    />
                </Popover>
            </Grid>
        );
    }
}

UnknownCommandHandler.propTypes = {
    classes: PropTypes.object.isRequired,
    read_only: PropTypes.bool,
    dev_id: PropTypes.string.isRequired,
    doCommand: PropTypes.func.isRequired,
    command: PropTypes.string.isRequired
};

export default withStyles(styles)(UnknownCommandHandler);
