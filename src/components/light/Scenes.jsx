import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography/Typography";

const ITEM_HEIGHT = 60;

const styles = () => ( {
    root: {
        width: "100%",
        marginTop: 3,
    },
    text: {
        letterSpacing:1,
        cursor:"pointer",
    },
});

class Scenes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick (event)  {
        const { read_only } = this.props;
        if ( ! read_only ) {
            this.setState({ anchorEl: event.currentTarget });
        }
    }

    handleClose (option)  {
        const { dev_id, doCommand } = this.props;
        if (typeof(option) === "string") {
            doCommand(dev_id, "set-scene", option);
        }
        this.setState({ anchorEl: null });
    }

    render() {
        const { classes, scenes, read_only } = this.props;
        const { anchorEl } = this.state;
        const cursor = read_only ? "default" : "pointer";

        return (
            <div className = { classes.root }>
                <div id = "scenes-label"
                    className = { classes.text }
                    onClick = { this.handleClick }
                    style = { {cursor:cursor} }
                >
                    <Typography variant = 'body1'>
                        Select scene
                    </Typography>
                </div>
                <Menu
                    id = "scenes"
                    anchorEl = { anchorEl }
                    open = { Boolean(anchorEl) }
                    onClose = { this.handleClose }
                    value = { null }
                    PaperProps = { {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.0,
                            width: 200,
                        },
                    } }
                >
                    {scenes.map(option => (
                        <MenuItem key = { option } selected = { option === 0 }
                            onClick = { this.handleClose.bind(this, option) }
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

Scenes.propTypes = {
    classes: PropTypes.object.isRequired,
    scenes: PropTypes.array.isRequired,
    read_only: PropTypes.bool.isRequired,
    dev_id: PropTypes.string.isRequired,
    doCommand: PropTypes.func.isRequired
};

export default withStyles(styles)(Scenes);
