function random(n,m){
    return Math.floor(Math.random() * (m-n+1) + n)
}
export function shuffix(arroring){
    let arr = [...arroring]
    for(var i=0; i<arr.length; i++){
        let index=random(0,i)
        let tmp = arr[i]
        arr[i] = arr[index]
        arr[index] = tmp
    }
    return arr
}