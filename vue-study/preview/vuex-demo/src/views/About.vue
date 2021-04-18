<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>{{ $store.getters }}</h3>
    <h3>{{ welcome }}</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'About',
  computed: {
    // ...mapGetters('user', {
    //   welcome: 'welcome'
    // })
    ...mapGetters({
      welcome: 'user/welcome'
    })
  }
}
</script>
