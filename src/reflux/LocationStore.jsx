import Reflux from 'reflux'
import wsActions from "./wsActions";

//  Create unique Store for each Component
function LocationStoreFactory(id,  members){

    // const visible = (id === "cabinet");

    class LocationStore extends Reflux.Store {

        constructor() {
            super();

            this.state = { name:id,
                           members: members,
                           visible: true,
            };

            // this.listenables = locationActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.doCommand = this.doCommand.bind(this);
            this.onVisible = this.onVisible.bind(this);
        }

        // WebSocket messenger
        doCommand(command, value) {
            const mess = {id:id, cmd:command,value: value};

            this.setState({'loading':true});
            wsActions.doCommand(mess);
        }

        // WebSocket listener
        onMessage (data) {
            if (data.id === id) {
                // console.log(data);
                let state = this.state.device_state;
                state = data.state;
                this.setState({device_state: state,'loading':false});
            }
        }

        // Actions

        onVisible(location) {
            this.setState({visible: false});
            if ( location === this.state.location) {
                this.setState({visible: true});
            }
        }
    }

    LocationStore.id = id;
    return LocationStore
}

export default LocationStoreFactory