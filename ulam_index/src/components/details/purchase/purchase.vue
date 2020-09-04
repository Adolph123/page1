<template>
  <div class="purchasebox" @click.prevent="purchaseClose">
    <div class="purchase" @click.stop="">
      <div class="purchaseguanbi">
        <i class="el-icon-circle-close" @click="purchaseClose"></i>
      </div>
      <!--    规格-->
      <Scroll class="main-content" :data='guigelist'>
        <div>
          <!--    图片   -->
          <div  class="purchasetop">
            <div style="flex: 0.32"><img :src="contentList.defaultImg" alt=""class="images"></div>
            <div style="flex: 0.7;">
              <div style="font-size: 0.8rem;color:#F4451A;">
                <span style="display: none;font-size: 14px">{{integral?'积分':'&nbsp'}}</span>
                <span style="font-weight: 800;">{{integral?contentList.score:contentList.price}} <span  style="font-size: 14px;font-weight: 800;">ulam</span ></span>
              </div>
              <div style="color: rgb(99, 99, 99);font-size: 14px;line-height: 21px">
                <div> <span><span style="font-size: 0.5rem">重量</span>：{{contentList.weight}} {{contentList.weightUnit}}</span></div>
                <div> <span><span style="font-size: 0.5rem">库存</span>：{{stock}}</span></div>
                <div> <span><span style="font-size: 0.5rem">编号</span>：{{contentList.skuNo?contentList.skuNo:'无'}}</span></div>
              </div>
            </div>
          </div>
          <!--      规格详细-->
          <div class="purchasescrols">
            <div v-for="(item,index) in guigelist " :key="item.saleAttrId" class="purchaseItem">
              <h1 class="title"> <span style="font-size: 0.58rem;">{{item.saleAttrName}} </span></h1>
              <div style="text-align: left">
                <div v-for="(list,num) in item.value" :key="list.id" class="purchaseItemlist" @click="saleAttrItem(index,num,item.saleAttrId,list.id)">

                  <span :class="{purchaseItemlistactive:list.isflag,purchaseItemlistact:!list.isflag}">
                    {{list.name}}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style="height: 10px"></div>
          <!--    确认购买-->
          <div class="purchaseBotm">
            <!--    购买数量-->
            <div class="purchasenums">
              <div> <span style="font-size: 0.58rem">数量</span> </div>
              <div style="padding:0 0.5rem">
                <div style="display: flex;justify-content: space-between;">

                  <span class="el-icon-minus" style="padding: 0.35rem;background: #f5f5f5;color: rgb(99,99,99);line-height: 20px;" @click="removenums"></span>
                  <input type="number" v-model="nums" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                         onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" class="inptext" >
                  <span class="el-icon-plus" style="padding: 0.35rem;background:#f5f5f5;color: rgb(99,99,99);line-height: 20px;" @click="addnums"></span>
                </div>
                <!--          <el-input-number v-model="nums" @change="handleChange" :min="1" :max="999" label="描述文字"></el-input-number>-->
              </div>
            </div>
            <div style="height: 10px"></div>
            <div v-if="isshop">
              <button class="purchaseBotmbtn" @click="cartcount">确定</button>
            </div>
            <div v-else>
              <button class="purchaseBotmbtn backcolors" @click="isgoodShop(movetitle)"> {{movetitle? '确认购买':'加入购物车'}} </button>
            </div>
          </div>

          <div style="height: 30px"></div>
        </div>

      </Scroll>



    </div>
  </div>
</template>

