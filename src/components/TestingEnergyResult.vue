<template>
    <div>
      <h2 style="text-align: center">The result of your test</h2>
      <el-table
        :data="energyData"
        border
        style="width: 100%">
        <el-table-column
      prop="level"
      label="N"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="EP_p"
      label="%">
    </el-table-column>
      </el-table>
       <div class="v-energy">
    <div class="chars" ref="chars">
          <progress-energy v-for="(item, index) in energyData" :stroke-width="25" :percentage="item.EP_p" color="rgba(99, 89, 107, 1)" :key="index"></progress-energy>
    </div>
  </div>
    <p style="text-align: center; text-size: 18px">You Average Consciousness Factor: {{ARL}}</p>
      <div style="text-align: center; padding: 20px 0" v-if="isLoggedIn && !saveResults">
         <el-button type="success" round @click="centerDialogVisible = true">Save result</el-button>
      </div>
      <el-dialog
      title="Add comment?"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form ref="form" :model="formComment" style="padding-top: 20px">
          <el-form-item>
              <el-input type="textarea" v-model="formComment.comment_text" placeholder="please enter a comment"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onSubmitSaveResults">No just save</el-button>
        <el-button type="primary" @click="onSubmitAddComment">Confirm</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import ProgressEnergy from '../components/ProgressEnergy';
