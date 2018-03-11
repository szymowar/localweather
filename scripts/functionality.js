function moveDataToDOM(data){
    var tempUnit = "°C";
    var temp = Math.round(data.main.temp);
    $('#icon').attr("src",data.weather[0].icon);
    $('#temp').text(temp + tempUnit)
    $('#temp-tog').click(function() {
                $('#temp').changeTemp();});
    $('#place').text(data.name + ", " + data.sys.country);
    $('#wind').text(data.wind.speed);
}

function cloudiness(data){
    var description = "";
        switch(true){
    case (data >= 90):
        description = "sky is fully covered";
        break;
    case (data >= 75):
        description = "sky is almost covered";
        break;
    case (data >= 50):
        description = "sky is partially covered";
        break;
    case (data >= 25):
        description = "sky is slightly covered";
        break;
    case (data >= 10):
        description = "sky is almost clear";
        break;
    case (data < 10):
        description = "sky is clear";
        break;
    default:
        description = "no data available";
    }
    $('#cloud').text(description);
}

function getWeather(coord) {
    var local = "api/current?lat="+ coord.lat +"&lon=" + coord.long;
    $.ajax({url:"https://fcc-weather-api.glitch.me/" + local,
                success: function(data) {
                    moveDataToDOM(data, changeTemp);
                    cloudiness(data.clouds.all);
            }
        });
}

function localCoordinates(position) {
    var output = document.getElementById("place");
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var coord = {};
    coord["lat"] = latitude;
    coord["long"] = longitude;
    getWeather(coord);
}

function changeTemp(tempUnit, temp) {
    if(tempUnit == "°C") {
        temp = (temp * 9)/5 + 32;
        tempUnit = "°F"
        return temp + tempUnit;
    } else {
        temp = ((temp - 32) * 5)/9;
        tempUnit = "°C";
        return temp + tempUnit
    }
}

$(document).ready(function updateLocation() {
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(localCoordinates);
    }else {
        console.log("error");
    }
})
