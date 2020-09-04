<template>
  <div style="background-color: #FFFFFF;">


    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>

    <!--资金密码框-->
    <popup v-model="jintan" height="310px" is-transparent position="top" style="margin-top:15vh;" :hide-on-blur="false">
      <div style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
        <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
          <p style="font-size:18px;font-weight:700;text-align:center;">请输入资金密码</p>
        </div>
        <group>
          <x-input v-model="anmi" title="资金密码" type="password"  placeholder="请输入资金密码"></x-input>
        </group>
        <div style="padding:20px 15px;margin-top:25px;">
          <!--<x-button type="primary" @click.native="zhuan1">确认转出</x-button>-->
          <x-button  @click.native="exchangeCoin(isexchangeBl)" style="background:linear-gradient(to bottom right, #dd8fff , #9a55ff);color:white;height:40px;">确认兑换</x-button>
          <x-button @click.native="jintan = false" style="height:40px;border: 0">取消</x-button>
        </div>
      </div>
    </popup>

    <scroll class="main-content">
      <div style="background-color:#FFFFFF;">
        <div style="background-color: #4955D3;padding-top:40px;height: 300px;border-bottom-left-radius: 30px;border-bottom-right-radius: 30px;">
          <div style="padding:10px;font-size: 16px;color: #fff;display:flex;justify-content: space-between;align-items: center">
            <img @click="gobacks" src="@/assets/2_03.png" alt="" style="display: block;width: 26px;height: 26px" >
            <span>BCSC兑换TCC</span>
            <span> </span>
          </div>
          <div style="margin: 10px 35px 0px;color: #fff;">
            <span style="font-size: 14px" v-if="isexchangeBl">现BCSC兑换TCC的比例：：<span style="font-weight: 600;font-size:18px;color: red;">{{exchangeBl.uem_ulam }}:1</span></span>
            <span style="font-size: 14px" v-else>现兑换BCSC的比例：：<span style="font-weight: 600;font-size: 18px;color: red;">{{exchangeBl.ulam_uem}}:1</span></span>
          </div>
		  <div style="">
		              <div style="margin: 0px 15px;border-radius: 6px;padding: 15px 0;display: block;">
		                <div style="padding: 10px 20px;">
		                  <div  v-show="isexchangeBl" style="display: flex;align-items: center;text-align: center;justify-content: space-between">
		                    <p  style="transition: all 1s;width: 45%">
		                      <el-input v-model="input"  placeholder="请输入UEM数量"></el-input>
		                    </p>
		  
		                    <p @click="isexchangeBl = !isexchangeBl" style="text-align: center;width: 10%;">
		                      <img src="@/assets/sort.png" alt="" style="width: 65%;height: auto;display: block;margin: 0 auto">
		                    </p>
		  
		                    <p v-if="input/exchangeBl.uem_ulam" style="transition: all 0.5s;width: 45%">
		                      <el-input v-model="(input/exchangeBl.uem_ulam).toFixed(3)" placeholder="兑换成ULAM数量"></el-input>
		                    </p>
		                    <p v-else style="transition: all 0.5s;width: 45%" >
		                      <el-input  placeholder="兑换成ULAM数量"></el-input>
		                    </p>
		  
		  
		                  </div>
		  
		  
		  
		  
		  
		                  <div v-show="!isexchangeBl" style="display: flex;align-items: center;justify-content: space-between;">
		                    <p  style="transition: all 1s;width: 45%">
		                      <el-input v-model="input" placeholder="请输入ULAM数量"></el-input>
		                    </p>
		  
		                    <p @click="isexchangeBl = !isexchangeBl" style="text-align: center;width: 10%">
		                      <img src="@/assets/sort.png" alt="" style="width: 65%;height: auto;display: block;margin: 0 auto">
		                    </p>
		  
		                    <p v-if="input/exchangeBl.ulam_uem"  style="transition: all 0.5s;width: 45%" >
		                      <el-input  v-model="(input/exchangeBl.ulam_uem).toFixed(3)" placeholder="兑换成UEM数量"></el-input>
		  <!--                    <el-input v-else v-model="" placeholder="兑换成UEM数量"></el-input>-->
		                    </p>
		                    <p v-else style="transition: all 0.5s;width: 45%" >
		                      <el-input  placeholder="兑换成UEM数量"></el-input>
		                    </p>
		                  </div>
		  
		                </div>
		                <div style="margin: 10px 20px">
		  <!--               <div style="font-size: 12px;color: red;margin-bottom: 1px;padding-top: 10px;margin-bottom: 15px;"><span>兑换时间:2020.7.10 00:00-2020.7.16 23:59</span></div>-->
		  <!--                <div style="font-size: 12px;color: red;margin-bottom: 15px"><span>交易金额不得小于100UEM，不得大于1000UEM</span></div>-->
		                  <div style="display: flex;justify-content: center;align-items: center"><span @click="taggleduihuan" class="botms" style="background-color: #06EDFF;">确定兑换</span></div>
		                </div>
		              </div>
					 <div style="width: 80%;height: 60px;color: #CCD1FF;font-size: 12px;display: flex;flex-direction: column;justify-content: space-around;margin: 0 auto;">
					 	<span>交易时间：2020.9.12——2020.9.30</span>
					 	<span>交易金额不得小于&nbsp;100&nbsp;TCC,不得大于&nbsp;1000&nbsp;&nbsp;TCC</span>
					 </div>
		            </div>
				
				
        </div>
		<div style="width: 100%;height: 300px;background-color: #FFFFFF;">
			<div style="width: 95%;height:300px;margin: 0 auto;">
				<div style="height: 50px;line-height: 50px;font-size: 14px;font-weight: 550;">BCSC介绍</div>
				<div style="font-size: 14px;text-indent:2em">习近平总书记2020年4月1日在浙江考察时指出，要善于化危为机，抓住产业数字化、数字产业化赋予的机遇，抓紧布局数字经济。在2020年5月23日参加“两会”代表讨论中再次强调，我们要在危机中育新机、于变局中开新局，推动我国经济乘风破浪、行稳致远。</div>
				<div style="font-size: 14px;text-indent:2em;margin-top: 5px;">为进一步推动广大中小企业数字化转型，构建“政府引导一平台赋能一龙头引领一机构支撑一多元服务”的联合推进机制，形成“数字引领、携手创新、普惠共赢”的数字化生态共同体，支撑河北省经济发哦质量发展，河北省智慧城市联合会、中国中小企业协会高新技术产业分拟联合举办河北省中小企业数字化转型高峰论坛暨全国中小企业数字化链改（河北）中心揭牌仪式，诚邀您出席</div>
			</div>
		</div>
        
        
      </div>
    </scroll>




