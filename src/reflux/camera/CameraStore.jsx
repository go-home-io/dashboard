import Reflux from "reflux";
import cameraActions from "./cameraActions";
import wsActions from "../socket/wsActions";

//  Create unique Store for each Camera
function CameraStoreFactory(id, device_state, group_id) {
    class CameraStore extends Reflux.Store {
        constructor() {
            super();
            this.state = {
                id:id,
                name: "",
                device_state: {},
                last_seen: 0,
                group_id: "",
            };
            this.listenables = cameraActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.setInitialState(device_state, group_id);
        }

        setInitialState(device_state, location, group_id) {
            if (device_state) {
                this.setState({
                    name: device_state.name,
                    device_state: device_state.state,
                    last_seen: device_state.last_seen,
                });
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
                        device_state: data.state});
                }
            }
        }
    }

    CameraStore.id = id;
    return CameraStore;
}

export default CameraStoreFactory;