import React, {useState} from "react";
import PropTypes from "prop-types";
// import Button from "@material-ui/core/Button";
import { Dialog, Button } from "@material-ui/core";
import { Transition } from "../../../utils/Transition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const InputManager = props => {
    const { dev_id, title, params, doCommand } = props;
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(params);
    const [focusIndex, setFocusIndex] = useState(0);

    // console.log("Values", values, "indx=", focusIndex)

    const handleChange = name => event => setValues({...values, [name]:event.target.value});

    const incrementFocusIndex = (index) => {
        let indx = index + 1;
        if ( indx === params.length ) indx = 0;
        setFocusIndex(indx);
    };

    const doInputCommand = () => {
        doCommand(dev_id, "input", {params: values});
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
                    { Object.keys(values).map( (key, index, ) => (
                        <TextField
                            key = { key }
                            required
                            autoFocus = { index === focusIndex }
                            margin = "normal"
                            label = { key }
                            type = "text"
                            fullWidth
                            value = { values[key] }
                            onChange = { handleChange(key) }
                            onKeyPress = { (e) => { if (e.key === "Enter") incrementFocusIndex(index); } }
                        />
                    ))}

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