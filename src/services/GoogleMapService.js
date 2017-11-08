let mapInitializingPromise
let mapInstance
let infoWindow
let directionsService

export const map = {
  initialize (apiKey) {
    const googleMapScript = document.createElement('SCRIPT')
    let url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`
    googleMapScript.setAttribute('src', url)
    googleMapScript.setAttribute('async', '')
    googleMapScript.setAttribute('defer', '')
    document.body.appendChild(googleMapScript)

    mapInitializingPromise = new Promise((resolve, reject) => {
      window.initMap = resolve
    })

    return mapInitializingPromise
  },

  generate (elementId, options) {
    return mapInitializingPromise.then(() => {
      /* eslint-disable no-undef */
      mapInstance = new google.maps.Map(document.getElementById(elementId), options)
      directionsService = new google.maps.DirectionsService()
      return mapInstance
    })
  }
}

export const place = {
  registerAutocomplete (inputElementId, callback = () => {}, onError = () => {}) {
    mapInitializingPromise.then(() => {
      const inputElement = document.getElementById(inputElementId)
      const autoComplete = new google.maps.places.Autocomplete(inputElement)
      autoComplete.bindTo('bounds', mapInstance)
      autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace()
        if (!place.geometry) {
          return onError('No details available for :' + place.name)
        }
        if (place.geometry.viewport) {
          mapInstance.fitBounds(place.geometry.viewport)
        } else {
          mapInstance.setCenter(place.geometry.location)
        }
        place.coordinates = place.geometry.location
        inputElement.value = ''
        callback(place)
      })
    })
  }
}

export const marker = {
  create (place, animation = true) {
    infoWindow = infoWindow || new google.maps.InfoWindow()

    const newMarker = new google.maps.Marker({
      map: mapInstance,
      position: place.geometry.location,
      animation: animation ? google.maps.Animation.DROP : ''
    })

    google.maps.event.addListener(newMarker, 'click', function () {
      infoWindow.setContent(place.name)
      infoWindow.open(mapInstance, this)
    })

    return newMarker
  }
}

export const direction = {
  between (origin, destination, travelMode = 'DRIVING') {
    const directionsDisplay = new google.maps.DirectionsRenderer()

    return new Promise((resolve, reject) => {
      directionsService.route({ origin, destination, travelMode }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setMap(mapInstance)
          directionsDisplay.setDirections(response)
          response.mapObject = directionsDisplay
          return resolve(response)
        }
        const directLine = new google.maps.Polyline({
          path: [origin, destination],
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        })
        directLine.setMap(mapInstance)
        response.mapObject = directLine
        resolve(response)
      })
    })
  }
}

export const distance = {
  between (origin, destination, travelMode = 'DRIVING', avoidHighways = false, avoidTolls = false) {
    const service = new google.maps.DistanceMatrixService()
    return new Promise((resolve, reject) => {
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways,
        avoidTolls
      }, (response, status) => {
        if (status !== 'OK' || response.rows[0].elements[0].status === 'ZERO_RESULTS') {
          return resolve({})
        }
        resolve({
          distance: response.rows[0].elements[0].distance.text,
          duration: response.rows[0].elements[0].duration.text
        })
      })
    })
  }
}
