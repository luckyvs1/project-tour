export default class TripController {
    async trip(req, res) {
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
        // const origin = "49.262701,-123.245545"
        // const destination =  "49.278338,-122.920043"
        // const waypoints = [[49.253092, -123.009906],[49.264861, -123.070159]])

        const origin = req.query.origin
        const destination = req.query.destination
        const waypoints = JSON.parse(req.query.waypoints)
        const googleMaps = req.app.get('googleMaps')

        const directions = await googleMaps.directions(
            {
                // origin: "49.262701,-123.245545",
                // destination: "49.278338,-122.920043",
                // waypoints: [[49.253092, -123.009906],[49.264861, -123.070159]],
                // optimize: true
                origin: origin,
                destination: destination,
                waypoints: waypoints,
                optimize: true
            })
        .asPromise()
            .then((response) => {
            return response.json
        })
            .catch((err) => {
            console.log(err);
        });

        const durationArray = []
        const legsArray = directions.routes[0].legs;

        legsArray.forEach(function(legs,i){

          // duration.value is in raw seconds
          var durationValue = legs.duration.value;
          var startAddress = legs.start_address;
          var endAddress = legs.end_address;

          durationArray.push({
              startAddress: startAddress,
              endAddress:  endAddress,
              durationValue: durationValue
          });
        });

        const encodedPolyline = directions.routes[0].overview_polyline.points

        let totalDurationInSecs = 0

        durationArray.forEach(function(durationValue, i){
            totalDurationInSecs += durationValue.durationValue
        });

        const response = {
              encodedPolyline: encodedPolyline,
              durationArray: durationArray,
              totalDurationInSecs: totalDurationInSecs
        }

        res.send(response)
    }
}