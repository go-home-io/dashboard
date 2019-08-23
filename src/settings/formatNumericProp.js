const floatFormats = {
    imperial: {
        temperature: 1,
        humidity: 1,
        pressure: 4,
        wind_direction: 0,
        wind_speed: 1,
        visibility: 1,
        brightness: 0,
        fan_speed: 0,
    },
    metric: {
        temperature: 1,
        humidity: 1,
        pressure: 0,
        wind_direction: 0,
        wind_speed: 1,
        visibility: 1,
        brightness: 0,
        fan_speed: 0,
    }
};

export const formatNumericProp = (uom, propertyName, value) => {
    if ( !uom || !propertyName || !value ) { return null; }
    const decimalDigits = floatFormats[uom][propertyName];
    if (decimalDigits === 0) {
        return Math.round(value);
    } else {
        return value.toFixed(decimalDigits);
    }

};