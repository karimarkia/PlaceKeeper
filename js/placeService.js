const PLACE_KEY = 'place'
let map;
let gPlaces = []
let gId = 1


var initMap = () => {
    if (loadPlacesFromStorage())
        gPlaces = loadPlacesFromStorage()
    // Eilat location
    let defaultLocation = {
        lat: 29.551238,
        lng: 34.955372
    }
    map = new google.maps.Map(
        document.getElementById('map'), {
            center: defaultLocation,
            zoom: 7
        });
    let marker = new google.maps.Marker({
        position: defaultLocation,
        map: map
    });
    map.addListener('click', function (e) {
        placeNewMarker(e.latLng, map)
    })
}

var placeNewMarker = (latLng, map) => {
    // console.log('click');
    let marker = new google.maps.Marker({
        position: latLng,
        map: map
    })
    map.panTo(latLng)
    gPlaces.push({
        id: gId++,
        lat: marker.position.lat(),
        lng: marker.position.lng(),
        newPlaceName: prompt('New place name : ')
    })
    savePlacessToStorage()
    renderPlaces()
}

var deletePlace = (placeId) => {
    let placeById = gPlaces.findIndex(place => place.id === placeId)
    gPlaces.splice(placeById, 1)
    savePlacessToStorage()
}

var getPlace = (id) => {
    let foundPlace = gPlaces.find(place => id === place.id)
    return foundPlace
}

var getUserCords = () => {
    let infoWindow = new google.maps.InfoWindow
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos)
            infoWindow.setContent('Location found.')
            infoWindow.open(map)
            map.setCenter(pos)
        }, )
    }
}











function savePlacessToStorage() {
    saveToStorage(PLACE_KEY, gPlaces)
}

function loadPlacesFromStorage() {
    return loadFromStorage(PLACE_KEY);
}






















// function handleLocationError(error) {
//     var locationError = document.getElementById("locationError");

//     switch (error.code) {
//         case 0:
//             locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
//             break;
//         case 1:
//             locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
//             break;
//         case 2:
//             locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
//             break;
//         case 3:
//             locationError.innerHTML = "The browser timed out before retrieving the location.";
//             break;
//     }
// }