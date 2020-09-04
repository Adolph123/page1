import Vue from 'vue'

 
const WS=function() {
  if ("WebSocket" in window) {
    console.log("您的浏览器支持 WebSocket!");
    var ws_all = new WebSocket("ws://39.98.249.37:7000/ws")

    ws_all.onopen = function(e) {
      console.log("服务器连接成功");
      var send_cont={"token":localStorage.getItem('token')};
      ws_all.send(JSON.stringify(send_cont)); 

    };
    ws_all.onclose = function(e) {
      console.log("服务器连接关闭");
      console.log(e)
      WS()
      console.log("重新连接")
    };
    ws_all.onerror = function() {
      console.log("服务器连接出错");
      
      
    };
    ws_all.onmessage = function(e) {
      //接收服务器返回的数据
      console.log("接收数据");
      console.log(e.data)
      let resData = JSON.parse(e.data);
      console.log(resData)
      if (resData.code == 10000){
        console.log(resData.data.friends)
        console.log(resData.data.groups)
        

        Vue.prototype.$db.transaction(function (tx) {
             tx.executeSql('drop TABLE USER', [], function (tx, results) {
                console.log(results)
                console.log("hahahah")
                tx.executeSql('CREATE TABLE USER (mobile TeXT, name, nick, head)');
         
                let CareEach_temp = resData.data.friends.CareEach
                
                for (var i=0;i<resData.data.friends.CareEach.length;i++){
                
                  for (var j=0;j<CareEach_temp[i].Friends.length;j++){
                      tx.executeSql('INSERT INTO USER (mobile, name,nick,head) VALUES (?,?,?,?)',[CareEach_temp[i].Friends[j].Id+'', CareEach_temp[i].Friends[j].Remark,CareEach_temp[i].Friends[j].Nick,CareEach_temp[i].Friends[j].Header]);
                  }
         
                }    
                
             }, null);
        });


        localStorage.setItem("CareEach",JSON.stringify(resData.data.friends.CareEach));
        localStorage.setItem("groups",JSON.stringify(resData.data.groups));


        
      }
      if(resData.code == 10001){

        Vue.prototype.$db.transaction(function (tx) {
          var zhiding_temp = 0
          tx.executeSql('select zhiding from Chat where mobile=? limit 1', [resData.from], function (tx, results) {
                if(results.rows==1){
                  zhiding_temp = results.rows[0].zhiding
                } 
             }, null);
           tx.executeSql('INSERT INTO Chat (mobile, text,time,send,read,zhiding,sccess,message_type) VALUES (?,?,?,?,?,?,1,1)',[resData.from, resData.msg,resData.time,1,1,zhiding_temp]);
           
        });
        Vue.prototype.$ws_message.ws_message.push({'mobile':resData.from,'text':resData.msg,'time':resData.time,'send':1,'message_type':1})
        if (window.plus) {

          Vue.prototype.$db.transaction(function (tx) {
             tx.executeSql('select nick,name from USER where mobile=?', [resData.from], function (tx, results) {
                console.log(results.rows)
                //that.chat_list = results.rows
                console.log(results.rows[0].name)
                if (results.rows[0].name != null){
                  plus.push.createMessage(results.rows[0].name+":"+resData.msg);
                }
                else{
                  plus.push.createMessage(results.rows[0].nick+":"+resData.msg);
                }
             }, null);
             tx.executeSql('select * from USER where read=1', [], function (tx, results) {
                console.log("weidu_num:"+results.rows.length)
                //that.chat_list = results.rows
                plus.runtime.setBadgeNumber(results.rows.length);
                
             }, null);
          });

        
          
        }
      }
      if(resData.code == 10112){

        Vue.prototype.$db.transaction(function (tx) {
          var zhiding_temp = 0
          tx.executeSql('select zhiding from Chat where mobile=? limit 1', [resData.from], function (tx, results) {
                if(results.rows==1){
                  zhiding_temp = results.rows[0].zhiding
                } 
             }, null);
           tx.executeSql('INSERT INTO Chat (mobile, text,time,send,read,zhiding,sccess,message_type,long) VALUES (?,?,?,?,?,?,1,2,?)',[resData.from, resData.msg,resData.time,1,1,zhiding_temp,resData.long]);
           
        });
        Vue.prototype.$ws_message.ws_message.push({'mobile':resData.from,'text':resData.msg,'time':resData.time,'send':1,'message_type':2,'long':resData.long})

      }
    }
    Vue.prototype.$ws_all=ws_all
    Vue.prototype.$ws_message = {ws_message:[]}

  } else {
    // 浏览器不支持 WebSocket
    console.log("您的浏览器不支持 WebSocket!");
  }
}


//tokenFail
export default WS;