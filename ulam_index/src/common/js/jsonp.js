import originjsonp from 'jsonp'
// import { reject } from 'any-promise';

function parmes(data){
    let url=''
    for(let k in data){
        let value = data[k] !== undefined? data[k]:'';
        url+= '&'+k+'='+encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
}


export default function jsonp(url,data,option){
    
    url+= (url.indexOf('?') > 0 ? "&" : '?')+parmes(data);
    // console.log(url+'这是url')
    return new Promise( (reslove,reject) =>{
        originjsonp(url,option,(err,data)=>{
            if(!err){
                // console.log(data+'这是data')
                reslove(data)
            }else{
                console.log(err+'err')
                reject(err)
            }
        })
    })
}