import React from "react";

export const AppContext = React.createContext({
    active_location: "TestPage",
    active_group: null,
    active_page: "devices",
    setContextState: () => {},
    setDeviceState: () => {}
});

class AppContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active_location: "Default",
            active_group: null,
            active_page: "devices",
            devices: [],
            groups: [],
            locations: [],
            uom: "",
            setStoreState: (data) => this.setState(data),
            setDeviceState: (data) => (this.setDevState(data)),
        };
    }
    setDevState = (data) => {
        const { id, state } = data;
        let { devices } = this.state;
        let dev_updated = [];
        // let thisDevice = devices.find( dev => dev.id === id );
        if (devices) {
            devices.map( dev => {
                if (dev.id === id) {
                    dev.state = state;
                }
                dev_updated.push(dev);
            });
        }
        this.setState({devices: dev_updated});
    };


    render() {
        const { children, ...other } = this.props;
        return (
            <AppContext.Provider value = { this.state } >
                <div { ...other }>
                    { children }
                </div>
            </AppContext.Provider>
        );
    }

}

export default AppContextProvider;