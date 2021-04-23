<template>
  <div>
    <child2 />
    <!-- <child1 ref="child1" /> -->
    <!-- <child2 v-for="v in 2" :key="v" ref="child2" /> -->
    <!-- <parent @foo="handleFoo" :msg="'msg from grandpa'" /> -->
  </div>
</template>

<script>
import Child1 from '../components/communication/Child1'
import Child2 from '../components/communication/Child2'
import Parent from '../components/communication/Parent.vue'
export default {
  name: 'Communication',
  components: {
    Child1,
    Child2,
    Parent
  },
  provide: {
    bar: 'bar'
  },
  mounted() {
    console.log('communication')
    // console.log(
    //   '$children ===== ',
    //   this.$children,
    //   this.$children[0].$options.name
    // )
    // console.log(
    //   '$ref ====== ',
    //   this.$refs.child1.$options.name,
    //   this.$refs.child2[0].$options.name
    // )
  },
  methods: {
    handleFoo(msg) {
      console.log('msg: ', msg)
    }
  }
}
</script>

<style lang="scss" scoped></style>
