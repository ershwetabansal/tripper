<template>
  <map-underlay>
    <div slot="main" class="container">
      <div class="box">
        <form v-on:submit.prevent="createTrip">
          <div class="form-group">
            <label>Give your trip a name</label>
            <input type="text" placeholder="Iceland adventure" class="form-control" ref="name" required>
          </div>

          <div class="form-group">
            <label>Start date of trip</label>
            <input type="text" class="form-control">
          </div>

          <div class="form-group">
            <label>End date of trip</label>
            <input type="text" class="form-control">
          </div>

          <button class="btn btn-success btn-block">Plan your trip</button>
        </form>
      </div>
    </div>
  </map-underlay>
</template>

<script>
  import MapUnderlay from '../Layout/MapUnderlay.vue'

  export default {
    components: { MapUnderlay },

    data: function () {
      return {}
    },

    methods: {
      createTrip () {
        this.$router.push('/plan')
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
      border-radius:2px;
      background-color: $themeColor;
      width: 100%;
      padding: 20px;
    }
  }
</style>
