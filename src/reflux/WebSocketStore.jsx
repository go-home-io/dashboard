import Reflux from 'reflux'
import {SOCKET_URL} from "../settings/urls";
import lightActions from "./lightActions";
import wsActions from "./wsActions";

const connectionTimeout = 3000; // ms
const pingInterval = 5000;
const maxAttempts = 5;

const actions = [lightActions];

let timerConnectionTimeout = null;
let timerPingInterval = null;

let timerAttempts = null;
let attempts = 0;


let connectingState = false;
let pongReceived = false;
const connAlive = () => {
    return pongReceived && !connectingState
};

let ws = new WebSocket(SOCKET_URL);


const ping = () => {
    if (!connectingState) {
        // console.log('ping');
        pongReceived = false;
        ws.send('ping');
        timerConnectionTimeout = setTimeout( () => {
            connectingState = true;
            clearInterval(timerPingInterval);
            wsActions.reconnect();
        }, connectionTimeout);
    }
};

const pong =  () => {
    clearTimeout(timerConnectionTimeout);
    pongReceived = true;
};


class WebSocketStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { rejected:false,
                       reset: false,
        };
        this.listenables = wsActions;

        ws.onmessage = this.onMessage.bind(this);
        ws.onerror = this.onError.bind(this);
        ws.onopen = this.onOpen.bind(this);

        timerPingInterval = setInterval(ping, pingInterval);

        this.onDoCommand = this.onDoCommand.bind(this);
        this.onReconnect = this.onReconnect.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    // WebSocket event handlers
     onOpen() {
        ws.send('ping');
        connectingState = false;
        timerPingInterval = setInterval(ping, pingInterval);
        // console.log('Socket was reconnected');
    }

    onError () {
        connectingState = true;
        wsActions.reconnect();
    };

    onMessage (evt) {
        if (evt.data === 'pong') {
            // Pong handle
            pong();
        } else {
            // Send data to all client stores
            const data = JSON.parse(evt.data);
            actions.map( (action) => {
                action.message(data);
            });
        }
    }

    // Actions
    onDoCommand(data) {
        // Try to send command to server if socket ready
        // up to maxAttempts times. If not set the state {rejected:true}
        if (connAlive()) {
            ws.send(JSON.stringify(data));
            this.setState({rejected: false});
            clearTimeout(timerAttempts);
            if (attempts > 0) {
                this.setState({reset: true});
            }
            // console.log('send '+'| attempt = '+attempts);
            attempts = 0;
        } else {
            if (attempts >= maxAttempts) {
                this.setState({rejected:true});
                clearTimeout(timerAttempts);
                attempts = 0;
                // console.log('rejected:'+this.state.rejected);
            } else {
                timerAttempts = setTimeout(function () {
                    attempts = attempts + 1;
                    // console.log('try again! attemt: '+attempts);
                    wsActions.doCommand(data);
                }, 500)
            }
        }

    }

    onClear() {
        this.setState({rejected: false, reset:false});
        // console.log('Clear state');
        // console.log(this.state);
    }

    onReconnect () {
        ws.close();
        ws = new WebSocket(SOCKET_URL);
        ws.onmessage = this.onMessage.bind(this);
        ws.onerror = this.onError.bind(this);
        ws.onopen = this.onOpen.bind(this);
    }
}

export default WebSocketStore