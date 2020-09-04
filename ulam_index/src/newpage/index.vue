<!--<script src="../../../../../brhk_index/src/main.js"></script>-->
<template>
  <div class="main-content" :style="{ height: bodyHeight + 'px' }" >
	 <!-- 顶部导航栏 --> 
	<div style="width: 100%;height: 44px;display: flex;flex-direction: row;justify-content: center;position: fixed;top: 0;background-color: #FFFFFF;z-index: 10;">
		<div style="width:90%;height: 44px;display: flex;flex-direction: row;">
			<div style="width: 50%;height: 44px;display: flex;flex-direction: column;justify-content: center;align-items: flex-start;font-weight:750;font-size: 20px;">TCC</div>
			<div style="width: 50%;height: 44px;display: flex;flex-direction: row;align-items: center;justify-content: flex-end;" >
				<img src="../assets/new/mobile-phone-(3)_24.png" style="width: 25px;height: 25px;" />
				<div style="margin-left: 15px;display: flex;flex-direction: row;align-items: center;" @click="$router.push('/novice')"><img src="../assets/new/mobile-phone-(3)_26.png" style="width: 20px; height: 20px;"/><span style="font-size: 14px;margin-left:4px;">新手教程</span></div>
			</div>
		</div>
	</div>
    <div id="wraper" style="background:#fff;overflow-y: scroll;display: flex;flex-direction: column;align-items: center;" >
      <!--轮播图-->
     <!-- <swiper  auto :interval="huos"  :loop="true"   :show-dots="true" dots-position="center"  height="245px">
        <swiper-item v-for="(to,index) in demo01_list" v-bind:key="index">
          <img :src="to.src" style="width:100%;height:100%;"  v-on:click="bar(to.id)">
        </swiper-item>
      </swiper> -->
	   <!--轮播图-->
	   <div style="width: 94%;height: 194px;margin-top: 44px;display: flex;flex-direction: row;align-items: center;position: absolute;">
			<div style="width:50%;height:80%;background-color:#00FFFF;border-radius: 7px;overflow: hidden;">
				<img style="width:100%;height: 100%;"/>
			</div>
			<div style="width:50%;height:80%;background-color:#E01212;border-radius: 7px;overflow: hidden;">
				<img style="width:100%;height: 100%;"/>
			</div>
	   </div>
	   <div style="width: 90%;height: 194px;margin-top: 44px;position: relative;top:5px;left: 0;z-index: 1;">
	   		 <swiper  auto :interval="huos"  :loop="true"   :show-dots="true" dots-position="center"  height="185px" width="60%" style="border-radius: 10px;">
	   		     <swiper-item v-for="(to,index) in demo01_list" v-bind:key="index">
	   		       <img :src="to.src" style="width:100%;height:100%;"  v-on:click="bar(to.id)">
	   		     </swiper-item>
	   		   </swiper>
	    </div>
	  
      <!--币种代码删除了-->
  <!--    <div style="clear:both;"></div>

      <div style="width: 96%;height:130px;background-color: #000000;">
        <div  class="craty" >
          <div class="cratyItem" @click="zanshimeiyou" style="border: 1px solid black;">
            <img class="images"  src="@/assets/wen/Lt.png" alt="" style="width: 24px;height: 24px;">
            <div><span class="cratyItemTtex" style="font-size: 13px;color: #3D4655;"> -->
<!--              我的推广-->
      <!--        聊天
            </span></div>
          </div> -->

<!--       $router.push('/livebroadcast')     zanshimeiyou  -->

  <!--        <div  class="cratyItem" @click="zanshimeiyou" >
            <img class="images" src="@/assets/wen/Zb.png" alt="" style="width: 24px;height: 24px;">
            <div><span class="cratyItemTtex" style="font-size: 13px;color: #3D4655;"> 直播  </span></div>
          </div> -->

        <!--  <div  class="cratyItem"  @click="$router.push('/bag')">
            <img class="images" src="@/assets/wen/Tb.png" alt="" style="width: 24px;height: 24px;">
            <div><span class="cratyItemTtex" style="font-size: 13px;color: #3D4655;">  糖包   </span></div>
          </div>

          <div  class="cratyItem" @click="$router.push('/ulamDetail')">
            <img class="images" src="@/assets/wen/Hz.png" alt="" style="width: 24px;height: 24px;">
            <div><span class="cratyItemTtex" style="font-size: 13px;color: #3D4655;"> 同构链</span></div>
          </div>
        </div>

        <div style="height: 10px;"></div> -->

       <!-- <div  class="craty" >
          <div class="cratyItem" @click="$router.push('/wallet')">
            <img class="images" src="@/assets/wen/Qb.png" alt="" style="width: 24px;height: 24px;">
            <div><span class="cratyItemTtex" style="font-size: 13px;color: #3D4655;"> 钱包</span></div>
          </div>

          <div  class="cratyItem" @click="$router.push('/homepage')">
            <img class="images" src="@/assets/wen/Sc.png" alt="" style="width: 24px;height: 24px;">
            <div><span class="cratyItemTtex" style="font-size: 13px;color: #3D4655;"> 商城  </span></div>
          </div> -->
