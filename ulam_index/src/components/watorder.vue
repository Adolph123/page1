<template>
  <div style="background:#fff;" :style="{ height: bodyHeight + 'px' }">
    <!--    顶部返回-->
    <div class="backcolors" >
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


    <div style="background: #fff;height: 40px;">
      <div class="tab" :class="{tabActive:bian == 1}" v-on:click="xuan(1)">
        <span>&nbsp;全部&nbsp;</span>
      </div>
      <div class="tab" :class="{tabActive:bian == 2}" v-on:click="xuan(2)">
        <span >&nbsp;收入&nbsp;</span>
      </div>
      <div class="tab":class="{tabActive:bian == 3}" v-on:click="xuan(3)">
        <span>&nbsp;支出&nbsp;</span>
      </div>
      <div style="float:left;width:1%;background:#fff;height:40px;"></div>
    </div>


    <!--交易数据-->
    <!-- 有数据的显示-->
    <scroll class="main-content" ref="scroll" :probeType='probeType' :listenScroll="listenScroll" :pullup="pullup"  @scroll="scrollss"
            id="scroll"     :data="shuju">
      <div @touchstart.prevent="handleTouchStart"
           @touchmove="handleTouchMove"  id="scrollbox"
           @touchend="handleTouchEnd"  >

        <div v-if="loading" style="text-align: center;padding: 10px 0;transition: all 0.5s">
          <i style="font-size: 16px" class="el-icon-loading"></i>
          <span>下拉刷新  </span>
        </div>

        <div v-if="jiaoxian" style="background:#fff;">
          <div style="height:5px;"></div>
          <div class="yi" v-for="(todo,index) in shuju" v-bind:key="todo.id" v-on:click="yiqing(todo)">
            <div style="float:left;width:50%;">
              <div style="line-height:1.6;">
                <p class="zz1 zou">{{(todo.tran_hash).substr(0,9)+'.....'}}</p>
                <p class="zz2 zou">
                  {{ new Date(parseInt(todo.timestamp) * 1000).toLocaleString('chinese',{hour12:false}) }}
                </p>
              </div>
            </div>
            <div style="float:left;width:50%;text-align:right;line-height:42px">
              <p class="zz1 you" v-bind:class="{'hongzi': todo.direction == 'to' }">{{ todo.direction == 'to' ? '+'+todo.value.toFixed(2) :'-'+todo.value.toFixed(2)}}
                <img src="@/assets/you2.png" alt="" style="width:11px;">
              </p>
            </div>
            <div style="clear:both;"></div>
          </div>
          <div v-if="ayin"  style="text-align:center;margin-top:20px;width:70%;margin-left:15%;" @click="jj1">
            <a><img src="@/assets/xia.png" alt="" width="30px"></a>
            <divider><p style="font-size: 14px;font-weight: 400;;color: #999">加载更多</p></divider>
          </div>
          <div v-if="!ayin"  style="text-align: center;margin-top:30px;width:70%;margin-left:15%;">
            <img src="@/assets/sss.png" alt="" width="30px" v-if="xiao" v-on:click="ganshang">
<!--            <divider></divider>-->
            <p style="font-size: 14px;font-weight: 400;;color: #999">已无更多</p>
          </div>
          <div style="height:100px;"></div>
        </div>
        <!--没数据的显示-->
        <div v-if="!jiaoxian" style="width:70%;margin-left:15%;margin-top:60px;">
          <divider> <span style="color:#999;">暂无交易</span> </divider>
        </div>
      </div>
    </scroll>



    <!-- 弹窗 -->
    <loading :show="ss1" text="加载中.."></loading>
  </div>
</template>

