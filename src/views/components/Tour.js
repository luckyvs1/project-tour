import React from 'react';
import { withRouter } from "react-router-dom";
import InterestsList from './InterestsList';

class Tour extends React.Component {
    render() {
        return (
            <div>
                <InterestsList/>
                {console.log(this.props.match.params.location)}
            </div>
        );
    }
}

export default withRouter(Tour);