import React from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import RenderCommandHandlers from "../../common/comand/RenderCommandHandlers";

const LightControl = props => {
    const {  id, device_info, device_state, doCommand }  = props;
    const { read_only, commands } = device_info;

    return (
        <>
            <CardContent>
                <Grid container justify = 'flex-start' direction = "column">
                    <RenderCommandHandlers
                        commands = { commands }
                        dev_id = { id }
                        doCommand = { doCommand }
                        read_only = { read_only }
                        device_state = { device_state }
                    />
                </Grid>
            </CardContent>
        </>
    );
};

LightControl.propTypes = {
    device_info: PropTypes.object.isRequired ,
    id: PropTypes.string.isRequired,
    device_state: PropTypes.object.isRequired,
    doCommand: PropTypes.func.isRequired,
};

export default LightControl;