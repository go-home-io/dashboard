import React, {useContext, useEffect, useState} from "react";
import ComponentHeader from "../header/ComponentHeader";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import WaitingProgress from "../../common/elements/WaitingProgress";
import Zoom from "@material-ui/core/Zoom/Zoom";
import truncateCaption from "../../../utils/truncate";
import RenderCommandHandlers from "../../common/comand/RenderCommandHandlers";
import {EventEmitter} from "../../../context/EventEmitter";
import {maxSymbolsInNamePerLine} from "../../../settings/maxSymbolsInNamePerLine";
import InputManager from "../../common/input/InputManager";

const styles = () => ({
    progress: {
        padding:3,
        marginTop: 25,
        marginLeft: -3,
        width: "100%"
    }
});

const LightManager = props => {
    const onLoadingUpdate = data => {
        if ( data.id !== id ) return;
        setLoading(data.loading);
    };

    const [loading, setLoading] = useState(false);
    const { subscribe, unsubscribe } = useContext(EventEmitter);
    const { classes, id, device_info, device_state, doCommand, input }  = props;
    const { name, read_only, commands } = device_info;
    const caption = truncateCaption(name, maxSymbolsInNamePerLine );
    let title, params;
    if ( input ) {
        title = input.title;
        params = input.params;
    }

    useEffect( () => {
        subscribe("loading", onLoadingUpdate);
        return () => unsubscribe("loading", onLoadingUpdate);
    },
    // eslint-disable-next-line
        []);

    return (
        <>
            <ComponentHeader
                dev_id = { id }
                name = { caption }
                variant = "light"
                on = { device_state.on }
                doCommand = { doCommand }
                read_only = { read_only }
            />
            <CardContent>
                {loading ?
                    <Zoom in = { loading } >
                        <div className = { classes.progress }>
                            <WaitingProgress dev_id = { id }/>
                        </div>
                    </Zoom>
                    :
                    <Zoom in = { !loading }>
                        <Grid container justify = 'flex-start' direction = "column">
                            {input ?
                                params &&
                                <InputManager
                                    dev_id = { id }
                                    params = { params }
                                    title = { title }
                                    doCommand = { doCommand }
                                />
                                :
                                <RenderCommandHandlers
                                    commands = { commands }
                                    dev_id = { id }
                                    doCommand = { doCommand }
                                    read_only = { read_only }
                                    device_state = { device_state }
                                />
                            }
                        </Grid>
                    </Zoom>
                }
            </CardContent>
        </>
    );
};

LightManager.propTypes = {
    classes: PropTypes.object.isRequired,
    device_info: PropTypes.object.isRequired ,
    id: PropTypes.string.isRequired,
    device_state: PropTypes.object.isRequired,
    doCommand: PropTypes.func.isRequired,
};

export default withStyles(styles)(LightManager);