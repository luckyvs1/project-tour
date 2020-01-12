import React, {Component} from 'react';
// import Home from './components/Home';
// import Login from './components/Auth/Login';
import { Switch, Route, withRouter } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'

import ButtonAppBar from './components/ButtonAppBar';
import SearchBar from './components/SearchBar';

class App extends Component {
    constructor(props){
        super(props);
    }    

    render() {
        return (
            <Box>
                <ButtonAppBar menuTitle="Adventure Advisor" menuSubTitle="The Travel Plan Engine"/>
                <br />
                <Box paddingX={10}>
                    <Card>
                        <CardContent>
                            <div>
                                <SearchBar label="Search" question="Where should your tour start?"/>
                            </div>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            // <Switch>
            //     <Route exact path="/" render={() => <Home />}/>
            //     <Route path="/login" render={() => <Login />}/>
            // </Switch>
        );
    }
}

export default withRouter(App);

