import React from 'react'
import Reflux from 'reflux'
import ComponentHeader from "../common/ComponentHeader";
import LightStoreFactory from "../../reflux/light/LightStore";
import IconLoading from "./IconLoading";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid/Grid";
import LightBrightness from "./LightBrightness";
import LightColorPicker from "./LightColorPicker";
import Scenes from "./Scenes";
import Zoom from "@material-ui/core/Zoom/Zoom";
import lightActions from "../../reflux/light/lightActions";
import truncateCaption from "../utils/truncate";
import {LIGHT_BKG_COLOR} from "../../settings/colors";

const styles = theme => ({
    root: {
        // maxWidth:250,
        width:172,
        height:180,
        // maxHeight:130,
        margin: '5px',
        // marginTop:5,
        // marginBottom:5,
        // marginLeft:5,
    },
    content: {
        marginLeft: 15,
        marginTop: 10,
    },
    icon: {
        position: 'relative',
        left:-10,
        top:-5,
        padding:3,
        fontSize: 22,
        color: 'rgba(0, 0, 0, 0.54)'
    }

});



class CardFrame extends Reflux.Component{
    constructor(props) {
        super(props);

    }


    render () {
        const {classes} = this.props;

        return (

                <Card className={classes.root}>
                </Card>

        )
    }
}


CardFrame.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardFrame);