import Vue from 'vue'
import Router from 'vue-router'

//
//
// const Home = () => import("@/components/HelloFromVux");
// const New = () => import("@/components/new");
// const Find = () => import("@/components/find");
// const user = () => import("@/components/user");
// const hai = () => import("@/components/hai");
// const jilu = () => import("@/components/jilu");
//
//
// const wgeji  = () => import( '@/components/wgeji')
// const order  = () => import( '@/components/order')
// const wallet  = () => import( '@/components/wallet')
//
// const uemDetail  = () => import( '@/components/wallet/uemDetail')
// const flash  = () => import( '@/components/wallet/flash')
// const administrators  = () => import( '@/components/wallet/administrators')
// //修改资金密码
// const tagglemonymima  = () => import( '@/components/tagglemonymima')
// //默认跳转页面
// const appdeflunt  = () => import( '@/components/appdeflunt')
// const bag  = () => import( '@/components/bag')
// const setuser  = () => import( '@/components/setuser')
// const watorder  = () => import( '@/components/watorder')
// const watqing  = () => import( '@/components/watqing')
// const buyji  = () => import( '@/components/buyji')
// const jiangli  = () => import( '@/components/jiangli')
// const jiangli1  = () => import( '@/components/jiangli1')
// const tibi  = () => import( '@/components/tibi')
// const tibis  = () => import( '@/components/tibis')
// const sets  = () => import( '@/components/sets')
// const upmi  = () => import( '@/components/upmi')
// const addbi  = () => import( '@/components/addbi')
// const setjin  = () => import( '@/components/setjin')
// const tij  = () => import( '@/components/tij')
// const tanglu  = () => import( '@/components/tanglu')
// const tanglus  = () => import( '@/components/tanglus')
// const zhiwen  = () => import( '@/components/zhiwen')
// const sao  = () => import( '@/components/sao')
// const xiaji  = () => import( '@/components/xiaji')
// const tuiguang_day_info  = () => import( '@/components/tuiguang_day_info')
// const novice  = () => import( '@/components/novice/novice')
// const index  = () => import( '@/newpage/index')//新页面
// const faad  = () => import( '@/newpage/faad')
// const suo  = () => import( '@/newpage/suo')
// const mkg  = () => import( '@/newpage/mkg')
// const homepage  = () => import( '@/components/homepage/homepage');//商城首页
// const classify  = () => import( '@/components/classify/classify');//分类
// const shoppingCart  = () => import( '@/components/shoppingCart/shoppingCart');//购物车
// const myoder  = () => import( '@/components/myoder/myoder');//我的
// const search  = () => import( '@/components/search/search')//搜索
// const details  = () => import( '@/components/details/details')//商品详情
// const purchase  = () => import( "@/components/details/purchase/purchase")//规格
// const coupon  = () => import( '@/components/coupon/coupon')//优惠券
// const allorders  = () => import( "@/components/allorders/allorders") //全部订单
// const submit  = () => import( '@/components/submit/submit')//订单详情
// const payment  = () => import( '@/components/payment/payment')//商品详情
// const modifyaddress  = () => import( "@/components/Modifyaddress/modifyaddress")//修改地址
// const addresss  = () => import( "@/components/address/address") //新增地址
// const submenu  = () => import( "@/base/submenu/submenu") //药品
// const praise  = () => import( '@/components/myoder/praise/praise')//口碑
// const aftermarket  = () => import( "@/components/aftermarket/aftermarket") //售后
// const shophome  = () => import( "@/components/shophome/shophome") //店铺主页
// const shopdetail  = () => import( "@/components/shophome/shopdetail/shopdetail") //店铺详情
// const cardcoupon  = () => import( "@/components/cardcoupon/CardCoupon") //领优惠券
// const setup  = () => import( "@/components/setup/setup") //个人设置
// const personal  = () => import( "@/components/personal/personal") //个人收藏
// const collection  = () => import( "@/components/collection/collection") //收藏页面
// const completeddetail  = () => import( "@/components/aftermarket/completeddetail/completeddetail") //服务详情
// const newexpress  = () => import( "@/components/newexpress/newexpress") //最新物流
// const bannerItem  = () => import( "@/components/bannerItem/bannerItem")    //轮播详情
// const shangcheng  = () => import( "@/components/shangcheng")   //轮播详情
// const submentus  = () => import( "@/components/submentus/submentus")    //2级分类
// const dianpuok  = () => import( "@/components/dianpuok/dianpuok")   //2级分类
// const mebaoinfo  = () => import( "@/components/mebaoinfo")    //2级分类
// const detailbanner  = () => import( "@/components/detailbanner/detailbanner") //视频介绍
// const newsFlash  = () => import( '@/components/newsFlash/newsFlash')//快讯
// const kxfx  = () => import( '@/components/kxfx')//快讯
// const wenzhang_info  = () => import( '@/components/wenzhang_info')//文章详情
// //实名认证
// const successful  = () => import( '@/components/successful/successful')//文章详情
// const shequuser  = () => import( '@/newpage/flash/shequsuer');
// //快讯
// const pinglun  = () => import( '@/newpage/pinglun/pinglun');
// //快讯
// const reminds  = () => import( '@/components/buzhidao/reminds');
// //提币
// const tisx  = () => import( '@/components/buzhidao/tisx');
// //合伙人
// const grade  = () => import( '@/components/buzhidao/grade');
// const rules  = () => import( '@/components/buzhidao/rules');
// //合伙人  看下级
// const hexiaji  = () => import( '@/components/buzhidao/hexiaji');
// //领取红包
// const mebao  = () => import( '@/components/lingqu/mebao');
// //消息查看
// const information  = () => import( '@/newpage/pinglun/information');
// //消息查看
// const wenzhangsearch  = () => import( '@/components/search/wenzhangsearch');
// //直播
// const livebroadcast  = () => import( '@/livebroadcast/livebroadcast');
// // 关注
// const followLive  = () => import( '@/livebroadcast/follow_live/follow_live');
// //信息
// const chatLive  = () => import( '@/livebroadcast/chat_live/chat_live');
// // 我的;
// const myorderLive  = () => import( '@/livebroadcast/myorder_live/myorder_live');
// // 我的
// const myFollowLive  = () => import( '@/livebroadcast/myorder_live/myFollow_live/myFollow_live');
// // 我的 编辑资料
// const midataLive  = () => import( '@/livebroadcast/myorder_live/midata_live/midata_live');
// // 我的 创建直播
// const addLive  = () => import( '@/livebroadcast/add_live/add_live');
// // 直播结束
// const end_live  = () => import( '@/livebroadcast/add_live/end_live/end_live');
// // 我的 打赏记录
// const recordLive  = () => import( '@/livebroadcast/record_live/record_live');
// // 直播搜索
// const searchLive  = () => import( '@/livebroadcast/search_live/search_live');
// //主页
// const liveorder  = () => import( '@/livebroadcast/liveorder/liveorder');
// // 播放页 上级
// const detailText  = () => import( '@/livebroadcast/detailText/detailText');
// const ulamDetail  = () => import( '@/components/wallet/ulamDetail');

