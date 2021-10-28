<template>
  <div class="warp_body">
      <el-card class="msg_card">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="sqlcontent"
          clearable
          :autosize="{ minRows: 4, maxRows: 6 }"
        >
        </el-input>
        <el-button type="primary" @click="setSQL" class="btn_signup">ConnectSQL</el-button>
        <el-button type="primary" @click="clearData" class="btn_signup">clearData</el-button>
        <el-button type="primary" @click="transaction" class="btn_signup">transaction</el-button>
      </el-card>
      <el-card class="master_card">
        <el-card class="tree_card">  
          <tree :treeData="treeData" @getTableData="getTableData"></tree>
        </el-card>
        <el-card class="table_card">  
          <!-- <tree :treeData="treeData" @getTableData="getTableData"></tree> -->
          <nttable :tableData="tableData"></nttable>
        </el-card>
      </el-card>
  </div>
</template>

<script>
import tree from '../components/tree'
import nttable from '../components/table'
import userApi from '../api/userApi.js'
export default {
  components: {
    tree,
    nttable
  },
  data() {
    return {
      sqlcontent: '',
      treeData: [],
      tableData: [],
    }
  },
  methods: {
    async setSQL(){
      console.log('this.tableData', this.tableData);
      const res = await userApi.setSQL({sqlcontent: this.sqlcontent});
      this.tableData = res.data.data;
      // SELECT * FROM information_schema.ENGINES
    },
    async getDatabaseTree(){
      const res = await userApi.getDatabaseTree();
      if(res.data.meta.code == '200'){
        this.treeData = res.data.data;
      }
    },
    clearData() {
      this.tableData = [];
    },

    getTableData(data){
      this.tableData = data;
    },

    // 开事务模式
    async transaction(){
      const res = await userApi.transaction(this.sqlcontent.split(';\n').splice(this.sqlcontent.split(';\n').length - 1, 1));
      if(res.data.meta.code == '200'){
        console.log('成功啦');
      }
    },

  },
  created() {
    this.getDatabaseTree();
  },
}
</script>

<style>
.warp_body{
    background-image: linear-gradient(120deg , #ffffff , #a4f4fa);
    min-width: 1200px;
    width: 100%;
    height: auto;
    padding: 0 20px;
    margin: 0 auto;
    clear: both;
    position: absolute;
}
.master_card{
    width: 90%;
    min-height: 600px;
    height: auto;
    margin: 100px auto;
    margin-top: 20px;
    background: rgb(255 255 255 / 54%);
}
.tree_card{
    width: 30%;
    background: rgb(255 255 255 / 54%);
    float: left;
}
.table_card{
    width: 68%;
    background: rgb(255 255 255 / 54%);
    float: right;
    height: 80%;
}
.msg_card{
    width: 90%;
    height: 200px;
    margin: 70px auto;
    margin-bottom: 20px;
    background: rgb(255 255 255 / 54%);
}
.el-timeline-item__timestamp.is-top {
    margin-bottom: 8px;
    padding-top: 4px;
    margin-left: auto;
    position: relative;
    left: -220px;
}
.el-timeline-item__timestamp {
    color: #6d8f92;
    line-height: 1;
    font-size: 13px;
}

.btn_signup{
    background: rgb(255 255 255 / 54%);
    color:#409EFF;
    margin-top: 20px;
}
</style>