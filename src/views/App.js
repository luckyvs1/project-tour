import React, {Component} from 'react';
import ButtonAppBar from './components/ButtonAppBar';
// import Home from './components/Home';
// import Login from './components/Auth/Login';
import { Switch, Route, withRouter } from "react-router-dom";


class App extends Component {
    constructor(props){
        super(props);
    }    

    render() {
        return (
            <ButtonAppBar menuTitle="Adventure Advisor" menuSubTitle="The Travel Plan Engine"/>
            // <Switch>
            //     <Route exact path="/" render={() => <Home />}/>
            //     <Route path="/login" render={() => <Login />}/>
            // </Switch>
        );
    }
}

export default withRouter(App);

