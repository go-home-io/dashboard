import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import AppBarPlaceholder from "../navigation/AppBarPlaceholder";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const styles = {
    root: {
        width: "100%",
        marginTop:100,
    },
    icon: {
        marginTop: 250,
        padding: 10,
        color: "rgba(0,0,0,0.54)"
    }
};

class ErrorPage extends React.Component {
    render () {
        const {classes, status, loading} = this.props;
        const mess = loading ? "Loading ..." : "Connection error";
        return(
            <Grid container justify = 'center'>
                <AppBarPlaceholder/>
                { ! loading ?
                    <div >
                        <Grid container className = { classes.root } justify = 'center' alignItems = 'center'>
                            <Typography variant = "h1" color = "textSecondary">
                                <strong>
                                    {status}
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid container justify = 'center'>
                            <Typography variant = "h4" color = "textSecondary">
                                { mess }
                            </Typography>
                        </Grid>
                    </div>
                    :
                    <Grid container justify = 'center' alignItems = 'center' alignContent = 'center'>
                        <FontAwesomeIcon
                            className = { classes.icon }
                            spin
                            icon = "spinner"
                            size = "6x"
                        />
                    </Grid>
                }
            </Grid>
        );
    }
}

ErrorPage.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.number,
    loading: PropTypes.bool
};

export default withStyles(styles)(ErrorPage);
