export const commandButtonsBehavior = {
    "unknown": {
        "start": {
            "disabled": false,
            "icon": "play_arrow",
            "command": "on"
        },
        "stop": {
            "disabled": false,
            "icon": "stop",
            "command": "off"
        },
        "find": {
            "disabled": false,
            "icon": "map-pin",
            "command": "findMe"
        },
        "dock": {
            "disabled": false,
            "icon": "save_alt",
            "command": "dock"
        }
    },
    "paused": {
        "start": {
            "disabled": false,
            "icon": "play_arrow",
            "command": "on"
        },
        "stop": {
            "disabled": false,
            "icon": "stop",
            "command": "off"
        },
        "find": {
            "disabled": false,
            "icon": "map-pin",
            "command": "findMe"
        },
        "dock": {
            "disabled": false,
            "icon": "save_alt",
            "command": "dock"
        }

    },
    "docked":  {
        "start": {
            "disabled": false,
            "icon": "play_arrow",
            "command": "on"
        },
        "stop": {
            "disabled": true,
            "icon": "stop",
            "command": "off"
        },
        "find": {
            "disabled": true,
            "icon": "map-pin",
            "command": "findMe"
        },
        "dock": {
            "disabled": true,
            "icon": "save_alt",
            "command": "dock"
        }
    },
    "charging":  {
        "start": {
            "disabled": true,
            "icon": "play_arrow",
            "command": "on"
        },
        "stop": {
            "disabled": true,
            "icon": "stop",
            "command": "off"
        },
        "find": {
            "disabled": true,
            "icon": "map-pin",
            "command": "findMe"
        },
        "dock": {
            "disabled": true,
            "icon": "save_alt",
            "command": "dock"
        }
    },
    "cleaning":  {
        "start": {
            "disabled": false,
            "icon": "pause",
            "command": "pause"
        },
        "stop": {
            "disabled": false,
            "icon": "stop",
            "command": "off"
        },
        "find": {
            "disabled": false,
            "icon": "map-pin",
            "command": "findMe"
        },
        "dock": {
            "disabled": false,
            "icon": "save_alt",
            "command": "dock"
        }
    },
    "full":  {
        "start": {
            "disabled": true,
            "icon": "play_arrow",
            "command": "on"
        },
        "stop": {
            "disabled": true,
            "icon": "stop",
            "command": "off"
        },
        "find": {
            "disabled": false,
            "icon": "map-pin",
            "command": "findMe"
        },
        "dock": {
            "disabled": true,
            "icon": "save_alt",
            "command": "dock"
        }

    },
};
