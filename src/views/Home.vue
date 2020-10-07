<template>
  <div>
    <h1>Webpack4 & Vue2</h1>
    <div style="display: flex;">
      <a-button @click="count--">minus</a-button>
      <a-input v-model="count"/>
      <a-button @click="count++">plus</a-button>
    </div>
    <div style="padding: 10px;">
      <h2>{{ result }}</h2>
      <h2>{{ result2 }}</h2>
    </div>
  </div>
</template>

<script>
import {isArray} from "@/utils";

export default {
  name: "Home",
  data() {
    return {
      count: 20,
      result: isArray([]),
      result2: isArray({})
    }
  },
  created() {
    console.log(process.env.NODE_ENV);
  }
}
</script>

<style scoped lang="less">
h1 {
  padding: 10px;
  color: cornflowerblue;
  font-size: 30px;
}
</style>
