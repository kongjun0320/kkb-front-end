<template>
  <div class="parent">
    <child-2 v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import Child2 from './Child2.vue'
export default {
  components: { Child2 },
  name: 'Parent',
  mounted() {
    console.log('parent')
  }
}
</script>

<style lang="scss" scoped></style>
