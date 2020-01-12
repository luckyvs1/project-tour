export default class LocationsHelper {

    print(array){
        return new Promise((resolve, reject) => {
            resolve(console.log(array))
        })
    }

    // find midpoints between 2 points
    getMidPoint(lat1, lng1, lat2, lng2) {
        return new Promise((resolve, reject) => {
            
            // To convert degrees to radians.
            const DEG_TO_RAD = Math.PI / 180;  
            
            const dLon = (lng2 - lng1) * DEG_TO_RAD;  
        
            // Convert latitude and longitudes to radians:
            const latitude1 = lat1 * DEG_TO_RAD;
            const latitude2 = lat2 * DEG_TO_RAD;
            const longitude1 = lng1 * DEG_TO_RAD;
        
            const Bx = Math.cos(latitude2) * Math.cos(dLon);
            const By = Math.cos(latitude2) * Math.sin(dLon);
            const lat3 = Math.atan2(Math.sin(latitude1) + Math.sin(latitude2), Math.sqrt((Math.cos(latitude1) + Bx) * (Math.cos(latitude1) + Bx) + By * By));
            const lon3 = longitude1 + Math.atan2(By, Math.cos(latitude1) + Bx);

            resolve({ lat: lat3 / DEG_TO_RAD, lng: lon3 / DEG_TO_RAD });
        })
      }
    
    // calculate distance between 2 points
    getDistance(lat1, lng1, lat2, lng2) {
        return new Promise((resolve, reject) => {
            const R = 6371000; // Earth’s mean radius in meter
            // To convert degrees to radians.
            const DEG_TO_RAD = Math.PI / 180; 

            const dLat = (lat2 - lat1) * DEG_TO_RAD;
            const dLong = (lng2 - lng1) * DEG_TO_RAD;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((lat1) * DEG_TO_RAD) * Math.cos((lat2) * DEG_TO_RAD) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c;
            resolve(d); // returns the distance in meter
        })
    };

    arrayToKeywords(interests){
        let keyword = '';
        const lastIndex = interests.length - 1;

        if (lastIndex == 0){
            return interests[0];
        }

        for (let i in interests){
            if(i == 0){
                keyword += `(${interests[i]})`
            } else {
                keyword += ` OR (${interests[i]})`
            }
        }
        return keyword;
    }

    // getNamesFromApiResponse(){

    // }

    getPayloadFromApiResponse(locations, limit=0){

        let array = [];
        let length = locations.length - 1;
        let location;
        let row;
        
        for (let i in locations){
            row = {};

            location = locations[i];

            if (limit > 0){
                if (i < limit){
                    if ((i > 0 && location != locations[i - 1]) || (i == 0) ){
                        // row.name = location.name;
                        row.lat = location.geometry.location.lat;
                        row.lng = location.geometry.location.lng;
                        array.push(row)
                    } else  {
                        (limit < length) ? limit++ : limit;
                    }     
                } else {
                    return array;
                }
            } else {
                // row.name = location.name;
                row.lat = location.geometry.location.lat;
                row.lng = location.geometry.location.lng;
                array.push(row)
            }
        }

        return array;
    }

}