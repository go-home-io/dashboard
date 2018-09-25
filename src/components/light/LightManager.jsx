import React from "react";
import Reflux from "reflux";
import ComponentHeader from "../common/ComponentHeader";
import LightStoreFactory from "../../reflux/light/LightStore";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import LightBrightness from "./LightBrightness";
import LightColorPicker from "./LightColorPicker";
import Scenes from "./Scenes";
import WaitingProgress from "../common/WaitingProgress";
import Zoom from "@material-ui/core/Zoom/Zoom";
import lightActions from "../../reflux/light/lightActions";
import truncateCaption from "../utils/truncate";
import {LIGHT_HEADER_BKG_COLOR, LIGHT_HEADER_ICON_COLOR_ON, LIGHT_HEADER_ICON_COLOR_OFF, LIGHT_RO_ICON_COLOR} from "../../settings/colors";

const styles = () => ({
    root: {
        width:172,
        height:165,
        margin: 5,
    },
    progress: {
        padding:3,
        marginTop: 25,
        marginLeft: -3,
        width: "100%"
    }
});

const lightIcon = "wb_incandescent";

class LightManager extends Reflux.Component{
    constructor(props) {
        super(props);
        const {id, device_info, location, group_id} = props;
        this.store = LightStoreFactory(id, device_info, location, group_id);
    }

    render () {
        const { classes }  = this.props;
        const { id, name, device_state, visible, loading, status, read_only } = this.state;

        const display = visible ? "block" : "none";
        const isBrightnessExist = (device_state.brightness != null);
        const isColorExist = (device_state.color != null);
        const scenes = device_state.scenes;
        const isScenesExist = (scenes != null);
        const color = (device_state.on) ? device_state.color : {r:100,g:100,b:100};
        const caption = truncateCaption(name, 40);

        return (
            <Card style = { {display:display} } className = { classes.root }>
                <ComponentHeader
                    dev_id = { id }
                    name = { caption }
                    variant = "light"
                    on = { device_state.on }
                    status = { status }
                    read_only = { read_only }
                    actions = { lightActions }
                    icon = { lightIcon }
                    ordinaryBkgColor = { LIGHT_HEADER_BKG_COLOR }
                    iconColorOn = { LIGHT_HEADER_ICON_COLOR_ON }
                    iconColorOff = { LIGHT_HEADER_ICON_COLOR_OFF }
                    iconROColor = { LIGHT_RO_ICON_COLOR }
                />
                <CardContent>
                    {loading ?
                        <Zoom in = { loading } >
                            <div className = { classes.progress }>
                                <WaitingProgress
                                    dev_id = { id }
                                    actions = { lightActions }
                                />
                            </div>
                        </Zoom>
                        :
                        <Zoom in = { !loading }>
                            <Grid container justify = 'flex-start' alignItems = 'center' alignContent = 'center'>
                                {isBrightnessExist ?
                                    <LightBrightness
                                        dev_id = { id }
                                        level = { device_state.brightness }
                                        read_only = { read_only }
                                    /> :
                                    null
                                }
                                {isColorExist ?
                                    <LightColorPicker
                                        dev_id = { id }
                                        color = { color }
                                        read_only = { read_only }
                                    /> :
                                    null
                                }
                                {isScenesExist ?
                                    <Scenes
                                        dev_id = { id }
                                        scenes = { scenes }
                                        read_only = { read_only }
                                    /> :
                                    null
                                }
                            </Grid>
                        </Zoom>
                    }
                </CardContent>
            </Card>
        );
    }
}


LightManager.propTypes = {
    classes: PropTypes.object.isRequired,
    device_info: PropTypes.object.isRequired ,
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    group_id: PropTypes.string
};

export default withStyles(styles)(LightManager);