<template>
  <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
<!--    <div style="height:25px;background:#9a55ff;"></div>-->
<!--    <x-header  :left-options="{preventGoBack: true,backText: ''}"  @on-click-back="fanhui1">个人中心</x-header>-->

    <!--    顶部返回-->
    <div class="backcolors">
      <div >
        <div class="mheaderheader">
          <div style="position: absolute;left: 0;z-index: 100" @click="fanhui1">
            <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
          </div>
          <div style="height: 30px;">

          </div>
          <div style="position: absolute;width: 100%;left: 0;">
            <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
              <span style="font-size: 16px;color: #fff">个人中心 </span>
            </div>
          </div>

        </div>
      </div>
      <div  style="width:100%;height:52px;color:white;padding:15px;box-sizing:border-box;margin-top:-2px;">
        <img :src="tutu" alt="" style="width:70px;height:70px;border-radius:50px;border:2px solid #fff;">
      </div>
    </div>


    <imgCut  @callback="callback"
             style="width:60px;height:60px;color:white;border-radius:30px;position:absolute;top:60px;left:14px;">
      <div></div>
    </imgCut>
    <!--<img :src="imgsrc">-->
    <!--实名认证 和手机号-->
    <div style="height:50px;background:#fff;"></div>
    <div class="kk1 cebor" v-on:click="nicheng">
      <p>
        <span style="margin-left:15px;">昵称</span>
        <span class="rezi">
          <span>{{name}}</span>
          <img src="@/assets/you.png" alt="" class="tu1">
        </span>
      </p>
    </div>
    <div style="clear:both;"></div>
    <div class="kk1">
      <p>
        <span style="margin-left:15px;">手机号</span>
        <span style="float:right;margin-right:4%;color:#777575;">{{users.hu}}</span>
      </p>
    </div>
    <div style="height:20px;"></div>
    <div class="kk1">
      <p class="tuizi" v-on:click="tuichu">
       退出当前账户
      </p>
    </div>
    <!--弹窗-->
    <confirm v-model="show"
             title="操作提示"
             @on-cancel="tui"
             @on-confirm="ding">
      <p style="text-align:center;">退出后您的账户信息将不再保留！确定退出？</p>
    </confirm>
    <loading :show="ss6" text="加载中.."></loading>
    <loading :show="ss2" text="上传中.."></loading>
    <toast v-model="ss5" type="cancel" :time="2000" is-show-mask text="提交失败!请重新操作" width="12em"></toast>
    <toast v-model="ss3"  :time="1800" is-show-mask text="更改头像成功!" width="18em"></toast>
    <!--更改昵称弹窗-->
    <popup v-model="ss4" height="310px" is-transparent position="top" style="margin-top:18vh;">
      <div style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
        <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
          <p style="font-size:18px;font-weight:700;text-align:center;">更改用户名</p>
        </div>
        <group>
          <x-input title="昵称" v-model="name1" placeholder="请输入新的昵称"></x-input>
        </group>
        <div style="padding:20px 15px;margin-top:5px;">

          <div class="botmOk" @click="gainame">确定</div>
          <div style="height: 15px"></div>
          <div class="botmNO" @click="noname">取消</div>

        </div>
      </div>
    </popup>
    <toast v-model="ss7" type="cancel" :time="1500" is-show-mask text="昵称长度在9位以内哦!" width="12em"></toast>
    <toast v-model="ss8"  :time="1500" is-show-mask text="修改成功！" width="12em"></toast>
    <toast v-model="ss9" type="cancel" :time="1500" is-show-mask text="修改出错！请重新操作" width="12em"></toast>
    <toast v-model="cs1" type="cancel" :time="1500" is-show-mask text="昵称已经存在！请重新设置" width="18em"></toast>
    <loading :show="ss1" text="设置中.."></loading>
    <toast v-model="sh6" type="cancel" :time="1800" is-show-mask text="账户异常！请重新登录" width="18em"></toast>
  </div>
