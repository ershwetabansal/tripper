export default class LocalStorage {
  put (item, value) {
    localStorage.setItem(item, value)
  }

  get (item) {
    return localStorage.getItem(item)
  }

  delete (item) {
    localStorage.removeItem(item)
  }
}
