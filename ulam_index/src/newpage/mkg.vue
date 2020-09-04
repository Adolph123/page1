<template>
  <div  style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
    <div style="position:fixed;top:0px;width:100%;z-index:999;border-bottom:1px solid #F5F5F5;">
      <div class="back1">
        <img src="@/assets/back.png" alt="" class="back2" v-on:click="fanhui1">
      </div>
      <div style="height:70px;"></div>
      <div style="height:60px;line-height:60px;background:#fff;width:100%;">
        <div class="buju" style="font-size:17px;color:#170202;">
          <flexbox>
            <flexbox-item>
              <div>我的矿主 <span class="bzi1">{{shuju.length}}</span></div>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    </div>
    <div style="height:140px;"></div>

    <scroll class="main-content">
      <div>
        <div v-for="(todo,index) in shuju" v-bind:key="todo.id" class="buju" style="font-size:14px;background:#f5f5f5;">
          <div style="width:100%;padding:15px;box-sizing: border-box;background:#fff;border-radius:20px;">
            <flexbox>
              <flexbox-item :span="3">
                <div><img src="@/assets/tx.png" alt="" style="width:80%;"></div></flexbox-item>
              <flexbox-item>
                <div>
                  <p class="zhei">{{todo.label}}</p>
                  <p class="hhei">手机号: <span class="zhei">{{todo.mobile}}</span></p>
                  <p class="hhei">贡献值: <span class="zhei">{{todo.gongxian}}</span></p>
                  <p class="hhei">推广量: <span class="zhei">{{todo.miner_amount}}</span></p>
                </div></flexbox-item>
            </flexbox>
          </div>
          <div style="height:15px;background:#f5f5f5;"></div>
        </div>
        <div style="height: 10px;"></div>
      </div>
    </scroll>


    <div style="height:60px;background:#f5f5f5;"></div>
    <loading :show="ss1" text="加载中.."></loading>
  </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,InlineLoading} from 'vux';
  import scroll from '@/base/scroll/scroll';

    export default {
        name: "mkg",
      components:{
          scroll,Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,InlineLoading
      },
      data(){
          return {
            users:'',bodyHeight:'',ss1:false,shuju:"",
          }
      },
      computed:{
        ull(){
          return this.$store.state.uri;
        }
      },
      mounted(){
        let that = this
        that.bodyHeight=document.documentElement.clientHeight
        let message = localStorage.getItem('user');
        message = JSON.parse(message)
        if(!message){
          that.$router.push('/zhu')
          return
        }
        that.users = message
        that.ss1 = true
        that.login()
      },
      methods:{
        fanhui1(){
          this.$router.push('/user')
        },
        login(){
          let that = this
          that.axios.post(that.ull+'/search_miner_own',
            {
              "mobile":parseInt(that.users.hu),
              "password":that.users.mima
            }
          ).then(response => {
            console.log(response.data)
            that.ss1 = false
            //将个人矿机数据遍历
            that.shuju = response.data
          }).catch(function (error) {
            that.ss1 = false
            console.log(error);
          })
        },
      }
    }
</script>

<style scoped>
  .zhei{color:#030303; }
  .hhei{color:#7c7b7b; }
  .buju{padding:0 30px;box-sizing: border-box;}
  .bzi1{font-size:28px;color:#9a55ff;margin-left:8px;}
  .main-content{
    height: 78vh;
    overflow: hidden;
    position: relative;
  }

</style>
