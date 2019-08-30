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

        if (devices) {
            const index = devices.findIndex( dev => (dev.id === id));
            devices[index].state = state;
        }
        this.setState({devices: devices});
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