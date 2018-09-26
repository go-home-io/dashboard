import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon/Icon";
import AppBarPlaceholder from "../navigation/AppBarPlaceholder";

const styles = {
    root: {
        width: "100%",
        marginTop:100,
    },
    icon: {
        // fontSize: 50,
        width: 400,
        height: 400,
        marginTop: 200,
        marginLeft: 300,
        padding: 10,
        color: "rgba(0,0,0,0.54)"
    }
};

class ErrorPage extends React.Component {

    render () {
        const {classes, status, loading} = this.props;
        const mess = loading ? "Loading ..." : "Connection error";
        return(
            <Grid container justify='center'>
                <AppBarPlaceholder/>
                { ! loading ?
                    <div >

                        <Grid container className = { classes.root } justify = 'center' alignItems='center'>


                                <Typography variant = "display4" gutterBottom>
                                    {status}
                                </Typography>

                        </Grid>

                        <Grid container justify='center'>
                            <Typography variant = "display1" gutterBottom>
                                { mess }
                            </Typography>
                        </Grid>
                    </div> :

                    <Grid container justify='center' alignItems='center' alignContent='center'>
                        <div >
                        <Icon className={classes.icon}>
                            <i className="fa fa-refresh fa-spin fa-5x" aria-hidden="true"> </i>
                        </Icon>
                        </div>
                    </Grid>
                }
            </Grid>
        );
    }
}

ErrorPage.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes
};

export default withStyles(styles)(ErrorPage);
