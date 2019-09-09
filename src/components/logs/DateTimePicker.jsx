import "date-fns";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";

function DateTimePicker(props) {
    const { value, setValue } = props;
    const [selectedDate, setSelectedDate] = useState(new Date(value));

    function handleDateChange(date) {
        setSelectedDate(date);
        setValue(date.getTime());
    }

    return (
        <MuiPickersUtilsProvider utils = { DateFnsUtils }>
            <Grid container justify = "space-around">
                <KeyboardDatePicker
                    margin = "normal"
                    id = "date-picker-dialog"
                    label = "Date picker"
                    format = "MM/dd/yyyy"
                    value = { selectedDate }
                    onChange = { handleDateChange }
                    KeyboardButtonProps = { {
                        "aria-label": "change date",
                    } }
                />
                <KeyboardTimePicker
                    margin = "normal"
                    id = "time-picker"
                    label = "Time picker"
                    value = { selectedDate }
                    onChange = { handleDateChange }
                    KeyboardButtonProps = { {
                        "aria-label": "change time",
                    } }
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

DateTimePicker.propTypes = {
    value: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired
};

export default DateTimePicker;
