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
import {GROUP_BKG_COLOR} from "../../settings/colors";

const ordinaryBkgColor = GROUP_BKG_COLOR;

const styles = theme => ({
     root: {
         border:'solid 1px lightgrey',
         borderRadius:5,
         padding:5,
         marginTop: 5,
         backgroundColor: 'white',
     },
    header: {
         marginBottom: 5,
         marginLeft: 5,
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

    render () {
        const {classes} = this.props;
        const devStates = this.props.device_states;
        const group_id = this.props.dev_id;
        const location = this.props.location;
        const display = this.state.visible ? 'block' : 'none';

        return (
                    <Grid className={classes.root} style={{display:display}}>
                        <div className={classes.header}>
                        <ComponentHeader
                            dev_id={this.props.dev_id}
                            name = {this.state.name}
                            on = {this.state.device_state.on}
                            status = {this.state.status}
                            read_only = {this.state.read_only}
                            actions = {groupActions}
                            icon = {groupIcon}
                            ordinaryBkgColor={ordinaryBkgColor}
                        />
                        </div>
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