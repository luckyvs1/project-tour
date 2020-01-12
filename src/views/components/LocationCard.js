import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';
import unsplash from '../../endpoints/unsplash';

class LocationListItem extends React.Component {
    state = {
        image: ''
    }
    componentDidMount() {
        if(this.state.image == '') {
            this.getImage();
        }
    }

    getImage = () => {
        unsplash.get('/search/photos', {params: { query : this.props.locationText}})
            .then(response => {
                console.log(response);
                console.log(response.data.results[0].urls.regular);
                this.setState({image: response.data.results[0].urls.regular});
            });
    }

    render() {
        const img = (
            <img
                src={this.state.image}
                >
            </img>
        );

        return (
            
            <Card variant="outlined" style={{width: '250px', height: '150px'}}>
                <CardMedia
                    children={img}
                    title="Paella dish"
                />
            </Card>
        );
    }
}

export default LocationListItem;