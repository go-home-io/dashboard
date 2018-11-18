import React, {Component} from "react";
import DevicePage from "./DevicePage";
import HTTP from "../../services/httpservices";
import base64 from "base-64";
import ErrorPage from "./ErrorPage";
import Cookie from "js-cookie";
import {COOKIE_NAME} from "../../settings/cookie";
import SignIn from "./SignIn";
import AppBarPlaceholder from "../navigation/AppBarPlaceholder";
import { STATE_URL } from "../../settings/urls";

class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generalState:{},
            authenticated: false,
            auth_error: false,
            auth_required: false,
            status: null,
            loading: true,
        };
    }

    componentDidMount() {
        this.getComponentStateByHTTP();
    }

    getComponentStateByHTTP () {
        // const vlad_url = "https://home.v-home.duckdns.org/api/v1/state";
        // STATE_URL
        HTTP.get(STATE_URL)
            .then((data) => {
                if (data >= 300) {
                    if (data === 401 || data === 403) {
                        // Authentication required
                        Cookie.remove(COOKIE_NAME);
                        this.setState({authenticated:false, auth_required: true, loading: false});
                    } else {
                        // Other connection errors
                        this.setState({status:data, loading: false});
                    }
                } else {
                    // Success
                    this.setState({
                        generalState:data,
                        authenticated: true,
                        auth_error: false,
                        auth_required: false,
                        status: null,
                        loading: false
                    });
                }
            });
    }
    getCredentials (user, password) {
        const credentials = "Basic " + base64.encode(user + ":" + password);
        Cookie.set(COOKIE_NAME, credentials);
        this.setState({auth_error: true, loading: true, auth_required: false});
        this.getComponentStateByHTTP();
    }
    render () {
        const { authenticated, generalState, auth_required, auth_error, status, loading } = this.state;
        return (
            loading ?
                <ErrorPage loading = { loading }/>
                :
                authenticated ?
                    <DevicePage
                        generalState = { generalState }
                    /> :
                    auth_required ?
                        <div>
                            <AppBarPlaceholder/>
                            <SignIn
                                getCredentials = { this.getCredentials.bind(this) }
                                error = { auth_error }
                            />
                        </div>
                        :
                        <div>
                            <ErrorPage
                                status = { status }
                            />
                        </div>
        );
    }
}

export default StartPage;