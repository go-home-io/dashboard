import Reflux from 'reflux'
import lightActions from './lightActions'
import wsActions from "./wsActions";

//  Create unique Store for each Component
function LightStoreFactory(id,  device_info){

    // let postMessage = {
    //     'method': 'POST',
    //     'category' : 'light',
    //     'location': id,
    //     'light_status':{}
    // };
    //
    // const getMessage = {
    //     'method': 'GET',
    //     'category': 'light',
    //     'location': id
    // };

    const visible = true;

    class LightStore extends Reflux.Store {

        constructor() {
            super();

            this.state = { id:id,
                           name: device_info.name,
                           worker: device_info.worker,
                           device_state: device_info.state,
                           last_seen: device_info.last_seen,
                           commands: device_info.commands,
                           group_id: '',
                           location: 'default',
                           loading:false,
                           visible: visible,
            };

            this.listenables = lightActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.doCommand = this.doCommand.bind(this);
            this.onSetColor = this.onSetColor.bind(this);
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
                let state = this.state.device_state;
                state.device_state = data.state;
                this.setState({device_state: state});
                this.setState({'loading':false});
                console.log(this.state.device_state);
            }
        }

        // getComponentStateByHTTP () {
        //     HTTP.get('/ingredients?location=' + id)
        //         .then((data) => {
        //             this.setState({ingredients: data});
        //         });
        // }


        // Actions
        onSetColor (dev_id, color) {
            if ( dev_id === id) {

                this.doCommand('set-color', color);
                this.setState({'loading':true});
            }
        }

        onSetBrightness (dev_id, level) {
            if ( dev_id === id ) {
                this.setState({level:level});
                this.doCommand();
            }
        }

        onToggle (dev_id) {
            if ( dev_id === id) {
                // let dev_state = this.state.device_state;
                // dev_state.color = color;
                // const command = {id:dev_id,cmd:"set-color",value: color};
                // this.doCommand(command);
                // this.setState({'loading':true});
            }
        }

        onOn () {

        }
        onVisible(location) {
            this.setState({visible: false});
            if ( location === id) {
                this.setState({visible: true});
            }
        }
  }

    LightStore.id = id;
    return LightStore
}

export default LightStoreFactory