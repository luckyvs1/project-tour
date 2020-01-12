import React from 'react';
import LocationCard from './LocationCard';
import Grid from '@material-ui/core/Grid'

class LocationCardList extends React.Component {
    render() {
        const locations = [
            'Bangkok',
            'London',
            'Paris',
            'NYC',
            'San Francisco',
            'Singapore',
            'Whistler',
            'Vancouver',
            'Tokyo',
            'Berlin',
            'Manila',
            'Beijing'
        ]
        return (
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                {
                    locations.map(locationName => (
                        <LocationCard style={{padding: "10px 10px 10px 10px"}} key={locationName} locationText={locationName}/>
                    ))
                }
            </Grid>
        )
    }
}

export default LocationCardList;