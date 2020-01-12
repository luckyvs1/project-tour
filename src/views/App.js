import React, {Component} from 'react';
// import Home from './components/Home';
// import Login from './components/Auth/Login';
import { Switch, Route, withRouter } from "react-router-dom";
import { withScriptjs } from 'react-google-maps';
import ButtonAppBar from './components/ButtonAppBar';
import Tour from './components/Tour';
import LocationSearchMenu from './components/LocationSearchMenu';
import BottomNavigationFooter from './components/BottomNavigationFooter';

class App extends Component {
    constructor(props){
        super(props);
    }    

    render() {
        return (
            <div>
                <ButtonAppBar menuTitle="Adventure Advisor" menuSubTitle="The Travel Plan Engine"/>
                <Switch>
                    <Route path="/tour/" render={() => <Tour/>}/>
                    <Route render={() => <LocationSearchMenu/>}/>
                </Switch>
                <Route path="/" render={() => <BottomNavigationFooter/>}/>
            </div>
        );
    }
}

export default withRouter(App);

