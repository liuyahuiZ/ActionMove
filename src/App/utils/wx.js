import wx from 'weixin-js-sdk';
import { utils } from 'neo';
import { createSign } from '../api/index'
import { UrlSearch } from './index';

const { sessions } = utils;
export function wxConfigAction(resp) {
    const params = UrlSearch() || {};
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: resp.appId, // 必填，公众号的唯一标识
        timestamp: resp.timestamp, // 必填，生成签名的时间戳
        nonceStr: resp.noncestr, // 必填，生成签名的随机串
        signature: resp.signature,// 必填，签名，见附录1
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'chooseImage',
            'scanQRCode',
            'getLocation'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(()=>{
        console.log('wx.ready');
        // alert('wx.ready')
    });

    wx.error(function(res){

        console.log('wx err',res);
        // alert('wx.err'+JSON.stringify(res));

        //可以更新签名
    });
}
export function getSign(){
    let url =  encodeURIComponent(window.location.href.split('#')[0]);
    createSign({
      "url": url
    }).then(res => {
      if(res.code=='0000'){
        let resp = res.data
        // alert(JSON.stringify(data.respBody));
        sessions.setStorage('WXCONFIG', resp);
        wxConfigAction(resp);
      }
    }).catch((error) => {console.log(error);Loade.hide();})
}