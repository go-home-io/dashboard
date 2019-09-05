import React, {useContext, useEffect, useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import  PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent/CardContent";
// import groupActions from "../../reflux/group/groupActions";
import { MIN_GROUP_HEADER_BKG_COLOR, LIGHT_RO_ICON_COLOR } from "../../settings/colors";
import ComponentHeader from "../common/component/ComponentHeader";
import WaitingProgress from "../common/elements/WaitingProgress";
import ExpandButton from "./ExpandButton";
import Zoom from "@material-ui/core/Zoom/Zoom";
import Grid from "@material-ui/core/Grid/Grid";
import RenderCommandHandlers from "../common/comand/RenderCommandHandlers";
import {AppContext} from "../../context/AppContextProvider";
import {EventEmitter} from "../../context/EventEmitter";
import truncateCaption from "../../utils/truncate";
import {maxSymbolsInNamePerLine} from "../../settings/maxSymbolsInNamePerLine";

const styles = () => ({
    content: {
        marginTop: -27,
    },
});

const MinimizedGroup = props => {
    // const {classes, device_state, group_id, commands,
    //     name, read_only, loading, status, visible } = props;

    const onLoadingUpdate = data => {
        if ( data.id !== dev_id ) return;
        setLoading(data.loading);
    };

    const expandGroup = () => {
        setGroup(dev_id);
        setGroupOn(device_state.on);
    };

    const [loading, setLoading] = useState(false);
    const { subscribe } = useContext(EventEmitter);
    const { classes, id: dev_id, device_info, device_state, doCommand }  = props;
    const { name, read_only, commands } = device_info;
    const caption = truncateCaption(name, maxSymbolsInNamePerLine );

    const { setGroup, setGroupOn } = useContext(AppContext);

    useEffect( () => subscribe("loading", onLoadingUpdate),
        // eslint-disable-next-line
        []);



    return (
        <div>
            <ComponentHeader
                dev_id = { dev_id }
                name = { caption }
                variant = "minGroup"
                doCommand = { doCommand }
                on = { device_state.on }
                read_only = { read_only }
                ordinaryBkgColor = { MIN_GROUP_HEADER_BKG_COLOR }
                iconROColor = { LIGHT_RO_ICON_COLOR }
            />

            <ExpandButton expandGroup = { expandGroup }/>

            <CardContent >
                { loading ?
                    <Zoom in = { loading } >
                        <WaitingProgress
                            dev_id = { dev_id }
                        />
                    </Zoom>
                    :
                    <Zoom in = { ! loading } >
                        <Grid
                            className = { classes.content }
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
                    </Zoom>
                }
            </CardContent>
        </div>
    );
};

MinimizedGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    device_state: PropTypes.object.isRequired,
    doCommand: PropTypes.func.isRequired,
    device_info: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

export default withStyles(styles)(MinimizedGroup);