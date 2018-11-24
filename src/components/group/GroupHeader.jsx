import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import groupActions from "../../reflux/group/groupActions";
import blue from "@material-ui/core/colors/blue";

const styles = () => ({
    text: {
        marginLeft: 7,
    },
    icon: {
        marginLeft: 5,
    },
    iconButton: {
        color: "rgba(0,0,0,0.56)",
        cursor: "pointer",
        marginLeft: 15,
        "&:hover": {
            color: blue[500],
        },
    }
});

class GroupHeader extends React.Component {
    constructor(props) {
        super(props);
        this.minimizeGroup = this.minimizeGroup.bind(this);
    }
    minimizeGroup () {
        const { group_id } = this.props;
        groupActions.toggleWindow(group_id);
    }
    render () {
        const { classes, groupIcon, name, iconColor, handleClick, visible, read_only } = this.props;
        const cursor = read_only ? "default" : "pointer";
        return(
            visible ?
                <Grid container >
                    <Icon className = { classes.icon } style = { {color: iconColor} }>
                        { groupIcon }
                    </Icon>
                    <Typography
                        variant = 'subtitle1'
                        className = { classes.text }
                        onClick = { handleClick }

                    >
                        <span style = { { cursor: cursor } }>
                            { name }
                        </span>
                    </Typography>
                    <Tooltip
                        title = "Minimize the group window"
                        placement = "right"
                    >
                        <div
                            className = { classes.iconButton }
                            onClick = { this.minimizeGroup }
                        >
                            <IconExpandLess/>
                        </div>
                    </Tooltip>
                </Grid>
                :
                null
        );
    }
}

GroupHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    groupIcon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    group_id: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    read_only: PropTypes.bool.isRequired
};

export default withStyles(styles)(GroupHeader);

