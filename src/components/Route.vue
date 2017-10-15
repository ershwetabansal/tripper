<template>
  <modal v-if="modal" :close-modal="closeModal" :modal-css="'modal-sm'">
    <div slot="header">
      Add details for the route
    </div>

    <div slot="main">
      <div class="form-group">
        <label for="travel-mode">Mode of travel</label>
        <select v-model="route.travelMode" name="travel-mode" id="travel-mode" class="form-control">
          <option value="" selected disabled>Choose mode of travel</option>
          <option value="Car">Car</option>
          <option value="Bus">Bus</option>
          <option value="Flight">Flight</option>
          <option value="Train">Train</option>
          <option value="Bike">Bike</option>
          <option value="Walk">Walk</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input type="time" v-model="route.description" name="description" id="description" class="form-control">
      </div>
    </div>

    <div slot="footer">
      <button @click="save">Save</button>
    </div>
  </modal>
</template>

<script>
  import Modal from './Shared/Modal.vue'

  export default {
    components: { Modal },

    props: {
      stopNumber: Number,
      position: Object
    },

    data () {
      return {
        modal: false,
        route: {
          id: 1,
          travelMode: '',
          startStopNumber: '',
          endStopNumber: ''
        }
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
        localStorage.setItem(`route-${this.route.id}`, JSON.stringify(this.stop))
      }
    },

    created () {
      this.openModal()
    }
  }
</script>

<style scoped>

</style>
