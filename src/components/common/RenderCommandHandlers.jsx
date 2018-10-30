import React from "react";
// import groupActions from "../../reflux/group/groupActions";
// import Grid from "@material-ui/core/Grid/Grid";
import LightBrightness from "../light/LightBrightness";
import LightColorPicker from "../light/LightColorPicker";
import Scenes from "../light/Scenes";
import PropTypes from "prop-types";
import UnknownCommandHandler from "./UnknownCommandHandler";


const trivialCommands = ["on", "off", "toggle"];
const knownCommandHandlers = {
    "set-brightness": LightBrightness,
    "set-color": LightColorPicker,
    "set-scene": Scenes,
};

class RenderCommandHandlers extends React.Component{
    render () {
        const { commands, dev_id, doCommand, read_only, device_state } = this.props;
        const { brightness , color: initColor, scenes, on } = device_state;
        const color = ( on ) ? initColor : {r:100,g:100,b:100};
        const knownCommands = Object.keys(knownCommandHandlers);

        return (
            commands.map( command => {
                const KnownCommandHandler = knownCommandHandlers[command];
                return (
                    trivialCommands.includes(command) ?
                        null
                        :
                        knownCommands.includes(command) ?
                            <KnownCommandHandler
                                key = { command }
                                dev_id = { dev_id }
                                doCommand = { doCommand }
                                read_only = { read_only }
                                level = { brightness }
                                color = { color }
                                scenes = { scenes }
                            />
                            :
                            <UnknownCommandHandler
                                key = { command }
                                dev_id = { dev_id }
                                doCommand = { doCommand }
                                command = { command }
                            />
                );
            })
        );
    }
}

RenderCommandHandlers.propTypes = {
    commands: PropTypes.array.isRequired,
    dev_id: PropTypes.string.isRequired,
    doCommand: PropTypes.func.isRequired,
    read_only: PropTypes.bool.isRequired,
    // level, color, scenes
    device_state: PropTypes.object.isRequired
};

export default RenderCommandHandlers;