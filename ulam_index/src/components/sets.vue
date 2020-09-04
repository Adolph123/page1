<template>
  <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
    <!--<x-header  :left-options="{preventGoBack: true,backText: ''}" @on-click-back="fanhui1">设置</x-header>-->

    <div class="backcolors">
      <div class="mheaderheader">
        <div style="position: absolute;left: 0;z-index: 100" @click="fanhui1">
          <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
        </div>
        <div style="height: 30px;">

        </div>
        <div style="position: absolute;width: 100%;left: 0;">
          <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
            <span style="font-size: 16px;color: #fff"> </span>
          </div>
        </div>

      </div>
    </div>


    <!--      <div style="height:10px;"></div>-->
    <div class="kk1 cebor" v-on:click="dian">
      <p>
        <span style="margin-left:15px;">登录密码</span>
        <span style="margin-right:4%;float:right;color:#9C9B9C;">
          修改
          <img src="@/assets/you.png" alt="" class="tu2">
        </span>
      </p>
    </div>
    <div v-if="isflag == 0" class="kk1 cebor" v-on:click="dian2">
      <p>
        <span style="margin-left:15px;">资金密码</span>
        <span style="margin-right:4%;float:right;color:#9C9B9C;">
          设置
          <img src="@/assets/you.png" alt="" class="tu2">
        </span>
      </p>
    </div>
    <div v-else class="kk1 cebor" style="display: none" v-on:click="dian4">
      <p>
        <span style="margin-left:15px;">资金密码</span>
        <span style="margin-right:4%;float:right;color:#9C9B9C;">
          修改
          <img src="@/assets/you.png" alt="" class="tu2">
        </span>
      </p>
    </div>

    <div class="kk1" v-on:click="dian3">
      <p>
        <span style="margin-left:15px;">指纹支付</span>
        <span style="margin-right:4%;float:right;color:#9C9B9C;">
            设置
          <img src="@/assets/you.png" alt="" class="tu2">
        </span>
      </p>
    </div>
  </div>
</template>

<script>
    import {Group, Cell, XHeader, XInput, XButton, Toast, Confirm, Actionsheet, Loading} from 'vux'

    export default {
        name: "sets",
        components: {
            Cell, Group, XHeader, XInput, XButton, Toast, Confirm, Actionsheet, Loading
        },
        data() {
            return {
                bodyHeight: '',
                isflag:0,
            }
        },
        mounted() {
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('white')
            }
            let that = this
            that.bodyHeight = document.documentElement.clientHeight;

            that.isflag = JSON.parse(localStorage.getItem('user')).drawback_passwd;
        },
        methods: {
            fanhui1() {
                this.$router.push('/user')
            },
            dian() {
                //  修改登录密码
                this.$router.push('/upmi')
            },
            dian2() {
                //  修改登录密码
                this.$router.push('/setjin')
            },
            dian4() {
                let id = JSON.parse(localStorage.getItem('user')).hu;
                //  修改登录密码
                this.$router.push({
                    path: '/tagglemonymima',
                    query: {
                        id
                    }
                })
            },
            dian3() {
                //  设置指纹支付
                this.$router.push('/zhiwen')
            }
        }
    }
</script>

<style scoped>
  .cebor {
    border-bottom: 1px solid #F5F5F5;
  }

  .tu2 {
    width: 11px;
    margin-top: 11px;
  }

  .kk1 {
    height: 45px;
    width: 100%;
    line-height: 45px;
    background: #fff;
    font-size: 14px;
  }

  .tu1 {
    width: 13px;
    float: right;
    margin-top: 13px;
    margin-right: 4%;
  }
</style>
