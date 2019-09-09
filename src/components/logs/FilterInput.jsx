import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DateTimePicker from "./DateTimePicker";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction = "down" ref = { ref } { ...props } />;
});


const FilterInput = props => {
    const { variant, initialValue, setFilterValue, cancelInput, open, filterKey } = props;
    const [value, setValue] = useState(initialValue);
    // const [selectedDate, setSelectedDate]

    const handleChange = event => {
        if ( event.target.value ) setValue(event.target.value);
        console.log("value:", value);
    };

    useEffect( () => setValue(initialValue),
        // eslint-disable-next-line
        [filterKey] );
    
    return (
        <div>
            <Dialog
                open = { open }
                onClose = { () => setFilterValue(value) }
                aria-labelledby = "form-dialog-title"
                TransitionComponent = { Transition }
            >
                <DialogTitle id = "form-dialog-title">
                    Set Filter Field
                </DialogTitle>
                <DialogContent style = { { minWidth: 350 } }>
                    <DialogContentText>
                        You are going to set filter field
                        {" ["} 
                        {" "}
                        { filterKey } 
                        {" "}
                        { "] " }
                        value
                    </DialogContentText>
                    { variant === "text" ?
                        <TextField
                            autoFocus
                            margin = "normal"
                            id = { filterKey }
                            label = { filterKey }
                            type = "text"
                            fullWidth
                            value = { value }
                            onChange = { handleChange }
                            onKeyPress = { (e) => { if (e.key === "Enter") setFilterValue(value); } }
                        />
                        :
                        variant === "time" ?
                            <DateTimePicker
                                value = { value }
                                setValue = { (value) => setValue(value) }
                            />
                            : null
                    }
                </DialogContent>

                <DialogActions>
                    <Button onClick = { cancelInput } color = "primary">
                        Cancel
                    </Button>
                    <Button onClick = { () => setFilterValue(value) } color = "primary">
                        Set it
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

FilterInput.propTypes = {
    variant: PropTypes.string,
    initialValue: PropTypes.any,
    setFilterValue: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    cancelInput: PropTypes.func.isRequired,
    filterKey: PropTypes.string.isRequired
};

export default FilterInput;