<script>
    import {getdislist} from '@/api/index';
    import Scroll from "@/base/scroll/scroll";
    import {goBackpushState} from '@/common/js/mixin';
    export default {
        mixins: [goBackpushState],
        name: "purchase",

        components:{Scroll},
        props:{
            isshop:{
                type:Boolean,
                default:false
            },
            movetitle:{
                type:Boolean,
                default:false
            },
            integral:{
                type: Boolean,
                default: false,
            },
            detailId:{
                type:Number,
                default:0
            },
            goodsId:{
                type:Number,
                default:0
            },
            shopNums:{
                type:Number,
                default:0
            },
            shopgoodsId:{
                type:Number,
                default:0
            },
            shopsaleAttr:{
                type:Array,
                default:()=>{
                    return []
                }
            },
        },
        created(){
            this._getListattr();
            this.getaddlist();
        },
        data(){
          return{
              duration:10000,
              nums:1,
              contentList:[],
              saleAttr:[],
              guigelist:[
                  {
                      title:'品种',
                      list:[
                          '黑色' ,'昏灰', '暗灰', '灰色' ,'暗灰', '银色', '亮灰色', '庚斯博罗',
                      ]
                  },
                  {
                      title:'尺寸',
                      list:[
                          '100' ,'110', '120', '130' ,'140', '150', '160', '170',
                      ]
                  }
              ],
              nums:1,
              skuId:0,
              stock:0,
              addlist:0
          }
        },

        methods:{
            //更改购物车列表   v1/shop/goods/cart-count
            cartcount(){
                let apiurl = 'v1/shop/goods/cart-sku';
                let date={
                    id:this.shopgoodsId,
                    skuId:this.skuId,
                    count:this.shopNums
                };
                getdislist(apiurl,date).then(res=>{

                    if (res.status == "success"){

                        this.$emit('tagglePrompt',true,'更改成功');

                    }else {

                        this.$emit('tagglePrompt',false,res.msg);

                    }

                    this.$emit('removepurchase',false);


                    console.log(res,'更改购物车列表')
                })
            },
            //返回
            goBack(){
                this.$emit('removepurchase',false)
                //replace替换原路由，作用是避免回退死循环
            },
            getaddlist(){
                let apiurl = 'v1/shop/order/address-find';
                let date={};
                getdislist(apiurl,date).then(res => {
                    console.log(res,'@@@@@@@@地址');
                    this.addlist = res.data?res.data.length:0;
                })
            },
            //数量增加
            addnums(){
                this.nums += 1;
            },
            //数量减少
            removenums(){
                if(this.nums == 1){
                    this.nums = 1
                }else{
                    this.nums -= 1;
                }
            },
            //选择规格
            saleAttrItem(index,num){
                console.log(index,num);
                this.guigelist[index].value.map(item=>{
                    item.isflag = false;
                })
                this.guigelist[index].value[num].isflag = true;
                this.getstock();
            },
            //请求库存
            getstock(){
                let saleAttr = [];

                    this.guigelist.map(item=>{
                        item.value.map(todo=>{
                            if(todo.isflag){
                                saleAttr.push({
                                    saleAttrId:item.saleAttrId,
                                    saleAttrValueId:todo.id
                                })
                            }
                        })
                    });




                let apiurl = 'v1/shop/goods/get-sku-by-attr';
                let date={
                    gid: parseInt(this.detailId),
                    saleAttr: saleAttr,
                };
                getdislist(apiurl,date).then(res => {
                    console.log(res,'请求规格库存');
                    this.contentList = res.data;
                    let resList = res.data;
                    this.skuId= resList.skuId;
                    this.stock = resList.store?resList.store:0;
                })
            },
            //判断 生成订单 还是加入购物车
            isgoodShop(flag){
                if(flag){
                    this.topSubmit()
                }else {
                    this.addcartItem()
                }
            },
            //跳转生成订单
            topSubmit(){

                console.log(this.skuId, this.nums,'跳转生成订单');
                if(this.addlist > 0){

                    if(this.skuId != 0){
                        if(this.integral){
                            //积分购物
                            this.$router.push({
                                path:'/submit',
                                query:{
                                    skuId:this.skuId,
                                    count: this.nums,
                                    id: 1
                                }
                            })

                        }else{
                            //正常商品
                            this.$router.push({
                                path:'/submit',
                                query:{
                                    skuId:this.skuId,
                                    count: this.nums,
                                }
                            })
                        }

                    }else{
                        this.$emit('tagglePrompt',false,'请选择规格');
                    }
                }else{
                    this.$emit('tagglePrompt',false,'请选添加收货地址');
                }

            },
            //加入购物车
            addcartItem(){
                let saleAttr = [];
                this.guigelist.map(item=>{
                    item.value.map(todo=>{
                        if(todo.isflag){
                            saleAttr.push({
                                saleAttrId:item.saleAttrId,
                                saleAttrValueId:todo.id
                            })
                        }
                    })
                });
                let apiurl = 'v1/shop/goods/add-cart-now';

                console.log(parseInt(this.detailId));
                let data={
                    gid:parseInt(this.detailId),
                    saleAttr :saleAttr,
                    count: this.nums,
                    isScore:this.integral?1:0,//判断是积分 还是正常商品
                }
                getdislist(apiurl,data).then(res => {
                    console.log(res,'加入购物车数据');
                    if(res.status == "fail"){
                        this.$emit('tagglePrompt',true,'加入购物车失败,',res.msg)
                    }else{
                        this.$emit('tagglePrompt',true,'加入购物车成功','购物车等你哟亲')
                    }

                    this.$emit('removepurchase',false)
                })

            },


            //请求规格数据
            _getListattr(){
                let apiurl = 'v1/shop/goods/find-sale-attrs';
                console.log(parseInt(this.detailId),'detailId');
                let data={
                    id:parseInt(this.detailId)
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'商品规格数据');
                    let resList = res.data;
                    if(this.shopsaleAttr.length){
                        resList.map((item,num)=>{
                            item.value.map((todo,index)=>{
                                if(todo.id == this.shopsaleAttr[num].saleAttrValueId){
                                    todo.isflag = true;
                                    return;

                                }else{
                                    todo.isflag = false;
                                }
                            })
                        });



                    }else{
                        resList.map(item=>{
                            item.value.map((todo,index)=>{
                                if(index==0){
                                    todo.isflag = true;
                                }else{
                                    todo.isflag = false;
                                }
                            })
                        });
                    }



                    this.guigelist = resList;
                    this.stock = this.contentList.stock;
                    //请求库存

                    this.getstock();
                })
            },
           //关闭页面
            purchaseClose(){
                this.$emit('removepurchase',false)
            }
        }
    }
