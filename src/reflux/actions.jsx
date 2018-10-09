import lightActions from "./light/lightActions";
import groupActions from "./group/groupActions";
import sensorActions from "./sensor/sensorActions";
import vacuumActions from "./vacuum/vacuumActions";
import cameraActions from "./camera/cameraActions";
import switchActions from "./switch/switchActions";
import weatherActions from "./weather/weatherActions";

const actionsList = [
    lightActions,
    groupActions,
    sensorActions,
    vacuumActions,
    cameraActions,
    switchActions,
    weatherActions,
];

export default actionsList;