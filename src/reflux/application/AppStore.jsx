import Reflux from "reflux";
import appActions from "./appActions";

class AppStore extends Reflux.Store {
    constructor() {
        super();

        this.state = {
            active_location: "Default",
            uom: "",
            openMenu: false,
        };

        this.listenables = appActions;
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSetLocation = this.onSetLocation.bind(this);
        this.onSetUOM = this.onSetUOM.bind(this);
    }

    // Actions
    onToggleMenu () {
        // eslint-disable-next-line
        this.setState({openMenu: !this.state.openMenu});
    }
    onSetLocation (location) {
        this.setState({active_location: location});
    }
    onSetUOM(unit_scheme) {
        this.setState({uom: unit_scheme});
    }
}

export default AppStore;