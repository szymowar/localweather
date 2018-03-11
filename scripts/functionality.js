function moveDataToDOM(data){
    $('#icon').attr("src",data.weather[0].icon);
    $('#temp').text(Math.round(data.main.temp) + "°C");
    $('#place').text(data.name + ", " + data.sys.country);
    $('#wind').text(data.wind.speed, "knots");
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

function changeTemp(temp) {
    var reg = /°C|°F/g;
    var reg2 = /-?[0-9]/g;
    var tempUnit = temp.replace(reg2, '');
    var temp = temp.replace(reg, '');
    if(tempUnit == "°C") {
        temp = Math.round((temp * 1.8) + 32);
        tempUnit = "°F"
        return temp + tempUnit;
    } else if (tempUnit == "°F"){
        temp = Math.round(((temp - 32) / 1.8));
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
    $('#temp-tog').click(function() {
                var temp = $('#temp').html();
                changeTemp(temp);
                $('#temp').html(changeTemp(temp));
            });
})
