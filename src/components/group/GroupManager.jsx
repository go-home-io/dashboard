import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import GroupStoreFactory from "../../reflux/group/GroupStore";
import groupActions from "../../reflux/group/groupActions";
import { GROUP_HEADER_ICON_COLOR_ON, GROUP_HEADER_ICON_COLOR_OFF } from "../../settings/colors";
import ExpandedGroup from "./ExpandedGroup";
import MinimizedGroup from "./MinimizedGroup";

const groupIcon = "devices_other";

class GroupManager  extends Reflux.Component {
    constructor(props) {
        super(props);
        const { dev_id, members, device_info, location} = props;
        this.store = GroupStoreFactory(dev_id, members, device_info, location);
        this.handleGroupHeaderClick = this.handleGroupHeaderClick.bind(this);
    }
    handleGroupHeaderClick() {
        const { dev_id, read_only } = this.props;
        if ( ! read_only ) {
            groupActions.toggle(dev_id);
        }
    }
    render () {
        const { all_device_states, dev_id, location } = this.props;
        const { visible, name, device_state, members, minimized, commands, read_only, loading, status } = this.state;
        const group_id = dev_id;
        // console.log(commands);

        const displayMinimized = visible && minimized  ? "block" : "none";
        const displayMaximized = visible && ! minimized  ? "block" : "none";

        const iconColor = device_state.on ? GROUP_HEADER_ICON_COLOR_ON : GROUP_HEADER_ICON_COLOR_OFF;

        return (
            <div>
                <div style = { {display: displayMaximized} }>
                    <ExpandedGroup
                        iconColor = { iconColor }
                        groupIcon = { groupIcon }
                        name = { name }
                        handleClick = { this.handleGroupHeaderClick }
                        group_id = { group_id }
                        location = { location }
                        all_device_states = { all_device_states }
                        members = { members }
                        visible = { visible && ! minimized }
                        read_only = { read_only }
                    />
                </div>

                <div style = { {display: displayMinimized} }>
                    <MinimizedGroup
                        group_id = { group_id }
                        device_state = { device_state }
                        commands = { commands }
                        actionOnHeaderClick = { this.handleGroupHeaderClick }
                        name = { name }
                        read_only = { read_only }
                        loading = { loading }
                        status = { status }
                        visible = { visible && minimized }
                    />
                </div>
            </div>
        );
    }
}

GroupManager.propTypes = {
    location: PropTypes.string.isRequired,
    dev_id: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    device_info: PropTypes.object.isRequired,
    all_device_states: PropTypes.array.isRequired
};

export default (GroupManager);