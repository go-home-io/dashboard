import React from "react";
import Reflux from "reflux";
import ComponentHeader from "../common/ComponentHeader";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import CameraStoreFactory from "../../reflux/camera/CameraStore";


const styles = () => ({
    root: {
        width: 172,
        height:165,
        margin: 5,
    },
    progress: {
        padding:3,
        marginTop: 5,
        marginLeft: -3,
        width: "100%"
    },
    battery_root: {
        // position: "relative",
        // top: -12,
        // left: 30,
        height: 0,
        width: 0
    },
    icon: {
        color: "rgba(0, 0, 0, 0.54)",
        position: "relative",
        fontSize: 13,
        top: -34,
        left: 151,
        width: 20,
    },
    label: {
        fontSize: 11,
        position: "relative",
        left: 120,
        top:-18,
    },
    speed: {
        marginTop: -10
    }
});

const imageDOM = picture => {
    const imageTag = "<img src=" + "\"data:image/jpg;base64, " + picture + "\"" + " />" ;
    // alert(imageTag);
    return {__html: imageTag};
};

class CameraManager extends Reflux.Component{
    constructor(props) {
        super(props);
        const { id, device_info, location, group_id } = props;
        this.store = CameraStoreFactory(id, device_info, location, group_id);
    }

    render () {
        const { classes }  = this.props;
        const { id, name: fullName, device_state, visible, loading, status, commands } = this.state;
        const display = visible ? "block" : "none";
        const {  picture } = device_state;
        const image = "\"data:image/jpg;base64, " + picture + "\"";

        return (

                 <Card className={classes.root} style={{display: display}}>
                     <Grid container justify = 'flex-start' alignItems = 'center'>
                         <div dangerouslySetInnerHTML={imageDOM(picture)} />
                        {/*<img src="" alt="Red dot"/>*/}
                     </Grid>
                </Card>

        );
    }
}


CameraManager.propTypes = {
    classes: PropTypes.object.isRequired,
    device_info: PropTypes.object.isRequired ,
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    group_id: PropTypes.string
};

export default withStyles(styles)(CameraManager);