<template>
  <div  style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
    <div style="position:fixed;top:0px;width:100%;z-index:999;border-bottom:1px solid #F5F5F5;">
      <div class="back1">
        <img src="@/assets/back.png" alt="" class="back2" v-on:click="fanhui1">
      </div>

      <div style="height:70px;"></div>
      <div >

        <tab bar-active-color="#9a55ff" active-color="#9a55ff" >
          <tab-item selected @on-item-click="onItemClick(1)" >全部矿机</tab-item>
          <tab-item @on-item-click="onItemClick(2)">锁仓矿机</tab-item>
          <tab-item @on-item-click="onItemClick(3)">未锁仓矿机</tab-item>
        </tab>
      </div>
      <div style="height:60px;line-height:60px;background:#fff;width:100%;">
        <div class="buju" style="font-size:17px;color:#170202;">
          <flexbox>
            <flexbox-item>
              <div>45天内推广总量：</div>
            </flexbox-item>
            <flexbox-item>
              <div><span class="bzi1">{{miner_sum}}</span></div>
            </flexbox-item>
          </flexbox>
        </div>
      </div>

    </div>

    <div style="height:150px;margin-top: 10%"></div>
    <div v-if="tuiguang_day" v-for="(todo,index) in shuju" v-bind:key="todo.id" class="buju" style="font-size:14px;background:#f5f5f5;">
        <div>
            <div style="width:120%;padding:15px;background:#fff;margin-left: -9%;margin-top: 1%">
              <flexbox>
                  <div>

                    <p class="hhei" style="float: left">日期: <span class="zhei">{{todo.bi}}</span></p>
                    <p class="hhei" style="float: left">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp推广量: <span class="zhei">{{todo.amount}}</span></p>
                  </div></flexbox-item>
              </flexbox>
            </div>
        </div>
    </div>
    <div style="height:60px;background:#f5f5f5;"></div>
    <loading :show="ss1" text="加载中.."></loading>
  </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,InlineLoading,Tab,TabItem} from 'vux'
    export default {
      name: "OrgTreeNode",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,InlineLoading,Tab,TabItem
      },
      data(){
          return {
            ss1:false, shu:'', url:'', users:'', menus2: {menu1:'横版显示', menu2:'竖版显示'},
            show2:false, bodyHeight:'', shuju:'',miner_sum:'',
            //false 横向 -竖向
            horizontal: false,
            //false 不能点击缩放 有+ - 号
            collapsable:true, expandAll:true, labelClassName: 'bg-orange',dian:'',dtime:'',
            tuiguang_day:true,
          }
      },
      computed:{
        ull(){
          return this.$store.state.uri;
        },
        quan(){
          return this.$store.state.zuli;
        }
      },
      mounted(){
        let that = this
        that.bodyHeight=document.documentElement.clientHeight
        let message = localStorage.getItem('user');
        message = JSON.parse(message)
        if(!message){
          //跳转登陆
          that.$router.push('/zhu')
          return
        }
        that.users = message
        that.ss1 = true
        that.login()
        that.countTime()
      },
      destroyed(){
        this.fanhui1()
      },
      methods:{
        onItemClick(e){
        let that = this
        if(e == 1){
          this.login1()
        }else if(e == 2){
          this.login()
          that.tuiguang_day=true
        }else if(e == 3){
          //未锁仓
          that.jzi ='未锁仓矿机量'
          that.shujuz = that.shuju2
        }
      },
        countTime(){
          let that = this
          //获取当前时间
          let time = new Date();
          console.log(time.getDay())
          let nowTime = time.getTime()
          let week = time.getDay()
          let year = time.getFullYear(); //获取年份
          let day = time.getDate(); //获取几号
          let month = time.getMonth()+1;
          let fullday=0;//定义一个月多少天
          //判断是否是闰年
          if(!(year%4)){//可以整除，是闰年
            //判断月份是30天还是31天
            if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
              fullday = 31;
            }else if(month==2){
              fullday = 29;
            }else{
              fullday = 30;
            }
          }else{//不可以整除，不是闰年
            //判断月份是30天还是31天
            if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
              fullday = 31;
            }else if(month==2){
              fullday = 28;
            }else{
              fullday = 30;
            }
          }
          //根据今天周几来判断距离下一次周1还有几天
          let distance_day = 0;
          switch(week){
            case 1: distance_day = 0;break;
            case 2:distance_day = 6;break;
            case 3:distance_day = 5;break;
            case 4:distance_day = 4;break;
            case 5:distance_day = 3;break;
            case 6:distance_day = 2;break;
            case 0:distance_day = 1;break;}
          //计算下一个周1的年月日
          let end_time = '';
          if(day+distance_day>fullday){
            let next_distance = Math.abs(fullday-(day+distance_day)); //计算超过本月下周二是下个月的几号
            end_time = year+'/'+(month+1)+'/'+next_distance+' 20:00:00';
          }else{
            end_time = year+'/'+month+'/'+(day+distance_day)+' 20:00:00';
          }

          //倒计时
          let endtime_sjc = Date.parse(end_time); //计算时间戳
          let time_distance = (endtime_sjc - nowTime)/1000; //计算现在到结束时间的时间戳

          function countTime(time_distance){
            time_distance--;
            if(time_distance>0){
              let getDay = Math.floor(time_distance/(60*60*24));//天
              let getHour = Math.floor((time_distance - getDay*60*60*24)/(60*60));//小时
              let getMinute = Math.floor((time_distance - getDay*60*60*24 - getHour*60*60)/60);//分钟
              let getSecond = Math.floor(time_distance - getDay*60*60*24 - getHour*60*60 - getMinute*60);//秒

              that.dtime = getDay+'天'+getHour+'时'+getMinute+'分'+getSecond+'秒'

            }else{
              that.dtime ='奖励正在发放中.';
            }
            setTimeout(function(){
              countTime(time_distance);
            },1000);
          }
          countTime(time_distance);
        },
        goshow(a,b){
          // console.log(a,b)
          if(a ==b){
            return false
          }else {
            return true
          }
        },
          gotime(a,b){
          let data =   new Date(parseInt(a) * 1000).toLocaleString('chinese',{hour12:false})
           let new1 =  data.substr(0,10)
           b.bi = new1
           return  new1
          },
          ding(){
            document.documentElement.scrollTop = document.body.scrollTop = 0;
          },
          xian1(a){
            this.dian = a
          },
          xian2(){
            this.dian = ''
          },
            login(){
              let that = this
              that.axios.post(that.ull+'/search_add',
                {
                  "mobile":parseInt(that.users.hu),
                  "password":that.users.mima
                }
              ).then(response => {
                console.log(response.data)
                that.ss1 = false
                //将个人矿机数据遍历
                that.miner_sum = response.data.miner_sum
                let bc = response.data.data

                if(!bc){
                  return
                }
                 bc = bc.sort(function(a,b) {
                  return b.time_reg - a.time_reg
                })
                for(let i=0;i<bc.length;i++){
                  let data =   new Date(parseInt(bc[i].time_time) * 1000).toLocaleString('chinese',{hour12:false})
                  bc[i].bi =  data.substr(0,10)
                }
                that.shuju = bc
                console.log("that.shuju.miner_sum")
                console.log(bc)
              }).catch(function (error) {
                that.ss1 = false
                console.log(error);
              })
          },
          login1(){
              let that = this
              that.axios.post(that.ull+'/search_miner_num',
                {
                  "mobile":parseInt(that.users.hu),
                  "password":that.users.mima
                }
              ).then(response => {
                console.log(response.data)
                that.ss1 = false
                //将个人矿机数据遍历
                that.miner_sum = response.data.miner_sum
                let bc = response.data.data

                if(!bc){
                  return
                }
                 bc = bc.sort(function(a,b) {
                  return b.time_reg - a.time_reg
                })
                for(let i=0;i<bc.length;i++){
                  let data =   new Date(parseInt(bc[i].time_time) * 1000).toLocaleString('chinese',{hour12:false})
                  bc[i].bi =  data.substr(0,10)
                }
                that.shuju = bc
                console.log("that.shuju.miner_sum")
                console.log(bc)
              }).catch(function (error) {
                that.ss1 = false
                console.log(error);
              })
          },
          fanhui1(){
            this.$router.push('/user')
          }
      }
    }
</script>

<style scoped>
  .zhei{color:#030303; }
  .hhei{color:#7c7b7b; }
  .buju{padding:0 30px;box-sizing: border-box;}
  .zi1{
    color: #777575;font-size:14px;margin-top:10px;
  }
    .bzi1{font-size:28px;color:#9a55ff;margin-left:8px;}
  .jiji{
    float:left;width:50%;
    background:#fff;
    height:70px;font-weight:700;font-size:17px;
  }
  .weiji{
    float:left;width:50%;background:#fff;height:70px;font-weight:700;font-size:17px;
  }
  .org-tree-node-label {
    white-space: nowrap;
  }
  .bg-white {
    background-color: white;
  }
  .bg-orange {
    background-color: orange;
  }
  .bg-gold {
    background-color: gold;
  }
  .bg-gray {
    background-color: gray;
  }
  .bg-lightpink {
    background-color: lightpink;
  }
  .bg-chocolate {
    background-color: chocolate;
  }
  .bg-tomato {
    background-color: tomato;
  }
</style>
