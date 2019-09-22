import React from "react";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {Slide} from "@material-ui/core";


const styles = () => ({
    root: {
        marginTop: 10,
    }
});

const getMuiTheme = () => createMuiTheme({
    overrides: {
        MUIDataTableBodyCell: {
            root: {
                cursor: "pointer",
            }
        }
    }
});

const properties = ( worker_properties ) => {
    if (worker_properties) {
        const { location, name, type} = worker_properties;
        return "location: "  + location + " | name: " + name + "  | type: " + type;
    } else {
        return "null";
    }
};

class  StatusManager extends React.Component {
        state = {
            workerSelected: null,
        };

    handleRowClick = (rowData) => {
        this.setState({workerSelected: rowData[0] });
    };

    render () {
        const { status, worker, classes } = this.props;
        const { workerSelected } = this.state;
        const  workerColumns  = ["ID", "Last seen", "Properties", "Max devices"];

        // Worker Table Data
        let workerData = [];
        if ( worker )
        // eslint-disable-next-line
            worker.map(item => {
                const { id, last_seen, worker_properties, max_devices } = item;
                workerData.push([id, last_seen, properties(worker_properties), max_devices]);
            });

        const workerOptions = {
            filter: true,
            pagination: false,
            onRowClick: this.handleRowClick,
            viewColumns: false,
            print: false,
            download: false,
            selectableRows: "none",
        };

        // Status Table Data
        let statusData = [];
        if ( status )
        // eslint-disable-next-line
            status.map(item => {
                statusData.push([item.name, item.status, item.worker, item.type]);
            });

        const statusColumns = [
            {
                name: "Name",
                options: {
                    filter: true,
                }
            },
            {
                name: "status",
                options: {
                    filter: true,
                }
            },
            {
                name: "worker",
                options: {
                    filter: true,
                    filterList: workerSelected ? [workerSelected] : null,
                }
            },
            {
                name: "type",
                options: {
                    filter: true
                }
            },

        ];

        const statusOptions = {
            filter: true,
            pagination: false,
            viewColumns: false,
            rowHover: false,
            print: false,
            download: true,
            selectableRows: "none",
        };

        return (
            <div className = { classes.root } >
                { workerData.length > 0 &&
                    <Slide direction = "down" in = { true } timeout = { { enter: 1000 } }>
                        <div>
                            <MuiThemeProvider theme = { getMuiTheme() }>
                                <MUIDataTable
                                    title = { "Known Workers" }
                                    data = { workerData }
                                    columns = { workerColumns }
                                    options = { workerOptions }
                                />
                            </MuiThemeProvider>
                        </div>
                    </Slide>
                }
                <br/>
                { statusData.length > 0 &&
                    <Slide direction = "up" in = { true } timeout = { {enter: 1000} }>
                        <div>
                            <MUIDataTable
                                title = { "Config Entities Status" }
                                data = { statusData }
                                columns = { statusColumns }
                                options = { statusOptions }
                            />
                        </div>
                    </Slide>
                }
            </div>
        );
    }
}

StatusManager.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.array,
    worker: PropTypes.array
};

export default withStyles(styles)(StatusManager);