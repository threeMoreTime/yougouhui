<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <Recommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="(item, index) in result" :key="index" :list="item" />
    <!--楼层-->
    <Floor />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import { getfloorlist } from "@/api";
import { mapState } from "vuex";

import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
import ListContainer from "./ListContainer";
import Rank from "./Rank/";
import Recommend from "./Recommend";
export default {
  name: "Home",
  data() {
    return {
      result: [],
    };
  },
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    Recommend,
  },
  mounted() {
    this.getarray();
    // 获取用户信息展示
    this.$store.dispatch("getUserInfo");
  },
  methods: {
    getarray() {
      getfloorlist().then((res) => {
        // this.result= res.data
        if (res.code == "200") {
          this.result = res.data;
        }
      });
    },
  },
};
</script>

<style></style>
