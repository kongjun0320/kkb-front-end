<template>
  <div id="app">
    <img width="100" src="./assets/universe.jpg" alt="" />
    <!-- / 代表当前静态服务器的目录 -->
    <img width="100" src="/assets/universe.jpg" alt="" />
    <h1 class="title">购物车</h1>
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

<style lang="scss" scoped>
// @import './styles/variables.scss';
// .title {
//   // color: $color-primary;
//   // color: red;
// }
// #app::v-deep .btn {
//   color: red;
// }
</style>
