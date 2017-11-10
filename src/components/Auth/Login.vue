<template>
  <div>
    <button @click="googleLogin">Auth google</button>
    <router-link to="/home" tag="a">Continue without login</router-link>

  </div>
</template>

<script>
  import { googleAuth } from '../../auth/oauth'

  export default {
    data: function () {
      return {
        access_token: null,
        response: null
      }
    },

    methods: {
      googleLogin () {
        googleAuth.directAccess().signIn().then(googleUser => {
          this.$router.push('/home')
        }).catch(response => console.log(response))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
