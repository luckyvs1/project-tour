import React, {Component} from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import LocationCard from './components/LocationCard';
import LocationCardList from './components/LocationCardList';


class App extends Component {
    constructor(props){
        super(props);
    }    

    render() {
        return (
            // Will need later
            // <Switch>
            //     <Route exact path="/" render={() => <Home />}/>
            //     <Route path="/login" render={() => <Login />}/>
            // </Switch>
            <React.Fragment>
                <LocationCardList/>
            </React.Fragment>
        );
    }
}

export default withRouter(App);

