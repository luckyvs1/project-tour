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
import axios from 'axios';

class Tour extends React.Component {
    state = {
        flowPosition: 0,
        endLocation: "",
        markers: [],
        selectedMarkers: [],
        polyLines: []
    }

    getTheTour = () => {
        this.setState({
            flowPosition: 3
        });
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
        });
        this.getMarkers(interests);
    }

    getMarkers = (interests) => {
        console.log('/locations?start=' + this.props.match.params.location +
        '&end=' + this.state.endLocation +
        '&interests=' + interests.toString());
        axios.get('/locations?start=' + this.props.match.params.location +
        '&end=' + this.state.endLocation +
        '&interests=' + interests.toString()
        ).then(response => {
            console.log('good resp');
            console.log('response', response);
            this.setState({markers: response.data});
        }).catch(error => console.log(error));
    }

    getLatLng = (searchTerm) => {
        geocodeByAddress(searchTerm)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                // console.log('Success', latLng);
            })
            .catch(error => console.error('GETLATLANG ERROR', error));
    } 

    render() {
        let CurrentQuestion = null;
        if (this.state.flowPosition === 0) {
            CurrentQuestion = <SetEndLocation doSelect={this.setEndLocation}/>;
        } else if (this.state.flowPosition === 1) {
            CurrentQuestion = <InterestsList doFinish={this.setInterests}/>
        } else if (this.state.flowPosition == 2) {
            CurrentQuestion = <MarkerSelect doFinish={this.getTheTour}/>
        } else if (this.state.flowPosition == 3) {
            CurrentQuestion = <Container align="center"><Typography variant="h5">Have fun!</Typography></Container>;
        }

        return (
            <PageWrapper>
                {CurrentQuestion}
                <br/>
                {console.log(this.props.match.params.location)}
                <LocationMap 
                    isMarkerShown
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    markers={this.state.markers}
                    selectedMarkers={this.state.selectedMarkers}
                />
            </PageWrapper>
        );
    }
}

export default withRouter(Tour);
