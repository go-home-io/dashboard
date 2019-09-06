import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import truncateCaption from "../../../utils/truncate";
import { SWITCH_HEADER_BKG_COLOR, SWITCH_RO_ICON_COLOR } from "../../../settings/colors";
import ComponentHeader from "../header/ComponentHeader";
// import deviceActions from "../../../reflux/devices/deviceActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Zoom from "@material-ui/core/Zoom/Zoom";
import WaitingProgress from "../../common/elements/WaitingProgress";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import CustomizedSwitch from "./customizedSwitch";
import {EventEmitter} from "../../../context/EventEmitter";

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
    const onLoadingUpdate = data => {
        if ( data.id !== id ) return;
        setLoading(data.loading);
    };

    const handleChange = () => {
        if ( ! read_only ) {
            const command = on ? "off" : "on";
            doCommand(id, command, "");
        }
    };

    const [loading, setLoading] = useState(false);
    const { subscribe } = useContext(EventEmitter);

    const { classes, id, device_state, device_info, doCommand, status } = props;
    const {  name: full_name, read_only  } = device_info;
    const name = truncateCaption(full_name, 45);
    const { power, on } = device_state;

    useEffect( () => subscribe("loading", onLoadingUpdate),
        // eslint-disable-next-line
        []);

    return (
        <>
            <ComponentHeader
                dev_id = { id }
                name = { name }
                status = { status }
                doCommand = { doCommand }
                ordinaryBkgColor = { SWITCH_HEADER_BKG_COLOR }
                variant = 'switch'
                on = { on }
                read_only = { read_only }
                iconROColor = { SWITCH_RO_ICON_COLOR }
            />

            <CardContent>
                { loading ?
                    <Zoom in = { loading }  >
                        <div className = { classes.progress }>
                            <WaitingProgress dev_id = { id }/>
                        </div>
                    </Zoom>
                    :
                    <Zoom in = { !loading }>
                        <div>
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
                        </div>
                    </Zoom>
                }
            </CardContent>
        </>
    );
};

SwitchManager.propTypes = {
    classes: PropTypes.object.isRequired,
    device_info: PropTypes.object.isRequired ,
    id: PropTypes.string.isRequired,
    device_state: PropTypes.object.isRequired,
    doCommand: PropTypes.func.isRequired,
};

export default withStyles(styles)(SwitchManager);

