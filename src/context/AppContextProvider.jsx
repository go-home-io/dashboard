import React, {useState} from "react";

export const AppContext = React.createContext({
    active_location: "TestPage",
    active_group: null,
    active_page: "devices",
    active_group_on: false,
    uom: "",
    openMenu: false,
    statusLoaded: false,
    setContextState: () => {},
});


const AppContextProvider = props => {
    const { children, ...other } = props;
    const [activeLocation, setActiveLocation ] = useState("Defualt");
    const [activePage, setActivePage ] = useState("devices");
    const [activeGroup, setActiveGroup ] = useState(null);
    const [activeGroupOn, setActiveGroupOn] = useState(false);
    const [uom, setUom] = useState("");
    const [openMenu, setOpenMenu] = useState(false);
    const [statusLoaded, setStatusLoaded] = useState(false);

    const appContext = {
        active_location: activeLocation,
        active_page: activePage,
        active_group: activeGroup,
        active_group_on: activeGroupOn,
        uom: uom,
        openMenu: openMenu,
        statusLoaded: statusLoaded,
        setLocation: location => setActiveLocation(location),
        setPage: page => setActivePage(page),
        setGroup: group => setActiveGroup(group),
        setGroupOn: status => setActiveGroupOn(status),
        setUOM: units => setUom(units),
        toggleMenu: () => {
            const open = !openMenu;
            setOpenMenu(open);
        },
        setMenuStatus: (status) => setOpenMenu(status),
        setLoaded: loaded => setStatusLoaded(loaded)
    };


    return(
        <AppContext.Provider value = { appContext } >
            <div { ...other }>
                { children }
            </div>
        </AppContext.Provider>
    );

};

export default AppContextProvider;