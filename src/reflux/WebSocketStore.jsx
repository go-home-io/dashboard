import Reflux from 'reflux'
import {SOCKET_URL} from "../settings/urls";
import lightActions from "./lightActions";
import wsActions from "./wsActions";
import groupActions from "./groupActions";

const connectionTimeout = 3000; // ms
const pingInterval = 5000;
const maxAttempts = 5;

const actions = [lightActions, groupActions];

let timerConnectionTimeout = null;
let timerPingInterval = null;

let timerAttempts = null;
let attempts = 0;


let connectingState = false;
let pongReceived = false;
const connAlive = () => {
    return pongReceived && !connectingState
};

// let ws = new WebSocket(SOCKET_URL);
let firstConnect = true;
let reconnectCount = 0;

// const ping = () => {
//     console.log('ping:'+reconnectCount);
//     if (!connectingState) {
//
//         pongReceived = false;
//         ws.send('ping');
//         timerConnectionTimeout = setTimeout(reconnectSocket, connectionTimeout);
//     }
// };

const pong =  () => {
    console.log('pong:'+reconnectCount);
    clearTimeout(timerConnectionTimeout);
    timerConnectionTimeout = null;
    pongReceived = true;
};

const reconnectSocket = () => {
    reconnectCount = reconnectCount + 1;
    console.log('reconnect:'+reconnectCount);
    connectingState = true;
    pongReceived = false;
    clearInterval(timerPingInterval);
    clearTimeout(timerConnectionTimeout);
    timerPingInterval = null;
    wsActions.reconnect();
};

class WebSocketStore extends Reflux.Store {

    constructor() {
        // alert('WS created');
        super();
        this.state = {
            rejected: false,
            reset: false,
        };
        this.listenables = wsActions;

        this.socket = new WebSocket(SOCKET_URL);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onclose = this.onClose.bind(this);

        this.onDoCommand = this.onDoCommand.bind(this);
        this.onReconnect = this.onReconnect.bind(this);
        this.onClear = this.onClear.bind(this);
        this.ping = this.ping.bind(this);

    }

    componentWillUnmount() {
        this.socket.close();
    }

    ping = () => {
        console.log('ping:'+reconnectCount);
        if (!connectingState) {
            pongReceived = false;
            this.socket.send('ping');
            timerConnectionTimeout = setTimeout(reconnectSocket, connectionTimeout);
        }
    };

    // WebSocket event handlers
    onOpen() {
        console.log('open:' + reconnectCount);
        connectingState = false;
        pongReceived = false;
        if (!timerPingInterval) {
            timerPingInterval = setInterval(this.ping.bind(this), pingInterval);
        }
        this.ping();
    }

    onClose() {
        console.log('close:' + reconnectCount);
        this.socket = new WebSocket(SOCKET_URL);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onclose = this.onClose.bind(this);
    }

    onError() {
        console.log('error:' + reconnectCount);
        reconnectSocket();
    };

    onMessage(evt) {
        if (evt.data === 'pong') {
            // Pong handle
            pong();
        } else {
            // Send data to all client stores
            const data = JSON.parse(evt.data);
            actions.map((action) => {
                action.message(data);
            });
        }
    }

    // Actions
    onDoCommand(data) {
        // Try to send command to server if socket ready
        // up to maxAttempts times. If not set the state {rejected:true}
        if (connAlive()) {
            this.socket.send(JSON.stringify(data));
            this.setState({rejected: false});
            clearTimeout(timerAttempts);
            if (attempts > 0) {
                this.setState({reset: true});
            }
            attempts = 0;
        } else {
            if (attempts >= maxAttempts) {
                this.setState({rejected: true});
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
        this.setState({rejected: false, reset: false});
    }

    onReconnect() {
        firstConnect = false;
        this.socket.close();
    }
}



export default WebSocketStore