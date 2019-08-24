import groupActions from "./group/groupActions";
import sensorActions from "./sensor/sensorActions";
import vacuumActions from "./vacuum/vacuumActions";
import cameraActions from "./camera/cameraActions";
import weatherActions from "./weather/weatherActions";
import deviceActions from "./devices/deviceActions";
// import notificationActions from "./notification/notificationActions";

const actionsList = [
    deviceActions,
    groupActions,
    sensorActions,
    vacuumActions,
    cameraActions,
    weatherActions,
];

export default actionsList;