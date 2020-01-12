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
)((props) =>{
  let defaultCenter = { lat: -34.397, lng: 150.644 }
  if(props.startMarker) defaultCenter=props.startMarker;
  console.log(props);
  return(
  <GoogleMap
    defaultZoom={8}
    defaultCenter={defaultCenter}
    onClick={props.onMapClick}
  >
      {props.polyLines ? props.polyLines.map((line, index) => (
          <Polyline key={index} path={line}/>
      )) : null}
    {props.isMarkerShown && <Marker position={defaultCenter} label="Start"/>}
    {props.endMarkerCoords ? <Marker label="End" key={props.endMarkerCoords.lat + props.endMarkerCoords.lnd} position={props.endMarkerCoords}/> : null}
    {props.markers.map((marker) => {
        return <Marker label={marker.label || ''} key={marker} position={marker} onClick={() => props.onMarkerClick(marker)}></Marker>
    })}
    <Polyline options={{
       strokeColor: '#0088FF',
       strokeWeight: 6,
       strokeOpacity: 0.6
   }} path={[{ lat: -34.397, lng: 150.644 }, { lat: -35.397, lng: 151.644 }]} />
  </GoogleMap>
  )}
)

export default LocationMap