import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

const LocationMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1S-yb3o62Z09WA4Xl_AxqvswRdW7Zv6A&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
    <Polyline options={{
       strokeColor: '#0088FF',
       strokeWeight: 6,
       strokeOpacity: 0.6
   }} path={[{ lat: -34.397, lng: 150.644 }, { lat: -35.397, lng: 151.644 }]} />
  </GoogleMap>
)

export default LocationMap