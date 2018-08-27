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
let firstConnect = true;

const ping = () => {
    if (!connectingState) {
        // console.log('ping:'+reconnectAttempts);
        pongReceived = false;
        ws.send('ping');
        timerConnectionTimeout = setTimeout(reconnectSocket, connectionTimeout);
    }
};

const pong =  () => {
    clearTimeout(timerConnectionTimeout);
    pongReceived = true;
};

const reconnectSocket = () => {
    setTimeout(function () {
        connectingState = true;
        pongReceived = false;
        clearInterval(timerPingInterval);
        clearTimeout(timerConnectionTimeout);
        wsActions.reconnect();
    }, 500);
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
        ws.onclose = this.onClose.bind(this);

        timerPingInterval = setInterval(ping, pingInterval);

        this.onDoCommand = this.onDoCommand.bind(this);
        this.onReconnect = this.onReconnect.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    // WebSocket event handlers
     onOpen() {
        if (! firstConnect) {
            ws.send('ping');
            connectingState = false;
            pongReceived = false;
            timerPingInterval = setInterval(ping, pingInterval);
        }
    }

    onClose() {
        ws = new WebSocket(SOCKET_URL);
        ws.onmessage = this.onMessage.bind(this);
        ws.onerror = this.onError.bind(this);
        ws.onopen = this.onOpen.bind(this);
        ws.onclose = this.onClose.bind(this);
    }

    onError () {
        reconnectSocket();
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
            attempts = 0;
        } else {
            if (attempts >= maxAttempts) {
                this.setState({rejected:true});
                clearTimeout(timerAttempts);
                attempts = 0;
            } else {
                timerAttempts = setTimeout(function () {
                    attempts = attempts + 1;
                    wsActions.doCommand(data);
                }, 500)
            }
        }

    }

    onClear() {
        this.setState({rejected: false, reset:false});
    }

    onReconnect () {
        firstConnect = false;
        ws.close();
    }
}

export default WebSocketStore