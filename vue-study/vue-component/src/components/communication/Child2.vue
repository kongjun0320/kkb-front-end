<template>
  <div class="child1">
    <button @click="handleBus">child2-$bus</button>
    <p>props - msg: {{ msg }}</p>
    <p>inject: {{ bar }}</p>
  </div>
</template>

<script>
export default {
  name: 'Child2',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  inject: {
    bar: {
      from: 'bar',
      default: 'bar-default'
    }
  },
  mounted() {
    console.log('child2')
    this.$parent.$on('child', (msg) => {
      console.log(msg)
    })
    this.$emit('foo', 'msg from child2')
  },
  methods: {
    handleBus() {
      this.$bus.emit('event-from-child2', 'child2 msg by bus')
    }
  }
}
</script>

<style lang="scss" scoped></style>
