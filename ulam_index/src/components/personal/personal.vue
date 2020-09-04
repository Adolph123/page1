<template>
  <div class="personal">
    <Pageheader :content="content" @heidcomprehen="heidcomprehen"></Pageheader>
<!--    -->
    <div class="personalhead">
      <div >
        <img src="@/assets/icon/5_03.png" alt="" style="margin: 0.8rem auto;display: block">
      </div>
      <div class="personalheadbtom">
        <div>
          <div><span style="font-weight: 600">12</span></div>
          <div><span>关注</span></div>
        </div>
        <div>
          <div><span style="font-weight: 600">34</span></div>
          <div><span>粉丝</span></div>
        </div>
        <div>
          <div><span style="font-weight: 600">1234</span></div>
          <div><span>点赞</span></div>
        </div>
      </div>
    </div>
<!--    -->
    <div class="personaltitle">
        <div v-for="(item,index) in titleList" :key="index" @click="taggleTitle(index)" class="personaltitleItem" :class="{actrive:item.isflag}">
          <span>{{item.name}}</span>
        </div>
    </div>

<!--    -->
    <div class="personalxx">
      <div class="personalxxItem">
        <span style="font-weight: 700">用户名</span>：
        <span style="color: #cccccc">张小白</span>
      </div>

      <div class="personalxxItem">
        <span style="font-weight: 700">行业</span>：
        <span style="color: #cccccc">暂未填写</span>
      </div>

      <div class="personalxxItem">
        <span style="font-weight: 700">兴趣爱好</span>：
        <span style="color: #cccccc">暂未填写</span>
      </div>

      <div class="personalxxItem">
        <span style="font-weight: 700">家乡</span>：
        <span style="color: #cccccc">暂未填写</span>
      </div>

      <div class="personalxxItem">
        <span style="font-weight: 700">职业</span>：
        <span style="color: #cccccc">暂未填写</span>
      </div>

    </div>
<!--    -->

    <div style="margin-top: 2rem;display: flex;justify-content: center">
      <el-button type="primary" round>退出登录</el-button>
    </div>

  </div>
</template>

<script>
    import Pageheader from "@/base/pageheade/pageheader"
    import {tageshowcomprehen} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen],
        name: "personal",
        components:{
            Pageheader
        },
        data(){
            return{
                content:"个人中心",
                titleList:[
                    {
                        isflag:true,
                        name:'资料'
                    }, {
                        isflag:false,
                        name:'文章'
                    }, {
                        isflag:false,
                        name:'视频'
                    }, {
                        isflag:false,
                        name:'收藏'
                    },
                ]

            }
        },
        methods:{
            taggleTitle(index){
                this.titleList.map(item=>{
                    item.isflag = false;
                })
                this.titleList[index].isflag = true;
            }
        }
    }
</script>

<style scoped lang="stylus">
  .personal
    width 100%
    font-size 0.75rem
    text-align left
    .personalhead
      width 100%
      border-bottom 2px solid #ccc
      .personalheadbtom
        display flex
        justify-content space-around
        margin-bottom 1rem
        text-align center
        line-height 1rem
    .el-button.is-round
        margin 0 auto
        font-size 0.75rem
        padding 0.5rem 3rem
    .personaltitle
      width 92%
      margin 0.5rem auto
      display flex
      justify-content center
      .personaltitleItem
        flex 1
        text-align center
        padding 0.2rem 0
        margin 0 0.2rem
      .actrive
        border-bottom 2px solid #9a55ff
    .personalxx
      width 90%
      margin 0 auto
      .personalxxItem
        margin 0.5rem 0
        padding 0.3rem 0
        line-height 1rem
</style>
