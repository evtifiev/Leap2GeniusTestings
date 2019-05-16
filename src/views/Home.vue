<template>
    <h1>{{ content }}</h1>

</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
              content: '',
            };
        },
      // watch: {
      //   // эта функция запускается при любом изменении вопроса
      //   content: function () {
      //     this.content = this.$store.getters.getPageByAccessUrl('/main').content;
      //   }
      // },
      methods: {
      },
      mounted() {
          window.addEventListener('load', () => {
                let page = this.$store.getters.getPageByAccessUrl('/home');
                document.title = page.title;
                this.content = page.content;
          });
      }
    }
</script>

<style scoped>

</style>
