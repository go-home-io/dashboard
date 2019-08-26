import Reflux from "reflux";
import deviceActions from "./deviceActions";
import wsActions from "../socket/wsActions";
import notificationActions from "../notification/notificationActions";

//  Create unique Store for each Component
function DeviceStoreFactory(id,  device_info){
    class DeviceStore extends Reflux.Store {
        constructor() {
            super();
            const { name, type, state, last_seen, commands, read_only } = device_info;
            this.state = {
                id:id,
                name: name,
                device_type: type,
                device_state: state,
                last_seen: last_seen,
                commands: commands,
                loading: false,
                read_only: read_only,
                status:"ordinary",
            };

            this.listenables = deviceActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.doCommand = this.doCommand.bind(this);
            this.onToggle = this.onToggle.bind(this);
            this.onStatus = this.onStatus.bind(this);
            this.onSetLoading = this.onSetLoading.bind(this);
            this.onCommand = this.onCommand.bind(this);
        }

        // WebSocket messenger
        doCommand(command, value) {
            const mess = {id:id, cmd:command,value: value};
            this.setState({"loading":true});
            wsActions.doCommand(mess);
        }

        // WebSocket listener
        onMessage (data) {
            if (data.id === id) {
                this.setState({
                    device_state: data.state,
                    loading:false,
                    status:"success"
                });
            }
        }

        // Actions
        onCommand (dev_id, command, value) {
            if ( dev_id === id ) {
                const { commands } = this.state;
                if ( commands.includes(command) ) {
                    this.doCommand(command, value);
                }
            }
        }

        onToggle (dev_id) {
            if (dev_id === id) {
                const {commands, device_state} = this.state;
                if (commands.includes("toggle")) {
                    this.onCommand(dev_id, "toggle", "");
                } else {
                    // Emulate "toggle" command
                    const on = !device_state.on;
                    const command = on ? "on" : "off";
                    this.onCommand(dev_id, command, "");
                }
            }
        }

        onStatus(dev_id, status) {
            if ( dev_id === id ) {
                this.setState({status:status});
                if (status === "error") {
                    this.setState({loading: false});
                    notificationActions.notification(
                        this.state.name + ": Connection timeout , the command may not be completed");
                } else if (status === "rejected") {
                    this.setState({loading: false, status:"error"});
                    notificationActions.notification(this.state.name + ": Command aborted due to connection problems");
                    wsActions.clear();
                }
            }
        }

        onSetLoading (dev_id) {
            if ( id === dev_id) {
                this.setState( { loading: true } );
            }
        }
    }

    DeviceStore.id = id;
    return DeviceStore;
}

export default DeviceStoreFactory;