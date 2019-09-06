import React, {useContext, useEffect, useState} from "react";
import ComponentHeader from "../header/ComponentHeader";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import WaitingProgress from "../../common/elements/WaitingProgress";
import Zoom from "@material-ui/core/Zoom/Zoom";
import truncateCaption from "../../../utils/truncate";
import { VACUUM_HEADER_BKG_COLOR } from "../../../settings/colors";
import FanSpeedControl from "./FanSpeedControl";
import CommandPanel from "./CommandPanel";
import Battery from "../../common/elements/Battery";
import ComponentUpperInfo from "../../common/elements/ComponentUpperInfo";
import VacuumAreaDuration from "./VacuumAreaDuration";
import {maxSymbolsInNamePerLine} from "../../../settings/maxSymbolsInNamePerLine";
import {EventEmitter} from "../../../context/EventEmitter";

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
    // constructor(props) {
    //     super(props);
    //     const { id, device_info } = props;
    //     this.store = VacuumStoreFactory(id, device_info);
    // }

    const onLoadingUpdate = data => {
        if ( data.id !== id ) return;
        setLoading(data.loading);
    };

    const [loading, setLoading] = useState(false);
    const { subscribe } = useContext(EventEmitter);
    const { classes, id, device_info, device_state, doCommand }  = props;
    const { name: fullName, commands } = device_info;
    const { battery_level, vac_status, area:raw_area, duration, fan_speed} = device_state;
    const area = Math.round(raw_area);
    const name = truncateCaption(fullName, maxSymbolsInNamePerLine );
    useEffect( () => subscribe("loading", onLoadingUpdate),
        // eslint-disable-next-line
        []);


    return (
        <>
            <ComponentHeader
                dev_id = { id }
                name = { name }
                doCommand = { doCommand }
                variant = "vacuum"
                vac_status = { vac_status }
                ordinaryBkgColor = { VACUUM_HEADER_BKG_COLOR }
            />

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
                {loading ?
                    <Zoom in = { loading }>
                        <div className = { classes.progress }>
                            <WaitingProgress dev_id = { id }/>
                        </div>
                    </Zoom>
                    :
                    <Zoom in = { !loading }>
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
                    </Zoom>
                }
            </CardContent>
        </>
    );
};

VacuumManager.propTypes = {
    classes: PropTypes.object.isRequired,
    device_info: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

export default withStyles(styles)(VacuumManager);