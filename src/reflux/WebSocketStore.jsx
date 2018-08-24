import Reflux from 'reflux'
import lightActions from "./lightActions";
import {SOCKET_URL} from "../settings/urls";
import wsActions from "./wsActions";

const connectionTimeout = 3000; // ms
const pingInterval = 5000;

const actions = [lightActions];

let timerConnectionTimeout = null;
let timerPingInterval = null;
let connectingState = false;
let pingSent = false;

let ws = new WebSocket(SOCKET_URL);

const ping = () => {
    if (!connectingState) {
        console.log('ping');
        pingSent = true;
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
    pingSent = false;
};


class WebSocketStore extends Reflux.Store {

    constructor() {
        super();
        // this.state = {};
        this.listenables = wsActions;

        ws.onmessage = this.onMessage.bind(this);
        ws.onerror = this.onError.bind(this);
        ws.onopen = this.onOpen.bind(this);

        timerPingInterval = setInterval(ping, pingInterval);

        this.onDoCommand = this.onDoCommand.bind(this);
        this.onReconnect = this.onReconnect.bind(this);
    }


    // WebSocket event handlers

     onOpen() {
        console.log('Socket was open');
        ws.send('ping');
        connectingState = false;
        timerPingInterval = setInterval(ping, pingInterval);
        console.log('Socket reconnected');
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
            // Send data to clients store
            const data = JSON.parse(evt.data);
            actions.map(function (action) {
                action.message(data);
            });
            // lightActions.message(data);
        }
    }

    // Actions
    onDoCommand(data) {
        if (! connectingState && !pingSent) {
            ws.send(JSON.stringify(data));
        }
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