<!--               $router.push('/novice')  	zanshimeiyou   -->
         <!-- <div  class="cratyItem" @click="$router.push('/novice')">
            <img class="images" src="@/assets/wen/Xs.png" alt="" style="width: 24px;height: 24px;">
            <div><span class="cratyItemTtex" style="font-size: 13px;color: #3D4655;">  新手必看   </span></div>
          </div>

          <div  class="cratyItem" @click="$router.push('/hai')" >
            <img class="images" src="@/assets/wen/Yq.png" alt="" style="width: 24px;height: 24px;">
            <div><span class="cratyItemTtex" style="font-size: 13px;color: #3D4655;"> 邀请好友</span></div>
          </div>
        </div>

      </div>
 -->
	<!-- 菜单栏 -->
		<div style="width: 100%;height:150px;display: flex;flex-direction: column;justify-content: center;">
			<div style="width: 100%;height: 128px;display:flex;flex-direction: row;flex-wrap: wrap;">
				<div style="width: 25%;height: 50%;display: flex;flex-direction: column;justify-content: center;align-items: center;"  @click="$router.push('/homepage')">
					<img class="images" src="../assets/new/mobile-phone-(3)_12.png" alt="" style="width: 24px;height: 24px;">
					<span style="color: #3D4655;font-size: 13px;margin-top: 10px;">商城</span>
				</div>
				<div style="width: 25%;height: 50%;display: flex;flex-direction: column;justify-content: center;align-items: center;" @click="zanshimeiyou">
					<img class="images" src="../assets/new/mobile-phone-(3)_07.png" alt="" style="width: 24px;height: 24px;">
					<span style="color: #3D4655;font-size: 13px;margin-top: 10px;">直播</span>
				</div>
				<div style="width: 25%;height: 50%;display: flex;flex-direction: column;justify-content: center;align-items: center;" @click="$router.push('/bag')">
					<img class="images" src="../assets/new/mobile-phone-(3)_13.png" alt="" style="width: 24px;height: 24px;">
					<span style="color: #3D4655;font-size: 13px;margin-top: 10px;">积分糖包</span>
				</div>
				<div style="width: 25%;height: 50%;display: flex;flex-direction: column;justify-content: center;align-items: center;" @click="$router.push('/hai')">
					<img class="images" src="../assets/new/mobile-phone-(3)_09.png" alt="" style="width: 24px;height: 24px;">
					<span style="color: #3D4655;font-size: 13px;margin-top: 10px;">邀请好友</span>
				</div>
				<div style="width: 25%;height: 50%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<img class="images" src="../assets/new/mobile-phone-(3)_15.png" alt="" style="width: 24px;height: 24px;">
					<span style="color: #3D4655;font-size: 13px;margin-top: 10px;">幸运夺宝</span>
				</div>
				<div style="width: 25%;height: 50%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<img class="images" src="../assets/new/mobile-phone-(3)_17.png" alt="" style="width: 24px;height: 24px;">
					<span style="color: #3D4655;font-size: 13px;margin-top: 10px;">股权权益</span>
				</div>
				<div style="width: 25%;height: 50%;display: flex;flex-direction: column;justify-content: center;align-items: center;" @click="$router.push('/flash')">
					<img class="images" src="../assets/new/mobile-phone-(3)_25.png" alt="" style="width: 24px;height: 24px;">
					<span style="color: #3D4655;font-size: 13px;margin-top: 10px;">通证兑换</span>
				</div>
				<div style="width: 25%;height: 50%;display: flex;flex-direction: column;justify-content: center;align-items: center;" @click="$router.push('/novice')">
					<img class="images" src="../assets/new/mobile-phone-(3)_11.png" alt="" style="width: 24px;height: 24px;">
					<span style="color: #3D4655;font-size: 13px;margin-top: 10px;">新手必看</span>
				</div>
			</div>
		</div>
		<!-- 总资产 -->
		<div style="width: 100%;height:100px;background-color: #F7F7F7;display: flex;flex-direction: column;align-items: center;">
			<div style="width:96%;height: 50%;display: flex;flex-direction: row;align-items: center;font-size: 14px;color:#101010;padding-left: 15px;font-weight: 500;">总资产</div>
			<div style="width:96%;height: 50%;display: flex;flex-direction: row;align-items: center;">
				<span style="font-size: 18px;font-weight: 700;padding-left: 10px">0.00</span><span style="font-size:14px;margin-left: 10px;">CNY</span><span style="flex: 1;text-align: right;font-size: 16px;font-weight: 700;color:#39B191;">+7%</span>
			</div>
		</div>
		<!-- 资产 -->
		<div style="width:100%;height:50px;background-color: #FFFFFF;font-size: 17px;font-weight:550;display: flex;flex-direction: column;justify-content: flex-end;padding-left: 40px;">资产</div>
		<div style="width:100%;background-color: #FFFFFF;display: flex;flex-direction:column;align-items: center;">
			<div style="width: 95%;height:80px;border-bottom: 1px solid #AAAAAA;display: flex;flex-direction: row;align-items: center;">
				<div style="width:100%;height:64px;display: flex;flex-direction: row;align-items: center;">
					<div style="padding-left:15px;"><img src="@/assets/UEM.png" style="width: 40px;height: 40px;"/></div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left:50px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left: 100px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
				</div>
			</div>
			<!-- 看效果用的 -->
			<div style="width: 95%;height:80px;border-bottom: 1px solid #AAAAAA;display: flex;flex-direction: row;align-items: center;">
				<div style="width:100%;height:64px;display: flex;flex-direction: row;align-items: center;">
					<div style="padding-left:15px;"><img src="@/assets/UEM.png" style="width: 40px;height: 40px;"/></div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left:50px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left: 100px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
				</div>
			</div>
			<!-- 看效果用的 -->
			<div style="width: 95%;height:80px;border-bottom: 1px solid #AAAAAA;display: flex;flex-direction: row;align-items: center;">
				<div style="width:100%;height:64px;display: flex;flex-direction: row;align-items: center;">
					<div style="padding-left:15px;"><img src="@/assets/UEM.png" style="width: 40px;height: 40px;"/></div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left:50px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left: 100px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
				</div>
			</div>
			<!-- 看效果用的 -->
			<div style="width: 95%;height:80px;border-bottom: 1px solid #AAAAAA;display: flex;flex-direction: row;align-items: center;">
				<div style="width:100%;height:64px;display: flex;flex-direction: row;align-items: center;">
					<div style="padding-left:15px;"><img src="@/assets/UEM.png" style="width: 40px;height: 40px;"/></div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left:50px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left: 100px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
				</div>
			</div>
			<!-- 看效果用的 -->
			<div style="width: 95%;height:80px;border-bottom: 1px solid #AAAAAA;display: flex;flex-direction: row;align-items: center;">
				<div style="width:100%;height:64px;display: flex;flex-direction: row;align-items: center;">
					<div style="padding-left:15px;"><img src="@/assets/UEM.png" style="width: 40px;height: 40px;"/></div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left:50px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left: 100px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
				</div>
			</div>
			<!-- 看效果用的 -->
			<div style="width: 95%;height:80px;border-bottom: 1px solid #AAAAAA;display: flex;flex-direction: row;align-items: center;">
				<div style="width:100%;height:64px;display: flex;flex-direction: row;align-items: center;">
					<div style="padding-left:15px;"><img src="@/assets/UEM.png" style="width: 40px;height: 40px;"/></div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left:50px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
					<div style="height: 40px;display: flex;flex-direction: column;justify-content: space-between;margin-left: 100px;">
						<div style="font-size: 13px;font-weight: 550;">TCC</div>
						<div style="font-size: 11px;">=5.00CNY</div>
					</div>
				</div>
			</div>
		</div>
	  <!--  fixed    relative   -->
      <div id="fidBox" ref="fidBox" :style="{position:isfidBox?'relative':'fixed',top:0,height:bodyHeight + 'px',zIndex:isfidBox?'10':'10000'}">

        <div style="background: #f5f5f5;position: absolute;top:0px;width: 100%;"
             :style="{zIndex:isfidBox?'10':'1000'}"
        >
          <div v-show="!isfidBox" class="backcolors"
               style="text-align: center;position: absolute;z-index: 1000;top: 0px;width: 100%;padding-top: 30px;padding-bottom: 10px">
            <!--          <i class="el-icon-close" style="font-size: 23px;color: #888"></i>-->

            <div style="display: flex;justify-content: space-between;align-items: center;width: 92%;margin: 0 auto">

              <div @click="tagglefid" style="width: 18px">
                <img src="@/assets/wen/heade0.png" alt="" class="searimg" style="width: 18px" >
              </div>

              <p @click="towenzhangsearch" style="display: flex;align-items: center;width: 70%;background: #fff;border-radius: 20px;height: 30px">
                <img src="@/assets/icon/商城_11.png" alt="" style="display: block;width: 6.5vw;height: auto;margin: 0 2%">
                <span style="font-size: 14px;color: #bababa"> 搜索文章 </span>
              </p>

              <div @click="tosaoma" style="width: 22px;display: flex;justify-content: center">
                <img src="@/assets/wen/heade2.png" alt=""  class="searimg" style="height: 22px" >
              </div>
              <!--                                                -->
              <div @click="toinformation" style="width:22px;display: flex;justify-content: flex-end;position: relative">
                <img src="@/assets/wen/heade3.png" alt=""  class="searimg" style="height: 22px" >
                <p v-show="remindCount != 0" class="tab-item-radios">
                  <span  style="display: inline-block;font-size: 10px;font-weight: 400;;padding: 0 4px;margin-top: 1px;margin-left: 1px">{{remindCount}}</span>
                </p>
              </div>

            </div>





          </div>





          <!-- <div style="height: 73px;background: #fff" v-if="!isfidBox"></div>

          <div class="title" :style="{boxShadow:isfidBox?'0px 1px 1px #f5f5f5':0,borderBottom:!isfidBox?'1px solid #f5f5f5':0}" >
            <div class="titleItem" v-for="item in title" :key="item.id" @click="totitle(item.id)" :class="{titleItemactive:titleid == item.id}">{{item.name}}</div>
          </div>

          <div style="height: 2px"></div>

          <div v-if="titleid == 1" style="background:rgb(245, 245, 245);line-height: 30px;padding: 5px 0;position: absolute;width: 100%;z-index: 100" >
            <span style="margin-left: 6%;font-size: 14px;color: #888">{{dtime}}</span>
          </div> -->

        </div>

        <!--          非全屏    -->

      <!-- <div v-if="isfidBox" :class="{mainContent:!isfidBox}" :style="{height: bodyHeight-100 + 'px',}">
          <div> -->

            <!--        //7*24-->
           <!-- <div v-if="titleid == 1">
              <div style="height: 40px"></div>
              <Flash @to
			  Detail="toflashDetail"></Flash>
            </div> -->
            <!--        文章-->
           <!-- <div v-if="titleid == 2">


              <div style="height: 40px"></div>
              <wenzhang1 @towenzhanginfo="towenzhanginfo"></wenzhang1>
            </div> -->
            <!--        社区-->
           <!-- <div style="height: 500px;" v-if="titleid == 3">
 -->
              <!--            <div style="margin: 120px auto;text-align: center">-->
              <!--              开发中...-->
              <!--            </div>-->
             <!-- <div style="height: 45px"></div>
              <shequ  @showcomments="showcomments"></shequ>
            </div> -->
            <!--      发不-->
           <!-- <div v-if="titleid == 4"> -->

              <!--            <div style="margin: 120px auto;text-align: center">-->
              <!--              开发中...-->
              <!--            </div>-->
             <!-- <div style="height: 35px"></div>
              <shequadd @totitle="totitle"   ref="addshequ" ></shequadd>
            </div> -->

            <!--    待定     -->
          <!--  <div v-if="titleid == 5">

            </div>

          </div>
        </div> -->
        <!--      全屏-->
       <!-- <div  v-if="!isfidBox"> -->
          <!--        //7*24-->
         <!-- <div v-if="titleid == 1" >
            <scroll   :listenScroll="listenScroll" :probeType="probeType" :pullup="pullup"  @scroll="scrollss"  @scrollToend="scrollToend"
                    ref="scrollflash"  :class="{mainContent:!isfidBox}" :style="{height: bodyHeight-100 + 'px',}">
              <div  @touchstart.prevent="handleTouchStart"
                    @touchmove="handleTouchMove"
                    @touchend.prevent="handleTouchEnd" ref="scrollflashBox">
                <Flash ref="flash" @toflashDetail="toflashDetail" @tagglefid="tagglefid"></Flash> -->
                <!--              <div style="height: 90px"></div>-->
             <!-- </div>
            </scroll>
          </div> -->

          <!--        文章-->
         <!-- <div  v-if="titleid == 2">
            <div style="height: 110px"></div>
            <wenzhang ref="wenzhang" @tagglefid="tagglefid"   @towenzhanginfo="towenzhanginfo"></wenzhang>
          </div> -->




          <!--        社区-->
          <!-- <div v-if="titleid == 3">

            <div style="height:110px;"></div>
            <shequ1 ref="shequ" @showcomments="showcomments" @tagglefid="tagglefid"></shequ1>
          </div> -->
          <!--      发不-->
          <!-- <div v-if="titleid == 4">

            <div style="height:100px;"></div>
            <shequadd @totitle="totitle" ref="addshequ"   @tagglefid="tagglefid"></shequadd>
          </div> -->

          <!--    待定     -->
         <!-- <div v-if="titleid == 5">

          </div>

        </div> -->




      </div>



      <!-- <div v-if="false" >
        <div
          style="width:100%;height:50px;background:#fff;margin-top:-17px;padding:19px;box-sizing: border-box;"
        >
          <p class="daili" style="line-height:15px;">代理矿机</p>
        </div>
        <div style="height:3px;background:#F5F5F5;"></div> -->
        <!--代理矿机-->
        <!-- <div v-if="xkj" class="dai1">
          <div class="buylu" v-on:click="kankj">&nbsp;&nbsp;查看矿机</div>
          <flexbox style="margin-top:40px;">
            <flexbox-item>
              <div class="flex1">矿机总金额</div>
            </flexbox-item>
            <flexbox-item>
              <div class="flex2">{{zu?zu.toFixed(2):zu}}ulam</div>
            </flexbox-item>
          </flexbox>
          <flexbox style="margin-top:20px;">
            <flexbox-item>
              <div class="flex1">钱包余额</div>
            </flexbox-item> -->
            <!-- <flexbox-item>
              <div class="flex2">{{qian?qian.toFixed(2):qian}}ulam</div>
            </flexbox-item>
          </flexbox>
          <flexbox style="margin-top:20px;">
            <flexbox-item>
              <div class="flex1">矿机总量</div>
            </flexbox-item>
            <flexbox-item>
              <div class="flex2">{{zs+nums}}台</div>
            </flexbox-item>
          </flexbox> -->
          <!--充值矿机-->
          <!-- <div style="height:20px;"></div>
          <div style="padding:20px 0;box-sizing:border-box;">
            <div class="cz1" v-on:click="addkj">充值矿机</div>
          </div>
        </div> -->
        <!--云矿机购买-->
       <!-- <div v-else class="dai1">
          <flexbox>
            <flexbox-item>
              <div class="flex3">{{zhenprice}}元/台</div>
            </flexbox-item>
            <flexbox-item>
              <div class="buylu" v-on:click="kanjl">&nbsp;&nbsp;查看购买记录</div>
            </flexbox-item>
          </flexbox>
          <div style="margin-top:10px;line-height:1.5;">
            <p class="heizi">
              ULAM云矿机是指包含4000ulam（可自由提取，但是至少每台矿机至少有4000ulam才能进行挖矿），无需购买硬件矿机即可获得挖矿服务，且不需要额外服务费。售价参照交易所价格进行浮动。
              <span
                style="color:#9a55ff;"
              >服务8年</span>
            </p>
            <p style="color:#9a55ff;margin-top:15px;font-size:15px;">预计净收益回报=挖出来的ulam都属于净收益</p>
          </div> -->
          <!--<div style="height:20px;line-height:30px;font-size:14px;">-->
          <!--<p style="text-align:right;">库存：{{kucun}}台</p>-->
          <!--</div>-->
         <!-- <div style="padding:20px 0;box-sizing:border-box;">
            <div class="hezi">
              <input type="text" class="in2 input-test" v-model="maishu" placeholder="请输入想要购买的总台数" />
            </div>
            <div style="height:15px;"></div>
            <div class="cz1" v-on:click="maiji">购买</div>
          </div>
        </div>
        <div style="height:60px;"></div>
      </div> -->
      <!--t弹窗-->
      <loading :show="ss5" text="请求中.."></loading>
      <loading :show="down1" :text="tishi1" style="width:200px;"></loading>
      <loading :show="kuxian" text="加载中.."></loading>
      <loading :show="shiz" text="识别成功.."></loading>
      <toast v-model="ss1" type="cancel" :time="1800" is-show-mask text="请登录后操作!"></toast>
      <toast v-model="ss2" type="cancel" :time="1800" is-show-mask text="请认证后分享!"></toast>
      <toast v-model="ss3" type="cancel" :time="1800" is-show-mask text="暂未更新!敬请期待" width="12em"></toast>
      <toast v-model="ss4" type="cancel" :time="1100" is-show-mask text="请选择购买数量!" width="12em"></toast>
      <toast v-model="ss7" type="cancel" :time="1500" is-show-mask text="矿机库存不足!" width="12em"></toast>
      <toast v-model="ss6" type="cancel" :time="1500" is-show-mask text="请求发生错误!" width="12em"></toast>
      <toast v-model="cz2" type="cancel" :time="1800" is-show-mask text="资金密码有误！" width="18em"></toast>
      <toast v-model="cjin" type="cancel" :time="3000" is-show-mask text="账户已被锁定！24小时后解锁"  width="18em"></toast>
      <toast v-model="cjin1" type="cancel" :time="3000" is-show-mask  width="18em">{{tishi}}</toast>
      <toast
        v-model="cz3"
        type="cancel"
        :time="2000"
        is-show-mask
        text="未检测到资金密码!请在设置中添加"
        width="18em"
      ></toast>
      <toast v-model="cz4" type="cancel" :time="1500" is-show-mask text="余额不足！请持有足够金额" width="18em"></toast>
      <toast v-model="iszanweikaifang" type="cancel" :time="1500" is-show-mask text="暂未开放，敬请期待！" width="18em"></toast>
      <toast v-model="cz5" :time="2200" is-show-mask text="充值矿机成功!" width="18em"></toast>
      <toast v-model="ss10" type="cancel" :time="1600" is-show-mask text="请求异常!请重新操作" width="18em"></toast>
      <confirm v-model="ge9" title="新版本提示" @on-cancel="ge2" @on-confirm="ge1">
        <textarea class="banzi" disabled>{{vban.data}}</textarea>
      </confirm>
      <!--充值矿机-->
      <!-- <popup v-model="czkj" height="460px" is-transparent>
        <div
          style="background-color:#fff;height:460px;border-top-left-radius:5px;border-top-right-radius:5px;"
        >
          <div style="height:10px;"></div>
          <div style="padding:15px 30px;box-sizing:border-box;">
            <p style="text-align:center;font-size:17px;" class="yinzi">
              钱包余额
              <span
                style="font-size:30px;margin-left:8px;color:#9a55ff;"
              >{{qian?qian.toFixed(2):0}}</span>
            </p>
            <div class="loginke">
              <input type="number" class="login" v-model="shu" placeholder="输入充值矿机数量" />
            </div>
          </div>
          <div style="padding:15px 30px;">
            <p style="font-size:14px;line-height: 20px">
              <span style="color:#9a55ff;" v-if="addulam">{{addulam}}ulam</span>
              <span style="color:#9a55ff;" v-if="!addulam">
              <inline-loading></inline-loading>ulam
            </span>
              可充值一台矿机，请您根据自己的余额合理输入矿机数量，其中4000ulam进行挖矿，超出4000ulam的部分将作为代挖服务器费用.
            </p>
            <p style="line-height: 20px;color:#ff3d17;font-size:11px;margin-top:10px;">
              备注：
              <br />1.请最少保留1个ulam来用作官方转账手续费
              <br />2.成功打包后收取30%作为平台服务费
            </p>
          </div>
          <div style="padding:30px;box-sizing: border-box;">
            <flexbox :gutter="30">
              <flexbox-item>
                <div class="quean" v-on:click="quecz">确定</div>
              </flexbox-item>
              <flexbox-item>
                <div class="quan1" v-on:click="bucz">取消</div>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </popup> -->
      <!-- 指纹提醒 -->
      <!-- <alert v-model="show1" title="请验证指纹" @on-show="onShow" @on-hide="onHide" button-text="取消使用密码">
        <div style>
          <div style="height:20px;"></div>
          <img src="@/assets/icos/zw.png" alt style="width:80px;" />
          <div style="height:10px;"></div>
        </div>
      </alert> -->
      <!--资金密码框-->
   <!--   <popup
        v-model="jintan"
        height="310px"
        is-transparent
        position="top"
        style="top:50px;"
        :hide-on-blur="false"
      >
        <div
          style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;"
        >
          <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
            <p style="font-size:18px;font-weight:700;text-align:center;">请输入资金密码</p>
          </div>
          <group>
            <x-input v-model="anmi1" title="资金密码" type="password" placeholder="请输入资金密码"></x-input>
          </group>
          <div style="padding:20px 15px;margin-top:25px;">
            <x-button
              @click.native="qjin()"
              :style="{ background: quan.color,color:'#fff',height:'40px',fontSize: '14px'}"
            >确认</x-button>
            <x-button @click.native="bjin" style="height:40px;font-size: 14px;">取消</x-button>
          </div>
        </div>
      </popup>
      <!--固定底部按钮--> -->
      <bottomNav :flag="0"></bottomNav>



      <!--  最新动态  -->
      <!-- <information v-if="isinformation" @heidinformation="heidinformation"></information> -->
      <!-- 扫码-->
      <!-- <saoma v-if="issaoma" @heidsaoma="heidsaoma"></saoma> -->
      <!--    社区详情  -->
      <!-- <sqcomment v-if="issqcomment" :sqcommentItem="sqcomment" @heidsqcomment="heidsqcomment"></sqcomment> -->
      <!--  文章详情  -->
      <!-- <wenzhanginfo  v-if="iswenzhanginfo" :wenzhanginfoitem="wenzhanginfoitem" @heidwenzhanginfo="heidwenzhanginfo"></wenzhanginfo> -->
      <!--  咨询详情  -->
      <!-- <flashDetail v-if="isflashDetail" :flashDetailitem="flashDetailitem" @heidflashDetail="heidflashDetail"></flashDetail> -->
      <!--   文章搜索 -->
      <!-- <wenzhangsearch ref="searchbox" v-if="iswenzhangsearch" @heidwenzhangsearch="heidwenzhangsearch" @towenzhanginfo="towenzhanginfo"></wenzhangsearch> -->
    
	</div>
  </div>

