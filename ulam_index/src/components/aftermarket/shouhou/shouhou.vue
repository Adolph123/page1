<template>
  <div class="shouhou">
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

    <Scroll class="main-content" ref="scroll" >
      <div>
        <div style="margin: 0 15px" v-for="(item,index) in  dialogVisibleItem" :key="index">
          <!--      商品-->
          <div style="display: flex;align-items: center;background: #fff;padding: 5px 10px;border-radius: 6px;">
            <div>
              <img :src="item.goodsSkuImage" alt="" style="width: 10vh;height: auto;display: block">
            </div>
            <div style="margin-left: 20px">
              <div style="margin: 10px 0;font-size: 14px; display: -webkit-box;text-overflow: ellipsis;overflow : hidden; -webkit-line-clamp: 2;-webkit-box-orient: vertical;"><span>{{item.goodsSkuName}}</span></div>
              <div style="margin: 10px 0;font-size: 14px">
                <span>退款金额:</span><span style="color:#F4451A;font-size: 16px">{{item.returnAmount}}ulam</span>
              </div>
            </div>
          </div>

          <!--      退款数量-->
          <!--      退还方式-->
          <div style="background: #fff;padding: 5px 10px;margin: 15px 0;border-radius: 6px">
            <div class="title">退换方式:</div>
            <div style="margin: 10px 8px;display: inline-block" v-for="(item,index) in options" :key="index" @click="tagglefangshi(item.value)">
            <span style="display: inline-block;font-size: 12px;color: #ccc;border-radius: 25px;padding: 5px 8px;line-height: 15px;"
                  :style="{background:findstatus == item.value? '#9a55ff':'#f5f5f5',color:findstatus == item.value? '#fff':'#000' }"
            >{{item.label}}</span>
            </div>
          </div>
          <!--      退换原因-->
          <div style="background: #fff;padding: 5px 10px;border-radius: 6px;margin: 15px 0;">
            <div class="title">退换原因:</div>
            <div style="padding-bottom: 15px;margin: 10px 0">
              <el-input
                stylt="background:#f5f5f5"
                type="textarea"
                :rows="4"
                placeholder="请输入退换原因"
                v-model="textarea">
              </el-input>
            </div>
          </div>
          <!--      上传图片-->
          <div style="background: #fff;padding: 5px 10px 15px;margin: 15px 0;border-radius: 6px">
            <div class="title">上传图片:</div>
            <div style="margin: 10px 0" v-if="images" v-for="(item,index) in images" :key="index">
              <img :src="item" alt="" style="width: 100%;height: auto;display: block">
            </div>
            <div style="margin: 10px 0">
              <Upimage @addshopImage="addshopImage" :Upimagenum="Upimagenum"></Upimage>
            </div>
          </div>
          <!--      提交-->
          <div style="width: 100%;margin-top: 20px;padding-bottom: 40px;">
            <div style="display: flex;justify-content: center;">
              <span class="passwordbtm" @click="removegoods(item,orderNo)">提交</span>
            </div>
          </div>


        </div>
      </div>
    </Scroll>
    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>

  </div>
</template>

<script>
    import {getdislist} from '@/api/index';
    import Scroll from "@/base/scroll/scroll";
    import Upimage from "@/base/upimage/upimage";
    import Prompts from "@/base/prompt/prompt";
    export default {
        name: "shouhou",
        components:{
            Scroll,Upimage,Prompts
        },
        props: {
            orderNo:{
                type: String,
                default: ''
            },
            dialogVisibleItem: {
                type: Array,
                default: []
            }

        },

        data(){
            return {
                isPrompt:false,//提示框的展示与隐藏
                Prompttext:'',//提示框成功或失败
                Promptmsg:'',//提示框成功或者失败原因
                Promptimage:'',//是否展示图片
                textarea: '',//退换理由
                num: 1,
                Upimagenum:1,
                content:'退换/售后',
                options: [
                    {
                    value: '1',
                    label: '只退款'
                }, {
                    value: '2',
                    label: '退款退货'
                },
                ],
                images:[],
                tijiaoimages:[],
                findstatus: 1,//退货方式
            }
        },
        mounted(){
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
        },
        methods: {
            goBack() {
                this.$emit('dialogVisibleItemshow')
            },
            addshopImage(file,str){
                console.log(file,str);
                this.images.push(str);//负责展示
                this.tijiaoimages.push(file.name);//复制传值
                setTimeout(()=>{
                    this.$refs.scroll.refresh()
                },40)
            },
            handleChange(){

            },
            //选择
            tagglefangshi(index) {
                this.findstatus = parseInt(index);
            },
            //关闭页面
            dialogVisibleItemshow() {
                this.$emit('dialogVisibleItemshow')
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
            //退货
            removegoods(item,orderNo) {
                let apiurl = "v1/shop/order/return";
                let data = {
                    orderNo,	//总订单号
                    "detail": [
                        {
                            "detailId": item.detailId,	//子订单 id
                            "skuId": item.goodsSkuId,	//要退的商品id
                            "count":item.goodsCount,	//要退的商品数量
                        }
                    ],
                    "images": this.tijiaoimages,
                    "reason": this.textarea,
                    "status": this.findstatus,			//status 1 只退款 2 退款退货 3 退货入库 重新发货 4 重新发货 不要求归还
                };

                if(this.textarea == ''){
                    this.tagglePrompt(false,'退换原因不能为空');
                }else{
                    getdislist(apiurl, data).then(res => {
                        console.log(res, '取消订单');
                        if (res.status == "success"){
                            this.tagglePrompt(true,'上传成功');
                            setTimeout(()=>{
                                this.$router.push('/aftermarket')
                            },1500)

                        }else{
                            this.tagglePrompt(false,res.msg);
                        }

                    })
                }





            },
        }
    }
</script>

<style scoped lang="stylus">
  .shouhou {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: #f5f5f5;
    font-size 14px;
  }
  .main-content{
    height: 92vh;
    overflow: hidden;
    position: relative;
  }
  .title{
    margin 4px 0;
    font-weight 700;
  }
  .el-page-header {
    display: flex;
    align-items: center;
    line-height: 1rem;
    padding: 40px 0 1%;
    width: 100vw;
    position: relative;
    font-size: 0.8rem ;
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

  .passwordbtm
    border 0
    outline 0
    display block
    font-size 16px
    width 75%
    text-align center
    padding 7px 0
    background #9a55ff
    border-radius 30px
    color #fff
</style>
