import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from "@material-ui/core/TextField/TextField";

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component {
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

     handleClick = (event) => {
         if (this.state.name.length === 0 || this.state.password.length === 0 ) {
            return
         }
         event.preventDefault();
         this.props.getCredentials(this.state.name, this.state.password);
     };

    render() {
        const {classes} = this.props;
        console.log('error:'+this.props.error);
        return (
            <div>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper} elevation={10}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
                        <Typography variant="headline">Authentication required</Typography>
                        <form className={classes.form} >
                            <FormControl margin="normal" fullWidth required>
                                <TextField
                                    autoFocus
                                    required
                                    id="name"
                                    label="Name"
                                    margin="normal"
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    error={this.props.error}
                                />
                                <TextField
                                    required
                                    id="password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    onChange={this.handleChange('password')}
                                    value={this.state.password}
                                    error={this.props.error}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleClick}
                            >
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
