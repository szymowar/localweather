function localCoordinates(position) {
    var output = document.getElementById("place");
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var timestamp = position.timestamp;
    output.innerHTML = latitude+ " " + longitude;
    var coord = {};
    coord["lat"] = latitude;
    coord["long"] = longitude;
    coord["timestamp"] = timestamp;
    getWeather(coord);
}
function getLocation() {
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
            localCoordinates);
    }else {
        console.log("error");
    }
}
function getWeather(coord) {
    var local = "api/current?lat="+ coord.lat +"&lon=" + coord.long;
    var weatherAPIurl = "https://fcc-weather-api.glitch.me/";
    $.ajax({url:weatherAPIurl + local,
                success: function(data) {
                    console.log(data);
            }
        });
}
getLocation()
