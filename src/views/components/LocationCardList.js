import React from 'react';
import LocationCard from './LocationCard';
import Grid from '@material-ui/core/Grid'

class LocationCardList extends React.Component {
    render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <LocationCard locationText='Surrey'/>
                <LocationCard locationText='Mongolia'/>
                <LocationCard locationText='Detroit'/>
            </Grid>
        )
    }
}

export default LocationCardList;