<template>
    <div class="no-result">
        <div class="no-result-icon"></div>
        <p class="no-result-text">{{title}}</p>
    </div>
</template>

<script>
import { Signer } from 'crypto';
export default {
    props:{
        title:{
            type:Signer,
            default:""
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable'
@import '../../common/stylus/mixin'
    .no-result
        text-align center
        .no-result-icon
            width 86px
            height 90px
            margin 0 auto
            background url('./15.png') no-repeat
            background-size 86px 90px
        .no-result-text
            margin-top 30px
            font-size $font-size-medium
            color $color-text-d


</style>
