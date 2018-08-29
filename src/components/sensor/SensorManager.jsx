import React from 'react';
import Reflux from 'reflux';
import SensorStoreFactory from '../../reflux/sensor/SensorStore';
import Card from '@material-ui/core/Card/Card';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";
import SensorHeader from "./SensorHeader";
import sensorIcons from "./sensorIcons";
import truncateCaption from "../utils/truncate";

const styles = theme => ({
    root: {
        minWidth: 250,
        minHeight: 130,
        maxHeight: 130,
        margin: 5,
    },

});

class SensorManager extends Reflux.Component {
    constructor(props) {
        super(props);
        console.log(this.props.device_info);
        this.store = SensorStoreFactory(this.props.id,  this.props.device_info, this.props.location)
    }
    render () {
        const {classes} = this.props;
        const icon = sensorIcons(this.state.type);
        const name = truncateCaption(this.state.name, 24);
        const display = this.state.visible ? 'block' : 'none';

        return (
            <Card className={classes.root} style={{display:display}}>
                    <SensorHeader
                            dev_id={this.props.id}
                            name = {name}
                            status = {this.state.status}
                            icon = {icon}
                    />
                <CardContent>

                </CardContent>
            </Card>
        )
    }
}

SensorManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SensorManager)

