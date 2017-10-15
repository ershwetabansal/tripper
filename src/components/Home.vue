<template>
  <div class="home">
    <div class="container">
      <div>
        <div class="search">
          <gmap-autocomplete @place_changed="usePlace" placeholder="Search"></gmap-autocomplete>
        </div>

        <gmap-map class="map" :zoom="1" :center="{lat: 0, lng: 0}">
          <gmap-marker v-for="(marker, index) in markers"
                       :key="index"
                       :position="marker.position"
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
  import StopList from './StopsList.vue'
  import { stopStore } from '../stores'

  export default {
    name: 'Home',

    components: { Stop, Route, StopList },

    data: function () {
      return {
        place: null,
        markers: [],
        isMarkerClicked: false,
        isRouteClicked: false
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
        console.log(place)
        this.place = place
        const position = this.searchedPlacePosition
        stopStore.add(Object.assign(stopStore.getDefault(), {
          position,
          address: place.formatted_address,
          isStartPoint: this.markers.length === 0,
          isEndPoint: this.markers.length === 0
        }))
        this.markers.push({ position })
        this.place = null
        document.getElementsByClassName('search')[0].value = ''
      },

      addMarkerDetails () {
        this.isMarkerClicked = true
      }
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
