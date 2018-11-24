import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import SliderActions from "../common/SliderActions";
import TextField from "@material-ui/core/TextField/TextField";
// import FormControl from "@material-ui/core/FormControl/FormControl";

const styles = () => ({
    root : {
        marginTop:10,
        width:250,
        height: 115,
        cursor: "default",
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    textField: {
        marginTop: 10,
        marginBottom: -13,
    },
});

class UnknownCommandDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };
        this.setValue = this.setValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (event) {
        const value = event.target.value;
        this.setState({ value: value });
    }
    handleSubmit (evt) {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            this.setValue();
        }
    }
    setValue() {
        const { dev_id, close, doCommand, command } = this.props;
        const { value } = this.state;
        const commandValue = value ? Math.round(value) : null;
        doCommand(dev_id, command, commandValue);
        close();
    }
    render () {
        const { classes, close } = this.props;
        const { value } = this.state;

        return (
            <div className = { classes.root }>
                <form
                    className = { classes.container }
                    noValidate
                    autoComplete = "off"
                >
                    <TextField
                        id = "outlined-name"
                        label = "Command value"
                        className = { classes.textField }
                        value = { value }
                        onChange = { this.handleChange }
                        onKeyDown = { this.handleSubmit }
                    />
                </form>
                <SliderActions
                    save = { this.setValue }
                    close = { close }
                />
            </div>
        );
    }
}

UnknownCommandDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    dev_id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    doCommand: PropTypes.func.isRequired,
    command: PropTypes.string.isRequired,
};

export default withStyles(styles)(UnknownCommandDialog);
