import React, {useState} from "react";
import storage from "../services/storage";

export const AppContext = React.createContext({
    active_location: "TestPage",
    active_group: null,
    active_page: "devices",
    active_group_on: false,
    uom: "",
    openMenu: false,
    statusLoaded: false,
    notiList: [],
    setContextState: () => {},
    setLocation: () => {},
    setPage: () => {},
    setGroup: () => {},
    setGroupOn: () => {},
    setUOM: () => {},
    toggleMenu: () => {},
    setMenuStatus: () => {},
    setLoaded: () => {},
    setUnseenCount: () => {}
});

const initialUnseenCount = () => {
    const notiList = storage.get("notificationsList");
    if (! notiList) return 0;
    let count = 0;
    notiList.forEach( item => {
        if ( ! item.seen ) count += 1;
    });
    return count;
};

const AppContextProvider = props => {
    const { children, ...other } = props;
    const [activeLocation, setActiveLocation ] = useState("Defualt");
    const [activePage, setActivePage ] = useState("devices");
    const [activeGroup, setActiveGroup ] = useState(null);
    const [activeGroupOn, setActiveGroupOn] = useState(false);
    const [uom, setUom] = useState("");
    const [openMenu, setOpenMenu] = useState(false);
    const [statusLoaded, setStatusLoaded] = useState(false);
    const [notiList, setNotiList] = useState(storage.get("notificationsList"));
    const [unseenNotiCount, setUnseenNotiCount] = useState(initialUnseenCount());
    const [logsAvailable, setLogsAvailable] = useState(false);
    const [statusPageAvialable, setStatusPageAvialable] = useState(false);

    const appContext = {
        active_location: activeLocation,
        active_page: activePage,
        active_group: activeGroup,
        active_group_on: activeGroupOn,
        uom: uom,
        logs_available: logsAvailable,
        openMenu: openMenu,
        statusLoaded: statusLoaded,
        notiList: notiList,
        unseenNotiCount: unseenNotiCount,
        statusPageAvailable: statusPageAvialable,
        setLocation: location => setActiveLocation(location),
        setPage: page => setActivePage(page),
        setGroup: group => setActiveGroup(group),
        setGroupOn: status => setActiveGroupOn(status),
        setUOM: units => setUom(units),
        setLogsAvailable: val => setLogsAvailable(val),
        toggleMenu: () => setOpenMenu(oldValue => ! oldValue),
        setMenuStatus: status => setOpenMenu(status),
        setLoaded: loaded => setStatusLoaded(loaded),
        setUnseenCount: val => setUnseenNotiCount(val),
        setNotiList: list => setNotiList(list),
        setStatusPageAvailable: val => setStatusPageAvialable(val)
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