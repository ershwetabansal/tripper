<template>
  <ul>
    <li v-for="trip in trips">
      <p>{{ trip.name }}</p>
      <small>{{ trip.start_date }}</small>
    </li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        trips: []
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
