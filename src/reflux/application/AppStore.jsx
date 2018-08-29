import Reflux from 'reflux';
import appActions from "./appActions";

class AppStore extends Reflux.Store {
    constructor() {
        super();

        this.state = {
                 locations: [],
                 active_location: 'Default',
                 credentials: {},
                 openMenu: false,
        };

        this.listenables = appActions;
        this.onToggleMenu = this.onToggleMenu.bind(this);

    }


    // Actions
    onToggleMenu () {
        this.setState({openMenu: !this.state.openMenu})
    }

    onSetLocation (location) {
        this.setState({active_location: location});
    }
}

export default AppStore;