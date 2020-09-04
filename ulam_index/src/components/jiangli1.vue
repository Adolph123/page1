<template>
  <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
    <x-header  :left-options="{preventGoBack: true,backText: ''}"  @on-click-back="fanhui1">推广查询</x-header>
    <p style="font-size:14px;color:#999;margin:10px;">&nbsp;请选择查询时间段</p>
    <div style="background:#fff;">
      <datetime v-model="val1" @on-change="change" :title="tishi">
      </datetime>
    </div>
    <div style="height:15px;"></div>
    <div style="clear:both;"></div>
    <!-- 矿工显示的数据 -->
    <div v-if="!users.miner">
      <div v-if="jiang">
        <group style="margin-top:-20px;">
          <cell
            title="一级购买者"
            is-link
            :border-intent="false"
            :arrow-direction="xj1 ? 'down' : ''"
            style="background: #fff;font-size:14px;height:35px;"
            @click.native="xj1 = !xj1">
            <span v-if="jiang">{{jiang.buy_1.length}}&nbsp;&nbsp;</span>
          </cell>
          <cell-box v-if="xj1" :border-intent="false" class="sub-item" v-for="(todo,index) in jiang.buy_1" v-bind:key="todo.id" style="background:#F5F5F5;font-size:10px;">
            {{todo.mobile}}用户于{{new Date(parseInt(todo.time) * 1000).toLocaleString('chinese',{hour12:false}) }} 购买{{todo.amount}}台
          </cell-box>
          <!-- 二级购买者 -->
          <div v-if="users.group_miner != 15">
            <cell
              title="二级购买者"
              is-link
              :border-intent="false"
              :arrow-direction="xj2 ? 'down' : ''"
              style="background: #fff;font-size:14px;height:35px;"
              @click.native="xj2 = !xj2">
              <span v-if="jiang">{{jiang.buy_2.length}}&nbsp;&nbsp;</span>
            </cell>
            <cell-box v-if="xj2" :border-intent="false" class="sub-item" v-for="(todo,index) in jiang.buy_2" v-bind:key="todo.id" style="background:#F5F5F5;font-size:10px;">
              {{todo.mobile}}用户于{{new Date(parseInt(todo.time) * 1000).toLocaleString('chinese',{hour12:false}) }} 购买{{todo.amount}}台
            </cell-box>
          </div>
        </group>
      </div>
      <div v-if="jiang.length == 0" style="padding:15px;margin-top:30%;">
        <divider>暂无数据</divider>
      </div>
    </div>
    <!--矿主显示的数据-->
    <div v-if="users.miner">
      <div style="background:#fff;border-bottom:1px solid #ddd;" v-if="jiang">
        <div v-for="(todo,index) in jiang" v-bind:key="todo.id" v-if="pzuxuan(todo.buy_1.length)">
          <div style="padding:5px 10px;box-sizing: border-box;">
            <p style="font-size:15px;">用户：{{todo.mobile}}
              <!--<span style="float: right;">奖励：{{todo.reward}}</span></p>-->
            <div>
              <!--一级购买用户-->
              <div style="text-align:center;margin-bottom:-18px;margin-top:-15px;padding:10px 0px;">
                <div style="height:20px;"></div>
                <p v-on:click="xian1(todo.mobile)" v-if="todo.mobile != dian" style="text-align: right;color:#9a55ff;">
                  <x-icon type="ios-arrow-down" size="15" ></x-icon>
                  <span style="font-size:10px;position:relative;top:-3px;">{{todo.buy_1.length}} 位一级用户购买</span>
                </p>
                <p v-on:click="xian2" v-if="todo.mobile == dian" style="text-align:right;color:#9a55ff;">
                  <x-icon type="ios-arrow-up" size="15"></x-icon>
                  <span style="font-size:10px;position:relative;top:-3px;">收起</span>
                </p>
              </div>
              <div style="height:10px;background:#fff;"></div>
              <div style="background:#F5F5F5;border-radius:6px;" v-if="todo.mobile == dian">
                <div v-for="(to,index) in todo.buy_1" v-bind:key="to.id"  >
                  <div style="padding:5px 10px;box-sizing:border-box;">
                    <p style="margin-left:20px;position:relative;bottom:-7px;font-size:10px;">
                      用户{{to.mobile}} 于
                      {{new Date(parseInt(to.time) * 1000).toLocaleString('chinese',{hour12:false}) }} 购买{{to.amount}}台
                    </p>
                  </div>
                </div>
                <div style="height:15px;"></div>
              </div>
              <!--二级购买用户-->
              <div style="text-align:center;margin-bottom:-12px;margin-top:-25px;padding:15px 0px;" v-if="users.group_miner != 15">
                <div style="height:12px;"></div>
                <p v-on:click="xian3(todo.mobile)" v-if="todo.mobile != dian2" style="text-align: right;color:#9a55ff;">
                  <x-icon type="ios-arrow-down" size="15" ></x-icon>
                  <span style="font-size:10px;position:relative;top:-3px;">{{todo.buy_2.length}} 位二级用户购买</span>
                </p>
                <p v-on:click="xian4" v-if="todo.mobile == dian2" style="text-align:right;color:#9a55ff;">
                  <x-icon type="ios-arrow-up" size="15"></x-icon>
                  <span style="font-size:10px;position:relative;top:-3px;">收起</span>
                </p>
              </div>
              <div style="background:#F5F5F5;border-radius:6px;" v-if="todo.mobile == dian2">
                <div v-for="(to,index) in todo.buy_2" v-bind:key="to.id">
                  <div style="padding:5px 10px;box-sizing:border-box;">
                    <p style="margin-left:20px;position:relative;bottom:-7px;font-size:10px;">
                      用户{{to.mobile}} 于
                      {{new Date(parseInt(to.time) * 1000).toLocaleString('chinese',{hour12:false}) }} 购买{{to.amount}}台
                    </p>
                  </div>
                </div>
                <div style="height:15px;"></div>
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
          <div style="height:10px;background:#F5F5F5;"></div>
        </div>
      </div>
      <div v-if="jiang.length == 0" style="padding:15px;margin-top:30%;">
        <divider>暂无数据</divider>
      </div>
    </div>
    <!-- 弹窗-->
    <popup v-model="yao" height="310px" is-transparent>
      <div style="width: 95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
        <divider style="font-size: 18px;">请输入推广人邀请码</divider>
        <p class="li1">&nbsp;&nbsp;认证后才可提交，提交后您上级的算力将提升!</p>
        <group>
          <x-input title="邀请码" v-model="tren1" type="number"></x-input>
        </group>
        <div style="padding:20px 15px;margin-top:5px;">
          <x-button style="background:#9a55ff;color:white;" @click.native="fama">确定</x-button>
          <x-button @click.native="yaos">取消</x-button>
        </div>
      </div>
    </popup>
    <toast v-model="macuo" type="cancel" :time="1100" is-show-mask text="推广码有误!" width="12em"></toast>
    <toast v-model="ss2" type="cancel" :time="2000" is-show-mask text="请认证后操作!" width="12em"></toast>
    <toast v-model="ss3"  :time="2000" is-show-mask text="提交成功!" width="12em"></toast>
    <toast v-model="ss4" type="cancel" :time="2000" is-show-mask text="提交出错!" idth="12em"></toast>
    <loading :show="ss1" text="加载中.."></loading>
    <toast v-model="sh6" type="cancel" :time="1800" is-show-mask text="账户异常！请重新登录" width="18em"></toast>
    <toast v-model="cuo1" type="cancel" :time="1800" is-show-mask text="结束时间不能大于开始时间！" width="18em"></toast>
  </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Popup,Divider,Alert,Datetime,CellBox} from 'vux'
  export default {
    name: "jiangli1",
    components:{
      Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Popup,Divider,Alert,Datetime,CellBox
    },
    data(){
      return {
        cuo1:false,
        tishi:'默认查询7天内', xj1:false, xj2:false,
        value6: '', bodyHeight:'', users:'',
        yanxian:false,
        //  是否有上级邀请码
        tren:'', tren1:'', yao:false, macuo:false, ss1:false, ss2:false,
        ss3:false, ss4:false, sh6:false,newli:0, yj:0, jiang:'',dian:'', dian2:'',kcc:0, jcc:0,val1:'',
      }
    },
    mounted(){
      let that = this
      that.bodyHeight=document.documentElement.clientHeight
      that.shus()
    },
    computed:{
      ull(){
        return this.$store.state.uri;
      },
      quan(){
        return this.$store.state.zuli;
      }
    },
    methods:{
      pzuxuan(a){
        if(!a && this.users.group_miner == 15){
          return false
        }else{
          return true
        }
      },
      xian1(a){
        this.dian = a
      },
      xian2(){
        this.dian = ''
      },
      xian3(a){
        this.dian2 = a
      },
      xian4(){
        this.dian2 = ''
      },
      shus(){
        let that = this
        let message = localStorage.getItem('user');
        message = JSON.parse(message)
        if(!message){
          //跳转登陆
          that.$router.push('/zhu')
          return
        }
        that.ss1 = false
        that.users = message
        console.log(that.users)
        that.setToday()
      },
      change (value){
        let that = this
        that.tishi = '7天内'
        that.val1 = value
        let tti = new Date(that.val1.replace(/-/g, "/"));
        let hs = tti.getTime()/1000
        that.kcc = hs - 24 * 60 * 60 *6;
        //今晚零点的时间戳
        that.jcc = hs + 24 * 60 * 60;
        that.zhixing()
      },
      setToday(value){
        let that = this
        let now = new Date()
        let cmonth = now.getMonth() + 1
        let day = now.getDate()
        if (cmonth < 10) cmonth = '0' + cmonth
        if (day < 10) day = '0' + day
        that.val1 = now.getFullYear() + '-' + cmonth + '-' + day
        //开始弄时间戳
        let tti = new Date(that.val1.replace(/-/g, "/"));
        //当天0点时间
        let hs = tti.getTime()/1000
        //6天前的时间戳
        that.kcc = hs - 24 * 60 * 60 *6;
        //今晚零点的时间戳
        that.jcc = hs + 24 * 60 * 60;
        that.zhixing()
      },
      zhixing(){
        let that = this
        that.ss1 = true
        //拿取账户密码。拿去新的值
        let a = that.users.hu
        console.log("查询的账户："+a)
        that.axios.post(that.ull + '/search_cloud_reward',
          {
            "mobile":parseInt(a),
            // "mobile":15139992133,
            "time_start":that.kcc,
            "time_end":that.jcc
          }).then(response => {
          that.ss1 = false
          console.log(response.data)
          if(response.data == 'error_time'){
            that.cuo1 = true
            that.val1 = ''
            return
          }
          that.jiang = response.data
        }).catch(function (error){
          that.ss1 = false
          console.log(error);
        })
      },
      //  处理人民币价格
      chujia(e){
        //  拿取缓存eth的价格
        let a = localStorage.getItem('jia');
        a = JSON.parse(a)
        // //处理价格转化为字符
        let b =  a.ulam*e
        return  b.toFixed(2)
      },
      //提取奖励
      tibi(){
        this.$router.push('/tibi')
      },
      //取消发送邀请码
      yaos(){
        this.yao = false
        this.tren1 = ''
      },
      //  填写上级
      xies(){
        this.yao = true
      },
      xianyan(){
        console.log('789')
        this.yanxian = !this.yanxian
      },
      fanhui1(){
        this.$router.push('/user')
      },
      //  精度加法  奖励和下级奖励相加
      accAdd(arg1,arg2){
        // console.log('开始了')
        let r1, r2, m;
        try {
          r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
          r1 = 0;
        }
        try {
          r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
          r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        this.newli = (arg1 * m + arg2 * m) / m;
        return this.newli;
      },
    }
  }
</script>

<style scoped>
  .vux-x-icon {
    fill:#9C9B9C;
  }
  .li1{
    margin-top:5px;font-size:14px;color:red;
  }
  .tu2{
    float:right;margin-right:4%;
  }
  .tu1{
    width:13px;float:right;margin-top:13px;margin-right:4%;
  }
  .cebor{
    border-bottom: 1px solid #F5F5F5;
  }
  .kk1{
    height:40px;width:100%;line-height:40px;background:#fff;font-size:14px;
  }
  .zi1{
    color: #777575;font-size:14px;margin-top:10px;
  }
  .jiji{
    float:left;width:50%;
    background:#fff;
    height:85px;font-weight:700;font-size:17px;
  }
  .weiji{
    float:left;width:50%;background:#fff;height:85px;font-weight:700;font-size:17px;
  }
</style>

