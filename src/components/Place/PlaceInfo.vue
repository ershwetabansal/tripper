<template>
  <modal v-if="modal" :close-modal="closeModal" :modal-css="'modal-sm'">
    <div slot="header">
      Add details for this place/point
    </div>

    <div slot="main">
      <div class="form-group">
        <label for="time">Arrival</label>
        <input type="time" v-model="place.arrival" name="time" id="time" class="form-control">
      </div>

      <div class="form-group">
        <label for="duration">Duration (hours)</label>
        <input type="Number" v-model="place.duration" name="duration" id="duration" class="form-control">
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" v-model="place.description" placeholder="Name for the marker" id="description" class="form-control">
      </div>

      <div class="form-group">
        <label for="start-point">
          <input type="checkbox" v-model="place.isStartPoint" id="start-point" class="form-control">
          Is this starting point?
        </label>
      </div>

      <div class="form-group">
        <label for="end-point">
          <input type="checkbox" v-model="place.isEndPoint" id="end-point" class="form-control">
          Is this End point?
        </label>
      </div>
    </div>

    <div slot="footer">
      <button @click="save">Save</button>
    </div>
  </modal>
</template>

<script>
  import Modal from '../Shared/Modal.vue'

  export default {
    components: { Modal },

    props: {
      place: Object
    },

    data () {
      return {
        modal: false
      }
    },

    methods: {
      openModal () {
        this.modal = true
      },

      closeModal () {
        this.modal = false
      },

      save () {
        this.closeModal()
      }
    },

    created () {
      this.openModal()
    }
  }
</script>

<style scoped>

</style>
