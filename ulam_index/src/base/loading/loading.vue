<template>
    <div class="loading">
        <img src="./89cdc751jw1el0x93cxgng208c05kjsg.gif" width="60" height="auto" alt="">
        <p class="desc">{{title}}...</p>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:"loading..."
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"
    .loading
        width 100%
        text-align center
        .desc
            line-height 20px
            font-size $font-size-small
            color $color-text-1
</style>
