import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import truncateCaption from "../utils/truncate";
import { SWITCH_HEADER_BKG_COLOR, SWITCH_RO_ICON_COLOR } from "../../settings/colors";
import ComponentHeader from "../common/ComponentHeader";
import DeviceStoreFactory from "../../reflux/devices/DeviceStore";
import deviceActions from "../../reflux/devices/deviceActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Zoom from "@material-ui/core/Zoom/Zoom";
import WaitingProgress from "../common/WaitingProgress";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import CustomizedSwitch from "./customizedSwitch";
import DeviceFrame from "../common/DeviceFrame";

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
    }
});

class SwitchManager extends Reflux.Component {
    constructor(props) {
        super(props);
        const { id, device_info, location, group_id } = props;
        this.store = DeviceStoreFactory(id, device_info, location, group_id);

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange () {
        const { id, read_only } = this.state;
        if ( ! read_only ) {
            deviceActions.toggle(id);
        }
    }
    render () {
        const { classes, id } = this.props;
        const {  name: full_name, visible, device_state, status, read_only, loading } = this.state;
        const name = truncateCaption(full_name, 45);
        const { power, on } = device_state;

        return (
            <DeviceFrame visible = { visible } >
                <ComponentHeader
                    dev_id = { id }
                    name = { name }
                    status = { status }
                    actions = { deviceActions }
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
                                <WaitingProgress
                                    dev_id = { id }
                                    actions = { deviceActions }
                                />
                            </div>
                        </Zoom>
                        :
                        <Zoom in = { !loading }>
                            <div>
                                <Grid container justify = 'center' >
                                    <Typography variant = 'headline' className = { classes.typography }>
                                        <strong>
                                            {power}
                                            {" v"}
                                        </strong>
                                    </Typography>
                                </Grid>
                                <Grid container justify = 'center' >
                                    <CustomizedSwitch
                                        disabled = { read_only }
                                        checked = { on }
                                        colorThumb = { SWITCH_HEADER_BKG_COLOR }
                                        handleChange = { this.handleChange }
                                    />
                                </Grid>
                            </div>
                        </Zoom>
                    }
                </CardContent>
            </DeviceFrame>
        );
    }
}

SwitchManager.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
};

export default withStyles(styles)(SwitchManager);

