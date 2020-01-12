import React from 'react';
import { withRouter } from "react-router-dom";
import { Container, Typography } from '@material-ui/core'; 
import InterestsList from './InterestsList';
import LocationMap from './LocationMap';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import PageWrapper from './PageWrapper';
import MarkerSelect from './MarkerSelect';
import SetEndLocation from './SetEndLocation';
import Axios from '../../endpoints/backend';

class Tour extends React.Component {
    state = {
        flowPosition: 0,
        endLocation: "",
        interests: [],
        markers: [],
        selectedMarkers: [],
        polyLines: []
    }

    getTour = () => {
        Axios.get('?start=' + this.props.startLocation +
            '&end=' + this.state.endLocation +
            '&interests=' + JSON.stringify((this.state.interests))
        );
    }

    setEndLocation = (newEndLocation) => {
        this.setState({
            flowPosition: 1,
            endLocation: newEndLocation
        });
    }

    setInterests = (interests) => {
        this.setState({
            flowPosition: 2,
            interests: interests
        });
    }

    getTour = () => {
        this.setState({
            flowPosition: 3
        });
    }

    getLatLng = (searchTerm) => {
        geocodeByAddress(searchTerm)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
            })
            .catch(error => console.error('Error', error));
    } 

    render() {
        let CurrentQuestion = null;
        if (this.state.flowPosition === 0) {
            CurrentQuestion = <SetEndLocation doSelect={this.setEndLocation}/>;
        } else if (this.state.flowPosition === 1) {
            CurrentQuestion = <InterestsList doFinish={this.setInterests}/>
        } else if (this.state.flowPosition == 2) {
            CurrentQuestion = <MarkerSelect doFinish={this.getTour}/>
        } else if (this.state.flowPosition == 3) {
            CurrentQuestion = <Container align="center"><Typography variant="h5">Have fun!</Typography></Container>;
        }

        return (
            <PageWrapper>
                {CurrentQuestion}
                <br/>
                {console.log(this.getLatLng(this.props.match.params.location))}
                <LocationMap 
                    isMarkerShown
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </PageWrapper>
        );
    }
}

export default withRouter(Tour);
