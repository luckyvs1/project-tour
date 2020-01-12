import React from 'react';
import { Typography, Button, Container } from '@material-ui/core';

class MarkerSelect extends React.Component {
    render() {
        return (
            <Container align= "center">
                <Typography variant="h5">Select all of the places you'd like to visit</Typography>
                <br/>
                <Button onClick={this.props.doFinish} variant="contained" color="primary" style={{alignContent: "center"}}>
                    Build My Tour
                </Button>
            </Container>
        )
    }
}

export default MarkerSelect;