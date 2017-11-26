<template>
  <form v-on:submit.prevent="onSubmit">
    <div class="form-group">
      <label>Give a name to your trip</label>
      <input type="text" placeholder="Iceland adventure" class="form-control" ref="name" required v-model="trip.name">
    </div>

    <div class="form-group">
      <label>When are you going?</label>
      <input type="date" class="form-control" v-model="trip.start_date" :max="trip.end_date">
    </div>

    <!--<div class="form-group">-->
      <!--<label>End date of trip</label>-->
      <!--<input type="date" class="form-control" v-model="trip.end_date" :min="trip.start_date">-->
    <!--</div>-->

    <slot name="controls"></slot>
  </form>
</template>

<script>
  export default {
    props: {
      trip: Object,
      onSubmit: Function
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
