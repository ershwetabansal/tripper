<template>
  <div class="menu-container"
       :class="{ open: isOpen }">
    <div class="menu-activator"
         @click="toggle">
      <i class="fa fa-bars" aria-hidden="true" v-if="!isOpen"></i>
      <i class="fa fa-times" aria-hidden="true" v-if="isOpen"></i>
    </div>
    <div class="side-overlay" v-if="isOpen" @click="close"></div>
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
    width: 78%;
    height: 100vh;
    padding: 30px;
    background-color: $colorBgr;
    border-right: 1px solid;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;

    &.open {
      transform: translateX(0);
    }
  }

  .menu-activator {
    position: absolute;
    top: 10px;
    left: 100%;
    margin-left: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #fff;
    cursor: pointer;
    z-index: 1;
  }

  .menu {
    position: absolute;
    color: $colorContrastText;
  }

  .side-overlay {
    position: absolute;
    width: 200%;
    height: 100%;
    left: 100%;
    top: 0;
    background-color: $colorBgr;
    color: #fff;
    opacity: 0.4;
    .fa {
      margin-top: 12px;
      margin-left: 12px;
    }
  }
</style>
