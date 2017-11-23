import availableStorages from './index'

class StorageFactory {
  get (storageType = 'local') {
    return availableStorages[storageType]
      ? availableStorages[storageType]
      : availableStorages.local
  }
}

export default new StorageFactory()
