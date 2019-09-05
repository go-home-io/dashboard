import PlayArrow from "@material-ui/icons/PlayArrow";
import Stop from "@material-ui/icons/Stop";
import MapPin from "@material-ui/icons/Map";
import SaveAlt from "@material-ui/icons/SaveAlt";
import {Pause} from "@material-ui/icons";

export const commandButtonsBehavior = {
    "unknown": {
        "start": {
            "disabled": false,
            "icon": PlayArrow,
            "command": "on"
        },
        "stop": {
            "disabled": false,
            "icon": Stop,
            "command": "off"
        },
        "find": {
            "disabled": false,
            "icon": MapPin,
            "command": "find-me"
        },
        "dock": {
            "disabled": false,
            "icon": SaveAlt,
            "command": "dock"
        }
    },
    "paused": {
        "start": {
            "disabled": false,
            "icon": PlayArrow,
            "command": "on"
        },
        "stop": {
            "disabled": false,
            "icon": Stop,
            "command": "off"
        },
        "find": {
            "disabled": false,
            "icon": MapPin,
            "command": "find-me"
        },
        "dock": {
            "disabled": false,
            "icon": SaveAlt,
            "command": "dock"
        }

    },
    "docked":  {
        "start": {
            "disabled": false,
            "icon": PlayArrow,
            "command": "on"
        },
        "stop": {
            "disabled": true,
            "icon": Stop,
            "command": "off"
        },
        "find": {
            "disabled": true,
            "icon": MapPin,
            "command": "find-me"
        },
        "dock": {
            "disabled": true,
            "icon": SaveAlt,
            "command": "dock"
        }
    },
    "charging":  {
        "start": {
            "disabled": true,
            "icon": PlayArrow,
            "command": "on"
        },
        "stop": {
            "disabled": true,
            "icon": Stop,
            "command": "off"
        },
        "find": {
            "disabled": true,
            "icon": MapPin,
            "command": "find-me"
        },
        "dock": {
            "disabled": true,
            "icon": SaveAlt,
            "command": "dock"
        }
    },
    "cleaning":  {
        "start": {
            "disabled": false,
            "icon": Pause,
            "command": "pause"
        },
        "stop": {
            "disabled": false,
            "icon": Stop,
            "command": "off"
        },
        "find": {
            "disabled": false,
            "icon": MapPin,
            "command": "find-me"
        },
        "dock": {
            "disabled": false,
            "icon": SaveAlt,
            "command": "dock"
        }
    },
    "full":  {
        "start": {
            "disabled": true,
            "icon": PlayArrow,
            "command": "on"
        },
        "stop": {
            "disabled": true,
            "icon": Stop,
            "command": "off"
        },
        "find": {
            "disabled": false,
            "icon": MapPin,
            "command": "find-me"
        },
        "dock": {
            "disabled": true,
            "icon": SaveAlt,
            "command": "dock"
        }
    },
};
