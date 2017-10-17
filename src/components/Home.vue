<template>
  <div class="home">
    <div class="container">
      <div>
        <div class="search">
          <gmap-autocomplete @place_changed="usePlace" placeholder="Search" id="location-search"></gmap-autocomplete>
        </div>

        <gmap-map class="map" :zoom="zoom" :center="center">
          <gmap-marker v-for="(stop, index) in stops"
                       :key="index"
                       :position="stop.position"
                       :label="stop.number.toString()"
                       @click="addMarkerDetails"
          ></gmap-marker>
        </gmap-map>
      </div>
      <div>
        <stop-list></stop-list>
      </div>
    </div>
    <route v-if="isRouteClicked"></route>
  </div>
</template>

<script>
  import Stop from './Stop.vue'
  import Route from './Route.vue'
  import { eventBus } from '../utils'
  import StopList from './StopsList.vue'
  import { stopStore } from '../stores'

  export default {
    name: 'Home',

    components: { Stop, Route, StopList },

    data: function () {
      return {
        place: null,
        isMarkerClicked: false,
        isRouteClicked: false,
        stops: stopStore.all(),
        center: {lat: 0, lng: 0},
        zoom: 1
      }
    },

    computed: {
      searchedPlacePosition () {
        return {
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng()
        }
      }
    },

    methods: {
      usePlace (place) {
        this.place = place
        if (!this.place || !this.place.geometry) {
          return
        }
        const position = this.searchedPlacePosition
        this.zoom = this.stops.length === 0 ? 4 : 2
        this.$set(this.center, 'lat', position.lat)
        this.$set(this.center, 'lng', position.lng)
        stopStore.add(position, place.formatted_address)
        this.place = null
        document.getElementById('location-search').value = ''
        this.refreshStops()
      },

      addMarkerDetails () {
        this.isMarkerClicked = true
      },

      refreshStops () {
        this.stops = stopStore.all()
      }
    },

    created () {
      eventBus.on('stops-updated', this.refreshStops)
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
