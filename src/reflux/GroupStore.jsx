import Reflux from 'reflux'
import groupActions from './groupActions';
import wsActions from "./wsActions";
import notificationActions from "./notificationActions";


//  Create unique Store for each Component
function GroupStoreFactory(id,  members, device_info, location){

    const visible = true;

    class GroupStore extends Reflux.Store {
        constructor() {
            super();

            this.state = {
                id:id,
                name: device_info.name,
                members: members,
                device_state: device_info.state,
                last_seen: device_info.last_seen,
                commands: device_info.commands,
                location: location,
                visible: true,
                status:'normal',
                read_only: device_info.read_only
            };

            this.listenables = groupActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.doCommand = this.doCommand.bind(this);
            this.onVisible = this.onVisible.bind(this);
            this.onToggle = this.onToggle.bind(this);
            this.onOn = this.onOn.bind(this);
            this.onOff = this.onOff.bind(this);

            console.log('Group store');
            console.log(this.state);
        }

        // componentDidMount () {
        //     console.log('Group store');
        //     console.log(this.state);
        // }

        // WebSocket messenger
        doCommand(command, value) {
            const mess = {id:id, cmd:command,value: value};
            this.setState({'loading':true});
            wsActions.doCommand(mess);
        }

        // WebSocket listener
        onMessage (data) {
            if (data.id === id) {
                // let state = this.state.device_state;
                let state = data.state;
                this.setState({device_state: state,
                    loading:false,
                    status:'success'});

            }
        }

        // Actions

        onOn (dev_id) {
            if ( dev_id === id ) {
                this.doCommand('on', "");
                this.setState({'loading':true});
            }
        }

        onOff (dev_id) {
            if ( dev_id === id ) {
                this.doCommand('off', "");
                this.setState({'loading':true});
            }
        }

        onToggle (dev_id) {
            if ( dev_id === id ) {
                this.doCommand('toggle', "");
            }
        }

        onVisible(location) {
            this.setState({visible: false});
            if (this.state.location === location) {
                this.setState({visible: true});
            }
        }

    }

    GroupStore.id = id;
    return GroupStore
}

export default GroupStoreFactory