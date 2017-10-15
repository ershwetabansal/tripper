<template>
  <div class="stop-list" v-if="stops.length > 0" :class="{'expanded' : expanded}">
    <span @click="toggleList" class="pull-right">
      <i class="fa fa-angle-double-right" aria-hidden="true" v-if="expanded"></i>
      <i class="fa fa-angle-double-left" aria-hidden="true" v-if="!expanded"></i>
    </span>
    <draggable v-model="stops" :options="{draggable:'.item'}" :element="'ul'" class="list-stops" @end="changeStopOrder">
      <li v-for="stop in stops" class="item">
        <span @click="updateStopDetails(stop)"><i class="fa fa-pencil" aria-hidden="true"></i></span>
        {{ stop.address }}
        <i class="fa fa-times pull-right" aria-hidden="true" @click="removeStop(stop)"></i>
      </li>
    </draggable>
    <stop v-if="isUpdateStopDetails" :stop="selectedStop"></stop>
  </div>
</template>

<script>
  import Stop from './Stop.vue'
  import Draggable from 'vuedraggable'
  import { stopStore } from '../stores'

  export default {
    components: { Stop, Draggable },

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
      },

      changeStopOrder () {
        stopStore.changeStopOrder()
      },

      removeStop (stop) {
        stopStore.remove(stop)
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
    width: 30px;
    transition: 0.5s width ease-in-out;
    background-color: #f6f6f6;
    .list-stops {
      opacity: 0;
      margin-top: 20px;
    }
  }

  .expanded {
    border: 1px solid $colorBorder;
    padding: 10px;
    width: 43%;
    .list-stops {
      opacity: 1;
      margin-top: 0;
    }
  }

  .item {
    list-style-type: none;
    cursor: move;
    border-bottom: 1px solid $colorBorder;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px 0;
    padding-right: 22px;
    &:first-of-type {
      padding-right: 15px;
    }
    &:last-of-type {
      border: none;
    }
  }

  .fa {
    cursor: pointer;
  }

  .number-circle {
    border-radius: 50%;
    background: lightgrey;
    display: inline-block;
    min-width: 18px;
    text-align: center;
    font-size: 10px;
  }

  .fa-times {
    color: lightgrey;
  }
</style>
