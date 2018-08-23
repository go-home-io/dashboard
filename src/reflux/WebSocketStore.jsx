import Reflux from 'reflux'
import lightActions from "./lightActions";
import {SOCKET_URL} from "../settings/urls";
import wsActions from "./wsActions";

const connectionTimeout = 3000; // ms
const pingInterval = 5000;

let timer = null;
let ws = new WebSocket(SOCKET_URL);

class WebSocketStore extends Reflux.Store {

    constructor() {
        super();
        // this.state = {};
        this.listenables = wsActions;

        ws.onmessage = this.onMessage;
        ws.onerror = this.onError;

        setInterval(this.ping, pingInterval);

        this.onMessage = this.onMessage.bind(this);
        this.onDoCommand = this.onDoCommand.bind(this);
        this.ping = this.ping.bind(this);
        this.onReconnect = this.onReconnect.bind(this);
        this.onError = this.onError.bind(this);
    }

    ping () {
        ws.send('ping');
        timer = setTimeout(wsActions.reconnect, connectionTimeout);
    }

    // Socket events
    onMessage (evt) {
        if (evt.data === 'pong') {
            // Pong handle
            clearTimeout(timer);
        } else {
            // Send data to client store
            const data = JSON.parse(evt.data);
            lightActions.message(data);
        }
    }

    onError (evt) {
        wsActions.reconnect();
    };

    // Actions
    onDoCommand(data) {
        ws.send(JSON.stringify(data));
    }

    onReconnect () {
        ws.close();
        ws = new WebSocket(SOCKET_URL);
        ws.onmessage = this.onMessage;
        ws.onerror = this.onError;
        console.log('Socket reconnected');
    }
}

export default WebSocketStore