import React, {Component} from "react";
import HTTP from "../../services/httpservices";
import base64 from "base-64";
import ErrorPage from "./ErrorPage";
import Cookie from "js-cookie";
import {COOKIE_NAME} from "../../settings/cookie";
import SignIn from "./SignIn";
import AppBarPlaceholder from "../navigation/AppBarPlaceholder";
import { STATE_URL } from "../../settings/urls";
import RouterFunc from "./RouterFunc";

class StartPage extends Component {
    state = {
        generalState: null,
        authenticated: false,
        auth_error: false,
        auth_required: false,
        status: null,
        loading: true,
    };

    componentDidMount() {
        this.getDevicesStateByHTTP();
    }
    getDevicesStateByHTTP = () => {
        // const vlad_url = "https://home.v-home.duckdns.org/api/v1/state";
        // STATE_URL
        HTTP.get(STATE_URL)
            .then((data) => {
                if (typeof(data) === "number" || !data) {
                    if (data === 401 || data === 403) {
                        // Authentication required
                        this.setState({
                            authenticated: false,
                            auth_required: true,
                            loading: false
                        });
                    } else {
                        // Other connection errors
                        this.setState({
                            status: data,
                            loading: false
                        });
                    }
                } else {
                    // Success
                    this.setState({
                        generalState:data,
                        authenticated: true,
                        loading: false
                    });
                }
            });
    };

    getCredentials = (user, password) => {

        const credentials = "Basic " + base64.encode(user + ":" + password);
        Cookie.set(COOKIE_NAME, credentials);
        this.setState({
            auth_error: true,
            loading: true,
            auth_required: false
        });
        this.getDevicesStateByHTTP();
    };
    render () {
        const { authenticated, generalState, auth_required, auth_error, status, loading } = this.state;
        if ( auth_required ) Cookie.remove(COOKIE_NAME);

        return (
            <>
                {loading ?
                    <ErrorPage loading = { loading }/>
                    :
                    authenticated ?
                        generalState &&
                            <RouterFunc generalState = { generalState }/>
                        :
                        auth_required ?
                            <div>
                                <AppBarPlaceholder/>
                                <SignIn
                                    getCredentials = { this.getCredentials }
                                    error = { auth_error }
                                />
                            </div>
                            :
                            <ErrorPage status = { status }/>
                }
            </>
        );
    }
}

export default StartPage;