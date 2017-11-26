<template>
  <div class="menu-container"
       :class="{ open: isOpen }">
    <div class="menu-activator"
         @click="toggle">
      <i class="fa fa-bars" aria-hidden="true" v-if="!isOpen"></i>
      <i class="fa fa-times" aria-hidden="true" v-if="isOpen"></i>
    </div>
    <div class="menu">
      <p>Welcome to tripper :)</p>
      <ul>
        <li>Home</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isOpen: false
      }
    },

    methods: {
      open () {
        this.isOpen = true
      },

      close () {
        this.isOpen = false
      },

      toggle () {
        if (this.isOpen) {
          this.close()
        } else {
          this.open()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/sass/_vars';
  .menu-container {
    position: relative;
    width: 240px;
    height: 100vh;
    padding: 30px;
    background-color: #34495e;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;

    &.open {
      transform: translateX(0);
    }
  }

  .menu-activator {
    position: absolute;
    top: 12px;
    left: 100%;
    margin-left: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #fff;
    cursor: pointer;
  }

  .menu {
    position: absolute;
    color: $colorContrastText;
  }
</style>
