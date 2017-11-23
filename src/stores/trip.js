import storageFactory from '../storage/storageFactory'

const storage = storageFactory.get()
export const tripStore = {
  store: {
    trips: []
  },

  getDefault () {
    return {
      uuid: 0,
      name: '',
      start_date: '',
      end_date: '',
      places: []
    }
  },

  get (tripUuid) {
    return this.store.trips[this.getTripIndex(tripUuid)]
  },

  add (trip) {
    trip.uuid = this.store.trips.length > 0
      ? this.store.trips[this.store.trips.length - 1].uuid + 1
      : 1
    this.store.trips.push(trip)
    this.syncTripToLocalStorage(trip)
    return trip
  },

  update (trip) {
    this.store.trips[this.getTripIndex(trip)] = trip
    this.syncTripToLocalStorage(trip)
  },

  remove (trip) {
    this.store.trips.splice(this.getTripIndex(trip), 1)
    storage.delete(`trip-${trip.uuid}`)
    storage.delete(`trip-${trip.uuid}-places`)
    this.syncAllTripsIndicesToLocalStorage()
  },

  updatePlaces (trip, places) {
    this.store.trips[this.getTripIndex(trip)].places = places
    storage.put(`trip-${trip}-places`, JSON.stringify(places.map(place => place.place_id)))
  },

  all () {
    if (this.store.trips.length === 0) {
      const trips = JSON.parse(storage.get('trips-uuids', '[]'))
      trips.forEach(tripUuid => {
        const trip = JSON.parse(storage.get(`trip-${tripUuid}`))
        if (trip) {
          const places = storage.get(`trip-${tripUuid}-places`)
          trip.places = places ? JSON.parse(places) : []
          this.store.trips.push(trip)
        }
      })
    }
    return this.store.trips
  },

  getTripIndex (trip) {
    return this.store.trips.findIndex(existingTrip => existingTrip.uuid === (typeof trip === 'object' ? trip.uuid : parseInt(trip)))
  },

  syncTripToLocalStorage (trip) {
    storage.put(`trip-${trip.uuid}`, JSON.stringify({
      uuid: trip.uuid,
      name: trip.name,
      start_date: trip.start_date,
      end_date: trip.end_date
    }))
    this.syncAllTripsIndicesToLocalStorage()
  },

  syncAllTripsIndicesToLocalStorage () {
    storage.put('trips-uuids', JSON.stringify(this.store.trips.map(trip => trip.uuid)))
  }
}
