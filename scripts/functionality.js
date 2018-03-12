function moveData(data){
    $('#icon').attr("src",data.weather[0].icon);
    $('#temp').text(Math.round(data.main.temp));
    $('#temp-tog').text("°C");
    $('#place').text(data.name + ", " + data.sys.country);
}

function cloudiness(data){
    var description = "";
    if (data >= 90){
        description = "sky is fully covered";
    } else if(data >= 75 && data < 90){
        description = "sky is almost covered";
    } else if(data >=50 && data < 75){
        description = "sky is partially covered";
    } else if(data >= 25 && data < 50){
        description = "sky is slightly covered";
    } else if(data >= 10 && data < 25){
        description = "sky is almost clear";
    } else if(data < 10){
        description = "sky is clear";
    } else {
        description = "n/a";
    }
    $('#cloud').text(description);
}

function windDirection(data, windspeed){
    var windDir = "";
    if(data >= 337.5 && data < 360 || data >= 0 && data < 22.5){
        windDir = "N";
    }else if(data >= 22.5 && data < 67.5){
        windDir = "NE";
    }else if(data >= 67.5 && data < 112.5){
        windDir = "E";
    }else if(data >= 112.5 && data < 157){
        windDir = "SE";
    }else if(data >= 157 && data < 202.5){
        windDir = "S";
    }else if(data >= 202.5 && data < 247.5){
        windDir = "SW";
    }else if(data >= 247.5 && data < 292.5){
        windDir = "W";
    }else if(data >= 292.5 && data < 337.5){
        windDir = "NW";
    }else{
        windDir = "n/a"
    }
    $('#wind').text(windDir +" "+ windspeed + " " + "knots");
}

function getWeather(coord) {
    var local = "api/current?lat="+ coord.lat +"&lon=" + coord.long;
    $.ajax({url:"https://fcc-weather-api.glitch.me/" + local,
                success: function(data) {
                    moveData(data);
                    cloudiness(data.clouds.all);
                    windDirection(data.wind.deg,data.wind.speed);
                }, error:function(){
                    alert("there was an API problem");
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

function changeTemp(temp, tempUnit) {
    if(tempUnit == "°C") {
        temp = Math.round((temp * 1.8) + 32);
        tempUnit = "°F"
    } else if (tempUnit == "°F"){
        temp = Math.round(((temp - 32) / 1.8));
        tempUnit = "°C";
    }
    return temp;
}

function changeTempUnit(tempUnit){
    if(tempUnit == "°C"){
        return "°F";
    }
    return "°C";
}

$(document).ready(function updateLocation() {
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(localCoordinates);
    }else {
        alert("Geolocation is not available");
    }
    $('#temp-tog').click(function() {
                var temp = $('#temp').html();
                var tempUnit = $('#temp-tog').html();
                $('#temp-tog').html(changeTempUnit(tempUnit));
                $('#temp').html(changeTemp(temp, tempUnit));
                });
            })