</template>
<script>
const baseList = [{ img: "./static/bar2.png", title: "1" }];
import {
  Swiper,
  SwiperItem,
  Flexbox,
  FlexboxItem,
  XButton,
  InlineLoading,
  Search,
  XInput,
  Group,
  Toast,
  Confirm,
  Tabbar,
  TabbarItem,
  Loading,
  Popup,
  Alert
} from "vux";
import {lyricminshow,} from '@/common/js/mixin.js';
import bottomNav from '@/components/bnavigation/bottomNav'
import scroll from "@/base/scroll/scroll";
import sqcomment from "@/base/sqcomment/sqcomment";
import wenzhanginfo from '@/components/wenzhang_info'
import wenzhangsearch from '@/components/search/wenzhangsearch'
import flashDetail from '@/components/kxfx'

import Flash from './flash/flash'
import shequ1 from './flash/shequ1';
import shequ from './flash/shequ';
import shequadd from './flash/shequadd';
import wenzhang from './flash/wenzhang';
import wenzhang1 from './flash/wenzhang1';
import saoma from './pinglun/saoma';
import information from './pinglun/information'
// const bottomNav =()=> import( '@/components/bnavigation/bottomNav');
// const scroll =()=> import( '@/base/scroll/scroll');
// const sqcomment =()=> import( '@/base/sqcomment/sqcomment');
// const wenzhanginfo =()=> import( '@/components/wenzhang_info');
// const wenzhangsearch =()=> import( '@/components/search/wenzhangsearch');
// const flashDetail =()=> import( '@/components/kxfx');
// const Flash =()=> import( './flash/flash');
// const shequ1 =()=> import( './flash/shequ1');
// const shequ =()=> import( './flash/shequ');
// const shequadd =()=> import( './flash/shequadd');
// const wenzhang =()=> import( './flash/wenzhang');
// const wenzhang1 =()=> import( './flash/wenzhang1');
// const saoma =()=> import( './pinglun/saoma');
// const information =()=> import( './pinglun/information');
export default {
    mixins:[lyricminshow],
  name: "nchi",
  components: {
      shequ,
      wenzhang1,
      information,
      saoma,
      wenzhangsearch,
      flashDetail,
      sqcomment,
      wenzhanginfo,
      wenzhang,
      shequadd,
      Flash,
      shequ1,
      scroll,
      bottomNav,


    SwiperItem,
    Swiper,
    Flexbox,
    FlexboxItem,
    XButton,
    InlineLoading,
    Search,
    XInput,
    Group,
    Toast,
    Confirm,
    Tabbar,
    TabbarItem,
    Loading,
    Popup,
    Alert
  },
  data() {
    return {
        //扫码
        issaoma:false,

      ///咨询详情
      isflashDetail:false,
      flashDetailitem:0,
      //
      remindIds:'',
      remindCount:0,
      isfidBox:true,
      issqcomment:false,
      sqcomment:{},
      title:[
          {
              name:'7*24',
              id:1,
          },
          {
              name:'文章',
              id:2,
          },
          {
              name:'社区',
              id:3,
          },
          {
              name:'+发布',
              id:4,
          },
      ],
      demo01_list: ["./static/bar2.png",],
      bodyHeight: "",
      xkj: true,
      maishu: "",
      shu: "",
      huos: 5000,
      users: "",
      qian: 0,
      show1: false,
      anmi1: "",
      shiz: false,
      cz2: false,
      cz3: false,
      cz4: false,
      cz5: false,
      //搜索提示 暂不使用
      results: [],
      value: "",
      ss1: false,
      ss2: false,
      ss3: false,
      ss4: false,
      ss5: false,
      jias: "",
      vban: "",
      ge9: false,
      ss10: false,
      zu: 0,
      baos: 0,
      zs: 0,
      canshu: "",
      zhenprice: 0,
      kucun: 0,
      kuxian: false,
      ss7: false,
      ss6: false,
      czkj: false,
      jintan: false,
      addulam: 0,
      down1: false,
      tishi1: "链接中..",
      pg: 1844267,
      cjin:false, cjin1:false, tishi:'',nums:0,
      titleid:1,dtime:'',
      //文章
      iswenzhanginfo:false,wenzhanginfoitem:'',
      //搜索文章
      iswenzhangsearch:false,
      //最新动态
      isinformation:false,

      //未开放功能
      iszanweikaifang:false,
        //7*24 刷新
      scrollY:0,
      heigtflash:0,
    };
  },
  created(){
      this.UPpackage();
  },
  mounted() {

      if(window.plus){
          window.plus.navigator.setStatusBarStyle('white')
      }
// this._getdislist()
   this.timers();
  this.countTime();
    let that = this;
    that.getBanner();
    that.bodyHeight = document.documentElement.clientHeight;

    document.documentElement.scrollTop = document.body.scrollTop = 0;

    that.pci();

    let message = localStorage.getItem("user");

    if (!message) {
      //跳转登陆
      that.$router.push("/zhu");
    } else {
        that.getinformationList();
      that.users = JSON.parse(message);
      console.log("当前组：" + that.users.group_miner);
      //拿取权限
      that.$store.dispatch("naquan", that.users.group_miner);
      //  获取钱包数据
      let qi = localStorage.getItem("wals");


          that.axios.post(that.ull + '/ulam_wallet',
              {
                  "mobile": parseInt(that.users.hu),
                  "password": that.users.mima
              }).then(response => {
              console.log(response.data);
              if (response.data[0]) {
                  let wal = response.data[0];
                  that.qian = wal.balance;
                  // that.waljin = response.data[0].balance;
                  localStorage.setItem("wals", JSON.stringify(wal));
                  return
              }
          })

      //请求这个代理矿机
      // that.diaoge1();
      // that.diaoges();
      // 检查有没有路由
      that.canshu = that.$route.params.id;
      if (that.canshu == "index") {
        that.xkj = false;
      }
    }
  },
  computed: {
    ull() {
      return this.$store.state.uri;
    },
    quan() {
      return this.$store.state.zuli;
    }
  },
  methods:{
        //滚动
      scrollss(pos){
          this.scrollY = pos.y;
          let scrollY =  pos.y;

          let heigtflash = this.$refs.scrollflashBox.clientHeight;
          // console.log((scrollY*-1) >= heigtflash-150,'@@@@@@@@@@@@@',scrollY,heigtflash-this.bodyHeight - 200)
          if((scrollY*-1) >= heigtflash-this.bodyHeight-1000){
              //下拉加载  7*24
              this.$refs.flash.jiazai();
          }
      },
      // 7*24 下拉刷新
      handleTouchEnd(){
          if(this.scrollY > 45 && this.StartY < this.MoveY-45){
              console.log('@@@@@@@@@@@@@@@')
              this.$refs.flash.shuaxin()
          }
      },
      scrollToend() {
          console.log(' this.scrollY', this.scrollY)
      },
      // 关闭最新动态
      heidinformation(){
          this.isinformation = false;
          this.remindCount = 0;
          this.getinformationList();
          //cc/
      },
      //开启最新动态
      toinformation(){
          this.isinformation = true
      },
      //关闭扫码
      heidsaoma(){
          this.issaoma = false
      },
      tosaoma(){
          this.issaoma = true
      },
      //文章搜索页面 开启
      towenzhangsearch(){
        this.iswenzhangsearch = true;
      },
      heidwenzhangsearch(){
          this.iswenzhangsearch = false;

      },
      //咨询详情关闭
      heidflashDetail(){
          this.flashDetailitem = {};
          this.isflashDetail = false;
      },
      //咨询详情开启
      toflashDetail(item){
          this.flashDetailitem = item;
          this.isflashDetail = true;
      },
      //文章关闭
      heidwenzhanginfo(){

          // this.$refs.searchbox.taggledetail()
          // this.$refs.wenzhang.taggledetail();
          this.iswenzhanginfo = false;
          this.wenzhanginfoitem = 0;


      },
      //文章打开
      towenzhanginfo(id){
          this.iswenzhanginfo = true;
          this.wenzhanginfoitem = id;
      },
      //最新动态
      getinformationList(){
          var wsServer = 'wss://server.ulam.top/community/remind';
          var websocket = new WebSocket(wsServer);
          let that = this;
          websocket.onopen = function (evt) {
              var remind = '{"user":"'+parseInt(JSON.parse(localStorage.getItem('user')).hu)+'"}';
              websocket.send(remind);
          };

          websocket.onclose = function (evt) {
              console.log("Disconnected");
          };


          websocket.onmessage = function (evt) {

              // console.log('Retrieved data from server: ' + evt.data);
              if(evt.data == 'pong'){
                  // console.log('1111111111111111111111111111')
                 return
              }else {
                  if(JSON.parse(evt.data).remindCount > 0){
                      that.remindCount = JSON.parse(evt.data).remindCount;
                      that.remindIds = JSON.parse(evt.data).remindIds;
                  }

              }

          };









      },

      //关闭
      heidsqcomment(){
          this.sqcomment = {};
          this.issqcomment = false;
          this.$refs.shequ.taggleissqcomment();
      },

      //打开正文
      showcomments(item){
          console.log(item);
          this.sqcomment = item;
          console.log('@@@@@@@@@@@@@@@@')
          this.issqcomment = true;
          console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      },




      countTime(){
          let that = this
          //获取当前时间
          let time = new Date();
          console.log(time.getDay())
          let nowTime = time.getTime()
          let week = time.getDay()
          let year = time.getFullYear(); //获取年份
          let day = time.getDate(); //获取几号
          let month = time.getMonth()+1;
          let sec = time.getSeconds();
          let fullday=0;//定义一个月多少天
          let week_h = '';
          switch(week){
              case 1:week_h = '星期一'; break;
              case 2:week_h = '星期二';break;
              case 3:week_h = '星期三';break;
              case 4:week_h = '星期四';break;
              case 5:week_h = '星期五';break;
              case 6:week_h = '星期六';break;
              case 0:week_h = '星期日';break;}

          that.dtime='今天   '+month+'月'+day+'日'+'   '+week_h;

      },
      //切换
      tagglefid(){
          console.log('@@@@@@@@@@@@@@@@@');
          this.isfidBox = !this.isfidBox;



          if(false == this.isfidBox){
              if(this.titleid == 1){
                  this.$refs.scrollflash.refresh()
              }
          }




          this.timers();
      },
      timers(){
          setTimeout(()=>{

              let he = document.getElementById('fidBox').getBoundingClientRect().top;

              if (he < 100){
                  this.isfidBox = false;

                  if(false == this.isfidBox){
                      if(this.titleid == 1 || this.titleid == 2){
                          this.$refs.scroll.refresh();
                      }
                  }



              }else {
                  this.timers()
              }

          },100);
      },

      //切换选择
      totitle(id){
          console.log('this.titleid',this.titleid)

          // if(this.titleid == 4){
          //     this.$refs.addshequ.blur()
          //     setTimeout(()=>{
          //         this.titleid = id;
          //         this.isfidBox = false;
          //     },300)
          // }
          this.titleid = id;
          this.isfidBox = false;


      },








      //请求云矿机数据
      diaoges(){
          let that = this
          //主网
          that.axios.post(that.ull + '/search_miner',
              {
                  "mobile": parseInt(that.users.hu),
                  "password": that.users.mima
              }
          ).then(response => {
              //将个人矿机数据遍历

                  this.nums = response.data?response.data.length:0;
          })
      },
    getBanner(){
      this.axios.get(this.apiurl+'/get_rotation').then(res=>{
          console.log(res,'res轮播图');
          this.demo01_list = res.data;
      })
    },
    getsize() {
      let that = this;
      that.axios
        .get("http://test.ulamchain.io/open/getsize.php")
        .then(response => {
          console.log(response.data);
          that.pg = response.data;
        })
        .catch(function(error) {});

    },
    //指纹弹窗消失和隐藏
    onHide() {
      let that = this;
      if (!that.shiz) {
        that.czkj = false;
        that.jintan = true;
      }
    },
    onShow() {},
    addkj() {
      this.czkj = true;
      // 同时请求文字
      this.buybiin();
    },
    //多少ulam充值代理框架
    buybiin() {
      let that = this;
      that.axios
        .get(that.ull + "/miner_tg_price")
        .then(response => {
          console.log(response.data);
          that.addulam = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //确认输入密码  充值代理矿机
    qjin(xmi) {
      let that = this;
      if (xmi) {
        that.anmi1 = xmi;
      }
      if (that.anmi1.length < 3) {
        that.cz2 = true;
        that.anmi1 = "";
        return;
      }
      if (!xmi) {
        that.kuxian = true;
      }
      //拿取账户密码。拿去新的值
      let a = that.users.hu;
      let b = that.users.mima;
      that.axios
        .post(that.ull + "/miner_tg", {
          mobile: parseInt(a),
          password: b,
          drawback_passwd: that.anmi1,
          amount: parseInt(that.shu),
          price_miner: that.addulam
        })
        .then(response => {
          console.log(response.data);
          that.kuxian = false;
          that.shiz = false;
          if (response.data == "password_drawback_error") {
            that.cz2 = true;
            that.anmi1 = "";
            return;
          }

            that.jiemi(response.data);
          //矿机数不足
          if (response.data == "amount_error" || response.data == "error") {
            that.cz4 = true;
            that.anmi1 = "";
            that.shu = "";
            that.jintan = false;
            return;
          }
          if (response.data == "success") {
            that.cz5 = true;
            that.anmi1 = "";
            that.shu = "";
            that.jintan = false;
            //充值成功重新刷新钱包数据
            // that.diaoge1();
            return;
          }
          that.ss10 = true;
          that.anmi1 = "";
        })
        .catch(function(error) {
          that.kuxian = false;
          that.shiz = false;
          that.ss10 = true;
          that.anmi1 = "";
          // console.log(error);
        });
    },
    zanshimeiyou(){
          this.iszanweikaifang = true
    },

    jiemi(a){
          let that = this
          let na = a.substr(0,12)
          // console.log(na)
          if(na == 'sk_error_num'){
              let ti = a.substr(13)
              console.log('截取的是:'+ti)
              if(ti == '0'){
                  that.cjin = true
                  that.anmi = ''
                  return
              }
              that.tishi = '资金密码错误！还有'+ti+'次机会'
              that.cjin1 = true
              that.anmi = ''
          }else {

          }
      },
    //取消输入资金密码
    bjin() {
      let that = this;
      that.jintan = false;
      that.anmi1 = "";
    },
    wenfus() {
      let _this = this;
      console.log("开始指纹识别");
      if (!window.plus) return;
      // 检查是否支持指纹识别
      if (plus.fingerprint) {
        if (!plus.fingerprint.isSupport()) {
          plus.nativeUI.alert("此设备不支持指纹识别");
          return;
        }
        if (!plus.fingerprint.isKeyguardSecure()) {
          plus.nativeUI.alert("此设备未设置密码锁屏，无法使用指纹识别");
          return;
        }
        if (!plus.fingerprint.isEnrolledFingerprints()) {
          plus.nativeUI.alert("此设备未录入指纹，请到设置中开启");
          return;
        }
        //开启指纹识别验证()
        var waiting = null;
        plus.fingerprint.authenticate(
          function() {
            // plus.nativeUI.alert('指纹识别成功');
            //开启识别成功的加载状态
            _this.shiz = true;
            // //关掉指纹的样式弹窗
            _this.show1 = false;
            // //  调用拿取密码的方法
            _this.wendmi();
          },
          function(e) {
            switch (e.code) {
              case e.AUTHENTICATE_MISMATCH:
                plus.nativeUI.toast("指纹匹配失败，请重新输入");
                _this.fingertext = "指纹匹配失败，请重试";
                break;
              case e.AUTHENTICATE_OVERLIMIT:
                plus.nativeUI.alert("识别次数超出限制，请使用密码进行支付！");
                //密码弹窗起来 指纹样式下去
                _this.show1 = false;
                _this.jintan = true;
                _this.showFinger = false;
                break;
              default:
                plus.nativeUI.alert("指纹识别失败(" + e.code + ")，请重试");
                _this.fingertext = "指纹识别失败(" + e.code + ")，请重试";
                break;
            }
          }
        );
      } else {
        plus.nativeUI.alert("当前环境不支持指纹识别API，请更新到最新版本");
      }
    },
    //指纹成功后调取的方式
    wendmi() {
      let mis = localStorage.getItem("jinmi");
      if (!mis) {
        this.cz3 = true;
        setTimeout(() => {
          this.$router.push("/user");
        }, 2000);
        return;
      }
      this.qjin(mis);
    },
    //取消
    bucz() {
      this.czkj = false;
      this.shu = "";
    },
    //确定充值
    quecz() {
      let that = this;
      if (!that.shu || that.shu < 1) {
        that.cz1 = true;
        return;
      }
      //当地址 金额 通过验证后 首先判断开启了指纹支付没有
      let zw = localStorage.getItem("zhiwens");
      if (zw) {
        //  弹出指纹样式
        that.show1 = true;
        //  下面是真正的指纹方法
        that.wenfus();
      } else {
        //没有开启指纹 弹出密码框
        that.jintan = true;
        that.czkj = false;
      }
    },
    chazu(a) {
      let that = this;
      that.axios
        .post(that.ull + "/search_num_miner", {
          group_miner: a
        })
        .then(response => {
          console.log("第" + a + "组,库存:" + response.data);
          that.kuxian = false;
          that.kucun = response.data;
        })
        .catch(function(error) {
          that.kuxian = false;
          console.log(error);
        });
    },
    maiji() {
      let that = this;
      let shu = that.maishu;
      if (shu <= 0) {
        that.ss4 = true;
        return;
      }
      that.ss5 = true;
      that.go2(that.zhenprice);
    },
    //买云矿机
    go2(e) {
      let that = this;
      let shu = that.maishu;
      console.log("当前购买量" + shu);
      that.axios
        .post(that.ull + "/buy", {
          buyer: parseInt(that.users.hu),
          password: that.users.mima,
          amount: parseInt(shu)
        })
        .then(response => {
          that.ss5 = false;
          console.log("当前订单号为:" + response.data);
          if (response.data == "error_price") {
            //提示价格有误  请重新请求
            that.ss6 = true;
            return;
          }
          if (response.data == "error") {
            //矿机没库存
            that.ss1 = true;
            return;
          }
          //返回订单单号
          let danhao = response.data;
          let bu = parseFloat(e) * shu;
          bu = bu.toFixed(2);
          // return
          //  成功获得订单号 然后才能跳转
          that.$router.push({
            name: "buy",
            params: { ll: shu, jin: bu, hao: danhao }
          });
        })
        .catch(function(error) {
          that.ss5 = false;
          that.ss6 = true;
          console.log(error);
        });
    },
    //查看矿机
    kankj() {
      this.$router.push("/wjis");
    },
    kanjl() {
      // this.$router.push('/jilu');
      this.$router.push({ name: "jilu", params: { id: "index" } });
    },
    diaoge1() {
      let that = this;
      //主网
      that.axios
        .post(that.ull + "/search_miner_tg", {
          mobile: parseInt(that.users.hu),
          password: that.users.mima
        })
        .then(response => {
          // console.log(response.data);
          if (response.data == "miner_error") {
            return;
          }

          //将个人矿机数据遍历
          if (response.data.length > 0) {
            let a = response.data;
            //  算矿机数量
            that.zs = a.length;
            let b = 0;
            // let d = 0
            //   console.log('@@@@@@@@@@@@@@@@@@@@@@');
            a.map(item => {

                    b = b + item.Balance;

              // d = d+ item.Packing_Number
            });
            //得出总数
              console.log(b,'总价')
            that.zu = b;
            that.baos = d;
          } else {
            console.log("没有");
          }
        })
        .catch(function(error) {});
    },
    xuanze() {
      this.xkj = !this.xkj;
    },
    zhengeng() {
      let that = this;
      downWgt();
      function downWgt() {
        that.down1 = true;
        let wgtUrl = "http://test.ulamchain.io/open/H5013E0E6.wgt";
        let wgtOption = { filename: "_doc/update/", retry: 1 };
        let task = plus.downloader.createDownload(wgtUrl, wgtOption, function(
          download,
          status
        ) {
          if (status == 200) {
            that.tishi1 = "即将安装..";
            installWgt(download.filename);
          } else {
            alert("应用升级失败！");
            that.down1 = false;
          }
        });
        task.addEventListener("statechanged", function(download, status) {
          switch (download.state) {
            case 2:
              that.tishi1 = "下载中..";
              break;
            case 3:
              let percent = Math.floor(
                (download.downloadedSize / that.pg) * 100
              );
              that.tishi1 = "已下载" + percent + "%";
              break;
            case 4:
              that.tishi1 = "下载完成";
              break;
          }
        });
        task.start();
      }
      function installWgt(wgtpath) {
        plus.runtime.install(
          wgtpath,
          {},
          function(wgtinfo) {
            that.down1 = false;
            plus.nativeUI.alert("更新完成，重新进入应用！", function() {
              //执行重启
              plus.runtime.restart();
            });
          },
          function(error) {
            that.down1 = false;
            plus.nativeUI.alert("应用更新失败！\n" + error.message);
            // plus.nativeUI.alert("应用更新失败~建议您重新下载新版本" );
          }
        );
      }
    },
    //确定更新
    ge1() {
      let that = this;
      that.zhengeng();
    },
    //更新取消
    ge2() {
      this.ge9 = false;
    },
    //请求版本号
    UPpackage() {
      let that = this;
      that.axios
        .get("http://test.ulamchain.io/open/ver1.php")
        .then(response => {
          console.log(response.data);
          that.vban = response.data;
          if (24 == that.vban.id) {
            console.log("是最新版本");
            return;
          }
          if (99 == that.vban.id) {
            console.log("测试版本");
            return;
          }
          this.ge9 = true;
          //获取大小
          that.getsize();
        })
        .catch(function(error) {
          console.log("请求错误");
        });
    },



    chujia(e) {
      //1美元=6.8796人民币
      let c = (7 * e).toFixed(2);
      return c;
    },
    //去掉小数点
    qdian(e) {
      let str = e.replace(/,/g, ""); //取消字符串中出现的所有逗号
      return parseFloat(str);
    },
    //  查找价格
    pci() {
      let that = this;
      //首先判断一下有没有内存，有就先赋予显示
      let a = localStorage.getItem("jia");
      if (a) {
        that.jias = JSON.parse(a);
      }
      that.axios
        .get(this.apiurl+"/token_price_all")
        .then(response => {
          console.log(response.data);
          let b = that.qdian(response.data[0].btc);
          let ss = that.qdian(response.data[0].ulam);
          //全部存入内存
          that.jias = { ulam: ss, btc: b };
          localStorage.setItem("jia", JSON.stringify(that.jias));
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //点击轮播的方法
    bar(e) {
        this.$router.push({
            path:"/bannerItem",
            query:{
                id:e
            }
        });
    },
      // 执行调用 请求资讯 7*24
      diao(b){
          let that = this;

          let urls = '/v4/live/list?limit='+b+'&reading=false&source=web&sort=&flag=down&id=99999999';
          // 打包要换成 没dev的 -- 这里that.baseURL 代表了https://api.biki.com/open/api/market域名

          // 本地测试 要换成下面访问请求  或者 that.baseURL +'/dev/open/api/market'
          // that.axios.get('/dev'+urls).then(response =>{
          that.axios.get('https://api.jinse.com' + urls).then(response =>{
              console.log('资讯', response.data.list[0].lives);
              let arr = response.data.list[0].lives;
              localStorage.setItem("timeInfo",JSON.stringify(arr));

          }).catch(function (error){
              that.ss1 = false;
              that.limit = 180;
              console.log(error);
          })
    },
      // 用户登录拿取  社区token
      natoken() {
          let that = this;
          let users = JSON.parse(localStorage.getItem('user'));
          that.axios.get(this.apiurlCommunity+ '/login/' + users.hu + '/' + users.mima).then(response => {
              // console.log(response.data)
              if (response.data.status == "fail") {
                  alert("登录状态失效 请重新登录")
                  return false
              } else {
                  that.token = response.data.code
                  localStorage.setItem("newtoken", that.token);
                  //拿取社区数据
                  that.nashuju()
              }
          }).catch(function (error) {
              console.log(error);
          })
      },
      //请求 社区 数据
      nashuju(){
          let that = this;
          let users = JSON.parse(localStorage.getItem('user'));
          that.axios.get(this.apiurlCommunity+'/article?user=' + users.hu + '&token=' + that.token).then(response => {
              //
              console.log(response.data,'社区数据！！！！！！！')
              if (response.data.status == "refresh") {
                  that.token = response.data.code
                  setTimeout(() => {
                      that.nashuju()
                  }, 500)
                  return
              }
              if (response.data.status == 'success') {

                  //给图片加url地址
                  let shujus = response.data.data;
                  localStorage.setItem("community",JSON.stringify(shujus));
              }
          })
      },
  },
  beforeRouteLeave(to, form, next) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1离开');
      this.diao(100);
      this.natoken();
      next()
  },
};
</script>

<style scoped>
  #fidBox{
    width: 100%;
    background: #fff;
    z-index: 1000;
    overflow: hidden;
  }
  .main-content{
    overflow: hidden;
    position: relative;
    height: 100vh;
    overflow-y: scroll;
  }
  .mainContent{
    overflow: hidden;
    position: relative;
    top: 100px;
  }
  .title{
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 36px;
    padding: 3px auto 2px ;
    background: #fff;
  }
  .titleItem{
    border-bottom: 1px solid #fff;
    width: 50%;
    color: rgb(136, 136, 136);
    font-size: 16px;
  }
  .titleItemactive{
      border-bottom: 1px solid #9a55ff;
      color: #9a55ff;
      font-size: 16px;
  }










.quean {
  width: 100%;
  background: #9a55ff;
  color: #fff;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}
.quan1 {
  width: 100%;
  background: #f5f5f5;
  color: #7f7e7e;
  border-radius: 5px;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.login {
  letter-spacing: 1px;
  border: none;
  outline: none;
  color: #7f7e7e;
  width: 100%;
  text-align: center;
  background: #f5f5f5;
  font-size: 15px;
}
.loginke {
  height: 42px;
  overflow: hidden;
  background: #f5f5f5;
  margin: 20px auto;
  padding-left: 15px;
  box-sizing: border-box;
  line-height: 42px;
  padding-right: 15px;
  border-radius: 8px;
}
.login::-webkit-input-placeholder {
  color: #b0b1b3;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
.lala {
  overflow: auto;
}
.hezi {
  height: 40px;
  width: 100%;
  background: #f5f5f5;
  border-radius: 6px;
  padding-left: 15px;
  box-sizing: border-box;
  line-height: 40px;
  margin-top: -5px;
  padding-right: 15px;
}
.in2 {
  border: none;
  outline: none;
  color: #999;
  width: 100%;
  background: #f5f5f5;
  text-align: center;
  font-size: 18px;
  letter-spacing: 2px;
}
.heizi {
  color: #030303;
  font-size: 15px;
  letter-spacing: 1px;
}
.flex3 {
  font-size: 16px;
  color:#F4451A;
}
.cz1 {
  background: #9a55ff;
  color: #fff;
  text-align: center;
  letter-spacing: 2px;
  height: 38px;
  line-height: 38px;
  font-size: 18px;
  border-radius: 7px;
  margin-top: 10px;
}
.buylu {
  height: 20px;
  color: #fff;
  background: #c0bfc4;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  float: right;
  margin-right: -19px;
  margin-bottom: 10px;
}
.flex1 {
  color: #919090;
  font-size: 14px;
}
.flex2 {
  text-align: right;
  color: #030303;
  font-size: 14px;
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid #f5f5f5;
}
.dai1 {
  width: 100%;
  background: #fff;
  padding: 15px 19px;
  box-sizing: border-box;
  position: relative;
}
.daili {
  font-size: 16px;
  color: #9a55ff;
}
.yun {
  color: #8e8e8e;
  margin-top: -8px;
  /*color:#919090;line-height:38px;*/
}

  .cratyItem{
    width: 100%;
    text-align: center;
  }
  .images{
    width: 44px;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  .cratyItemTtex{
    font-size: 12px;
    line-height: 20px;
  }
  .craty{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }










.bizhong {
  box-shadow: 0 1px 2px #dadada;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #fff;
  text-align: center;
  position: relative;
  width: 90%;
  margin-left: 5%;

  top: -30px;
}
/*@import '../../pf/quanju.css';*/
.banzi {
  font-size: 16px;
  color: #666;
  background: white;
  border: 1px solid white;
  line-height: 1.5;
  height: 80px;
  width: 94%;
  resize: none;
}
  .tab-item-radios{
    position: absolute;
    right: -2px;
    top: -3px;
    display: flex;
    min-width: 15px;
    background: red;
    height: 14px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #fff;
    border-radius: 15px;
    padding: 0px;
    text-align: center;
  }
.z3 {
  font-size: 14px;
}
.z1 {
  color: #9a55ff;
  font-size: 14px;
}
.z2 {
  color: #9a55ff;
  font-size: 18px;
  margin-top: 3px;
}
  .searimg{
    width: 22px;
    height: auto;
    display: block;
  }

</style>

<style>
  #wraper .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{
    bottom: 33px;
  }
</style>
