import Reflux from "reflux";
import vacuumActions from "./vacuumActions";
import wsActions from "../socket/wsActions";
import notificationActions from "../notification/notificationActions";

//  Create unique Store for each Vacuum
function VacuumStoreFactory(id, device_state, group_id) {
    class VacuumStore extends Reflux.Store {
        constructor() {
            super();
            this.state = {
                id:id,
                name: device_state.name,
                device_state: device_state.state,
                last_seen: device_state.last_seen,
                commands: device_state.commands,
                group_id: group_id,
                loading:false,
                status:"ordinary",
            };
            this.listenables = vacuumActions;

            // Bind it
            // this.onSetInitialState = this.onSetInitialState.bind(this);
            this.onMessage = this.onMessage.bind(this);
            this.doCommand = this.doCommand.bind(this);
            this.onPause = this.onPause.bind(this);
            this.onDock = this.onDock.bind(this);
            this.onFindMe = this.onFindMe.bind(this);
            this.onOn = this.onOn.bind(this);
            this.onOff = this.onOff.bind(this);
            this.onSetFanSpeed = this.onSetFanSpeed.bind(this);
            this.onStatus = this.onStatus.bind(this);
            this.onSetLoading = this.onSetLoading.bind(this);
            this.onToggle = this.onToggle.bind(this);
            this.onDo = this.onDo.bind(this);
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
                        loading:false,
                        status:"success"
                    });
                } else {
                    this.setState({
                        loading:false,
                        status:"success"});
                }

            }
        }

        /* -----------------------------
                  Actions
        --------------------------------- */

        // onSetInitialState(device_info, group_id){
        //     this.setState({
        //         name: device_.name,
        //         device_state: device_state.state,
        //         last_seen: device_state.last_seen,
        //         commands: device_state.commands,
        //         group_id: group_id,
        //     });
        // };

        // Command "toggle" emulation
        onToggle (dev_id) {
            const { vac_status } = this.state.device_state;
            if ( dev_id === id ) {
                let command = "";
                switch (vac_status) {
                case "paused":  // continue
                    command = "on";
                    break;
                case "cleaning":  // pause
                    command = "pause";
                    break;
                case "docked":  // start
                    command = "on";
                    break;
                case "full":  // find me
                    command = "find-me";
                    break;
                default:
                    break;
                }
                this.doCommand(command, "");
            }
        }

        // Commands
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
        onPause (dev_id) {
            if ( dev_id === id ) {
                this.doCommand("pause", "");
            }
        }
        onDock (dev_id) {
            if ( dev_id === id ) {
                this.doCommand("dock", "");
                this.setState({"loading":true});
            }
        }
        onFindMe (dev_id) {
            if ( dev_id === id ) {
                wsActions.setOneWay();
                this.doCommand("find-me", "");
            }
        }
        onSetFanSpeed (dev_id, value) {
            if ( dev_id === id ) {
                this.doCommand("set-fan-speed", value);
            }
        }
        onDo (dev_id, command) {
            if ( dev_id === id ) {
                this.doCommand(command, "");
            }
        }

        // Appearance
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

    VacuumStore.id = id;
    return VacuumStore;
}

export default VacuumStoreFactory;