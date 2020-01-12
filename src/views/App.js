import React, {Component} from 'react';
// import Home from './components/Home';
// import Login from './components/Auth/Login';
import { Switch, Route, withRouter } from "react-router-dom";
import { withScriptjs } from 'react-google-maps';

import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import LocationCardList from './components/LocationCardList';
import LocationSearchInput from './components/LocationSearchInput';
import SearchBar from './components/SearchBar';
import { Container } from '@material-ui/core';
import ButtonAppBar from './components/ButtonAppBar';
import Tour from './components/Tour';
import LocationSearchMenu from './components/LocationSearchMenu';
import BottomNavigationFooter from './components/BottomNavigationFooter';

class App extends Component {
    

    render() {
        return (
            <div>
                <ButtonAppBar menuTitle="Adventure Advisor" menuSubTitle="The Travel Plan Engine"/>
                <Switch>
                    <Route path="/tour/:location" render={() => <Tour/>}/>
                    <Route render={() => <LocationSearchMenu/>}/>
                </Switch>
                <Route path="/" render={() => <BottomNavigationFooter/>}/>
            </div>
        );
    }
}

export default withRouter(App);

