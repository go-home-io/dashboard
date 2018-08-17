import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import LightManager from "../light/LightManager";
import getDeviceState from "../getDeviceState";
import GroupHeader from "./GroupHeader";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
     root: {
         border:'solid 1px lightgrey',
         borderRadius:5,
         padding:5,
     }
});

class GroupManager  extends React.Component {

     members (group_id, groups) {
        const this_group = groups.find(function (grp) {
            return grp.id === group_id;
        });
        return (this_group) ?  this_group.devices : null;
     }

    render () {
        const {classes} = this.props;
        const this_group_members = this.members(this.props.device, this.props.generalState.groups);
        const devStates = this.props.generalState.devices;
        const devName = getDeviceState(this.props.device, devStates).name;
        const isGroup = getDeviceState(this.props.device, devStates).type === 'group';

        return (
             !isGroup ? null :
                    <Grid className={classes.root} style={{display:'block'}}>

                       <GroupHeader title = {devName}  />

                        <Grid container>
                        {this_group_members.map(function (dev_id) {
                            return (
                                <LightManager
                                    key={dev_id}
                                    id={dev_id}
                                    group_id = {dev_id}
                                    device_state = {getDeviceState(dev_id, devStates)}
                                />
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