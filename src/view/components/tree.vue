<template>
  <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
</template>

<script>
  import userApi from '../api/userApi.js'
  export default {
    props: ['treeData'],
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      async handleNodeClick(data) {
        if(data.level === 'table'){
            const res = await userApi.getTableData(data);
            this.$emit('getTableData', res.data.data);
        }
      }
    }
  };
</script>
<style scoped>
.el-tree {
    background: rgb(255 255 255 / 0%);
}

</style>