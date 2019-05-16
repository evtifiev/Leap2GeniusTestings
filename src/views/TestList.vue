<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    border>
      <el-table-column
      prop="category"
      label="Category"
      width="100"
      :filters=filters
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.category.category === 'Home' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.category.category}}</el-tag>
      </template>
    </el-table-column>
      <el-table-column
        label="Title"
        prop="title">
      </el-table-column>
      <el-table-column
        label="Description"
        prop="description">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleTesting(scope.$index, scope.row)">Start test
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "Results",
    data() {
      return {
        tableData: [],
        search: '',
      }
    },
    computed: {
      filters: function () {
        let tags = [];
        this.tableData.forEach((filter, index) => {
          tags.push(new Object({ text: filter.category.category, value: filter.category.category }))
        });
        return tags;
      }
    },
    methods: {
      loadData(){
        axios({url: `${process.env.API_URL}testings/list/`, method: 'GET',
          headers: {'content-type': 'application/json'}
        }).then(resp => {
          this.tableData = resp.data;
        })
          .catch(resp => {})
      },
      handleTesting(index, row) {
        this.$router.push({ name: 'test-start', params: { id: row.id } })
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterCategory(value, row) {
        return row.category === value;
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value;
      }
    },
    created: function () {
     this.loadData();
    }
  }
</script>

<style scoped>

</style>
