<template>
	<div class="duihuan">
		<div style="background: #4955D3;">
		  <div class="mheaderheader" >
		    <div style="position: absolute;left: 0;z-index: 100" @click="fanhui1">
		      <img src="@/assets/backwhite.png" alt="" style="width: 15px;height: auto;display: block">
		    </div>
		    <div style="height: 30px;">
		
		    </div>
		    <div style="position: absolute;width: 100%;left: 0;">
		      <div style="display: flex;justify-content: center;font-size:17px;width: 50%;margin:0 auto;font-weight: 550;color: #FFFFFF;">
						BCSC兑换TCC
		      
		      </div>
		    </div>
		  </div>
		</div>
		<div style="width: 100%;height:276px;background-color:#4955D3;border-bottom-left-radius: 40px;border-bottom-right-radius: 40px;display: flex;flex-direction: column;align-items: center;justify-content: space-around;">
			<div style="color: #FFFFFF;font-size: 14px;display: flex;flex-direction: row;align-items: center;align-self: flex-start;margin-left: 15px;">现BCSC兑换TCC的比例：<span style="color: red;font-size: 16px;">10:1</span></div>
			<div style="width: 95%;height: 100px;display: flex;flex-direction: column;">
				<div style="width: 100%;height: 50%;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
					<input type="text" placeholder="输入BCSC数量" style="width:143px;height:37px;border-radius: 3px;background-color: #F9F9F9;padding-left: 10px;">
					<img src="../../assets/duihuan.png" alt="" style="width:24px;height: 24px;">
					<input type="text" placeholder="兑换成TCC的数量" style="width:143px;height:37px;border-radius: 3px;background-color: #F9F9F9;padding-left: 10px;">
				</div>
				<div style="width: 100%;height: 50%;display: flex;flex-direction: column;justify-content: flex-end;">
					<div style="width: 100%;height:42px;background-color:#06EDFF;border-radius:5px;display: flex;flex-direction: row;justify-content: center;align-items: center;font-size: 16px;font-weight: 540;">确定兑换</div>
				</div>
			</div>
			<div style="width: 95%;height: 60px;color: #CCD1FF;font-size: 12px;display: flex;flex-direction: column;justify-content: space-around;">
				<span>交易时间：2020.9.12——2020.9.30</span>
				<span>交易金额不得小于&nbsp;100&nbsp;TCC,不得大于&nbsp;1000&nbsp;&nbsp;TCC</span>
			</div>
		</div>
		<div style="width: 95%;height:300px;margin: 0 auto;">
			<div style="height: 50px;line-height: 50px;font-size: 14px;font-weight: 550;">BCSC介绍</div>
			<div style="font-size: 14px;text-indent:2em">习近平总书记2020年4月1日在浙江考察时指出，要善于化危为机，抓住产业数字化、数字产业化赋予的机遇，抓紧布局数字经济。在2020年5月23日参加“两会”代表讨论中再次强调，我们要在危机中育新机、于变局中开新局，推动我国经济乘风破浪、行稳致远。</div>
			<div style="font-size: 14px;text-indent:2em;margin-top: 5px;">为进一步推动广大中小企业数字化转型，构建“政府引导一平台赋能一龙头引领一机构支撑一多元服务”的联合推进机制，形成“数字引领、携手创新、普惠共赢”的数字化生态共同体，支撑河北省经济发哦质量发展，河北省智慧城市联合会、中国中小企业协会高新技术产业分拟联合举办河北省中小企业数字化转型高峰论坛暨全国中小企业数字化链改（河北）中心揭牌仪式，诚邀您出席</div>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			fanhui1(){
			    this.$router.push('/index')
			}
		}
	}
</script>

<style>
	.duihuan{
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top:0;
		background-color:#FFFFFF;
	}
</style>
