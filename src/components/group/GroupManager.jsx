import React from "react";
import Reflux from "reflux";
import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GroupStoreFactory from "../../reflux/group/GroupStore";
import groupActions from "../../reflux/group/groupActions";
import {GROUP_HEADER_ICON_COLOR_ON, GROUP_HEADER_ICON_COLOR_OFF} from "../../settings/colors";
import GroupDevices from "./GroupDevices";
import MaxGroupHeader from "./MaxGroupHeader";
import Devices from "../common/Devices";

const styles = () => ({
    root: {
        border:"solid 1px lightgrey",
        borderRadius:5,
        padding:5,
        margin: 5,
    },
});

const groupIcon = "devices_other";

class GroupManager  extends Reflux.Component {
    constructor(props) {
        super(props);
        const { dev_id, members, device_info, location} = props;
        this.store = GroupStoreFactory(dev_id, members, device_info, location);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        const { dev_id } = this.props;
        groupActions.toggle(dev_id);
    }
    render () {
        const { classes,  all_device_states, dev_id, location } = this.props;
        const { visible, name, device_state, members, minimized } = this.state;
        const group_id = dev_id;

        const displayMinimized = visible && minimized  ? "block" : "none";
        const displayMaximized = visible && ! minimized  ? "block" : "none";

        const iconColor = device_state.on ? GROUP_HEADER_ICON_COLOR_ON : GROUP_HEADER_ICON_COLOR_OFF;

        return (
            <div>
                <div className = { classes.root } style = { {display: displayMaximized} }>
                    <MaxGroupHeader
                        iconColor = { iconColor }
                        groupIcon = { groupIcon }
                        name = { name }
                        handleClick = { this.handleClick }
                        group_id = { group_id }
                    />
                    <Grid container justify = 'center' alignItems = 'center'>
                        <GroupDevices
                            location = { location }
                            group_id = { group_id }
                            all_device_states = { all_device_states }
                            members = { members }
                        />
                    </Grid>
                </div>

                <div style = { {display: displayMinimized} }>
                    <Devices
                        key = { group_id }
                        deviceType = "minGroup"
                        location = { location }
                        id = { group_id }
                        device_info = { device_state }
                        group_id = { group_id }
                    />
                </div>
            </div>

        );
    }
}

GroupManager.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.string.isRequired,
    dev_id: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    device_info: PropTypes.object.isRequired,
    all_device_states: PropTypes.array.isRequired
};

export default withStyles(styles)(GroupManager);