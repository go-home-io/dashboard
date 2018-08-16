// import HTTP from '../services/httpservices.jsx'
import Reflux from 'reflux'
import lightActions from './lightActions'
import WebSocketStore from "./WebSocketStore";
import wsActions from "./wsActions";
import HTTP from "../services/httpservices";

class StateStore extends Reflux.Store {

    constructor() {
        super();

        this.state = {
                        generalState:{},
                        authenticated: false,
        };

        this.listenables = stateActions;

        // Bind it
        this.onGetInitialState = this.onGetInitialState.bind(this);
    }

    onGetInitialState() {
            if (this.state.authenticated) {
                HTTP.get('/state')
                    .then((data) => {
                        this.setState({state: data});
                        console.log(this.state)
                    });
            }
    }



}

export default LightStoreFactory