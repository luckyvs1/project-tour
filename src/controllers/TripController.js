const { decode } = require('@pirxpilot/google-polyline')
var polyline = require('@mapbox/polyline');


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

        console.log(directions.routes[0])
        // console.log(directions)
        const durationArray = []
        const legsArray = directions.routes[0].legs;
        // console.log(legsArray)

        const waypoint_order = directions.routes[0].waypoint_order
        let custom_order = []
        //custom_order.push({"lat": origin.split[","][0], "lng": origin.split[","][1]})
        custom_order.push(origin)
        for (let point of waypoint_order) {

            console.log("point" + point)
            //custom_order.push(waypoints[{"lat": point[0], "lat": destination[1]}]);
            custom_order.push(waypoints[point])
        }
        //custom_order.push({lat: destination.split[","][0], lng:destination.split[","][1]})
        custom_order.push(destination)
        console.log(custom_order)

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
        //const latLonArray = decode(encodedPolyline)
        const latLonArray = polyline.decode(encodedPolyline);

        let latLonObj = []
        for (let latlon of latLonArray) {
            latLonObj.push({
                lat: latlon[0],
                ln: latlon[1]
            })
        }
        console.log(latLonObj)

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