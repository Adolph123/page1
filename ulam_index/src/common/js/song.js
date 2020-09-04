import {getmusicUrl,getmusictxt} from 'api/song'

class Song{
    constructor({id,mid,albumname,name,singers,interval,url,img,_mid}){
        this.id=id;
        this.mid=mid;
        this.albumname=albumname;
        this.name=name;
        this.singers=singers;
        this.interval=interval;
        this.url=url;
        this.img=img;
        this._mid=_mid;
        this._musictext()
    }
    musictext(){
        if(this.lyric){
            // console.log(this.lyric)
           return Promise.resolve(this.lyric)
        }else{
            return  getmusictxt(this)
                .then((res)=>{

                return Promise.resolve(this._html(res))

                }).catch(err=>{
                    console.log(err)
                })
        }
    }
    _musictext(){
        if(this.lyric){
            return
        }
        return getmusictxt(this)
            .then(res=>{
                this.lyric= this._html(res)
                // console.log(this._html(res))
            }).catch(err=>{
                console.log(err)
            })
    }
    _html(res){
        let divtag=document.createElement('div')
            divtag.innerHTML=res;
            return  divtag.innerHTML
        
    }
}


export function getstring(arr){
    let str=''
    arr.map( item =>{
        str+=`/${item.name}`
    })
    return str
}

function url(song){
    return getmusicUrl(song)
        .then( res => {
            // console.log(res.req_0.data.midurlinfo[0].purl)
            return Promise.resolve(res.req_0.data.midurlinfo[0].purl)
        })

        
}
export function creatsong(song){
    // console.log(song)
    return url(song).then(res=>{
        return new Song({
            id:song.id,
            mid:song.mid,
            _mid:song.album.mid,
            albumname:song.album.name,
            name:song.name,
            singers: getstring(song.singer),
            interval:song.interval,
            url:`http://isure.stream.qqmusic.qq.com/${res}`,
            img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.mid}.jpg?max_age=2592000`
           
        })
    })
    

}

export function throrrle(fun,delay){
    let timer
    return function(...args){
        if(timer){
            clearImmediate(timer)
        }
        timer = setTimeout(()=>{
            fun(args[0])
        },delay)
    }
}