<template>
  <div>
    <course-add @add-course="_addCourse" />
    <course-list :courses="courses" />
    <router-view></router-view>
  </div>
</template>

<script>
import { getCourses } from '../../api'
import CourseAdd from './CourseAdd.vue'
import CourseList from './CourseList.vue'
export default {
  components: { CourseAdd, CourseList },
  name: 'Admin',
  data() {
    return {
      courses: []
    }
  },
  mounted() {
    this._gerCourses()
  },
  // beforeRouteEnter(to, _from, next) {
  //   if (!window.isLogin) {
  //     next(`/login?redirect=${to.fullPath}`)
  //   } else {
  //     next()
  //   }
  // },
  methods: {
    _gerCourses() {
      getCourses().then((res) => {
        this.courses = res.data
      })
    },
    _addCourse(course) {
      this.courses.push({ name: course })
    }
  }
}
</script>

<style lang="scss" scoped></style>
