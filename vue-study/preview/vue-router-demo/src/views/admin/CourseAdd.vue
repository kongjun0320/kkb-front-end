<template>
  <div class="course-add">
    <input v-model="course" type="text" @keydown.enter="_addCourse" />
    <button @click="_addCourse">addCourse</button>
  </div>
</template>

<script>
export default {
  name: 'CourseAdd',
  data() {
    return {
      course: ''
    }
  },
  methods: {
    _addCourse() {
      this.$emit('add-course', this.course)
      this.course = ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
