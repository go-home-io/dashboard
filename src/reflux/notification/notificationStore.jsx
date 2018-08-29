import Reflux from 'reflux'
import notificationActions from "./notificationActions";

class notificationStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {
              open:false,
              message: null
        };

        this.listenables = notificationActions;
    }

    // Actions
    onNotification (message) {
        this.setState({open: true, message: message});
    }

    onClose () {
        this.setState({open: false, message: null});
    }
}

export default notificationStore