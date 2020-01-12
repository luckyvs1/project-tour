import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SearchBar from './SearchBar';
import LocationCardList from './LocationCardList';

const LocationSearchMenu = () => (
    <div style={{padding: '20px 20px 20px 20px'}}>
        <Card>
            <CardContent>
                <SearchBar label="Or pick your own location!" question="Where should your tour start?"/>
                <LocationCardList/>
            </CardContent>
        </Card>
    </div>
)

export default LocationSearchMenu;