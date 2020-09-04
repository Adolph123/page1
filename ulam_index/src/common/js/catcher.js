import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const Search_num = 15
//数组添加元素
function insertsearch(arr,item,num,callback){
    const index = arr.findIndex(callback)
    if(index ==0 ){
        return
    }
    if(index > 0) {
        arr.splice(index,1)
    }
    arr.unshift(item)
    if(num && arr.length > num){
        arr.pop()
    }
}
//去除前后空格
function trim(str){
    if(str && typeof str === 'string'){
        return str.replace(/(^\s*)$/g,'')
    }
}
//搜索记录存储
export function heatiry(valus){
    let searchs = storage.get(SEARCH_KEY, [])
    insertsearch(searchs,valus,Search_num,(item)=>{
        return trim(item) == trim(valus)
    })
    storage.set(SEARCH_KEY,searchs)
    return searchs
}
//清空搜索记录
export function clearsearch(){
    storage.clear()
    return []
}
//清空单个 搜索记录
export function clearOne(str){
    let searchs = storage.get(SEARCH_KEY, [])

    const index = searchs.findIndex((item)=>{
       return trim(item) == trim(str)
    })
    if(index >= 0){
        searchs.splice(index,1)
        storage.set(SEARCH_KEY,searchs)
    }
    return searchs
}

//首次刷新 加载
export function loadseaech(){
    return storage.get(SEARCH_KEY, [])
}



//播放历史
const PLAY_KEY = '__play__'
const PLAY_num = 100
export function playheatiry(song){

    let plays = storage.get(PLAY_KEY, [])
    insertsearch(plays,song,PLAY_num,(item)=>{
        return item.id == song.id
    })
    storage.set(PLAY_KEY,plays)
    return plays

}
export function loadplayHeatiry(){
   return  storage.get(PLAY_KEY, [])
    
}


//我的收藏
const Personals_KEY = '__Personals__'
const Personals_NUM = 1000

export function PersonalsArr(song,index){
    // console.log(index)
    if(!(index >= 0)){
        // console.log('!!!!!!!!',index)
        let Personals = storage.get(Personals_KEY, [])

        insertsearch(Personals,song,Personals_NUM,(item)=>{
            return item.id == song.id
        })

        storage.set(Personals_KEY,Personals)

        return Personals
    }else{
        const Personals= storage.get(STYLE_KEY, []);

        // console.log(Personals)
      
        // console.log('@@@@@@@@@@@',index)
        // console.log(Personals[index])


        const Index=Personals[index].songs.findIndex((item) => {
            return item.id == song.id
        })
        if( Index == 0 ){
            return
        }
        if(Index > 0) {
            arr.splice(index,1)
        }
        Personals[index].songs.unshift(song)
        if(Personals_NUM && Personals.length > Personals_NUM){
            Personals.pop()
        }
        storage.set(STYLE_KEY,Personals)
        return Personals
    }
}
//默认刷新加载
export function loadpersonals(){
    return  storage.get(Personals_KEY, [])
     
}
 //单个删除我的收藏
export function Personalsdelete(song){
    const Personals = storage.get(Personals_KEY, [])
    const Pindex=Personals.findIndex((item) => {
        return item.id == song.id
    })
    if(Pindex >= 0){
         Personals.splice(Pindex,1)
        storage.set(Personals_KEY,Personals)
    }
    return Personals

   

}

//添加风格
const STYLE_KEY = '__style__'
const STYLE_NUM = 12
export function PersonalsStyleArr(str){
    let stylus = storage.get(STYLE_KEY, [])

    //  insertsearch(stylus,str,STYLE_NUM,(item)=>{
    //     return trim(item) == trim(str)
    // })
    insertArray(stylus,str,STYLE_NUM,(item)=>{
        return trim(item.name) == trim(str)
    })
    storage.set(STYLE_KEY,stylus)

    return stylus
}
//默认加载
export function loadpersonalStyle(){
    return storage.get(STYLE_KEY, [])
}
//单个删除风格
export function PersonalsStyleOne(str){
    let stylus = storage.get(STYLE_KEY, [])
    // console.log(stylus)
    const index = stylus.findIndex((item)=>{
        return trim(item) == trim(str)
    })
    if(index >= 0){
        stylus.splice(index,1)
        storage.set(STYLE_KEY,stylus)
    }
    return stylus
}

function insertArray(arr,item,num,callback){
    const index = arr.findIndex(callback)
    if(index ==0 ){
        return
    }
    if(index > 0) {
        arr.splice(index,1)
    }
    const obj = {
        name:item,
        songs:[]
    }
    arr.push(obj)
    // console.log(arr)
    if(num && arr.length > num){
        arr.pop()
    }
}
//用于判断喜欢的图标
    const LOVE_KEY = '__LOVE__'
export function setloveArrs(songs){
    let stylus = storage.get(LOVE_KEY, [])
    const index = stylus.findIndex((item)=>{
        return item.id == songs.id
    })
    if(index ==0 ){
        return
    }
    if(index > 0) {
        stylus.splice(index,1)
    }
    stylus.unshift(songs),
    storage.set(LOVE_KEY,stylus)

    return stylus

}
export function setloveArrdelet(songs){
    let stylus = storage.get(LOVE_KEY, [])
    const index = stylus.findIndex((item)=>{
        return item.id == songs.id
    })
    if(index >= 0){
        stylus.splice(index,1)
        storage.set(STYLE_KEY,stylus)
    }
    return stylus
}

