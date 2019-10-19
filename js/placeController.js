var renderPlaces = () => {
    let places = loadPlacesFromStorage()
    let strHTMLs = places.map(place =>`
        <li>${place.newPlaceName}</li>
        <div>
        <button class="show-btn btn" onclick="onShowLocation(${place.id})">🚩</button>
        <button class="delete-btn btn" onclick="onDeletePlace(${place.id})">✘</button>
        </div>`
    )
    document.querySelector('.newPlaces').innerHTML = strHTMLs.join('')
}

var onDeletePlace = (PlaceId) => {
    let isSure = confirm('Are you sure?')
    if (!isSure) return
    deletePlace(PlaceId)
    renderPlaces()
}

var onShowLocation = (id) => {
    let place = getPlace(id)
    let pos = {
        lat: place.lat,
        lng: place.lng
    };
    new google.maps.Marker({
        position: pos,
        map: map
    });
    map.setCenter(pos)
}