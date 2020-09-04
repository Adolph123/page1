import Prompts from "@/base/prompt/prompt";
import comprehensive from "@/base/comprehensive/comprehensive";

//设置下拉刷新
export const lyricminshow = {
    components:{
      Prompts
    },
    data(){
      return{
        page:1,
        scrollY:0,
        StartY:0,
        MoveY:0,
        total:0,
        loading:0,
        listenScroll:true,
        btomloading:false,
        pullup:true,
        isPrompt:false,//提示框的展示与隐藏
        Prompttext:'',//提示框成功或失败
        Promptmsg:'',//提示框成功或者失败原因
        Promptimage:'',//是否展示图片
        probeType: 3,
        empty:false,
        isscrollflag:false
      }
    },
    methods: {
      //提示框出现
      tagglePrompt(isflag,text,msg){
        if(isflag){
          this.Prompttext = text;
          this.Promptmsg = msg;
          this.Promptimage = isflag;
          this.isPrompt = true;
        }else{
          this.Prompttext = text;
          this.Promptmsg = msg;
          this.Promptimage = isflag;
          this.isPrompt = true;
        }
        setTimeout(()=>{
          this.isPrompt = false;
        },1500)
      },
      //下啦刷新
      refresh(){
        this.$refs.scroll.refresh()
      },
      scrollToend() {

      },

      //划过事件
      handleTouchMove(e){
        this.MoveY = e.touches[0].pageY;
        // console.log(e.touches[0].pageY,'划过事件')
      },
      //按下事件
      handleTouchStart(e){
        this.StartY = e.touches[0].pageY;
        // console.log(e.touches[0].pageY,'按下事件')
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
              this._getdislist()
            }else{
              this.btomloading = false;
              this.empty = true;
            }
          }
        }
      },

    },
};

//改变返回
export const tageshowcomprehen = {
    data(){
      return{
        iscomprehen:true,
        iscomprehensive:false,
      }
    },
    methods: {
      showcomprehen(){
          console.log('关');
          this.iscomprehensive = false
      },
      heidcomprehen(){
        console.log('开')
        this.iscomprehensive = true
      }
    },
  components: {
    comprehensive
  }
};

//打开商品详情
export const SearchHistory={
  data(){
    return{
      homepageskuid:0,
      isDetails:false,
    }
  },

  methods:{
    //打开商品详情
    toDetails(id){
      console.log(id,'商品详情')
      this.homepageskuid = id;
      this.isDetails = true;
    },
    //关闭页面
    showDetails(){
      this.homepageskuid = 0;
      this.isDetails = false;
    },
  }
};

//物理返回
export const goBackpushState={
  mounted(){
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
  },
  destroyed(){
    window.removeEventListener('popstate', this.goBack, false);
  },
};

//操作提醒
export const reminder={
  components:{
    Prompts
  },
  data(){
    return{
      isPrompt:false,//提示框的展示与隐藏
      Prompttext:'',//提示框成功或失败
      Promptmsg:'',//提示框成功或者失败原因
      Promptimage:'',//是否展示图片
    }
  },
  methods:{
    //提示框出现
    tagglePrompt(isflag,text,msg){
      if(isflag){
        this.Prompttext = text;
        this.Promptmsg = msg;
        this.Promptimage = isflag;
        this.isPrompt = true;
      }else{
        this.Prompttext = text;
        this.Promptmsg = msg;
        this.Promptimage = isflag;
        this.isPrompt = true;
      }
      setTimeout(()=>{
        this.isPrompt = false;
      },1500)
    },
  }
}
