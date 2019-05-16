<template>
  <div class="page-test">
    <el-card class="box-card" shadow="never" v-if="showCard">
      <h2>{{testing.title}}</h2>
      <p style="text-align: left">{{testing.description}}
      </p>
      <el-button type="success" round @click="startTest">Take test</el-button>
    </el-card>
    <spelling-test v-bind:testing="testing" v-if="showTest"></spelling-test>
  </div>
</template>

<script>
  import axios from 'axios'
  import spellingTest from '../components/Testing';

  export default {
    name: "AuthenticateUserTestStart",
    components: {spellingTest},
    data() {
      return {
        showCard: true,
        showTest: false,
        testing: {},
      };
    },
    methods: {
      startTest() {
        this.showCard = false;
        this.showTest = true;
      },
      loadData(){
        axios({url: `${process.env.API_URL}testings/${this.$route.params.id}/`, method: 'GET',
          headers: {'content-type': 'application/json'}
        }).then(resp => {
          let data = resp.data[0];
          data.questions = data.questions.sort( () => Math.random() - 0.5);
          if(parseInt(resp.data[0].category) === 1){
            data.questions.forEach((question, index) => {
              data.questions[index].answers = question.answers.sort( () => Math.random() - 0.5)
            });
          }
          this.testing = data;
        })
          .catch(resp => {})
      }
    },
    created() {
      this.loadData();
    }
  }
</script>

<style>
  .page-test .box-card {
    text-align: center;
  }
</style>
