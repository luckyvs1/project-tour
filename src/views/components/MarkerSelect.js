import React from 'react';
import { Typography, Button, Container, CircularProgress } from '@material-ui/core';

class MarkerSelect extends React.Component {
    render() {
        if(!this.props.interestsLoading) {
            return (
                <Container align= "center">
                    <Typography variant="h5">Select the places you would like to visit</Typography>
                    <br/>
                    <Button onClick={this.props.doFinish} variant="contained" color="primary" style={{alignContent: "center"}}>
                        Build My Tour
                    </Button>
                </Container>
            );
        } else{
            return (
                <Container align="center">
                    <CircularProgress />
                </Container>
            );
        }
    }
}

export default MarkerSelect;