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
        polyLines: [],
        interestsLoading: false,
        endMarkerCoords: {
            lat: null,
            lng: null
        }
    }

    getTheTour = () => {
        console.log(this.state.selectedMarkers);
        console.log(JSON.stringify(this.state.selectedMarkers.toString));
        this.setState({
            flowPosition: 3,
            interestsLoading: true
        });
        console.log('/locations?origin=' + this.state.startMarker.lat + ',' + this.state.startMarker.lat); 
        console.log('&destination=' + this.state.endMarkerCoords.lat + ',' + this.state.endMarkerCoords.lng);
        console.log('&waypoints=' + JSON.stringify(this.state.selectedMarkers.toString));
        
        axios.get(
            '/trip?origin=' + this.state.startMarker.lat + ',' + this.state.startMarker.lat + 
            '&destination=' + this.state.endMarkerCoords.lat + ',' + this.state.endMarkerCoords.lng + 
            '&waypoints=' + JSON.stringify(this.state.selectedMarkers)
        ).then(response => {
            console.log('Good response', response);
            this.setState({polyLines: response.data.output, interestsLoading: false});
        }).catch(error => console.log(error));
    }

    setEndLocation = (newEndLocation) => {
        geocodeByAddress(newEndLocation)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('GOT MARKER!');
                this.setState({endMarkerCoords: latLng})

                this.setState({
                    flowPosition: 1,
                    endLocation: newEndLocation
                });
            })
            .catch(error => console.error('GETLATLANG ERROR', error));
    }

    setInterests = (interests) => {
        this.setState({
            flowPosition: 2,
            interestsLoading: true
        });
        console.log(this.state.interestsLoading);
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
            this.setState({markers: response.data, interestsLoading: false});
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
            CurrentQuestion = <MarkerSelect interestsLoading={this.state.interestsLoading} doFinish={this.getTheTour}/>
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
                    endMarkerCoords={this.state.endMarkerCoords}
                    interestsLoading={this.state.interestsLoading}
                    isMarkerShown
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    startMarker={this.state.startMarker}
                    markers={this.state.markers}
                    selectedMarkers={this.state.selectedMarkers}
                    onMarkerClick={this.onMarkerClick}
                    polyLines={this.state.polyLines}
                /> : null
                }
            </PageWrapper>
        );
    }
}

export default withRouter(Tour);
