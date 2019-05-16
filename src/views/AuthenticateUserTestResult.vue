<template>
  <div>
    <el-card v-if="showResult">
      <testing-radar-result v-bind:testID="parseInt(testID)" v-bind:answers="userAnswers" v-bind:saveRes="true" v-if="type === 'Radar'"></testing-radar-result>
      <testing-energy-result v-bind:testID="parseInt(testID)" v-bind:answers="userAnswers" v-bind:saveRes="true" v-if="type === 'Energy'"></testing-energy-result>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios';
  import TestingRadarResult from '../components/TestingRadarResult';
  import TestingEnergyResult from '../components/TestingEnergyResult';

  export default {
    name: "AuthenticateUserTestResult",
    components: {TestingRadarResult, TestingEnergyResult},
    data() {
      return {
        testID: this.$route.params.id,
        userAnswers: [],
        showResult: false,
        type: ''
      };
    },
    methods: {
      loadData(){
        axios({url: `${process.env.API_URL}testings/passed/${this.$route.params.id}`, method: 'GET',
          headers: {'content-type': 'application/json'}
        }).then(resp => {
          this.type = resp.data.testingType;
          this.userAnswers = resp.data.data;
          this.showResult = true;
        })
          .catch(resp => {})
      }
    },
    created() {
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
