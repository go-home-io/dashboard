import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { SWITCH_HEADER_BKG_COLOR } from "../../../settings/colors";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import CustomizedSwitch from "./customizedSwitch";

const styles = () => ({
    icon: {
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: 3,
    },
    typography: {
        color: "rgba(0, 0, 0, 0.54)",
        margin: "0 auto"
    },
    progress: {
        marginTop: 28,
    },
    container: {
        display: "flex",
        alignContent: "center",
    }
});

const SwitchManager = props => {

    const handleChange = () => {
        if ( ! read_only ) {
            const command = on ? "off" : "on";
            doCommand(id, command, "");
        }
    };

    const { classes, id, device_state, device_info, doCommand } = props;
    const {  read_only  } = device_info;
    const { power, on } = device_state;

    return (
        <>
            <CardContent>
                <div className = { classes.container }>
                    <Typography variant = 'h5' className = { classes.typography }>
                        <strong>
                            {power}
                            {" v"}
                        </strong>
                    </Typography>
                </div>
                <Grid container justify = "center">
                    <CustomizedSwitch
                        disabled = { read_only }
                        checked = { on }
                        colorThumb = { SWITCH_HEADER_BKG_COLOR }
                        handleChange = { handleChange }
                    />
                </Grid>
            </CardContent>
        </>
    );
};

SwitchManager.propTypes = {
    device_info: PropTypes.object.isRequired ,
    id: PropTypes.string.isRequired,
    device_state: PropTypes.object.isRequired,
    doCommand: PropTypes.func.isRequired,
};

export default withStyles(styles)(SwitchManager);

