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
        startMarker: null,
        selectedMarkers: [],
        polyLines: []
    }

    getTheTour = () => {
        console.log(this.state.selectedMarkers);
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

    getFirstMarker = (searchTerm) => {
        geocodeByAddress(searchTerm)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('GOT MARKER!');
                this.setState({startMarker: latLng})
            })
            .catch(error => console.error('GETLATLANG ERROR', error));
    }
    
    onMarkerClick = (clickedMarker) => {
        let markers = [...this.state.markers];
        markers = markers.map(marker => {
            if(marker.lat === clickedMarker.lat && marker.lng === clickedMarker.lng) {
                marker.label = "✔";
            }
            return marker;
        })
        this.setState({
            markers: markers,
            selectedMarkers: [...this.state.selectedMarkers, clickedMarker]
        })
        console.log('marker clicked');
        marker.label="Clicked";
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
        
        if(!this.state.startMarker) this.getFirstMarker(this.props.match.params.location);
        console.log(this.props);
        return (
            <PageWrapper>
                {CurrentQuestion}
                <br/>
                {this.state.startMarker != null ? <LocationMap 
                    isMarkerShown
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    startMarker={this.state.startMarker}
                    markers={this.state.markers}
                    selectedMarkers={this.state.selectedMarkers}
                    onMarkerClick={this.onMarkerClick}
                /> : null
                }
            </PageWrapper>
        );
    }
}

export default withRouter(Tour);
