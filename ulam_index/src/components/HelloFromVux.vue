<template>
	<div style="background-image: url(../../static/zhuBackground.png);background-repeat: repeat-x;background-size:100% 100%;"
	 :style="{ height: bodyHeight + 'px' }">
		<div class="vux-demo" style="width: 100%;height:45%;">
			<!-- <img class="logo" src="@/assets/newpage/lo.png">
      <p style="font-weight:700;margin:10px;color:#4a443d;">乌拉姆</p> -->
		</div>
		<div style="padding:15px;box-sizing:border-box;display: flex;flex-direction: column;align-items: center;">
			<!-- <div class="loginke" style="background: #000000"> -->
				<input type="number" class="login" style="text-align: left;" v-model="tel" placeholder="手机号"/>
				
		<!-- 	</div> -->
			<!-- <div class="loginke" style="background: #f5f5f5"> -->
				<input type="password" class="login"  style="text-align: left;" v-model="mima" placeholder="登陆密码"/>
			<!-- </div> -->
			<!-- 短信验证登陆，忘记登陆-->
			<div style="width:75%;margin:10px auto;">
				<!-- 助记词登陆-->
				<div v-on:click="yanma" style="float:left;">
					<span class="ce1">注册</span>
				</div>
				<!-- 扫码登陆 -->
				<div v-on:click="delma" style="float:right;">
					<span class="ce1">忘记密码</span>
				</div>
			</div>
			<div style="clear: both;"></div>
			<div style="height: 30px;"></div>
			<!--登录-->
			<div class="btnSubmit" v-on:click="go" >登录</div>
		</div>
		<toast v-model="ss1" type="cancel" :time="1200" is-show-mask text="密码有误！" width="12em"></toast>
		<toast v-model="ss3" type="cancel" :time="1500" is-show-mask text="登录有误!" width="12em"></toast>
		<loading :show="ss2" text="登录中.."></loading>
		<toast v-model="ss4" type="cancel" :time="1500" is-show-mask text="账户密码错误！" width="12em"></toast>
	</div>
</template>

