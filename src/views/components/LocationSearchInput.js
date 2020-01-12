import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        address: '',
        style: {}
    };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.props.onChange(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          console.log('Success', latLng);
          this.setState({ style: {borderColor: 'green'} })
        })
      .catch(error => console.error('Error', error));
  };
 
  render() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h5" align="center">
                {this.props.question}
            </Typography>
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                onBlur={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <TextField 
                        id="outlined-full-width" 
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        label={this.props.label}
                        {...getInputProps({
                        })}
                        style={this.state.style}
                    />
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>
        </Container>
    );
  }
}

export default LocationSearchInput;