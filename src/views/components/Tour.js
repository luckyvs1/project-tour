import React from 'react';
import { withRouter } from "react-router-dom";
import InterestsList from './InterestsList';
import LocationMap from './LocationMap';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import PageWrapper from './PageWrapper';

class Tour extends React.Component {
    getLatLng = (searchTerm) => {
        geocodeByAddress(searchTerm)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
            })
            .catch(error => console.error('Error', error));
    } 

    render() {
        return (
            <PageWrapper>
                <InterestsList/>
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