</script>

<style scoped lang="stylus">
  .purchasebox
    width 100vw
    height 100vh
    position fixed
    top 0
    z-index 2000
    background rgba(0,0,0,0.4)
    font-size 0.5rem
    .purchase
      width 100vw
      position absolute
      top 20.5vh
      height 80vh
      z-index 10000
      background #fff
      font-size 0.5rem
      border-top-left-radius 6px
      border-top-right-radius 6px
      .main-content
        height: 80vh;
        overflow: hidden;
        position: relative;
      .purchasetop
        display flex
        width 92%
        margin 0 auto
        padding-top 1.5rem
        text-align left
        .images
          width 26vw
          display block
          height auto
      .purchasescrols
        position relative
        width 100%
        margin-top 1rem
        font-size 0.57rem

        overflow hidden
        .purchaseItem
          width 92%
          margin 0.8rem auto
          padding-bottom 0.3rem
          border-bottom 1px solid #f5f5f5
          .title
            text-align left
            margin 0.3rem 0
          .purchaseItemlist
            display inline-block
            margin 0.15rem 0
            font-size 0.5rem;
            margin-right 0.4rem
            .purchaseItemlistact{
              font-size: 0.5rem;
              line-height: 15px;
              border-radius: 6px;
              margin: 0.1rem;
              display: inline-block;
              padding: 6px 0.4rem;
              background: rgb(245, 245, 245);
              color: rgb(0, 0, 0);
              border: 1px solid rgb(245, 245, 245);
            }
            .purchaseItemlistactive{
              border: 1px solid #9a55ff;
              font-size: 0.5rem;
              line-height: 15px;
              border-radius: 6px;
              margin: 0.1rem;
              display: inline-block;
              padding: 6px 0.4rem;
              background: #faf1ff;
              color: #9a55ff;
            }
      .purchasenums
        display flex
        justify-content space-between
        width 92%
        margin 0.5rem auto
        .inptext{
          padding: 0.35rem 0.5rem;
          line-height: 20px;
          background: #f5f5f5;
          font-weight 700
          font-size 16px
          color: #222222;
          width: 40px;
          text-align: center;
          outline 0;
          border 0
          border-left 1px solid #fff;
          border-right 1px solid #fff;
        }
        .el-input-number
          width 34vw

      .purchaseguanbi
        position absolute
        width 100%
        top 2vh
        z-index 1000
        .el-icon-circle-close
          position absolute
          left 88%
          font-size 1rem
          color #bababa
      .purchaseBotm
        width 100%
        /*position absolute*/
        /*bottom 1.5vh*/
        background #fff
        .purchaseBotmbtn
          width 80%
          margin 0 auto
          border 0
          outline 0
          display block
          font-size 14px
          font-weight 800
          line-height 1rem
          padding 0.3rem 1.2rem

          border-radius 30px
          color #fff
</style>

<style>
  .el-message{
    z-index: 10000000;
  }
</style>
