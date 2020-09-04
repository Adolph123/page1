<template>
  <div class="shoppingBox">
    <Details v-if="isDetails" :isshoppingCart="isshoppingCart" :homepageskuid="homepageskuid" @showDetails="showDetails"></Details>

    <el-dialog
        :visible.sync="dVisible"
        width="80%"
        borderRadio="6px"
      >
        <div class="udizhi" style="text-align: center;margin: 20px 0;font-weight: 800;font-size: 16px">
          <span>是否要删除这些商品？</span>
        </div>
        <span slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between">
            <span class="udizhi1 btoms"   @click="removecarItem">删 除</span>
            <span style="width: 10%"></span>
            <span class="btoms" style="background: #f5f5f5;color: #ccc;" @click="dVisible = false">关 闭</span>
          </span>
    </el-dialog>
    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>

    <!--    购物车详情   -->
    <h1 class="title">
      <span style="font-weight: 800;font-size: 0.65rem">全部（{{radio}}）</span>
      <span style="font-weight: 800;font-size: 0.65rem" @click="remove = !remove ">{{ !remove? '管理':'完成'}}</span>
    </h1>

    <Scroll class="main-content" :listenScroll="listenScroll" :pullup="pullup" ref="scroll" @scroll="scrollss"
            id="scroll"      @scrollToend="scrollToend" :data='shoppingList'>

      <div @touchstart.prevent="handleTouchStart"
           @touchmove="handleTouchMove"
           @touchend="handleTouchEnd"  id="scrollbox" class="shoppingcontent">

        <div v-show="loading" style="text-align: center;padding: 10px 0;transition: all 0.5s;font-size: 14px">
          <i style="font-size: 16px" class="el-icon-loading" ></i><span>下拉刷新</span>
        </div>
        <!--        没有图片 暂时不展示-->
        <span v-show="shoppingdetail" style="text-align: center;">
          <img src="@/assets/images/shapCar.png" alt="" class="praiseimg">
          <router-link to="/homepage" tag="div" style="margin-top: 2rem">
            <span class="backcolors"
              style="font-size:0.7rem;display: inline-block;padding: 6px 2rem;color: #fff;
              border-radius: 25px;line-height: 30px">去添加商品</span>
          </router-link>
        </span>

        <div class="shoppingItem" v-for="(item,index) in shoppingList" :key="item.storeId">
          <!--          店铺名   -->
          <div style="padding: 0.35rem 0.2rem 0;display: flex;justify-content: space-between;align-items: center;font-size: 16px">
            <span @click.prevent="shopradioall(index,item.isflag)" style="color: #9a55ff;font-size: 18px"
                  :class="{'el-icon-success':item.isflag,'radio':!item.isflag}"></span>
            <div @click="toShophome(item.storeId)"
                 style="width: 91%;float: right;display: flex;justify-content: space-between">
              <span style="font-weight: 800;">{{item.storeName}}</span>
              <i style="color: #bababa;" class="el-icon-arrow-right"></i>
            </div>
          </div>

          <div class="flexdv" style="align-items: center;" v-for="(todo,speed) in item.carts" :key="todo.skuId">
            <div style="margin-left: 0.2rem;width: 8%">
              <div>
                <!--           商品选中      -->
                <span :class="{'el-icon-success':todo.isflag,'radio':!todo.isflag}"
                      style="color: #9a55ff;font-size: 18px"   @click.stop="taggleradio(index,speed)">
                </span>
              </div>
            </div>
            <div style="width: 91%;display: flex;align-items: center">
              <div @click.stop="toDetails(todo.skuId)">
                <img :src="todo.image" alt="" class="image">
              </div>
              <div style="margin-left: 0.3rem;width: 75%">
<!--                商品名-->
                <div @click.stop="taggleradio(index,speed)"  class="text" style="font-size: 14px;line-height: 0.9rem;width: 100%"><span
                 >{{todo.skuName}}</span></div>
<!--               商品规格 /-->

                <div class="text" @click="taggleguige(todo)" style="font-size: 14px;line-height: 0.8rem;width: 100%">
                  <div>
                    <span style="color: #999999;">规格：</span>
                    <span>
                    <span v-for="(txt,num) in todo.saleAttr" :key="num">
                      {{txt.saleAttrName}}:{{txt.saleAttrValueName}}
                    </span>
                  </span>
                  </div>
                </div>
