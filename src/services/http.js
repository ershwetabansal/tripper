import axios from 'axios'
import auth from '../auth'
import { eventBus } from '../utils'

export const http = {
  // This wrapper supports single use and multiple use auth tokens.
  tokenType: 'multiple',

  init () {
    // Setup base url
    axios.defaults.baseURL = process.env.API_URL || ''

    // Setup auth token type
    this.tokenType = process.env.AUTH_TOKEN_TYPE

    // Setup authorization header
    axios.interceptors.request.use(config => {
      // Start - Testing override
      // Use local URL for those APIs which do not have server APIs ready
      // TODO We can remove below logic as soon as apis are ready
      const apisToBeMocked = [
        // '/data-set?page=',
        // '/data-set/',
        '/observation'
      ]
      const relativeUrl = config.url.replace(process.env.API_URL, '')
      if (apisToBeMocked.findIndex(api => relativeUrl.includes(api)) > -1) {
        config.baseURL = process.env.MOCK_API_URL
        config.url = config.url.replace(process.env.API_URL, process.env.MOCK_API_URL)
      }
      // End - Testing override
      config.headers.Authorization = auth.getAuthHeader()
      return config
    })

    // Get the token from the response header
    axios.interceptors.response.use(
      response => response.data,
      error => {
        if (error.response.status === 401 && !error.response.config.url.includes('api/auth')) {
          eventBus.emit('logged-out')
        }
        return Promise.reject(error.response)
      })
  },

  request (method, url, data) {
    if (this.tokenType === 'single') {
      return queueHttpRequests(method, url, data)
    }
    return makeHttpRequest(method, url, data)
  },

  get (...args) {
    return this.request('GET', ...args)
  },

  post (...args) {
    return this.request('POST', ...args)
  },

  patch (...args) {
    return this.request('PATCH', ...args)
  },

  put (...args) {
    return this.request('PUT', ...args)
  },

  delete (...args) {
    return this.request('DELETE', ...args)
  },

  options (...args) {
    return this.request('OPTIONS', ...args)
  },

  head (...args) {
    return this.request('HEAD', ...args)
  },

  upload (url, property, file) {
    const formData = new FormData()
    formData.append(property, file, file.name)

    return this.request('POST', url, formData)
  }
}

const promises = []
/**
 * Put all http requests in queue so that the token from one request's response can be used for next request.
 *
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 * @return {Promise}
 */
function queueHttpRequests (method, url, data) {
  const newPromise = new Promise(function (resolve, reject) {
    Promise.all(promises)
      .then(() => {
        axios({ method, url, data })
          .then(response => {
            promises.splice(promises.findIndex(promise => Object.is(promise, newPromise)), 1)
            return resolve(response)
          })
          .catch(errors => {
            promises.splice(promises.findIndex(promise => Object.is(promise, newPromise)), 1)
            reject(errors)
          })
      })
  })
  promises.push(newPromise)
  return newPromise
}

/**
 * Make http request using axios.
 *
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 * @return {AxiosPromise}
 */
function makeHttpRequest (method, url, data) {
  return axios.request({ method, url, data })
}
