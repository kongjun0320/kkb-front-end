<template>
  <div class="course-add">
    <input v-model="course" type="text" @keydown.enter="_addCourse" />
    <!-- <button class="btn" @click="_addCourse">addCourse</button> -->
    <button :class="[$style.btn]" @click="_addCourse">addCourse</button>
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
  created() {
    // {btn: "CourseAdd_btn_2te4W"}
    // console.log(this.$style)
  },
  methods: {
    _addCourse() {
      this.$emit('add-course',this.course)
      this.course = ''
    }
  },
}
</script>

<style module>
  .btn {
    color: red;
  }
</style>
