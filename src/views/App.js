import React, {Component} from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
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

