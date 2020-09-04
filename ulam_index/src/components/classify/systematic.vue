<template>
    <div class="warp"  :style="{height:heights+'px',}">
        <header  class="header">
          <router-link to='/search' tag="div"class="header_input">
            <span><img src="@/assets/icon/商城_11.png" alt="" style="width: 6.5vw"></span>
            <span style="font-size: 0.65rem">搜索店内商品</span>
          </router-link>
        </header>

      <div v-if="loadings">
        <img src="@/assets/1.gif" alt="" style="width: 100%;">
      </div>
        <div v-else class="warp_div">
            <main class="main" >
                <div class="precious">
<!--                  左边标题-->
                  <Scroll class="main-content" :data='distlist'>
                    <div style="width: 100%">
                      <div class="ChildNode"
                           v-for="(item,index) in distlist" :key="item.id"
                           :class="{ChildNodeactive:item.isflag}"
                           @click="preciousitem(index)"
                      >
                        <span :class="{leftactive:item.isflag}"></span>
                        <span>{{item.label}}</span>
                      </div>
                      <div style="height: 25px"></div>
                    </div>
                  </Scroll>

                </div>
                <div class="recommend">
                      <!-- 二级分类列表 -->
                    <Scroll class="contentrecommend" :data='recommendList' ref="lefscroll">
                      <div>
                        <recommend v-if="recommendList.length" :recommendList="recommendList" :banerimage="banerimage"></recommend>
                        <div style="height: 35px"></div>
                      </div>
                    </Scroll>
                </div>

            </main>
        </div>

    </div>
</template>
<script>
import {getdislist,getdislists} from '@/api/index'
import recommend from './recommend'
import Scroll from "@/base/scroll/scroll";
export default {
    components: { recommend,Scroll },
    created(){
        this._getverison();
        this.heights = document.documentElement.clientHeight;
    },
    data() {
        return {
            heights:0,
            distlist:[],
            recommendList:[],
            banerimage:{},
            cardId:0,
            loadings:false,
        }
    },
    methods:{
        //请求ID
        _getverison(){
            this.loadings = true;
            let apiurl = 'v1/shop/goods/find-category-version';
            getdislist(apiurl,).then(res=>{
                console.log(res.data,'这个是什么');
                this.cardId = res.data;

                let classification = JSON.parse(localStorage.getItem('classification'));

                if(res.data == classification.id) {

                    this.distlist = classification.distlist;
                    this.recommendList = classification.recommendList;
                    this.banerimage = classification.banerimage;
                    this.loadings = false;
                    return
                }else {
                    this._getdislist();
                }

            })
        },
        //切换1一级分类
        preciousitem(index){
            this.distlist.map(item=>{
                item.isflag = false;
            })
            this.distlist[index].isflag = true;
            this.recommendList =  this.distlist[index].children?[...this.distlist[index].children]:[];
            this.banerimage = {
                  imgurl:this.distlist[index].isHomeImg?this.distlist[index].isHomeImg:'',
                  url:this.distlist[index].isHomeUrl?this.distlist[index].isHomeUrl:0
            }
            this.$refs.lefscroll.scrollTop()

        },
        //请求数据
        _getdislist(){
            let apiurl = 'v1/shop/goods/find-category';
            getdislist(apiurl,).then(res => {
                console.log(res,'数据');
                let reslist = res.data;




                reslist.map(item=>{
                    item.isflag = false;
                })
                reslist[0].isflag = true;


                this.distlist = reslist;

                this.recommendList = reslist[0].children;
                let banerimage = {
                    imgurl:reslist[0].isHomeImg,
                    url:reslist[0].isHomeUrl
                };
                this.banerimage = banerimage;

                let classification = {
                    id:this.cardId,
                    distlist:reslist,
                    recommendList:reslist[0].children,
                    banerimage:banerimage
                };
                this.loadings = false;
                localStorage.setItem('classification',JSON.stringify(classification));
            })
        },
    },
}
</script>
<style scoped>
img {
  width: 8vw;
  height: auto;
  display: block;
}
.warp {
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.warp_div {
  width: 100%;
  display: flex;
  margin-top: -1px;
  height: 86vh;
}
.header {
  width: 100%;
  padding: 40px 0 4%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.header_input {
  width: 94%;
  font-size: 14px;
  padding: 0.1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  border-radius: 1rem;
}
.header_input > span:nth-child(1) {
  width: 1.5rem;
}
.header_input > span {
  color: #b4b4b4;
  padding-top: 2px;
}
.main {
  width: 100%;
  display: flex;
}
.precious {
  flex: 2.5;
  display: flex;
  font-size: 0.62rem;
  background: #f5f5f5;
  height: 86vh;
  flex-direction: column;
  align-items: center;
}
.main-content{
  width: 100%;
  height: 85vh;
  overflow: hidden;
  position: relative;
}

.ChildNode {
  padding: 0.85rem 0;
  position: relative;
  display: flex;
  color: #b4b4b4;
  justify-content:  center;
  align-items: center;
  background: #f5f5f5;
}
.ChildNodeactive {
  color: #9a55ff;
  background: #fff;

}
.leftactive{
  position: absolute;
  left: 0;
  display: inline-block;
  width: 3px;
  height: 0.6rem;
  border-radius: 4px;
  background: #9a55ff;
  padding: 0.1rem 0;
}
.recommend {
  flex: 7;
  display: flex;
  font-size: 0.65rem;
  flex-direction: column;
  background: #fff;
  align-items: center;
}
.contentrecommend{
  width: 94%;
  margin: 0 auto;
  height: 85vh;
  overflow: hidden;
  position: relative;
}
.recommend_div {
  margin: 1rem 0 0.5rem 0;
  color: #686868;
}
</style>

