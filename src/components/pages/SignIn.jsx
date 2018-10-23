import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";

const styles = theme => ({
    layout: {
        width: "auto",
        display: "block", // Fix IE11 issue.
        marginTop: 100,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleClick (event) {
        const { name, password } = this.state;
        const { getCredentials } = this.props;

        if (name.length === 0 || password.length === 0 ) {
            return;
        }
        event.preventDefault();
        getCredentials(name, password);
    }
    render() {
        const {classes, error} = this.props;
        const { name, password } = this.state;

        return (
            <div>
                <CssBaseline/>
                <main className = { classes.layout }>
                    <Paper className = { classes.paper } elevation = { 10 }>
                        <Avatar className = { classes.avatar }>
                            <LockIcon/>
                        </Avatar>
                        <Typography variant = "headline">
                            Authentication required
                        </Typography>
                        <form className = { classes.form } >
                            <FormControl margin = "normal" fullWidth required>
                                <TextField
                                    autoFocus
                                    required
                                    id = "name"
                                    label = "Name"
                                    margin = "normal"
                                    value = { name }
                                    onChange = { this.handleChange("name") }
                                    error = { error }
                                />
                                <TextField
                                    required
                                    id = "password-input"
                                    label = "Password"
                                    type = "password"
                                    autoComplete = "current-password"
                                    margin = "normal"
                                    onChange = { this.handleChange("password") }
                                    value = { password }
                                    error = { error }
                                />
                            </FormControl>
                            <Button
                                type = "submit"
                                fullWidth
                                variant = "raised"
                                color = "primary"
                                className = { classes.submit }
                                onClick = { this.handleClick }
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
    getCredentials: PropTypes.func.isRequired,
    error: PropTypes.bool,
};

export default withStyles(styles)(SignIn);
