<template>
  <div style="background:#FFF;" :style="{ height: bodyHeight + 'px' }">
    <div style="height: 40px"></div>
    <div style="background:#fff;text-align:center;">
      <div style="color:#171717;font-size:20px;line-height:46px;font-weight:700;">找回密码</div>
      <router-link to="/zhu">
        <img src="@/assets/back.png" alt="" style="height:20px;position:absolute;top:54px;left:15px;">
      </router-link>
    </div>
    <div style="height:15px;"></div>
    <!--发送验证码 -->
    <div style="padding:15px 30px;box-sizing: border-box;" v-if="fale">
      <div class="mik">
        <div>
          <input type="number" class="regtel" v-model="tel" placeholder="请输入手机号">
        </div>
      </div>
      <div style="height: 35px"></div>
      <div class="botmOk" style="border-radius:30px" v-on:click="go">
        下一步
      </div>
    </div>
    <!-- 输入新的密码 -->
    <div style="padding:15px 30px;box-sizing: border-box;" v-if="!fale">
      <div class="mik">
        <div>
          <input type="number" class="regtel" v-model="duanma" placeholder="请输入验证码">
        </div>
      </div>
      <div class="mik">
        <div>
          <input type="password" class="regtel" v-model="newma" placeholder="请设置新密码">
        </div>
      </div>
      <div style="height: 35px;"></div>
      <div class="botmOk" style="border-radius:30px" v-on:click="que">
        确 定
      </div>
    </div>
    <toast v-model="ss1" type="cancel" :time="2000" is-show-mask text="请设置字母+数字的组合密码~" width="18em"></toast>
    <toast v-model="ss2" type="cancel" :time="1100" is-show-mask text="验证码有误!"></toast>
    <toast v-model="ss4" :time="1200" is-show-mask text="发送成功"></toast>
    <toast v-model="ss3" :time="2500" is-show-mask text="设置密码成功!"></toast>
    <toast v-model="ss5" type="cancel" :time="2000" is-show-mask text="设置密码超时!请重新操作" width="18em"></toast>
    <toast v-model="ss6" type="cancel" :time="1500" is-show-mask text="发送失败!请不要频繁发送" width="18em"></toast>
    <toast v-model="ss7" type="cancel" :time="1500" is-show-mask text="验证码有误!" width="18em"></toast>
    <toast v-model="ss8" type="cancel" :time="1500" is-show-mask text="当前手机号未注册!" width="18em"></toast>
    <toast v-model="ss9" type="cancel" :time="1500" is-show-mask text="请输入正确的手机号~" width="18em"></toast>
  </div>
</template>

<script>
    import {Group, Cell, XHeader, XInput, XButton, Toast} from 'vux'

    export default {
        name: "find",
        components: {
            Cell, Group, XHeader, XInput, XButton, Toast
        },
        mounted() {

            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('dark')
            }

            this.bodyHeight = document.documentElement.clientHeight
            if (window.plus) {
                plus.navigator.setStatusBarBackground("#fff");
            }
        },
        data() {
            return {
                bodyHeight: '',
                tel: '',
                disabled: true, newma: '', duanma: '', fale: true, ss1: false,
                ss2: false, ss3: false, ss4: false, ss5: false, ss6: false, ss7: false, ss8: false, ss9: false,
            }
        },
        computed: {
            ull() {
                return this.$store.state.uri;
            },
            icol() {
                return this.$store.state.zuli.color
            }
        },
        methods: {
            //  验证手机号正确才能进入 点击按钮
            keyDown() {
                if (this.$refs.refcode.valid == true && this.tel != '') {
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            },
            fanhui1() {
                this.$router.push('/zhu')
            },
            isTel(val) {
                if (/^1[3456789]\d{9}$/.test(val)) {
                    return true;
                }
                return false;
            },
            //发送验证码
            go() {
                let that = this
                let newt = parseInt(that.tel)
                if (!that.isTel(newt)) {
                    that.ss9 = true
                    that.tel = ''
                    return
                }
                console.log('注册的手机号为:' + newt)
                that.axios.post(that.ull + '/send_mail',
                    {
                        'mobile': newt,
                        "password_drawback": 1
                    }
                ).then(response => {
                    console.log(response.data)
                    if (response.data == 'succeful') {
                        that.fale = false
                        that.ss4 = true
                        return
                    }
                    if (response.data == 'error_mobile') {
                        that.ss8 = true
                        that.tel = ''
                        return
                    }
                    that.ss6 = true
                    that.tel = ''
                }).catch(function (error) {
                    console.log(error);
                    alert('发送验证码出错!请重新请求')
                })
            },
            yanma() {
                this.$router.push('/index')
            },
            que() {
                let that = this
                if (that.duanma.length != 4) {
                    that.ss2 = true
                    that.duanma = ''
                    return
                }
                if (!that.mima(that.newma)) {
                    that.ss1 = true
                    that.newma = ''
                    return
                }
                console.log('执行更新密码')
                that.axios.post(that.ull + '/password_drawback',
                    {
                        'mobile': parseInt(that.tel),
                        "password": that.newma,
                        "ver_code": parseInt(that.duanma)
                    }
                ).then(response => {
                    console.log(response.data)
                    if (response.data == 'error') {
                        that.ss5 = true
                        that.duanma = ''
                        return
                    }
                    //error_mobile_repeat
                    if (response.data == 'error_mobile_repeat') {
                        that.ss7 = true
                        that.duanma = ''
                        return
                    }
                    if (response.data == 'succeful') {
                        that.ss3 = true
                    }
                    that.newma = ''
                    that.duanma = ''
                    setTimeout(() => {
                        that.fanhui1()
                    }, 2500)
                }).catch(function (error) {
                    console.log(error);
                    alert('请求异常!请重新操作')
                })

            },
            //  验证密码格式
            mima(e) {
                let regNumber = /\d+/;
                let regString = /[a-zA-Z]+/;
                if (regNumber.test(e) && regString.test(e)) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
</script>

<style scoped>

</style>

