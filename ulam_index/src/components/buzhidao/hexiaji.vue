<template>
  <div  style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
    <div style="position:fixed;top:0px;width:100%;z-index:999;border-bottom:1px solid #F5F5F5;">

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
              <span style="font-size: 16px;color: #fff">合伙人下级关系 </span>
            </div>
          </div>

        </div>
      </div>








      <div style="text-align:center;line-height:32px;position:relative;">
        <div class="jiji">
          <p class="zi1">一级人数</p>
          <p style="font-weight:700;" v-if="shuju">{{shuju.info[0].level_1}}</p>
        </div>
        <!--未激活的矿机-->
        <div class="weiji">
          <p class="zi1">二级人数</p>
          <p style="font-weight:700;" v-if="shuju">{{shuju.info[0].level_2}}</p>
        </div>
        <div style="position:absolute;width:1px;height:40px;border-left:1px solid #f5f5f5;top:25px;left:50%;"></div>
        <div style="clear:both;"></div>
      </div>
    </div>
    <div style="height:170px;"></div>
    <div v-for="(todo,index) in shuju.specific" v-bind:key="todo.id">
      <div style="background:#fff;font-size:14px;">
        <div>
          <div>
            <!--一级数据-->
            <div style="padding:15px;box-sizing:border-box;">
              一级用户： {{todo.mobile}}<span style="margin-left:10px;">{{todo.usr_id}}</span>
            </div>
            <!--二级数据-->
            <div>
              <div v-if="todo.next_level.length >0" style="color:#9C9B9C;">
                <div style="text-align:center;margin-bottom:-12px;margin-top:-35px;padding:10px;">
                  <div style="height:12px;"></div>
                  <p v-on:click="xian1(todo.mobile)" v-if="todo.mobile != dian" style="text-align: right;color:#7d83ed;">
                    <i class="el-icon-arrow-down" style="color: #9a55ff;font-size: 16px;font-weight: 700"></i>
                    <span style="font-size:12px;position:relative;top:-7px;color: #9a55ff">二级用户({{todo.next_level.length}})</span>
                  </p>
                  <p v-on:click="xian2" v-if="todo.mobile == dian" style="text-align: right;color:#7d83ed;">
                    <i class="el-icon-arrow-up" style="color: #9a55ff;font-size: 16px;font-weight: 700"></i>
                    <span style="font-size:12px;position:relative;top:-7px;color: #9a55ff">收起</span>
                  </p>
                </div>
                <div v-for="(to,index) in todo.next_level" v-bind:key="to.id" v-if="todo.mobile == dian" style="background:#F5F5F5;">
                  <div style="padding:15px;box-sizing:border-box;">
                    <p style="margin-left:30px;position:relative;bottom:-7px;">
                      二级用户 {{index+1}}：{{to.mobile}}<span style="margin-left:10px;">{{to.usr_id}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div style="height:12px;background:#F5F5F5;"></div>
    </div>

  </div>
</template>
<script>
  import { Group, Cell,XHeader,XInput,XButton,Confirm,Actionsheet,Loading,Popup,Divider,InlineLoading,CellBox} from 'vux'
    export default {
        name: "hexiaji",
      components:{
        Cell,Group,XHeader, XInput, XButton,Confirm,Actionsheet,Loading,Popup,Divider,InlineLoading,CellBox
      },
      data(){
          return {
            shuju:'',
            dian:'',
            bodyHeight:'',
          }
      },
      mounted(){
          let that = this
          that.bodyHeight=document.documentElement.clientHeight
          that.shuju = that.$route.params.shu
          console.log(that.shuju)
      },
      methods:{
        xian1(a){
          this.dian = a
        },
        xian2(){
          this.dian = ''
        },
        fanhui1(){
          this.$router.push('/grade')
        },
      }
    }
</script>

<style scoped>
  .vux-x-icon {
    fill:#7d83ed;
  }
  .zi1{
    color: #777575;font-size:14px;margin-top:10px;font-weight: 400;;
  }
  .jiji{
    float:left;width:50%;
    background:#fff;
    height:85px;font-weight:700;font-size:17px;
  }
  .weiji{
    float:left;width:50%;background:#fff;height:85px;font-weight:700;font-size:17px;
  }
  .vux-x-icon{
    color: #9a55ff!important;
  }
</style>
