<template>
  <div style="background: linear-gradient(rgb(118, 196, 255), rgb(116, 88, 253));position: absolute;height: 100vh;overflow: hidden;width: 100%">
    <!--    //提示-->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>



    <!--      //复制矿池地址-->
    <popup  v-model="isdizhi" position="bottom" style="margin-bottom:30vh;"  height="460px;"  is-transparent>
      <div style="width: 90%;margin: 5vh auto;background: #fff;border-radius: 6px">
        <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
          <p style="font-size:18px;font-weight:700;text-align:center;">充值地址</p>
        </div>

        <div  style="width:90%;margin: 15px auto;word-wrap:break-word;display: -webkit-box;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
          {{additem}}
        </div>

        <div style="display: flex;justify-content: space-between;align-items: center;padding: 5px 10px">
          <span :data-clipboard-text="additem" class="btoms" @click="copy">复制</span>
          <span class="btoms" @click="isdizhi = false" style="width:48%;background: #fff;color: #9a55ff;border: 1px solid #9a55ff">取消</span>
        </div>
        <div style="height: 25px"></div>
      </div>
    </popup>


    <popup  v-model="tuoguangb" position="bottom" style="margin-bottom:30vh;"  height="460px;"  is-transparent>
      <div style="width: 90%;margin: 5vh auto;background: #fff;border-radius: 6px">
        <div style="padding: 20px">
          <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
            <p style="font-size:18px;font-weight:700;text-align:center;">请输入提取金额</p>
          </div>
          <div style="padding: 15px 0">
            <input class="inp" style="width: 100%;font-weight: 400;padding: 5px 0;" v-model="amount"  type="number"  placeholder="请输入提取金额"></input>
          </div>
          <div style="height: 15px"></div>
          <div style="display: flex;justify-content: space-between;align-items: center">
            <span class="btoms" @click="tagglemimma">确定</span>
            <span class="btoms" @click="tuoguangb = false" style="width:48%;background: #fff;color: #9a55ff;border: 1px solid #9a55ff">取消</span>
          </div>
          <div style="height: 5px"></div>
        </div>
      </div>
    </popup>

    <!--资金密码框-->
    <popup v-model="jintan" height="310px" is-transparent position="top" style="margin-top:15vh;" :hide-on-blur="false">
      <div style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
        <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
          <p style="font-size:18px;font-weight:700;text-align:center;">请输入资金密码</p>
        </div>
        <group>
          <x-input v-model="drawback_passwd" title="资金密码" type="password"  placeholder="请输入资金密码"></x-input>
        </group>
        <div style="padding:20px 15px;margin-top:25px;">
          <x-button  @click.native="exchangeCoin()" style="background:linear-gradient(to bottom right, #dd8fff , #9a55ff);color:white;height:40px;">确认提币</x-button>
          <x-button @click.native="jinsxiao" style="height:40px;">取消</x-button>
        </div>
      </div>
    </popup>





    <div class="el-page-header">
      <div class="el-page-header__title" @click="taggbacks">
        <img src="@/assets/2_03.png" alt="" style="width: 7vw">
      </div>

      <div class="el-page-header__content">


        <div class="titlebox">
          <span style="color: #fff">{{content}}</span>
        </div>


      </div>


      <div style="position: absolute;right: 15px;z-index: 10">
        <img @click="shuaxin" src="@/assets/shua.png" :class="{shua:ss3}" alt="" style="width: 22px;height:auto;display: block;">
      </div>
    </div>




    <!--      <HeaderPage :content="content" @taggbacks="taggbacks"></HeaderPage>-->


    <div style="color: #FAED7C;margin: 15px 20px 10px;">
      ULAM市值：￥{{priceAlls.ulam}}
    </div>
    <scroll class="main-content">
      <div>
        <div style="padding: 0 15px 10px">


          <div style="background: #fff;padding: 10px 20px;border-radius: 6px;">

            <div style="margin-bottom: 27px"><span style="font-weight: 700;font-size: 14px">UEM兑换ULAM</span></div>
            <div class="boxflex">
              <span>UEM与ULAM的兑换比例</span><span style="color: red">{{exchangeBl.uem_ulam}}:1</span>
            </div>

            <div style="margin: 20px 0;">

              <div style="display: flex;justify-content: space-between;align-items: center;line-height: 30px">
                <input type="text" class="inp" v-model="numsuem">
                <p style="width: 10%;text-align: center">
                  <img src="@/assets/sort.png" alt="" style="width: 75%;height: auto;display: block;margin: 0 auto">
                </p>
                <input type="text" class="inp" v-model="uem_ulam">
              </div>
            </div>

            <div class="boxflex" style="justify-content: center;margin: 35px 0 5px">
              <span class="btoms" @click="adminset('ulam')" style="width: 100%">确定</span>
            </div>
          </div>


          <div style="background: #fff;padding: 10px 20px;border-radius: 6px;margin-top: 20px">
            <div style="margin-bottom: 27px"><span style="font-size: 14px;font-weight: 700">ULAM兑换UEM</span></div>
            <div class="boxflex">
              <span>ULAM与UEM的兑换比例</span><span style="color: red">{{exchangeBl.ulam_uem}} :1</span>
            </div>
            <div style="margin: 20px 0;">

              <div style="display: flex;justify-content: space-between;align-items: center;line-height: 30px">
                <input type="text" class="inp" v-model="numsulam">
                <p style="width: 10%;text-align: center">
                  <img src="@/assets/sort.png" alt="" style="width: 75%;height: auto;display: block;margin: 0 auto">
                </p>
                <input type="text" class="inp" v-model="ulam_uem">
              </div>
            </div>

            <div class="boxflex" style="justify-content: center;margin: 35px 0 5px">
              <span class="btoms" @click="adminset('uem')" style="width: 100%">确定</span>
            </div>
          </div>

        </div>
        <div style="padding: 0 15px 10px" >
          <div style="background: #fff;padding: 10px 20px;border-radius: 6px;margin-top: 10px;">
            <div style="margin-bottom: 27px">
              <span style="font-size: 14px;font-weight: 700;">uem矿池</span>
            </div>
            <div>
              <div v-if="exchangeBl.uem" class="inp" style="width: 100%" >{{exchangeBl.uem.toFixed(3)}}</div>
            </div>
            <div class="boxflex" style="margin:15px 0 5px">
              <span class="btoms" style="width:48%;" @click="add()">充值</span>
              <span class="btoms" @click="takeout('uem')" style="width:48%;background: #fff;color: #9a55ff;border: 1px solid #9a55ff">提币</span>
            </div>
          </div>




          <div style="background: #fff;padding: 10px 20px;border-radius: 6px;margin-top: 20px;">
            <div style="margin-bottom: 27px">
              <span style="font-size: 14px;font-weight: 700;">ulam矿池</span>
            </div>
            <div>
              <div v-if="exchangeBl.ulam" class="inp" style="width: 100%" >{{exchangeBl.ulam.toFixed(3)}}</div>
            </div>
            <div class="boxflex" style="margin: 15px 0 5px">
              <span class="btoms" style="width:48%;" @click="add()" >充值</span>
              <span class="btoms"  @click="takeout('ulam')" style="width:48%;background: #fff;color: #9a55ff;border: 1px solid #9a55ff">提币</span>
            </div>
          </div>



        </div>
        <div style="height: 60px"></div>
      </div>
    </scroll>








    <!--弹窗-->
    <Loading v-model="ss3"   is-show-mask text="加载中..."></Loading>
  </div>
