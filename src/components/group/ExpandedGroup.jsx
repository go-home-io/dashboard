import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GroupHeader from "./GroupHeader";
import Grid from "@material-ui/core/Grid/Grid";
import GroupDevices from "./GroupDevices";

const styles = () => ({
    root: {
        border:"solid 1px lightgrey",
        borderRadius:5,
        padding:5,
        margin: 5,
        backgroundColor: "rgba(0, 0, 0, 0.05)"
    },
});

class ExpandedGroup extends React.Component {
    render () {
        const {
            classes, iconColor, groupIcon, name, group_id,
            handleClick, all_device_states, members, visible, read_only } = this.props;

        return(
            <div className = { classes.root }>
                <GroupHeader
                    iconColor = { iconColor }
                    groupIcon = { groupIcon }
                    name = { name }
                    handleClick = { handleClick }
                    group_id = { group_id }
                    visible = { visible }
                    read_only = { read_only }
                />
                <Grid container justify = 'center' alignItems = 'center'>
                    <GroupDevices
                        group_id = { group_id }
                        all_device_states = { all_device_states }
                        members = { members }
                        visible = { visible }
                    />
                </Grid>
            </div>
        );
    }
}

ExpandedGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    iconColor: PropTypes.string.isRequired,
    groupIcon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    group_id: PropTypes.string.isRequired,
    all_device_states: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    read_only: PropTypes.bool.isRequired
};

export default withStyles(styles)(ExpandedGroup);