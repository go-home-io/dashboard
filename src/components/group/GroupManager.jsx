import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import LightManager from "../light/LightManager";
import getDeviceState from "../getDeviceState";
import GroupHeader from "./GroupHeader";


class GroupManager  extends React.Component {

     members (group_id, groups) {
        const this_group = groups.find(function (grp) {
            return grp.id === group_id;
        });
        return (this_group) ?  this_group.devices : null;
     }

    render () {

        const this_group_members = this.members(this.props.device, this.props.generalState.groups);
        const devStates = this.props.generalState.devices;
        const isGroup = getDeviceState(this.props.device, devStates).type === 'group';

        return (
             !isGroup ? null :
                    <div style={{border:'solid 1px lightgrey', borderRadius:5, padding:5}}>

                       <GroupHeader
                           title = {getDeviceState(this.props.device, devStates).name}
                       />

                       <Grid container alignContent='center'>
                        {this_group_members.map(function (dev_id) {
                            return (
                                <LightManager
                                    id={dev_id}
                                    key={dev_id}
                                    device_state = {getDeviceState(dev_id, devStates)}
                                />
                            )
                        })}
                       </Grid>
                    </div>

        )
    }
}

export default GroupManager