'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GOOGLE_API_KEY: '"AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk"'
})
