import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import  PropTypes from "prop-types";
import truncateCaption from "../../utils/truncate";
import {Tooltip} from "@material-ui/core";

const style = () => ({
    font: {
        letterSpacing: 1,
        fontSize: 18,
    }
});

const maxSymbolsInDeviceName = 13;

const DeviceName = (props) => {
    const { classes, name } = props;
    const nameTrunc = truncateCaption(name, maxSymbolsInDeviceName);
    const truncated = name !== nameTrunc;

    return (
        <>
            { truncated ?
                <Tooltip title = { name } placement = "top">
                    <Typography variant = "subtitle1" color = "inherit" className = { classes.font }>
                        { nameTrunc }
                    </Typography>
                </Tooltip>
                :
                <Typography variant = "subtitle1" color = "inherit" className = { classes.font }>
                    { nameTrunc }
                </Typography>
            }
        </>

    );
};

DeviceName.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};

export default withStyles(style)(DeviceName);