<template>
  <div id="app">
    <h1>Tripper</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',

  data () {
    return {}
  }
}
</script>

<style lang="scss">
  @import './assets/sass/app';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 14px;
    line-height: 20px;
  }

  * {
    box-sizing: border-box;
  }
</style>
