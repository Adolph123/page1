
import Vue from 'vue'

 

const WebSql=function(){

    if(window.openDatabase){

        //openDatabase('数据库名称','版本','数据库描述','数据库大小')

        var db = openDatabase('BRHK2','1.0','BRHK2',2*1024*1024);

        Vue.prototype.$db=db;

        if(!db){

            console.log("数据库创建失败！");
        }else{
            console.log('本地数据库创建成功！');
            db.transaction(function(tx){
                //tx.executeSql('drop table Chat');
                //tx.executeSql('drop table Chat_group');
                //tx.executeSql('drop table USER');
                tx.executeSql('CREATE TABLE IF NOT EXISTS Chat (mobile TeXT, text, time, read, send, sccess, zhiding, message_type,long)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS Chat_group (id TeXT, text, time, read, send, success, zhiding, message_type,long )');
                tx.executeSql('CREATE TABLE IF NOT EXISTS USER (mobile TeXT, name, nick, head)');
            }); 
        }
    }else{

        console.log('不支持本地存储！');

    }

};

 

export default WebSql;
