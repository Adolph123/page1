<template>
  <div class="warp">
    <img v-if="color" src="@/assets/newpage/钱包_03.png" alt="" style="width: 3vw;height: auto;" @click="backclick">
    <img v-else src="@/assets/back.png" alt="" style="width: 3vw;height: auto;" @click="backclick">


    <div class="search-box">
      <img src="@/assets/icon/商城_11.png" alt="" style="width: 6.5vw;margin-top: -1px;">
      <input type="text" v-focus="islode" ref="ttextarea" class="box" v-model="values" @keyup.enter="seartvalus"
             :placeholder="placeholder">
      <!--        <i class="icon-dismiss" @click="remove"></i>-->
    </div>
    <span class="ic-size" :style="{color:color?'#fff':'#000'}" @click='seartvalus'>搜索</span>
<!--    <el-dialog-->
<!--      :visible.sync="dialogVisible"-->
<!--      width="80%">-->
<!--      <div style="text-align: center;font-size: 16px">搜索内容不能为空</div>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--      <span class="btoms" @click="dialogVisible = false">关 闭</span>-->
<!--    </span>-->
<!--    </el-dialog>-->

    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
  </div>

</template>

<script>
    import {Signer} from 'crypto';
    import {reminder} from '@/common/js/mixin.js';
    export default {
        mixins:[reminder],
        props: {
            placeholder: {
                type: Signer,
                default: '',
                delay: 300
            },
            color: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                values: '',
                dialogVisible: false,
                islode: true
            }
        },
        directives: {
            focus: {
                inserted: function (el, {value}) {
                    console.log(el, {value})
                    if (value) {
                        el.focus();
                    }
                }
            },
        },
        methods: {
            //回退
            backclick() {
                this.$emit('goBack')
            },
            //清除input的内容
            // remove(){
            //     this.values = ''
            //     this.seartvalus()
            // },
            //input获取点击的热门关键词
            togvalus(k) {
                // console.log(k)
                this.values = k
                this.seartvalus()
            },
            seartvalus() {
                this.islode = false;
                document.activeElement.blur()
                if (this.values == '') {
                    this.tagglePrompt(false,'搜索内容不能为空')
                } else {
                    this.$emit('severvalue', this.values)
                }

            },

        }
    }
</script>

<style>
  input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
    color: #bababa;
  }

  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 适配火狐 */
    color: #bababa;
  }

  input::-moz-placeholder { /* Mozilla Firefox 19+ 适配火狐 */
    color: #bababa;
  }

  input:-ms-input-placeholder { /* Internet Explorer 10+  适配ie*/
    color: #bababa;
  }
</style>

<style scoped lang='stylus'>
  @import '../../common/stylus/variable'
  .warp
    display flex
    align-items center
    justify-content space-between
    padding 37px 0 1%
    width 94%
    height 35px
    margin 0 auto

    img
      display block
      height auto

    .icon-back
      font-size $font-size-medium
      color #000
      line-height 5vh
      padding 0 0.5rem

    .search-box
      display flex
      align-items center
      box-sizing border-box
      font-size 0.5rem
      width 70%
      padding 10px
      height 30px
      background #fff
      border-radius 20px

      .icon-search
        font-size 24px
        color #999

      .box
        margin 0 5px
        width 65%
        outline none
        background #fff
        color #999
        font-size 14px

        font-size
        &:：placeholder
          color $color-text-d

    .ic-size
      font-size 15px
      line-height: 5vh;
      padding-right 0.3

  .btoms {
    display: block;
    margin: 0 auto;
    text-align: center;
    background: #9a55ff;
    font-size: 16px;
    line-height: 30px;
    color: #fff;
    border-radius: 6px;
    width: 85%;
    padding: 2px 0;
  }
</style>
