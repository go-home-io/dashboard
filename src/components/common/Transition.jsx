import Slide from "@material-ui/core/Slide/Slide";
import React from "react";

function Transition(props) {
    return <Slide direction = "down" { ...props } />;
}

export default Transition;