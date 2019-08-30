import React from "react";
import Reflux from "reflux";
import ComponentHeader from "../../common/component/ComponentHeader";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import WaitingProgress from "../../common/elements/WaitingProgress";
import Zoom from "@material-ui/core/Zoom/Zoom";
import truncateCaption from "../../../utils/truncate";
import {LIGHT_HEADER_BKG_COLOR, LIGHT_HEADER_ICON_COLOR_ON, LIGHT_HEADER_ICON_COLOR_OFF, LIGHT_RO_ICON_COLOR} from "../../../settings/colors";
import RenderCommandHandlers from "../../common/comand/RenderCommandHandlers";
import DeviceStoreFactory from "../../../reflux/devices/DeviceStore";
import deviceActions from "../../../reflux/devices/deviceActions";
import DeviceFrame from "../../common/elements/DeviceFrame";
import {AppContext} from "../../../context/AppContextProvider";

const styles = () => ({
    // root: {
    //     width:172,
    //     height:165,
    //     margin: 5,
    // },
    progress: {
        padding:3,
        marginTop: 25,
        marginLeft: -3,
        width: "100%"
    }
});

class LightManager extends Reflux.Component{
    constructor(props) {
        super(props);
        const { id, device_info } = props;

        this.store = DeviceStoreFactory(id, device_info);
    }

    render () {
        const { visible, classes, id }  = this.props;
        const { name, device_state, loading, status, read_only, commands } = this.state;
        const caption = truncateCaption(name, 40);

        // const value = this.context;

        return (
            <DeviceFrame visible = { visible } >
                <ComponentHeader
                    dev_id = { id }
                    name = { caption }
                    variant = "light"
                    on = { device_state.on }
                    status = { status }
                    read_only = { read_only }
                    actions = { deviceActions }
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
                                    actions = { deviceActions }
                                />
                            </div>
                        </Zoom>
                        :
                        <Zoom in = { !loading }>
                            <Grid container justify = 'flex-start' direction = "column">
                                <RenderCommandHandlers
                                    commands = { commands }
                                    dev_id = { id }
                                    doCommand = { deviceActions.command }
                                    // doCommand = {  }
                                    read_only = { read_only }
                                    device_state = { device_state }
                                />
                            </Grid>
                        </Zoom>
                    }
                </CardContent>
            </DeviceFrame>
        );
    }
}

LightManager.propTypes = {
    classes: PropTypes.object.isRequired,
    device_info: PropTypes.object.isRequired ,
    id: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
};

LightManager.contextType = AppContext;

export default withStyles(styles)(LightManager);