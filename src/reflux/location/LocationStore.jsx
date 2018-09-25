import Reflux from "reflux";
import lightActions from "../light/lightActions";
import locationActions from "./locationActions";
import groupActions from "../group/groupActions";
import sensorActions from "../sensor/sensorActions";
import vacuumActions from "../vacuum/vacuumActions";

const actions = [lightActions, groupActions, sensorActions, vacuumActions];

//  Create unique Store for each Component
function LocationStoreFactory(name,  members){

    class LocationStore extends Reflux.Store {

        constructor() {
            super();

            this.state = { name:name,
                members: members,
                visible: false,
            };
            this.listenables = locationActions;

            this.onVisible = this.onVisible.bind(this);
        }

        // Actions
        onVisible(location) {
            this.setState({visible:false});
            if (location === name) {
                this.setState({visible: true});
                // eslint-disable-next-line
                actions.map( (action)  => {
                    action.visible(name);
                });
            }
        }
    }

    LocationStore.id = name;
    return LocationStore;
}

export default LocationStoreFactory;