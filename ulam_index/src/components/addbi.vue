<template>
    <div  class="backcolorsss" :style="{ height: bodyHeight + 'px' }">
      <!--<x-header  :left-options="{backText: ''}" >{{dai}}收款</x-header>-->
      <div class="back1" style="background: rgba(0,0,0,0)">
          <img @click="goback" src="@/assets/2_03.png" alt="" class="back2" style="width: 30px;height: auto">
      </div>
      <div style="height:70px;"></div>
      <div class="bai">
        <div style="background:#fff;border-radius:5px;">
          <div style="height:30px;"></div>
          账户：{{users.hu}}
          <div style="margin-top:5%;">
            <qrcode :value="wal.addr" :size="180"></qrcode>
          </div>
          <p class="zi2" style="font-size:14px;color: #222222" v-if="wal">{{wal.addr.substr(0,30)}}</p>
          <p class="zi3" style="font-size:14px;color: #222222" v-if="wal">{{wal.addr.substr(30)}}</p>
          <p class="zi4 backcolors" v-on:click="copy" :data-clipboard-text="wal.addr" :style="{ color:'#fff' }">
            复制地址
          </p>
          <div style="height:30px;"></div>
        </div>
      </div>
      <!--弹窗-->
      <toast v-model="ss3"  :time="1000" is-show-mask text="复制成功!"></toast>
    </div>
</template>

<script>
  import Clipboard from 'clipboard';
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Qrcode} from 'vux'
    export default {
        name: "addbi",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Qrcode
      },
      data(){
        return {
          bodyHeight:'',
          wal:'',
          users:'',
          ss3:false,
          dai:"",
        }
      },
      computed:{
        quan(){
          return this.$store.state.zuli;
        }
      },
      mounted(){
          if(window.plus){
              window.plus.navigator.setStatusBarStyle('dark')
          }
        let that = this
        //  获取当前高度
        that.bodyHeight=document.documentElement.clientHeight
          let me = localStorage.getItem('user');
          that.users = JSON.parse(me)
      //  获取路由参数 判断是充值哪个币
      let can =  that.$route.params.id
      console.log(can)
       if(can == 'ulam'){
           let message = localStorage.getItem('wals');
           if(message){
             message = JSON.parse(message)
             that.wal = message
             that.dai = 'ULAM'
             console.log(that.wal)
           }
       }
      },
      methods:{
          goback(){
            this.$router.go(-1)
          },
        copy(){
          let clipboard = new Clipboard('.zi4')
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
        }
      }

    }
</script>

<style scoped>
  .backcolorsss{
    background: linear-gradient(to bottom right, #76c4ff , #7458fd);
  }
  .bai{
    text-align:center;font-size:14px;margin-top:30px;padding:20px;box-sizing:border-box;
  }
  .zi2{
    color: #9b9b9b;
    margin-top:8px;
  }
  .zi3{
    color: #9b9b9b;

  }
  .zi4{
    border-radius: 6px;
    font-weight: 700;
    letter-spacing: 2px;
    width: 80%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    margin-left: 10%;
    margin-top: 35px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 16px;
    color: #fff;
  }
</style>
