import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import SearchBar from './SearchBar';
import LocationCardList from './LocationCardList';
import LocationSearchInput from './LocationSearchInput';
import { withRouter } from "react-router-dom";

class LocationSearchMenu extends React.Component {
    state = {
        locationString: ''
    };
    
    onLsiSelectStart = (location) => {
        this.setState({
            locationString: location
        });

        this.props.history.push('/tour/' + location);
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

export default withRouter(LocationSearchMenu);