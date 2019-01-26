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
    constructor (props) {
        super(props);
        this.state = {
            workerSelected: null,
        };
        this.handleRowClick = this.handleRowClick.bind(this);
    }
    handleRowClick (rowData) {
        this.setState({workerSelected: rowData[0] });
    }
    render () {
        const { status, worker, classes } = this.props;
        const { workerSelected } = this.state;
        const  workerColumns  = ["ID", "Last seen", "Properties", "Max devices"];
        const statusColumns = ["Name", "Status", "Worker", "Type"];
        const filterList = workerSelected ? [ [],[],[workerSelected],[] ] : null;


        let workerData = [];
        // eslint-disable-next-line
        worker.map(item => {
            const { id, last_seen, worker_properties, max_devices } = item;
            workerData.push([id, last_seen, properties(worker_properties), max_devices]);
        });

        let statusData = [];
        // eslint-disable-next-line
        status.map(item => {
            statusData.push([item.name, item.status, item.worker, item.type]);
        });

        const workerOptions = {
            filter: false,
            responsive: "scroll",
            pagination: false,
            onRowClick: this.handleRowClick,
            viewColumns: false,
            print: false,
            download: false,
            selectableRows: false,
        };
        const statusOptions = {
            filterType: "dropdown",
            filterList: filterList,
            responsive: "scroll",
            selectableRows: false,
            rowsPerPageOptions: [10, 15, 20],
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