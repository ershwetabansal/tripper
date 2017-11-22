<template>
  <map-underlay>
    <div slot="main" class="container">
      <div class="box">
        <create-form :trip="trip" :on-submit="createTrip">
           <button slot="controls" class="btn btn-success btn-block">Plan your trip</button>
        </create-form>
      </div>
    </div>
  </map-underlay>
</template>

<script>
  import CreateForm from './Form.vue'
  import MapUnderlay from '../Layout/MapUnderlay.vue'

  export default {
    components: { MapUnderlay, CreateForm },

    data: function () {
      return {
        trip: {
          name: '',
          start_date: '',
          end_date: ''
        }
      }
    },

    methods: {
      createTrip () {
        this.$router.push('/plan/places')
      }
    },

    mounted () {
      this.$refs.name.focus()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/_vars';
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    padding: 20px;
    .box {
      border-radius: $borderRadius;
      background-color: $themeColor;
      width: 100%;
      padding: 20px;
    }
  }
</style>
