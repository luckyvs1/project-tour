import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {Redirect, withRouter} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';


class BottomNavigationFooter extends React.Component {
  state={
    inTour: false
  }

  componentDidMount = () => {
    this.checkInTour();
  };
  
  componentDidUpdate = () => {
    this.checkInTour();
  }

  checkInTour = () => {
    if(this.state.inTour == false && this.props.location.pathname.startsWith('/tour/')){
      this.setState({inTour: true})
    }
  }
  
  backHandler = () => {
    this.props.history.push('/');
    this.setState({inTour: false})
  }

  render() {
    return (
      <BottomNavigation>
        {this.state.inTour ? <BottomNavigationAction onClick={this.backHandler} icon={<HomeIcon />}/> : null}
        {!this.state.inTour ? <p align="center">nwHacks2020 ©</p> : null}
      </BottomNavigation>
    );
  }
}

export default withRouter(BottomNavigationFooter);