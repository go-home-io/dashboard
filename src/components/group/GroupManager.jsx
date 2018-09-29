import React from "react";
import Reflux from "reflux";
import Grid from "@material-ui/core/Grid/Grid";
import LightManager from "../light/LightManager";
import getDeviceState from "../utils/getDeviceState";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GroupStoreFactory from "../../reflux/group/GroupStore";
import groupActions from "../../reflux/group/groupActions";
import SensorManager from "../sensor/SensorManager";
import {GROUP_HEADER_ICON_COLOR_ON, GROUP_HEADER_ICON_COLOR_OFF} from "../../settings/colors";
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";

const styles = () => ({
    root: {
        border:"solid 1px lightgrey",
        borderRadius:5,
        padding:5,
        margin: 5,
        // backgroundColor: 'white',
    },
    text: {
        // marginBottom: 5,
        marginLeft: 5,
        cursor: "pointer",
    },
    icon: {
        marginLeft: 5,
        cursor: "pointer",
    }
});

const groupIcon = "devices_other";

class GroupManager  extends Reflux.Component {
    constructor(props) {
        super(props);
        const { dev_id, members, device_info, location} = props;
        this.store = GroupStoreFactory(dev_id, members, device_info, location);
    }

    handleClick() {
        const { dev_id } = this.props;
        groupActions.toggle(dev_id);
    }

    render () {
        const {classes,  all_device_states, dev_id, location} = this.props;
        const { visible, name, device_state, members } = this.state;
        const group_id = dev_id;

        const display = visible ? "block" : "none";
        const iconColor = device_state.on ? GROUP_HEADER_ICON_COLOR_ON : GROUP_HEADER_ICON_COLOR_OFF;

        return (
            <div className = { classes.root } style = { {display:display} }>
                <Grid container justify = 'flex-start' onClick = { this.handleClick.bind(this) }>
                    <Icon className = { classes.icon } style = { {color:iconColor} }>
                        { groupIcon }
                    </Icon>
                    <Typography variant = 'subheading' className = { classes.text }>
                        {name}
                    </Typography>
                </Grid>

                {/* Render Group members devices */}
                <Grid container justify = 'center' alignItems = 'center'>
                    {members.map( (dev_id) => {
                        const device_state = getDeviceState(dev_id, all_device_states);
                        const deviceType = device_state.type;
                        return (
                            deviceType === "light" ?
                                <LightManager
                                    key = { dev_id }
                                    id = { dev_id }
                                    device_info = { device_state }
                                    location = { location }
                                    group_id = { group_id }
                                /> :
                                deviceType === "sensor" ?
                                    <SensorManager
                                        key = { dev_id }
                                        location = { location }
                                        id = { dev_id }
                                        device_info = { device_state }
                                        group_id = { group_id }
                                    /> :
                                    null
                        );
                    })}

                </Grid>
            </div>
        );
    }
}

GroupManager.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(GroupManager);