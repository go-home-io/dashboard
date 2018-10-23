import StartPage from "../components/pages/StartPage";
import StatusLayout from "../components/pages/StatusStartPage";

const indexRoutes = [
    { path: "/", component: StartPage },
    { path: "/status", component: StatusLayout }
];

export default indexRoutes;
