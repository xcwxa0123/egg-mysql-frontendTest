<template>
    <el-dialog
        title="注册"
        :visible.sync="visiable"
        width="30%"
        :before-close="handleClose"
    >
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="AC:" prop="account">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="PW:" prop="password">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: ['visiable'],
    data() {
        return {
            dialogVisible: false,
            form: {}
        }
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                this.$emit('setVisible', false)
            }).catch(_ => {});
        },
        cancel() {
            this.$emit('setVisible', false)
        },
        submit() {
            this.$confirm('确认注册？')
            .then(_ => {
                this.$emit('setVisible', false, this.form)
            }).catch(_ => {});
        }

    }
}
</script>

<style>

</style>