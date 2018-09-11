import React from 'react';
import Reflux from 'reflux';
import Grid from "@material-ui/core/Grid/Grid";
import LightManager from "../light/LightManager";
import getDeviceState from "../utils/getDeviceState";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GroupStoreFactory from "../../reflux/group/GroupStore";
import ComponentHeader from "../common/ComponentHeader";
import groupActions from "../../reflux/group/groupActions";
import SensorManager from "../sensor/SensorManager";
import {GROUP_HEADER_ICON_COLOR_ON, GROUP_HEADER_ICON_COLOR_OFF} from "../../settings/colors";
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
     root: {
         border:'solid 1px lightgrey',
         borderRadius:5,
         padding:5,
         marginTop: 5,
         // backgroundColor: 'white',
     },
    text: {
         // marginBottom: 5,
         marginLeft: 5,
         cursor: 'pointer',
    },
    icon: {
        marginLeft: 5,
        cursor: 'pointer',
    }
});

const groupIcon = <i className="material-icons">devices</i>;

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
        const display = this.state.visible ? 'block' : 'none';
        const iconColor = this.state.device_state.on ? GROUP_HEADER_ICON_COLOR_ON : GROUP_HEADER_ICON_COLOR_OFF;

        return (
                    <Grid className={classes.root} style={{display:display}}>
                        <Grid  container justify='flex-start' onClick={this.handleClick.bind(this)}>
                        {/*<ComponentHeader*/}
                            {/*dev_id={this.props.dev_id}*/}
                            {/*name = {this.state.name}*/}
                            {/*on = {this.state.device_state.on}*/}
                            {/*status = {this.state.status}*/}
                            {/*read_only = {this.state.read_only}*/}
                            {/*actions = {groupActions}*/}
                            {/*icon = {groupIcon}*/}
                            {/*ordinaryBkgColor={ordinaryBkgColor}*/}
                        {/*/>*/}
                            <Icon className={classes.icon} style={{color:iconColor}}>
                                {groupIcon}
                            </Icon>
                            <Typography variant='subheading' className={classes.text}>
                                {this.state.name}
                            </Typography>
                        </Grid>
                        <Grid container justify='center'>
                        {this.state.members.map(function (dev_id) {
                            const device_state = getDeviceState(dev_id, devStates);
                            const deviceType = device_state.type;
                            return (
                                deviceType === 'light' ?
                                <LightManager
                                    key={dev_id}
                                    id={dev_id}
                                    device_state = {device_state}
                                    location = {location}
                                    group_id = {group_id}
                                /> :
                                deviceType === 'sensor' ?
                                <SensorManager/> : null
                            )
                        })}
                       </Grid>
                    </Grid>
        )
    }
}

GroupManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupManager)