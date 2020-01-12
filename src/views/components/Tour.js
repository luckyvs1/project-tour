import React from 'react';
import { withRouter } from "react-router-dom";
import InterestsList from './InterestsList';
import LocationMap from './LocationMap';
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

    render() {
        let CurrentQuestion = null;
        if (this.state.flowPosition === 0) {
            CurrentQuestion = <SetEndLocation doSelect={this.setEndLocation}/>;
        } else if (this.state.flowPosition === 1) {
            CurrentQuestion = <InterestsList doFinish={this.setInterests}/>
        } else if (this.state.flowPosition == 2) {
            CurrentQuestion = <MarkerSelect doFinish={this.getTour}/>
        } else if (this.state.flowPosition == 3) {
            CurrentQuestion = <div style={{alignContent: "center"}}><h1>Have fun!</h1></div>;
        }

        return (
            <div>
                {CurrentQuestion}
                {console.log(this.props.match.params.location)}
                <LocationMap />
            </div>
        );
    }
}

export default withRouter(Tour);