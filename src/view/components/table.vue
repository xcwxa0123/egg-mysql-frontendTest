<template>
  <el-table
    :data="tableData.dataList"
    border
    style="width: 100%;"
  >
    <el-table-column
      v-for="item in tableData.nameList"
      :key="item"
      :prop="item"
      :label="item"
      width="150px"
    >
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['tableData'],
  }
</script>
<style scoped>
.el-table{
    background: rgb(255 255 255 / 0%);
}
.el-table /deep/ .cell {
    white-space: nowrap;
    max-height: 23px;
}
</style>