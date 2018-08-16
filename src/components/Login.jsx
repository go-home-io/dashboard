import React from 'react';
import Button from "@material-ui/core/Button/Button";
import NavBar from "../views/NavBar";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user:'test-user',
                      password: 'test'}
    }

    render () {
        return (
            <div>
                <NavBar/>
                <Button onClick={this.props.onSubmit}>Submit</Button>
            </div>
        )
    }
}

export default Login