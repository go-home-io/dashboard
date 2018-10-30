import Reflux from "reflux";
import groupActions from "./groupActions";
import wsActions from "../socket/wsActions";
import lightActions from "../light/lightActions";
import notificationActions from "../notification/notificationActions";


//  Create unique Store for each Group
function GroupStoreFactory(id,  members, device_info, location){
    class GroupStore extends Reflux.Store {
        constructor() {
            super();
            const { state, name, last_seen, commands } = device_info;
            this.state = {
                id:id,
                name: name,
                members: members,
                device_state: state,
                last_seen: last_seen,
                commands: commands,
                location: location,
                visible: false,
                read_only: device_info.read_only,
                minimized: true,
                status:"ordinary",
                loading: false,
            };

            this.listenables = groupActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.doCommand = this.doCommand.bind(this);
            this.onVisible = this.onVisible.bind(this);
            this.onToggle = this.onToggle.bind(this);
            this.onOn = this.onOn.bind(this);
            this.onOff = this.onOff.bind(this);
            this.onToggleWindow = this.onToggleWindow.bind(this);
            this.onStatus = this.onStatus.bind(this);
            this.onCommand = this.onCommand.bind(this);
        }

        // WebSocket messenger
        doCommand(command, value) {
            const mess = {id:id, cmd:command,value: value};
            wsActions.doCommand(mess);
            this.setState({loading: true});
            if (! this.state.minimized) {
                lightActions.setLoading(id);
            }
        }

        // WebSocket listener
        onMessage (data) {
            if (data.id === id) {
                this.setState({
                    device_state: data.state,
                    status:"success",
                    loading: false
                });
            }
        }

        // Actions
        onCommand (dev_id, command, value) {
            if ( dev_id === id ) {
                const { commands } = this.state;
                if ( commands.includes(command) ) {
                    this.doCommand( command, value);
                }
            }
        }
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
        onToggleWindow(dev_id) {
            if ( dev_id === id ) {
                const minimized =  this.state.minimized;
                this.setState( { minimized: ! minimized} );
            }
        }
        onStatus(dev_id, status) {
            if ( dev_id === id ) {
                this.setState({status:status});
                if (status === "error") {
                    this.setState({loading: false});
                    notificationActions.notification(this.state.name + ": Connection timeout , the command may not be completed");
                } else if (status === "rejected") {
                    this.setState({loading: false, status:"error"});
                    notificationActions.notification(this.state.name + ": Command aborted due to connection problems");
                    wsActions.clear();
                }
            }
        }
    }

    GroupStore.id = id;
    return GroupStore;
}

export default GroupStoreFactory;