export const planStore = {
  store: {
    plans: []
  },

  getDefault () {
    return {
      number: 0,
      isStartPoint: this.store.stops.length === 0,
      isEndPoint: this.store.stops.length === 0,
      position: {},
      arrival: '',
      duration: 0, // hours
      description: '',
      address: ''
    }
  },

  getStopIndex (stop) {
    return this.store.stops.findIndex(existingStop => existingStop.number === stop.number)
  },

  isPositionAlreadySelected (position) {
    return this.store.stops.filter(existingStop => {
        return existingStop.position.lat === position.lat && existingStop.position.lng === position.lng
      }).length > 0
  },

  add (position, address) {
    if (this.isPositionAlreadySelected(position)) {
      return
    }
    const number = this.store.stops.length + 1
    const stop = Object.assign(stopStore.getDefault(), { position, address, number })
    this.store.stops.push(stop)
  },

  updateStopList (stops) {
    this.store.stops = stops
    this.changeStopOrder()
  },

  changeStopOrder () {
    this.store.stops.forEach((stop, index) => {
      stop.number = index + 1
    })
  },

  update (stop) {
    this.store.stops[this.getStopIndex(stop)] = stop
  },

  remove (stop) {
    this.store.stops.splice(this.getStopIndex(stop), 1)
    this.changeStopOrder()
  },

  all () {
    return this.store.stops
  }
}
