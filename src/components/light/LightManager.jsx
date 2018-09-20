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
import WaitingProgress from "./WaitingProgress";
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
    }
});

const ordinaryBkgColor = LIGHT_HEADER_BKG_COLOR;
const lightIcon = <i className = "fa fa-lightbulb-o" aria-hidden = "true" />;

class LightManager extends Reflux.Component{
    constructor(props) {
        super(props);
        this.store = LightStoreFactory(props.id, props.device_state, props.location, props.group_id);
    }


    render () {
        const { classes, device_state, id }  = this.props;
        const lightType = device_state.type === "light";

        const display = this.state.visible ? "block" : "none";
        const isBrightnessControl = (this.state.device_state.brightness != null);
        const isColorControl = (this.state.device_state.color != null);
        const scenes = this.state.device_state.scenes;
        const scenesExist = (scenes != null);
        const color = (this.state.device_state.on) ? this.state.device_state.color : {r:100,g:100,b:100};
        const loading = this.state.loading;
        const name = truncateCaption(this.state.name, 40);

        return (
            ! lightType ?
                null :
                <Card style = { {display:display} } className = { classes.root }>
                    <ComponentHeader
                        dev_id = { id }
                        name = { name }
                        on = { this.state.device_state.on }
                        status = { this.state.status }
                        read_only = { this.state.read_only }
                        actions = { lightActions }
                        icon = { lightIcon }
                        ordinaryBkgColor = { ordinaryBkgColor }
                        iconColorOn = { LIGHT_HEADER_ICON_COLOR_ON }
                        iconColorOff = { LIGHT_HEADER_ICON_COLOR_OFF }
                        iconROColor = { LIGHT_RO_ICON_COLOR }
                    />
                    <CardContent>
                        {loading ?
                            null :
                            <Zoom in = { !this.state.loading }>
                                <Grid container justify = 'flex-start' alignItems = 'center' alignContent = 'center'>
                                    {isBrightnessControl ?
                                        <LightBrightness
                                            dev_id = { this.props.id }
                                            level = { this.state.device_state.brightness }
                                            read_only = { this.state.read_only }
                                        /> :
                                        null
                                    }
                                    { isColorControl ?
                                        <LightColorPicker
                                            dev_id = { this.props.id }
                                            color = { color }
                                            read_only = { this.state.read_only }
                                        />  :
                                        null
                                    }
                                    { scenesExist ?
                                        <Scenes
                                            dev_id = { this.props.id }
                                            scenes = { scenes }
                                            read_only = { this.state.read_only }
                                        />  :
                                        null
                                    }
                                </Grid>
                            </Zoom>
                        }
                        { loading ?
                            <Zoom in = { loading }>
                                <div className = { classes.progress }>
                                    <WaitingProgress dev_id = { this.props.id } />
                                </div>
                            </Zoom> :
                            null
                        }
                    </CardContent>
                </Card>
        );
    }
}


LightManager.propTypes = {
    classes: PropTypes.object.isRequired,
    device_state: PropTypes.object.isRequired ,
    id: PropTypes.string.isRequired
};

export default withStyles(styles)(LightManager);