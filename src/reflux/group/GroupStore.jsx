import Reflux from "reflux";
import groupActions from "./groupActions";
import wsActions from "../socket/wsActions";
import lightActions from "../light/lightActions";


//  Create unique Store for each Group
function GroupStoreFactory(id,  members, device_info, location){

    // const visible = (location === "Default");

    class GroupStore extends Reflux.Store {
        constructor() {
            super();

            this.state = {
                id:id,
                name: device_info.name,
                members: members,
                device_state: device_info.state,
                last_seen: device_info.last_seen,
                commands: device_info.commands,
                location: location,
                visible: false,
                read_only: device_info.read_only,
            };

            this.listenables = groupActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.doCommand = this.doCommand.bind(this);
            this.onVisible = this.onVisible.bind(this);
            this.onToggle = this.onToggle.bind(this);
            this.onOn = this.onOn.bind(this);
            this.onOff = this.onOff.bind(this);
        }

        // WebSocket messenger
        doCommand(command, value) {
            const mess = {id:id, cmd:command,value: value};
            wsActions.doCommand(mess);
            lightActions.setLoading(id);
        }

        // WebSocket listener
        onMessage (data) {
            if (data.id === id) {
                this.setState({device_state: data.state});
            }
        }

        // Actions
        onOn (dev_id) {
            if ( dev_id === id ) {
                this.doCommand("on", "");
            }
        }

        onOff (dev_id) {
            if ( dev_id === id ) {
                this.doCommand("off", "");
            }
        }

        onToggle (dev_id) {
            if ( dev_id === id ) {
                this.doCommand("toggle", "");

            }
        }

        onVisible(location) {
            this.setState({visible: false});
            if (this.state.location === location) {
                this.setState({visible: true});
            }
        }
    }

    GroupStore.id = id;
    return GroupStore;
}

export default GroupStoreFactory;