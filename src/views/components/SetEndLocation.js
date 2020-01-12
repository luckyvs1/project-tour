import React from 'react';
import { render } from 'react-dom';
import LocationSearchInput from './LocationSearchInput';

class SetEndLocation extends React.Component {
    render() {
        return (
            <LocationSearchInput
                            question="Where should your tour end?" 
                            label="Search"
                            doSelect={this.props.doSelect}
            />
        );
    }
}

export default SetEndLocation;