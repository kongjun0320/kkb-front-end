<template>
  <div class="notice" v-if="isShow">
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  props: {
    title: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true
      setTimeout(() => {
        this.hide()
      }, this.duration)
    },
    hide() {
      this.isShow = false
      this.remove()
    }
  }
}
</script>

<style lang="scss" scoped>
.notice {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  box-shadow: 2px 2px 2px rgba($color: #000000, $alpha: 0.4);
}
</style>
