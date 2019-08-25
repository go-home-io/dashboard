import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import  PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent/CardContent";
import groupActions from "../../reflux/group/groupActions";
import {
    MIN_GROUP_HEADER_BKG_COLOR,
    LIGHT_RO_ICON_COLOR
} from "../../settings/colors";
import ComponentHeader from "../common/ComponentHeader";
import WaitingProgress from "../common/WaitingProgress";
import ExpandButton from "./ExpandButton";
import Zoom from "@material-ui/core/Zoom/Zoom";
import Grid from "@material-ui/core/Grid/Grid";
import RenderCommandHandlers from "../common/RenderCommandHandlers";
import DeviceFrame from "../common/DeviceFrame";
import appActions from "../../reflux/application/appActions";

const styles = () => ({
    root: {
        width:172,
        height:165,
        margin: 5,
    },
    content: {
        marginTop: -27,
    },
    expandButton: {
        // position: "relative",
        // top: -70,
        // left: 140,
    }
});

class MinimizedGroup extends React.Component {
    expandGroup () {
        const { group_id, device_state } = this.props;
        groupActions.expandWindow(group_id);
        appActions.setActiveGroup(group_id, device_state.on);
    }
    render () {
        const {
            classes, device_state, group_id, commands,
            name, read_only, loading, status, visible } = this.props;
        return (
            <DeviceFrame visible = { true }>
                <ComponentHeader
                    dev_id = { group_id }
                    name = { name }
                    variant = "minGroup"
                    on = { device_state.on }
                    status = { status }
                    read_only = { read_only }
                    actions = { groupActions }
                    ordinaryBkgColor = { MIN_GROUP_HEADER_BKG_COLOR }
                    iconROColor = { LIGHT_RO_ICON_COLOR }
                />

                <ExpandButton
                    expandGroup = { this.expandGroup.bind(this) }
                    visible = { visible }
                />

                <CardContent >
                    { loading ?
                        <Zoom in = { loading } >
                            <WaitingProgress
                                dev_id = { group_id }
                                actions = { groupActions }
                            />
                        </Zoom>
                        :
                        <Zoom in = { ! loading } >
                            <Grid
                                className = { classes.content }
                                container
                                justify = 'flex-start'
                                direction = "column"
                            >
                                <RenderCommandHandlers
                                    commands = { commands }
                                    dev_id = { group_id }
                                    doCommand = { groupActions.command }
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

MinimizedGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    device_state: PropTypes.object.isRequired,
    group_id: PropTypes.string.isRequired,
    commands: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    read_only: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
};

export default withStyles(styles)(MinimizedGroup);