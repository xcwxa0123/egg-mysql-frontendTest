<template>
  <div class="warp_body">
      <!-- <el-button type="primary" class="btn_signup pab l50" @click="back2Login">回到首页</el-button> -->
      <el-card class="msg_card">
      </el-card>
      <el-card class="master_card">
            <el-card class="item_card">
                <el-button type="primary" class="btn_signup" @click="jumpTo('toolPage')">工具页</el-button>
            </el-card>
            <el-card class="item_card">
                <el-button type="primary" class="btn_signup" @click="jumpTo('home')">SQL</el-button>
            </el-card>
      </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    jumpTo(name) {
        const target = this.$router.resolve({ name })
        window.location.href = target.href
    }
  },
  created() {
    
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
.msg_card{
    width: 90%;
    height: 200px;
    margin: 70px auto;
    margin-bottom: 20px;
    background: rgb(255 255 255 / 54%);
}
.item_card{
    width: 30%;
    height: 200px;
    /* margin: 70px auto; */
    margin-bottom: 20px;
    background: rgb(255 255 255 / 10%);
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
    width: 100%;
    height: 150px;
    /* margin-top: 20px; */
}
.pab{
  position: absolute;
}
.l50{
  left: 50px;
}
</style>