import React, {createRef, useState} from "react";
import PropTypes from "prop-types";
// import Button from "@material-ui/core/Button";
import { Dialog, Button } from "@material-ui/core";
import { Transition } from "../../../utils/Transition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const initialValues = (params) => {
    let val = {};

    Object.keys(params).map(
        key => val[key] = ""
    );
    return val;
};

const InputManager = props => {
    const { dev_id, title, params, doCommand } = props;
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(initialValues(params));
    let htmlElRefs = [];

    const handleChange = name => event => setValues({...values, [name]:event.target.value});

    const setElementFocus = index => htmlElRefs[index].current.focus();

    const findEmptyElement = () => {
        const keys = Object.keys(values);
        return keys.findIndex((key) => values[key] === "");
    };

    const handleEnter = () => {
        const emptyElIndex = findEmptyElement();
        if ( emptyElIndex !== -1 ) setElementFocus(emptyElIndex);
        else doInputCommand();
    };

    const doInputCommand = () => {
        doCommand(dev_id, "input", {params: values});
        setOpen(false);
    };

    return (
        <>
            <div style = { {marginTop:-28 } }>
                <Button color = "primary" size = "small"
                    onClick = { () => setOpen(true) }
                >
                    Input verification code
                </Button>
            </div>

            <Dialog
                open = { open }
                onClose = { () => setOpen(false) }
                aria-labelledby = "form-dialog-title"
                TransitionComponent = { Transition }
            >
                <DialogTitle id = "form-dialog-title">
                    { "Verification Dialog" }
                </DialogTitle>

                <DialogContent style = { { minWidth: 350 } }>
                    <DialogContentText>
                        { title }
                    </DialogContentText>
                    { Object.keys(params).map( (key, index ) => {
                        const elRef = createRef();
                        htmlElRefs.push(elRef);
                        return (
                            <TextField
                                key = { key }
                                id = { "input-" + key }
                                required
                                fullWidth
                                autoFocus = { index === 0 }
                                margin = "normal"
                                label = { key }
                                type = "text"
                                inputRef = { elRef }
                                value = { values[key] }
                                onChange = { handleChange(key) }
                                onKeyPress = { (e) => {
                                    if (e.key === "Enter") handleEnter(index);
                                } }
                            />);
                    })}
                </DialogContent>

                <DialogActions>
                    <Button onClick = { () => setOpen(false) } color = "primary">
                        Cancel
                    </Button>
                    <Button onClick = { () => doInputCommand() } color = "primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

InputManager.propTypes = {
    dev_id: PropTypes.string.isRequired,
    title: PropTypes.string,
    params: PropTypes.object.isRequired,
    doCommand: PropTypes.func.isRequired
};

export default InputManager;