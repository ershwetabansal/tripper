<template>
  <div class="place-list" v-if="places.length > 0" :class="{'expanded' : expanded}">
    <span @click="toggleList" class="pull-right">
      <i class="fa fa-angle-double-right" aria-hidden="true" v-if="expanded"></i>
      <i class="fa fa-angle-double-left" aria-hidden="true" v-if="!expanded"></i>
    </span>

    <draggable v-model="localPlaces" :options="{draggable:'.item'}" :element="'ul'" class="list-places" @end="changePlaceOrder">
      <li v-for="place in localPlaces" class="item">
        <span @click="updatePlaceDetails(place)"><i class="fa fa-pencil" aria-hidden="true"></i></span>
        <i class="fa fa-times pull-right" aria-hidden="true" @click="removePlace(place)"></i>
        {{ place.formatted_address }}
      </li>
    </draggable>

    <place-info v-if="isUpdatePlaceDetails" :place="selectedPlace"></place-info>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import PlaceInfo from './PlaceInfo.vue'
  import { eventBus } from '../../utils/index'

  export default {
    components: { PlaceInfo, Draggable },

    props: {
      places: Array
    },

    data () {
      return {
        localPlaces: [],
        isUpdatePlaceDetails: false,
        selectedPlace: {},
        expanded: true
      }
    },

    methods: {
      updatePlaceDetails (place) {
        this.selectedPlace = place
        this.isUpdatePlaceDetails = true
      },

      toggleList () {
        this.expanded = !this.expanded
      },

      changePlaceOrder () {
        eventBus.emit('update-places', this.localPlaces)
      },

      removePlace (place) {
        eventBus.emit('remove-place', place)
      }
    },

    mounted () {
      this.localPlaces = this.places
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/sass/vars';

  .place-list {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 10px;
    border: 1px solid $colorBorder;
    width: 30px;
    transition: 0.2s width ease-in-out;
    background-color: #f6f6f6;
    .list-places {
      opacity: 0;
      margin-top: 20px;
    }
  }

  .expanded {
    border: 1px solid $colorBorder;
    padding: 10px;
    width: 43%;
    .list-places {
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
