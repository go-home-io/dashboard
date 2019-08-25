import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import GroupStoreFactory from "../../reflux/group/GroupStore";
import groupActions from "../../reflux/group/groupActions";
import MinimizedGroup from "./MinimizedGroup";
import AppStore from "../../reflux/application/AppStore";

class GroupManager  extends Reflux.Component {
    constructor(props) {
        super(props);
        const { dev_id, members, device_info } = props;
        this.stores = [GroupStoreFactory(dev_id, members, device_info), AppStore];
        this.handleGroupHeaderClick = this.handleGroupHeaderClick.bind(this);
    }
    handleGroupHeaderClick() {
        const { dev_id, read_only } = this.props;
        if ( ! read_only ) {
            groupActions.toggle(dev_id);
        }
    }
    render () {
        const { dev_id, visible } = this.props;
        const {
            name, device_state, minimized,
            commands, read_only, loading, status, active_group,
        } = this.state;
        const group_id = dev_id;

        const displayMinimized = visible && minimized ? "block" : "none";

        return (
            ! active_group &&
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
        );
    }
}

GroupManager.propTypes = {
    visible: PropTypes.bool.isRequired,
    dev_id: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    device_info: PropTypes.object.isRequired,
    all_device_states: PropTypes.array.isRequired
};

export default (GroupManager);