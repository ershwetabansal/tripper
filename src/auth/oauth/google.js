let config = {
  scope: 'profile email https://www.googleapis.com/auth/plus.login'
}
let directAccess = false
let gapiUrl = 'https://apis.google.com/js/api:client.js'

const googleAuth = {
  initialize (clientId) {
    config.clientId = clientId
    return new Promise(function (resolve, reject) {
      if (window.gapi === undefined) {
        installClient().then(function () {
          return initClient()
        }).then(function () {
          resolve()
        })
      } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
        initClient().then(function () {
          resolve()
        })
      }
    })
  },

  directAccess () {
    directAccess = true
    return this
  },

  signIn () {
    if (directAccess) {
      return window.gapi.auth2.getAuthInstance().signIn()
    } else {
      return window.gapi.auth2.getAuthInstance().grantOfflineAccess({'redirect_uri': 'postmessage'})
    }
  },

  signOut: function (successCallback, errorCallback) {
    window.gapi.auth2.getAuthInstance().signOut().then(function () {
      successCallback()
    }, function (error) {
      errorCallback(error)
    })
  }
}

function installClient () {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script')
    script.src = gapiUrl
    script.onreadystatechange = script.onload = function () {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        setTimeout(function () {
          resolve()
        }, 500)
      }
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}

function initClient () {
  return new Promise(function (resolve, reject) {
    window.gapi.load('auth2', function () {
      window.gapi.auth2.init(config)
      resolve()
    })
  })
}

export { googleAuth }
