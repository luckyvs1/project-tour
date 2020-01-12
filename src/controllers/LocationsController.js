
import LocationsHelper from '../helpers/LocationsHelper'

export default class LocationsController {

    async getLocations(req, res) {
        const helper = new LocationsHelper();

        //const startLocation = '8888 University Dr, Burnaby, BC';
        //const endLocation = '4700 Kingsway, Burnaby, BC';
        //const interests = ['bar', 'wine', 'gaming'];

        const startLocation = req.query.start
        const endLocation = req.query.end
        const interests = req.query.interests.split(',')

        // google maps API
        const googleMaps = req.app.get('googleMaps')
        const resultLimit = 5;
        const distanceScale = 1.25;
        let locations = [];

        const startCoordinates = await googleMaps.geocode({address: startLocation})
            .asPromise()
            .then((response) => {
                return response.json.results[0].geometry.location;
            })
            .catch((err) => {
                console.error(err);
            });
        
        // convert address into longitudes and latitudes
        const endCoordinates = await googleMaps.geocode({address: endLocation})
            .asPromise()
            .then((response) => {
                return response.json.results[0].geometry.location;
            })
            .catch((err) => {
                console.error(err);
            });
            
        // calculate mid point between 2 points
        const midPoint = await helper.getMidPoint(startCoordinates.lat, startCoordinates.lng, endCoordinates.lat, endCoordinates.lng)
        // calculate distance between 2 points
        const diameter = await helper.getDistance(startCoordinates.lat, startCoordinates.lng, endCoordinates.lat, endCoordinates.lng)
        
        
        for (let interest of interests){

            await googleMaps.placesNearby(
                { 
                    location: `${midPoint.lat}, ${midPoint.lng}`,
                    radius: (diameter / 2) * distanceScale,
                    keyword: interest
                })
                .asPromise()
                .then((response) => {
                    locations = locations.concat(helper.getPayloadFromApiResponse(response.json.results, resultLimit))
                    return locations
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        res.send(locations);            
    }
}

