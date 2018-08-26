import AppBarPlaceHolder from "../navbar/AppBarPlaceHolder";
import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        width: '100%',
        marginTop:100,
    },
};

class ErrorPage extends React.Component {

    render () {
        const {classes} = this.props;
        return(
            <div>
                <AppBarPlaceHolder/>
                <Grid container justify='center'>
                    <Grid container className={classes.root} justify='center'>
                        <Typography variant="display4" gutterBottom>
                            {this.props.status}
                        </Typography>
                    </Grid>
                    <Grid container justify='center'>
                        <Typography variant="subheading" gutterBottom>
                            Connection error
                        </Typography>
                    </Grid>

                </Grid>

            </div>
        )
    }
}

ErrorPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorPage);
