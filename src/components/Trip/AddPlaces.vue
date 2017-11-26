<template>
  <div class="home">
    <div class="container">
      <div>
        <div class="search">
          <input type="text" :placeholder="placeholder" ref="search" id="auto-complete"/>
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
  import { eventBus } from '../../utils'
  import { tripStore } from '../../stores'
  import PlaceList from '../Place/PlaceList.vue'
  import { map, place, marker, direction, distance } from '../../services/index'

  export default {
    name: 'Home',

    components: { PlaceList },

    data: function () {
      return {
        trip: {},
        places: [],
        routes: [],
        center: {lat: 0, lng: 0},
        zoom: 1,
        map: null
      }
    },

    computed: {
      placeholder () {
        return this.places.length === 0
          ? 'Where are you starting from?'
          : 'Where are you going next?'
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
        direction.between(origin, destination)
          .then(response => {
            route = response
            return distance.between({ placeId: origin.place_id }, { placeId: destination.place_id })
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
        tripStore.updatePlaces(this.$route.params.uuid, this.places)
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
      tripStore.all()
      this.trip = tripStore.get(this.$route.params.uuid)

      if (!this.trip) {
        this.$router.push('/home')
      }

      this.$refs.search.focus()
      /* eslint-disable no-undef */
      map.isReady()
        .then(() => {
          return map.generate('google-map', {
            center: this.center,
            zoom: this.zoom,
            scaleControl: false,
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_TOP
            },
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
          })
        })
        .then(() => {
          place.registerAutocomplete('auto-complete', this.addNewPlace)
          if (this.places.length === 0 && this.trip.places.length > 0) {
            this.trip.places.forEach(tripPlaceId => {
              place.service().getByPlaceId(tripPlaceId, this.addNewPlace)
            })
          }
        })

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
