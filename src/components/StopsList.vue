<template>
  <div class="stop-list" v-if="stops.length > 0" :class="{'expanded' : expanded}">
    <span @click="toggleList">
      <i class="fa fa-angle-double-right" aria-hidden="true" v-if="expanded"></i>
      <i class="fa fa-angle-double-left" aria-hidden="true" v-if="!expanded"></i>
    </span>
    <ul class="list-stops">
      <li v-for="stop in stops" v-if="expanded">
        <span @click="updateStopDetails(stop)"><i class="fa fa-pencil" aria-hidden="true"></i></span>
        {{ stop.address }}
      </li>
    </ul>
    <stop v-if="isUpdateStopDetails" :stop="selectedStop"></stop>
  </div>
</template>

<script>
  import Stop from './Stop.vue'
  import { stopStore } from '../stores'

  export default {
    components: { Stop },

    data () {
      return {
        stops: stopStore.all(),
        isUpdateStopDetails: false,
        selectedStop: {},
        expanded: true
      }
    },

    methods: {
      updateStopDetails (stop) {
        this.selectedStop = stop
        this.isUpdateStopDetails = true
      },
      toggleList () {
        this.expanded = !this.expanded
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/sass/_vars.scss';

  .stop-list {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 10px;
    border: 1px solid $colorBorder;
    width: 5%;
    transition: 0.5s width ease-in-out;
    background-color: #f6f6f6;
  }

  .expanded {
    border: 1px solid $colorBorder;
    padding: 10px;
    width: 43%;
  }

  ul > li {
    border-bottom: 1px solid $colorBorder;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px 0;
  }

  .fa {
    cursor: pointer;
  }
</style>
