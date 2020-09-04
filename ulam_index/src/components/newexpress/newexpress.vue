<template>
    <div @click.prevent="back" style="font-size: 0.75rem;position: fixed;z-index: 10000;background: rgba(0,0,0,0.4);width: 100vw;height: 100vh;">
<!--      //最新物流-->
<!--      <div style="position: absolute;top: 4vh;;color: #fff;width: 100vw;">-->
<!--       <div style="display: flex;justify-content: space-between;width: 90%;margin: 0 auto">-->
<!--         <span class="el-icon-arrow-left" @click="back" ></span>-->
<!--         <span>查看全部</span>-->
<!--       </div>-->
<!--      </div>-->
      <div v-if="isflagDom" class="box" @click.stop="">
<!--        商品信息-->
        <div class="backcolors" style="padding: 0.5rem 0;width: 100%;border-top-left-radius: 12px;border-top-right-radius: 12px;">
          <h1 style="margin-top: 0.2rem;text-align: center;"><span style="font-size: 0.7rem;font-weight: 700;line-height: 1rem;">已发货</span></h1>
          <div style="display: flex;align-items: center;justify-content: space-between;width: 94%;margin: 0.5rem auto 0.1rem">
            <div style="display: flex;align-items: center;justify-content: space-between;text-align: left;width: 100%">
              <div><img :src="skuImg" alt="" style="width: 7vh;display: block;height: auto">

              </div>

              <div style="margin-left: 0.5rem;line-height: 1rem;width: 80%">

                <div style="font-size: 0.6rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{skuName}}</div>

                <div style="width:100%;font-size: 0.5rem;display: flex;justify-content: space-between;align-items: center">

                  <span><span>{{postName}}</span> ：<span>{{postNo}}</span> </span>
<!--                  <i class="el-icon-arrow-right"></i>-->

                </div>

              </div>
            </div>

          </div>

        </div>

        <div style="background: #fff;border-bottom-left-radius: 12px;border-bottom-right-radius: 12px;">
          <!--  物流信息-->
          <Scroll Scroll class="main-content" :data='activities'>
            <div style="padding-top: 0.9rem;">
              <div class="block">
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.ftime">
                    <span :style="{color:index==0?'#000':'#bababa',lineHeight:'0.8rem',fontSize:index==0?'14px':'12px'}" >{{activity.context}}</span>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </Scroll>


        </div>


      </div>


      <div style="position: absolute;bottom: 5vh;">
          <div style="width: 100vw;display: flex;justify-content: center;align-items: center">
            <i class="el-icon-circle-close" style="color: #fff;font-size: 1.3rem;;font-weight: 300" @click.stop="back"></i>
          </div>
      </div>

      <!--提示  弹窗 -->
      <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
    </div>
</template>

<script>
    import {getdislist} from '@/api/index'
    import Scroll from "@/base/scroll/scroll"
    import Prompts from "@/base/prompt/prompt"
    export default {
        name: "newexpress",
        components:{Scroll,Prompts},
        mounted(){
            if(window.plus){
                window.plus.navigator.setStatusBarStyle('white')
            }
        },
        data() {
            return {
                activities: [{
                    content: '支持使用图标支持使用图标支持使用图标支持使用图标支持使用图标支持使用图标',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    // icon: 'el-icon-success',
                    color: '#9a55ff',
                }],
                postName:'',
                postNo:'',
                skuImg:'',
                skuName:'',
                isflagDom:false,
                isPrompt:false,//提示框的展示与隐藏
                Prompttext:'',//提示框成功或失败
                Promptmsg:'',//提示框成功或者失败原因
                Promptimage:'',//是否展示图片
            };
        },
        created(){
            this._getdislist(this.$route.query.orderNo);//
            // this.removegoodsList()
        },
        methods:{
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
            //返回
            back(){
                this.$router.go(-1)
            },
            //查看订单
            _getdislist(orderNo){
                let apiurl = 'v1/shop/order/getPostTrail';
                let data={
                    orderNo
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'获取物流');
                    if(res.status == "fail"){
                        this.isflagDom = false;
                        this.tagglePrompt(false,'暂无物流信息')
                        setTimeout(()=>{
                            this.back()
                        },1400)
                        return
                    }else{
                        this.isflagDom = true;
                        let reslist = res.data;
                        let resarr = [];
                        reslist.Trail.map(item=>{
                            resarr.push(item);
                        })
                        resarr[0].color= '#9a55ff';
                        this.activities = resarr;
                        this.postName = reslist.postName;
                        this.postNo = reslist.postNo;
                        this.skuName = reslist.skuName;
                        this.skuImg = reslist.skuImg;
                    }

                })
            },
        }
    }
</script>

<style scoped lang="stylus">
  .box
    font-size 14px
    width 80%
    height 80vh
    margin 5vh auto
    font-size 0.65rem
    border-radius 6px
    color #fff
    .main-content
      height: 65vh;
      overflow: hidden;
      position: relative;
    .titlelist
      display: flex
      width: 94%
      padding 0.2rem 0
      margin: 0.2rem auto
      color #000
      line-height: 1rem
      .huise
        color #ccc;
        padding-right 1rem;
    .block
      width 90%
      margin 0 auto
      text-align left


</style>

<style>
  .el-timeline-item{
    padding-bottom: 25px;
  }
  .el-timeline-item__content{
    font-size: 0.5rem;

  }
  .el-timeline-item__timestamp{
    color: #bababa;
  }
</style>
