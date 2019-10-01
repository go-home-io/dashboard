import React, {useContext, useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {LogsContext} from "../../context/LogsContext";
import {Typography} from "@material-ui/core";
import { formatTimeDate } from "../../utils/formatTimeDate";
import FilterListIcon from "@material-ui/icons/FilterList";
import {blue} from "@material-ui/core/colors";
import makeStyles from "@material-ui/styles/makeStyles";
import FilterInput from "./FilterInput";
import Button from "@material-ui/core/Button";
import {EventEmitter} from "../../context/EventEmitter";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    line: {
        cursor: "pointer",
        "&:hover": {
            color: blue[500],
        },
    },
    button: {
        marginTop: 10,
        marginBottom: 10
    }
});

const filterNfo = {
    from_utc: {
        name: "From",
        variant: "time"
    },
    to_utc: {
        name: "To",
        variant: "time"
    },
    log_level: {
        name: "Log Level",
        variant: "radio"
    },
    system: {
        name: "System",
        variant: "text"
    },
    provider: {
        name: "Provider",
        variant: "text"
    },
    device_id: {
        name: "Device ID",
        variant: "text"
    },
    worker_id: {
        name: "Worker ID",
        variant: "text"
    },
};

// const variant = {
//     from_utc: "time",
//     to_utc: "time",
//     log_level: "radio",
//     system: "text",
//     provider: "text",
//     device_id: "text",
//     worker_id: "text"
// };

const Filters = () => {
    const classes = useStyles();
    const { filter, setFilter, reset, previous } = useContext(LogsContext);
    const { raiseEvent } = useContext(EventEmitter);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filterKey, setFilterKey] = useState("");
    const variant = filterKey ? filterNfo[filterKey].variant : null;

    const openFilterInputDailog = (filterKey) => {
        setFilterKey(filterKey);
        setDialogOpen(true);
    };

    const setFilterValue = value => {
        setFilter(filterKey, value);
        setDialogOpen(false);
    };

    return (
        <div>
            <Divider/>
            <ListItem>
                <ListItemIcon>
                    <FilterListIcon/>
                </ListItemIcon>
                <ListItemText primary = { "Filters" } />
            </ListItem>

            <Divider/>

            { Object.keys(filter).map( (filterKey, index) => {
                const value = index < 2 ? formatTimeDate(filter[filterKey]) : filter[filterKey];
                const name = filterKey ? filterNfo[filterKey].name : null;

                return (
                    <ListItem
                        key = { filterKey }
                        button
                        className = { classes.line }
                        onClick = { () => openFilterInputDailog(filterKey) }
                    >
                        <Typography variant = "body1" color = "inherit">
                            { name + ":  "}
                            <small>
                                {" "}
                                { value }
                                {" "}
                            </small>
                        </Typography>
                    </ListItem>
                );
            })}

            <Grid container justify = "space-around">
                <Button
                    className = { classes.button }
                    onClick = { () => reset() }
                    color = "secondary"
                    variant = "outlined"
                >
                    reset
                </Button>
                <Button
                    className = { classes.button }
                    onClick = { () => previous() }
                    color = "default"
                    variant = "outlined"
                >
                    back
                </Button>
                <Button
                    className = { classes.button }
                    onClick = { () => raiseEvent("apply", filter) }
                    color = "primary"
                    variant = "outlined"
                >
                    apply
                </Button>
            </Grid>

            <FilterInput
                open = { dialogOpen }
                variant = { variant }
                setFilterValue = { (value) => setFilterValue(value) }
                cancelInput = { () => setDialogOpen(false) }
                initialValue = { filter[filterKey] }
                filterKey = { filterKey }
            />
        </div>
    );
};


export default Filters;