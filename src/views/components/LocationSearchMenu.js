import React from 'react';
import SearchBar from './SearchBar';
import LocationCardList from './LocationCardList';
import LocationSearchInput from './LocationSearchInput';
import PageWrapper from './PageWrapper';
import { withRouter } from "react-router-dom";

class LocationSearchMenu extends React.Component {
    state = {
        locationString: ''
    };
    
    onLsiSelectStart = (location) => {
        this.setState({
            locationString: location
        });

        this.props.history.push('/tour/' + location);
    };

    render() {
        return (
            <PageWrapper>
                <LocationSearchInput
                    question="Where should your tour start?" 
                    label="Search"
                    onChange={this.onLsiSelectStart}
                />
                <br/>
                <LocationCardList/>
            </PageWrapper>
        );
    }
}

export default withRouter(LocationSearchMenu);