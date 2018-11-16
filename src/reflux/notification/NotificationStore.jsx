import Reflux from "reflux";
import notificationActions from "./notificationActions";
import storage from "../../services/storage";

class NotificationStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            open:false,
            currentNotification: {},
            queue: [],
            ntfList: [],
            unseenCount: 0,
        };
        this.listenables = notificationActions;

        this.onNotification = this.onNotification.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onProcessQueue = this.onProcessQueue.bind(this);
        this.onSeen = this.onSeen.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.getNtfList = this.getNtfList.bind(this);

        this.getNtfList();
    }
    getNtfList () {
        const ntfList = storage.get("notificationsList");
        let count = 0;
        if ( ntfList ) {
            // eslint-disable-next-line
            ntfList.map( item => {
                if ( ! item.seen ) {
                    count = count + 1;
                }
            });
            this.setState( {
                ntfList: ntfList,
                unseenCount: count
            });
        }
    }
    processQueue ()  {
        let { queue } = this.state;
        if ( queue.length > 0 ) {
            // eslint-disable-next-line
            const current  = queue.shift();
            this.setState({
                currentNotification: current,
                open: true,
                queue: queue,
            });
        }
    }

    // WebSocket listener
    onMessage (data) {
        if (data.id === "notification") {
            let { state } = data;

            // Save notification to state and to storage
            state.seen = false;
            let { ntfList, unseenCount } = this.state;
            ntfList.push(state);
            this.setState( {
                ntfList: ntfList,
                unseenCount: unseenCount + 1
            });
            storage.set("notificationsList", ntfList);

            // Show notification
            const mess = state.origin.toUpperCase() + ": " + state.message;
            this.onNotification( mess, state.status);
        }
    }

    // Actions
    onSeen () {
        let { ntfList } = this.state;
        for (let i=0; i < ntfList.length; i++) {
            ntfList[i].seen = true;
        }
        this.setState({
            ntfList: ntfList,
            unseenCount: 0
        });
        storage.set("notificationsList", ntfList);
    }
    onDismiss () {
        this.setState( {
            ntfList: [],
            unseenCount: 0,
        });
        storage.set("notificationsList", null);
    }
    onNotification (message, status = "default" ) {
        // eslint-disable-next-line
        let queue = this.state.queue;
        const newNode = {"message": message, "type": status};
        queue.push(newNode);
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
        this.setState({
            open: false,
        });
    }
    onProcessQueue() {
        this.processQueue();
    }
}

export default NotificationStore;