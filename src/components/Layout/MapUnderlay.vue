<template>
  <div>
    <div class="map" id="google-map"></div>
    <div class="main">
      <slot name="main" ></slot>
    </div>
  </div>
</template>

<script>
  import { map } from '../../services'
  export default {
    data: function () {
      return {
        map: null
      }
    },

    mounted () {
      this.map = map.generate('google-map', {
        center: {lat: 0, lng: 0},
        zoom: 2,
        disableDefaultUI: true
      })
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    position: absolute;
    top: 0;
    width: 100%;
  }

  .map {
    height: 100vh;
    opacity: 0.3;
    pointer-events: none;
    overflow: hidden;
  }
</style>
