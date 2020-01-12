import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import SearchBar from './SearchBar';
import LocationCardList from './LocationCardList';
import LocationSearchInput from './LocationSearchInput';

class LocationSearchMenu extends React.Component {
    state = {
        start: {
            lat: null,
            lng: null
        }
    };
    
    onLsiSelectStart = (location) => {
        this.setState({
            start: {
                lat: location.lat,
                lng: location.lng
            }
        });
    };

    onLsiSelectEnd = (location) => {
        this.setState({
            end: {
                lat: location.lat,
                lng: location.lng
            }
        });
    };
        
    render() {
        return (
            <Box paddingX={10} pb={1}>
                <Card>
                    <CardContent>
                        <LocationSearchInput
                            question="Where should your tour start?" 
                            label="Search"
                            onChange={this.onLsiSelectStart}
                        />
                        <LocationCardList/>
                    </CardContent>
                </Card>
            </Box>
        );
    }
}

export default LocationSearchMenu;