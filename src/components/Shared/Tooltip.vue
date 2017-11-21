<template>
  <span class="tooltip" :class="{'on-hover': !triggerOnClick, 'clicked': triggerOnClick && activatorClicked }">
    <span @click="toggleTip" class="activator"><slot name="activator"></slot></span>
    <div  class="tip" :class="position" @click.stop.prevent v-click-away="hideTip">
      <div @click.stop.prevent="hideTip" v-if="triggerOnClick" class="close">x</div>
      <slot name="tip"></slot>
    </div>
  </span>
</template>

<script>
  export default {
    props: {
      triggerOnClick: Boolean,
      position: {
        type: String,
        default: 'bottom'
      }
    },

    data () {
      return {
        activatorClicked: false
      }
    },

    methods: {
      toggleTip () {
        setTimeout(() => {
          this.activatorClicked = !this.activatorClicked
        })
      },

      hideTip () {
        this.activatorClicked = false
      }
    }
  }
</script>

<style scoped lang="scss">


  .tooltip {
    position: relative;
    .tip {
      display: none;
    }
    &.on-hover:hover, &.clicked {
      .tip {
        position: absolute;
        display: inline;
        cursor: auto;
        background-color: #393838;
        padding: 15px;
        border-radius: $borderRadius;
        color: white;
        line-height: 20px;
        z-index: 20;
        border: 1px solid white;
        &.bottom {
          top: 100%;
        }

        &.top {
          top: -100%;
        }
      }
    }
  }

  .close {
    position: absolute;
    top: 6px;
    right: 10px;
    cursor: pointer;
  }

  .activator {
    cursor: pointer;
  }
</style>
