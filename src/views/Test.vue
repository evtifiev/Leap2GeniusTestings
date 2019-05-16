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
    name: "Test",
    components: {
      spellingTest: spellingTest
    },
    data() {
      return {
        showCard: true,
        showTest: false,
        testing: {},
        testing1: {
          title: 'My test',
          questions: [
            {
              text: "When you were a child how did you like to spend your time?",
              responses: [
                {text: 'Did you like to take apart and study things', answer: 'Winter'},
                {text: 'Did you like to gather your friends together', answer: 'Summer'},
                {text: 'Did you know how your friends feel without asking them', answer: 'Autumn'},
                {text: 'Did you prefer to be in your imaginary world to the real one', answer: 'Spring'},
              ]
            }, {
              text: "What did you resist the most as a child?",
              responses: [
                {text: 'Being pulled away from building an elaborate project ', answer: 'Winter'},
                {text: 'Having to leave playing with a group of friends', answer: 'Summer'},
                {text: 'Being pulled away from your friend while you shared your feelings', answer: 'Autumn'},
                {text: 'Being told to stop dreaming', answer: 'Spring'},
              ]
            }, {
              text: "How did your best friends experienced you as a child?",
              responses: [
                {text: 'The one who naturally attracted lots of friends ', answer: 'Summer'},
                {text: 'The one they could cry with', answer: 'Autumn'},
                {text: 'The one who always asked how things work', answer: 'Spring'},
                {text: 'The one who always had ideas about what to do', answer: 'Winter'},
              ]
            }
          ]
        }
      }
    },
    methods: {
      startTest() {
        this.showCard = false;
        this.showTest = true;
      },
      loadData() {
        axios({url: `${process.env.API_URL}testings/one`, method: 'GET',
          headers: {'content-type': 'application/json'}
        }).then(resp => {
          let data = resp.data[0];
          data.questions = data.questions.sort( () => Math.random() - 0.5);
          data.questions.forEach((question, index) => {
            data.questions[index].answers = question.answers.sort( () => Math.random() - 0.5)

          });
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
