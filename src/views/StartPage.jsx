import React, {Component} from 'react'
import base64 from 'base-64';
import HomePage from "./HomePage";
import HTTP from "../services/httpservices";
import Login from "../components/Login";

const url = '/state';

class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generalState:{},
            authenticated: false,
        };

        this.getComponentStateByHTTP();
    }

    getComponentStateByHTTP (user, password) {
        // console.log(headers);
        HTTP.get(url, user, password)
            .then((data) => {
                if (data !== 'Failed to fetch') {
                    this.setState({generalState:data});
                    this.setState({authenticated: true});
                } else {
                    this.setState({authenticated:false})
                }

            });
    }

    handleSubmit () {
        const user = this.refs.LoginForm.state.user;
        const password = this.refs.LoginForm.state.password;

        this.getComponentStateByHTTP(user, password);
    }

    render () {
        return (
           this.state.authenticated ?
               <HomePage generalState={this.state.generalState}/> :
               <Login onSubmit={this.handleSubmit.bind(this)}
                      ref='LoginForm' />
        )
    }
}

export default StartPage