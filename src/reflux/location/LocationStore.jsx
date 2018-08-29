import Reflux from 'reflux'
import lightActions from "../light/lightActions";
import locationActions from "./locationActions";
import groupActions from "../group/groupActions";
import sensorActions from "../sensor/sensorActions";

const actions = [lightActions, groupActions, sensorActions];

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

            this.onMessage = this.onMessage.bind(this);
            this.doCommand = this.doCommand.bind(this);
            this.onVisible = this.onVisible.bind(this);
        }

        // WebSocket messenger
        doCommand(command, value) {
            // const mess = {id:name, cmd:command,value: value};
            //
            // this.setState({'loading':true});
            // wsActions.doCommand(mess);
        }

        // WebSocket listener
        onMessage (data) {
            // if (data.id === name) {
            //     this.setState({device_state: data.state});
            // }
        }

        // Actions
        onVisible(location) {
            this.setState({visible:false});
            if (location === name) {
                this.setState({visible: true});
                actions.map( (action)  => {
                    action.visible(name);
                });
            }
        }
    }

    LocationStore.id = name;
    return LocationStore;
}

export default LocationStoreFactory