<!--                商品价格-->
                <div @click.stop="taggleradio(index,speed)" class="flexdv" style="justify-content: space-between;">
                  <span style="color: #F4451A;display: none;">{{integral?'积分':'&nbsp'}}</span>
                  <span style="font-size: 0.6rem">{{integral?todo.score:todo.price}}<span
                    style="font-size: 14px">ulam</span >   </span>

                  <div class="addreduce">
                    <span class="el-icon-minus" style="padding: 0 0.3rem;display: block;color: #bababa"
                          @click.stop="reduceCarnum(todo.skuId)"></span>
                    <span
                      style="display: block;padding: 0 0.5rem;background: #f5f5f5;line-height: 1rem">{{todo.count}}</span>
                    <span class="el-icon-plus" style="padding: 0 0.3rem;display: block;color: #bababa"
                          @click.stop="addCarnum(todo.skuId)"></span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
          暂无更多
        </div>

        <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;">
          <i style="font-size: 28px" class="el-icon-loading" ></i>
        </div>

        <div style="height:12vh"></div>
      </div>
    </Scroll>


    <!-- 支付和管理 -->
    <div v-if="shoppingList.length<=0? false:true">
      <div v-if="!remove" class="shoppingBotm">
        <div class="shoppingBotmbox">
          <div class="shoppingBotmleft">
            <div style="color: #999;display: flex;justify-content: space-between;align-items: center;width: 100%"
                 @click.prevent="taggleradioall(radioall)">
              <span style="color: #9a55ff;font-size: 18px"
                    :class="{'el-icon-success':radioall,'radio':!radioall}"></span>
              <span style="float: right;color: #000">全选</span>
            </div>
          </div>


          <div style="display: flex;align-items: center">
            <div style="margin-right: 10px">
              <span>合计:
<!--                <span style="color:#F4451A;display: none">{{integral?'积分':'&nbsp'}} </span>-->
                  <span style="font-size: 12px">
                  {{ Math.round(pice*100)/100}}<span  style="font-size: 12px">ulam</span >
                 </span>
              </span>
            </div>
            <button @click="toSubmit" class="shoppingBotmbtn"> 去结算</button>
          </div>
        </div>
      </div>
      <div v-else class="shoppingBotm">
        <div class="shoppingBotmbox" style="display:flex;justify-content: space-between;">
          <div class="shoppingBotmleft">
            <div style="color: #999;display: flex;justify-content: space-between;align-items: center;width: 100%"
                 @click.prevent="taggleradioall(radioall)">
              <span style="color: #9a55ff;font-size: 18px"
                    :class="{'el-icon-success':radioall,'radio':!radioall}"></span>
              <span style="float: right;color: #000">全选</span>
            </div>
          </div>

          <div>
            <button class="shoppingBotmbtn" style="background: red" @click="removes"> 删除</button>
          </div>
        </div>
      </div>
    </div>

    <!--          选择规格-->
    <Purchase  @tagglePrompt="tagglePrompt" v-if="isPurchase" :isshop="isshop" :shopgoodsId="shopgoodsId" :shopsaleAttr="shopsaleAttr"
       :movetitle="movetitle" :shopNums="shopNums" :detailId="detailId" @removepurchase="removepurchase">

    </Purchase>
    <Bnavigation :flag="flag"></Bnavigation>
  </div>

</template>

