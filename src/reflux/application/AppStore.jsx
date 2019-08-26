import Reflux from "reflux";
import appActions from "./appActions";

class AppStore extends Reflux.Store {
    constructor() {
        super();

        this.state = {
            active_page: "devices",
            active_location: "Default",
            active_group: null,
            active_group_on: false,
            uom: "",
            openMenu: false,
            // generalState: {},
            // workerLoaded: false,
            statusLoaded: false,
        };

        this.listenables = appActions;
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSetLocation = this.onSetLocation.bind(this);
        this.onSetUOM = this.onSetUOM.bind(this);
        this.onSetActiveGroup = this.onSetActiveGroup.bind(this);
        this.onSetActiveGroupOn = this.onSetActiveGroupOn.bind(this);
        this.onSetActivePage = this.onSetActivePage.bind(this);
        // this.onWorkerSuccessfullyLoaded = this.onWorkerSuccessfullyLoaded.bind(this);
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
    onSetActiveGroup(dev_id, on){
        const { active_group } = this.state;
        if ( active_group || ! dev_id ) {
            this.setState({active_group: null});
        } else {
            this.setState({active_group: dev_id, active_group_on: on});
        }
    }
    onSetActiveGroupOn(dev_id, on) {
        if ( dev_id === this.state.active_group ) {
            this.setState({active_group_on: on});
        }
    }
    onSetActivePage(page) {
        this.setState({active_page: page});
    }
    // onWorkerSuccessfullyLoaded () {
    //     this.setState({workerLoaded: true});
    // }
}

export default AppStore;