</template>
<script>
  import {imgCut} from 'vue-imgcut'
  import { Group, Cell,XHeader,XInput, XButton,Toast,Confirm,Actionsheet,Loading,Popup,XTable,Divider} from 'vux'
    export default {
        name: "setuser",
      components:{
        Cell,Group,XHeader, XInput,XButton,Toast,Confirm,Actionsheet,Loading,Popup,XTable,Divider,imgCut
      },
      data(){
          return {
            imgsrc:'', users:'', bodyHeight:'', show:false, con:false, zhengzi:'',
            menus: {m1: '拍照', m2: '从相册选择'}, tx:false, ss6:false, sh6:false,
            ss5:false, ss7:false, ss8:false, ss9:false, tu:'', file:'', ss2:false, ss1:false,
            ss3:false, ss4:false, cs1:false, tu1:0, file1:'', tutu:'./static/tx.png', name1:'', name:'',
          }
      },
      watch:{
        imgsrc(newb,old){
          if(newb){
            this.tutu = newb
          }
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
          if(window.plus){
              window.plus.navigator.setStatusBarStyle('white')
          }
        let that = this
        //  获取当前高度
        that.bodyHeight=document.documentElement.clientHeight
        if(window.plus) {
          plus.navigator.setStatusBarBackground("#9a55ff");
        }
        let message = localStorage.getItem('user');
        message = JSON.parse(message)
        that.users = message
        that.name = that.users.name
        // console.log(that.users)
      //调取当前头像
        that.dqtx()
      },
      methods:{
          nicheng(){
            this.ss4 = true
          },
        //  更改name
          gainame(){
          //检查一下昵称的长度 不能超过9位
            let that = this
            if(that.name1.length >9 || that.name1.length < 1){
                that.ss7 = true
              return
            }
            that.ss1 = true
            that.axios.post(that.ull +'/rename',
              {
                "password":that.users.mima,
                "mobile":parseInt(that.users.hu),
                "name":that.name1
              }
            ).then(response =>{
              console.log(response.data)
              that.ss1 = false
              if(response.data == 'succeful'){
                  that.ss8 = true
                  that.name = that.name1
                  that.noname()
                  that.shua()
              }else if(response.data == 'error_uid_repeat'){
                that.cs1 = true
                that.name1 = ''
              }else {
                that.ss9 = true
              }
            }).catch(function (error){
              that.ss1 = false
              that.ss9 = true
              console.log(error);
            })
          },
        //刷新数据
        shua(){
          let that = this
          //开启加载状态
          //拿取账户密码。拿去新的值
          let a = that.users.hu
          let b = that.users.mima
          that.axios.post(that.ull+'/login',{"mobile":parseInt(a),"password":b}).then(response => {
            console.log(response.data)
            if(response.data == 'password_error' || response.data == 'error'){
              that.sh6 = true
              setTimeout(() => {
                that.ding()
              },1800)
              return
            }
            //开始拿新的值
            let ss = response.data[0];

            let bs = {
                "drawback_passwd":ss.drawback_passwd,
              'jl': 999 ,'sl': 999 ,'ren':1,'take':102,'xl':66,'auth':ss.auth,admin:ss.admin,
              'one':ss.level_1 ,'two':ss.level_2,              //1级 2级
              'hu':a,'mima':b,'name':ss.name,  //账户 密码 名字
              'ma':ss.expand_num_self,'sma':ss.expand_num,    //自己的邀请码  --上级码
              'miner':ss.miner,
              'confirm':ss.confirm,
              'group_miner':ss.group_miner    //矿工角色  --- 哪个组
            }
            localStorage.setItem("user",JSON.stringify(bs));
            //调取数据的方法
            setTimeout(() => {
              that.ss1 = false
            },500)
          }).catch(function (error){
            setTimeout(() => {
              that.ss1 = false
            },500)
          })
        },
          noname(){
            this.ss4 = false
            this.name1 = ''
          },
        //  调取当前头像
        dqtx(){
            let that = this
            //先检查一下有没有内存
            let txs = localStorage.getItem('tellertx');
            if(txs){
              // console.log('有头像内存')
              that.tutu =  txs
              return
            }
            console.log('没有内存头像')
            that.axios.post(that.ull+'/get_head_image',
              {
                "password":that.users.mima,
                "mobile":parseInt(that.users.hu)
              },{responseType: 'blob'}
            ).then(response =>{
              // console.log(response.data)
              if(response.data.size == 4){
              //  没有设置 使用默认头像
              //   console.log('未设置头像')
              }else {
                that.isImgStyle3(response.data)
              }
            }).catch(function (error){
              console.log(error);
            })
        },
        //读取头像文件的方法
        isImgStyle3(e){
          let that = this
          //获取并记录图片的base64编码
          // let newima = new Blob([e],{type:'image/jpeg'})
          let reader = new FileReader();
          reader.readAsDataURL(e); // 读出 base64
          reader.onload = function() {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            that.tutu = reader.result;//base64
          };
        },
        //裁剪头像的组件
        callback(img){
          let that = this
          that.imgsrc=img
          //将获取的base64转化文 图文件 文件对象转化为二进制数据
          that.file1 =  that.dataURItoBlob(img)
        //  这里就执行上传文件
          that.ss2 = true
          let t1 = parseInt(that.users.hu)
          let param = new FormData();
          param.append('mobile',t1);
          param.append('password',that.users.mima);
          param.append('files_0',that.file1,Date.now() + '.jpg');
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
            // headers:{'Content-Type':'application/x-www-form-urlencoded'}
          };
          //  认证开始
          that.axios.post(that.ull+ '/head_portrait',param,config).then(response => {
            console.log(response.data)
            that.ss2 = false
            if(response.data == 'succeful'){
              that.ss3 = true
            //  存储头像内存
              localStorage.setItem("tellertx",that.imgsrc);
            }else{
              //提交出错
              that.ss2 = true
              that.ss5 = true
            }
          }).catch(function (error) {
            that.ss2 = false
            //提交报错
            that.ss5 = true
          })
        },
        //将base64 转化为二进制文件
        dataURItoBlob(dataURI){
          let byteString = atob(dataURI.split(',')[1]);
          // let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
          let ab = new ArrayBuffer(byteString.length);
          let ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++){
            ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ab],{type: 'image/jpeg'});
        },
        //图片显示
        //认证
        zheng1(){
          this.$router.push('/zheng')
        },
        //  返回方法
        fanhui1(){
          this.$router.push('/user')
        },
      //  退出方法
        tuichu() {
          this.show = true
        },
        ding() {
          localStorage.removeItem("user");
          //删除钱包数据
          localStorage.removeItem("wals");
          //头像
          localStorage.removeItem("tellertx");
          //资金密码
          localStorage.removeItem("jinmi");
          //是否开启指纹
          localStorage.removeItem('zhiwens')
          this.$router.push('/zhu')
        },
        tui() {
          this.show = false
        }
      }
    }
</script>

<style scoped>
  .rezi{
    margin-right:4%;float:right;color:#777575;
  }
  .tuizi{
    text-align:center;color:#E51C23;font-weight:700;
  }
  .cebor{
    border-bottom: 1px solid #F5F5F5;
  }
  .tu1{
    width:11px;margin-top:13px;margin-right:-5px;
  }
  .kk1{
    height:45px;width:100%;line-height:46px;background:#fff;font-size:14px;
  }
</style>
