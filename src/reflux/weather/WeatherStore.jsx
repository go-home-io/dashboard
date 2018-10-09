import Reflux from "reflux";
import weatherActions from "../weather/weatherActions";

//  Create unique Store for each Weather sensor
function WeatherStoreFactory(id,  device_info, location){
    class WeatherStore extends Reflux.Store {
        constructor() {
            super();

            this.state = {
                id:id,
                name: "",
                device_state: {},
                last_seen: 0,
                location: "",
                visible: false,
            };
            this.listenables = weatherActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.onVisible = this.onVisible.bind(this);

            this.setInitialState(device_info, location);
        }

        setInitialState(device_state, location) {
            if (device_state) {
                const {name, state, last_seen} = device_state;
                this.setState({
                    name: name,
                    device_state: state,
                    last_seen: last_seen,
                });
            }
            if (location) {
                this.setState({location: location});
            }
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
    }

    WeatherStore.id = id;
    return WeatherStore;
}

export default WeatherStoreFactory;