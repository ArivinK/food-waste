//geocoder = new google.maps.Geocoder();
//
//window.getCoordinates = function(address, callback) {
//    var coordinates;
//    
//    geocoder.geocode({address: address}, function(results, status){
//        coords_obj = results[0].geometry.location;
//        coordinates = [coords_obj.nb, coords_obj.ob];
//        callback(coordinates);
//    })
//}

//$(document).ready(function(){
//    var address = $("#address").val();
//    
//    geocoder = new google.maps.Geocoder();
//    
//    address = address || 'Ferrol, Galicia, Spain';
//    // Initialize the Geocoder
//    geocoder = new google.maps.Geocoder();
//    if (geocoder) {
//        geocoder.geocode({
//            'address': address
//        }, function (results, status) {
//            if (status == google.maps.GeocoderStatus.OK) {
//                var lat1 = results[0].geometry.location.lat();
//                var lng1 = results[0].geometry.location.lng();
//            }
//            
//            $("#lat").html(lat1);
//            $("#lng").html(lng1);
//        });
//    }
//});