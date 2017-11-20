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
        <place-list :places="places"></place-list>
      </div>
    </div>
  </div>
</template>

<script>
  import Route from './Route.vue'
  import { eventBus } from '../utils'
  import PlaceList from './Place/PlaceList.vue'
  import { map, place, marker, direction, distance } from '../services'

  export default {
    name: 'Home',

    components: { Route, PlaceList },

    data: function () {
      return {
        places: [],
        routes: [],
        center: {lat: 0, lng: 0},
        zoom: 1,
        map: null
      }
    },

    methods: {
      addNewPlace (place) {
        place.marker = marker.create(place)
        this.places.push(place)
        this.updateOrderOfPlaces()
        if (this.places.length > 1) {
          const lastPlace = this.places[this.places.length - 2]
          this.addNewRoute(lastPlace, place)
        }
      },

      addNewRoute (origin, destination) {
        let route
        direction.between(origin.coordinates, destination.coordinates)
          .then(response => {
            route = response
            return distance.between(origin.coordinates, destination.coordinates)
          })
          .then(distanceDetails => {
            route.origin = origin
            route.destination = destination
            route.distance = distanceDetails.distance
            route.duration = distanceDetails.duration
            this.routes.push(route)
          })
      },

      updateOrderOfPlaces () {
        this.places.map((place, index) => {
          this.$set(place, 'order', index + 1)
          place.marker.setLabel(String(index + 1))
        })
      },

      generateRoutes () {
        this.routes.forEach(route => {
          route.mapObject.setMap(null)
        })
        this.routes = []
        this.places.reduce((carry, place) => {
          this.addNewRoute(carry, place)
          return place
        }, this.places[0])
      }
    },

    mounted () {
      this.map = map.generate('google-map', {
        center: this.center,
        zoom: this.zoom
      })

      place.registerAutocomplete('auto-complete', this.addNewPlace)

      eventBus.on('update-places', places => {
        this.places = places
        this.updateOrderOfPlaces()
        this.generateRoutes()
      })

      eventBus.on('remove-place', removedPlace => {
        removedPlace.marker.setMap(null)
        this.places.splice(this.places.findIndex(place => removedPlace.order === place.order), 1)
        this.generateRoutes()
        this.updateOrderOfPlaces()
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    width: 100%;
    float: left;
  }

  .home.slide-left {
    width: 60%;
    transition: 0.5s width ease-in-out;
  }

  .container {
    position: relative;
  }

  .map {
    height: 93vh;
  }
</style>
