<template>
  <div class="home">
    <button @click="panTo">
      Pan To
    </button>

    <button @click="panToBounds">
      Pan To Bounds
    </button>

    <button @click="fitBounds">
      Fit Bounds
    </button>

    <gmap-map :center="center" :zoom="7" ref="mmm" style="width: 100%; height: 500px">
      <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data: function () {
    return {
      center: {
        lat: 10.0,
        lng: 10.0
      },
      markers: [{
        position: {
          lat: 10.0,
          lng: 10.0
        }
      }, {
        position: {
          lat: 11.0,
          lng: 11.0
        }
      }]
    }
  },

  methods: {
    fitBounds() {
      const b = new google.maps.LatLngBounds();
      b.extend({
        lat: 33.972,
        lng: 35.4054
      });
      b.extend({
        lat: 33.7606,
        lng: 35.64592
      });
      this.$refs.mmm.fitBounds(b);
    },
    panToBounds() {
      const b = new google.maps.LatLngBounds();
      b.extend({
        lat: 33.972,
        lng: 35.4054
      });
      b.extend({
        lat: 33.7606,
        lng: 35.64592
      });
      this.$refs.mmm.panToBounds(b);
    },
    panTo() {
      this.$refs.mmm.panTo({
        lat: 47.912867,
        lng: 106.910723
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
