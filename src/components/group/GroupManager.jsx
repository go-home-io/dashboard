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
        marginTop: 5,
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

class GroupManager  extends Reflux.Component {
    constructor(props) {
        super(props);

        this.store = GroupStoreFactory(props.dev_id,
            props.members,
            props.device_info,
            props.location);

    }

    handleClick() {
        groupActions.toggle(this.props.dev_id);
    }

    render () {
        const {classes} = this.props;
        const devStates = this.props.device_states;
        const group_id = this.props.dev_id;
        const location = this.props.location;
        const display = this.state.visible ? "block" : "none";
        const iconColor = this.state.device_state.on ? GROUP_HEADER_ICON_COLOR_ON : GROUP_HEADER_ICON_COLOR_OFF;

        return (
            <div className = { classes.root } style = { {display:display} }>

                <Grid container justify = 'flex-start' onClick = { this.handleClick.bind(this) }>
                    <Icon className = { classes.icon } style = { {color:iconColor} }>
                        <i className = "material-icons">
                            devices
                        </i>
;
                    </Icon>
                    <Typography variant = 'subheading' className = { classes.text }>
                        {this.state.name}
                    </Typography>
                </Grid>
                <Grid container justify = 'center'>
                    {this.state.members.map(function (dev_id) {
                        const device_state = getDeviceState(dev_id, devStates);
                        const deviceType = device_state.type;
                        return (
                            deviceType === "light" ?
                                <LightManager
                                    key = { dev_id }
                                    id = { dev_id }
                                    device_state = { device_state }
                                    location = { location }
                                    group_id = { group_id }
                                /> :
                                deviceType === "sensor" ?
                                    <SensorManager
                                        key = { dev_id }
                                        location = { location }
                                        id = { dev_id }
                                        device_info = { device_state }
                                    /> : null
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