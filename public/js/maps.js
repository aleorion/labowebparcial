var mapOptions = null;
var map = null;

var infowindow;
(function () {
    google.maps.Map.prototype.markers = new Array();
    google.maps.Map.prototype.getMarkers = function () {
        return this.markers
    };

    google.maps.Map.prototype.clearMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = new Array();
    };

    google.maps.Marker.prototype._setMap = google.maps.Marker.prototype.setMap;
    google.maps.Marker.prototype.setMap = function (map) {
        if (map) {
            map.markers[map.markers.length] = this;
        }
        this._setMap(map);
    }
})();



function initMap() {

    lat = 19.0778495;
    lng = -98.16441040000001;

    mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);

    drawMarker();

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    tec = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 7,
        center: tec
    }
    directionsDisplay.setMap(map);
    calcRoute();
}

function calcRoute() {
    var start;
    var end = tec;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var request = {
                origin: start,
                destination: end,
                travelMode: 'DRIVING'
            };
            directionsService.route(request, function (result, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(result);
                }
            });
        }, function() {
            swal({
                icon: "error",
                text: "Error finding the current location"
            });
        });
    }
    else {
        swal({
            icon: "error",
            text: "Geolocation not founded"
        });
    }
}


function drawMarker() {
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var message = 'Amamos el Futbol';
    var nombre = '';
    var characterPin = '.'
    var pinColor = '000000';

    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + characterPin + "|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        icon: pinImage,
        title: message,
        map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
            infowindow.setContent('<button onclick="calcRoute()">Ven a nuestra tienda: Futbol Fans ONLY</button>');
            infowindow.open(map, marker);
        }
    })(marker, i));

}


function obtenerDireccion() {
    var geocoder = new google.maps.Geocoder;

    var mylat = document.getElementById('lat').value;
    var mylng = document.getElementById('lng').value;

    var latlng = { lat: parseFloat(mylat), lng: parseFloat(mylng) };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                swal({
                    icon: "success",
                    text: results[0].formatted_address
                });
            } else {
                swal({
                    icon: "info",
                    text: "No hay resultados"
                });
            }
        } else {
            swal({
                icon: "error",
                text: "Geocoder failed due to: " + status
            });
        }
    });
}