export default {
  name: "ResultTesting",
  components: {ProgressEnergy},
  props: {
      testID: {
        type: Number,
        required: true
      },
      answers: {
        type: Array,
        required: true
      },
      saveRes: {
        type: Boolean,
        required: true
      }
  },
  data () {
    return{
      attemptId: 0,
      tableResults: [
            {
                name: 'ENLIGHTENMENT',
                level: 7,
                value: 0,
                counter: 0,
                Ai: 0,
                normalized_score: 0,
                Wi: 0.15,
                ESR: 0,
                EP: 0,
                ESR_p: 0,
                EP_p: 0,
                L_EP: 0,
                L_ESR: 0
            },{
                name: 'CREATIVITY',
                level: 6,
                value: 0,
                counter: 0,
                Ai: 0,
                normalized_score: 0,
                Wi: 0.15,
                ESR: 0,
                EP: 0,
                ESR_p: 0,
                EP_p: 0,
                L_EP: 0,
                L_ESR: 0
            },{
                name: 'EXPLORATION',
                level: 5,
                value: 0,
                counter: 0,
                Ai: 0,
                normalized_score: 0,
                Wi: 0.3,
                ESR: 0,
                EP: 0,
                ESR_p: 0,
                EP_p: 0,
                L_EP: 0,
                L_ESR: 0
            },{
                name: 'EXPANSION',
                level: 4,
                value: 0,
                counter: 0,
                Ai: 0,
                normalized_score: 0,
                Wi: 0.3,
                ESR: 0,
                EP: 0,
                ESR_p: 0,
                EP_p: 0,
                L_EP: 0,
                L_ESR: 0
            },{
                name: 'RATIONALISM',
                level: 3,
                value: 0,
                counter: 0,
                Ai: 0,
                normalized_score: 0,
                Wi: 0.3,
                ESR: 0,
                EP: 0,
                ESR_p: 0,
                EP_p: 0,
                L_EP: 0,
                L_ESR: 0
            },{
                name: 'PROTECTION',
                level: 2,
                value: 0,
                counter: 0,
                Ai: 0,
                normalized_score: 0,
                Wi: 1.5,
                ESR: 0,
                EP: 0,
                ESR_p: 0,
                EP_p: 0,
                L_EP: 0,
                L_ESR: 0
            },{
                name: 'SURVIVAL',
                level: 1,
                value: 0,
                counter: 0,
                Ai: 0,
                normalized_score: 0,
                Wi: 3,
                ESR: 0,
                EP: 0,
                ESR_p: 0,
                EP_p: 0,
                L_EP: 0,
                L_ESR: 0
            },
          ],
      energyData: [],
      ARL: 0,
      sum_ESR: 0,
      centerDialogVisible: false,
      formComment: {
        testing: this.testID,
        comment_text: ''
      },
    }
  },
  computed: {
    isLoggedIn: function () {
        return this.$store.getters.isLoggedIn
    },
    saveResults: function () {
      return this.saveRes;
    }
  },
  methods: {
    decimalAdjust: function(type, value, exp) {
      // Если степень не определена, либо равна нулю...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
      }
      value = +value;
      exp = +exp;
      // Если значение не является числом, либо степень не является целым числом...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // Сдвиг разрядов
      value = value.toString().split('e');
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
      // Обратный сдвиг
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    },
    round10: function(value, exp) {
      return this.decimalAdjust('round', value, exp);
    },
    sum: function(items, prop){
        return items.reduce( function(a, b){
            return a + b[prop];
        }, 0);
    },
    validation: function(){
          let data = [];
          this.tableResults.forEach((result, index) => {
            result.average = result.value / result.counter;
           });
          this.sumAverage  = this.sum(this.tableResults, 'average');
          this.tableResults.forEach((result, index) => {
                //
                result.Ai = result.average;
                result.EP = result.Ai / this.sumAverage;
                result.ESR = result.Ai * result.Wi;
                result.EP_p = this.round10(result.Ai / this.sumAverage * 100, -1);
          });
          this.sum_ESR  = this.sum(this.tableResults, 'ESR');
          this.tableResults.forEach((result, index) => {
                result.ESR_p = this.round10(result.ESR/this.sum_ESR * 100, -1);
                result.L_EP = this.round10(result.level * result.EP, -2);
                result.L_ESR = this.round10(result.level * result.ESR_p / 100, -2);
                data[index] = result;

          });
      let sum_L_EP = this.sum(data, 'L_EP');
      let sum_L_ESR = this.sum(data, 'L_ESR');
      this.ARL = ((sum_L_EP + sum_L_ESR) / 2).toFixed(2);
      return data;
    },
    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    preparation: function () {
      let vm = this;
      return vm.answers.forEach((answer, index) => {
            if(parseInt(answer.level) === 7){
              ++vm.tableResults[0].counter;
              vm.tableResults[0].value += parseInt(answer.answerOption) / 4 ;

            }
            else if(parseInt(answer.level) === 6){
              ++vm.tableResults[1].counter;
              vm.tableResults[1].value += parseInt(answer.answerOption) / 4;
            }
            else if(parseInt(answer.level) === 5){
              ++vm.tableResults[2].counter;
              vm.tableResults[2].value += parseInt(answer.answerOption) / 4;
            }
            else if(parseInt(answer.level) === 4){
              ++vm.tableResults[3].counter;
              vm.tableResults[3].value += parseInt(answer.answerOption) / 4;
            }
            else if(parseInt(answer.level) === 3){
              ++vm.tableResults[4].counter;
              vm.tableResults[4].value += parseInt(answer.answerOption) / 4;
            }
            else if(parseInt(answer.level) === 2){
              ++vm.tableResults[5].counter;
              vm.tableResults[5].value += parseInt(answer.answerOption) / 4;
            }
            else if(parseInt(answer.level) === 1) {
              ++vm.tableResults[6].counter;
              vm.tableResults[6].value += parseInt(answer.answerOption) / 4;
            }
          })
    },
    onSubmitSaveResults: function (){
        let vm = this;
        let saveData = this.answers.map(function(answer) {
          return {
            testing: vm.testID,
            question: answer.question,
            answer: answer.id,
            answer_option: answer.answerOption,
            level: answer.level,
            attempt: vm.attemptId
          }
        });
        let data = {
           "test_id": vm.testID,
           "attempt_id": vm.attemptId,
           "answers": saveData,
         };
        axios({url: `${process.env.API_URL}testings/save/`, data: data, method: 'POST',
          headers: {'content-type': 'application/json'}
        }).then(resp => {
          vm.centerDialogVisible = false;
          vm.$message.success('You results save success!');
        })
          .catch(resp => {
            vm.$message.error('You results not save!');
          })

    },
    onSubmitAddComment: function (){
      var vm = this;
        if (!vm.formComment.comment_text) {
          vm.$message.error('Please enter comment text');
          return;
        }
        vm.isBtnLoading = false;
        let data = JSON.stringify(vm.formComment);
        axios({url: `${process.env.API_URL}testings/comment/`, data: data, method: 'POST',
          headers: {'content-type': 'application/json'}
        }).then(resp => {
          vm.attemptId = resp.data['attemptId'];
          vm.$message.success('You comment save success!');
          vm.onSubmitSaveResults();
        })
          .catch(resp => {
            vm.$message.error('You comment not save!');
          })

    },
  },
  created: function () {
    if (this.$props.answers) {
      this.preparation();
      this.energyData = this.validation();
    }
  }

}
</script>

<style scoped>
.el-table--border{
  margin-bottom: 30px;
}
  .v-energy{
    text-align: center;
    margin: auto;
    min-height: 616px;
    background: #fff url(../assets/chart-energy.png) no-repeat center center;
  }
  .chars{
    width: 50%;
    padding-top: 14%;
    padding-left: 6.3%;
  }
</style>
