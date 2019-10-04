import React from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import ComponentUpperInfo from "../../common/elements/ComponentUpperInfo";
import Battery from "../../common/elements/Battery";
import Button from "@material-ui/core/Button";


const LockControl = props => {

    const { id, device_state, doCommand }  = props;
    const { battery_level } = device_state;

    return (
        <>
            <ComponentUpperInfo rightField = { <Battery battery_level = { battery_level }/> }/>

            <CardContent>
                <Grid container justify = "space-between" >
                    <Button
                        size = "small"
                        color = "secondary"
                        onClick = { () => doCommand(id, "off", "") }
                    >
                        Close
                    </Button>
                    <Button
                        size = "small"
                        color = "primary"
                        onClick = { () => doCommand(id, "on", "") }
                    >
                        open
                    </Button>
                </Grid>
            </CardContent>
        </>
    );
};

LockControl.propTypes = {
    id: PropTypes.string.isRequired,
    device_info: PropTypes.object.isRequired,
    device_state: PropTypes.object.isRequired,
    doCommand: PropTypes.func.isRequired
};

export default (LockControl);