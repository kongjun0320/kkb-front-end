<template>
  <div class="child1">
    <button @click="handleParent">child1-$parent</button>
  </div>
</template>

<script>
export default {
  name: 'Child1',
  mounted() {
    this.$bus.on('event-from-child2', (msg) => {
      console.log('msg from child2: ', msg)
    })
  },
  methods: {
    handleParent() {
      this.$parent.$emit('child', 'from child1')
    }
  }
}
</script>

<style lang="scss" scoped></style>
