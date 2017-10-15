<template>
  <div>
    <div class="modal-wrapper" @click="closeModal">
      <div class="modal" @click.stop.prevent :class="modalCss">
        <header class="modal-header">
          <span @click="closeModal" class="btn-close pull-right">Close</span>
          <slot name="header"></slot>
        </header>
        <main class="modal-body">
          <slot name="main"></slot>
        </main>
        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      closeModal: Function,
      modalCss: String
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/sass/_vars.scss';

  .btn-close {
    cursor: pointer;
    color: rgba(51, 51, 51, 0.5);
  }

  .modal-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 6;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .modal {
    border: 1px solid $colorBorder;
    background-color: white;

  &.modal-sm {
     width: 30vw;
   }

  &.modal-md {
     width: 50vw;
   }

  &.modal-lg {
     width: 70vw;
   }
  }

  .modal-header {
    padding: $standardPadding;
    background-color: $colorBgr;
    border-bottom: 2px solid $colorBorder;
    font-size: 1.2em;
  }

  .modal-body {
    padding: $standardPadding;
  }

  .modal-footer {
    padding: $standardPadding;
    border-top: 1px solid $colorBorder;
    text-align: right;
  }
</style>
