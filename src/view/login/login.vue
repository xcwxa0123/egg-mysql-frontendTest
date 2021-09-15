<template>
  <div class="warp_body">
      <!-- 尝试整个验证码 -->
      <el-card :class="isActive ? 'active' : ''">
            <div slot="header">FAKE LOGIN</div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="AC：">
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="PW：">
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
  </div>
</template>

<script>
import userApi from '../api/userApi.js'
export default {
    data() {
        return {
            form: {
                account: '',
                password: '',
                isRemember: false
            },
            isActive: false
        }
    },
    methods: {
        async login() {
            console.log('login!');
            // this.$router.push({ name: 'home' })
            const res = await userApi.getUser({text: 'test'});
            console.log('res', res);
        },
        async signup() {
            console.log('signup!');
            const res = await userApi.postTest({val: '12312323'});
            console.log('res', res);
            // this.isActive = true;
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