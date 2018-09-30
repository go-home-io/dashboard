import Reflux from "reflux";
import locationActions from "./locationActions";
import actions from "../actions";

//  Create unique Store for each Location
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