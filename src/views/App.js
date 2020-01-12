import React, {Component} from 'react';
// import Home from './components/Home';
// import Login from './components/Auth/Login';
import { Switch, Route, withRouter } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';

import ButtonAppBar from './components/ButtonAppBar';
import SearchBar from './components/SearchBar';
import SearchIconPlusText from './components/SearchIconPlusText';



class App extends Component {
    constructor(props){
        super(props);
    }    

    render() {
        return (
            <div>
                <ButtonAppBar menuTitle="Adventure Advisor" menuSubTitle="The Travel Plan Engine"/>
                <br />
                <SearchBar label="Search" question="Where should your tour start?"/>
            </div>
            // <Switch>
            //     <Route exact path="/" render={() => <Home />}/>
            //     <Route path="/login" render={() => <Login />}/>
            // </Switch>
        );
    }
}

export default withRouter(App);

