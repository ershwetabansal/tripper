<template>
  <map-underlay>
    <div slot="main" class="container">
      <div class="box">
        <!--<h2>Add a new trip</h2>-->
        <create-form :trip="trip" :on-submit="createTrip">
          <button slot="controls" class="btn btn-success btn-block">Plan your trip</button>
        </create-form>
      </div>

      <div class="box" v-if="upComingTrips.length > 0">
        <h2>Upcoming trips</h2>
        <ul>
          <li v-for="trip in upComingTrips">
            <router-link :to="{ 'name': 'UpdateTrip', params: { uuid: trip.uuid } }">{{ trip.name }}</router-link>
          </li>
        </ul>
      </div>

      <div class="box" v-if="pastTrips.length > 0">
        <h2>Past trips</h2>
        <ul>
          <li v-for="trip in pastTrips"></li>
        </ul>
      </div>
    </div>
  </map-underlay>
</template>

<script>
  import CreateForm from './Trip/Form.vue'
  import { tripStore } from '../stores'
  import MapUnderlay from './Layout/MapUnderlay.vue'

  export default {
    components: { MapUnderlay, CreateForm },

    data: function () {
      return {
        trip: tripStore.getDefault(),
        trips: tripStore.all()
      }
    },

    computed: {
      upComingTrips () {
        return this.trips.filter(trip => !trip.start_date || new Date(trip.start_date) >= new Date())
      },

      pastTrips () {
        return this.trips.filter(trip => trip.start_date && new Date(trip.start_date) < new Date())
      }
    },

    methods: {
      createTrip () {
        const trip = tripStore.add(this.trip)
        this.$router.push(`/trip/${trip.uuid}/places`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/_vars';
  .container {
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: space-between;*/
    height: 100vh;
    padding: 20px;
    .box {
      border-radius: $borderRadius;
      background-color: $themeColor;
      width: 100%;
      padding: $standardPadding;
      margin-bottom: $standardPadding;
    }
  }
</style>
