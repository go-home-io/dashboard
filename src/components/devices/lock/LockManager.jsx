import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import ComponentHeader from "../header/ComponentHeader";
import CardContent from "@material-ui/core/CardContent";
import Zoom from "@material-ui/core/Zoom";
import WaitingProgress from "../../common/elements/WaitingProgress";
import Grid from "@material-ui/core/Grid";
import {EventEmitter} from "../../../context/EventEmitter";
import truncateCaption from "../../../utils/truncate";
import {maxSymbolsInNamePerLine} from "../../../settings/maxSymbolsInNamePerLine";
import ComponentUpperInfo from "../../common/elements/ComponentUpperInfo";
import Battery from "../../common/elements/Battery";
import InputManager from "../../common/input/InputManager";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";


const styles = () => ({
    progress: {
        padding:3,
        marginTop: 0,
        marginLeft: -3,
        width: "100%"
    }
});


const LockManager = props => {

    const onLoadingUpdate = data => {
        if ( data.id !== id ) return;
        setLoading(data.loading);
    };

    const { classes, id, device_info, device_state, doCommand }  = props;
    const { name, read_only } = device_info;
    const { on, input, battery_level } = device_state;
    let title, params;
    if ( input ) {
        title = input.title;
        params = input.params;
    }

    const [loading, setLoading] = useState(false);
    const { subscribe, unsubscribe } = useContext(EventEmitter);
    const caption = truncateCaption(name, maxSymbolsInNamePerLine );

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
                variant = "lock"
                on = { on }
                doCommand = { doCommand }
                read_only = { read_only }
            />

            <ComponentUpperInfo rightField = { <Battery battery_level = { battery_level }/> }/>

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
                            { input ?
                                params &&
                                <InputManager
                                    dev_id = { id }
                                    params = { params }
                                    title = { title }
                                    doCommand = { doCommand }
                                />
                                :
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
                            }
                        </Grid>
                    </Zoom>
                }
            </CardContent>
        </>
    );
};

LockManager.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    device_info: PropTypes.object.isRequired,
    device_state: PropTypes.object.isRequired,
    doCommand: PropTypes.func.isRequired
};

export default withStyles(styles)(LockManager);