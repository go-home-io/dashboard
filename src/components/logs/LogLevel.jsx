import React, {createRef, useEffect, useState} from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";

const radioOptions = ["debug", "info", "error", "warn" ];

export default function LogLevel(props) {
    const { value, setValue, setAndExit } = props;
    const [currValue, setCurrValue] = useState(value);
    let refs = [];


    function handleChange(event) {
        const val = event.target.value;
        setCurrValue(val);
        setValue(val);
    }

    useEffect( () => {
        const index = radioOptions.findIndex(val => val === currValue );
        if (index !== -1) refs[index].current.focus();
    },
    // eslint-disable-next-line
    [currValue]);

    return (
        <FormControl component = "fieldset">
            <RadioGroup
                aria-label = "position"
                name = "logLevel"
                value = { currValue }
                onChange = { handleChange }
                row
                onKeyPress = { (e) => { if (e.key === "Enter") setAndExit(currValue); } }
            >
                {
                    radioOptions.map( itemValue => {
                        const itemRef = createRef();
                        refs.push(itemRef);
                        return (
                            <FormControlLabel
                                key = { itemValue }
                                value = { itemValue }
                                control = { <Radio color = "primary" /> }
                                label = { itemValue }
                                labelPlacement = "top"
                                inputRef = { itemRef }
                            />
                        );
                    } )
                }
            </RadioGroup>
        </FormControl>
    );
}

LogLevel.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    setAndExit: PropTypes.func.isRequired
};