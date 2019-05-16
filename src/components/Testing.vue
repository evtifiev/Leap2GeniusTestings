<template>
  <div>
    <div v-for="(question, index) in testing.questions">
      <el-card
              v-show="index === questionIndex"
              class="question">
        <div slot="header" class="clearfix">
          <h3>{{question.content}}</h3>
          <div  class="counter">Question {{questionIndex + 1}} of {{testing.questions.length}}</div>
        </div>
        <el-row :gutter="20">
          <el-col :span="6">
            &nbsp;
          </el-col>
          <el-col :span="12">
            <el-radio-group v-model="userAnswers[index]" size="small">
              <el-radio
                class="answer"
                v-for="(item, index) in question.answers"
                :key="item.id"
                :label="item"
              >{{item.answerText}}</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            &nbsp;
            <el-button class="prev" icon="el-icon-arrow-left" v-if="questionIndex > 0" v-on:click="prev" size="medium">Prev</el-button>
          </el-col>
          <el-col :span="10">
            <el-button v-on:click="next" size="medium" class="next" :disabled="typeof userAnswers[index] !== 'object'">Next<i class="el-icon-arrow-right el-icon-right"></i></el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-card shadow="never" v-show="questionIndex === testing.questions.length"
            class="text-center" header="Testing finished" v-if="!showResult">

      <p>
        Total score: {{ score() }} / {{ testing.questions.length }}
        <el-button v-on:click="show" size="medium">To see the result</el-button>
      </p>
    </el-card>
    <el-card v-if="showResult">
      <testing-radar-result v-bind:testID="testing.id" v-bind:answers="userAnswers" v-bind:saveRes="false" v-if="testing.category === 1"></testing-radar-result>
      <testing-energy-result v-bind:testID="testing.id" v-bind:answers="userAnswers" v-bind:saveRes="false" v-if="testing.category === 2"></testing-energy-result>
    </el-card>
    </div>
</template>
<script>
  import TestingRadarResult from './TestingRadarResult';
  import TestingEnergyResult from './TestingEnergyResult';
  export default {
    name: "Quiz",
    components: {TestingRadarResult, TestingEnergyResult},
    props: {
      testing: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        questionIndex: 0,
        userAnswers: [],
        showResult: false,
        comments: {}
      };
    },
    methods: {
      next() {
        this.questionIndex++;
      },
      add(val) {
        console.log(val);
      },
      prev() {
        this.questionIndex--;
      },
      show(){
        this.showResult = true;
      },
      score() {
        return this.userAnswers.filter(function (val) {
          return val
        }).length;
      }
    }
  };
</script>

<style scoped>
  .counter{
    position: relative;
    bottom: 40px;
    float: right;
    padding: 3px 0;
  }
  .answer{
    margin: 5px 0;
    width: 100%;
  }
  .prev {
    margin-top: 10px;
    float: right;
  }
  .next {
    margin-top: 10px;
    float: left;
  }
</style>
