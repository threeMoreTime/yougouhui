<template>
  <div>
    <h1>Search Results</h1>
    <p>Category Name: {{ $route.query.categoryName }}</p>
    <p>Category ID: {{ $route.query.category1id || $route.query.category2Id || $route.query.category3Id }}</p>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style></style>
