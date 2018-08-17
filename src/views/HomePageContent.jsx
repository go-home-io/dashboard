import LightManager from "../components/light/LightManager";
import React from "react";
import location from "../components/location/locations";
import Grid from "@material-ui/core/Grid/Grid";


class HomePageContent extends React.Component {
    renderLightControl = (item, index) => {
        if (item.type === 'light' ) {
           return (
                <LightManager
                    id={item.id}
                    key={item.id}
                    device_state = {item}
                />
            )
        }
    };



    render () {
        return (
                <Grid container>


                    {this.props.generalState.devices.map(this.renderLightControl)}
                </Grid>

        )
    }

}

export default HomePageContent