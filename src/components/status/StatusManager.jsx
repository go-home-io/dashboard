import React from "react";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


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

        // Worker Table
        let workerData = [];
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

        // Status Table
        let statusData = [];
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
                    customFilterListRender: v => `Filtered by worker: ${v}`,
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
            filterType: "dropdown",
            selectableRows: "none",
            rowsPerPageOptions: [10, 20, 100],
            viewColumns: false,
            rowHover: false,
        };

        return (
            <div className = { classes.root } >
                <MuiThemeProvider theme = { getMuiTheme() }>
                    <MUIDataTable
                        title = { "Known Workers" }
                        data = { workerData }
                        columns = { workerColumns }
                        options = { workerOptions }
                    />
                </MuiThemeProvider>
                <br/>
                <MUIDataTable
                    title = { "Config Entities Status" }
                    data = { statusData }
                    columns = { statusColumns }
                    options = { statusOptions }
                />
            </div>
        );
    }
}

StatusManager.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.array.isRequired,
    worker: PropTypes.array.isRequired
};

export default withStyles(styles)(StatusManager);