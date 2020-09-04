<template>
    <div class="bannerbox">
      <!-- 轮播 -->
      <swiper v-if="iskeep" :options="swiperOption" ref="mySwiper" >
        <!-- slides -->
        <swiper-slide   v-for="todo in banner" :key="todo.id" >
          <div @click.stop="toDetails(todo.Cid)" >
            <span>
              <img :src="todo.ImageUrl" alt="" >
            </span>
          </div>
        </swiper-slide>

        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>

      </swiper>
    </div>
</template>

<script>
    import {getdislist} from '@/api/index';
    export default {
        name: "banner",
        created(){
            this._getdislist();//获取精品推荐数据
        },
        data(){
            return{
                iskeep:false,
                swiperOption:{
                    loop:true,
                    loopAdditionalSlides : 1,
                    autoplay:4000,
                    pagination:".swiper-pagination",
                },
                banner:[]
            }
        },
        methods:{
            //请求轮播图数据
            _getdislist(){
                let apiurl = 'v1/shop/banner/find';
                let data={};
                getdislist(apiurl,data).then(res => {
                    console.log(res,'轮播图数据');
                    let reslist = res.data;
                    if(reslist){

                        this.banner = this.banner.concat(reslist);
                        this.iskeep = true;
                    }else {
                        this.banner = []
                        return
                    }
                })
            },
            //跳转详情
            toDetails(id){
                //正常商品跳转详情
                console.log('点击轮播','@@@@@@@@@@@')
                if(id > 0){
                    this.$router.push({
                        path:  `/details/${id}`,
                    })
                }else{
                    return
                }

            }
        }
    }
</script>

<style scoped lang="stylus">

  .bannerbox
    background: #f5f5f5;
    //linear-gradient(to bottom, #9a55ff 0%,#f5f5f5 59%)
    margin-bottom -1px;
    img
      width 94%
      margin 1px auto
      display block
      border-radius 6px
</style>

<style>
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom:0.6rem;
    left: 0;
    width: 100%;
  }
  .swiper-pagination-bullet-active{
    background: #9a55ff!important;
  }
</style>
