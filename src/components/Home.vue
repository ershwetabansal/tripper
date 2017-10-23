<template>
  <div class="home">
    <div class="container">
      <div>
        <div class="search">
          <input type="text" placeholder="Enter location" ref="input" id="auto-complete"/>
        </div>
        <div class="map" id="google-map"></div>
      </div>
      <div>
        <stop-list></stop-list>
      </div>
    </div>
  </div>
</template>

<script>
  import Stop from './PlaceAdditionInformation.vue'
  import StopList from './StopsList.vue'
  import GMap from './Google/GMap.vue'
  import Route from './Route.vue'
  import { map, place, marker, direction, distance } from '../services'

  export default {
    name: 'Home',

    components: { Stop, Route, StopList, GMap },

    data: function () {
      return {
        places: [],
        routes: [],
        center: {lat: 0, lng: 0},
        zoom: 1,
        map: {}
      }
    },

    mounted () {
      map.generate('google-map', {
        center: this.center,
        zoom: this.zoom
      })
      place.registerAutocomplete('auto-complete', place => {
        marker.create(place)
        this.places.push(place)
        if (this.places.length > 1) {
          const lastPlace = this.places[this.places.length - 2]
          let route
          direction.between(place.coordinates, lastPlace.coordinates)
            .then(response => {
              route = response
              return distance.between(place.coordinates, lastPlace.coordinates)
            })
            .then(distanceDetails => {
              route.origin = lastPlace
              route.destination = place
              route.distance = distanceDetails.distance
              route.duration = distanceDetails.duration
              this.routes.push(route)
            })
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    width: 45vw;
    margin: 0 auto;
  }

  .container {
    position: relative;
  }

  .map {
    height: 50vh;
    margin-top: 20px;
  }
</style>
