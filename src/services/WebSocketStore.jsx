// const socket = new WebSocket("ws://localhost:8000/websocket");
//
// const socketOnMess = socket.onmessage;
// const socketOnOpen = socket.onopen;
//
// export default {socket, socketOnMess, socketOnOpen}

import React from 'react'
import Reflux from 'reflux'
import lightActions from "../reflux/lightActions";
import wsActions from "../services/wsActions";

class WebSocketStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {};
        this.listenables = wsActions;

        this.socket = new WebSocket("ws://localhost:8000/websocket");
        this.socket.onmessage = this.onMessage;
        // this.socket.onopen = this.onOpen;

        this.onMessage = this.onMessage.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
    }

    // Socket events
    onMessage (evt) {
        const data = JSON.parse(evt.data);
        lightActions.message(data);
    }

    // Actions
    onSendMessage(data) {
        this.socket.send(JSON.stringify(data));
    }

}

export default WebSocketStore