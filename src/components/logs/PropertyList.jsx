import React from "react";
import PropTypes from "prop-types";
import {Typography} from "@material-ui/core";

const PropertyList = props => {
    const { properties } = props;
    const keys = Object.keys(properties);

    return (
        <ul style = { { minWidth: 400} }>
            {
                keys.map( (propName) => (
                    <li key = { propName }>
                        <Typography variant = "body1" color = "textSecondary">
                            <strong>
                                { propName }
                                { ": "}
                            </strong>
                            { properties[propName] }
                        </Typography>
                    </li>
                ))
            }
        </ul>
    );
};

PropertyList.propTypes = {
    properties: PropTypes.object.isRequired
};

export default PropertyList;