import ulamDetail from "@/components/wallet/ulamDetail";
import buyji from "@/components/buyji";
import watqing from "@/components/watqing";
import watorder from "@/components/watorder";
import setuser from "@/components/setuser";
import bag from "@/components/bag";
import appdeflunt from "@/components/appdeflunt";
import tagglemonymima from "@/components/tagglemonymima";
import administrators from "@/components/wallet/administrators";
import flash from "@/components/wallet/flash";
import uemDetail from "@/components/wallet/uemDetail";
import tanglus from "@/components/tanglus";
import tanglu from "@/components/tanglu";
import tij from "@/components/tij";
import setjin from "@/components/setjin";
import addbi from "@/components/addbi";
import upmi from "@/components/upmi";
import sets from "@/components/sets";
import tibis from "@/components/tibis";
import tibi from "@/components/tibi";
import jiangli1 from "@/components/jiangli1";
import jiangli from "@/components/jiangli";
import classify from "@/components/classify/classify";
import homepage from "@/components/homepage/homepage";
import mkg from "@/newpage/mkg";
import suo from "@/newpage/suo";
import faad from "@/newpage/faad";
import index from "@/newpage/index"
import novice from "@/components/novice/novice";
import tuiguang_day_info from "@/components/tuiguang_day_info";
import xiaji from "@/components/xiaji";
import sao from "@/components/sao";
import zhiwen from "@/components/zhiwen";
import shoppingCart from "@/components/shoppingCart/shoppingCart";
import myoder from "@/components/myoder/myoder";
import allorders from "@/components/allorders/allorders";
import submit from "@/components/submit/submit";
import coupon from "@/components/coupon/coupon";
import purchase from "@/components/details/purchase/purchase";
import details from "@/components/details/details";
import search from "@/components/search/search";
import praise from "@/components/myoder/praise/praise";
import payment from "@/components/payment/payment";
import modifyaddress from "@/components/Modifyaddress/modifyaddress";
import addresss from "@/components/address/address";
import submenu from "@/base/submenu/submenu";
import aftermarket from "@/components/aftermarket/aftermarket";
import shophome from "@/components/shophome/shophome";
import shopdetail from "@/components/shophome/shopdetail/shopdetail";
import cardcoupon from  "@/components/cardcoupon/CardCoupon";
import setup from "@/components/setup/setup";
import personal from "@/components/personal/personal";
import collection from "@/components/collection/collection";
import completeddetail from "@/components/aftermarket/completeddetail/completeddetail";
import newexpress from "@/components/newexpress/newexpress";
import bannerItem from "@/components/bannerItem/bannerItem";
import shangcheng from "@/components/shangcheng";
import submentus from "@/components/submentus/submentus";
import dianpuok from "@/components/dianpuok/dianpuok";
import mebaoinfo from "@/components/mebaoinfo";
import newsFlash from "@/components/newsFlash/newsFlash";
import kxfx from "@/components/kxfx";
import wenzhang_info from "@/components/wenzhang_info";
import successful from "@/components/successful/successful";
import shequuser from "@/newpage/flash/shequsuer";
import pinglun from "@/newpage/pinglun/pinglun";
import reminds from "@/components/buzhidao/reminds";
import tisx from "@/components/buzhidao/tisx";
import grade from "@/components/buzhidao/grade";
import rules from "@/components/buzhidao/rules";
import hexiaji from "@/components/buzhidao/hexiaji";
import mebao from "@/components/lingqu/mebao";
import wenzhangsearch from "@/components/search/wenzhangsearch";
import information from "@/newpage/pinglun/information";
import livebroadcast from "@/livebroadcast/livebroadcast";
import followLive from "@/livebroadcast/follow_live/follow_live";
import chatLive from "@/livebroadcast/chat_live/chat_live";
import myorderLive from "@/livebroadcast/myorder_live/myorder_live";
import myFollowLive from "@/livebroadcast/myorder_live/myFollow_live/myFollow_live";
import end_live from "@/livebroadcast/add_live/end_live/end_live";
import recordLive from "@/livebroadcast/record_live/record_live";
import addLive from "@/livebroadcast/add_live/add_live";
import midataLive from "@/livebroadcast/myorder_live/midata_live/midata_live";
import detailbanner from "@/components/detailbanner/detailbanner";
import detailText from "@/livebroadcast/detailText/detailText";
import liveorder from "@/livebroadcast/liveorder/liveorder";
import searchLive from "@/livebroadcast/search_live/search_live";
import Home from '@/components/HelloFromVux'
import New from '@/components/new'
import Find from '@/components/find'
import user from '@/components/user'
import hai from '@/components/hai'
import buy from '@/components/buy'
import jilu from '@/components/jilu';
import wallet from "@/components/wallet";
import wgeji from "@/components/wgeji";
import order from "@/components/order";
import duihuan from "@/components/duihuan/duihuan"



