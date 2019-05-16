<template>
  <h1>{{ content }}</h1>

</template>

<script>
  export default {
    name: "About",
    data() {
      return {
        info: {}
      };
    },
    computed: {
      content: function () {
        let page = this.$store.getters.getPageByAccessUrl(window.location.pathname);
        document.title = page.title;
        return page.content
      }
    },
  }
</script>

<style scoped>

</style>
