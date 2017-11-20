<template>
<div>
  <div class="map" id="google-map"></div>
  <div class="main">
    <ul>
      <li @click="googleLogin" class="google">
        <i class="fa fa-google" aria-hidden="true"></i>
        Sign Up with Google
      </li>
      <li class="facebook">
        <i class="fa fa-facebook" aria-hidden="true"></i>
        Sign Up with Facebook
      </li>
      <li class="twitter">
        <i class="fa fa-twitter" aria-hidden="true"></i>
        Sign Up with Twitter
      </li>
      <li>
        <router-link to="/home" tag="a">Continue without Sign Up</router-link>
      </li>
    </ul>
    <p class="footer">Sign Up is required to sync the trips/plans</p>
  </div>
</div>
</template>

<script>
  import { map } from '../../services'
  import { googleAuth } from '../../auth/oauth'

  export default {
    data: function () {
      return {
        access_token: null,
        response: null,
        map: null
      }
    },

    methods: {
      googleLogin () {
        googleAuth.directAccess().signIn().then(googleUser => {
          this.$router.push('/home')
        }).catch(response => console.log(response))
      }
    },

    mounted () {
      this.map = map.generate('google-map', {
        center: {lat: 0, lng: 0},
        zoom: 2,
        disableDefaultUI: true
      })
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    position: absolute;
    top: 0;
    margin-top: 20vh;
    padding: 10%;
    width: 100%;
  }
  ul {
    > li {
      padding: 10px;
      text-align: center;
      font-size: 1.3em;
      border-radius: 2px;
      margin-bottom: 20px;
      &.google {
        background: #dd4b39;
        color: white;
        .fa {
          color: #dd4b39;
        }
      }
      &.facebook {
        background: #3b5998;
        color: white;
        .fa {
          color: #3b5998;
        }
      }
      &.twitter {
        background: #32ADC7;
        color: white;
        .fa {
          color: #32ADC7;
        }
      }
    }
  }

  .map {
    height: 100vh;
    opacity: 0.3;
    pointer-events: none;
    overflow: hidden;
  }

  .fa {
    background: white;
    padding: 5px;
    margin-right: 5px;
    border-radius: 2px;
  }

  .footer {
    font-size: 0.9em;
    font-style: italic;
    color: grey;
    text-align: center;
    position: fixed;
    bottom: 30px;
    left: 0;
    width: 100%;
  }
</style>
