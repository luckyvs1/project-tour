import React from 'react';
import { Typography, Button } from '@material-ui/core';

class MarkerSelect extends React.Component {
    render() {
        return (
            <div style={{padding: "20px 20px 20px 20px"}}>
                <Typography variant="h5">Select all of the places youd like to visit</Typography>
                <Button onClick={() => this.props.doFinish()} variant="contained" color="primary" style={{alignContent: "center"}}>
                    Done
                </Button>
            </div>
        )
    }
}

export default MarkerSelect;