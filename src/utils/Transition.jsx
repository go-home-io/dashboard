import React from "react";
import Slide from "@material-ui/core/Slide";

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction = "down" ref = { ref } { ...props } />;
});