<script>
  import {Divider,Group,Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading} from 'vux';
  import {lyricminshow} from '@/common/js/mixin.js';
  import scroll from "@/base/scroll/scroll";
    export default{
        mixins:[lyricminshow],
        name: "watorder",
      components:{
        Divider,Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,scroll
      },
      data(){
          return {
            bodyHeight:'',
            bian:1,
            dizhi:'',
            ss1:false,
            loading:false,
            jiaoxian:false,
            //  当前交易记录的变量
            zshu:0,
            jishu:0,
            shuju:[],
            shuju1:'',
            shuju2:'',
            shuju3:'',
            ghuan:'./static/up.png',
            ghuan1:'./static/down.png',
            //页数
            yys:1,
            ayin:false,
            xiao:false,
          }
      },
      mounted(){
          if(window.plus){
              window.plus.navigator.setStatusBarStyle('white')
          }
          let that = this
        //  获取当前高度
        that.bodyHeight=document.documentElement.clientHeight
      //  获取当前钱包信息
        let message = localStorage.getItem('wals');
        if(message){
          message = JSON.parse(message)
          console.log(message)
          that.dizhi = message.addr
        //  调用查看方法
           that.go(1)
        }
      },
      computed:{
        style1() {
          return {
          width:'100%',
          color: this.quan.color,
          padding:'0 15px 10px',
          borderBottom:'2px solid'+this.quan.color
          }
        },
        style2() {
          return {
            color:'#999'
          }
        },
        quan(){
          return this.$store.state.zuli;
        }
      },
      methods:{
        scrollss(pos){
            this.scrollY = pos.y;
        },
          //划过结束
          handleTouchEnd() {
              if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                  console.log('下拉刷新')
                  this.loading = true;
                  this.shuju = [];
                  this.page = 1;
                  this.go(this.page);
              }
          }
          ,
        //进入详情
        yiqing(e){
          this.$router.push({ name: 'watqing',params:{ id: e,str:this.$route.query.id } })
        },
        jj1(){
          this.go(this.jishu+1)
        },
        //回到顶部
        ganshang(){
          document.documentElement.scrollTop = document.body.scrollTop = 0;
        },
        //  处理数据
        lishuju(e){
          // console.log(e)
          //接收的数据 --转出的数据
          let shu1 = []
          let shu2 = []
          //  拿到当前的数据 进行处理 ee为子元素
          e.map(function(ee){
            if(ee.direction == 'to'){
              shu1.push(ee);
            }else{
              shu2.push(ee)
            }
          })
          //将数据保存
          this.shuju1 = shu1
          this.shuju2 = shu2
          //  判断当前所选择的状态 进行真正的复制信息 that.shuju = that.shuju3
          if(this.bian == 3){
            // console.log('转出')
            this.shuju = shu2
          }else if(this.bian == 2){
            // console.log('接收')
            this.shuju = shu1
          }else{
            // console.log('全部')
            this.shuju = this.shuju3
          }
          //执行完毕后 加载结束
          this.ss1 = false
        },
        //  当我调取到钱包信息成功后，在查询官网的ulam接口
        go(b){
          let that = this;
          //显示加载
          that.ss1 = true;
          let data,apiurl;
          if(that.$route.query.id == 'ULAM'){
              apiurl = this.apiurl+'/get_account';
              data = {	"account":that.dizhi,"Page": b,};
          }else{
              apiurl = this.apiurl+'/get_account_uem';
              data = {	"account":that.dizhi,"Page": b, token_type: "UEM"};
          }
          that.axios.post(apiurl,data).then(response => {

              that.loading = false;
            // that.axios.post('http://39.98.39.198:5000/get_account',{	"account":'ulam0b3f38213dc44eb828806f59ee06947575fb8cd8',"Page": b}).then(response => {
            // that.ss1 = false
            let das = response.data
            console.log(das)
            let la =  das[0].Num
            if(la == 0){
               that.ss1 = false
              that.jiaoxian = false
              console.log('没有记录')
              return;
            }
            that.jiaoxian = true
            that.zshu = la
            //赋值当前页数
            that.jishu = b
            //判断是否存在数据
            if(that.shuju3){
              that.shuju3 = that.shuju3.concat(das.slice(1))
            }else{
              that.shuju3 = das.slice(1);
            }
            //处理数据,增加 转出 和转入  在方法内赋值真正的内容，因为要考虑到在转出和接收页面时点击下一页，不会影响整个数据流
            that.lishuju(that.shuju3)
            //判断尾部 到底显示什么
            if(la<31){
              that.yys = 1
            }else{
              let yu = Math.ceil(la/30)
              //得出总页数
              that.yys = yu
              if( b >= that.yys){
                // console.log('已经是最后一页')  判断当前第几页了
                that.ayin = false
                that.xiao = true
              }else{
                that.ayin = true
              }
            }
          }).catch(function (error) {
            that.ss1 = false
            console.log(error)
            if(error.response.status===429){
              console.log('频率快')
            }
          })
        },
        //选择
        xuan(e){

          let that = this;


         if(e == 1){
           //全部
           that.bian = 1
           that.shuju = that.shuju3
             that.$refs.scroll.scrollTop();
         }else if(e == 2){
           //收入
           that.bian = 2
             that.shuju = that.shuju1
             that.$refs.scroll.scrollTop();
         }else if(e == 3){
           //支出
           that.bian = 3
             that.shuju = that.shuju2
             that.$refs.scroll.scrollTop();
         }

        },
        //  返回方法
        fanhui1(){
            if(this.$route.query.id == 'ULAM'){
                this.$router.push('/wallet')
            }else if (this.$route.query.id == 'UEM'){
                this.$router.push('/uemDetail')
            }

        },
      }
    }
</script>

<style scoped>
  .main-content{
    height: 83vh;
    overflow: hidden;
    position: relative;
  }
  .hongzi{
    color:#E51C23;
  }
  .zou{margin-left:15px;}
  .you{margin-right:15px;}
  .zz2{
    margin-top:5px;
    color:#999;
    font-size:12px;
  }
  .zz1{
    font-weight: 400;
    font-size:12px;
  }
  .yi{
    width:100%;padding-top:10px;border-bottom:0.5px solid #eee;padding-bottom:12px;
  }
  .tab{
    float:left;width:33%;text-align:center;line-height:39px;background:#fff;
    color: #888;border-bottom: 1px solid #eee;font-weight: 400;;
  }
  .tabActive{
    width:33%;text-align:center;line-height:39px;background:#fff; float:left;
    color: rgb(154, 85, 255);;border-bottom: 1px solid rgb(154, 85, 255);;
  }
  .zi1{
    color:#999999;
  }
  .zi2{
    color:#9a55ff;
    padding-bottom:16px;
    border-bottom: 3px solid #9a55ff;
  }

</style>
