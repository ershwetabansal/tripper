<template>
  <div id="app">
    <router-view></router-view>
    <t-menu></t-menu>
  </div>
</template>

<script>
  import TMenu from './components/TMenu.vue'
  export default {
    name: 'app',

    components: { TMenu }
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
