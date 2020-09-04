<template>
  <div style="width:100%;">
    <div style="background-color: #3e3e3e;height:31px;margin-bottom: -1%"> </div><x-header  :left-options="{preventGoBack: true,backText: ''}" @on-click-back="fanhui1" style="position:fixed;top:0px;width:100%;z-index:999;"
               @on-click-title="ding">糖包详情</x-header>
    <div style="height:40px;"></div>
    <div style="text-align:center;">
      <img src="@/assets/lo.png" alt="" style="width:70px;margin-top:30px;">
      <!-- 半圆-->
      <div class="yuan">
        <div class="nei">
          <p style="font-size:18px;position:relative;top:8px;margin-left:12px;color:#fff;">泰勒矿池{{shuju.type?'普通糖包':'拼手气糖包'}}
            <span style="font-size:12px;color:#ddd;"> (已领取)</span>
          </p>
          <!--<p style="font-size:20px;">恭喜发财 大吉大利</p>-->
          <p style="margin-top:15px;color:white;">
            <span style="font-size:16px;">抢得</span>
            <span style="font-size:26px;font-weight:700;">{{jinjin?jinjin:0}}</span>
            <span style="font-size:16px;">{{bizis}}</span>
          </p>
          <!--固定的位置的 分享图标-->
          <p style="margin-top:6px;font-size:12px;color:white;">人民币≈ {{zijia}} 元</p>
        </div>
        <!--<div style="height:15px;"></div>-->
      </div>
      <div v-on:click="fen" :data-clipboard-text="baoma" class="fx">
        <img src="@/assets/fx1.png" alt="" width="50">
      </div>
    </div>
    <div style="width:100%;background:#ddd;height:40px;">
      <div style="height:4px;"></div>
      <span style="font-size:12px;margin-left:10px;">
        您的ULAM已经存入泰勒矿池(帐号:{{haoma(tel)}})
      </span>
      <!--<p v-on:click="xiazai"-->
         <!--style="text-align:right;color:red;font-size:13px;margin-right:10px;">下载地址</p>-->
    </div>
    <div style="clear: both;"></div>
    <div class="xijie">
      <p>{{shuju.amount?shuju.amount:0}}个糖包，共{{shuju.balance?shuju.balance.toFixed(2):0}}{{chu6(bizis)}}，
        <span v-if="shuju.amount == shuju.amount_now">已经被抢光</span>
        <span v-if="shuju.amount != shuju.amount_now">
              还剩{{shuju.amount - shuju.amount_now}}个
            </span>
      </p>
    </div>
    <!--  领取记录-->
    <div  v-for="(todo,index) in ling" v-bind:key="todo.id" style="border-bottom:1px solid #f5f5f5;">
      <div style="height:60px;padding:10px;box-sizing:border-box;">
        <div style="float:left;width:50%;text-align:left;color:#747474;font-size:14px;">
          <!--用户：<span style="color:red;font-size:12px;">{{ haoma(todo.mobile) }}</span>-->
          用户：{{ haoma(todo.mobile) }}
        </div>
        <div style="float:left;width:50%;font-weight:700;font-size:14px;text-align:right;">
          <span>{{todo.balance}}{{chu6(bizis)}}</span>
          <div style="font-weight: 400;font-size:12px;color:#999;margin-top:5px;">≈￥ {{gaobi(todo.balance)}}</div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div v-if="!shuju.type">
      <div style="text-align:right;position:relative;top:-6px;" v-if="todo.balance == max">
        <img src="@/assets/qiqi.png" alt="" style="width:15px">
        <span style="font-size:12px;color:#ffaa21;position:relative;top:-1px;margin-right:10px;">
                  手气最佳
                  </span>
      </div>
      </div>
    </div>
    <div style="height:40px;"></div>
    <!--加载-->
    <loading :show="lod" text="加载中.."></loading>
  </div>
