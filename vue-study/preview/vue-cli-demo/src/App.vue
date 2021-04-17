<template>
  <div id="app">
    <h1>购物车</h1>
    <course-add @add-course="_addCourse" />
    <course-list :courses="courses" />
  </div>
</template>

<script>
import CourseList from './components/CourseList.vue'
import CourseAdd from './components/CourseAdd.vue'
import { getCourses } from './api'

export default {
  components: { CourseList, CourseAdd },
  name: 'App',
  data() {
    return {
      courses: []
    }
  },
  async created() {
    this.courses = await getCourses()
  },
  methods: {
    _addCourse(course) {
      this.courses.push({ name: course })
    }
  }
}
</script>

<style></style>
