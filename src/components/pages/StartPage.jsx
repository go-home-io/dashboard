import React, {Component} from 'react'
import HomePage from "./HomePage";
import HTTP from "../../services/httpservices";
import Login from "./Login";
import base64 from 'base-64';
import ErrorPage from "./ErrorPage";
import Cookie from "js-cookie";
import {COOKIE_NAME} from '../../settings/cookie';

const url = '/state';

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

    getComponentStateByHTTP (user, password) {
        HTTP.get(url, user, password)
            .then((data) => {
                if (data === 'Failed to fetch' || data >= 400) {
                    if (data === 401) {
                        // Server request authentication
                        this.setState({authenticated:false, auth_required: true, status:401});
                        if (user) {
                            this.setState({auth_error: true});
                        }
                    } else {
                        // Unknown connection error
                        this.setState({auth_required: false, status:data});
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
        const credentials = 'Basic ' + base64.encode(user + ":" + password);
        Cookie.set(COOKIE_NAME, credentials);
        this.getComponentStateByHTTP(user, password);
    }

    render () {
        return (
           this.state.authenticated ?
               <HomePage generalState={this.state.generalState}/> :

               this.state.auth_required ?

                   <Login
                       getCredentials={this.getCredentials.bind(this)}
                       error={this.state.auth_error}
                   /> :
                     <ErrorPage status={this.state.status}/>
        )
    }
}

export default StartPage