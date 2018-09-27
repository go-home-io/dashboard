import React from "react";
import Reflux from "reflux";
import ComponentHeader from "../common/ComponentHeader";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import WaitingProgress from "../common/WaitingProgress";
import Zoom from "@material-ui/core/Zoom/Zoom";
import truncateCaption from "../utils/truncate";
import { VACUUM_HEADER_BKG_COLOR } from "../../settings/colors";
import VacuumStoreFactory from "../../reflux/vacuum/VacuumStore";
import vacuumActions from "../../reflux/vacuum/vacuumActions";
import BatteryIcon from "../common/BatteryIcon";
import VacuumReportLine from "./VacuumReportLine";
import FanSpeedControl from "./FanSpeedControl";
import CommandPanel from "./CommandPanel";

const styles = () => ({
    root: {
        width:172,
        height:165,
        margin: 5,
    },
    progress: {
        padding:3,
        marginTop: 5,
        marginLeft: -3,
        width: "100%"
    },
    battery_root: {
        // position: "relative",
        // top: -12,
        // left: 30,
        height: 0,
        width: 0
    },
    icon: {
        color: "rgba(0, 0, 0, 0.54)",
        position: "relative",
        fontSize: 13,
        top: -34,
        left: 151,
        width: 20,
    },
    label: {
        fontSize: 11,
        position: "relative",
        left: 120,
        top:-18,
    },
    speed: {
        marginTop: -10
    }
});

class VacuumManager extends Reflux.Component{
    constructor(props) {
        super(props);
        const { id, device_info, location, group_id } = props;
        this.store = VacuumStoreFactory(id, device_info, location, group_id);
    }

    render () {
        const { classes }  = this.props;
        const { id, name: fullName, device_state, visible, loading, status } = this.state;
        const display = visible ? "block" : "none";
        const { battery_level, vac_status, area:raw_area, duration, fan_speed} = device_state;
        const area = Math.round(raw_area);
        const name = truncateCaption(fullName, 40);

        return (
            <Card style = { {display:display} } className = { classes.root }>
                <ComponentHeader
                    dev_id = { id }
                    name = { name }
                    variant = "vacuum"
                    status = { status }
                    actions = { vacuumActions }
                    vac_status = { vac_status }
                    ordinaryBkgColor = { VACUUM_HEADER_BKG_COLOR }
                />
                <Grid container justify = 'flex-start' alignItems = 'center'>
                    <VacuumReportLine
                        area = { area }
                        duration = { duration }
                    />
                    <BatteryIcon
                        battery_level = { battery_level }
                        cssClass = { classes }
                    />
                </Grid>
                <CardContent>
                    {loading ?
                        <Zoom in = { loading }>
                            <div className = { classes.progress }>
                                <WaitingProgress
                                    dev_id = { id }
                                    actions = { vacuumActions }
                                />
                            </div>
                        </Zoom> :
                        <Zoom in = { !loading }>
                            <div>
                                <FanSpeedControl
                                    dev_id = { id }
                                    level = { fan_speed }
                                />
                                <CommandPanel
                                    dev_id = { id }
                                    vac_status = { vac_status }
                                />
                            </div>
                        </Zoom>
                    }
                </CardContent>

            </Card>
        );
    }
}


VacuumManager.propTypes = {
    classes: PropTypes.object.isRequired,
    device_info: PropTypes.object.isRequired ,
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    group_id: PropTypes.string
};

export default withStyles(styles)(VacuumManager);