</template>
<script>
  import { Loading,XHeader} from 'vux'
  import Clipboard from 'clipboard';
  export default {
    components:{Loading,XHeader},
    name: "mebaoinfo",
    mounted(){
      let that = this
      let a = that.$route.params.bao
      let b = that.$route.params.ren
      if(!a){
        return
      }else {
        that.bao = a
        let bc = 'ULAM'
        let dc = 'u'
        that.bizis = bc
        //这里处理一下 推广码
        if(that.isma(b)){
          // that.baoma = '我刚刚发了一个大额 ULAM 糖包儿，快试试你的手气, http://teller.cc/Sugar/#/bao/'+ a +'&'+ b
          that.baoma = '我刚刚发了一个大额'+bc+'糖包儿，快试试你的手气,http://teller.cc/Sugar/#/bao/'+a+'&'+ b+dc
        }else{
          that.baoma = '我刚刚发了一个大额'+bc+'糖包儿，快试试你的手气, http://teller.cc/Sugar/#/bao/'+ a+'15403901'+dc
        }
        //请求 红包详情
        that.lod = true
        that.qing()
      }
      let message = localStorage.getItem('user');
      that.users = JSON.parse(message)
      that.tel =  that.users.hu
      //  拿取人民币 ulam价格
      let ajia = localStorage.getItem('jia');
      let as = JSON.parse(ajia)
      that.ujia = as.ulam
      console.log(that.ujia)
    },
    data(){
      return {
        bizis:'', whobi:0, bao:'gdQD8E26Gu', baoma:'', shuju:'',
        ling:'', lod:false, max:0, tel:'',
        //当前用户领取的金额
        jinjin:'', ujia:0, zijia:''
      }
    },
    methods:{
      ding(){
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      },
      fanhui1(){
          this.$router.push('/shequ1')
      },
      //处理erc20文字
      chu6(a){
        let b = a.indexOf('(')
        if(b == -1){
          return a
        }
        return a.substr(0,b)
      },
      //  显示多少人民币的方法
      gaobi(e){
        let that = this
        if(e){
          if(that.whobi == 'caos'){
            return  (that.ujia*e).toFixed(3)
          }else {
            return (that.ujia*e).toFixed(3)
          }
        }else{
          if(that.whobi == 'caos'){
            that.zijia = (that.ujia*that.jinjin).toFixed(3)
          }else{
            that.zijia = (that.ujia*that.jinjin).toFixed(3)
          }
        }
      },
      isma(val){
        if( /^\d{8}$/.test(val) ){
          return true;
        }
        return false;
      },
      //下载地址
      xiazai(){
        location.href = 'https://url.cn/5sKUyx2'
      },
      //隐藏手机号
      haoma(a){
        let c = a.toString()
        let b =   c.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        return  b
      },
      //分享红包
      fen(){
        let clipboard = new Clipboard('.fx')
        clipboard.on('success', e => {
          console.log('复制成功')
          alert('分享链接已经复制,可以直接粘贴给好友')
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
      //请求红包数据
      qing(){
        let that = this
        if(that.whobi){
          that.faerc()
        }else {
          that.faulam()
        }
      },
      faulam(){
        let that = this
        that.axios.post(this.apiurl+'/ulam_red_packet_search',
          {
            "red_packet_num": that.bao
          }).then(response => {
          that.lod = false
          console.log(response.data)
          that.shuju = response.data.info[0]
          that.ling = response.data.get
          //找到手气最佳的红包
          if(!that.shuju.type){
            that.maxs(that.ling)
          }
          //  找到当前用户领取了多少
          that.dangjin(that.ling)
        }).catch(function (error){
          that.lod = false
          console.log(error);
        })
      },
      faerc(){
        let that = this
        console.log(that.whobi)
        that.axios.post('http://39.100.51.239:5002/erc_red_packet_search',
          {
            "red_packet_num": that.bao,
            "erc20":that.whobi
          }).then(response => {
          that.lod = false
          console.log(response.data)
          that.shuju = response.data.info[0]
          that.ling = response.data.get
          //找到手气最佳的红包
          that.maxs(that.ling)
          //  找到当前用户领取了多少
          that.dangjin(that.ling)
        }).catch(function (error){
          that.lod = false
          console.log(error);
        })
      },
      //  处理红包中最大的一个,
      maxs(e){
        let a = []
        // 遍历数组 拿到所有余额
        e.map(function(ee){
          a.push(ee.balance)
        })
        // console.log(a)
        //找出数组中最大的一个值
        let b = Math.max.apply(null,a)
        // console.log(b)
        this.max = b
      },
      //  通过手机查询 当前用户领取金额
      dangjin(e){
        let that = this
        e.map(function(ee){
          if(ee.mobile == that.tel){
            that.jinjin = ee.balance
          }
        })
        //找到jinjin后执行具体价格
        //   console.log('执行一次把')
        that.gaobi()
      }
    }
  }
</script>
<style scoped>
  .fx{
    width:50px;position:fixed;right:0px;top:60px;
  }
  .xijie{
    text-align:left;border-bottom:1px solid #f5f5f5;height:35px;
    /*color:#966;*/
    padding:10px;margin-top:-10px;font-size:14px;
    line-height:45px;
  }
  .hezi1{
    border-bottom:0.5px solid #eee;height:20px;line-height:20px;
  }
  .nei{
    color:#f9d63f;
    position: relative;
    top:40px;
  }
  .yuan{
    margin-top:-40px;
    width:100%;height:155px;
    background:#727ce8;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    text-align:center;
  }
  .loading{
    position: absolute;
    top: 40%;
    left:41%;
    width:60px;
    height:60px;
    border: 4px solid #aaa;
    border-left-color: #ddd;
    border-radius:50px;
    -webkit-animation:load 1s linear 1s infinite;
    background-color:rgba(0,12,1,0.5);
  }
</style>

