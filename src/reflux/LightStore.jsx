// import HTTP from '../services/httpservices.jsx'
import Reflux from 'reflux'
import lightActions from './lightActions'
import WebSocketStore from "../services/WebSocketStore";
import wsActions from "../services/wsActions";

//  Create unique Store for each Component
function LightStoreFactory(id, startLocation) {

    let postMessage = {
        'method': 'POST',
        'category' : 'light',
        'location': id,
        'light_status':{}
    };

    const getMessage = {
        'method': 'GET',
        'category': 'light',
        'location': id
    };

    const visible = (id === startLocation);

    class LightStore extends Reflux.Store {

        constructor() {
            super();

            this.state = { switchOn: false,
                           level: 70,
                           color: 0,
                           loading:false,
                           visible: visible,
            };

            this.listenables = lightActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.sendMessage = this.sendMessage.bind(this);
            this.onSetColor = this.onSetColor.bind(this);
            this.onSetLevel = this.onSetLevel.bind(this);
            this.onSwitch = this.onSwitch.bind(this);
            this.onVisible = this.onVisible.bind(this);

         }

          postStatus ()  {
            postMessage['light_status'] = {
                                           level:this.state.level,
                                           color:this.state.color,
                                           switchOn:this.state.switchOn
                                          };
            this.sendMessage(postMessage);
        };

        // WebSocket messenger
        sendMessage(data) {
            this.setState({'loading':true});
            wsActions.sendMessage(data);
        }

       // WebSocket listener
        onMessage (data) {

            if (data.id === id) {
                console.log(data);
                this.setState({level:data.level,
                               color:data.color,
                               switchOn:data.switchOn});
                this.setState({'loading':false})
            }
        }

        // getComponentStateByHTTP () {
        //     HTTP.get('/ingredients?location=' + id)
        //         .then((data) => {
        //             this.setState({ingredients: data});
        //         });
        // }


        // Actions

        onSetColor (location, color) {
            if ( location === id) {
                this.setState({color:color});
                this.postStatus();
            }
        }

        onSetLevel (location, level) {
            if ( location === id) {
                this.setState({level:level});
                this.postStatus();
            }
        }

        onSwitch (location) {
            if ( location === id) {
                this.setState({switchOn:! this.state.switchOn});
                this.postStatus();
            }
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