<!--UEM换ULAM-->
    <popup  v-model="tuoguangb" position="bottom" style="margin-bottom:30vh;"  height="460px;"  is-transparent>
      <div style="width: 90%;margin: 5vh auto;background: #fff;border-radius: 6px">
        <div style="padding: 20px">
          <h3 style="text-align: center;font-size: 14px">是否确定兑换？</h3>
          <div style="height: 5px"></div>
          <div style="line-height: 20px;padding-bottom: 10px;">
            <div style="display: flex;justify-content: center;align-items: center;padding-bottom: 15px">
              <span style="color: #999;font-size: 12px">汇率：1UEM = {{1/exchangeBl.uem_ulam}}ulam</span>
            </div>
            <div style="height: 15px">

            </div>
            <div style="display: flex;justify-content: space-around;align-items: center;text-align: center;line-height: 24px">
              <div>
                <p style="font-size: 20px;font-weight: 700">{{input}}</p>
                <p style="color: #3c99d6;font-size: 12px;">UEM</p>
              </div>
              <div>
                <i class="el-icon-right" style="font-size: 28px;color: #000"></i>
              </div>
              <div>
                <p style="font-size: 20px;font-weight: 700">{{input/exchangeBl.uem_ulam}}</p>
                <p style="color: #3c99d6;font-size: 12px;">ULAM</p>
              </div>
            </div>
          </div>
          <div style="height: 25px"></div>
          <div style="display: flex;justify-content: space-between;align-items: center">
            <span class="btoms" style="width: 60%" @click="tagglemimma('tuoguangb')">确定</span>
            <span class="btoms" @click="tuoguangb = false" style="background: #fff;color: #3c99d6;border: 1px solid linear-gradient(to bottom right, #dd8fff , #9a55ff);width: 35%">取消</span>
          </div>
          <div style="height: 5px"></div>
        </div>
      </div>
    </popup>
<!--  ULAM换uem  -->
    <popup  v-model="tuoguan" position="bottom" style="margin-bottom:30vh;"  height="460px;" is-transparent>
      <div style="width: 90%;margin: 5vh auto;background: #fff;border-radius: 6px">
        <div style="padding: 20px">
          <h3 style="text-align: center">是否确定兑换？</h3>
          <div style="height: 25px"></div>
          <div style="line-height: 20px;padding-bottom: 10px;">
            <div style="display: flex;justify-content: center;align-items: center;padding-bottom: 15px">
              <span style="color: #999;font-size: 12px">汇率：1ULAM = {{(1/exchangeBl.ulam_uem).toFixed(3)}}UEM</span>
            </div>
            <div style="display: flex;justify-content: space-around;align-items: center;text-align: center;line-height: 30px">
              <div>
                <p>{{input}}</p>
                <p style="color: #3c99d6">ULAM</p>
              </div>
              <div>
                <i class="el-icon-right" style="font-size: 28px;color: #000"></i>
              </div>
              <div>
                <p>{{input/exchangeBl.ulam_uem}}</p>
                <p style="color: #3c99d6">UEM</p>
              </div>
            </div>
          </div>
          <div style="height: 25px"></div>
          <div style="display: flex;justify-content: space-between;align-items: center">
            <span class="btoms" @click="tagglemimma('tuoguan')">确定</span>
            <span class="btoms" @click="tuoguan = false" style="background: #f5f5f5;color: rgb(60, 170, 214)">取消</span>
          </div>
          <div style="height: 25px"></div>
        </div>
      </div>
    </popup>







  </div>
