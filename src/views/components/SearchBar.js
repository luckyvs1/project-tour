import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class SearchBar extends React.Component {
    state = { term: '' };

	onFormSubmit = (event) => {
        event.preventDefault();
        console.log('Term submitted: ' + this.state.term);
		this.props.onSubmit(this.state.term);
    };

	render() {
		return (
            <Container maxWidth="sm">
                <Typography variant="h5" align="center">
                    {this.props.question}
                </Typography>
                <form onSubmit={this.onFormSubmit} className="ui form">
                        <TextField 
                            id="outlined-full-width" 
                            label={this.props.label}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={this.state.term}
                            onChange={(e) => this.setState({ term: e.target.value })} 
                        />
                </form>
            </Container>
		);
	}
}

export default SearchBar; 
