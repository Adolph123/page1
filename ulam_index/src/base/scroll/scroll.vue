<template>
    <div ref='wrapper'>
        <slot></slot>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { setTimeout } from 'timers';
export default {
    props:{
        probeType:{
            type:Number,
            default:3
        },
        click:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            default:()=>{
                return []
            }
        },
        listenScroll:{
            type:Boolean,
            default:false
        },
        pullup:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        if(!this.$refs.wrapper){
            return
        }
        setTimeout(()=>{
            this._initscroll()
        },500)

    },
    methods:{
        _initscroll(){
            //scroll组件初始化
            this.scroll = new Bscroll(this.$refs.wrapper,{
                probeType:this.probeType,
                click:this.click,
                useTransition:false,
            })
            //滚动事件开启监听
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
            if(this.listenScroll){
                this.scroll.on('scroll',(pos)=>{
                    // console.log(pos,'@@@@@@@@@@@@')
                    this.$emit('scroll',pos)
                })
            }
            if(this.pullup){
                this.scroll.on('scrollEnd', () => {
                    if( Math.abs(this.scroll.y) > Math.abs(this.scroll.maxScrollY)-2){
                        this.$emit('scrollToend')
                    }
                })
            }
        },
        refresh(){
            console.log('@@@@@')
            this.scroll && this.scroll.refresh()
        },
        scrollTop(){
            console.log('顶部')
            this.scroll && this.scroll.scrollTo(0, 0, 10)
        }
    },
    watch:{
        data(){
            setTimeout(()=>{
                this.refresh()
            },500)
        }
    }
}
</script>

<style>

</style>