<script>
    import {getdislist} from '@/api/index';
    import Bnavigation from '../bnavigation/bnavigation';
    import Scroll from "@/base/scroll/scroll";
    import backColor from "@/base/backColor/backColor";
    import Prompts from "@/base/prompt/prompt";
    import {lyricminshow,SearchHistory} from '@/common/js/mixin.js';
    import Details from '@/base/coDetail'
    import Purchase from '@/components/details/purchase/purchase'
    export default {
        name: "shoppingCart",
        mixins: [lyricminshow,SearchHistory],
        components: {Scroll, Prompts, Bnavigation,backColor,Details,Purchase},
        data() {
            return {
                //更改规格
                isPurchase:false,
                isshop:true,
                detailId:0,
                shopNums:0,
                shopgoodsId:{},
                shopsaleAttr:[],
                movetitle:'',
                isshoppingCart:true,
                id: 115,
                dVisible:false,
                flag: 2,
                token: localStorage.getItem('token'),
                radio: 0,
                remove: false,
                radioall: false,
                page: 1,//分页
                shoppingList: [],
                integral: this.$route.query.id ? true : false,//判断是不是积分
                score: 0,//总共需要多少积分
                pice: 0,//总共需要多少钱
                isPrompt: false,//提示框的展示与隐藏
                Prompttext: '',//提示框成功或失败
                Promptmsg: '',//提示框成功或者失败原因
                Promptimage: '',//是否展示图片
                addlist: 0,

                shoppingdetail:false,
            }
        },
        created() {
            this._getdislist();
            // this.changeCarnum()
            this.getaddlist();
        },
        mounted() {
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('dark')
            }
        },
        methods: {
            //removepurchase//关闭选择规格
            removepurchase(){
                this.isPurchase = false;
                this.empty = false;
                this.page = 1;
                this.shoppingList = [];
                this._getdislist()
            },
            //打开选择规格
            taggleguige(item){
                this.detailId = item.gid;
                this.shopgoodsId = item.id;

                this.shopNums = item.count

                this.shopsaleAttr = item.saleAttr;

                console.log(item.saleAttr,'!!!!!!!!!!!!!!!');

                this.isPurchase = true;
            },
            //
            removes(){
                let nums = 0;
                this.shoppingList.map(item=>{
                    if(item.isflag){
                        nums +=1;
                    }else {
                        item.carts.map(todo=>{
                            if(todo.isflag){
                                nums+=1
                            }
                        })
                    }
                });
                if(nums > 0){
                    this.dVisible = true;
                }else{
                    this.tagglePrompt(false,'请选择需要删除的商品')
                }


            },
            //划过结束
            handleTouchEnd() {
                console.log('@@@', this.scrollY, '>', 15 && this.StartY, '<', this.MoveY - 15)
                if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                    this.loading = true;
                    this.empty = false;
                    this.page = 1;
                    this.shoppingList = [];
                    this._getdislist()
                }
            },
            //滚动监听
            scrollss(pos){
                this.heights = document.getElementById('scrollbox').clientHeight;
                this.scrollheight = document.getElementById('scroll').clientHeight;
                this.scrollY = pos.y;
                if(this.isscrollflag){
                    if((pos.y * -1)+200 >= this.heights-this.scrollheight ){
                        if(this.total/10 > this.page){
                            this.isscrollflag = false;
                            this.page += 1;
                            this.btomloading = true;
                            this._getdislist();
                        }else{
                            this.btomloading = false;
                            this.empty = true;
                        }
                    }
                }
            },

            //滑动 优质产品 加载更多
            scrollToend() {
                // console.log(this.StartY, '优质产品 加载更多', this.MoveY, this.total / 10, this.page);
                // if (this.StartY > this.MoveY - 250) {
                //
                //     if (this.total / 10 > this.page) {
                //         this.btomloading = true;
                //         this.page += 1;
                //         this._getdislist();
                //     } else {
                //         this.btomloading = false;
                //         this.empty = true;
                //     }
                // }
            },


            //跳转店铺
            toShophome(storeId) {
                this.$router.push({
                        path: `/shophome/${storeId}`
                    }
                )
            },
            //提示框出现
            tagglePrompt(isflag, text, msg) {
                if (isflag) {
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.isPrompt = true;
                    this.Promptimage = isflag;
                } else {
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.Promptimage = isflag;
                    this.isPrompt = true;
                }
                setTimeout(() => {
                    this.isPrompt = false;
                }, 1500)
            },

            // //点击图片跳转商品详情
            // toDetails(id) {
            //     this.$router.push({
            //         path: `/details/${id}`,
            //     })
            // },

            //购物车下单购物车下单
            toSubmit() {
                if (this.addlist > 0) {
                    let detail = [];
                    this.shoppingList.map(item => {
                        item.carts.map(todo => {
                            if (todo.isflag) {
                                detail.push(todo.id)
                            }
                        })
                    });
                    console.log(detail.length);
                    if (!detail.length) {
                        console.log('没数据');
                        this.tagglePrompt(false, '请选择需要购买的商品');
                        return
                    } else {
                        console.log('有数据')
                        this.$router.push({
                            path: "/submit",
                            query: {
                                detail: JSON.stringify(detail)
                            }
                        });
                    }
                } else {
                    this.tagglePrompt(false, '请选添加收货地址');
                }


            },

            getaddlist() {
                let apiurl = 'v1/shop/order/address-find';
                let date = {};
                getdislist(apiurl, date).then(res => {
                    console.log(res, '@@@@@@@@地址')
                    this.addlist = res.data?res.data.length:0;
                })
            },

            //从购物车删除商品
            removecarItem() {
                let carid = [];
                this.shoppingList.map(item => {
                    item.carts.map(todo => {
                        if (todo.isflag) {
                            carid.push(todo.id);
                        }
                    })
                });
                let apiurl = 'v1/shop/goods/del-cart';
                let data = {
                    id: carid
                };
                getdislist(apiurl, data).then(res => {
                    this.dVisible = false;
                    console.log(res, '删除购物车数据');


                    // let reslist = res.data;
                    if (res.status == "fail") {
                        this.tagglePrompt(true, '删除购物车商品失败,', res.msg)
                    } else {
                        this.pice = 0;
                        this.tagglePrompt(true, '删除购物车商品成功');
                        this.page = 1;
                        this.remove = !this.remove;
                        this.shoppingList = [];
                        this._getdislist();//请求商品数据
                    }

                })
            },

            //购物车数据
            _getdislist() {
                // 需要判断是否是 积分购物车
                let apiurl = 'v1/shop/goods/find-cart';
                let data = {
                    page: this.page,
                    isScore: this.integral ? 1 : 0
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res, '数据');
                    if(res.status == "tokenFail") {

                        this.tagglePrompt(false, '登录状态失效请重新登录');

                        setTimeout(()=>{
                            localStorage.clear()
                            this.$router.push('/index');
                        },3000)

                    }else{
                        this.btomloading = false;
                        this.isscrollflag = true;
                        this.loading = false;
                        let reslist = res.data;
                        if (reslist) {
                            let shoppingList = JSON.parse(JSON.stringify(this.shoppingList));
                            reslist.map(item => {
                                item.isflag = false;
                                item.carts.map(todo => {
                                    todo.isflag = false;
                                })
                            });
                            if (shoppingList.length) {
                                shoppingList.map(item => {
                                    reslist.map((todo, index) => {
                                        console.log(item.storeId, '==', todo.storeId)
                                        if (item.storeId == todo.storeId) {
                                            console.log(item.storeId, '==', todo.storeId, '@@@@@@@')
                                            item.carts = item.carts.concat(todo.carts);
                                            reslist.splice(index, 1)
                                        }
                                    })
                                });
                                shoppingList = shoppingList.concat(reslist);

                            } else {

                                shoppingList = reslist;

                            }

                            this.shoppingdetail = false;
                            this.shoppingList = shoppingList;

                            this.radio = res.total;
                            this.total = res.total;
                            // this.CalculationPice();//计算总价
                        } else {
                            this.shoppingList = [];
                            this.shoppingdetail = true;
                            this.isscrollflag = true;
                            this.total = 0;
                            this.radio = 0;
                            return
                        }
                    }




                })
            },

            //购物车数量加1
            addCarnum(id) {
                console.log(id);
                this.changeCarnum(id, 1)
            },

            //购物车数量减1
            reduceCarnum(id) {
                console.log(id);
                this.changeCarnum(id, -1)
            },

            //改变购物车商品数量
            changeCarnum(id, count) {
                let apiurl = 'v1/shop/goods/cart-count';
                let data = {
                    id, count
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res, '改变购物车数量数据');
                    if (res.status == "fail") {
                        //更改失败
                        // this.$message(`数量更改失败,${res.msg}`)
                        this.tagglePrompt(false, '数量更改失败,', res.msg);
                    } else {
                        //更改成功
                        // this.$message(`数量更改成功`);
                        // this.tagglePrompt(true,'数量更改成功')
                        let reslist = this.shoppingList;
                        reslist.map(item => {
                            item.carts.map(todo => {
                                if (todo.skuId == id) {
                                    todo.count += count
                                    console.log(todo, '更改')
                                }
                            })
                        });
                        this.shoppingList = reslist;
                    }
                    this.CalculationPice();//计算总价
                })

            },

            //切换单个商品是否选中
            taggleradio(index, speed) {
                let list = JSON.parse(JSON.stringify(this.shoppingList));
                // this.$set(this.shoppingList[index],index,{perPrice: 1, number: 10})


                list[index].carts[speed].isflag = !list[index].carts[speed].isflag;


                console.log('单个选中', this.shoppingList[index].carts[speed].isflag);

                let num = 0;
                list.map(item => {
                    let speed = 0;
                    item.carts.map(todo => {
                        if (todo.isflag) {
                            speed += 1;
                        } else {
                            item.isflag = false
                        }
                        //判断店铺内 是否全部选中
                        if (speed == item.carts.length) {
                            item.isflag = true
                        }
                    });
                    if (item.isflag) {
                        num += 1;
                    } else {
                        this.radioall = false
                    }
                    //判断是否全部选中
                    if (num == list.length) {
                        this.radioall = true
                    }
                    ;
                });

                this.shoppingList = list;
                console.log(this.shoppingList, 'this.shoppingList');

                this.$refs.scroll.refresh()


                this.CalculationPice();//计算总价


            },

            //计算总价
            CalculationPice() {
                let numspic = 0;
                this.shoppingList.map(item => {
                    item.carts.map(todo => {
                        if (todo.isflag) {
                            if (this.integral) {//总积分
                                numspic += todo.score * todo.count;
                            } else {//总人民币
                                numspic += todo.price * todo.count;
                            }
                        }
                    })
                });
                if (this.integral) {//总积分
                    this.score = numspic;
                } else {//总人民币
                    this.pice = numspic;
                }
                console.log(numspic, '总价');
            },

            //全选
            taggleradioall(flag) {
                this.radioall = !flag;
                let list = JSON.parse(JSON.stringify(this.shoppingList));
                list.map(item => {
                    item.isflag = !flag;
                    item.carts.map(todo => {
                        todo.isflag = !flag;
                    })
                });


                this.shoppingList = list;
                this.CalculationPice();//计算总价
            },

            //店铺全选
            shopradioall(index, flag) {
                let list = JSON.parse(JSON.stringify(this.shoppingList));
                list[index].isflag = !flag;
                let num = 0;

                list.map(item => {
                    if (item.isflag) {
                        num += 1;
                    } else {
                        this.radioall = false
                    }
                    if (num == list.length) {
                        this.radioall = true
                    }

                });
                list[index].carts.map(todo => {
                    todo.isflag = !flag;
                });


                this.shoppingList = list;
                this.CalculationPice();//计算总价
            },
        }
    }
