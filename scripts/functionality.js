function getLocal() {
    var output = document.getElementById('place')

    if (!navigator.geolocation) {
        output.innerHTML ="Geolocation is not supported by your browser";
        return;
    }

    function localCoordinates(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coords = {};
        coords["lat"] = latitude;
        coords["long"] = longitude;
        output.innerHTML = coords.lat +" " + coords.long;
        return coords;
    }

    function error() {
        output.innerHTML = "Unable to find your location";
    }
    console.log(navigator.geolocation.getCurrentPosition(localCoordinates,error));

}
getLocal()
