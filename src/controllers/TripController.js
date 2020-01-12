export default class TripController {
    trip(req, res) {
        /*
            Point 1: UBC
            [49.262701, -123.245545]

            Point 2: SFU
            [49.278338, -122.920043]

            Point 3: Broadway Station
            [49.264861, -123.070159]

            Point 4: BCIT
            [49.253092, -123.009906]

        */

        req.app.get('googleMaps').directions(
            {
                origin: "49.262701,-123.245545",
                destination: "49.278338,-122.920043",
                waypoints: [[49.253092, -123.009906],[49.264861, -123.070159]],
                optimize: true
            })
        .asPromise()
            .then((response) => {
            console.log(response)
            console.log(response.json.routes);
        })
            .catch((err) => {
            console.log(err);
        });

    }
}