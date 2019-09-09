import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {LogsContext} from "../../context/LogsContext";
import {Typography} from "@material-ui/core";
import { formatTimeDate } from "../../utils/formatTimeDate";
import FilterListIcon from "@material-ui/icons/FilterList";
import {blue} from "@material-ui/core/colors";
import makeStyles from "@material-ui/styles/makeStyles";
import FilterInput from "./FilterInput";

const useStyles = makeStyles({
    line: {
        width: "100%",
        margin: 10,
        cursor: "pointer",
        "&:hover": {
            color: blue[500],
        },
    },
});

const variant = {
    FromUTC: "time",
    ToUTC: "time",
    LogLevel: "select",
    System: "text",
    Provider: "text",
    DeviceID: "text",
    WorkerID: "text"
};

const Filters = props => {
    const { classExpand } = props;
    const classes = useStyles();
    const { filter, setFilter } = useContext(LogsContext);
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filterKey, setFilterKey] = useState("");

    const handleClick = () => setOpen( ! open );

    const openFilterInputDailog = (filterKey) => {
        setFilterKey(filterKey);
        setDialogOpen(true);
    };

    const setFilterValue = value => {
        setFilter(filterKey, value);
        setDialogOpen(false);
        // console.log(filter);
    };

    return (
        <div>
            <ListItem
                button
                onClick = { handleClick }
            >
                <ListItemIcon>
                    <FilterListIcon/>
                </ListItemIcon>
                <ListItemText primary = { "Filters" } />
                { open ?
                    <ExpandLess className = { classExpand }/> :
                    <ExpandMore className = { classExpand }/>
                }
            </ListItem>

            <Collapse
                in = { open }
                timeout = "auto"
                unmountOnExit
                // onClick = { handleClick }
            >
                <Divider/>
                <List disablePadding >
                    { Object.keys(filter).map( (filterKey, index) => {
                        const value = index < 2 ? formatTimeDate(filter[filterKey]) : filter[filterKey];
                        return (
                            <li
                                key = { filterKey }
                                className = { classes.line }
                                onClick = { () => openFilterInputDailog(filterKey) }
                            >
                                <Typography variant = "body1" color = "inherit">
                                    { filterKey + ":  "}
                                    <small> 
                                        {" "}
                                        { value }
                                        {" "}
                                    </small>
                                </Typography>
                            </li>
                        );
                    })}
                </List>
            </Collapse>
            <Divider/>
            <FilterInput
                open = { dialogOpen }
                variant = { variant[filterKey] }
                setFilterValue = { (value) => setFilterValue(value) }
                cancelInput = { () => setDialogOpen(false) }
                initialValue = { filter[filterKey] }
                filterKey = { filterKey }
            />
        </div>

    );
};

Filters.propTypes = {
    classExpand: PropTypes.string.isRequired
};

export default Filters;