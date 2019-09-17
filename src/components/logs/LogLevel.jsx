import React, {useState} from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";

export default function LogLevel(props) {
    const { value, setValue } = props;
    const [currValue, setCurrValue] = useState(value);

    function handleChange(event) {
        const val = event.target.value;
        setCurrValue(val);
        setValue(val);
        console.log("Log level: ", val);
    }

    return (
        <FormControl component = "fieldset">
            <RadioGroup aria-label = "position" name = "logLevel" value = { currValue } onChange = { handleChange } row>
                <FormControlLabel
                    value = "debug"
                    control = { <Radio color = "primary" /> }
                    label = "Debug"
                    labelPlacement = "top"
                />
                <FormControlLabel
                    value = "info"
                    control = { <Radio color = "primary" /> }
                    label = "Info"
                    labelPlacement = "top"
                />
                <FormControlLabel
                    value = "error"
                    control = { <Radio color = "primary" /> }
                    label = "Error"
                    labelPlacement = "top"
                />
                <FormControlLabel
                    value = "warning"
                    control = { <Radio color = "primary" /> }
                    label = "Warning"
                    labelPlacement = "top"
                />
            </RadioGroup>
        </FormControl>
    );
}

LogLevel.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func.isRequired
};