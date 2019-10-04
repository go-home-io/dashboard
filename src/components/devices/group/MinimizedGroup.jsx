import React, { useContext } from "react";
import  PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent/CardContent";
import ExpandButton from "./ExpandButton";
import Grid from "@material-ui/core/Grid/Grid";
import RenderCommandHandlers from "../../common/comand/RenderCommandHandlers";
import {AppContext} from "../../../context/AppContextProvider";

const MinimizedGroup = props => {

    const expandGroup = () => {
        setGroup(dev_id);
        setGroupOn(device_state.on);
    };

    const { id: dev_id, device_info, device_state, doCommand }  = props;
    const { read_only, commands } = device_info;
    const { setGroup, setGroupOn } = useContext(AppContext);

    return (
        <>
            <ExpandButton expandGroup = { expandGroup }/>

            <CardContent >
                <Grid
                    // className = { classes.content }
                    container
                    justify = 'flex-start'
                    direction = "column"
                >
                    <RenderCommandHandlers
                        commands = { commands }
                        dev_id = { dev_id }
                        doCommand = { doCommand }
                        read_only = { read_only }
                        device_state = { device_state }
                    />
                </Grid>
            </CardContent>
        </>
    );
};

MinimizedGroup.propTypes = {
    device_state: PropTypes.object.isRequired,
    doCommand: PropTypes.func.isRequired,
    device_info: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

export default MinimizedGroup;