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
  let allPolyLines = [];
  if(props.polyLines && props.polyLines.length > 0) {
    if(props.startMarker.lat) {allPolyLines.push(<Polyline key={848438} path={[{lat: props.startMarker.lat, lng: props.startMarker.lng}, {lat: props.polyLines[0].lat, lng: props.polyLines[0].lng}]}/>)};
  for(let i = 0; i < props.polyLines.length - 1; i++) {
      allPolyLines.push(<Polyline key={i} path={[{lat: props.polyLines[i].lat, lng: props.polyLines[i].lng}, {lat: props.polyLines[i + 1].lat, lng: props.polyLines[i + 1].lng}]}/>);
  }
  if(props.endMarkerCoords) {allPolyLines.push(<Polyline key={486} path={[{lat: props.polyLines[props.polyLines.length - 1].lat, lng: props.polyLines[props.polyLines.length - 1].lng}, {lat: props.endMarkerCoords.lat, lng: props.endMarkerCoords.lng}]}/>)};
  
}
  return(
  <GoogleMap
    defaultZoom={8}
    defaultCenter={defaultCenter}
    onClick={props.onMapClick}
  >
    {props.isMarkerShown && <Marker position={defaultCenter} label="Start"/>}
    {props.endMarkerCoords ? <Marker label="End" key={props.endMarkerCoords.lat + props.endMarkerCoords.lng} position={props.endMarkerCoords}/> : null}
    {props.markers.map((marker) => {
        return <Marker label={marker.label || ''} key={marker} position={marker} onClick={() => props.onMarkerClick(marker)}></Marker>
    })}
    {allPolyLines}
    <Polyline options={{
       strokeColor: '#0088FF',
       strokeWeight: 6,
       strokeOpacity: 0.6
   }} path={[{ lat: -34.397, lng: 150.644 }, { lat: -35.397, lng: 151.644 }]} />
  </GoogleMap>
  )}
)

export default LocationMap