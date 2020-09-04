
<template>
  <div style="width:100%;">

    <!--    顶部返回-->

    <div class="backcolors" style="position: fixed;z-index: 1000;width: 100%;background: #fff">
      <div class="mheaderheader">
        <div style="position: absolute;left: 0;z-index: 100" @click="fanhui1">
          <img src="@/assets/back.png" alt="" style="width: 10px;height: auto;display: block">
        </div>
        <div style="height: 30px;">

        </div>
        <div style="position: absolute;width: 100%;left: 0;">
          <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
            <span style="font-size: 16px;color: #fff">糖包详情 </span>
          </div>
        </div>

      </div>
    </div>
    <div style="height: 80px"></div>




    <div style="text-align:center;">
      <img src="@/assets/lo.png" alt="" style="width:40px;height:40px;margin-top:30px;border-radius: 50%" v-on:click="guan1">
      <!-- 半圆-->


      <div  style="height: 190px;overflow: hidden;margin-top: -60px">
        <div class="yuan backcolors">
          <div style="height: 20px;"></div>
          <div class="nei">
            <p style="font-size:12px;position:relative;top:8px;margin-left:12px;color:rgb(234, 210, 255);">来自ULAM的糖包
              <span style="font-size:12px;color:#ddd;"> (已领取)</span>
            </p>
            <!--<p style="font-size:20px;">恭喜发财 大吉大利</p>-->
            <p style="margin-top:25px;color:white;">
              <span style="font-size:16px;">抢得</span>
              <span style="font-size:26px;font-weight:700;">{{jinjin?jinjin:0}}</span>
              <span style="font-size:14px;">{{bizis}}</span>
            </p>
            <!--固定的位置的 分享图标-->
            <p style="margin-top:16px;font-size:12px;color:#f1e1ff;"> ￥{{zijia}} </p>
          </div>
          <!--<div style="height:15px;"></div>-->
        </div>
      </div>

      <div v-on:click="fen" :data-clipboard-text="baoma" class="fx">
        <img src="@/assets/wen/fen.png" alt="" width="25">
      </div>
    </div>
    <div style="background:#f5f5f5;height:40px;display: flex;align-items: center;justify-content: space-between;color: rgb(153, 153, 153);padding: 0 10px">
      <p style="font-size:12px;;">
        您的ULAM已存入ULAM矿池(帐号:{{haoma(tel)}})
      </p>
      <p v-on:click="xiazai"
         style="text-align:right;color:red;font-size:12px;">下载地址</p>
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
          <div style="float: left">
            <img :src="todo.headerImg?todo.headerImg:'./static/tx.png'" alt="用户:"  style="width:36px;display:block;border-radius:50%;margin-top: 2px">
          </div>
          <div style="float:left;margin-left:10px;font-size:16px;color: rgb(153, 153, 153);;display: flex;align-items: center;height: 40px">
            <!--<p>{{ haoma(todo.mobile) }}</p>-->
            <div>
              <p style="font-size: 12px">{{todo.nickname ?todo.nickname:"泰勒矿工"}}</p>
              <div v-if="!shuju.type">
                <div style="position: relative;top:0px;padding-top: 10px" v-if="todo.balance == max">
                  <p style="color:#ffaa21;position:relative;top:-1px;margin-right:10px;;font-size: 12px">
                    手气最佳
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="float:left;width:50%;font-weight:400;font-size:12px;text-align:right;">
          <span>{{todo.balance}}{{chu6(bizis)}}</span>
          <div style="font-weight:500;font-size:12px;color:#999;margin-top:5px;">≈￥ {{gaobi(todo.balance)}}</div>
        </div>
      </div>
      <div style="clear: both;"></div>

    </div>
    <div style="height:40px;"></div>
    <!--加载-->
    <div class="loading" v-if="lod"></div>
  </div>
