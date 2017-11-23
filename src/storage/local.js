export default class LocalStorage {
  put (item, value) {
    localStorage.setItem(item, value)
  }

  get (item, defaultValue) {
    let storageItem = localStorage.getItem(item)
    if (storageItem) {
      return storageItem
    }
    return defaultValue
  }

  delete (item) {
    localStorage.removeItem(item)
  }
}
