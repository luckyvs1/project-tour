import React from 'react';
import SearchBar from './SearchBar';
import { Typography, Card, CardContent, CardMedia, Grid, Button} from '@material-ui/core';

class InterestsList extends React.Component {
    state = {
        interestEntry: "",
        interests: []
    }

    handleSelect = (term) => {
        console.log(term);
        const newInterests = [...this.state.interests];
        newInterests.push(term)
        this.setState({
            interestEntry: "",
            interests: newInterests
        })
    }

    render() {
        return (
            <div style={{justifyContent: 'center'}}>
                <SearchBar onSubmit={this.handleSelect} onChange={(e) => this.setState({ interestEntry: e.target.value })} label="Add interests" question="What are your interests?"></SearchBar>
                <Grid direction="row" justify="center" container>
                    {this.state.interests.map(interest => (
                        <Card 
                            key={interest} 
                            style={{display: "inline-block", height: "50px"}} 
                        >
                            <CardContent>
                                <Typography>
                                    {interest}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                <div style={{justifyContent: 'center'}}>
                    <Button onClick={() => this.props.doFinish(this.state.interests)} variant="contained" color="primary" style={{justifyContent: 'center'}}>
                    Done
                    </Button>
                </div>
            </div>
        );
    }
}

export default InterestsList;