<script>
	import {
		Group,
		Cell,
		XInput,
		XButton,
		Toast,
		Loading
	} from 'vux'
	export default {
		components: {
			Group,
			Cell,
			XInput,
			XButton,
			Toast,
			Loading
		},
		mounted() {
			let that = this
			that.bodyHeight = document.documentElement.clientHeight;
			if (window.plus) {
				plus.navigator.setStatusBarBackground("dark");
			}
			let message = localStorage.getItem('user');
			message = JSON.parse(message)
			if (message) {
				//跳转登陆
				that.$router.push('/user')
			}
		},
		data() {
			return {
				bodyHeight: '',
				msg: 'Hello World!',
				tel: '',
				mima: '',
				disabled: true,
				ss1: false,
				ss2: false,
				ss3: false,
				ss4: false
			}
		},
		computed: {
			ull() {
				return this.$store.state.uri;
			}
		},
		methods: {
			keyDown() {
				if (this.$refs.refcode.valid == true && this.tel != '') {
					this.disabled = false;
				} else {
					this.disabled = true;
				}
			},
			// 执行调用 请求资讯 7*24
			diao(b) {
				let that = this;

				let urls = '/v4/live/list?limit=' + b + '&reading=false&source=web&sort=&flag=down&id=99999999';
				that.axios.get('https://api.jinse.com' + urls).then(response => {
					console.log('资讯', response.data.list[0].lives);
					let arr = response.data.list[0].lives;
					localStorage.setItem("timeInfo", JSON.stringify(arr));

				}).catch(function(error) {
					that.ss1 = false;
					that.limit = 180;
					console.log(error);
				})
			},
			//执行登陆
			go() {
				let that = this;
				localStorage.clear();
				//验证密码是否有字母和数字
				let regNumber = /\d+/;
				let regString = /[a-zA-Z]+/;
				if (regNumber.test(that.mima) && regString.test(that.mima)) {
					console.log('密码：验证成功');
				} else {
					that.ss1 = true
					that.mima = ''
					return
				}
				that.ss2 = true
				console.log('执行登录')
				that.axios.post(that.ull + '/login', {
					"mobile": parseInt(that.tel),
					"password": that.mima
				}).then(response => {
					console.log(response.data)
					if (response.data == 'password_error' || response.data == 'error') {
						that.ss2 = false
						that.ss4 = true
						that.mima = ''
						return
					}
					let a = response.data[0];

					let arr = [];
					localStorage.setItem('History', JSON.stringify(arr));
					let obj = {
						id: 0
					};
					localStorage.setItem('classification', JSON.stringify(obj));






					if (a.hasOwnProperty("miner") && a.hasOwnProperty("group_miner")) {
						that.ss2 = false
						console.log('登录成功');
						let bs = {
							'sl': 999,
							'ren': 1,
							'take': 0,
							'confirm': a.confirm,
							'auth': a.auth,
							admin: a.admin,
							"drawback_passwd": a.drawback_passwd,
							'jl': a.reward,
							'xl': a.reward_miner, //奖励和下级奖励
							'one': a.level_1,
							'two': a.level_2, //1级 2级
							'hu': that.tel,
							'mima': that.mima,
							'name': a.name, //账户 密码 名字
							'ma': a.expand_num_self,
							'sma': a.expand_num, //自己的邀请码  -- 上级码
							'miner': a.miner,
							'group_miner': a.group_miner //矿工角色  -- 哪个组
						}
						localStorage.setItem("user", JSON.stringify(bs));
						that.diao(100);
						that.natoken();
						that._getdislist();
						//保存个人信息
						// localStorage.setItem("user",'13');
						that.$router.push('/user')
					}
				}).catch(function(error) {
					console.log(error);
					that.ss2 = false;
					that.ss3 = true;
					that.tel = ''
					that.mima = ''
				})
			},
			//商城token
			_getdislist() {
				let apiurl = this.apiurlShop + '/api/user/login';
				let data = {
					username: this.tel,
					password: this.mima
				};
				this.axios.post(apiurl, data).then((res) => {
					console.log(res, '!!!!!!!!!!!!!')
					localStorage.setItem('token', res.data.token)
				})
			},
			// 用户登录拿取  社区token
			natoken() {
				let that = this;
				let users = JSON.parse(localStorage.getItem('user'));
				that.axios.get(this.apiurlCommunity + '/login/' + users.hu + '/' + users.mima).then(response => {
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
				}).catch(function(error) {
					console.log(error);
				})
			},
			//请求 社区 数据
			nashuju() {
				let that = this;
				let users = JSON.parse(localStorage.getItem('user'));
				that.axios.get(this.apiurlCommunity + '/article?user=' + users.hu + '&token=' + that.token).then(response => {
					//
					console.log(response.data, '社区数据！！！！！！！')
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
						localStorage.setItem("community", JSON.stringify(shujus));
					}
				})
			},
			//短信验证码登陆
			yanma() {
				console.log('验证码登录')
				this.$router.push('/new')
			},
			//忘了密码
			delma() {
				console.log('忘了密码')
				this.$router.push('/find')
			}
		}
	}
</script>
<style>
	.ce1 {
		font-size: 15px;
		color: #686868;
	}

	.login {
		/* letter-spacing: 1px; */
		border: none;
		outline: none;
		color: #7f7e7e;
		width: 100%;
		/* text-align: center; */
		background:rgba(255,255,255,0.3);
		font-size: 15px;
		border-radius:10px;
		width: 90%;
		height:50px;
		margin: 10px auto;
		color: #FFFFFF;
		/* background-color: #636363; */
	/* 	display: flex;
		flex-direction: row;
		justify-content: flex-start; */
		
	}

	.loginke {
		height: 50px;
		width: 90%;
		background: #f5f5f5;
		margin: 20px auto;
		overflow: hidden;
		/* padding-left: 15px; */
		box-sizing: border-box;
		line-height: 50px;
		/* padding-right: 15px; */
		border-radius: 10px;
	}

	.login1 {
		height: 40px;
		width: 90%;
		margin: 20px auto;
		line-height: 40px;
		border-radius: 10px;
		text-align: center;
		color: #fffbfb;
		font-weight: 700;
		font-size: 17px;
	}

	.login::-webkit-input-placeholder {
		color: #b0b1b3;
	}

	.vux-demo {
		text-align: center;
	}

	.logo {
		margin-top: 20%;
		width: 25%;
	}
	.btnSubmit{
		height: 40px;
		width: 90%;
		margin: 20px auto;
		line-height: 40px;
		border-radius: 10px;
		text-align: center;
		color: #fffbfb;
		font-weight: 700;
		font-size: 17px;
		background-color:#11BCD8;
	}
	
</style>
