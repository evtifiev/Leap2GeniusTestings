<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    border>
      <el-table-column
        label="Title"
        prop="testing.title">
      </el-table-column>
      <el-table-column
        label="Comment"
        prop="comment[0].commentText">
      </el-table-column>
      <el-table-column
        label="Add time"
        prop="addedTime">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Search to title"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleView(scope.$index, scope.row)">View
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "Passed",
    data() {
      return {
        tableData: [],
        search: '',
      }
    },
    methods: {
      loadData(){
        axios({url: `${process.env.API_URL}testings/passed/`, method: 'GET',
          headers: {'content-type': 'application/json'}
        }).then(resp => {
          resp.data.forEach((result, index) => {
            result.addedTime = new Date(result.addedTime).toLocaleString();
          });
          this.tableData = resp.data;
        })
          .catch(resp => {})
      },
      handleView(index, row) {
        this.$router.push({ name: 'result-view', params: { id: row.id } })
      },
      handleDelete(index, row) {
         var vm = this;
        axios({url: `${process.env.API_URL}testings/delete/${row.id}`, method: 'DELETE',
          headers: {'content-type': 'application/json'}
        }).then(resp => {
          vm.$message.success(resp.data[0]);
          this.loadData();
        })
          .catch(resp => {})
      }
    },
    created: function () {
     this.loadData();
    }
  }
</script>

<style scoped>

</style>
