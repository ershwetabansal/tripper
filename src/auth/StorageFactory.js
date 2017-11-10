import availableStorages from './storage'

export default class StorageFactory {
  get (storageType = 'cookie') {
    return availableStorages[storageType]
      ? availableStorages[storageType]
      : availableStorages.local
  }
}
