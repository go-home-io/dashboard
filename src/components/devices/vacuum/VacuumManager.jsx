import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import FanSpeedControl from "./FanSpeedControl";
import CommandPanel from "./CommandPanel";
import Battery from "../../common/elements/Battery";
import ComponentUpperInfo from "../../common/elements/ComponentUpperInfo";
import VacuumAreaDuration from "./VacuumAreaDuration";

const styles = () => ({
    progress: {
        padding:3,
        marginTop: 5,
        marginLeft: -3,
        width: "100%"
    },
    battery_root: {
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

const VacuumManager = props =>{

    const {  id, device_info, device_state, doCommand }  = props;
    const { commands } = device_info;
    const { battery_level, vac_status, area:raw_area, duration, fan_speed} = device_state;
    const area = Math.round(raw_area);

    return (
        <>

            <ComponentUpperInfo
                leftField = {
                    <VacuumAreaDuration area = { area }/>
                }
                centerField = {
                    <VacuumAreaDuration duration = { duration }/>
                }
                rightField = {
                    <Battery battery_level = { battery_level }/>
                }
            />

            <CardContent>
                <div>
                    <FanSpeedControl
                        dev_id = { id }
                        level = { fan_speed }
                        commands = { commands }
                        doCommand = { doCommand }
                    />
                    <CommandPanel
                        dev_id = { id }
                        vac_status = { vac_status }
                        commands = { commands }
                        doCommand = { doCommand }
                    />
                </div>
            </CardContent>
        </>
    );
};

VacuumManager.propTypes = {
    device_info: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

export default withStyles(styles)(VacuumManager);