</script>

<style scoped lang="stylus">
  .shoppingBox
    width 100vw
    padding: 40px 0 0;
    text-align left
    font-size 14px
    font-size 14px
    background #f5f5f5

    .main-content
      height: 87vh;
      overflow: hidden;
      position: relative;

      .praiseimg
        display block
        width 100vw
        height auto
        margin 0 auto
        margin-top 7vh

    .title
      font-size: 0.6rem
      display flex
      justify-content space-between
      align-items center
      padding 0 0.6rem
      padding-bottom 0.6rem

    .flexdv
      display flex
      margin 0.2rem 0

      .addreduce
        border-radius 3px
        height 1rem
        display flex
        justify-content space-between
        align-items center

    .radio
      display inline-block
      width 14px
      height 14px
      border-radius 50%
      border 1px solid #bababa

    .radioshixin
      background #9a55ff
      border 1px solid #9a55ff

    .shoppingcontent
      width 94%
      margin 0 auto
      padding-bottom 6vh

      .shoppingItem
        line-height 1.2rem
        margin-top 0.2rem
        background #ffffff
        padding 0.2rem
        border-radius 6px

        .el-input-number {
          width auto
        }

        .el-input-number .el-input__inner {
          padding 0
        }

        .el-input__inner {
          height: 30px;
          line-height: 30px;
        }

        .text
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;

    .image
      width 60px
      height 60px
      display block


    .shoppingBotm
      width 94%
      padding 0.3rem 3%
      margin 0 auto
      position fixed
      z-index 1000
      bottom 6.6vh
      background #ffff

      .shoppingBotmbox
        width 94%
        height 5vh
        margin 0 auto
        display flex
        align-items center
        justify-content space-between

      .shoppingBotmleft
        line-height 1.5rem
        display flex
        font-size 14px
        width 16%

      .shoppingBotmbtn
        border 0
        outline 0
        display block
        font-size 0.65rem
        padding 5px 20px
        background #9a55ff
        border-radius 30px
        color #fff
  .btoms{
    display: block;
    margin: 0 auto;
    text-align: center;
    background: #9a55ff;
    line-height: 30px;
    font-size: 16px;
    color: #fff;
    border-radius:6px;
    width: 85%;
    padding: 2px 0;
  }
</style>
