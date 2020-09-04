<template>
  <div class="list_router">
    <ul class="tab">
      <li class="tab-item" v-for="(item,index) in listOne" :key="index" @click="tiaozhuanly(item)">

         <div style="width:100%"> <img :src="item.Image" alt=""></div>
        <span class=" tab-link">{{item.Name}} </span>
      </li>
    </ul>

  </div>
</template>

<script>

    export default {
        props:{
            listOne:{
                type:Array,
                default:[]
            }
        },
        data(){
            return{

            }
        },
        methods:{
            tiaozhuanly(item){
                if(item.Remark == 0){
                    this.$router.push({
                        path: `/submentus`,
                        query:{
                            id:JSON.stringify(item.Cid)
                        }
                    })
                }else {
                    switch (item.Remark) {
                        case 1: //积分商城
                            this.$router.push({
                                path: `/submenu/${item.Cid}`,
                                query: {
                                    id: 1
                                }
                            })
                            break;
                        case 2: //优惠券
                            this.$router.push({
                                path: '/cardcoupon',
                            })
                            break;
                        case 3: //VIP
                            this.$router.push({
                                path: '/',
                            })
                        case 4:  //分类
                            this.$router.push({
                                path: '/classify',
                            })
                            break;
                            break;
                        default:
                            break;
                    }

                }
            }
        }
    }
</script>

<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl';
  .list_router
    position relative
    width 100%
    height 100%
    font-size 0
    .tab
      line-height 1rem
      width 98%
      font-size 16px
      display flex
      margin 0 auto
      justify-content space-between
      margin-bottom 0.15rem
      .tab-item
        text-align :center
        width:100%
        img
          display block
          width 35%
          height: auto;
          margin 3px auto
        .tab-link
          color #000
          display block
          line-height 1.3rem
          font-size 12px
</style>
