<template>
  <div>
    <!-- 匿名 -->
    <p><slot></slot></p>
    <!-- 具名 -->
    <p><slot name="right"></slot></p>
    <!-- 作用域 -->
    <p><slot name="left" msg="msg"></slot></p>
  </div>
</template>

<script>
export default {
  name: 'KHeader'
}
</script>

<style lang="scss" scoped></style>
