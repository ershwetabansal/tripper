let latestToken = ''
const generateToken = () => {
  return Math.ceil(Math.random() * 10000000)
}

function isReceivedTokenValid (req) {
  const token = req.get('Authorization').replace('Bearer ', '')
  return token && parseInt(token) === latestToken
}

const apiMocker = {
  setUpMocks (app) {
    app.post('/api/auth/login', function (req, res) {
      const latestToken = generateToken()
      res.send({
        auth_token: latestToken
      })
    })

    app.post('/api/auth/logout', function (req, res) {
      res.set('Authorization', 'Bearer '+latestToken)
      res.send({
        auth_token: latestToken
      })
    })
  }
}

module.exports = apiMocker
