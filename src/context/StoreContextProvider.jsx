import React from "react";

export const StoreContext = React.createContext({
    devices: [],
    groups: [],
    locations: [],
    uom: "",
    setStoreState: () => {},
    setDeviceState: () => {}
});


class StoreContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            <StoreContext.Provider value = { this.state } >
                <div { ...other }>
                    { children }
                </div>
            </StoreContext.Provider>
        );
    }

}

export default StoreContextProvider;