// const kxfx  = () => import( '@/components/kxfx')//快讯

import VueTouch from "vue-touch"
// const VueTouch  = () => import( 'vue-touch')
Vue.use(VueTouch, { name: 'v-touch' });

Vue.use(Router);

export default new Router({
  routes: [
    // 直播
    { path: '/livebroadcast', name: 'livebroadcast', component: livebroadcast },
    // 直播  _关注  粉丝
    { path: '/followLive', name: 'followLive', component: followLive },

    // 直播  聊天
    { path: '/chatLive', name: 'chatLive', component: chatLive },
    // 直播 我的
    { path: '/myorderLive', name: 'myorderLive', component: myorderLive },
    // 直播 编辑资料
    { path: '/midataLive', name: 'midataLive', component: midataLive },
    // 直播  创建直播
    { path: '/addLive', name: 'addLive', component: addLive },
    // 直播结束
    { path: '/end_live', name: 'end_live', component: end_live },
    // 直播  打赏记录
    { path: '/recordLive', name: 'recordLive', component: recordLive },
    // 直播  搜索
    { path: '/searchLive', name: 'searchLive', component: searchLive },
    // 我的 跳转粉丝 / 关注
    { path: '/myFollowLive', name: 'myFollowLive', component: myFollowLive },
    // 个人主页
    { path: '/liveorder', name: 'liveorder', component: liveorder },
  // 实名认证
    { path: '/successful', name: 'successful', component: successful },
    //
    { path: '/detailText', name: 'detailText', component: detailText },
    // 新手必看
    { path: '/novice', name: 'novice', component: novice },






    // 资讯页
    { path: '/index', name: 'index', component:index },
    //快讯分享
    { path: '/kxfx', name: 'kxfx', component: kxfx },
    { path: '/tagglemonymima', name: 'tagglemonymima', component: tagglemonymima },
    //快讯
    { path: '/newsFlash', name: 'newsFlash', component: newsFlash },
    //个人说说
    { path: '/shequuser', name: 'shequuser', component: shequuser },
    //文章详情
    { path: '/wenzhang_info', name: 'wenzhang_info', component: wenzhang_info },
    //评论
    { path: '/pinglun', name: 'pinglun', component: pinglun },
    //评论  领红包
    { path: '/mebaoinfo', name: 'mebaoinfo', component: mebaoinfo },
    //评论  领红包
    { path: '/mebao', name: 'mebao', component: mebao },
    //评论  领红包
    { path: '/reminds', name: 'reminds', component: reminds },
    //提取
    { path: '/tisx', name: 'tisx', component: tisx },
    //合伙人
    { path: '/grade', name: 'grade', component: grade },
    //规则
    { path: '/rules', name: 'rules', component: rules },
    //合伙人 看下级
    { path: '/hexiaji', name: 'hexiaji', component: hexiaji },
    //消息记录
    { path: '/information', name: 'information', component: information },
    //文章搜索
    { path: '/wenzhangsearch', name: 'wenzhangsearch', component: wenzhangsearch },

    //商城
    { path: '/shangcheng', name: 'shangcheng', component: shangcheng },
    { path: '/suo', name: 'suo', component: suo },
    { path: '/mkg', name: 'mkg', component: mkg },
    //下级关系
    { path: '/faad', name: 'faad', component: faad },
    //下级关系
    { path: '/xiaji', name: 'OrgTreeNode', component: xiaji },
    //下级关系
    { path: '/dianpuok', name: 'dianpuok', component: dianpuok },
    //扫一扫
    { path: '/sao', component: sao },
    //登陆页面
    { path: '/zhu', component: Home },
    // /设置指纹
    { path: '/zhiwen', name: 'zhiwen', component: zhiwen },
    //erc20糖包提取记录
    { path: '/tanglus', name: 'tanglus', component: tanglus },
    //糖包记录
    { path: '/tanglu', name: 'tanglu', component: tanglu },
    //轮播详情
    { path: '/bannerItem', name: 'bannerItem', component: bannerItem },
    //介绍详情
    { path: '/detailbanner', name: 'detailbanner', component: detailbanner },
    //提取购买的个人矿机
    { path: '/tij', name: 'tij', component: tij },
    //充币
    { path: '/addbi', name: 'addbi', component: addbi },
    //设置资金密码
    { path: '/setjin', name: 'setjin', component: setjin },
    //注册登录
    { path: '/new', name: 'new', component: New },
    //简单设置
    {
      path: '/sets', name: 'sets', component: sets
    },
    //设置登录密码
    { path: '/upmi', name: 'upmi', component: upmi },
    //奖励
    { path: '/jiangli', name: 'jiangli', component: jiangli },
    //奖励1
    { path: '/jiangli1', name: 'jiangli1', component: jiangli1 },
    //提取奖励
    { path: '/tibi', name: 'tibi', component: tibi },
    //提取钱包
    { path: '/tibis', name: 'tibis', component: tibis },
    //找回密码
    { path: '/find', name: 'find', component: Find },
    //  个人信息
    { path: '/user',  name: 'user', component: user },
    //  设置个人信息
    {
      path: '/setuser', name: 'setuser', component: setuser
    }, // 钱包个人矿机
    { path: '/wjis', name: 'wgeji', component: wgeji },
    // 海报
    { path: '/hai', name: 'hai', component: hai },
    // 购买ulam
    { path: '/buy', name: 'buy', component: buy },
    { path: '/buyji', name: 'buyji', component: buyji },
    // 选购矿机记录
    { path: '/jilu', name: 'jilu', component: jilu },
    // 管理员订单
    { path: '/order', name: 'order', component: order },
    // 钱包记录
    { path: '/watorder', name: 'watorder', component: watorder },
    // 钱包单个记录详情
    { path: '/watqing', name: 'watqing', component: watqing },
    // ulam钱包
    { path: '/wallet', name: 'wallet', component: wallet },
    { path: '/',  name: 'appdeflunt', component: appdeflunt },
    // ulam钱包详情
    { path: '/ulamDetail', name: 'ulamDetail', component: ulamDetail },
    //uem 钱包详情
    { path: '/uemDetail', name: 'uemDetail', component: uemDetail },
    //ulam-- uem兑换
    { path: '/flash', name: 'flash', component: flash },
    // 管理员
    { path: '/administrators', name: 'administrators', component: administrators },

    // 发红包
    { path: '/bag', name: 'bag', component: bag },
    //45天推广
    { path: '/tuiguang_day_info', name: 'tuiguang_day_info', component: tuiguang_day_info },
    //认证
    // { path: '/renzheng', name: 'renzheng', component: renzheng },

    {
      path: '/homepage',
      name: 'homepage',
      component: homepage,
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify,
    }, {
      path: '/submentus',
      name: 'submentus',
      component: submentus,
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart,
    },
    {
      path: '/myoder',
      name: 'myoder',
      component: myoder,
    },
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/details/:id',
      name: 'details',
      component: details,
    },
    {
      path: '/purchase/:id',
      name: 'purchase',
      component: purchase,
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon,
    },
    {
      path: '/praise',
      name: 'praise',
      component: praise,
    },
    {
      path: '/submit',
      name: 'submit',
      component: submit,
    },

    {
      path: '/payment',
      name: 'payment',
      component: payment,
    },
    {
      path: '/modifyaddress',
      name: 'modifyaddress',
      component: modifyaddress,
    },
    {
      path: '/addresss',
      name: 'addresss',
      component: addresss,
    },
    {
      path: '/submenu/:id',
      name: 'submenu',
      component: submenu,
    },
    {
      path: '/allorders',
      name: 'allorders',
      component: allorders,
    },
    {
      path: '/aftermarket',
      name: 'aftermarket',
      component: aftermarket,
    },
    {
      path: '/shophome/:id',
      name: 'shophome',
      component: shophome,
    },
    {
      path: '/shopdetail',
      name: 'shopdetail',
      component: shopdetail,
    },
    {
      path: '/cardcoupon',
      name: 'cardcoupon',
      component: cardcoupon,
    },
    {
      path: '/setup',
      name: 'setup',
      component: setup,
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal,
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection,
    },
    {
      path: '/completeddetail/:id',
      name: 'completeddetail',
      component: completeddetail,
    },
    {
      path: '/newexpress',
      name: 'newexpress',
      component: newexpress,
    },
	{
		path:'/duihuan',
		name:'duihuan',
		component:duihuan
	}
  ]
})
