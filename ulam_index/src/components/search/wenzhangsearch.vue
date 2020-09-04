<template>
  <div style="position: fixed;left: 0;top: 0;width: 100%;height: 100vh;z-index: 25100;background: #fff">
    <!-- 搜索框 -->
    <div class="search-box-wrapper backcolors">
      <search-box ref="inputs" @goBack="goBack" @severvalue='severvalue' :placeholder='placeholder' :color="color"></search-box>
    </div>

    <scroll class="main-content">
      <div>
        <div v-if="wenList.length>0" v-for="(item,index) in wenList" :key="index" @click.prevent="towenDetail(item.id)"
             style="display: flex;padding: 20px 20px;margin: 0 auto 1px;justify-content: space-between;background: #fff;align-items: center;border-bottom: 1px solid #f5f5f5">
          <div style="width: 31%;overflow: hidden;border-radius: 6px">
            <img :src="item.image" alt="" style="display: block;width: 100%;height: 75px;border-radius: 6px">
          </div>
          <div style="width: 66%;height: 75px;position: relative">
            <div class="txt" style="position: absolute;top: 0;width: 100%" >{{item.title}}</div>

            <div style="display: flex;justify-content: space-between;align-items: center;position: absolute;bottom: 0;width: 100%">
              <div class="items">
                <!--                <img src="@/assets/wen/time.png" alt="" style="width: 14px;height: auto;display: block">-->
                <!--                <span style="width: 2px"></span>-->
                <span style="font-size: 12px;color: rgb(167, 167, 167);line-height: 20px">{{item.createdText}}</span>
              </div>

              <div class="items" @click.stop="dianzans(item.id,item.isThumb,index)">
<!--       v-else         <img v-if="item.isThumb" src="@/assets/wen/zan2.png" alt=""   style="width: 14px;height: auto;display: block">-->
                <img  src="@/assets/wen/zan1.png" alt=""   style="width: 14px;height: auto;display: block">
                <span style="width: 2px"></span>
                <span :style="{color:'rgba(170,170,170)' }" style="padding-top: -2px;font-size: 12px">{{item.thumbCount}}</span>
              </div>
<!--              <div class="items">-->
<!--                <img  src="@/assets/wen/zan1.png" alt=""   style="width: 14px;height: auto;display: block">-->
<!--                <span style="width: 2px"></span>-->
<!--                <span :style="{color:item.thumbCount > 0?'#9a55ff':'rgba(170,170,170)' }" style="padding-top: -1px;font-size: 12px">{{item.thumbCount}}</span>-->
<!--              </div>-->
            </div>
          </div>
        </div>



        <div v-if="wenList.length == 0" style="display: flex;justify-content: center;align-items: center;height: 100px; color: #ccc">暂无数据</div>

      </div>
    </scroll>

    <loading :show="ss5" text="请求中.."></loading>
  </div>
</template>

<script>
    import searchBox from '@/base/search-box/searchBox';
    import scroll from '@/base/scroll/scroll';
    import {getdiswenlist} from '@/api/index';
    import { Loading,} from 'vux'
    export default {
        name: "wenzhangsearch",
        components:{
            searchBox,scroll,Loading
        },
        data(){
            return{
                ss5:false,
                placeholder: "搜索文章",
                wenList:[],
                color:true,
                isflag:false,
                wenzhanginfoitem:0,
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
        methods:{
            severvalue(val){
                // this.islistsong = true;
                this.values = val;
                this.ss5 = true;
                this.addList(val);

            },
            goBack(){
                    this.$emit('heidwenzhangsearch')
            },
            taggledetail(){
                this.isflag = false;
            },
            addList(val){
                let apiurl = 'v1/art/art-categories-find';
                let data={
                    title:val
                }
                getdiswenlist(apiurl,data).then(res=>{
                    console.log(res.data,'@@@@@@@@@@@@@@@@');
                    let list = [];
                    let reslist = res.data;

                    this.ss5 = false;
                    reslist.map(item=>{
                        if(item.articles){

                            list = list.concat(item.articles)
                        }else{

                            return
                        }
                    })
                    this.wenList = list;
                    console.log(list,'!!!!!!!!')
                })
            },
            //跳转商品详情
            towenDetail(item){
                this.isflag = false;
                this.$emit('towenzhanginfo',item)
                // this.$router.push({path:'/wenzhang_info',query:{id:id}})
            },
            dianzans(id,flag){
                this.wenzhanginfoitem = id;
                if(flag == true){  //点过赞
                    this.dianzan1();
                }else{
                    //没点
                    this.dianzan()
                }

            },
            dianzan(){
                console.log('点赞');
                let apiurl = 'v1/art/art-thumb';
                let data = {
                    id : parseInt(this.wenzhanginfoitem),
                    status:1
                };
                getdiswenlist(apiurl,data).then(res=>{
                    console.log(res,'点赞');
                    if(res.status == "success"){
                        this.texts = '文章点赞';
                        this.send=true;
                        this._getshualist(parseInt(this.wenzhanginfoitem));
                    }else {
                        this.send1=true;
                        this.texts = '文章点赞';
                    }

                })
            },
//取消点赞
            dianzan1(){
                console.log('取消点赞')
                let apiurl = 'v1/art/art-cancel-thumb';
                let data = {
                    id : parseInt(this.wenzhanginfoitem),
                }
                getdiswenlist(apiurl,data).then(res=>{
                    console.log(res,'取消点赞');
                    if(res.status == "success"){
                        this.texts = '文章取消点赞';
                        // this.send=true;
                        // this.wenList = [];
                        // this.searchs = true;
                        // this.istoOne = true;
                        this._getshualist(parseInt(this.wenzhanginfoitem));
                    }else {
                        this.send1=true;
                        this.texts = '文章取消点赞';
                    }

                })
            },
            _getshualist(id){
                let list = JSON.parse(JSON.stringify(this.wenList));
                list.map(item =>{
                    if(item.id == id){
                        item.isThumb = !item.isThumb
                        if(item.isThumb){
                            item.thumbCount +=1;
                        }else{
                            item.thumbCount -=1;
                        }
                    }
                })
                this.wenList = list;

                this.wenzhanginfoitem = 0
            },
        }
    }
</script>

<style scoped>
  .search-box-wrapper{
  }
  .main-content{
    overflow: hidden;
    position: relative;
    height: 90vh;
  }
  .txt{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    color: rgb(68, 68, 70);
    font-weight: 400;;
  }
  .items{
    display: flex;
    align-items: center;
    align-items: center;
    line-height: 30px;
    font-size: 14px;
  }
</style>
