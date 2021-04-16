<template>
  <div id="app">
    <h1>购物车</h1>
    <course-list :courses="courses" />
  </div>
</template>

<script>
import CourseList from './components/CourseList.vue'
import { getCourses } from './api'

export default {
  components: { CourseList },
  name: 'App',
  data() {
    return {
      courses: []
    }
  },
  async created() {
    this.courses = await getCourses()
  }
}
</script>

<style></style>
