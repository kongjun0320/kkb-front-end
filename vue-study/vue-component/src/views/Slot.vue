<template>
  <div>
    <k-header>
      hello
      <template v-slot:right>right</template>
      <template v-slot:left="slotProps">left={{ slotProps.msg }}</template>
    </k-header>
  </div>
</template>

<script>
import KHeader from '../components/slot/Header'
export default {
  name: 'SlotDemo',
  components: {
    KHeader
  }
}
</script>

<style lang="scss" scoped></style>
