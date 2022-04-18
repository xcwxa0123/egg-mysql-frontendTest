<template>
    <div>
        <div class="warp_body">
            {{data}}
            <el-button type="primary" @click="print()">打印</el-button>
            <el-button type="primary" @click="save()">保存</el-button>
            <el-button type="primary" @click="testFunc()">获取打印范围</el-button>
            <el-row :gutter="10" style="margin: auto">
                <el-col :span="18">
                    <el-card class="master_card">
                        <div id="luckysheet" style="margin: 0px;padding: 0px;position: relative;width: 100%;height: 600px;left: 0px;top: 0px;"
                        ></div>
                    </el-card>
                </el-col>
                <el-col :span="5">
                    <el-card class="master_card">
                        <div style="height: 600px">                            
                            <div v-for="item in btnList" :key="item.id">
                                <el-button class="btn_signup pab mt20" @click="setRangeValue(item)">{{ item.name }}</el-button><br/>
                            </div>                            
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      btnList: [
        { id: 1, name: "姓名", value: "name" },
        { id: 2, name: "年龄", value: "age" },
        { id: 3, name: "性别", value: "gender" },
        { id: 4, name: "工位", value: "position" },
      ],
      selectedRange: {
          rowPointer: 5,
          colPointer: 3
      },
    };
  },
  created() {},
  mounted() {
    this.int();
    
  },
  methods: {
    int() {
      //配置项
      var options = {
        container: "luckysheet", // 设定DOM容器的id
        title: "编辑sheet模板", // 设定表格名称
        lang: "zh", // 设定表格语言
        row: 20, //行数
        column: 15, //列数
        showsheetbar: false, //底部sheet页
        enableAddRow:false, //允许添加行
      };
      if(localStorage.getItem('sheetData') && JSON.parse(localStorage.getItem('sheetData'))){
          this.$set(options, 'data', [this.getInitData()])
          // 更新储存 如果走接口的话逻辑需要改，目前先实现
          localStorage.setItem('sheetData', JSON.stringify(this.getInitData()))
        // this.$set(options, 'data', [JSON.parse(localStorage.getItem('sheetData'))])
        console.log('康康拼出来的options=======>', options);
      }
      new Promise((res, rej) => {
          luckysheet.create(options);
          setTimeout(()=>{
              res(1)
          }, 500)
      }).then(res => {
          if(res == 1){
            if(
                localStorage.getItem('sheetData') && JSON.parse(localStorage.getItem('sheetData')) &&
                localStorage.getItem('pointerData') && JSON.parse(localStorage.getItem('pointerData'))
            ){
                const sheetData = JSON.parse(localStorage.getItem('sheetData'))
                const pointerData = JSON.parse(localStorage.getItem('pointerData'))
                let rangeValueMap = []
                sheetData.storageData.forEach(element => {
                    element.forEach(item => {
                        if(item && item.f) {
                            delete item.m
                            delete item.v
                        }
                    })
                    rangeValueMap.push(element)
                });
                luckysheet.setRangeValue(rangeValueMap, { range: { row: [0, pointerData.rowPointer], column: [0, pointerData.colPointer] } })
                // luckysheet.setRangeValue(sheetData.storageData, { range: { row: [0, pointerData.rowPointer], column: [0, pointerData.colPointer] } })
                // luckysheet.setCellValue(0, 3, {f: "=sum(B1:C1)", bg:"#000000"})
                // luckysheet.refreshFormula()
            }
          }
      })
    },
    // 遍历放calcChain
    getInitData() {
        let sheetData = JSON.parse(localStorage.getItem('sheetData'))
        let calcChain = []
        sheetData.storageData.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if(col && col.f) {
                    calcChain.push({
                        "r": rowIndex, //行数
                        "c": colIndex, //列数
                        "index": 0, //工作表id
                        "func": [true, col.v, col.f], //公式信息，包含公式计算结果和公式字符串
                        // "color": "w", //"w"：采用深度优先算法 "b":普通计算
                        // "parent": null,
                        // "chidren": {},
                        // "times": 0
                    })
                }
            })
        });
        this.$set(sheetData, 'calcChain', calcChain)
        // sheetData.calcChain = calcChain
        return sheetData
    },
    save() {
      const sheetdata1 = luckysheet.getAllSheets()[0];
      const sheetdata2 = luckysheet.getRangeValue()[0];
      const sheetdata3 = luckysheet.getRangeJson(true);
      const sheetdata4 = luckysheet.getSheetData()
      this.data = sheetdata4;

      console.log(sheetdata1);
      console.log(sheetdata2);
      console.log(sheetdata3);
      let sheetData = luckysheet.getSheet()
      this.getCurrentSheetPrintRange()
      // cellData需要精简为范围内的数据，为初始化做公式关联数组calcChain时提供便利
      const celldata = luckysheet.getRangeValue()
      this.$set(sheetData, 'storageData', celldata)
    //   sheetData.storageData = celldata
      console.log('看看保存的sheetData======>', sheetData);
      localStorage.setItem('sheetData', JSON.stringify(sheetData))
      this.$message.success('存啦')
    },
    print() {
      this.getCurrentSheetPrintRange();
      const html = luckysheet.getRangeHtml();
      window.document.querySelector("#luckysheet").innerHTML = html;
    },
    setRangeValue(item) {
      let target = [
        [
          {
            ct: {
              // celltype 单元格值格式：文本、时间等
              fa: "General", // Format格式的定义串 如"General"
              t: "n", // Type类型 如"g"
            },
            m: `$${item.name}`, // monitor 显示值
            v: item.value, // value 上送值
          },
        ],
      ];
      luckysheet.setRangeValue(target);
    },
    setRangeValueA1D6(){
        // luckysheet.setRangeValue(this.setedRangeData, { range: { row: [0, 5], column: [0, 3] } })
        // luckysheet.setRangeValue(this.setedRangeData, { range: 'A1:D6' })
    },
    testFunc() {
      this.getCurrentSheetPrintRange();
    },
    // 获取当前sheet有数据的正方形范围
    getCurrentSheetPrintRange() {
      const curSheerDataList = luckysheet.getSheetData();
      // 倒序排
      curSheerDataList.reverse();
      // 初始化行指针，列指针
      let rowPointer = 0,
        colPointer = 0,
        stopRowPointerFlag = false;
      for (let index = 0; index < curSheerDataList.length; index++) {
        const element = curSheerDataList[index];
        // 如果至少选中了一列切该行内都没数据，行指针更新为本行
        // 兼容删除内容。删除后本对象不会置为null，只会把m和v删掉
        // 之后再考虑根据样式来判断是否留该格
        if (element.length && !element.filter((item) => item && item.hasOwnProperty('m') && item.hasOwnProperty('v')).length) {
          if (!stopRowPointerFlag) {
            rowPointer = curSheerDataList.length - index - 2;
          }
          // 如果有，取该数组最末尾的index作为列指针
        } else {
          // 第一次行有值的时候给指针停止标志赋值
          if (!stopRowPointerFlag) {
            stopRowPointerFlag = true;
          }
          let tempArr = JSON.parse(JSON.stringify(element));
          // 找到本行中最末尾不为null的元素的index，赋给列指针
          tempArr.reverse();
          const tempPointer =
            element.length - tempArr.findIndex((item) => item) - 1;
          if (colPointer < tempPointer) {
            colPointer = tempPointer;
          }
        }
      }
      console.log("看看行指针======>", rowPointer);
      console.log("看看列指针======>", colPointer);
      luckysheet.setRangeShow({
        row: [0, rowPointer],
        column: [0, colPointer],
      });
      const pointerData = { rowPointer, colPointer }
      localStorage.setItem('pointerData', JSON.stringify(pointerData))
    },
  },
};
</script>


<style>
.warp_body {
  background-image: linear-gradient(120deg, #ffffff, #a4f4fa);
  min-width: 1200px;
  width: 95%;
  height: auto;
  padding: 0 20px;
  margin: 0 auto;
  clear: both;
  position: absolute;
  text-align: left;
}
.master_card {
  width: 90%;
  min-height: 600px;
  height: auto;
  margin: 100px auto;
  margin-top: 20px;
  background: rgb(255 255 255 / 54%);
}
.msg_card {
  width: 90%;
  height: 200px;
  margin: 70px auto;
  margin-bottom: 20px;
  background: rgb(255 255 255 / 54%);
}
.item_card {
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

.btn_signup {
  background: rgb(255 255 255 / 54%);
  color: #409eff;
  /* margin-top: 20px; */
}
.pab {
  position: relative;
  left: 0;
}
.l50 {
  left: 50px;
}
.mt20 {
  margin-top: 20px;
}
</style>
