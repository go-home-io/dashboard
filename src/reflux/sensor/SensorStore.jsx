import Reflux from "reflux";
import sensorActions from "./sensorActions";
// import notificationActions from "../notification/notificationActions";

//  Create unique Store for each Component
function SensorStoreFactory(id,  device_info, location){

    class SensorStore extends Reflux.Store {
        constructor() {
            super();

            this.state = {
                id:id,
                name: device_info.name,
                type: device_info.state.sensor_type,
                device_state: device_info.state,
                last_seen: device_info.last_seen,
                location: location,
                visible: false,
                read_only: device_info.read_only,
                status: "ordinary",
            };
            this.listenables = sensorActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.onVisible = this.onVisible.bind(this);
            this.onStatus = this.onStatus.bind(this);
        }

        // WebSocket listener
        onMessage (data) {
            if (data.id === id) {
                this.setState({device_state: data.state,
                    status:"success",
                });
            }
        }

        // Actions
        onVisible(location) {
            this.setState({visible: false});
            if (this.state.location === location) {
                this.setState({visible: true});
            }
        }

        onStatus(dev_id, status) {
            if ( dev_id === id ) {
                this.setState({status:status});
            }
        }
    }

    SensorStore.id = id;
    return SensorStore;
}

export default SensorStoreFactory;