import { getDateTimeStr } from './timeStamp';
import { hashHistory } from 'react-router';
import { utils } from 'neo';

const { storage } = utils;

export function setReq(obj) {
    return {
        "appUser": 'jfxqj_wx',
        "requestData": obj,
        "requestNo": parseInt(Math.random()*Math.pow(10,15)),
        "requestTime": getDateTimeStr(),
        "source": "jfxqj_wx",
        "version": "1.2",
        "productCode": "2000",
        "channelCode": 'jbs2000',
        "accessMode": 'wx',
        "clientType": 'wx',
        "osType": 'weichart',
        "appVersion": '1.0',
        "jfpalVersion": '1.0',
        "mobileSerialNum": storage.getStorage('userId'),
        "phone": storage.getStorage('userId')
    }
}

export function goLink(link, itm){
    if(link) {
      hashHistory.push({
        pathname: link,
        query: itm || ''
      });
    }
}

function randomString (len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

export function getUser(){
    let user = storage.getStorage('userClient');
    let username = storage.getStorage('userName');
    if(user&&username) {
      return user
    }
    let tmp_name = (Date.parse(new Date())/1000);
    let userid = 'user-' + tmp_name + '-' + (Math.round(Math.random()*9999));
    username = randomString(5);
    let userClient = userid + username;
    storage.setStorage('userClient', userClient);
    storage.setStorage('userName', username);
    return userClient;
}