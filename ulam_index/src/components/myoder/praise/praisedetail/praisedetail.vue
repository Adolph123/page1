<template>
    <div class="praisedetail">
      <div class="el-page-header">
        <div class="el-page-header__title" @click="goBack">
          <img src="@/assets/icon/3_03.png" alt="" style="width: 8vw" >
        </div>
        <div class="el-page-header__content">
          <div style="display: flex;justify-content: center;font-size: 0.8rem">
            <span> {{content}}</span>
          </div>
        </div>
      </div>
      <!-- 口碑 -->

      <Scroll class="main-content" ref="scroll" >
        <div style="padding-bottom: 20px">
          <div v-for="(praiseitem,index) in praiseitems" :key="index">
            <div style="background: #fff;padding: 0.3rem 0.2rem;border-radius: 6px;margin: 0.4rem auto 0.6rem">
              <!--          商品介绍  -->
              <div style="display: flex;align-items: center">
                <div>
                  <img :src="praiseitem.skuImage" alt="" style="width: 15vw;display: block;height: auto;border-radius: 10px;">
                </div>
                <div style="line-height: 1.2rem;margin-left: 0.4rem;width:75%">
                  <div class="praisedetailText" ><span >{{praiseitem.skuName}}</span></div>
                  <div><span style="color: #bababa">商品介绍</span></div>
                </div>
              </div>
              <!--            评价星级-->
              <div style="display: flex;align-items: center;margin: 0.9rem 0;">
                <span style="margin-right: 0.7rem;font-weight: 700;color: #000">描述相符</span>
                <div v-for="(item,index) in xingji" :key="index" style="display: flex;align-items: center;margin-right: 0.3rem" @click="goodsStar = index+1">

                  <img v-if="goodsStar <= index" :src='xing' alt="" style="width: 5vw;display: block;height: auto">
                  <img v-else :src='xings' alt="" style="width: 5vw;display: block;height: auto">
                </div>
              </div>
              <!--            文字评价-->
              <div style="margin: 0.9rem 0">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="写满10字并为宝贝拍买家秀，有机会被选为优质评价被更多人看到"
                  v-model="textarea">
                </el-input>
              </div>
              <!--            图片上传-->
              <div style="text-align: left;margin: 0.9rem 0">
                <div>
                  <div v-if="images.length" v-for="(item,index) in images" :key="index" style="margin-bottom: 6px">
                    <img :src="item" alt="" style="width: 100%;height: auto;display: block;">
                  </div>
                </div>
                <Upimage @addshopImage="addshopImage" :Upimagenum="Upimagenum"></Upimage>
              </div>
              <!--            公开-->
              <div style="margin: 0.3rem 0 0.9rem">

                <!--      关闭页面-->
                <div class="purchaseguanbi">
                  <span @click="purchaseClose">发布</span>
                </div>
              <span>
<!--                <i class="el-icon-success"></i>公开-->
              </span>
<!--                <span> 公开头像昵称,大家可以看到我的主页 <i class="el-icon-question"></i> </span>-->
              </div>
            </div>
          </div>
        </div>
      </Scroll>


    </div>
</template>

<script>
    import Scroll from "@/base/scroll/scroll";
    import Upimage from "@/base/upimage/upimage";
    import {getdislist} from '@/api/index';
    let imgUrls33=require('@/assets/icon/3_07.png');
    let imgUrls44=require('@/assets/icon/9_09.png');
    import {goBackpushState} from '@/common/js/mixin';
    export default {
        mixins: [goBackpushState],
        name: "praisedetail",
        props:{

            praiseitems:{

                default: []
            }
        },
        components:{
            Scroll,Upimage
        },

        data(){
            return{
                content:'商品评价',
                xingji:['1星','2星','3星','4星','5星'],
                textarea:'',//详细评价
                imageIds:"",//图片
                goodsStar:0,
                xing:imgUrls33 ,
                xings:imgUrls44,
                imageIds:[],
                ExpressStar:4,
                Upimagenum:2,
                images:[]
            }
        },
        methods:{

            goBack() {
                this.$emit('removepraisedetail',true)
            },
            // 关闭页面，
            purchaseClose(){



                if(this.goodsStar == ''){
                    this.$emit('tagglePrompt',false,'评价失败评价内容不能为空');
                }else{
                    this.addgoodsfind()
                }
            },
            //添加图片
            addshopImage(file,str){
                console.log(file,str);
                this.images.push(str);//负责展示
                this.imageIds.push(file.name);//复制传值
                setTimeout(()=>{
                    this.$refs.scroll.refresh()
                },40)
            },
            //t添加商品评价
            addgoodsfind(){

                console.log(this.praiseitems,'数据源');

                if(this.textarea == ''){
                    this.$emit('tagglePrompt',false,'请填写文字评价');
                }else {
                    let apiurl = 'v1/shop/goods/comment';
                    let data;
                    this.praiseitems.map(item=>{
                        data= {
                            gid:item.gid,
                            detailId:item.detailId,
                            skuId:item.skuId,
                            goodsStar:this.goodsStar,//商品评价
                            ExpressStar:this.ExpressStar,//快递评价
                            AfterStar:5, //服务评价
                            Content:this.textarea,
                            images:this.imageIds//图片列表
                        };
                    });

                    //评价图片添加

                    getdislist(apiurl,data).then(res => {
                        this.goodsStar= '';//商品评价
                        this.ExpressStar = 0;//快递评价
                        this.textarea = '';
                        this.imageIds = [];//图片列表
                        this.images = [];
                        console.log(res,'add评价');
                        if(res.status == "fail"){

                            this.$emit('tagglePrompt',false,'评价失败',res.msg);
                            // this.$message(`,`);
                        }else{
                            this.imageIds=[];
                            this.textarea='';
                            this.$emit('tagglePrompt',true,'评价成功');

                        }
                        this.$emit('removepraisedetail',false)
                    })
                }


            }
        }
    }
</script>

<style scoped lang="stylus">
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
  .praisedetail
    height: 100vh;
    width 100vw
    font-size 14px
    position fixed
    top 0
    z-index 10000
    text-align left
    background #f5f5f5
    .main-content
      width 94%
      margin 0 auto
      height: 91vh;
      overflow: hidden;
      position: relative;
      .praisedetailText
        color #000
        font-size 0.6rem
        overflow: hidden
        white-space: nowrap;
        text-overflow: ellipsis;
    .purchaseguanbi
      width 100%
      margin-top 20px
      font-size 16px
      display flex
      justify-content center
      span
        display inline-block
        color #ffffff
        font-size 16px
        width 88%
        line-height 30px
        text-align center
        padding 2px 0
        margin 0 auto
        background #9a55ff
        border-radius 25px
</style>

<style>

  .el-textarea .el-textarea__inner{
    background: #f5f5f5;
    color: #000;
    border: none;
    outline: none;
  }

</style>
