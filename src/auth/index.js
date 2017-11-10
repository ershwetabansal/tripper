import { http } from '../services'
import { eventBus } from '../utils'
import { googleAuth } from './oauth'
import StorageFactory from './StorageFactory'

export default {
  storage: null,

  init ({ storageType, oauthProviders }) {
    this.storage = new StorageFactory().get(storageType)
    this.user.authenticated = false
    Object.keys(oauthProviders).forEach(provider => {
      if (provider === 'google') {
        googleAuth.initialize(oauthProviders[provider].client_id)
      }
    })
  },

  user: {
    authenticated: false,
    name: null,
    surname: null,
    avatar: null
  },

  /**
   * Login to the application using given credentials.
   *
   * @return {Promise}
   */
  login (credentials) {
    return http.post('auth/login', credentials)
      .then(response => {
        this.authenticate(response)
        eventBus.emit('logged-in', this.user.authenticated)
        return response
      })
  },

  /**
   * Logout from the application.
   *
   * @return void
   */
  logout () {
    http.post('auth/logout')
      .then(() => this.unAuthenticate())
      .catch(() => this.unAuthenticate())
  },

  /**
   * Check if user is already have auth token.
   *
   * @return void
   */
  checkAuth () {
    const jwt = this.storage.get('auth_token')
    this.user.authenticated = !!jwt
    http.get('auth/user').then(response => {
      this.updateUserDetails(response)
      eventBus.emit('logged-in', this.user.authenticated)
    })
  },

  /**
   * Get auth header for http requests.
   *
   * @return {string|undefined}
   */
  getAuthHeader () {
    if (this.user.authenticated) {
      return 'Bearer ' + this.storage.get('auth_token')
    }
  },

  /**
   * Read auth token from the http response headers.
   *
   * @param {Object} headers
   * @return void
   */
  readFromResponseHeader (headers = {}) {
    Object.entries(headers)
      .filter(([key, value]) => key.toLowerCase() === 'authorization')
      .forEach(([key, value]) => this.authenticate(value.replace('Bearer ', '')))
  },

  /**
   * Save auth token to the storage.
   *
   * @param {Object} response
   * @return void
   */
  authenticate (response) {
    this.storage.put('auth_token', response.token)
    this.user.authenticated = true
    this.updateUserDetails(response.user)
  },

  /**
   * On authentication, if user details are returned, then we must update them on our user model.
   *
   * @param {Object} user
   */
  updateUserDetails (user) {
    this.user.name = user.name
    this.user.surname = user.surname
    this.user.avatar = user.avatar
  },

  /**
   * Remove auth token from storage.
   *
   * @return void
   */
  unAuthenticate () {
    if (this.storage) {
      this.storage.delete('auth_token')
    }
    this.user.authenticated = false
    this.user.name = null
    this.user.surname = null
    this.user.avatar = null
  }
}
