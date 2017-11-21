<template>
  <map-underlay>
    <div slot="main">
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
          <router-link to="/plan/create" tag="a">Continue without Sign Up</router-link>
        </li>
      </ul>
      <p class="footer">Sign Up is required to sync the trips/plans</p>
    </div>
  </map-underlay>
</template>

<script>
  import { googleAuth } from '../../auth/oauth'
  import MapUnderlay from '../Layout/MapUnderlay.vue'

  export default {
    components: { MapUnderlay },

    data: function () {
      return {
        access_token: null,
        response: null
      }
    },

    methods: {
      googleLogin () {
        googleAuth.directAccess().signIn().then(googleUser => {
          this.$router.push('/plan/create')
        }).catch(response => console.log(response))
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul {
     margin-top: 20vh;
     padding: 10%;
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
