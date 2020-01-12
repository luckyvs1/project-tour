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
        // const origin = req.body.origin
        // const destination =  req.body.destination
        // const waypoints = req.body.waypoints
        console.log(req.body)
        const origin = "49.262701,-123.245545"
        const destination =  "49.278338,-122.920043"
        const waypoints = [[49.253092, -123.009906],[49.264861, -123.070159]]
        const googleMaps = req.app.get('googleMaps')

        const directions = await googleMaps.directions(
            {
                // Case 1:
                // origin: "49.262701,-123.245545",
                // destination: "49.278338,-122.920043",
                // waypoints: [[49.253092, -123.009906],[49.264861, -123.070159]],
                // optimize: true
                // Encoded polyline:
                // qptkH~ofoVlB}AcAeEUaAsBqHAa@H_@|CeClCwBvFwEfMuK|DiDpCeCb@OZHXOJo@Ic@e@g@_D_MoCeKiAyFyAkLWgDSiEEiBCgJBqNHeWRmt@p@a|Ad@ygAd@mqAJgRDuHJaCAM@iBBmEVmk@FyO\\sx@Jm[GwBa@iA}A}Dg@}BEm@gAAqDEcHIkBEsD?iHGmEAiBA[YgBA_AE@mCHiCBaJ@_CA}DT{i@ByHFyA@oCF}XEwCa@qCuC}H_D_I}B{FSM}@_CwBuFQ}BLuMB{FHk@@{A?_BLcODsATgBh@gBfB{DZoAbAuBfBqDd@sAZ{ARyBHa^?}DJgCdGyi@\\sDDqFHiPsBCw@CIYIg@?c@l@iCpAoFrBiIbAeFt@iDKKE[?mB?w@}AAk@??Q?gF?gG@{E?eDxDDtHHr@@V?Ao@AyIIkCB}QH{HFoI^wDJmBA{CAwIGi@?uB?iDAwMBgK?qCLu@@gB?g@@w@HmL@ad@BuP?eJMiCq@mEk@gBmJ}PyAiDeA}CaAwE_@uC_@iFM_Ma@{UB_BK_INYNKjBC~EBlGEfAItEA`BE~@i@`BuBfAcB|BmCz@a@n@MlBEhA?pCAl@KjH_FhAUbC?~C@A}@@|@_DA_B?EkOBcWmCAsAIo@c@M_@Iw@CcBEs@]mA{BqEu@kBU_A]qCQkEEa@MeAKiFKmGA{@CuQA_^DqIJaG^yEr@{EtA_G`AqCxA_DfAiBzAmBpAqAnIeHb]yYfMsKfFmExAyA|AkBtBgDhAyB|@}BbA_DhAcFlAmIdB_PtAwJvBiL|Hk`@~CoPl@kE`AaMp@}Ph@aRt@{XRoLKwKKsCg@kHi@_Fo@kE{@gEeAiE{BaHkCcGcBmD?UC[c@iAyBgFWy@_@aBKu@I}A?kBB}CA{@SqAg@gAy@q@g@Ka@A[FmD|AeF~By@Ti@DyAI_Bm@oAgA{CqDmB_BeAo@U?mBg@eAOwLY{BCeCCiAEW_@iDI}L_@wGY}BYq@S{BsAwA}AkAqBaAeC}AyDuEyLmGoPaDeJmDwIwAwCaBwAi@Y{AUmABq@LkAl@_Az@y@rAw@vBa@hCM~B@hBVnCj@zBr@rB|FfT|@nEVbCH|DGpCMxA]`Ci@|BgIfU}Mp_@aArBcB~BoGjGiBpAi@l@cA`AwA|AsApCw@~BsExL{A`DKPk@r@q@R[?w@IQOe@u@Uw@GyBt@mTGoCgB_PQ_BYyAg@gA_@[m@W
                origin: origin,
                destination: destination,
                waypoints: waypoints,
                optimize: true
            })
        .asPromise()
            .then((response) => {
            //console.log(json.routes.overview_polyline.points.replace("\\","\"))
            // console.log(response.json.routes);
            //console.log(response.json.routes[0].legs);
            return response.json
        })
            .catch((err) => {
            console.log(err);
        });

        const durationArray = []
        console.log("Directions is: ")
        console.log(directions)
        const legsArray = directions.routes[0].legs;
        console.log("Legs array is: ")
        console.log(legsArray)

        legsArray.forEach(function(legs,i){

          console.log("Leg is the following:")
          console.log(legs)
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

        console.log(directions.routes[0].overview_polyline.points)
        const encodedPolyline = directions.routes[0].overview_polyline.points

        let totalDurationInSecs = 0

        durationArray.forEach(function(durationValue, i){
            console.log("Duration value is: ")
            console.log(durationValue.durationValue)
            totalDurationInSecs += durationValue.durationValue
        });

        const response = {
              encodedPolyline: encodedPolyline,
              durationArray: durationArray,
              totalDurationInSecs: totalDurationInSecs
        }

        res.send(response)

        console.log(response)
        console.log(response.encodedPolyline)
        console.log(response.durationArray)

    }
}