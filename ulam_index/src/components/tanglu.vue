<template>
    <div style="background:#fff;font-size: 16px;" :style="{ height: bodyHeight + 'px' }">
      <div style="position:fixed;top:0px;width:100%;">
        <div class="backcolorsss">
          <div style="height:25px;"></div>
          <x-header  :left-options="{preventGoBack: true,backText: ''}" style="z-index:999;background: rgba(0,0,0,0)" @on-click-back="fanhui1">我的糖包
            <a slot="right" v-on:click="tlu"><span style="color:white;" v-if="bi != 'ULAM'">提取</span></a>
          </x-header>
          <!--显示的脔割数据-->
          <div style="text-align:center;">
            <div style="height:15px;"></div>
            <p style="color: white;font-size:28px;font-weight:700;">
              {{bishu}}
            </p>
            <!--帅气的线条-->
            <div style=" margin:5px auto;
           height: 1px;
           width:8rem;
           background: radial-gradient(#eee 24%, transparent 100%);"></div>
            <p style="font-size:14px;color: white;">{{bi}}</p>
            <div style="height:15px;"></div>
          </div>

        </div>

        <div style="background: #fff">
          <!--选择键-->
          <div style="width:100%;height:50px;line-height:50px;border:1px solid #fff;">
            <div style="width:60%;margin-left:20%;">
              <div v-bind:class="[xuan ? 'shou': 'fa']" v-on:click="xuanlu">
                我收到的
              </div>
              <div v-bind:class="[xuan ? 'fa': 'shou']" v-on:click="xuanlu">
                我发出的
              </div>
            </div>
          </div>



          <div style="clear:both;"></div>
          <div style="height:36px;line-height:36px;width:100%;border-bottom:1px solid #eee;background: #fff">
            <p class="tzi1" style="text-align: left">{{jianjie}}</p>
          </div>
        </div>
      </div>
      <div style="height:267px;"></div>
      <!-- 内容-->
      <div style="box-sizing:border-box;background:#fff;">
          <div v-for="(todo,index) in shujus" v-bind:key="todo.id">
            <div style="height:65px;border-bottom:1px solid #eee;padding: 0 15px;">
                <div style="float: left;width:50%;">
                  <p style="margin:8px 0;font-size: 12px">{{todo.num}}</p>
                  <p class="tzi">{{new Date(parseInt(todo.time) * 1000).toLocaleString('chinese',{hour12:false})}}</p>
                </div>
                <div style="float:left;width:50%;text-align:right;line-height:65px;">
                  <p v-if="xuan" style="color:#E51C23;">+ {{todo.balance}}</p>
                  <p v-if="!xuan">- {{todo.balance}}</p>
                </div>
            </div>
          </div>
      </div>
      <div style="clear:both;"></div>
      <!--弹窗-->
      <loading :show="ss1" text="加载中.."></loading>
      <loading :show="ss5" text="提取中.."></loading>
      <!--资金密码 -->
      <popup v-model="ss2" height="480px" is-transparent>
        <div style="width:95%;background-color:#fff;height:460px;margin:0 auto;border-radius:5px;padding-top:10px;">
          <div style="width:90%;margin-left:5%;">
            <p style="font-size:20px;font-weight:700;text-align: center;">提取</p>
          </div>
          <div style="padding:10px;box-sizing: border-box;font-size:14px;color:#966;">
            提示：erc20币种的糖包会存放在糖包余额中</div>
          <group>
            <group-title slot="title"><span style="color:#fff;">-</span>
              <span style="float:right;color:#437dff;" v-on:click="ztl">转到泰勒钱包</span>
            </group-title>
            <x-input v-model="shoudi" title="提取地址" placeholder="请输入eth地址"></x-input>
          </group>
          <group>
            <x-input v-model="tijin" title="提取金额" type="number" placeholder="请输入提取金额"></x-input>
          </group>
          <group>
            <x-input v-model="anmi" title="资金密码" type="password" placeholder="必填"></x-input>
          </group>
          <div style="font-size:12px;color:red;padding:10px;box-sizing:border-box;margin-top:5px;">
            注：手续费为0.0014eth
          </div>
          <div style="padding:20px 15px;margin-top:-10px;">
            <x-button  @click.native="quefa" style="background:#11bcd8;color:white;">确认</x-button>
            <x-button @click.native="bufa">取消</x-button>
          </div>
        </div>
      </popup>

      <toast v-model="ss3" type="cancel" :time="1100" is-show-mask text="请输入正确的资金密码!" width="18em"></toast>
      <toast v-model="ss4" type="cancel" :time="1100" is-show-mask text="提取金额要大于1!" width="18em"></toast>
      <toast v-model="ss6" type="cancel" :time="1800" is-show-mask text="提取失败！请检查余额是否不足" width="18em"></toast>
      <toast v-model="ss7" type="cancel" :time="2200" is-show-mask text="提取成功！即将跳转钱包页面" width="18em"></toast>
      <toast v-model="ss8" type="cancel" :time="2200" is-show-mask text="请输入正确的接收地址!" width="18em"></toast>
      <!-- 底部选择 -->
      <actionsheet
        v-model="show1"
        :menus="menus1"
        @on-click-menu="click2"
        show-cancel
        ></actionsheet>
    </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Loading,Popup,Actionsheet,GroupTitle} from 'vux'
    export default {
        name: "tanglu",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Loading,Popup,Actionsheet,GroupTitle
      },
      data(){
          return {
            menus1: {
              ti:'提取',
              see: '提取记录'
            },
            bi:'',
            bi1:'',
            bishu:0,
            xuan:true,
            ss1:false,
            users:'',
            shujus:'',
            bodyHeight:'',
            jianjie:'',
            ss2:false,
            ss3:false,
            ss4:false,
            ss5:false,
            ss6:false,
            ss7:false,
            ss8:false,
            tijin:'',
            anmi:'',
            show1:false,
            shoudi:'',
          }
      },
      mounted(){
          if(window.plus){
              window.plus.navigator.setStatusBarStyle('white')
          }
          let that = this
          that.bodyHeight=document.documentElement.clientHeight
          //是那种币
          that.bi1 = that.$route.params.bi
          that.bi = 'ULAM'
          //币的金额是多少
          that.bishu = that.$route.params.jin.toFixed(2)
          console.log('币是：'+that.bi1+',金额：'+that.bishu)
        let message = localStorage.getItem('user');
        if(!message){
          that.$router.push('/zhu')
        }else{
          message = JSON.parse(message)
          that.users = message
          // console.log(that.users)
          // 调取红包记录
          that.diao()
        }
      },
      computed:{
        ull(){
          return this.$store.state.uri;
        }
      },
      methods:{
        isEthAddr(addr) {
          if (/^(0x)?[0-9a-fA-F]{40}$/.test(addr)) {
            return true;
          }
          return false;
        },
        //  获取自己本地的地址
        ztl(){
          console.log('选择本地钱包地址')
          //开始真正的提起 首先拿取参数 获取自己的erc20 的钱包地址
          let addr = localStorage.getItem('caos');
          addr = JSON.parse(addr)
          //  获得自己钱包的地址
          this.shoudi = addr.addr
        },
        //调取红包记录
        diao(a){
          let that = this
          that.ss1 = true
          let s1 = 1
          //1 是接收  0 是发送
          if(a){
            s1 = 0
          }else {
            s1 = 1
          }
          let data = ''
          let url = ''
            data ={
              "mobile":parseInt(that.users.hu),
              "password":that.users.mima,
              "from_to":s1
            };
            url =that.ull+ '/ulam_red_packet_search_self'
          that.axios.post(url,data
          ).then(response =>{
            that.ss1 = false
            that.shujus = response.data.reverse()
            that.chuzi(that.shujus,s1)
          }).catch(function (error){
            that.ss1 = false
            console.log(error);
          })
        },
        //  选择记录
        xuanlu(){
          let that = this
          that.xuan = !that.xuan
          if(that.xuan){
            that.diao()
          }else {
            that.diao(1)
          }
        },
        //处理红包显示文字  数据和发送，接收
        chuzi(a,b){
        // 包数量
          let bs = a.length
        //  总数量
          let zs = 0
          a.map((ee)=> {
            zs = ee.balance + zs
          })
          //if b 那就是接收 否则就是发送
          if(b){
            this.jianjie = '收到'+bs+'个红包,共'+zs.toFixed(2)
          }else {
            this.jianjie = '发出'+bs+'个红包,共'+zs.toFixed(2)
          }
        },
        //提取红包余额 弹窗
        tlu(){
          this.show1 = true
        },
        //选择是提取 还是看记录
        click2(key){
          let that = this
          // console.log(key)
          if(key =='ti'){
            that.ss2 = true
          }else if(key == 'see'){
            // console.log('看记录') this.$router.push({ name: 'tanglu',params:{ bi: 'caos',jin:this.wal.balance_red } })
            that.$router.push({ name: 'tanglus',params:{bi:that.bi1 ,jin:that.$route.params.jin} })
          }else {
            console.log('取消')
          }
        },
        bufa(){
          let that = this
          that.ss2 = false
          that.shoudi = ''
          that.tijin = ''
          that.anmi = ''
        },
        //真正提取
        quefa(){
          let that = this
          //判断以太坊地址
          let didi = that.shoudi
          if(!that.isEthAddr(didi)){
            that.ss8 = true
            that.shoudi = ''
            return
          }
          //  判断金额
          let b = parseInt(that.tijin)
          if(b < 1 ){
            that.ss4 = true
            that.tijin = ''
            return
          }
          //判断密码
          let a = that.anmi
          if(a.length < 3 ){
            that.ss3 = true
            that.anmi = ''
            return
          }
          that.ss5 = true
          // console.log(addrs)
          //开始执行
          // 39.100.51.239:5002/drawback_erc  wyb0918
          that.axios.post(
            "http://39.100.51.239:5002/drawback_erc",
            {
                "password":that.users.mima,
                "mobile":parseInt(that.users.hu),
                "erc20":that.bi1,
                "recipient":didi,
                "drawback_passwd":a,
                "amount":b
            }
          ).then(response =>{
            that.ss5 = false
            console.log(response.data)
            if(response.data == 'error'){
              that.ss6 = true
              that.anmi = ''
            }else if (response.data =='password_drawback_error'){
              that.ss3 = true
              that.anmi = ''
            }else if(response.data == 'succeful'){
                that.bufa()
                that.ss7 = true
              setTimeout(() => {
               that.fanhui1()
              }, 2400)
            }
          }).catch(function (error){
            that.ss5 = false
            console.log(error);
          })
        },
        //返回
        fanhui1() {
          let that = this
          if(that.bi1=='ulamerc'){
            that.$router.push('/ulamerc')
          }else  if(that.bi1 == 'ulam'){
            that.$router.push('/bag')
          }else  if(that.bi1 == 'caos'){
            that.$router.push('/caos')
          }
        },
      }
    }
</script>

<style scoped>
  .backcolorsss{
    background:linear-gradient(to bottom right, #76c4ff , #7458fd); ;
  }
  .tzi1{
    font-size:14px;color:#999;margin-left:15px;
  }
  .tzi{
    font-size:12px;color:#999;margin-top:2px;
  }
.shou{
  float: left;width: 50%;text-align:center;color:#9a55ff;font-weight:700;
  border-bottom:2px solid #9a55ff;
}
.fa{
  float: left;width: 50%;text-align:center;
}
</style>
