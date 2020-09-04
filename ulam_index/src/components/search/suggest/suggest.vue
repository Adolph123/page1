<template>
  <scroll class="suggest" :probeType='probeType' :listenScroll="listenScroll" :pullup="pullup" ref="scroll"
          @scroll="scrollss"
          @scrollToend="scrollToend" :data='listsong'>
    <div @touchstart.prevent="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd">
      <!--提示  弹窗 -->
      <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>


      <div v-show="loading" style="text-align: center;padding: 10px 0;transition: all 0.5s">
        <i style="font-size: 16px" class="el-icon-loading"></i>
        <span>下拉刷新  </span>
      </div>

      <ul class="suggest-list">
        <li class="suggest-item" v-for=" (todo,index) in listsong" :key="todo.id" @click='Timeselect(todo.id,todo)'>
          <div class="orderimgs">
            <div style="width: 25%">
              <img :src="todo.image" alt="" class="Processingimages">

            </div>
            <div style="width: 72%;position: relative;">
              <div class="nametext"><span>{{todo.skuName}}</span></div>
              <div style="color:#9a55ff;position:absolute;right: 0.3rem;bottom: 0.1rem">
                <span style="font-size: 0.7rem;color:#9a55ff">&nbsp{{todo.price}}</span><span style="font-size: 12px">ulam</span>
              </div>

            </div>
          </div>
        </li>
      </ul>

      <div style="height: 50px"></div>
    </div>


  </scroll>
</template>

<script>



    export default {

        components: {scroll, loading, noResult},
        props: {
            listsong: {
                default: []
            },

        },
        data() {
            return {
                p: 1,
                pullup: true,
                hasMore: true
            }
        },
        created() {

        },
        methods: {
            lloadings() {
                this.loading = false;
            },
            Timeselect(id, integral) {
                console.log(id);
                if (integral) {
                    this.$router.push({
                        path: `/details/${id}`,
                        query: {
                            id: 1
                        }
                    })
                } else {
                    this.$router.push({
                        path: `/details/${id}`,
                    })
                }
            },
            //划过结束
            handleTouchEnd() {
                console.log('@@@', this.scrollY, '>', 15 && this.StartY, '<', this.MoveY - 15)
                if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                    this.page = 1;
                    this.empty = false;
                    this.loading = true;
                    this.listsong = [];
                    this.$emit('_getdislist')
                }
            }
            ,
            //滑动 优质产品 加载更多
            scrollToend() {
                // console.log(this.StartY,'优质产品 加载更多',this.MoveY);
                if (this.StartY > this.MoveY - 250) {
                    console.log(this.total / 10, '>', this.page, 'this.total / 10 > this.page')
                    if (this.total / 10 > this.page) {
                        this.page += 1;
                        this.btomloading = true;
                        // this._getdislist(this.statusnums)
                    } else {
                        this.btomloading = false;
                        this.empty = true;
                    }
                }
            }
            ,
        },
        watch: {}

    }
</script>

<style scoped lang='stylus'>
  @import '../../../common/stylus/variable'
  @import '../../../common/stylus/mixin'


</style>
