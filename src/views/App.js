import React, {Component} from 'react';
// import Home from './components/Home';
// import Login from './components/Auth/Login';
import { Switch, Route, withRouter } from "react-router-dom";
import { withScriptjs } from 'react-google-maps';

import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';

import LocationCardList from './components/LocationCardList';
import LocationSearchInput from './components/LocationSearchInput';
import ButtonAppBar from './components/ButtonAppBar';
import SearchBar from './components/SearchBar';
import { Container } from '@material-ui/core';
import ButtonAppBar from './components/ButtonAppBar';
import LocationSearchMenu from './components/LocationSearchMenu';
import BottomNavigationFooter from './components/BottomNavigationFooter';

class App extends Component {
    state = {
        start: {
            lat: null,
            lng: null
        },
        end: {
            lat: null,
            lng: null,
        }
    };

    onLsiSelectStart = (location) => {
        this.setState({
            start: {
                lat: location.lat,
                lng: location.lng
            }
        });
    }

    onLsiSelectEnd = (location) => {
        this.setState({
            end: {
                lat: location.lat,
                lng: location.lng
            }
        });
    }

    renderLatLngStart = () => {
        if(this.state.start.lat || this.state.start.lng) {
            return (
                <Box align="center">
                    <Typography variant="body2">
                        Latitude: {this.state.start.lat} Longitude: {this.state.start.lng}
                    </Typography>
                </Box>
            );
        } else {
            return;
        }
    }

    renderLatLngEnd = () => {
        if(this.state.end.lat || this.state.end.lng) {
            return (
                <Box align="center">
                    <Typography variant="body2">
                        Latitude: {this.state.end.lat} Longitude: {this.state.end.lng}
                    </Typography>
                </Box>
            );
        } else {
            return;
        }
    }

    render() {
        return (
            <br />
                <Box paddingX={10}>
                    <Card>
                        <CardContent>
                            <LocationSearchInput
                                question="Where should your tour start?" 
                                label="Search"
                                onChange={this.onLsiSelectStart}
                            />
                            {this.renderLatLngStart()}
                            <br/>
                            <LocationSearchInput
                                question="Where should your tour end?" 
                                label="Search"
                                onChange={this.onLsiSelectEnd}
                            />
                            {this.renderLatLngEnd()}
                            <LocationCardList />
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <div>
                <ButtonAppBar menuTitle="Adventure Advisor" menuSubTitle="The Travel Plan Engine"/>
                <Switch>
                    <Route path="/tour" exact render={() => <div/>}/>
                    <Route render={() => <LocationSearchMenu/>}/>
                </Switch>
                <Route path="/" render={() => <BottomNavigationFooter/>}/>
            </div>
        );
    }
}

export default withRouter(App);

