import React from 'react';
import LocationCard from './LocationCard';
import Grid from '@material-ui/core/Grid'

class LocationCardList extends React.Component {
    render() {
        const locations = [
            'Surrey',
            'Mongolia',
            'China',
            'NYC Street',
            'California',
            'Kathmandu',
            'Burnaby City',
            'Vancouver',
            'Whistler Mountain'
        ]
        return (
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                {
                    locations.map(locationName => (
                        <LocationCard key={locationName} locationText={locationName}/>
                    ))
                }
            </Grid>
        )
    }
}

export default LocationCardList;