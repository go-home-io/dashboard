import Reflux from 'reflux'
import lightActions from "./lightActions";
import wsActions from "./wsActions";
import SOCKET_URL from '../settings/websocketUrl'

class WebSocketStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {};
        this.listenables = wsActions;

        this.socket = new WebSocket(SOCKET_URL);
        this.socket.onmessage = this.onMessage;
        // this.socket.onopen = this.onOpen;

        this.onMessage = this.onMessage.bind(this);
        this.onDoCommand = this.onDoCommand.bind(this);
    }

    // Socket events
    onMessage (evt) {
        const data = JSON.parse(evt.data);
        lightActions.message(data);
    }

    // Actions
    onDoCommand(data) {
        this.socket.send(JSON.stringify(data));
    }

}

export default WebSocketStore