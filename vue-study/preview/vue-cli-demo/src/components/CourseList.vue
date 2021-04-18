<template>
  <div>
    <template v-if="courses.length">
      <div
        class="item"
        :class="{ active: selectedCourse === course }"
        v-for="(course, index) in courses"
        :key="index"
        @click="selectedCourse = course"
      >
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
  data() {
    return {
      selectedCourse: ''
    }
  }
}
</script>

<style lang="scss">
div {
  &.active {
    color: aqua;
  }
}

.item {
  line-height: 1.5;
}
</style>
