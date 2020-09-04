<template>
    <div class="dianpuok"  >
      <div class="el-page-header">

        <div style="display: flex;justify-content: space-between;width: 94%;margin: 0 auto">
          <div class="el-page-header__title" @click.stop="goBack">
            <img src="@/assets/2_03.png" alt="" style="width: 8vw;height: auto;display: block" >
          </div>
          <div style="display: flex;justify-content: center;font-size: 0.8rem">
            <span> {{content}}</span>
          </div>
          <div class="" >
<!--            <img src="@/assets/icon/2_11.png" style="width: 6vw" alt="">-->
          </div>
        </div>

      </div>



      <div @click.prevent="copy" :data-clipboard-text="users" class="fuzhi">
          复制后台登录网址
      </div>




      <toast v-model="ss3"  :time="1000" is-show-mask text="复制成功~"></toast>
    </div>
</template>

<script>
    import Clipboard from 'clipboard';
    import {Confirm,XHeader,Toast}from 'vux'
    export default {
        name: "dianpuok",
        components:{Toast},
        data(){
            return{
                content:'',
                ss3:false,
                users:'http://backstage.ulamchain.io/#/login'
            }
        },
        methods:{
            goBack(){
                this.$router.push('/user')
            },
            copy(){
                let clipboard = new Clipboard('.fuzhi')
                clipboard.on('success', e => {
                    console.log('复制成功')
                    this.ss3 = true
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    console.log('该浏览器不支持自动复制')
                    // 释放内存
                    clipboard.destroy()
                })
            },
        }
    }
</script>

<style scoped>
  .dianpuok{
    width: 100%;
    height: 100vh;
    background: #9a55ff url("../../../static/ok.png") no-repeat;
    background-size: 100% 100%;

  }
  .el-page-header {
    display: flex;
    align-items: center;
    line-height: 1rem;
    padding: 40px 0 1%;
    width: 100vw;
    position: relative;
    font-size: 0.8rem ;
  }
  .el-page-header__title {
    position: relative;
    z-index: 1;
    text-indent: 0.3rem;
  }
  .el-page-header__content {
    text-align: center;
    color: #303133;
    position: absolute;
    z-index: 0;
    width: 100%;
  }
  .fuzhi{
    width:80%;
    font-weight: 600;
    text-align: center;
    line-height: 30px;
    padding: 4px 0;
    font-size: 16px;
    border-radius: 20px;
    color: #fff;
    background: #55bedd;
    margin: 63vh auto 0;
  }

</style>
