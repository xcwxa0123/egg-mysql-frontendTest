<template>
  <div class="warp_body">
      <!-- 尝试整个验证码 -->
      <el-card :class="isActive ? 'active' : ''">
            <div slot="header">FAKE LOGIN</div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="AC:">
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="PW:">
                    <el-input v-model="form.password" show-password></el-input>
                </el-form-item>
                <!-- <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item> -->
                <el-checkbox-group v-model="form.isRemember">
                    <el-checkbox label="Remember Me" name="type"></el-checkbox>
                </el-checkbox-group>
                <el-button type="primary" @click="login" class="btn_login">Log In</el-button>
                <el-button type="primary" @click="signup" class="btn_signup">Sign Up</el-button>
            </el-form>
      </el-card>
      <sign-up v-if="showDialog" :visiable="showDialog" @setVisible="setVisible"></sign-up>
  </div>
</template>

<script>
import userApi from '../api/userApi.js'
import signUp from './components/signUp.vue'
export default {
    components: { signUp },
    data() {
        return {
            form: {
                account: '',
                password: '',
                isRemember: false
            },
            isActive: false,
            showDialog: false
        }
    },
    methods: {
        async setVisible(flag, data = undefined) {
            if(data && Object.keys(data).length){
                const signUpRes = await userApi.signUp(data)
                if(signUpRes.data.meta && signUpRes.data.meta.code == 200){
                    if(signUpRes.data.data && signUpRes.data.data.status == 1){
                        this.$message.success(signUpRes.data.meta.message)
                        this.showDialog = flag
                    } else {
                        this.$message.warning(signUpRes.data.meta.message)
                    }
                } else {
                    this.$message.warning(signUpRes.data.meta.message)
                }
            }
        },
        async login() {
            const res = await userApi.getUser(this.form);
            if(res.data && res.data.data && res.data.data.status == 1){
                this.$router.push({ name: 'home' })
            } else {
                this.$message.warning('错啦')
            }
            console.log('res', res);
        },
        async signup() {
            this.showDialog = true;
        }
    }
}
</script>

<style>
    .warp_body{
        background-image: linear-gradient(120deg , #ffffff , #a4f4fa);
        min-width: 1200px;
        width: 100%;
        height: 100%;
        padding: 0 20px;
        margin: 0 auto;
        clear: both;
        position: absolute;
    }
    .el-card{
        width: 600px;
        height: 700px;
        margin: 100px auto;
        background: rgb(255 255 255 / 54%);
    }
    .el-checkbox__label {
        display: inline-block;
        padding-left: 10px;
        line-height: 19px;
        font-size: 14px;
    }
    .el-button{
        display: block;
        margin: auto auto;
        width: 400px;
    }
    .btn_login{
        margin-top: 100px;
        margin-bottom: 20px;
    }
    .btn_signup{
        background: rgb(255 255 255 / 54%);
        color:#409EFF
    }
    .el-button+.el-button{
        margin-left: auto;
    }
</style>

<style scoped>
    @keyframes spin360{
        0%{
            transform-origin: 100% 0%;
            transform: rotate(0deg);
            position: relative;
            left: 0px;
            width: 200px;
            opacity: 1;
        }
        50%{
            transform-origin: 100% 0%;
            transform: rotate(-45deg);
            width: 300px;
            position: relative;
            left: -40px;
            opacity: .8;
        }
        100%{
            transform-origin: 100% 0%;
            position: relative;
            left: 0px;
            transform: rotate(-90deg);
            width: 200px;
            opacity: 0;
        }
    }

    .active{
        /* -webkit-animation-name: mycolor1; */
        -webkit-animation-name: spin360;
        -webkit-animation-duration: 6s;
        -webkit-animation-timing-function: linear;
        /* -webkit-animation-iteration-count: infinite; */
    }
</style>