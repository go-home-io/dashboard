import Reflux from 'reflux';
import appActions from "./appActions";

class AppStore extends Reflux.Store {
    constructor() {
        super();

        this.state = {
                 locations: [],
                 active_location: '',
                 credentials: {},
                 openMenu: false,
        };

        this.listenables = appActions;
        this.onToggleMenu = this.onToggleMenu.bind(this);

    }

    // componentDidMount () {
    //     this.setState({openMenu:false})
    // }

    // Actions
    onToggleMenu () {
        this.setState({openMenu: !this.state.openMenu})
    }
}

export default AppStore;