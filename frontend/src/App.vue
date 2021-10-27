<script setup lang="ts">
import { ElContainer, ElHeader, ElMain } from "element-plus"
import { defineComponent } from "vue";

defineComponent({
  components: {
    ElContainer,
    ElHeader,
    ElMain
  }
})
</script>

<template>
  <el-container>
    <el-header>Staff CRUD System</el-header>
    <el-main>This will be the CRUD Stuff</el-main>
  </el-container>
</template>

<style>
</style>
