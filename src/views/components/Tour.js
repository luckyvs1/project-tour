import React from 'react';
import { withRouter } from "react-router-dom";
import InterestsList from './InterestsList';
import LocationMap from './LocationMap';

class Tour extends React.Component {
    render() {
        return (
            <div>
                <InterestsList/>
                {console.log(this.props.match.params.location)}
                <LocationMap 
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

export default withRouter(Tour);