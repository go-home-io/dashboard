import Reflux from "reflux";
import cameraActions from "./cameraActions";
import wsActions from "../socket/wsActions";
import notificationActions from "../notification/notificationActions";
import AppStore from "../application/AppStore";

//  Create unique Store for each Camera
function CameraStoreFactory(id, device_state, location, group_id) {
    class CameraStore extends Reflux.Store {
        constructor() {
            super();
            this.state = {
                id:id,
                name: "",
                device_state: {},
                last_seen: 0,
                // commands: device_state.commands,
                group_id: "",
                location: "",
                visible: false,
             };
            this.listenables = cameraActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.onVisible = this.onVisible.bind(this);

            this.setInitialState(device_state, location, group_id);
            console.log(this.state);
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
                this.setState({location: location})
            }
            if (group_id) {
                this.setState({group_id: group_id})
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

        // Appearance
        onVisible(location) {
            this.setState({visible: false});
            if (this.state.location === location) {
                this.setState({visible: true});
            }
        }

    }

    CameraStore.id = id;
    return CameraStore;
}

export default CameraStoreFactory;