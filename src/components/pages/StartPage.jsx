import React, {Component} from "react";
import HomePage from "./HomePage";
import HTTP from "../../services/httpservices";
import base64 from "base-64";
import ErrorPage from "./ErrorPage";
import Cookie from "js-cookie";
import {COOKIE_NAME} from "../../settings/cookie";
import SignIn from "./SignIn";
import AppBarPlaceholder from "../navigation/AppBarPlaceholder";

class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generalState:{},
            authenticated: false,
            auth_error: false,
            auth_required: false,
            status: null,
        };
    }

    componentDidMount() {
        this.getComponentStateByHTTP();
    }

    getComponentStateByHTTP () {
        HTTP.get()
            .then((data) => {
                if (data >= 300) {
                    if (data === 401 || data === 403) {
                        // Authentication required
                        Cookie.remove(COOKIE_NAME);
                        this.setState({authenticated:false, auth_required: true, status:401});
                    } else {
                        // Other connection errors
                        this.setState({status:data});
                    }
                } else {
                    // Success
                    this.setState({generalState:data,
                        authenticated: true,
                        auth_error: false,
                        auth_required: false,
                        status: null,
                    });
                }
            });
    }

    getCredentials (user, password) {
        const credentials = "Basic " + base64.encode(user + ":" + password);
        Cookie.set(COOKIE_NAME, credentials);
        this.setState({auth_error: true});
        this.getComponentStateByHTTP();
    }

    render () {
        const { authenticated, generalState, auth_required, auth_error, status } = this.state;
        return (
            authenticated ?
                <HomePage
                    generalState = { generalState }
                /> :
                auth_required ?
                    <div>
                        <AppBarPlaceholder/>
                        <SignIn
                            getCredentials = { this.getCredentials.bind(this) }
                            error = { auth_error }
                        />
                    </div> :
                    status ?
                        <ErrorPage status = { status }/> : null
        );
    }
}

export default StartPage;