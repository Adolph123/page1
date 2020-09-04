<template>
    <div style="width: 100vw;height: 100vh;position: fixed;z-index: 100;background: #fff;">
      <!--  头部    -->
      <div class="el-page-header">
        <div class="el-page-header__title" @click="dialogVisibleItemshow">
          <img src="@/assets/icon/3_03.png" alt="" style="width: 8vw" >
        </div>
        <div class="el-page-header__content">
          <div style="display: flex;justify-content: center;font-size: 0.8rem">
            <span> {{content}}</span>
          </div>
        </div>
      </div>
      <Scroll class="main-content" ref="scroll">
        <div>
          <!--      商品-->
          <div style="display: flex;align-items: center;background: #fff;padding: 5px 10px;border-radius: 6px;">
            <div>
              <img :src="postmanlist.skuDefaultImg" alt="" style="width: 10vh;height: auto;display: block">
            </div>
            <div style="margin-left: 20px">
              <div style="margin: 10px 0;font-size: 14px"><span>{{postmanlist.skuName}}</span></div>
              <div style="margin: 10px 0;font-size: 14px">
                <span>退款金额:</span><span style="color:#F4451A;font-size: 16px">{{postmanlist.returnAmount}}ulam</span>
              </div>
            </div>
          </div>

          <div>
            <!--        <div class="itemlist"><span>物流公司：</span><input class="inp" type="text" placeholder="请填写物流公司" v-model="postm"></div>-->
            <div class="itemlist"><span>物流单号：</span><input class="inp" type="text" placeholder="请填写物流单号" v-model="postmnum"></div>
            <div class="itemlist" style="display: flex">
              <span>联系电话：</span>
                <input :style="{color:postmpohs.length == 11?'#000':'red'}" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" type="number" v-model="postmpohs" placeholder="填写手机号码" class="inp">
            </div>
          </div>

          <!--      上传图片-->
          <div style="background: #fff;padding: 5px 10px 15px;margin: 15px 0;border-radius: 6px">
            <div class="title">上传图片:</div>
            <div style="margin: 20px 0" v-if="images" v-for="(item,index) in images" :key="index">
              <img :src="item" alt="" style="width: 100%;height: auto;display: block">
            </div>
            <Upimage @addshopImage="addshopImage" :Upimagenum="Upimagenum"></Upimage>
          </div>

          <!--      提交-->
          <div style="width: 100%;margin-top: 20px;padding-bottom: 40px;">
            <div style="display: flex;justify-content: center;">
              <span class="passwordbtm" @click="removegoods(postmanlist.returnNo)">提交</span>
            </div>
          </div>

        </div>
      </Scroll>


      <!--提示  弹窗 -->
      <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>

    </div>
</template>

<script>
    import Upimage from "@/base/upimage/upimage";
    import {getdislist} from '@/api/index';
    import Scroll from "@/base/scroll/scroll";
    import Prompts from "@/base/prompt/prompt";
    import {goBackpushState} from '@/common/js/mixin';
    export default {
        mixins: [goBackpushState],
        name: "postman",
        components:{
            Upimage,Scroll,Prompts
        },

        props:{
            postmanlist:{
                type:Object,
                default:{}
            }
        },
        data(){
            return{
                Upimagenum:1,
                isPrompt:false,//提示框的展示与隐藏
                Prompttext:'',//提示框成功或失败
                Promptmsg:'',//提示框成功或者失败原因
                Promptimage:'',//是否展示图片
                content:'上传快递单号',
                postm:'',//物流公司
                postmnum:'',//物流单号
                postmpohs:'',//手机号
                images:[],//展示的
                tijiaoimages:[],//传值
            }
        },
        methods:{
            goBack() {
                this.$emit('postmanshow');
                //replace替换原路由，作用是避免回退死循环
            },
            //关闭页面
            dialogVisibleItemshow() {
                this.$emit('postmanshow')
            },
            //传图片
            addshopImage(file,str){
                console.log(file,str);
                this.images.push(str);//负责展示
                this.tijiaoimages.push(file.name);//复制传值
                setTimeout(()=>{
                    this.$refs.scroll.refresh()
                },40)
            },
            //提交快递单号
            removegoods(ReturnNo){
                let apiurl = "v1/shop/order/return-post";
                let data ={
                    ReturnNo,//退单号
                    "PostNo":this.postmnum, //快递号
                    "Phone":this.postmpohs, //手机号
                    "Images":this.tijiaoimages
                };

                if(this.postmnum == ''){
                    this.tagglePrompt(false,'上传快递号不能为空');
                }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.postmpohs))){
                    this.tagglePrompt(false,'上传联系方式有误');
                }else{
                    getdislist(apiurl, data).then(res =>{

                        console.log(res,'提交快递单号');
                        if (res.status == "success"){
                            this.tagglePrompt(true,'上传成功');
                            setTimeout(()=>{
                                this.dialogVisibleItemshow()
                            },1500)

                        }else{
                            this.tagglePrompt(false,res.msg);
                        }
                    })
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
        }
    }
</script>

<style scoped lang="stylus">
  .main-content
    height: 92vh;
    overflow: hidden;
    position: relative;
  .itemlist
    margin 10px
    padding 3px 0
    .inp
      border 0
      outline 0
      width 80%
      text-indent 15px
      background #F5F5F5
      line-height 30px
  .title{
    margin-bottom 10px;
  }
  .passwordbtm
    border 0
    outline 0
    display block
    font-size 16px
    width 75%
    text-align center
    padding 5px 0
    background #9a55ff
    border-radius 30px
    color #fff
</style>
