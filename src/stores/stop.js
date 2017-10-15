export const stopStore = {
  store: {
    stops: []
  },

  getDefault () {
    return {
      number: 0,
      isStartPoint: false,
      isEndPoint: false,
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

  doesExist (stop) {
    return this.getStopIndex(stop) > -1
  },

  add (stop) {
    if (this.doesExist(stop)) {
      throw new Error('This stop already exists.')
    }
    this.store.stops.push(stop)
    this.changeStopOrder()
  },

  updateStopList (stops) {
    this.store.stops = stops
    this.changeStopOrder()
  },

  changeStopOrder () {
    this.store.stops.map((stop, index) => {
      stop.number = index + 1
      return stop
    })
  },

  update (stop) {
    this.store.stops[this.findIndex(stop)] = stop
  },

  remove (stop) {
    this.store.stops.splice(this.findIndex(stop), 1)
    this.changeStopOrder()
  },

  all () {
    return this.store.stops
  }
}