</template>

<script>
    import {getdislistset} from '@/api/index';
    import Prompts from '@/base/prompt/prompt';
    import scroll from "@/base/scroll/scroll";
    import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Loading,Popup,Alert,Divider,InlineLoading,Tabbar,TabbarItem,Actionsheet} from 'vux'
    export default {
        name: "flash",
        components:{
            scroll,Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Loading,Popup,Alert,Divider,InlineLoading,Tabbar,TabbarItem,Actionsheet,Prompts
        },
        data(){
            return{
                isPrompt:false,//提示框的展示与隐藏
                Prompttext:'',//提示框成功或失败
                Promptmsg:'',//提示框成功或者失败原因
                Promptimage:'',//是否展示图片
                exchangeBl:{},
                isexchangeBl:false,
                input:'',
                jintan:false,
                anmi:'',
                tuoguangb:false,tuoguan:false,istitle:true,
            }
        },
        created(){
          this._getexchange();
        },
        methods:{
            tobiki(str){
                void window.plus.runtime.openURL(str);
            },
            toxiazai(){
                void window.plus.runtime.openURL("http://www.uemtk.com/up.php");
            },
            //密码框
            tagglemimma(isflag){
                console.log(isflag)
                if (isflag == 'tuoguangb'){
                    this.tuoguangb = false;
                }else if (isflag == 'tuoguan'){
                    this.tuoguan = false;
                }
                this.jintan = true;
            },
            //兑换提示
            taggleduihuan(){
                if (this.input){
                    if(this.isexchangeBl){
                        this.tuoguangb= true;
                        console.log("UEM--ULAM");
                    }else{
                        console.log("ULAM--UEM");
                        this.tuoguan= true;
                    }
                }else {
                    this.tagglePrompt(false,'请输入兑换数量')
                }


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
            //请求兑换比例
            _getexchange(){
                this.axios.get(this.apiurl+'/search_exchange_pool').then(res => {
                    console.log(res.data.data,'@@@@@')
                    if(res.data.status =="success"){
                        this.exchangeBl = res.data.data
                    }
                })
            },
            gobacks(){
                this.$router.push('/index')
            },
            //兑换
            exchangeCoin(isflag){
                let bl,token;
                if(isflag){
                   bl = this.exchangeBl.uem_ulam;
                    token = 'uem/ulam';
                   console.log('兑换ulam')
                }else{
                    bl = this.exchangeBl.ulam_uem;
                    token = 'ulam/uem';
                    console.log('兑换UEM')
                }
                let apiurl = 'exchange_coin';
                const user = JSON.parse(localStorage.getItem('user'));
                let data = {
                    mobile:parseInt(user.hu),
                    password:user.mima,
                    drawback_passwd:this.anmi,
                    token,
                    amount:Number(this.input),
                    "rate":bl
                };
                getdislistset(apiurl,data).then(res=>{
                    this.anmi = '';
                    this.input = '';
                    this.jintan = false;
                    console.log(res,'提交兑换')
                    if(res.status == "error"){
                        console.log(res.data,)
                        this.tagglePrompt(false,res.data)
                    }else{
                        //成功
                        this.tagglePrompt(true,res.data)
                    }
                })

            }
        }
    }
</script>

<style scoped>
  .main-content{
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  .botms{
    width: 100%;
    text-align: center;
    line-height: 30px;
    display: inline-block;
/*    background: linear-gradient(to bottom right, #dd8fff , #9a55ff); */
    padding: 3px 0;
    border-radius: 6px;
    color: #fff;
  }
  a{
    color: #3c99d6;
  }
  .inp{
    outline: 0;
    border: 0;
    text-align: center;
    background: #f5f5f5;
    height: 30px;
    width: 35%;
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
  .title{
    display: flex;
    align-items: flex-end;
    padding: 16px 15px 20px;
    height: 34px;
    background: #f5f5f5;
  }
  .titleitem{
    font-size: 14px;
    color: #ccc;
    margin-right: 30px;
    transition: all 0.3s;
    position: relative;
  }
  .titleitems{
    font-size: 17px;
    color: #000;
    font-weight: 700;
  }
  .sanjiao{
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom-color: #fff;
    position: absolute;
    left: 40%;
    bottom: -20px;
  }

</style>
