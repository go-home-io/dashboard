// import HTTP from '../services/httpservices.jsx'
import Reflux from 'reflux'
import lightActions from './lightActions'


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
            this.onOpen = this.onOpen.bind(this);
            this.getStatus = this.getStatus.bind(this);
            this.sendMessage = this.sendMessage.bind(this);
            this.onApply = this.onApply.bind(this);
            this.onSetColor = this.onSetColor.bind(this);
            this.onSetLevel = this.onSetLevel.bind(this);
            this.onSwitch = this.onSwitch.bind(this);
            this.onVisible = this.onVisible.bind(this);

            // WebSocket
            this.socket = new WebSocket("ws://localhost:8000/websocket");
            this.socket.onmessage = this.onMessage;
            this.socket.onopen = this.onOpen;
        }

        // Get initial component state on WebSocket open
        onOpen () {
           this.getStatus();
        }

        //
        getStatus () {
            this.sendMessage(getMessage);
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
            this.socket.send(JSON.stringify(data));
        }

       // WebSocket listener
        onMessage (evt) {
            const data = JSON.parse(evt.data);
            this.setState(data);
            this.setState({'loading':false})
        }

        // getComponentStateByHTTP () {
        //     HTTP.get('/ingredients?location=' + id)
        //         .then((data) => {
        //             this.setState({ingredients: data});
        //         });
        // }


        // Actions
        onApply (location) {
            if ( location === id) {
                this.postStatus();
            }
        }

        onSetColor (location, color) {
            if ( location === id) {
                this.setState({color:color});
            }
        }

        onSetLevel (location, level) {
            if ( location === id) {
                this.setState({level:level});
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