</template>
<script>
    import Clipboard from 'clipboard';
    export default {
        name: "info",
        mounted(){
            let that = this
            let a = that.$route.params.bao
            let b = that.$route.params.ren
            that.whobi =  that.$route.params.bi
            if(!a){
                return
            }else {
                that.bao = a
                let bc = 'ULAM'
                let dc = 'u'
                if(that.whobi =='ulam'){
                    bc = 'ULAM(erc20)'
                    that.bizis = bc
                    dc = 'ue'
                }else if(that.whobi =='caos'){
                    bc = 'CAOS(erc20)'
                    that.bizis = bc
                    dc = 'ca'
                }else{
                    bc = 'ULAM'
                    that.bizis = bc
                    dc = 'u'
                }
                //这里处理一下 推广码
                if(that.isma(b)){
                    // that.baoma = '我刚刚发了一个大额 ULAM 糖包儿，快试试你的手气, http://teller.cc/Sugar/#/bao/'+ a +'&'+ b
                    that.baoma = '我刚刚发了一个大额'+bc+'糖包儿，快试试你的手气,,http://ulamchain.io/open/#/bao/'+a+'&'+ b+dc
                }else{
                    that.baoma = '我刚刚发了一个大额'+bc+'糖包儿，快试试你的手气, ,http://ulamchain.io/open/#/bao/'+ a+'15403901'+dc
                }
                //请求 红包详情
                that.lod = true
                that.qing()
            }
            that.tel = JSON.parse(localStorage.getItem("user")).hu;
            // console.log(typeof 123.3)
            //  拿取人民币 ulam价格
            that.ujia = localStorage.getItem("ujia");
        },
        data(){
            return {
                bizis:'', whobi:0, bao:'gdQD8E26Gu', baoma:'', shuju:'', ling:'', lod:false, max:0, tel:'',
                //当前用户领取的金额
                jinjin:'', ujia:0, zijia:'',surl:this.apiurlCommunity,ling1:'',
            }
        },
        methods:{
            fanhui1(){
                this.$router.go(-1)
            },
            //拿头像
            taketx(a){
                let that = this
                that.axios.post(that.surl+'/get-headers/ulam123456', a).then(response =>
                {
                    let data = response.data
                    for(let i =0;i < data.length;i++){
                        that.ling1[i].nickname = data[i].nickname
                        that.ling1[i].headerImg = that.surl + data[i].headerImg
                    }
                    that.ling = that.ling1
                }).catch(function (error){
                    console.log(error);
                })
            },
            shaicha(a){
                let arr = []
                for (let i =0;i<a.length;i++){
                    arr.push(a[i].mobile.toString())
                }
                //拿到对应的查询数据，进行查询头像，昵称
                this.taketx(arr)
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
                //  1ulam = that.ujia
                // that.jinjin = ?
                let that = this
                if(e){
                    if(that.whobi == 'caos'){
                        that.ujia = localStorage.getItem("cjia");
                        console.log(that.ujia)
                        return  (that.ujia*e).toFixed(3)
                    }else {
                        that.ujia = localStorage.getItem("ujia");
                        return (that.ujia*e).toFixed(3)
                    }
                }else{
                    if(that.whobi == 'caos'){
                        that.ujia = localStorage.getItem("cjia");
                        that.zijia = (that.ujia*that.jinjin).toFixed(3)
                    }else{
                        that.ujia = localStorage.getItem("ujia");
                        that.zijia = (that.ujia*that.jinjin).toFixed(3)
                    }
                }
            },
            guan1(){
                localStorage.removeItem("wals");
                localStorage.removeItem("tel");
                localStorage.removeItem("bao");
                localStorage.removeItem("ujia");
            },
            isma(val){
                if( /^\d{8}$/.test(val) ){
                    return true;
                }
                return false;
            },
            //下载地址
            xiazai(){
                // void window.plus.runtime.openURL("http://test1.ulamchain.io/ulamkg.php");
                location.href = 'http://test1.ulamchain.io/ulamkg.php'
            },
            //隐藏手机号
            haoma(a){
                let c = `${a}`;
                let b =   c.replace(/(\d{3})\d{4}(\d{4})/, '$1***$2');
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
                    that.ling1 = response.data.get
                    //重组查询条件
                    that.shaicha(that.ling1)
                    //找到手气最佳的红包
                    if(!that.shuju.type){
                        that.maxs(that.ling1)
                    }
                    //  找到当前用户领取了多少
                    that.dangjin(that.ling1)
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
    width:50px;position:absolute;right:0px;top:70px;
  }
  .xijie{
    text-align:left;border-bottom:1px solid #f5f5f5;height:40px;
    color:#583380;
    font-size:12px;
    line-height:40px;
    margin-left:10px
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
    width:100%;
    height:260px;
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

