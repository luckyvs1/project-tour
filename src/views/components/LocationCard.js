import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';
import Image from 'material-ui-image'
import unsplash from '../../endpoints/unsplash';
import {Redirect, withRouter} from 'react-router-dom';

class LocationCard extends React.Component {
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

    clickHandler = () => {
        console.log('Location clicked!');
        this.props.history.push('/tour/' + this.props.locationText);
    }

    render() {
        return (
            <Card onClick={this.clickHandler} variant="outlined" style={{width: '250px', height: '150px', cursor: 'pointer'}}>
                <CardMedia
                    children={<Image src={this.state.image} aspectRatio={3/2}></Image>}
                />
            </Card>
        );
    }
}

export default withRouter(LocationCard);