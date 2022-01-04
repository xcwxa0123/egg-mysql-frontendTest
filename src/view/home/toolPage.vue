<template>
  <div class="warp_body">
      <el-button type="primary" class="btn_signup pab l50" @click="back2taplab">回到首页</el-button>
      <el-card class="msg_card">
        <!-- 整个excel分析 -->
        <input type="file" class="form-control" id="file" :accept="SheetJSFT" @change="_change" />
        
        <el-radio-group v-model="modeType" v-if="this.data && this.cols">
          <el-radio :label="0">全输出模式</el-radio>
          <el-radio :label="1">key-value模式</el-radio>
        </el-radio-group>
        <div v-if="this.data && this.cols">
          <el-select v-model="sheetIndex" placeholder="请选择要输出的sheet" @change="sheetChange">
            <el-option
              v-for="item in sheetNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div v-if="modeType === 1">
          <el-select v-model="selectedKey" placeholder="请选择key列">
            <el-option
              v-for="item in colList"
              :key="item.key"
              :label="item.name"
              :value="item.key">
            </el-option>
          </el-select>
          <el-select v-model="selectedValue" placeholder="请选择value列">
            <el-option
              v-for="item in colList"
              :key="item.key"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button v-if="modeType === 1" type="primary" @click="_trans2DataJSON(1)">key-value输出</el-button>
          <el-button v-if="modeType === 0" type="primary" @click="_trans2DataJSON(0)">全输出</el-button>
        </div>
      </el-card>
      <el-card class="master_card">
          <el-input v-model="dataJSON" placeholder="" type="textarea" rows="10"></el-input>
      </el-card>
  </div>
</template>

<script>
import XLSX from 'xlsx';
const _SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");
const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));
export default {
  data() {
    return {
      data: undefined,
      cols: undefined,
      SheetJSFT: _SheetJSFT,
      dataJSON: '',
      modeType: 0,
      colList: [],
      sheetNameList: [],
      sheetIndex: 0,
      selectedKey: '',
      selectedValue: '',
    }
  },
  methods: {
    back2taplab(){
        this.$router.push({ name: 'taplab' })
    },
    _change(evt) {
			const files = evt.target.files;
			if(files && files[0]) this._file(files[0]);
		},
		_file(file) {
			/* Boilerplate to set up FileReader */
			const reader = new FileReader();
			reader.onload = (e) => {
        this.data = this.data || {}
        this.cols = this.cols || {}
				/* Parse data */
				const ab = e.target.result;
				const wb = XLSX.read(new Uint8Array(ab), {type:'array'});
        console.log('wb.SheetNames', wb.SheetNames);
				/* Get first worksheet */
        wb.SheetNames.forEach((wsname, index) => {
          this.sheetNameList.push({
            label: wsname,
            value: Number(index)
          })
          const ws = wb.Sheets[wsname]
          this.data[wsname] = XLSX.utils.sheet_to_json(ws, {header:1});
          this.cols[wsname] = make_cols(ws['!ref']);
        });
				// const wsname = wb.SheetNames[0];
				// const ws = wb.Sheets[wsname];
				/* Convert array of arrays */
				// const data = XLSX.utils.sheet_to_json(ws, {header:1});
				/* Update state */
				// this.data = data;
        const target = this.sheetNameList.find(item => item.value === this.sheetIndex)
        this.colList = this.cols[target.label]
        console.log('data', this.data);
				// this.cols = make_cols(ws['!ref']);
        console.log('this.cols', this.cols);
        // this._trans2DataJSON(data, this.cols)
			};
			reader.readAsArrayBuffer(file);
		},
    _trans2DataJSON(modeType) {
      let that = this;
      switch (modeType) {
        case 1:
          {
            const targetSheet = this.sheetNameList.find(item => item.value === this.sheetIndex)
            const selectedData = this.data[targetSheet.label]
            let target = this.colList.find(item => item.name == this.selectedValue)
            let targetData = selectedData.filter(item => { if(item[target.key]) return item })
            let tempObj = {}
            targetData = targetData.map(item => {
              let key = item[that.selectedKey]
              let valueList = String(item[target.key]).includes('\r\n') ? item[target.key].split('\r\n') : [item[target.key]]
              let obj = {}
              valueList.forEach(element => {
                obj[element] = key
              });
                Object.assign(tempObj, obj)
              return obj
            })
            console.log('tempObj', tempObj)
            that.dataJSON = JSON.stringify(tempObj)
          }
          break;
        case 0:
          {
            const targetSheet = this.sheetNameList.find(item => item.value === this.sheetIndex)
            const selectedData = this.data[targetSheet.label]
            console.log('selectedData', selectedData)
            that.dataJSON = JSON.stringify(selectedData)
          }
          break;
      }
    },
    sheetChange() {
      const target = this.sheetNameList.find(item => item.value === this.sheetIndex)
      this.colList = this.cols[target.label]
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
    margin-top: 20px;
}
.pab{
  position: absolute;
}
.l50{
  left: 50px;
}
</style>