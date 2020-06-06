import io from '../servise/socket.io';
import { utils } from 'neo';

const { storage } = utils;
const userId = storage.getStorage('userClient')
const userName = storage.getStorage('userName')
let socket = io.connect('ws://localhost:2019');
// let socket = io.connect('wss://www.wetalks.cn',{path: '/socket.io'});
// let socket = io.connect('wss://www.wetalks.cn/nodeApi',{path: '/socket.io'});
export function socketLogin(callback){
    socket.emit('login', {userid: userId, username: userName});
    socket.on('login', function(o){
        callback(o)
    });
    //监听用户退出
    socket.on('logout', function(o){
        // console.log(o)	
        console.log('socket logout', o)	
    });
}

export function heardLogin(callback){
    socket.on('login', function(o){
        callback(o)
    });
}

export function socketSendMessage(content, callback){
    var obj = {
        'userid': userId,
        'username': userName,
        'content': content,
        'time': new Date().toJSON()
    };
    socket.emit('message', obj);
}

export function socketGetMessage( callback){
    socket.on('message', function(o){
        console.log('message', o)
        callback(o)
    });
}