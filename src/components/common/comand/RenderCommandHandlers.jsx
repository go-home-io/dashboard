import React from "react";
import LightBrightness from "../../devices/light/LightBrightness";
import LightColorPicker from "../../devices/light/LightColorPicker";
import Scenes from "../../devices/light/Scenes";
import PropTypes from "prop-types";
import UnknownCommandHandler from "./UnknownCommandHandler";


const trivialCommands = ["on", "off", "toggle", "input"];
const knownCommandHandlers = {
    "set-brightness": LightBrightness,
    "set-color": LightColorPicker,
    "set-scene": Scenes,
};

const RenderCommandHandlers = props =>{
    const { commands, dev_id, doCommand, read_only, device_state } = props;
    const { brightness , color: initColor, scenes, on } = device_state;
    const color = ( on ) ? initColor : {r:100,g:100,b:100};
    const knownCommands = Object.keys(knownCommandHandlers);
    const commandsSorted = commands.sort();

    return (
        commandsSorted.map( command => {
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
                            read_only = { read_only }
                        />
            );
        })
    );
};

RenderCommandHandlers.propTypes = {
    commands: PropTypes.array.isRequired,
    dev_id: PropTypes.string.isRequired,
    doCommand: PropTypes.func.isRequired,
    read_only: PropTypes.bool.isRequired,
    // level, color, scenes
    device_state: PropTypes.object.isRequired
};

export default RenderCommandHandlers;