</template>

<script>
    import Clipboard from 'clipboard';
    import HeaderPage from "@/base/HeaderPage/HeaderPage";
    import {getdislistset} from '@/api/index';
    import Prompts from '@/base/prompt/prompt';
    import scroll from "@/base/scroll/scroll";
    import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Loading,Popup,Alert,Divider,InlineLoading,Tabbar,TabbarItem,Actionsheet} from 'vux'
    export default {
        name: "administrators",
        components: {
            HeaderPage,Prompts,scroll,
            Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Loading,Popup,Alert,Divider,InlineLoading,Tabbar,TabbarItem,Actionsheet,Prompts
        },
        data() {
            return {
                ss3:false,
                content: '更改兑换比例',
                isPrompt:false,//提示框的展示与隐藏
                Prompttext:'',//提示框成功或失败
                Promptmsg:'',//提示框成功或者失败原因
                Promptimage:'',//是否展示图片
                exchangeBl:{},
                numsulam:1,
                numsuem:1,
                uem_ulam:0,
                ulam_uem:0,
                priceAlls:'',
                isexchangeBl:true,
                input:'',
                jintan:false,
                anmi:'',
                tuoguangb:false,tuoguan:false,istitle:true,
                drawback_passwd:'',amount:'',
                istiqu:'',
                additem:'',
                isdizhi:false,
            }
        },
        created(){
            //查询需要条件
            this._getexchange();
        },
        methods: {
            //刷新
            shuaxin(){
                this.ss3 = true;
                this._getexchange();
            },
            copy(){
                let clipboard = new Clipboard('.btoms')
                clipboard.on('success', e => {
                    console.log('复制成功')
                    this.tagglePrompt(true,'复制成功');
                    // 释放内存
                    clipboard.destroy()
                    setTimeout(()=>{
                        this.isdizhi = false
                    },100)
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    console.log('该浏览器不支持自动复制')
                    // 释放内存
                    clipboard.destroy()
                })
            },

            //打开输入密码
            tagglemimma(){
                if(this.amount >0){
                    this.jintan = true;
                    this.tuoguangb = false;
                }else {
                    this.tagglePrompt(false,'请输入提取金额')
                }

            },
            //打开输入金额
            jinsxiao(){
                this.jintan = false;
                this.amount = ''
            },
            //请求兑换比例
            _getexchange(){
                this.axios.get(this.apiurl+'/search_exchange_pool').then(res => {
                    console.log(res.data.data,'@@@@@')
                    if(res.data.status =="success"){
                        this.exchangeBl = res.data.data;
                        this.uem_ulam = Math.floor(this.numsuem/res.data.data.uem_ulam * 10000) / 10000;
                        this.ulam_uem = Math.floor(this.numsulam/res.data.data.ulam_uem * 10000) / 10000;
                    }
                });
                //交易设兑换比例 人民币兑换比例
                this.axios.get(this.apiurl+'/token_price_all').then(res => {
                    console.log(res.data[0].ulam,'@@@@@交易设兑换比例')
                    this.priceAlls = res.data[0]
                })
                //矿池充值
                this.axios.get(this.apiurl+'/pool_addr').then(res => {
                    console.log(res.data.data,'@@@@@矿池充值');

                    this.additem = res.data.data;


                    setTimeout(()=>{
                        this.ss3 = false;
                    },500)
                })

            },
            taggbacks() {
                this.$router.push('/user')
            },
            //提示框出现
            tagglePrompt(isflag,text,msg){
                if(isflag){
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.Promptimage = isflag;
                    this.isPrompt = true;
                }else{
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.Promptimage = isflag;
                    this.isPrompt = true;
                }
                setTimeout(()=>{
                    this.isPrompt = false;
                },1500)
            },
            //更改比例
            adminset(str){
                let type,amount;
                if(str == 'uem'){

                    type ='rate_ulam_uem';
                    amount = Math.floor(this.numsulam/this.ulam_uem * 10000)/10000;
                    console.log('兑换UEM',amount)
                }else if(str == 'ulam'){
                    console.log('兑换ULAM')
                    type ='rate_uem_ulam';
                    amount =  Math.floor(this.numsuem/this.uem_ulam * 10000)/10000;
                    console.log('兑换ULAM',amount)
                }

                let apiurl =  'admin_set';
                let user = JSON.parse(localStorage.getItem('user'));
                let data = {
                    "mobile":parseInt(user.hu),
                    "password":user.mima,
                    type,
                    amount
                };
                getdislistset(apiurl,data).then(res=>{

                    if (res.status == "success"){
                        this.tagglePrompt(true,'设置成功')
                        this._getexchange()
                    }else{
                        this.tagglePrompt(false,res.data)
                    }


                    console.log(res,'@@@@@@@')
                })


            },
            //充值
            add(){
                this.isdizhi = true;
            },
            exchangeCoin(){
                this.jintan = false;
                let apiurl;
                if( this.istiqu == 'UlAM'){
                    apiurl = 'pool_ulam_drawback';
                    console.log('提ULAM')
                }else if( this.istiqu == 'UEM'){
                    console.log('提UEM')
                    apiurl = 'pool_uem_drawback';
                }
                let user = JSON.parse(localStorage.getItem('user'));
                let data={
                    'mobile':parseInt(user.hu),
                    'password':user.mima,
                    'drawback_passwd':this.drawback_passwd,
                    'amount':parseInt(this.amount),
                };
                getdislistset(apiurl,data).then(res=>{
                    this.drawback_passwd = '';
                    this.amount = '';
                    console.log(res,'#@@@@@@@@@@@@@')
                    if(res.status == "success"){
                        this.tagglePrompt(true,'提币成功');
                        this._getexchange();
                    }else{
                        this.tagglePrompt(false,res.data)
                    }
                })
            },
            //提走
            takeout(str){
                if(str == 'uem'){
                    this.istiqu = 'UEM';
                    console.log('提UEM')
                }else if(str == 'ulam'){
                    console.log('提ULAM')
                    this.istiqu = 'UlAM';
                }
                console.log(this.istiqu);
                this.tuoguangb = true;
            }
        }
    }
</script>

<style scoped>
  .el-page-header {
    display: flex;
    align-items: center;
    line-height: 1rem;
    padding: 40px 0 0px;
    width: 100vw;
    position: relative;
    /*background: linear-gradient(to bottom right, #dd8fff , #9a55ff);*/
    font-size: 0.8rem;
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

  .main-content{
    height: 90vh;
    overflow: hidden;
    position: relative;
  }
  .boxflex{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .inp{
    outline: 0;
    border: 0;
    text-align: center;
    background: #f5f5f5;
    height: 30px;
    line-height: 30px;
    font-weight: 700;
    font-size: 16px;
    border-radius: 6px;
    width: 39%;
  }
  .shua{
    transition: all 3s;
    transform: rotate(1440deg);
  }
  .btoms{
    width: 45%;
    text-align: center;
    line-height: 30px;
    display: inline-block;
    background: linear-gradient(to bottom right, #dd8fff , #9a55ff);
    padding: 3px 0;
    border-radius: 6px;
    font-weight: 700;
    color: #fff;
  }
</style>
