import Reflux from "reflux";
import notificationActions from "./notificationActions";

class notificationStore extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            open:false,
            messageInfo: null,
            queue: [],
        };
        this.listenables = notificationActions;

        this.onNotification = this.onNotification.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onProcessQueue = this.onProcessQueue.bind(this);
    }
    processQueue ()  {
        if (this.state.queue.length > 0) {
            // eslint-disable-next-line
            let queue = this.state.queue;
            const mess = queue.shift();
            this.setState({
                messageInfo: mess,
                open: true,
                queue: queue,
            });
        }
    }

    // Actions
    onNotification (message) {
        // eslint-disable-next-line
        let queue = this.state.queue;
        queue.push(message);
        this.setState({
            queue: queue
        });
        if (this.state.open) {
            // immediately begin dismissing current message
            // to start showing new one
            this.setState({ open: false });
        } else {
            this.processQueue();
        }
    }
    onClose () {
        this.setState({open: false, messageInfo: null });
    }
    onProcessQueue() {
        this.processQueue();
    }
}

export default notificationStore;