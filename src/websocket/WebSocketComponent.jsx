import {useContext, useEffect} from "react";
import {EventEmitter} from "../context/EventEmitter";
import {SOCKET_URL} from "../settings/urls";
import {CONNECTION_TIMEOUT, MAX_ATTEMPTS, PING_INTERVAL, NEXT_ATTEMPT_DELAY} from "../settings/websocket";


let timerCONNECTION_TIMEOUT = null;
let timerPING_INTERVAL = null;

let timerAttempts = null;
let attempts = 0;

let connectingState = false;
let pongReceived = false;

const createSocket =(onMessage, onClose, onError, onOpen) => {
    const socket = new WebSocket(SOCKET_URL);
    socket.onmessage = onMessage;
    socket.onclose = onClose;
    socket.onerror = onError;
    socket.onopen = onOpen;
    return socket;
};


const WebSocketComponent = () => {

    // ------------------- Socket callbacks --------------------------------

    const onOpen = () => {
        connectingState = false;
        pongReceived = false;
        if (! timerPING_INTERVAL) {
            timerPING_INTERVAL = setInterval(ping, PING_INTERVAL);
        }
        ping();
    };

    const onMessage = (evt) => {
        const { data } = evt;
        if ( data === "pong" ) {
            // Pong handle
            pong();
        } else {
            // Broadcast server message
            const mess = JSON.parse(data);
            raiseEvent("message", mess); // Message to Device
        }
    };

    const onClose = () => {
        socket = createSocket(onMessage, onClose, onError, onOpen);
    };

    const onError = (evt) => {
        console.log("websocket error:", evt);
        socket.close();
    };

    // -------------------- Keep alive methods ----------------------------

    const connAlive = () => {
        return pongReceived && !connectingState;
    };

    const reopenSocket = ()  => {
        connectingState = true;
        pongReceived = false;
        clearInterval(timerPING_INTERVAL);
        clearTimeout(timerCONNECTION_TIMEOUT);
        timerPING_INTERVAL = null;
        socket.close();
    };

    const ping = () => {
        if (!connectingState) {
            pongReceived = false;
            socket.send("ping");
            timerCONNECTION_TIMEOUT = setTimeout(reopenSocket, CONNECTION_TIMEOUT);
        }
    };

    const pong = () => {
        clearTimeout(timerCONNECTION_TIMEOUT);
        timerCONNECTION_TIMEOUT = null;
        pongReceived = true;
    };

    // ----------------- Send message to server ------------------

    const onDoCommand = data => {
        // Try to send command to server if socket ready
        // up to MAX_ATTEMPTS times. If not, set the state {rejected:true}
        const { id, cmd, value, oneWay } = data;

        if ( connAlive() ) {
            // Socket ready
            socket.send(JSON.stringify({
                id: id,
                cmd: cmd,
                value: value
            }));
            clearTimeout(timerAttempts);
            if ( attempts > 0) raiseEvent("reset", data.id); // Socket can send command after several attempts
            attempts = 0;
            if ( oneWay ) oneWayCommandServerResponseEmulation(data.id);

        } else {
            // Socket isn't ready
            if (attempts >= MAX_ATTEMPTS) {
                //  The limit of attempts exceeded
                raiseEvent("rejected", data.id); // Inform subscribers that socket can't send command
                clearTimeout(timerAttempts);
                attempts = 0;
            } else {
                // Try to send command once more after delay ATTEMPT_DELAY
                timerAttempts = setTimeout( () => {
                    attempts = attempts + 1;
                    onDoCommand(data);
                },
                NEXT_ATTEMPT_DELAY);
            }
        }
    };

    // ----------------- One way command handling -------------------------

    const oneWayCommandServerResponseEmulation = (dev_id) => {
        const mess = { id:dev_id, state: "oneWayResponse"};
        setTimeout( () => {
            raiseEvent("message", mess);
        }, 200);
    };

    // ----------------- State and subscription ---------------------------

    const {raiseEvent, subscribe} = useContext(EventEmitter);

    useEffect( () => {
        subscribe("command", onDoCommand);
        subscribe("reconnect", reopenSocket);
    },
    // eslint-disable-next-line
    []);

    // Run socket
    let socket = createSocket(onMessage, onClose, onError, onOpen);

    return null;
};

export default WebSocketComponent;