<template>
    <div>
      <h2 style="text-align: center">The result of your test</h2>
      <h3>Profile: {{profileName}}</h3>
      <el-table
        :data="tableData"
        :summary-method="getSummaries"
        show-summary
        sum-text="Total"
        border
        style="width: 100%">
        <el-table-column
          prop="shortName"
          label="Summary"
          width="180">
        </el-table-column>
        <el-table-column
          prop="value"
          label=""
          width="180">
        </el-table-column>
        <el-table-column
          prop="percent"
          label="%">
        </el-table-column>
        <el-table-column
          prop="shortName"
          label="%">
        </el-table-column>
      </el-table>
      <radar
        :stats="radarData"
    :polycolor="polycolor"
    :radar="radar"
    :scale="scale"></radar>
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
export default {
  name: "ResultTesting",
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
                name: 'spring',
                value: 0,
                shortName: 'Spring',
            },
            {
                name: 'summer',
                value: 0,
                shortName: 'Summer'
            },
            {
                name: 'autumn',
                value: 0,
                shortName: 'Autumn'
            },
            {
                name: 'winter',
                value: 0,
                shortName: 'Winter'
            },
      ],
      rawResults: [
            {
                name: 'spring',
                value: 0,
                shortName: 'IDEATOR',
            },
            {
                name: 'projector',
                value: 0,
                shortName: 'PROJECTOR',
            },
            {
                name: 'summer',
                value: 0,
                shortName: 'ENGAGER'
            },
            {
                name: 'connector',
                value: 0,
                shortName: 'CONNECTOR'
            },
            {
                name: 'autumn',
                value: 0,
                shortName: 'IMPLEMENTOR'
            },
            {
                name: 'collector',
                value: 0,
                shortName: 'COLLECTOR'
            },
            {
                name: 'winter',
                value: 0,
                shortName: 'BUILDER'
            },
            {
                name: 'fixer',
                value: 0,
                shortName: 'FIXER'
            },
      ],
      radarData: [],
      centerDialogVisible: false,
      formComment: {
        testing: this.testID,
        comment_text: ''
      },
      radar: {
        size: '600',
        radius: '340',
        structure: {
          external: {                             // external stroke of the structure's polygon
            strokeColor: 'rgba(0, 0, 0, 1)',    // color (any css format is usable (hexa, rgb, rgba...))
            strokeWidth: '0',                   // pixel unit
          },
          average: {                              // average polygon (placed at 50%)
                    strokeColor: 'rgba(0, 0, 0, .5)',    // stroke color (any css format is usable (hexa, rgb, rgba...))
                    strokeWidth: '0.1',                   // pixel unit
                    fillColor: 'rgba(255, 255, 255, 0.1)',     // polygon color (any css format is usable (hexa, rgb, rgba...))
                },
        }
      },                          // empty object is mandatory
        scale: {                                        // scales of corresponding statistic

        },                          // empty object is mandatory
        polycolor: 'rgba(255, 84, 27, 0.8)' // any css format is usable (hexa, rgb, rgba...)
    }
  },
  computed: {
    tableData: function () {
      let sumQuestion = this.sum(this.tableResults, 'value');
      let data = [];
      this.tableResults.forEach((result, index) => {
            result.percent = Math.round((100 * result.value) / sumQuestion);
            data[index] = result;
          });
      return data;

    },
    profileName: function () {
      return this.max(this.radarData, 'value').shortName
    },
    isLoggedIn: function () {
        return this.$store.getters.isLoggedIn
    },
    saveResults: function () {
      return this.saveRes;
    }
  },
  methods: {
    getSummaries: function (param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        });
        if(sums[2] !== 100){
          sums[2] = 100;
        }
        return sums;
      },
    sum: function(items, prop){
        return items.reduce( function(a, b){
            return a + b[prop];
        }, 0);
    },
    max: function(items, prop){
      return items.reduce(function (prev, current) {
         return (prev.value > current.value) ? prev : current
      });
    },
    validation: function(){
      let sumQuestion = this.sum(this.rawResults, 'value');
      let data = [];
      this.rawResults.forEach((result, index) => {
            result.percent = Math.round((100 * result.value) / sumQuestion);
            data[index] = result;
          });
      // Разница в процентах
      try {
         if ((data[0].percent === data[2].percent) || (Math.round(data[0].percent / data[2].percent * 100) === 8)){
          data[1].value = (data[0].value + data[2].value) / 2;
          data[1].percent = (data[0].percent + data[2].percent) / 2;
        }
        if ((data[2].percent === data[4].percent) || (Math.round(data[2].percent / data[4].percent * 100) === 8)){
          data[3].value = (data[2].value + data[4].value) / 2;
          data[3].percent = (data[2].percent + data[4].percent) / 2;
        }
        if ((data[4].percent === data[6].percent) || (Math.round(data[4].percent / data[6].percent * 100) === 8)){
          data[5].value = (data[4].value + data[6].value) / 2;
          data[5].percent = (data[4].percent + data[6].percent) / 2;
        }
        if ((data[6].percent === data[0].percent) || (Math.round(data[6].percent / data[0].percent * 100) === 8)){
          data[7].value = (data[4].value + data[6].value) / 2;
          data[7].percent = (data[4].percent + data[6].percent) / 2;
        }
      }
      catch (e) {
         // инструкции для работы с ошибками
         console.log(e); // передает объект ошибки для управления им
      }
      return data;
    },
    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    preparation: function () {
      return this.answers.forEach((answer, index) => {
        if(answer.answerOption === 'spring'){
          ++this.rawResults[0].value;
          ++this.tableResults[0].value;
        }
        else if(answer.answerOption === 'summer'){
          ++this.rawResults[2].value;
          ++this.tableResults[1].value;
        }
        else if(answer.answerOption === 'autumn'){
          ++this.rawResults[4].value;
          ++this.tableResults[2].value;
        }
        else{
          ++this.rawResults[6].value;
          ++this.tableResults[3].value;
        }
      })
    },
    onSubmitSaveResults: function (){
        let vm = this;
         let saveData = this.answers.map(function(answer) {
            return {
              question: answer.question,
              answer: answer.id,
              answer_option: answer.answerOption,
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
    this.preparation();
    this.radarData = this.validation();
  }

}
</script>

<style scoped>
.el-table--border{
  margin-bottom: 30px;
}
</style>
