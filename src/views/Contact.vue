<template>
  <div>
    <h1>{{ content }}</h1>
  </div>


</template>

<script>
  export default {
    name: "Contact",
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
    }
  }
</script>

<style scoped>

</style>
