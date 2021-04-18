<template>
  <div class="course-list">
    <template v-if="courses.length">
      <div
        class="item"
        :class="{ active: selectedCourse === course }"
        v-for="(course, index) in courses"
        :key="index"
        @click="selectCourse(course)"
      >
        <!-- <router-link :to="`/admin/course/${course.name}`">{{
          course.name
        }}</router-link> -->
        {{ course.name }}
      </div>
    </template>
    <div v-else>暂无课程</div>
  </div>
</template>

<script>
export default {
  name: 'CourseList',
  props: {
    courses: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler() {
        console.log('获取详情')
      }
    }
  },
  created() {
    console.log('created')
  },
  data() {
    return {
      selectedCourse: ''
    }
  },
  methods: {
    selectCourse(course) {
      this.selectedCourse = course
      this.$router.push({ name: 'detail', params: { name: course.name } })
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  cursor: pointer;
  .active {
    color: royalblue;
  }
}
</style>
