import Reflux from "reflux";
import {SOCKET_URL} from "../settings/urls";
import {CONNECTION_TIMEOUT, PING_INTERVAL, MAX_ATTEMPTS} from "../settings/websocket";
// import wsActions from "./wsActions";
// import actions from "../actions";
// import notificationActions from "../notification/notificationActions";
// import {AppContext} from "../../context/AppContext";

let timerCONNECTION_TIMEOUT = null;
let timerPING_INTERVAL = null;

let timerAttempts = null;
let attempts = 0;

let connectingState = false;
let pongReceived = false;

const connAlive = () => {
    return pongReceived && !connectingState;
};

class WebSocket extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            rejected: false,
            reset: false,
            oneWay: false,
            setSocketState: (obj) => this.setState(obj),
            doCommand: (data) => this.onDoCommand(data),
            reconnect: () => this.reopenSocket()
        };
        this.socket = null;
        this.createSocket();

        this.onDoCommand = this.onDoCommand.bind(this);
        this.ping = this.ping.bind(this);
        this.pong = this.pong.bind(this);
        this.reopenSocket = this.reopenSocket.bind(this);
    }
    componentDidMount() {

    }

    createSocket() {
        this.socket = new WebSocket(SOCKET_URL);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onclose = this.onClose.bind(this);
    }

    // Keep alive functions
    reopenSocket ()  {
        connectingState = true;
        pongReceived = false;
        clearInterval(timerPING_INTERVAL);
        clearTimeout(timerCONNECTION_TIMEOUT);
        timerPING_INTERVAL = null;
        this.socket.close();
    }
    ping () {
        if (!connectingState) {
            pongReceived = false;
            this.socket.send("ping");
            timerCONNECTION_TIMEOUT = setTimeout(this.reopenSocket, CONNECTION_TIMEOUT);
        }
    }
    pong ()  {
        clearTimeout(timerCONNECTION_TIMEOUT);
        timerCONNECTION_TIMEOUT = null;
        pongReceived = true;
    }

    // WebSocket event handlers
    onOpen() {
        connectingState = false;
        pongReceived = false;
        if (!timerPING_INTERVAL) {
            timerPING_INTERVAL = setInterval(this.ping, PING_INTERVAL);
        }
        this.ping();
    }
    onClose() {
        this.createSocket();
    }
    onError() {
        // eslint-disable-next-line
        console.log("Socket error");
        this.reopenSocket();
    }

    // Socket listener
    onMessage(evt) {
        if (evt.data === "pong") {
            // Pong handle
            this.pong();
        } else {
            // Notification
            const data = JSON.parse(evt.data);
            if ( data.id === "notification") {
                // notificationActions.message(data);
            } else {
                // Broadcast data to all client stores

                // eslint-disable-next-line
                actions.map((action) => {
                    action.message(data);
                });
            }
        }
    }
    //
    oneWayCommandServerResponseEmulation (dev_id) {
        this.setState({oneWay: false});
        const data = {"id":dev_id, "state":"oneWayResponse"};

        setTimeout( () => {
            // eslint-disable-next-line
            actions.map((action) => {
                action.message(data);
            });
        }, 200);
    }

    // Actions
    onDoCommand(data) {
        // Try to send command to server if socket ready
        // up to MAX_ATTEMPTS times. If not, set the state {rejected:true}
        if (connAlive()) {
            // Socket ready
            this.socket.send(JSON.stringify(data));
            this.setState({rejected: false});
            clearTimeout(timerAttempts);
            if (attempts > 0) {
                this.setState({reset: true});
            }
            attempts = 0;
            if (this.state.oneWay) {
                this.oneWayCommandServerResponseEmulation(data.id);
            }
        } else {
            // Socket isn't ready
            if (attempts >= MAX_ATTEMPTS) {
                // Exceeded the limit of attempts
                this.setState({rejected: true});
                clearTimeout(timerAttempts);
                attempts = 0;
            } else {
                // Try to send command once more
                timerAttempts = setTimeout( () => {
                    attempts = attempts + 1;
                    this.onDoCommand(data);
                }, 500);
            }
        }
    }
    // onReconnect() {
    //     this.reopenSocket();
    // }
    // onSetOneWay () {
    //     this.setState({oneWay: true});
    // }
    //
}

export default WebSocket;