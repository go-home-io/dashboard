import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography/Typography";
import vacuumActions from "../../reflux/vacuum/vacuumActions";

const ITEM_HEIGHT = 50;

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

const removeElementFromArray = (array, element) => {
    let filteredArray = [];
    // eslint-disable-next-line
    array.map( (current) => {
        if ( current !== element) {
            filteredArray.push(current);
        }
    });
    return filteredArray;
};

class VacuumDoCommand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick (event)  {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose (option)  {
        const { dev_id } = this.props;
        if (typeof(option) === "string") {
            vacuumActions.do(dev_id, option);
        }
        this.setState({ anchorEl: null });
    }

    render() {
        const { classes, commands: allCommands } = this.props;
        const { anchorEl } = this.state;
        const commands =  removeElementFromArray(allCommands, "set-fan-speed");

        return (
            <div className = { classes.root }>
                <div id = "vacuum-label" className = { classes.text }
                    onClick = { this.handleClick }
                >
                    <Typography variant = 'body1'>
                        Select command
                    </Typography>
                </div>
                <Menu
                    id = "vacuum-commands"
                    anchorEl = { anchorEl }
                    open = { Boolean(anchorEl) }
                    onClose = { this.handleClose.bind(this) }
                    value = { null }
                    PaperProps = { {
                        style: {
                            maxHeight: ITEM_HEIGHT * 6.0,
                            width: 200,
                        },
                    } }
                >
                    {commands.map( option => (
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

VacuumDoCommand.propTypes = {
    classes: PropTypes.object.isRequired,
    commands: PropTypes.array.isRequired,
    dev_id: PropTypes.string.isRequired
};

export default withStyles(styles)(VacuumDoCommand);
