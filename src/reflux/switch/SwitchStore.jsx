import Reflux from "reflux";
import cameraActions from "./switchActions";
import wsActions from "../socket/wsActions";
import notificationActions from "../notification/notificationActions";

//  Create unique Store for each Swithch
function SwitchStoreFactory(id, device_state, location, group_id) {
    class SwitchStore extends Reflux.Store {
        constructor() {
            super();
            this.state = {
                id:id,
                name: "",
                device_state: {},
                last_seen: 0,
                group_id: "",
                location: "",
                visible: false,
                status: "ordinary",
                loading: false,
            };
            this.listenables = cameraActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.onVisible = this.onVisible.bind(this);
            this.onToggle = this.onToggle.bind(this);
            this.onOn = this.onOn.bind(this);
            this.onOff = this.onOff.bind(this);
            this.onStatus = this.onStatus.bind(this);
            this.onSetLoading = this.onSetLoading.bind(this);

            this.setInitialState(device_state, location, group_id);
        }

        setInitialState(device_state, location, group_id) {
            if (device_state) {
                this.setState({
                    name: device_state.name,
                    device_state: device_state.state,
                    last_seen: device_state.last_seen,
                });
            }
            if (location) {
                this.setState({location: location});
            }
            if (group_id) {
                this.setState({group_id: group_id});
            }
        }

        // WebSocket messenger
        doCommand(command, value) {
            const mess = { id:id, cmd:command, value: value };
            this.setState({"loading":true});
            wsActions.doCommand(mess);
        }

        // WebSocket listener
        onMessage (data) {
            if (data.id === id) {
                if (data.state !== "oneWayResponse") {
                    this.setState({
                        device_state: data.state,
                        loading: false,
                        status: "success",
                    });
                }
            }
        }

        // Actions
        onOn (dev_id) {
            if ( dev_id === id ) {
                this.doCommand("on", "");
                this.setState({"loading":true});
            }
        }
        onOff (dev_id) {
            if ( dev_id === id ) {
                this.doCommand("off", "");
                this.setState({"loading":true});
            }
        }
        onToggle (dev_id) {
            if ( dev_id === id ) {
                const { on } = this.state.device_state;
                const command = on ? "off" : "on";
                this.doCommand(command, "");
                this.setState({"loading":true});
            }
        }

        // Appearance
        onVisible(location) {
            this.setState({visible: false});
            if (this.state.location === location) {
                this.setState({visible: true});
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
        onSetLoading (group_id) {
            if (this.state.group_id === group_id) {
                this.setState({loading: true});
            }
        }
    }

    SwitchStore.id = id;
    return SwitchStore;
}

export default SwitchStoreFactory;