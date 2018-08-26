import React from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button/Button";
import GoHomeBar from "../navbar/GoHomeBar";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import AppBarPlaceHolder from "../navbar/AppBarPlaceHolder";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop:100,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
        position:'relative',
        left: 118,
        top:20,
    },
});



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '',
                       password: ''}
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClick = () => {
        this.props.getCredentials(this.state.name, this.state.password);
    };

    render () {
        const { classes } = this.props;
        const error = this.props.error;
        return (
                <div>
                    <AppBarPlaceHolder/>
                    <Grid container justify='center' alignItems='center' className={classes.container}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="label"><h3>Login, please</h3></FormLabel>
                            <TextField
                                id="name"
                                label="Name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                                error={this.props.error}

                            />
                            <TextField
                                id="password-input"
                                label="Password"
                                className={classes.textField}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                onChange={this.handleChange('password')}
                                value={this.state.password}
                                error={this.props.error}

                            />
                            <Button
                                onClick={this.handleClick.bind(this)}
                                variant="outlined"
                                color="primary" className={classes.button}
                            >
                                Submit
                            </Button>
                        </FormControl>
                    </Grid>
                </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login)