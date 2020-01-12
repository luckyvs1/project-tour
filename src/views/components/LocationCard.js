import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';
import Image from 'material-ui-image'
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
                this.setState({image: response.data.results[0].urls.regular});
            });
    }

    render() {
        return (
            <Card variant="outlined" style={{width: '250px', height: '150px'}}>
                <CardMedia
                    children={<Image src={this.state.image} aspectRatio={3/2}></Image>}
                />
            </Card>
        );
    }
}

export default LocationListItem;