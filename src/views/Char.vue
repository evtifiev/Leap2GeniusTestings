<template>
  <div>
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
      prop="percent"
      label="%">
    </el-table-column>
  </el-table>
  <div class="v-energy">
    <div class="chars" ref="chars">
          <progress-energy v-for="(item, index) in energyData" :stroke-width="25" :percentage="item.percent" color="rgba(99, 89, 107, 1)" :key="index"></progress-energy>
    </div>
  </div>
    <p style="text-align: center; text-size: 18px">You Average Consciousness Factor: {{sumQuestion}}</p>
  </div>
</template>

<script>
  import ProgressEnergy from '../components/ProgressEnergy';
    export default {
      name: "Char",
      components: {ProgressEnergy},
      data() {
        return {
          leftColStyles: { },
          tableResults: [
            {
                name: 'ENLIGHTENMENT',
                level: 7,
                value: 0,
                counter: 0,
                percent: 0,
            },{
                name: 'CREATIVITY',
                level: 6,
                value: 0,
                counter: 0,
                percent: 0
            },{
                name: 'EXPLORATION',
                level: 5,
                value: 0,
                counter: 0,
                percent: 0
            },{
                name: 'EXPANSION',
                level: 4,
                value: 0,
                counter: 0,
                percent: 0
            },{
                name: 'RATIONALISM',
                level: 3,
                value: 0,
                counter: 0,
                percent: 0
            },{
                name: 'PROTECTION',
                level: 2,
                value: 0,
                counter: 0,
                percent: 0
            },{
                name: 'SURVIVAL',
                level: 1,
                value: 0,
                counter: 0,
                percent: 0
            },
          ],
          energyData: [],
          sumQuestion: 0,
          answers: [
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 367,
              level: 5,
              question: 101
            },
            {
              answerOption: "4",
              answerText: "completely true",
              id: 190,
              level: 1,
              question: 65
            },
            {
              answerOption: "3",
              answerText: "very true",
              id: 164,
              level: 1,
              question: 60
            },
            {
              answerOption: "2",
              answerText: "somewhat true",
              id: 258,
              level: 3,
              question: 79
            },
            {
              answerOption: "4",
              answerText: "completely true",
              id: 220,
              level: 2,
              question: 71
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 267,
              level: 3,
              question: 81
            },
            {
              answerOption: "0",
              answerText: "completely untrue",
              id: 251,
              level: 3,
              question: 78
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 327,
              level: 4,
              question: 93
            },
            {
              answerOption: "4",
              answerText: "completely true",
              id: 245,
              level: 2
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 302,
              level: 4,
              question: 88
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 307,
              level: 4,
              question: 89
            },
            {
              answerOption: "2",
              answerText: "somewhat true",
              id: 398,
              level: 5,
              question: 107,
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 297,
              level: 3,
              question: 87
            },
            {
              answerOption: "2",
              answerText: "somewhat true",
              id: 173,
              level: 1,
              question: 62
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 357,
              level: 5,
              question: 99
            },
            {
              answerOption: "4",
              answerText: "completely true",
              id: 210,
              level: 2,
              question: 69
            },
            {
              answerOption: "2",
              answerText: "somewhat true",
              id: 203,
              level: 2,
              question: 68
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 362,
              level: 5,
              question: 100
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 182,
              level: 1,
              question: 64
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 412,
              level: 6,
              question: 110
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 292,
              level: 3,
              question: 86
            },
            {
              answerOption: "4",
              answerText: "completely untrue",
              id: 126,
              level: 0,
              question: 53
            },
            {
              answerOption: "1",
              answerText: "somewhat untrue",
              id: 422,
              level: 6,
              question: 112
            },
            {
              answerOption: "4",
              answerText: "completely true",
              id: 345,
              level: 4,
              question: 96
            },
            {
              answerOption: "2",
              answerText: "somewhat true",
              id: 373,
              level: 5,
              question: 102
            },
            {
              answerOption: "4",
              answerText: "completely true",
              id: 420,
              level: 6,
              question: 111
            },
            {
              answerOption: "4",
              answerText: "completely true",
              id: 110,
              level: 2,
              question: 49,
            },
            {
              answerOption: "4",
              answerText: "completely true",
              id: 160,
              level: 1,
              question: 59,
            },
            {
              answerOption: "0",
              answerText: "completely untrue",
              id: 401,
              level: 6,
              question: 108
            },
            {
              answerOption: "4",
              answerText: "completely true",
              id: 450,
              level: 6,
              question: 117
            },
            {
              answerOption: "2",
              answerText: "somewhat true",
              id: 248,
              level: 2,
              question: 77
            }

          ]
        }
      },
      methods: {
        sum: function(items, prop){
          return items.reduce( function(a, b){
              return a + b[prop];
          }, 0);
        },
        validation: function(){
          this.sumQuestion  =  this.sum(this.tableResults, 'value') / 7;
          let data = [];
          this.tableResults.forEach((result, index) => {
                result.percent = Math.round((100 * result.value) / 28);
                data[index] = result;
              });
          return data;
        },
        preparation: function () {
          return this.answers.forEach((answer, index) => {
            if(answer.level === 7){
              ++this.tableResults[0].counter;
              this.tableResults[0].value += parseInt(answer.answerOption);
            }
            else if(answer.level === 6){
              ++this.tableResults[1].counter;
              this.tableResults[1].value += parseInt(answer.answerOption);
            }
            else if(answer.level === 5){
              ++this.tableResults[2].counter;
              this.tableResults[2].value += parseInt(answer.answerOption);
            }
            else if(answer.level === 4){
              ++this.tableResults[3].counter;
              this.tableResults[3].value += parseInt(answer.answerOption);
            }
            else if(answer.level === 3){
              ++this.tableResults[4].counter;
              this.tableResults[4].value += parseInt(answer.answerOption);
            }
            else if(answer.level === 2){
              ++this.tableResults[5].counter;
              this.tableResults[5].value += parseInt(answer.answerOption);
            }
            else if(answer.level === 1){
              ++this.tableResults[6].counter;
              this.tableResults[6].value += parseInt(answer.answerOption);
            }
          })
        },
      },
       created: function () {
        this.preparation();
        this.energyData = this.validation();
      }

    }
</script>

<style>
  .v-energy{
    text-align: center;
    margin: auto;
    min-height: 616px;
    background: #fff url(../assets/chart-energy.png) no-repeat center center;
  }
  .chars{
    width: 50%;
    padding-top: 13%;
    padding-left: 7%;
  }
</style>
