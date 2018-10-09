import React from "react";
import Reflux from "reflux";
import Card from "@material-ui/core/Card/Card";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import truncateCaption from "../utils/truncate";
import { SWITCH_HEADER_BKG_COLOR, SWITCH_RO_ICON_COLOR } from "../../settings/colors";
import ComponentHeader from "../common/ComponentHeader";
import switchActions from "../../reflux/switch/switchActions";
import SwitchStoreFactory from "../../reflux/switch/SwitchStore";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Zoom from "@material-ui/core/Zoom/Zoom";
import WaitingProgress from "../common/WaitingProgress";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import customizedSwitch from "./customizedSwitch";

const styles = () => ({
    root: {
        width:172,
        height:165,
        margin: 5,
    },
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
        this.store = SwitchStoreFactory(id, device_info, location, group_id);
    }
    handleChange () {
        // const { id } = this.props;
        const { id, read_only } = this.state;
        if ( ! read_only ) {
            switchActions.toggle(id);
        }
    }
    render () {
        const { classes, id } = this.props;
        const {  name: full_name, visible, device_state, status, read_only, loading} = this.state;
        const name = truncateCaption(full_name, 45);
        const display = visible ? "block" : "none";
        const { power, on } = device_state;

        return (
            <Card className = { classes.root } style = { {display:display} }>
                <ComponentHeader
                    dev_id = { id }
                    name = { name }
                    status = { status }
                    actions = { switchActions }
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
                                    actions = { switchActions }
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
                                            {" "}
v
                                        </strong>
                                    </Typography>
                                </Grid>
                                <Grid container justify = 'center' >
                                    { customizedSwitch (on, SWITCH_HEADER_BKG_COLOR, this.handleChange.bind(this), read_only) }
                                </Grid>

                            </div>
                        </Zoom>
                    }
                </CardContent>
            </Card>
        );
    }
}

SwitchManager.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
};

export default withStyles(styles)(SwitchManager);

