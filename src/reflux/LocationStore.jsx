import Reflux from 'reflux'
import wsActions from "./wsActions";
import lightActions from "./lightActions";
import locationActions from "./locationActions";

//  Create unique Store for each Component
function LocationStoreFactory(name,  members){

    class LocationStore extends Reflux.Store {

        constructor() {
            super();

            this.state = { name:name,
                           members: members,
                         };
            this.listenables = locationActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.doCommand = this.doCommand.bind(this);
            this.onVisible = this.onVisible.bind(this);
        }

        // WebSocket messenger
        doCommand(command, value) {
            const mess = {id:name, cmd:command,value: value};

            this.setState({'loading':true});
            wsActions.doCommand(mess);
        }

        // WebSocket listener
        onMessage (data) {
            if (data.id === name) {
                let state = this.state.device_state;
                state = data.state;
                this.setState({device_state: state,'loading':false});
            }
        }

        // Actions
        onVisible(location) {
            if (location === name) {
                // this.state.members.map( member => {
                    // console.log('Location store: '+member);
                    lightActions.visible(name);
                // })
            }
        }
    }

    LocationStore.id = name;
    return LocationStore;
}

export default LocationStoreFactory