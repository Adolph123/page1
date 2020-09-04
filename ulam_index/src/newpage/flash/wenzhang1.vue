<template>
    <div>
      <div  style="background: #f5f5f5;">
        <div v-for="(item,index) in wenList" :key="index" @click.prevent="towenDetail(item.id)" style="display: flex;padding: 20px 20px;margin: 0 auto 1px;justify-content: space-between;background: #fff;align-items: center">
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


              <div class="items">
                <!--                <img v-if="item.thumbCount > 0" src="@/assets/wen/zan2.png" alt=""   style="width: 14px;height: auto;display: block">-->
                <img  src="@/assets/wen/zan1.png" alt=""   style="width: 14px;height: auto;display: block">
                <span style="width: 2px"></span>
                <span :style="{color:'rgba(170,170,170)' }" style="padding-top: -2px;font-size: 12px">{{item.thumbCount}}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="page >= total/10" style="display: flex;justify-content: center;align-items: center;background: #fff;height: 50px;color: #ccc">
          暂无更多
        </div>
        <div v-else @click="addList" style="display: flex;justify-content: center;align-items: center;background: #fff;height: 50px">
          点击加载
        </div>
        <div style="height: 30px;background: #fff"></div>
      </div>
    </div>
</template>


<script>
    import {getdiswenlist} from '@/api/index';
    import scroll from "@/base/scroll/scroll";
    export default {
        name: "wenzhang1",
        components:{scroll},
        data(){
            return{
                searchs:false,
                wenList:[],
                issearchs:false,
                searlist:[],
                isflag:false,
                page:1,
                total:0,
                heights:0,
            }
        },
        created(){
            this._getdislist();
            this.heights = document.documentElement.clientHeight;
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
            addList(){
                this.page++;
                this._getdislist()
            },
            //关闭全屏
            goBack(){
                if(this.isflag == false){
                    this.$emit('tagglefid')
                }

            },
            //详情关闭
            taggledetail(){
                this.isflag = false;
                this._getdislist()
            },
            //文章详情
            _getdislist(){
                let apiurl = 'v1/art/art-find-home';
                let data = {
                    page:this.page
                };
                getdiswenlist(apiurl,data).then(res=>{
                    this.wenList = this.wenList.concat(res.data);
                    this.total = res.total;
                    console.log(res,'文章详情')
                })
            },
            //打开商品详情
            towenDetail(id){
                this.isflag = false;
                this.$emit('towenzhanginfo',id)
            },
        }
    }
</script>

<style scoped>
  .main-content{
    overflow: hidden;
    position: relative;
    z-index: 300;
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
    line-height: 30px;
    font-size: 14px;
  }
</style>
