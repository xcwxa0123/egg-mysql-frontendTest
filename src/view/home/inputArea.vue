<template>
    <div class="warp_body">
        <el-button type="primary" class="btn_signup pab l50" @click="back2taplab"
            >回到首页</el-button
        >
        <el-card class="msg_card"> </el-card>
        <el-card class="master_card">
            <div
                contenteditable="true"
                placeholder=""
                type="textarea"
                rows="5"
                @input="onInput"
                @keyup.exact="inputOnKeyup"
            ></div>
            <!-- @keyup.32.exact="inputKeyupSpace" -->
        </el-card>
        <div
            v-show="toolVisiable"
            :style="`position: absolute;left: ${coordinate.x}px;top: ${coordinate.y}px;`"
        >
            <el-select v-model="selectedValue" placeholder="">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputText: "",
            selectedValue: "",
            toolVisiable: false,
            options: [
                {
                    label: "label_1",
                    value: "value_1",
                },
                {
                    label: "label_2",
                    value: "value_2",
                },
            ],
            coordinate: {
                x: 0,
                y: 0,
            },
        };
    },
    methods: {
        back2taplab() {
            this.$router.push({ name: "taplab" });
        },
        onInput(val) {
            console.log("val===>", val);
        },
        inputOnKeyup(e) {
            //   console.log('e=========>', e.keyCode);
            const arrorList = [37, 38, 39, 40];
            if (arrorList.includes(e.keyCode)) {
                this.toolVisiable = true;
                this.coordinate = this.getCoordinate();
                console.log("coordinate", this.coordinate);
                // const target = document.getElementsByClassName('toolSelected')[0]
                // target.style.
            }
        },
        getCoordinate() {
            const select = document.getSelection();
            let x = 0,
                y = 0;
            if (select.rangeCount === 1) {
                const range = select.getRangeAt(0).cloneRange();
                console.log("range", range);
                const rects = range.getClientRects();
                console.log("rects", rects);
                if (rects.length && rects[0]) {
                    const rect = rects[0];
                    x = rect.x;
                    y = rect.y;
                }
            }
            return { x, y };
        },
    },
};
</script>

<style>
.warp_body {
    background-image: linear-gradient(120deg, #ffffff, #a4f4fa);
    min-width: 1200px;
    width: 100%;
    height: auto;
    padding: 0 20px;
    margin: 0 auto;
    clear: both;
    position: absolute;
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
    position: absolute;
}
.l50 {
    left: 50px;
}
</style>